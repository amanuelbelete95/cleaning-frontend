import { Box, Flex, Text, Link as ChakraLink, Img } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.jpeg'

function Header() {
  const location = useLocation();

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      background="#389999"
      border="1px solid"
      borderRadius="16px"
      height="auto"
    >
      <Box display={'flex'} alignItems={'center'} flexDirection={"column"}>
        <Text as="h1" fontSize="xl" color="#ffffff" fontWeight="bold" borderRadius={'md'}>
          Event Tracking System
        </Text>
        <Text as="p" fontSize="xxs" color="gray.300" fontWeight="bold">Manage your organization event to managing your schedule !</Text>
      </Box>

      <Flex gap="30px" alignItems="center">
        {[
          { path: '', label: 'Home' },
          { path: 'events', label: 'Events' },
          // { path: 'teams', label: 'Team' },
          { path: 'settings', label: 'Settings' },
          { path: 'contact', label: 'Contacts' },
        ].map(({ path, label }) => (
          <ChakraLink
            as={Link}
            to={path}
            key={path}
            textDecoration="none"
            fontSize="xlg"
            fontWeight="bold"
            color={location.pathname === path ? '#fff' : '#444'}
            _hover={{ color: '#fff' }}
            _activeLink={{ textDecoration: 'underline' }}
          >
            {label}
          </ChakraLink>
        ))}
      </Flex>
    </Flex>
  );
}

export default Header;
