import {
  Box,
  Tabs,
  TabList,
  Tab,
  Container,
  Heading,
  Text,
  Card,
  CardBody,
  VStack,
  Icon,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { EventDesignSystem } from "../../events/designSystem";
import { FiCalendar } from "react-icons/fi";

function UserLogInRegisterLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTabIndex = location.pathname === "/login/new" ? 1 : 0;

  const bgPage = useColorModeValue(EventDesignSystem.background.primary, EventDesignSystem.background.dark);
  const cardBg = useColorModeValue(EventDesignSystem.background.secondary, EventDesignSystem.background.darkSecondary);

  useEffect(() => {
    navigate(activeTabIndex === 0 ? "/login" : "/login/new", { replace: true })
  }, [])

  return (
    <Flex minH="100vh" bg={bgPage} py={{ base: 8, md: 20 }} w={"100%"} align="center" justify="center">
      <VStack spacing={8} w="full" maxW="md">
        <VStack spacing={2}>
          <Flex
            align="center"
            gap={2}
            p={3}
            bg={`${EventDesignSystem.primaryColor}15`}
            borderRadius="xl"
          >
            <Icon as={FiCalendar} boxSize={8} color={EventDesignSystem.primaryColor} />
            <Heading
              size="lg"
              color={EventDesignSystem.primaryColor}
              fontWeight="bold"
            >
              EMS
            </Heading>
          </Flex>
          <Text color="gray.500" fontSize="sm" textAlign="center">
            Event Management System
          </Text>
        </VStack>

        <Card bg={cardBg} boxShadow="xl" borderRadius="2xl" w="full">
          <CardBody p={{ base: 6, md: 8 }}>
            <VStack spacing={6}>
              <Box textAlign="center" w="full">
                <Heading size="md" mb={1}>
                  Welcome back
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  {activeTabIndex === 0 ? "Sign in to your account" : "Create a new account"}
                </Text>
              </Box>

              <Tabs
                index={activeTabIndex}
                variant="soft-rounded"
                colorScheme="blue"
                w="full"
                isFitted
              >
                <TabList bg={useColorModeValue("gray.100", "gray.700")} borderRadius="lg" p={1}>
                  <Tab
                    borderRadius="md"
                    onClick={() => navigate("/login")}
                    _selected={{ bg: "white", color: "blue.600", boxShadow: "sm" }}
                  >
                    Sign in
                  </Tab>
                  <Tab
                    borderRadius="md"
                    onClick={() => navigate("/login/new")}
                    _selected={{ bg: "white", color: "blue.600", boxShadow: "sm" }}
                  >
                    Register
                  </Tab>
                </TabList>
              </Tabs>

              <Box w="full">
                <Outlet />
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Flex>
  );
}

export default UserLogInRegisterLayout;
