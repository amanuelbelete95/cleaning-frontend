import { ArrowBackIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Card, CardBody, Divider, Flex, Grid, GridItem, Heading, HStack, Icon, SimpleGrid, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FiCalendar, FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { formatDate, formatDateISO, formatTime } from "../../utils/dateUtility";
import { useAuth } from "../auth/AuthProvider";
import BasicEventModalRegModal from "../BasicEventModalReg";
import { registerToEvent } from "../register-events/api/registerToEvent";
import getEvent from "./api/getEvent";
import { EventDesignSystem } from "./designSystem";
import { EventAPIResponse } from "./events.type";
import { useRegistrationInfo } from "./useRegistrationInfo";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  const event = await getEvent(id);
  return event;
};

const EventDetail = () => {
  const navigate = useNavigate();
  const event = useLoaderData() as EventAPIResponse;
  const { user } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const { canRegister, isEventFull, isEventExpired, isRegistered } = useRegistrationInfo(event);


  const { mutate: registerEventFn } = useMutation({
    mutationFn: async (data: any) => {
      const result = await registerToEvent(data);
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Event joined",
        description: "Event joined successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/events");
    },
    onError: (error: any) => {
      toast({
        title: "Event Join failed",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Box bg={bgColor} minH="100vh" py={{ base: 4, md: 8 }} px={{ base: 4, md: 8 }}>
      <Box maxW="1200px" mx="auto">
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          mb={4}
          onClick={() => navigate("/events")}
          color={EventDesignSystem.primaryColor}
        >
          Back to Events
        </Button>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          <GridItem>
            <Card bg={cardBg} borderRadius="xl" boxShadow="lg" overflow="hidden">
              <Box
                bg={`linear-gradient(135deg, ${EventDesignSystem.primaryColor} 0%, #2c5282 100%)`}
                px={{ base: 6, md: 8 }}
                py={{ base: 8, md: 10 }}
                position="relative"
              >
                <Box position="absolute" top={4} right={4}>
                  <Badge
                    colorScheme={
                      event.event_status === "published"
                        ? "green"
                        : event.event_status === "draft"
                          ? "yellow"
                          : "red"
                    }
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    {event.event_status}
                  </Badge>
                </Box>
                <VStack align="start" spacing={3}>
                  <Heading size={{ base: "xl", md: "2xl" }} color="white" fontWeight="bold">
                    {event.name}
                  </Heading>
                  <HStack spacing={4} flexWrap="wrap">
                    <HStack spacing={2} color="whiteAlpha.900">
                      <Icon as={FiCalendar} boxSize={5} />
                      <Text fontSize="md" fontWeight="medium">
                        {formatDate(event.event_date)}
                      </Text>
                    </HStack>
                    <HStack spacing={2} color="whiteAlpha.900">
                      <Icon as={FiClock} boxSize={5} />
                      <Text fontSize="md" fontWeight="medium">
                        {formatTime(event.event_date)}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Box>

              <CardBody p={{ base: 5, md: 8 }}>
                <VStack align="stretch" spacing={6}>
                  <Box>
                    <Heading size="md" mb={4} color="gray.700">
                      About this event
                    </Heading>
                    <Text fontSize="md" color="gray.600" lineHeight="tall" whiteSpace="pre-line">
                      {event.description || "No description provided."}
                    </Text>
                  </Box>

                  <Divider />

                  <Box>
                    <Heading size="md" mb={4} color="gray.700">
                      Event Details
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <Flex align="center" p={4} bg={bgColor} borderRadius="lg">
                        <Box
                          p={3}
                          bg={`${EventDesignSystem.primaryColor}15`}
                          borderRadius="lg"
                          mr={4}
                        >
                          <Icon as={FiMapPin} boxSize={5} color={EventDesignSystem.primaryColor} />
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" fontWeight="medium">
                            Location
                          </Text>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700" noOfLines={2}>
                            {event.location}
                          </Text>
                        </Box>
                      </Flex>

                      <Flex align="center" p={4} bg={bgColor} borderRadius="lg">
                        <Box
                          p={3}
                          bg={`${EventDesignSystem.primaryColor}15`}
                          borderRadius="lg"
                          mr={4}
                        >
                          <Icon as={FiCalendar} boxSize={5} color={EventDesignSystem.primaryColor} />
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" fontWeight="medium">
                            Date
                          </Text>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">
                            {formatDate(event.event_date)}
                          </Text>
                        </Box>
                      </Flex>

                      <Flex align="center" p={4} bg={bgColor} borderRadius="lg">
                        <Box
                          p={3}
                          bg={`${EventDesignSystem.primaryColor}15`}
                          borderRadius="lg"
                          mr={4}
                        >
                          <Icon as={FiClock} boxSize={5} color={EventDesignSystem.primaryColor} />
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" fontWeight="medium">
                            Time
                          </Text>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">
                            {formatTime(event.event_date)}
                          </Text>
                        </Box>
                      </Flex>

                      <Flex align="center" p={4} bg={bgColor} borderRadius="lg">
                        <Box
                          p={3}
                          bg={`${EventDesignSystem.primaryColor}15`}
                          borderRadius="lg"
                          mr={4}
                        >
                          <Icon as={FiUsers} boxSize={5} color={EventDesignSystem.primaryColor} />
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" fontWeight="medium">
                            Capacity
                          </Text>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">
                            {event.capacity} attendees
                          </Text>
                        </Box>
                      </Flex>
                    </SimpleGrid>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem>
            <VStack spacing={6} align="stretch">
              <Card bg={cardBg} borderRadius="xl" boxShadow="lg" p={6}>
                <Heading size="md" mb={4} color="gray.700">
                  Registration Status
                </Heading>
                <VStack spacing={4} align="stretch">
                  <SimpleGrid columns={2} spacing={4}>
                    <Stat>
                      <StatLabel color="gray.500" fontSize="sm">
                        Registered
                      </StatLabel>
                      <StatNumber color={EventDesignSystem.primaryColor} fontSize="2xl">
                        {event.registration_count}
                      </StatNumber>
                      <StatHelpText mb={0}>
                        <StatArrow type="increase" />
                        of {event.capacity}
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel color="gray.500" fontSize="sm">
                        Available
                      </StatLabel>
                      <StatNumber color="green.500" fontSize="2xl">
                        {event.capacity - event.registration_count}
                      </StatNumber>
                      <StatHelpText mb={0}>spots left</StatHelpText>
                    </Stat>
                  </SimpleGrid>

                  <Box>
                    <Box
                      h="8px"
                      bg="gray.200"
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <Box
                        h="full"
                        w={`${Math.min((event.registration_count / event.capacity) * 100, 100)}%`}
                        bg={isEventFull ? "red.400" : EventDesignSystem.primaryColor}
                        borderRadius="full"
                        transition="width 0.3s ease"
                      />
                    </Box>
                    <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                      {Math.round((event.registration_count / event.capacity) * 100)}% filled
                    </Text>
                  </Box>

                  {isRegistered && (
                    <Badge colorScheme="green" variant="subtle" p={2} borderRadius="md" textAlign="center">
                      You are registered for this event
                    </Badge>
                  )}

                  {isEventExpired && (
                    <Badge colorScheme="red" variant="subtle" p={2} borderRadius="md" textAlign="center">
                      This event has ended
                    </Badge>
                  )}
                </VStack>
              </Card>

              <Card bg={cardBg} borderRadius="xl" boxShadow="lg" p={6}>
                <Heading size="md" mb={4} color="gray.700">
                  Quick Actions
                </Heading>
                <VStack spacing={3} align="stretch">
                  <Button
                    w="full"
                    bg={EventDesignSystem.primaryColor}
                    color="white"
                    _hover={{ opacity: 0.9 }}
                    leftIcon={<ViewIcon />}
                    onClick={() => navigate("/events")}
                  >
                    View All Events
                  </Button>
                  {user?.role !== "admin" && canRegister && (
                    <Button
                      w="full"
                      bg={canRegister ? EventDesignSystem.primaryColor : "gray.400"}
                      color="white"
                      _hover={{ opacity: canRegister ? 0.9 : 1 }}
                      leftIcon={<ExternalLinkIcon />}
                      onClick={onOpen}
                      display={
                        canRegister &&
                        // as long as canregister is true, we want to show the button to the admin and user who is not registered, but hide it from the user who is already registered
                          (
                            user?.role === "admin" ||
                            !isRegistered
                          )
                          ? "inline-block"
                          : "none"
                      }
                    >
                      Register
                    </Button>
                  )}
                </VStack>
              </Card>
            </VStack>
          </GridItem>
        </Grid>
      </Box>

      <BasicEventModalRegModal
        isOpen={isOpen}
        title="Register for Event"
        onConfirm={registerEventFn}
        event={event}
        onClose={onClose}
      />
    </Box>
  );
};

export default EventDetail;
