import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { TeamMembers } from './helper_functions';
import { useParams } from 'react-router-dom';

const TeamDetail = () => {
  const { teamId } = useParams();
  console.log("teamId", teamId)
  const displayedTeam = TeamMembers.find((teamMember) => teamMember.id === teamId);

  if (!displayedTeam) {
    return (
      <Flex>
        <Box>
          <Text as="h1" fontSize="25px" fontWeight="500">
            Team not found
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex>
      <Box>
        <Text as="h1" fontSize="25px" fontWeight="500">
          {displayedTeam.name} Team:
        </Text>
        <Text>{displayedTeam.description}</Text>
      </Box>
    </Flex>
  );
};

export default TeamDetail;
