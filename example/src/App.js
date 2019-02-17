import React from 'react';
import Sticky from 'react-modern-sticky';
import cx from 'classnames';

import usersGroupedByName from './usersGroupedByName';
import List from './List';
import Avatar from './Avatar';

export default () => (
  <div>
    <Sticky className="header-wrapper">
      {({ isStuck }) => (
        <h1 className={cx('header', isStuck && 'header--stuck')}>Contacts</h1>
      )}
    </Sticky>
    <div className="header-shadow" />
    {Object.entries(usersGroupedByName)
      .sort()
      .map(([firstLetterOfName, users]) => (
        <List
          key={firstLetterOfName}
          header={firstLetterOfName}
          values={users}
          getKey={user => user.name}
        >
          {user => (
            <div className="user">
              <Avatar gender={user.gender} />
              <span className="name">{user.name}</span>
            </div>
          )}
        </List>
      ))}
  </div>
);
