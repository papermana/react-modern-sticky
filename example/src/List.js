import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-modern-sticky';

const List = ({ children, getKey, header, onStuck, values }) => (
  <div>
    <Sticky
      className="list-header-wrapper"
      stuckClassName="list-header-wrapper--stuck"
      onStuck={isStuck => onStuck(header, isStuck)}
    >
      <div className="list-header">
        {header}
      </div>
    </Sticky>
    <div className="list">
      {values.map(value => (
        <div key={getKey(value)} className="list-item">
          {children(value)}
        </div>
      ))}
    </div>
  </div>
);

List.propTypes = {
  children: PropTypes.func.isRequired,
  getKey: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  onStuck: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default List;
