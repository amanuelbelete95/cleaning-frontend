import { Link } from 'react-router-dom';
import { TeamMembers } from './awareness-team/helper_functions';
import { Box } from '@chakra-ui/react';

const TeamList = () => {
  return (
    <Box >
      {TeamMembers.map((teamMember) => (
        <Box key={teamMember.id}>
          <Link to={`/team/${teamMember.id}`} color={"green"} >
            {teamMember.name}
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default TeamList;
