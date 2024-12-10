import { Link } from 'react-router-dom';
import { Box, IconButton, Text, Flex } from '@chakra-ui/react';
import { BsRecycle } from 'react-icons/bs';

function Header() {
  return (
    <header>
      {/* Header Top Section */}
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        padding='0 40px'
        height='100px'
        background='green'
        color='white'>
        {/* Logo and Title */}
        <Flex
          alignItems='center'
          gap='15px'>
          <IconButton
            aria-label='logo'
            icon={<BsRecycle />}
            size='lg'
            colorScheme='teal'
            variant='ghost'
          />
          <Text
            as='h1'
            fontSize='xl'
            fontWeight='bold'>
            Cleaning Management Agency - Sanitation
          </Text>
        </Flex>
      </Box>

      {/* Navigation Section */}
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        background='white'
        padding='10px 0'
        boxShadow='sm'
        fontWeight='bold'>
        <Flex
          gap='30px'
          fontSize='lg'
          color='green'>
          <Link
            to='/'
            style={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link
            to='/work'
            style={{ textDecoration: 'none' }}>
            Work
          </Link>
          <Link
            to='/team'
            style={{ textDecoration: 'none' }}>
            Team
          </Link>
          <Link
            to='/contact'
            style={{ textDecoration: 'none' }}>
            Contacts
          </Link>
        </Flex>
      </Box>
    </header>
  );
}

export default Header;
