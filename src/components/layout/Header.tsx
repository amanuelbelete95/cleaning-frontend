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
      padding="20px"
      background="#389999"
      border="1px solid"
      borderRadius="16px"
      height="70px"
    >
      <Box display={'flex'} gap={'10px'} alignItems={'center'}>
        <Text as="h1" fontSize="xl" color="#ffffff" fontWeight="bold" borderRadius={'50px'} p={8}>
         cleanRR
        </Text>
        <Img src={logoImg} alt='image-logo' width={'50px'} height={'50px'} borderRadius={'25px'} backgroundColor={'none'}/>
      </Box>

      <Flex gap="30px" alignItems="center">
        {[
          { path: '', label: 'Home' },
          { path: 'events', label: 'Events' },
          { path: 'teams', label: 'Team' },
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
