import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.css';

class Sticky extends Component {
  state = { isStuck: false };

  sentinel = createRef();

  sticky = createRef();

  componentDidMount() {
    if (window.IntersectionObserver) {
      this.observer = new IntersectionObserver(this.observerCallback);
      this.observer.observe(this.sentinel.current);
      this.sentinelStyle = this.getSentinelStyle();
    }
  }

  componentWillUnmount() {
    if (window.IntersectionObserver) {
      this.observer.disconnect();
    }
  }

  observerCallback = (entries) => {
    entries.forEach((entry) => {
      const targetInfo = entry.boundingClientRect;
      const rootBoundsInfo = entry.rootBounds;

      if (targetInfo.bottom < rootBoundsInfo.top) {
        this.setState({ isStuck: true });
      }

      if (
        targetInfo.bottom >= rootBoundsInfo.top
        && targetInfo.bottom < rootBoundsInfo.bottom
      ) {
        this.setState({ isStuck: false });
      }
    });
  };

  getSentinelStyle = () => {
    const { offset } = this.props;

    if (offset) {
      return { top: -offset };
    }

    const stickyStyles = getComputedStyle(this.sticky.current);
    const top = parseInt(stickyStyles.top, 10);

    return { top: -top };
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
    const { isStuck } = this.state;

    return (
      <Fragment>
        <div
          ref={this.sentinel}
          className={styles.sentinel}
          style={this.sentinelStyle}
        />
        <div
          ref={this.sticky}
          style={this.getStickyStyle()}
          className={cx(styles.sticky, className, { [stuckClassName]: isStuck })}
          {...props}
        >
          {children instanceof Function ? children({ isStuck }) : children}
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
