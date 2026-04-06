import { EditIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Card, CardBody, Divider, Flex, Heading, HStack, Icon, Progress, SimpleGrid, Text, useColorModeValue, useDisclosure, useToast, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { memo, useCallback } from "react";
import { FiCalendar, FiClock, FiMapPin, FiTrash2, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtility";
import { useAuth } from "../../auth/AuthProvider";
import BasicEventModalRegModal from "../../BasicEventModalReg";
import { registerToEvent } from "../../register-events/api/registerToEvent";
import { EventDesignSystem } from "../designSystem";
import { EventAPIResponse } from "../events.type";
import { useRegistrationInfo } from "../useRegistrationInfo";
import { PermissionGuard } from "../../PermissionGuard";
import { tuple } from "yup";


interface EventCardProps {
    event: EventAPIResponse;
    onDeleteEvent: (id: string) => void;
}

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "published": return "green";
        case "draft": return "yellow";
        case "cancelled": return "red";
        default: return "gray";
    }
};

const EventCard = memo(({ event, onDeleteEvent, }: EventCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const cardBg = useColorModeValue("white", "gray.800");
    const hoverBg = useColorModeValue("gray.50", "gray.700");

    const handleViewEvent = useCallback(() => navigate(`/events/${event.id}/detail`), [event.id, navigate]);
    const handleUpdateEvent = useCallback((e: React.MouseEvent) => { e.stopPropagation(); navigate(`/events/${event.id}/edit`); }, [event.id, navigate]);
    const handleDeleteEvent = useCallback((e: React.MouseEvent) => { e.stopPropagation(); onDeleteEvent(event.id); }, [event.id, onDeleteEvent]);

    const { mutate: registerEventFn } = useMutation({
        mutationFn: async (data: any) => {
            return await registerToEvent(data);
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
    const { canRegister, isEventFull, isEventExpired, isRegistered } = useRegistrationInfo(event);

    const registrationPercentage = Math.round((event.registration_count / event.capacity) * 100);
    return (
        <>
            <BasicEventModalRegModal
                isOpen={isOpen}
                title="Register for Event"
                onConfirm={registerEventFn}
                event={event}
                onClose={onClose}
            />
            <Card
                borderRadius="xl"
                overflow="hidden"
                boxShadow="lg"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                    transform: "translateY(-6px)",
                    boxShadow: "2xl",
                }}
                borderWidth="1px"
                borderColor="transparent"
                cursor="pointer"
                h="100%"
                display="flex"
                flexDirection="column"
                onClick={handleViewEvent}
                bg={cardBg}
                position="relative"
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="6px"
                    bg={isEventExpired || isEventFull ? "red.100" : EventDesignSystem.primaryColor}
                />

                <CardBody p={{ base: 4, md: 6 }} display="flex" flexDirection="column" flex={1}>
                    <VStack spacing={4} align="stretch" flex={1} justify="space-between">
                        <Flex justify="space-between" align="flex-start">
                            <Heading
                                size={{ base: "sm", md: "md" }}
                                color="gray.800"
                                noOfLines={2}
                                flex={1}
                                mr={2}
                            >
                                {event.name}
                            </Heading>
                            <PermissionGuard allowedRoles={["admin"]}>
                                <Badge
                                    colorScheme={getStatusColor(event.event_status || "draft")}
                                    variant="subtle"
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                                    fontSize="xs"
                                    flexShrink={0}
                                >
                                    {event.event_status || "draft"}
                                </Badge>
                            </PermissionGuard>
                        </Flex>

                        <HStack spacing={2} flexWrap="wrap">
                            {isEventExpired && (
                                <Badge colorScheme="red" variant="subtle" px={2} py={1} borderRadius="md" fontSize="xs">
                                    Expired
                                </Badge>
                            )}
                            {isEventFull && !isEventExpired && (
                                <Badge colorScheme="red" variant="subtle" px={2} py={1} borderRadius="md" fontSize="xs">
                                    Full
                                </Badge>
                            )}
                            {!isEventExpired && !isEventFull && (
                                <Badge colorScheme="green" variant="subtle" px={2} py={1} borderRadius="md" fontSize="xs">
                                    Open
                                </Badge>
                            )}

                            {!isRegistered && (
                                <Badge colorScheme="yellow" variant="outline" px={2} py={1} borderRadius="md" fontSize="xs">
                                    Not Registered
                                </Badge>
                            )}

                            {isRegistered && (
                                <Badge colorScheme="green" variant="outline" px={2} py={1} borderRadius="md" fontSize="xs">
                                    Registered
                                </Badge>
                            )}
                        </HStack>

                        <Text
                            fontSize="sm"
                            color="gray.600"
                            noOfLines={2}
                            lineHeight="1.6"
                        >
                            {event.description || "No description provided for this event."}
                        </Text>

                        <Divider />

                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                            <Flex align="center" p={2} bg={hoverBg} borderRadius="lg">
                                <Box p={2} bg={`${EventDesignSystem.primaryColor}20`} borderRadius="md" mr={3}>
                                    <Icon as={FiCalendar} boxSize={4} color={EventDesignSystem.primaryColor} />
                                </Box>
                                <Box>
                                    <Text fontSize="xs" color="gray.500">Date</Text>
                                    <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                                        {formatDate(event.event_date)}
                                    </Text>
                                </Box>
                            </Flex>

                            <Flex align="center" p={2} bg={hoverBg} borderRadius="lg">
                                <Box p={2} bg={`${EventDesignSystem.primaryColor}20`} borderRadius="md" mr={3}>
                                    <Icon as={FiClock} boxSize={4} color={EventDesignSystem.primaryColor} />
                                </Box>
                                <Box>
                                    <Text fontSize="xs" color="gray.500">Time</Text>
                                    <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                                        {formatTime(event.event_date)}
                                    </Text>
                                </Box>
                            </Flex>

                            <Flex align="center" p={2} bg={hoverBg} borderRadius="lg" gridColumn={{ sm: "span 2" }}>
                                <Box p={2} bg={`${EventDesignSystem.primaryColor}20`} borderRadius="md" mr={3}>
                                    <Icon as={FiMapPin} boxSize={4} color={EventDesignSystem.primaryColor} />
                                </Box>
                                <Box>
                                    <Text fontSize="xs" color="gray.500">Location</Text>
                                    <Text fontSize="sm" fontWeight="semibold" color="gray.700" noOfLines={1}>
                                        {event.location}
                                    </Text>
                                </Box>
                            </Flex>
                        </SimpleGrid>

                        <Box>
                            <Flex justify="space-between" mb={2}>
                                <HStack spacing={1}>
                                    <Icon as={FiUsers} boxSize={4} color="gray.500" />
                                    <Text fontSize="xs" color="gray.500">
                                        {event.registration_count} / {event.capacity} registered
                                    </Text>
                                </HStack>
                                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                                    {registrationPercentage}%
                                </Text>
                            </Flex>
                            <Progress
                                value={registrationPercentage}
                                size="sm"
                                colorScheme={"green"}
                                borderRadius="full"
                            />
                        </Box>

                        <Divider />

                        <Wrap spacing={2} justify={{ base: "space-between", md: "space-between" }}>
                            <WrapItem>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    colorScheme={"green"}
                                    leftIcon={<ViewIcon />}
                                    onClick={handleViewEvent}
                                    _hover={{ bg: "blue.50" }}
                                >
                                    View
                                </Button>
                            </WrapItem>

                            {user?.role === "admin" && (
                                <>
                                    <WrapItem>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            colorScheme="green"
                                            leftIcon={<EditIcon />}
                                            onClick={handleUpdateEvent}
                                            _hover={{ bg: "orange.50" }}
                                        >
                                            Edit
                                        </Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            colorScheme="red"
                                            leftIcon={<FiTrash2 />}
                                            onClick={handleDeleteEvent}
                                            _hover={{ bg: "red.50" }}
                                        >
                                            Void
                                        </Button>
                                    </WrapItem>
                                </>
                            )}

                            <WrapItem>
                                <Button
                                    size="sm"
                                    colorScheme="green"
                                    leftIcon={<ExternalLinkIcon />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpen();
                                    }}
                                    bg={EventDesignSystem.primaryColor}
                                    color="white"

                                    display={
                                        canRegister &&
                                            (
                                                user?.role === "admin" ||
                                                !isRegistered
                                            )
                                            ? "inline-block"
                                            : "none"
                                    }
                                    _hover={{ opacity: 0.9 }}
                                >
                                    Register
                                </Button>
                            </WrapItem>
                        </Wrap>
                    </VStack>
                </CardBody>
            </Card>
        </>
    );
});

export default EventCard;
