import { CalendarIcon, CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Badge,
    Box,
    Divider,
    Flex,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { EventDesignSystem } from "../events/designSystem";
import { getMe } from "./api/getMe";
import { User } from "./AuthProvider";

export const loader: LoaderFunction = async () => {
  const me = await getMe();
  return me;
};

export default function UserProfile() {
  const data = useLoaderData() as User;

  const cardBg = useColorModeValue("white", "gray.800");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box maxW="900px" mx="auto" mt={8} px={4}>
      <Box
        bg={cardBg}
        borderWidth={EventDesignSystem.card.borderWidth}
        borderColor={EventDesignSystem.card.borderColor}
        borderRadius={EventDesignSystem.card.borderRadius}
        overflow="hidden"
        boxShadow={EventDesignSystem.card.shadow}
      >
        <Box
          h="120px"
          bgGradient={`linear(to-r, ${EventDesignSystem.primaryColor}, ${EventDesignSystem.primaryDark})`}
        />

        <Box p={8} mt="-60px" bg={cardBg}>
          <Flex direction={{ base: "column", md: "row" }} align="flex-end" justify="space-between" mb={8}>
            <HStack spacing={6} align="flex-end">
              <Avatar
                size="2xl"
                name={`${data.firstname} ${data.lastname}`}
                border="4px solid"
                borderColor={cardBg}
                boxShadow="xl"
              />
              <VStack align="start" spacing={1} pb={2}>
                <HStack>
                  <Heading size="lg" color="gray.800">{data.firstname} {data.lastname}</Heading>
                  <Icon as={CheckCircleIcon} color={EventDesignSystem.primaryColor} boxSize={5} />
                </HStack>
                <Text color={secondaryTextColor} fontSize="md" fontWeight="medium">
                  {data.role}
                </Text>
              </VStack>
            </HStack>
          </Flex>

          <Divider mb={8} />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <VStack align="start" spacing={4}>
              <Text fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="widest" color="gray.500">
                Contact Information
              </Text>
              <HStack p={3} bg={hoverBg} borderRadius="lg" w="full">
                <Box p={2} bg={`${EventDesignSystem.primaryColor}20`} borderRadius="md">
                  <Icon as={EmailIcon} color={EventDesignSystem.primaryColor} />
                </Box>
                <Text fontSize="sm" color="gray.700">{data.username}</Text>
              </HStack>
              <HStack p={3} bg={hoverBg} borderRadius="lg" w="full">
                <Box p={2} bg={`${EventDesignSystem.primaryColor}20`} borderRadius="md">
                  <Icon as={CalendarIcon} color={EventDesignSystem.primaryColor} />
                </Box>
                <Text fontSize="sm" color="gray.700">Joined {new Date().toLocaleDateString()}</Text>
              </HStack>
              <HStack p={3} bg={hoverBg} borderRadius="lg" w="full">
                <Box p={2} bg={`${EventDesignSystem.primaryColor}20`} borderRadius="md">
                  <Icon as={FiUsers} color={EventDesignSystem.primaryColor} />
                </Box>
                <Text fontSize="sm" color="gray.700" textTransform="capitalize">{data.role === 'admin' ? 'Administrator' : 'User'}</Text>
              </HStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="widest" color="gray.500">
                Account Status
              </Text>
              <HStack spacing={2}>
                <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="md">
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