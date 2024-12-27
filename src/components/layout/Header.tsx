import { Link } from 'react-router-dom';
import { Box, IconButton, Text, Flex } from '@chakra-ui/react';
import { BsRecycle } from 'react-icons/bs';

function Header() {
  return (
    <Flex direction={"row"} justifyContent={"space-around"} background='green'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        padding='0 20px'
        height='100px'
        color='white'>
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
            fontSize='lg'
            fontWeight='bold'>
            Arada Cleaning <br />Management Office
          </Text>
        </Flex>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        padding='10px 0'
        boxShadow='sm'
        fontWeight='bold'>
        <Flex
          gap='30px'
          fontSize='lg' color='#fff'>
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
    </Flex>
  );
}

export default Header;
