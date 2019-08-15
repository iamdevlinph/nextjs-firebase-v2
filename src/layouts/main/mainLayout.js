import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/navbar/navbar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
