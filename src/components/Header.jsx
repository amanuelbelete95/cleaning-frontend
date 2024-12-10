import { Link } from 'react-router-dom';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { BsRecycle } from 'react-icons/bs';

function Header() {
  return (
    <header>
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        fontWeight={'900'}
        fontSize={'x-large'}
        gap={'40px'}
        color={'#fff'}
        alignItems={'center'}
        height={'100px'}
        background={'green'}>
        <Text as={'h1'}>Cleaning Management Agency-Sanitation</Text>
        <IconButton
          aria-label='logo'
          size={'xxlg'}
          icon={<BsRecycle />}
        />
      </Box>
      <Box
        display='flex'
        alignItems={'center'}
        justifyContent={'center'}
        gap={'20px'}
        fontSize={'4xl'}
        fontWeight={'900'}>
        <Link
          to='/'
          size={'lg'}>
          Home
        </Link>
        <Link
          to='/work'
          size={'lg'}>
          Work
        </Link>
        <Link
          to='/team'
          size={'lg'}>
          Team
        </Link>
        <Link
          to='/contact'
          size={'lg'}>
          Contacts
        </Link>
      </Box>
    </header>
  );
}

export default Header;
