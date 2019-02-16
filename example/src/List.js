import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-native-sticky';

const List = ({ children, getKey, header, values }) => (
  <div>
    <Sticky
      className="list-header-wrapper"
      stuckClassName="list-header-wrapper--stuck"
    >
      <div className="list-header">{header}</div>
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
  values: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default List;
