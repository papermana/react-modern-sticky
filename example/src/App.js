import React, { useState } from 'react';
import Sticky from 'react-modern-sticky';
import cx from 'classnames';

import usersGroupedByName from './usersGroupedByName';
import UsersList from './UsersList';

export default () => {
  const [lastSubheaderStuck, setLastSubheaderStuck] = useState(null);

  const handleStuck = (subheader, isStuck) => {
    if (lastSubheaderStuck === subheader && !isStuck) {
      setLastSubheaderStuck(null);
    } else if (!lastSubheaderStuck && isStuck) {
      setLastSubheaderStuck(subheader);
    }
  };

  return (
    <div>
      <Sticky className="header-wrapper">
        {({ isStuck }) => (
          <h1
            className={cx(
              'header',
              isStuck && 'header--stuck',
              isStuck && !lastSubheaderStuck && 'header--has-shadow',
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
