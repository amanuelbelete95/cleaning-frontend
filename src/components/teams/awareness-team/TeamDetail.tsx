import { Box, Flex, Text} from '@chakra-ui/react'
import React from 'react'

import { TeamMembers } from './helper_functions';

import { useParams } from 'react-router-dom';

const TeamDetail = () =>  {

  const params = useParams();

  const displayedTeam = TeamMembers.find((teamMember) => teamMember.id === params.teamId)
  return (
    <Flex> 
    {
      displayedTeam ? 
      <Box>
      <Text as='h1' fontSize={'25px'} fontWeight={'500'}>{displayedTeam.name} Team:</Text>
      <Text >{displayedTeam.description}</Text> 
      </Box> : 
      <Box>
       <h2>Loading ....</h2>
      </Box>
    }

    </Flex>
  )
}

export default TeamDetail