import React, {
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.css';

const Sentinel = forwardRef(({ offset }, ref) => (
  <div ref={ref} style={{ top: offset }} className={styles.sentinel} />
));

Sentinel.propTypes = {
  offset: PropTypes.number.isRequired,
};

const VIEWPORT_TOP_EDGE_POSITIONS = {
  NULL: 'NULL',
  ABOVE_STICKY_CONTAINER: 'ABOVE_STICKY_CONTAINER',
  WITHIN_STICKY_CONTAINER: 'WITHIN_STICKY_CONTAINER',
  BELOW_STICKY_CONTAINER: 'BELOW_STICKY_CONTAINER',
};

const getComputedTop = (el) => {
  const stickyStyles = getComputedStyle(el);
  const top = parseInt(stickyStyles.top, 10);

  return top;
};

const getIsStuck = viewportTopEdgePosition =>
  ({
    [VIEWPORT_TOP_EDGE_POSITIONS.ABOVE_STICKY_CONTAINER]: false,
    [VIEWPORT_TOP_EDGE_POSITIONS.WITHIN_STICKY_CONTAINER]: true,
    [VIEWPORT_TOP_EDGE_POSITIONS.BELOW_STICKY_CONTAINER]: false,
    [VIEWPORT_TOP_EDGE_POSITIONS.NULL]: false,
  }[viewportTopEdgePosition]);

const Sticky = ({
  children,
  className,
  offset,
  onStuck,
  stuckClassName,
  style,
  ...props
}) => {
  const [viewportTopEdgePosition, setViewportTopEdgePosition] = useState(
    VIEWPORT_TOP_EDGE_POSITIONS.NULL,
  );
  const sentinelStatic = useRef();
  const sentinelSticky = useRef();
  const sticky = useRef();
  const actualOffset = useRef(0);
  const isStuck = getIsStuck(viewportTopEdgePosition);

  useEffect(() => {
    onStuck(isStuck);
  }, [viewportTopEdgePosition]);

  useEffect(() => {
    actualOffset.current = offset || getComputedTop(sticky.current);

    const observer = new IntersectionObserver(() => {
      const {
        top: sentinelStaticPos,
      } = sentinelStatic.current.getBoundingClientRect();
      const {
        top: sentinelStickyPos,
      } = sentinelSticky.current.getBoundingClientRect();

      setViewportTopEdgePosition(() => {
        if (sentinelStaticPos < 0 && sentinelStickyPos < 0) {
          return VIEWPORT_TOP_EDGE_POSITIONS.BELOW_STICKY_CONTAINER;
        }

        if (sentinelStaticPos < 0 && sentinelStickyPos >= 0) {
          return VIEWPORT_TOP_EDGE_POSITIONS.WITHIN_STICKY_CONTAINER;
        }

        if (sentinelStaticPos >= 0 && sentinelStickyPos > 0) {
          return VIEWPORT_TOP_EDGE_POSITIONS.ABOVE_STICKY_CONTAINER;
        }

        return viewportTopEdgePosition;
      });
    });

    observer.observe(sentinelStatic.current);
    observer.observe(sentinelSticky.current);

    return observer.disconnect;
  }, []);

  return (
    <Fragment>
      <Sentinel ref={sentinelStatic} offset={-actualOffset.current} />
      <div
        {...props}
        ref={sticky}
        style={{ ...style, ...(offset && { top: offset }) }}
        className={cx(styles.sticky, className, {
          [stuckClassName]: isStuck,
        })}
      >
        {children instanceof Function ? children({ isStuck }) : children}
        <Sentinel ref={sentinelSticky} offset={-actualOffset.current} />
      </div>
    </Fragment>
  );
};

Sticky.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  className: PropTypes.string,
  offset: PropTypes.number,
  onStuck: PropTypes.func,
  stuckClassName: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
};

Sticky.defaultProps = {
  className: '',
  offset: null,
  onStuck: () => {},
  stuckClassName: '',
  style: null,
};

export default Sticky;
