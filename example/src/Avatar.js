import React from 'react';
import PropTypes from 'prop-types';

const getId = (() => {
  let i = 0;

  // eslint-disable-next-line no-plusplus
  return () => i++;
})();

const getGender = gender => ({
  male: 'men',
  female: 'women',
}[gender]);

const Avatar = ({ gender }) => (
  <img
    src={`https://randomuser.me/api/portraits/${getGender(gender)}/${getId()
      % 100}.jpg`}
    alt=""
    className="avatar"
  />
);

Avatar.propTypes = { gender: PropTypes.oneOf(['male', 'female']).isRequired };

export default Avatar;
