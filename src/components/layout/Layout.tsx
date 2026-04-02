// Layout.js
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { Box, Flex } from '@chakra-ui/react';

const Layout = () => {

  return (
    <Flex display="flex" direction={"column"} minHeight={"100vh"}>
      <Header />
      <Outlet />
      <Footer />
    </Flex>
  );
};

export default Layout;

