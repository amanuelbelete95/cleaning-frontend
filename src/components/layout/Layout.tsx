// Layout.js
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { EventDesignSystem } from '../events/designSystem';

const Layout = () => {
  const pageBg = useColorModeValue(EventDesignSystem.background.primary, EventDesignSystem.background.dark);

  return (
    <Flex display="flex" direction={"column"} minHeight={"100vh"} bg={pageBg}>
      <Header />
      <Box as="main" flex={1} py={6}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;

