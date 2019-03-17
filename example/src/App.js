import React, { useState } from 'react';
import Sticky from 'react-modern-sticky';
import cx from 'classnames';

import usersGroupedByName from './usersGroupedByName';
import UsersList from './UsersList';

export default () => {
  const [subheadersStuck, setSubheadersStuck] = useState(new Set());

  const handleStuck = (subheader, isStuck) => {
    setSubheadersStuck((state) => {
      const newState = new Set(state);

      if (isStuck) {
        newState.add(subheader);
      } else {
        newState.delete(subheader);
      }

      return newState;
    });
  };

  return (
    <div>
      <Sticky className="header-wrapper">
        {({ isStuck }) => (
          <h1
            className={cx(
              'header',
              isStuck && 'header--stuck',
              isStuck && !subheadersStuck.size && 'header--has-shadow',
            )}
          >
            Contacts
          </h1>
        )}
      </Sticky>
      {Object.entries(usersGroupedByName)
        .sort()
        .map(([firstLetterOfName, users]) => (
          <UsersList
            key={firstLetterOfName}
            header={firstLetterOfName}
            users={users}
            onStuck={handleStuck}
          />
        ))}
    </div>
  );
};
