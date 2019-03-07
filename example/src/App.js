import React, { useState } from 'react';
import Sticky from 'react-modern-sticky';
import cx from 'classnames';

import usersGroupedByName from './usersGroupedByName';
import List from './List';
import Avatar from './Avatar';

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
              !lastSubheaderStuck && 'header--has-shadow',
            )}
          >
            Contacts
          </h1>
        )}
      </Sticky>
      {Object.entries(usersGroupedByName)
        .sort()
        .map(([firstLetterOfName, users]) => (
          <List
            key={firstLetterOfName}
            header={firstLetterOfName}
            values={users}
            getKey={user => user.name}
            onStuck={handleStuck}
          >
            {user => (
              <div className="user">
                <Avatar gender={user.gender} />
                <span className="name">
                  {user.name}
                </span>
              </div>
            )}
          </List>
        ))}
    </div>
  );
};
