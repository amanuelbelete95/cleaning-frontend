import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { TeamMembers } from './helper_functions';
import { useParams, Link } from 'react-router-dom';

const TeamDetail = () => {
  const { teamName } = useParams();
  const displayedTeam = TeamMembers.find((teamMember) => teamMember.id === teamName);

  if (!displayedTeam) {
    return (
      <Flex direction="column" align="center" justify="center" mt={8}>
        <Text as="h1" fontSize="2xl" fontWeight="bold" mb={4}>
          Team Not Found
        </Text>
        <Link to="/team">
          <Button colorScheme="teal">Back to Teams</Button>
        </Link>
      </Flex>
    );
  }

  return (
    <Box p={6} boxShadow="md" border={"2px"} borderColor={"gray"}  bg="white" borderRadius="md" borderWidth="1px" maxWidth="600px" mx="auto" mt={8}>
      <Text as="h1" fontSize="2xl" fontWeight="bold" color="teal.700" mb={4}>
        {displayedTeam.name} Team
      </Text>
      <Text fontSize="md" color="gray.600" mb={6}>
        {displayedTeam.description}
      </Text>
      <Link to="/cleaning/team">
        <Button colorScheme="teal">Back to Teams</Button>
      </Link>
    </Box>
  );
};

export default TeamDetail;
