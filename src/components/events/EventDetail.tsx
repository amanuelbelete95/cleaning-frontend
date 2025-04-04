import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
// import { useLoaderData } from 'react-router-dom'

function EventDetail() {

  // const event = useLoaderData()
  return (
    <Flex>
      <Box display={"flex"} gap={'20px'}>
      <Text> Event Name</Text>
      {/* <Text>{event.name}</Text> */}
    </Box>
    <Box display={"flex"} gap={'20px'}>
        <Text> Event Location</Text>
        {/* <Text>{event.location}</Text> */}
    </Box>
    </Flex>


  )
}

export default EventDetail