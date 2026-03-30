import { CalendarIcon, EditIcon, ExternalLinkIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Card, CardBody, Divider, Flex, Heading, HStack, Icon, SimpleGrid, Stack, Text, useDisclosure, useToast, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { memo, useCallback } from "react";
import { FiMapPin, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtility";
import { useAuth } from "../../auth/AuthProvider";
import BasicEventModalRegModal from "../../BasicEventModalReg";
import { PermissionGuard } from "../../PermissionGuard";
import { registerToEvent } from "../../register-events/api/registerToEvent";
import { EventDesignSystem } from "../designSystem";
import { EventAPIResponse } from "../events.type";

interface EventCardProps {
    event: EventAPIResponse;
    onDeleteEvent: (id: string) => void
}

const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

const EventCard = memo(({ event, onDeleteEvent }: EventCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const handleViewEvent = useCallback(() => navigate(`/events/${event.id}/detail`), [event.id, navigate]);
    const handleUpdateEvent = useCallback((e: React.MouseEvent) => { e.stopPropagation(); navigate(`/events/${event.id}/edit`) }, [event.id, navigate]);
    const handleDeleteEvent = useCallback((e: React.MouseEvent) => { e.stopPropagation(); onDeleteEvent(event.id) }, [event.id, onDeleteEvent]);
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
            })
            navigate("/events")

        },
        onError: (error) => {
            toast({
                title: "Event Join failed",
                description: `${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    });

    // Check if the user is an admin, if so they can manage registration even if the event is full
    const isEventFull = event.registration_count >= event.capacity;

    // Check if the user is an admin, they can manage registration regardless of the event date is expired or not, 
    // but if the user is not an admin, they can only register if the event is not expired
    const isEventExpired = new Date(event.event_date) < new Date();
    const canRegister = !isEventExpired && !isEventFull

    const isRegistered = event.registration_status === true;

    return (
        <>
            <BasicEventModalRegModal
                isOpen={isOpen}
                title="Register for Event"
                onConfirm={registerEventFn}
                event={event} onClose={onClose}
            />
            <Box
                borderRadius="xl"
                overflow="hidden"
                boxShadow="lg"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                }}
                h={{ base: "auto", md: "380px" }}
                minH={{ base: "320px", md: "380px" }}
                display="flex"
                flexDirection="column"
                position="relative"
                cursor={"pointer"}
                onClick={handleViewEvent}
                w="100%"
                maxW={{ base: "100%", md: "500px" }}

            >
                <Card
                    overflow="hidden"
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    p={4} _hover={
                        { bg: "gray.200" }
                    }>
                    <Box
                        position="absolute"
                        top="-20"
                        right="-20"
                        w="40"
                        h="40"
                        bg="white"
                        opacity="10"
                        borderRadius="full"
                    />
                    <Stack direction="row" justify="space-between" align="flex-start">
                        <Box flex={1}>
                            <Heading
                                size={{ base: "sm", md: "md" }}
                                color="gray"
                                fontWeight="bold"
                                noOfLines={2}
                                mb={2}
                            >
                                {event.name}
                            </Heading>
                            <PermissionGuard allowedRoles={["admin"]}>
                                <Badge
                                    variant="outline"
                                    fontSize="xs"
                                    colorScheme="#389999"
                                    textTransform="uppercase"
                                >
                                    {event.event_status || "todo"}
                                </Badge>
                            </PermissionGuard>
                            <Flex justifyContent={"stretch"} gap={4} >
                                {
                                    isEventExpired ? <Badge colorScheme="red" variant="subtle" p={1} borderRadius={"md"}>Event Expired</Badge>
                                        : isEventFull ? <Badge colorScheme="orange" variant="subtle" p={1} borderRadius={"md"}>Event Full</Badge>
                                            : <Badge colorScheme="green" variant="subtle" p={1} borderRadius={"md"}>Open for Registration</Badge>
                                }

                                {
                                    isRegistered ? <Badge colorScheme="green" variant="outline" p={1} borderRadius={"md"}>Registered</Badge> : null
                                }
                            </Flex>
                        </Box>
                    </Stack>
                    <CardBody p={{ base: 4, md: 6 }} flex={1} display="flex" flexDirection="column">
                        {event.description && (
                            <Text
                                fontSize="sm"
                                color="gray.600"
                                noOfLines={3}
                                mb={2}
                                lineHeight="1.5"
                            >
                                {event.description}
                            </Text>
                        )}

                        {/* Event Details */}
                        <VStack spacing={3} align="stretch" mb={2}>
                            <HStack spacing={3}>
                                <Icon
                                    as={CalendarIcon}
                                    color="blue.500"
                                    boxSize={4}
                                    flexShrink={0}
                                />
                                <Text fontSize="sm" fontWeight="500">
                                    {formatDate(event.event_date)}
                                </Text>
                            </HStack>

                            <HStack spacing={3}>
                                <Icon
                                    as={TimeIcon}
                                    color="green.500"
                                    boxSize={4}
                                    flexShrink={0}
                                />
                                <Text fontSize="sm" fontWeight="500">
                                    {formatTime(event.event_date)}
                                </Text>
                            </HStack>

                            <HStack spacing={3}>
                                <Icon
                                    as={FiMapPin}
                                    color="red.500"
                                    boxSize={4}
                                    flexShrink={0}
                                />
                                <Text fontSize="sm" fontWeight="500" noOfLines={1}>
                                    {event.location}
                                </Text>
                            </HStack>
                        </VStack>

                        <Divider mt={4} mb={0} />

                        <Wrap spacing={2} w="full" position={{ base: "relative", md: "absolute" }} bottom={{ base: 0, md: 5 }} left={{ base: 0, md: 5 }} mt={4} pt={2} justify={{ base: "space-between", md: "flex-start" }}>
                            <PermissionGuard allowedRoles={["admin"]}>
                                <WrapItem>
                                    <Button
                                        size="sm"
                                        bg={EventDesignSystem.primaryColor}
                                        color="white"
                                        _hover={{ opacity: 0.9 }}
                                        onClick={handleUpdateEvent}
                                        disabled={isEventExpired}
                                        leftIcon={<EditIcon />}
                                        fontSize={{ base: "xs", md: "sm" }}
                                    >
                                        Update
                                    </Button>
                                </WrapItem>
                                <WrapItem>
                                    <Button
                                        size="sm"
                                        bg="red.500"
                                        color="white"
                                        type="button"
                                        _hover={{ bg: "red.600" }}
                                        onClick={handleDeleteEvent}
                                        leftIcon={<FiTrash />}
                                        fontSize={{ base: "xs", md: "sm" }}
                                    >
                                        Delete
                                    </Button>
                                </WrapItem>
                            </PermissionGuard>
                            <WrapItem>
                                <Button
                                    size="sm"
                                    bg={EventDesignSystem.primaryColor}
                                    color="white"
                                    _hover={{ opacity: 0.9 }}
                                    onClick={handleViewEvent}
                                    leftIcon={<ViewIcon />}
                                    fontSize={{ base: "xs", md: "sm" }}
                                >
                                    View
                                </Button>
                            </WrapItem>
                            <WrapItem>
                                <Button
                                    size="sm"
                                    bg={EventDesignSystem.primaryColor}
                                    color="white"
                                    disabled={canRegister ? false : true}
                                    _hover={{ opacity: 0.9 }}
                                    onClick={(e) => { e.stopPropagation(); onOpen(); }}
                                    leftIcon={<ExternalLinkIcon />}
                                    fontSize={{ base: "xs", md: "sm" }}
                                >
                                    {user?.role === "admin" ? "Manage" : "Register"}
                                </Button>
                            </WrapItem>
                        </Wrap>
                    </CardBody>
                </Card>


            </Box >
        </>
    )
});

export default EventCard;