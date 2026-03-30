import { CalendarIcon, EditIcon, ExternalLinkIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Card, CardBody, Divider, Flex, Heading, HStack, Icon, SimpleGrid, Stack, Text, useDisclosure, useToast, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { memo, useCallback } from "react";
import { FiMapPin, FiTrash, FiTrash2 } from "react-icons/fi";
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

            <Card
                borderRadius="xl"
                overflow="hidden"
                boxShadow="md"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    borderColor: EventDesignSystem.primaryColor,
                    bg: "gray.100"
                }}
                borderWidth="2px"
                borderColor="gray.100"
                cursor="pointer"
                h="100%"
                onClick={handleViewEvent}
            >

                <CardBody p={6}>
                    <VStack spacing={4} align="stretch">
                        <Heading
                            size="md" color="gray.600" noOfLines={1}
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
                        <Flex justifyContent={"stretch"} gap={4}>
                            {
                                isEventExpired ? <Badge colorScheme="red" variant="subtle" p={1} borderRadius={"md"}>Event Expired</Badge>
                                    : isEventFull ? <Badge colorScheme="orange" variant="subtle" p={1} borderRadius={"md"}>Event Full</Badge>
                                        : <Badge colorScheme="green" variant="subtle" p={1} borderRadius={"md"}>Open for Registration</Badge>
                            }

                            {
                                isRegistered ? <Badge colorScheme="green" variant="outline" p={1} borderRadius={"md"}>Registered</Badge> : null
                            }

                        </Flex>
                        <Divider />
                        <Text
                            fontSize="sm"
                            color="gray.600"
                            noOfLines={2}
                            mb={2}
                            lineHeight="1.5"
                        >
                            {event.description || "No description"}
                        </Text>
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

                        <Divider />
                        <HStack spacing={2} justify="center">
                            <Button
                                size="sm"
                                variant="outline"
                                colorScheme="green"
                                leftIcon={<Icon as={ViewIcon} boxSize={4} />}
                                onClick={handleViewEvent}
                                _hover={{ opacity: 0.9, bg: "gray.300"}}
                            >
                                View
                            </Button>
                            <PermissionGuard allowedRoles={["admin"]}>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    colorScheme="yellow"
                                    leftIcon={<Icon as={EditIcon} boxSize={4} />}
                                    onClick={handleUpdateEvent}
                                    _hover={{ opacity: 0.9, bg: "gray.300"}}
                                >
                                    Update
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    colorScheme="red"
                                    leftIcon={<Icon as={FiTrash2} boxSize={4} />}
                                    onClick={handleDeleteEvent}
                                    _hover={{ opacity: 0.9, bg: "gray.300" }}
                                >
                                    Remove
                                </Button>
                            </PermissionGuard>
                            <Button
                                size="sm"
                                variant="outline"
                                colorScheme="green"
                                leftIcon={<Icon as={ExternalLinkIcon} boxSize={4} />}
                                onClick={(e) => { e.stopPropagation(); onOpen(); }}
                                _hover={{ opacity: 0.9, bg: "gray.300" }}
                            >
                                {user?.role === "admin" ? "Manage" : "Register"}
                            </Button>
                        </HStack>
                    </VStack>
                </CardBody>

            </Card>



        </>
    )
});

export default EventCard;