import { Avatar, Box, Button, Card, CardBody, Flex, Heading, HStack, Icon, Text, VStack, useColorModeValue, createStandaloneToast } from '@chakra-ui/react';
import { FiArrowLeft, FiUser, FiEdit2 } from 'react-icons/fi';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { getUser } from '../api/getUser';
import { updateUser } from '../api/updateUser';
import { updateUserSchema } from '../schema';
import { UserAPIResponse } from '../users.type';
import UpdateUserForm from "./UserForm";
import { EventDesignSystem } from '../../events/designSystem';

const { toast } = createStandaloneToast();

export const loader: LoaderFunction = async ({ params }): Promise<UserAPIResponse> => {
    const { id } = params
    const user = await getUser(id ?? "")
    return user;
}

function UpdateUserPage() {
    const user = useLoaderData() as UserAPIResponse;
    const navigate = useNavigate();
    const cardBg = useColorModeValue("white", "gray.700");

    const handleBack = () => navigate("/users");

    return (
        <Box p={6} maxW="900px" mx="auto" bg="gray.50" minHeight="100vh">
            <Button
                variant="ghost"
                leftIcon={<Icon as={FiArrowLeft} />}
                onClick={handleBack}
                mb={4}
                color="gray.600"
                _hover={{ bg: 'gray.100' }}
            >
                Back to Users
            </Button>

            <Card borderRadius="2xl" shadow="lg" overflow="hidden" bg={cardBg}>
                <Box
                    h="100px"
                    bgGradient={`linear(to-r, ${EventDesignSystem.primaryColor}, ${EventDesignSystem.primaryLight})`}
                />
                <CardBody px={8} py={6}>
                    <Flex direction={{ base: 'column', sm: 'row' }} align="center" gap={6} mt="-50px" mb={6}>
                        <Avatar
                            size="xl"
                            name={user.username}
                            bg={EventDesignSystem.primaryColor}
                            color="white"
                            fontSize="xl"
                            fontWeight="bold"
                            border="4px solid white"
                            shadow="lg"
                        />
                        <VStack align={{ base: 'center', sm: 'flex-start' }} spacing={1} flex={1} mt={3}>
                            <Heading size="lg" color="gray.800" textAlign={{ base: 'center', sm: 'left' }}>
                                Edit User
                            </Heading>
                            <HStack spacing={2} color="gray.500">
                                <Icon as={FiUser} boxSize={4} />
                                <Text fontSize="sm">{user.username}</Text>
                            </HStack>
                        </VStack>
                        <Button
                            leftIcon={<Icon as={FiEdit2} />}
                            variant={"outline"}
                            mt={3}
                            color="gray"
                            colorScheme='green'
                            _hover={{ bg: EventDesignSystem.primaryDark }}
                            size="md"
                        >
                            Editing Profile
                        </Button>
                    </Flex>

                    <Box
                        borderTop="1px"
                        borderColor="gray.100"
                        pt={6}
                    >
                        <UpdateUserForm
                            initialValues={user}
                            title={"Save Changes"}
                            formKey='edit'
                            schema={updateUserSchema}
                            onConfirm={(data) => updateUser(user.id, data)}
                            onSuccess={() => {
                                toast({
                                    title: "User Updated Successfully!",
                                    description: `${user.firstname} ${user.lastname}'s profile has been updated.`,
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true,
                                });
                                navigate("/users")
                            }}
                            onError={(error: { message: string }) => toast({
                                title: "Error Updating User",
                                status: "error",
                                duration: 3000,
                                description: `${error.message}`,
                                isClosable: true,
                                position: "top-right"
                            })}
                            name=''
                        />
                    </Box>
                </CardBody>
            </Card>
        </Box>
    )
}

export default UpdateUserPage