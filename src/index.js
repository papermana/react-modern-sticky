import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.css';

class Sticky extends Component {
  state = { isStuck: false };

  sentinel = createRef();

  sticky = createRef();

  componentDidMount() {
    this.observer = new IntersectionObserver(this.observerCallback);
    this.observer.observe(this.sentinel.current);
    this.sentinelStyle = this.getSentinelStyle();
  }

  componentWillUnmount() {
    this.observer.disconnect();
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
    const stickyStyles = getComputedStyle(this.sticky.current);
    const top = parseInt(stickyStyles.top, 10);

    return { top: `${-top}px` };
  };

  render() {
    const { children, className, stuckClassName, ...props } = this.props;
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
  stuckClassName: PropTypes.string,
};

Sticky.defaultProps = {
  className: '',
  stuckClassName: '',
};

export default Sticky;
