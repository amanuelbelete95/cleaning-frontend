import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import TeamDetail from './awareness-team/TeamDetail';
import { TeamMembers } from './awareness-team/helper_functions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
type TeamProps = {
  name: string;
  description: string;
  imgUrl?: string;
  linkUrl: string;
};

const Teams = () => {
  const navigate = useNavigate();

  const TeamMember: React.FC<TeamProps> = ({
    name,
    description,
    imgUrl,
    linkUrl,
  }) => {
    return (
      <>
        <Box>
          <Text
            as={'h1'}
            fontSize={'lg'}>
            {name}
          </Text>
          <Box>
            <img
              src={imgUrl}
              alt={`${name}-image`}
              width={'300px'}
              height={'auto'}
            />
          </Box>
          <Box>
            <Text
              as={'h2'}
              fontSize={'sm'}>
              Team Info
            </Text>
            <Text>{description}</Text>
          </Box>
          <Button
            onClick={() => navigate(`${linkUrl}`)}
            display={'inline-block'}
            padding={'5px'}
            color={'blue'}
            border={'2px solid gray'}
            fontSize={'25px'}>
            See Details
          </Button>
        </Box>
      </>
    );
  };

  return (
    <Box>
      <h1>SMO</h1>
      {TeamMembers.map((team) => (
        <Link to={`/teams/${team.id}/detail`}>
          <TeamMember
            key={team.id}
            name={team.name}
            description={team.description}
            imgUrl={team.imgUrl}
            linkUrl={`/teams/${team.id}/detail`}
          />
        </Link>
      ))}
    </Box>
  );
};

export default Teams;
