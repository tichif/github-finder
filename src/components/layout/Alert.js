import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={` alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    )
  );
};

Alert.propsTypes = {
  alert: PropTypes.object.isRequired,
};

export default Alert;
