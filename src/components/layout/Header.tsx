import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="20px"
      background="#389999"
      border="1px solid"
      borderRadius="16px"
      height="70px"
    >
      <Box>
        <Text as="h1" fontSize="xl" color="#ffffff" fontWeight="bold">
          AA_SubCity Cleansing Management Office
        </Text>
      </Box>

      <Flex gap="30px" alignItems="center">
        {[
          { path: '/', label: 'Home' },
          { path: '/events', label: 'events' },
          { path: '/team', label: 'Team' },
          { path: '/contact', label: 'Contacts' },
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
