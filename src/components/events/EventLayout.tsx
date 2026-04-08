import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

function EventLayout() {
  const bg = useColorModeValue('gray.50', 'gray.900')
  
  return (
    <Box bg={bg} minH="calc(100vh - 140px)" py={6}>
      <Container maxW="1600px" px={{ base: 4, md: 6, lg: 8 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default EventLayout