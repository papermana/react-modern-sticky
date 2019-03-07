import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-modern-sticky';

import Avatar from './Avatar';

const UsersList = ({ header, onStuck, users }) => (
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
      {users.map(user => (
        <div key={user.name} className="list-item user">
          <Avatar gender={user.gender} />
          <span className="name">
            {user.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

UsersList.propTypes = {
  header: PropTypes.string.isRequired,
  onStuck: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      gender: PropTypes.oneOf(['male', 'female']).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default UsersList;
