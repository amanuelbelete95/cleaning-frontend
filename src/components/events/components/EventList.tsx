import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    Flex,
    Grid,
    Heading,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Text,
    useColorModeValue,
    useToast,
    VStack
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiMapPin, FiUsers, FiFilter } from "react-icons/fi";
import { PermissionGuard } from "../../PermissionGuard";
import { onDelete } from "../api/deleteEvents";
import getAllEvents from "../api/getAllEvents";
import { EventDesignSystem } from "../designSystem";
import EventCard from "./EventCard";
import { useAuth } from "../../auth/AuthProvider";
import { EventAPIResponse } from "../events.type";
import EventsPageSkeleton from "../skeletons/EventsPageSkeleton";

const EventList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const pageBg = useColorModeValue("gray.50", "gray.900");
    const cardBg = useColorModeValue("white", "gray.800");
    const { user } = useAuth();
    const toast = useToast();

    const { data: events = [], refetch, isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: getAllEvents,
    });

    const recentEvents = events
        .sort(
            (a: EventAPIResponse, b: EventAPIResponse) =>
                new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
        );

    const stats = useMemo(() => {
        const published = events.filter(e => e.event_status === "published").length;
        const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
        const totalRegistered = events.filter(e => e.is_registered).length;
        const upcoming = events.filter(e => new Date(e.event_date) > new Date()).length;
        return { published, totalCapacity, totalRegistered, upcoming };
    }, [events]);

    const filteredEvents = useMemo(() => {
        if (!searchTerm) return recentEvents;
        const lower = searchTerm.toLowerCase();
        return recentEvents.filter(
            (event) =>
                event.name.toLowerCase().includes(lower) ||
                event.location.toLowerCase().includes(lower) ||
                event.event_status?.toLowerCase().includes(lower)
        );
    }, [events, searchTerm]);

    const { mutate: deleteEventFn } = useMutation({
        mutationFn: (id: string) => onDelete(id),
        onSuccess: () => {
            refetch();
            toast({
                title: "Event deleted",
                description: "Event deleted successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate("/events");
        },
        onError: (error: any) => {
            toast({
                title: "Event delete Failed",
                description: `${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        },
    });

    const adminEvents = filteredEvents;
    const userEvents = filteredEvents.filter(event => event.event_status === "published");
    if (isLoading) return <EventsPageSkeleton />;
    return (
        <Box bg={"white"} minH="100vh" w="100%">
            <Box
                bg={`linear-gradient(135deg, ${EventDesignSystem.primaryColor} 0%, #2c5282 100%)`}
                px={{ base: 4, md: 8 }}
                py={{ base: 6, md: 10 }}
                position="relative"
                overflow="hidden"
            >
                <Box
                    position="absolute"
                    top="-50%"
                    right="-10%"
                    w="400px"
                    h="400px"
                    bg="whiteAlpha.100"
                    borderRadius="full"
                />
                <Box
                    position="absolute"
                    bottom="-30%"
                    left="-5%"
                    w="300px"
                    h="300px"
                    bg="whiteAlpha.50"
                    borderRadius="full"
                />

                <VStack spacing={6} align="stretch" position="relative" zIndex={1} maxW="1400px" mx="auto">
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        justify="space-between"
                        align={{ base: "start", md: "center" }}
                        gap={4}
                    >
                        <Box>
                            <Heading size={{ base: "xl", md: "2xl" }} color="white" fontWeight="bold" mb={2}>
                                Discover Events
                            </Heading>
                            <Text color="whiteAlpha.900" fontSize={{ base: "sm", md: "md" }}>
                                Find and join exciting events happening near you
                            </Text>
                        </Box>

                        <PermissionGuard allowedRoles={["admin"]}>
                            <Button
                                leftIcon={<AddIcon />}
                                onClick={() => navigate("new")}
                                size="lg"
                                borderRadius="xl"
                                bg="white"
                                color={EventDesignSystem.primaryColor}
                                _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
                                boxShadow="lg"
                                transition="all 0.2s"
                            >
                                Create Event
                            </Button>
                        </PermissionGuard>
                    </Flex>

                    <SimpleGrid columns={{ base: 2, md: 2, lg: 3 }} spacing={{ base: 3, md: 6 }}>
                        <Card bg="whiteAlpha.200" backdropFilter="blur(10px)" borderRadius="xl" p={{ base: 3, md: 4 }}>
                            <Stat>
                                <StatLabel color="whiteAlpha.800" fontSize={{ base: "xs", md: "sm" }}>
                                    Published Events
                                </StatLabel>
                                <StatNumber color="white" fontSize={{ base: "2xl", md: "3xl" }}>
                                    {events.length}
                                </StatNumber>
                                <StatHelpText color="whiteAlpha.700" mb={0} fontSize={{ base: "xs", md: "sm" }}>
                                    {stats.published} published
                                </StatHelpText>
                            </Stat>
                        </Card>

                        <Card bg="whiteAlpha.200" backdropFilter="blur(10px)" borderRadius="xl" p={{ base: 3, md: 4 }}>
                            <Stat>
                                <StatLabel color="whiteAlpha.800" fontSize={{ base: "xs", md: "sm" }}>
                                    Registration
                                </StatLabel>
                                <StatNumber color="white" fontSize={{ base: "2xl", md: "3xl" }}>
                                    {events.length}
                                </StatNumber>
                                <StatHelpText color="whiteAlpha.700" mb={0} fontSize={{ base: "xs", md: "sm" }}>
                                    <Icon as={FiUsers} verticalAlign="middle" mr={1} />
                                    {stats.totalRegistered} registered
                                </StatHelpText>
                            </Stat>
                        </Card>

                        <Card bg="whiteAlpha.200" backdropFilter="blur(10px)" borderRadius="xl" p={{ base: 3, md: 4 }}>
                            <Stat>
                                <StatLabel color="whiteAlpha.800" fontSize={{ base: "xs", md: "sm" }}>
                                    Upcoming Events
                                </StatLabel>
                                <StatNumber color="white" fontSize={{ base: "2xl", md: "3xl" }}>
                                    {stats.upcoming}
                                </StatNumber>
                                <StatHelpText color="whiteAlpha.700" mb={0} fontSize={{ base: "xs", md: "sm" }}>
                                    <Icon as={FiCalendar} verticalAlign="middle" mr={1} />
                                    Next 30 days
                                </StatHelpText>
                            </Stat>
                        </Card>
                        <PermissionGuard allowedRoles={["admin"]}>
                            <Card bg="whiteAlpha.200" backdropFilter="blur(10px)" borderRadius="xl" p={{ base: 3, md: 4 }}>
                                <Stat>
                                    <StatLabel color="whiteAlpha.800" fontSize={{ base: "xs", md: "sm" }}>
                                        Registration Rate
                                    </StatLabel>
                                    <StatNumber color="white" fontSize={{ base: "2xl", md: "3xl" }}>
                                        {stats.totalCapacity > 0 ? Math.round((stats.totalRegistered / stats.totalCapacity) * 100) : 0}%
                                    </StatNumber>
                                    <StatHelpText color="whiteAlpha.700" mb={0} fontSize={{ base: "xs", md: "sm" }}>
                                        Overall fill rate
                                    </StatHelpText>
                                </Stat>
                            </Card>
                        </PermissionGuard>
                    </SimpleGrid>
                </VStack>
            </Box>

            <Box px={{ base: 4, md: 8 }} py={8} maxW="1400px" mx="auto">
                <VStack spacing={6} align="stretch">
                    <Flex
                        direction={{ base: "column", sm: "row" }}
                        justify="space-between"
                        align={{ base: "stretch", sm: "center" }}
                        gap={4}
                    >
                        <HStack spacing={2}>
                            <Icon as={FiFilter} color="gray.500" />
                            <Text fontWeight="semibold" color="gray.700">
                                {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"} Found
                            </Text>
                            {searchTerm && (
                                <Badge colorScheme="blue" variant="subtle" px={2} py={1} borderRadius="md">
                                    Searching: "{searchTerm}"
                                </Badge>
                            )}
                        </HStack>

                        <Box maxW={{ base: "100%", sm: "350px" }} w="100%">
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <SearchIcon color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    placeholder="Search events..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    bg={cardBg}
                                    borderRadius="xl"
                                    borderWidth="1px"
                                    borderColor="gray.200"
                                    _focus={{
                                        borderColor: EventDesignSystem.primaryColor,
                                        boxShadow: `0 0 0 1px ${EventDesignSystem.primaryColor}`,
                                    }}
                                />
                            </InputGroup>
                        </Box>
                    </Flex>

                    {filteredEvents.length > 0 ? (
                        <Grid
                            templateColumns={{
                                base: "1fr",
                                sm: "repeat(2, 1fr)",
                                lg: "repeat(3, 1fr)",
                                xl: "repeat(4, 1fr)",
                            }}
                            gap={6}
                        >
                            {(user?.role === "admin" ? adminEvents : userEvents).map((event) => (
                                <EventCard key={event.id} event={event} onDeleteEvent={deleteEventFn} />
                            ))}
                        </Grid>
                    ) : (
                        <Card bg={cardBg} borderRadius="xl" boxShadow="md" overflow="hidden">
                            <CardBody py={16} textAlign="center">
                                <VStack spacing={4}>
                                    <Box
                                        p={4}
                                        bg={`${EventDesignSystem.primaryColor}10`}
                                        borderRadius="full"
                                    >
                                        <Icon as={FiCalendar} boxSize={8} color={EventDesignSystem.primaryColor} />
                                    </Box>
                                    <Heading size="md" color="gray.700">
                                        {searchTerm ? "No matching events found" : "No events yet"}
                                    </Heading>
                                    <Text color="gray.500" maxW="md">
                                        {searchTerm
                                            ? "Try adjusting your search keywords or filters."
                                            : "There are no events available at the moment. Check back later!"}
                                    </Text>
                                    {searchTerm && (
                                        <Button
                                            variant="ghost"
                                            colorScheme="blue"
                                            onClick={() => setSearchTerm("")}
                                        >
                                            Clear Search
                                        </Button>
                                    )}
                                </VStack>
                            </CardBody>
                        </Card>
                    )}
                </VStack>
            </Box>
        </Box>
    );
};

export default EventList;
