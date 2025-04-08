import { Box, Text, Divider, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const TeamsLayout = () => {
  return (
    <VStack align="stretch" spacing={4} p={6} bg="gray.800" minH="100vh" >
      <Box textAlign="center" p={4} bg="teal.500" color="#444" borderRadius="md">
        <Text as="h1" fontSize="2xl" fontWeight="bold">
         Teams
        </Text>
        <Text>
        </Text>
      </Box>
      <Divider />
      <Box flex="1">
        <Outlet />
      </Box>
    </VStack>
  );
};

export default TeamsLayout;
