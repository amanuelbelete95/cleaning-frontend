import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Divider,
  Button,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { EmailIcon, CalendarIcon, EditIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { getMe } from "./api/getMe";
import { User } from "./AuthProvider";
import { EventDesignSystem } from "../events/designSystem";

export const loader: LoaderFunction = async () => {
  const me = await getMe();
  return me;
};

export default function UserProfile() {
  const data = useLoaderData() as User;
  
  // Design tokens for a sleek, modern feel
  const bgColor = useColorModeValue(EventDesignSystem.primaryLight, EventDesignSystem.primaryDark);
  const secondaryTextColor = useColorModeValue(EventDesignSystem.primaryColor, "gray.400");
  const borderColor = useColorModeValue(EventDesignSystem.primaryDark, "gray.700");

  return (
    <Box maxW="900px" mx="auto" mt={8} px={4}>
      {/* Profile Card Container */}
      <Box
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="sm"
        
      >
        {/* Subtle Decorative Banner */}
        <Box h="120px" bgGradient="linear(to-r, blue.400, purple.500)" />

        <Box p={8} mt="-60px">
          <Flex direction={{ base: "column", md: "row" }} align="flex-end" justify="space-between" mb={8}>
            <HStack spacing={6} align="flex-end">
              <Avatar
                size="2xl"
                name={`${data.firstname} ${data.lastname}`}
                
                border="4px solid"
                borderColor={bgColor}
                boxShadow="xl"
              />
              <VStack align="start" spacing={1} pb={2}>
                <HStack>
                  <Heading size="lg">{data.firstname} {data.lastname}</Heading>
                  <Icon as={CheckCircleIcon} color="blue.500" boxSize={5} />
                </HStack>
                <Text color={secondaryTextColor} fontSize="md" fontWeight="medium">
                  {data.role}
                </Text>
              </VStack>
            </HStack>
            
            {/* <Button leftIcon={<EditIcon />} colorScheme="blue" variant="outline" size="sm" mt={{ base: 4, md: 0 }}>
              Edit Profile
            </Button> */}
          </Flex>

          <Divider mb={8} />

          {/* Info Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <VStack align="start" spacing={4}>
              <Text fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="widest" color="gray.500">
                Contact Information
              </Text>
              <HStack>
                <Icon as={EmailIcon} color="gray.400" />
                <Text fontSize="sm">{data.username}</Text>
              </HStack>
              <HStack>
                <Icon as={CalendarIcon} color="gray.400" />
                <Text fontSize="sm">Joined {new Date().toLocaleDateString()}</Text>
              </HStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="widest" color="gray.500">
                Account Status
              </Text>
              <HStack spacing={2}>
                <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="lg">
                  Verified
                </Badge>
              </HStack>
            </VStack>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}