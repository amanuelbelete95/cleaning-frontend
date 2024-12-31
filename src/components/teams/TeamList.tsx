import { Link } from 'react-router-dom';
import { TeamMembers } from './awareness-team/helper_functions';
import { Box, VStack, Text } from '@chakra-ui/react';

const TeamList = () => {
  return (
    <VStack align="start" spacing={4} p={4}>
      {TeamMembers.map((teamMember) => (
        <Link key={teamMember.id} to={`${teamMember.id}`} style={{ textDecoration: 'none', width: '100%' }}>
          <Box
            p={4}
            bg="gray.50"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: 'teal.100' }}
            transition="background-color 0.2s"
            cursor="pointer"
          >
            <Text fontSize="lg" fontWeight="semibold" color="#389999"  _hover={{ color: '#444' }}>
              {teamMember.name}
            </Text>
          </Box>
        </Link>
      ))}
    </VStack>
  );
};

export default TeamList;
