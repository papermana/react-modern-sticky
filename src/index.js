import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.css';

const VIEWPORT_TOP_EDGE_POSITIONS = {
  NULL: 'NULL',
  ABOVE_STICKY_CONTAINER: 'ABOVE_STICKY_CONTAINER',
  WITHIN_STICKY_CONTAINER: 'WITHIN_STICKY_CONTAINER',
  BELOW_STICKY_CONTAINER: 'BELOW_STICKY_CONTAINER',
};

class Sticky extends Component {
  state = { viewportTopEdgePosition: VIEWPORT_TOP_EDGE_POSITIONS.NULL };

  sentinelStatic = createRef();

  sentinelSticky = createRef();

  sticky = createRef();

  offset = 0;

  componentDidMount() {
    if (window.IntersectionObserver) {
      this.offset = this.getOffset();

      this.observer = new IntersectionObserver(this.observerCallback);
      this.observer.observe(this.sentinelStatic.current);
      this.observer.observe(this.sentinelSticky.current);
    }
  }

  componentWillUnmount() {
    if (window.IntersectionObserver) {
      this.observer.disconnect();
    }
  }

  observerCallback = () => {
    const {
      top: sentinelStaticPos,
    } = this.sentinelStatic.current.getBoundingClientRect();
    const {
      top: sentinelStickyPos,
    } = this.sentinelSticky.current.getBoundingClientRect();
    const { onStuck } = this.props;

    this.setState(
      () => {
        if (sentinelStaticPos < 0 && sentinelStickyPos < 0) {
          return {
            viewportTopEdgePosition:
              VIEWPORT_TOP_EDGE_POSITIONS.BELOW_STICKY_CONTAINER,
          };
        }

        if (sentinelStaticPos < 0 && sentinelStickyPos >= 0) {
          return {
            viewportTopEdgePosition:
              VIEWPORT_TOP_EDGE_POSITIONS.WITHIN_STICKY_CONTAINER,
          };
        }

        if (sentinelStaticPos >= 0 && sentinelStickyPos > 0) {
          return {
            viewportTopEdgePosition:
              VIEWPORT_TOP_EDGE_POSITIONS.ABOVE_STICKY_CONTAINER,
          };
        }

        return null;
      },
      () => {
        onStuck(this.getIsStuck());
      },
    );
  };

  getIsStuck = () => {
    const { viewportTopEdgePosition } = this.state;

    return {
      [VIEWPORT_TOP_EDGE_POSITIONS.ABOVE_STICKY_CONTAINER]: false,
      [VIEWPORT_TOP_EDGE_POSITIONS.WITHIN_STICKY_CONTAINER]: true,
      [VIEWPORT_TOP_EDGE_POSITIONS.BELOW_STICKY_CONTAINER]: false,
      [VIEWPORT_TOP_EDGE_POSITIONS.NULL]: false,
    }[viewportTopEdgePosition];
  };

  getOffset = () => {
    const { offset } = this.props;

    if (offset) {
      return offset;
    }

    const stickyStyles = getComputedStyle(this.sticky.current);
    const top = parseInt(stickyStyles.top, 10);

    return top;
  };

  render() {
    const {
      children,
      className,
      offset,
      onStuck,
      stuckClassName,
      style,
      ...props
    } = this.props;
    const isStuck = this.getIsStuck();

    return (
      <Fragment>
        <div
          ref={this.sentinelStatic}
          className={styles.sentinel}
          style={{ top: -this.offset }}
        />
        <div
          {...props}
          ref={this.sticky}
          style={{ ...style, ...(offset && { top: offset }) }}
          className={cx(styles.sticky, className, {
            [stuckClassName]: isStuck,
          })}
        >
          {children instanceof Function ? children({ isStuck }) : children}
          <div
            ref={this.sentinelSticky}
            style={{ top: -this.offset }}
            className={styles.sentinel}
          />
        </div>
      </Fragment>
    );
  }
}

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
