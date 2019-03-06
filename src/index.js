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
    const { top: sentinelStaticPos } = this.sentinelStatic.current.getBoundingClientRect();
    const { top: sentinelStickyPos } = this.sentinelSticky.current.getBoundingClientRect();

    if (sentinelStaticPos < 0 && sentinelStickyPos < 0) {
      this.setState({
        viewportTopEdgePosition:
          VIEWPORT_TOP_EDGE_POSITIONS.BELOW_STICKY_CONTAINER,
      });
    }

    if (sentinelStaticPos < 0 && sentinelStickyPos >= 0) {
      this.setState({
        viewportTopEdgePosition:
          VIEWPORT_TOP_EDGE_POSITIONS.WITHIN_STICKY_CONTAINER,
      });
    }

    if (sentinelStaticPos >= 0 && sentinelStickyPos > 0) {
      this.setState({
        viewportTopEdgePosition:
          VIEWPORT_TOP_EDGE_POSITIONS.ABOVE_STICKY_CONTAINER,
      });
    }
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

  getStickyStyle = () => {
    const { offset } = this.props;

    return { ...(offset && { top: offset }) };
  };

  render() {
    const {
      children,
      className,
      offset,
      stuckClassName,
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
          style={this.getStickyStyle()}
          className={cx(styles.sticky, className, { [stuckClassName]: isStuck })}
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
  stuckClassName: PropTypes.string,
};

Sticky.defaultProps = {
  className: '',
  offset: null,
  stuckClassName: '',
};

export default Sticky;
