import { Avatar, Badge, Box, Button, Card, CardBody, CardHeader, Divider, Flex, Grid, Heading, HStack, Icon, SimpleGrid, Text, useToast, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiCalendar, FiUsers, FiEdit2, FiMail, FiShield, FiTrash2, FiUser, FiClock } from 'react-icons/fi';
import { useLoaderData, useNavigate, useParams, LoaderFunction } from 'react-router-dom';
import { EventDesignSystem } from '../../events/designSystem';
import { getUser } from '../api/getUser';
import { UserAPIResponse } from '../users.type';

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const user = await getUser(params.id as string);
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getRoleBadgeColor = (role: string | null) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return { bg: 'purple.50', color: 'purple.600', border: 'purple.200', icon: FiShield };
    case 'organizer':
      return { bg: 'blue.50', color: 'blue.600', border: 'blue.200', icon: FiCalendar };
    case 'user':
      return { bg: 'green.50', color: 'green.600', border: 'green.200', icon: FiUser };
    default:
      return { bg: 'gray.50', color: 'gray.600', border: 'gray.200', icon: FiUser };
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const InfoItem = ({ label, value, icon }: { label: string; value: string; icon: React.ElementType }) => (
  <HStack spacing={3} align="flex-start" p={4} bg="gray.50" borderRadius="lg" flex={1}>
    <Flex
      align="center"
      justify="center"
      w={10}
      h={10}
      borderRadius="full"
      bg={`${EventDesignSystem.primaryColor}15`}
    >
      <Icon as={icon} color={EventDesignSystem.primaryColor} boxSize={5} />
    </Flex>
    <VStack align="flex-start" spacing={0}>
      <Text fontSize="sm" color="gray.500" fontWeight="medium">
        {label}
      </Text>
      <Text fontSize="md" color="gray.800" fontWeight="semibold" noOfLines={1}>
        {value || 'N/A'}
      </Text>
    </VStack>
  </HStack>
);

const StatCard = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <Card variant="outline" borderRadius="xl" borderColor="gray.100" shadow="sm" _hover={{ shadow: 'md', transform: 'translateY(-2px)' }} transition="all 0.2s">
    <CardBody p={4}>
      <VStack spacing={2} align="center">
        <Text fontSize="3xl" fontWeight="bold" color={color}>
          {value}
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          {label}
        </Text>
      </VStack>
    </CardBody>
  </Card>
);

const UserDetail = () => {
  const user = useLoaderData() as UserAPIResponse;
  const navigate = useNavigate();
  const toast = useToast();
  const roleColors = getRoleBadgeColor(user.role);

  const handleEdit = useCallback(() => {
    navigate(`/users/${user.id}/edit`);
  }, [user.id, navigate]);

  const handleDelete = useCallback(() => {
    toast({
      title: "Delete User",
      description: `User ${user.username} would be deleted here. Connect to your delete API.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }, [user.username, toast]);

  const handleBack = useCallback(() => {
    navigate('/users');
  }, [navigate]);

  return (
    <Box p={6} maxW="1200px" mx="auto" bg="gray.50" minHeight="100vh">
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

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <VStack spacing={6} align="stretch">
          <Card borderRadius="2xl" shadow="lg" overflow="hidden">
            <Box
              h="120px"
              bgGradient={`linear(to-r, ${EventDesignSystem.primaryColor}, ${EventDesignSystem.primaryLight})`}
              position="relative"
            />
            <CardBody pt={4} pb={6} px={6}>
              <Flex direction={{ base: 'column', sm: 'row' }} align="flex-end" mt="-60px" mb={4} gap={4}>
                <Avatar
                  size="2xl"
                  name={user.username}
                  bg={EventDesignSystem.primaryColor}
                  color="white"
                  fontSize="2xl"
                  fontWeight="bold"
                  border="4px solid white"
                  shadow="xl"
                />
                <VStack align={{ base: 'center', sm: 'flex-start' }} spacing={1} flex={1} mb={2} >
                  <Heading size="lg" color="gray.800" textAlign={{ base: 'center', sm: 'left' }}>
                    {`${user.firstname} ${user.lastname}`}
                  </Heading>
                  <Badge
                    px={4}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    bg={roleColors.bg}
                    color={roleColors.color}
                    borderWidth="1px"
                    borderColor={roleColors.border}
                  >
                    <HStack spacing={2}>
                      <Icon as={roleColors.icon} boxSize={4} />
                      <Text>{user.role || 'No Role'}</Text>
                    </HStack>
                  </Badge>
                </VStack>
                {/* <HStack spacing={3}>
                  <Button
                    leftIcon={<Icon as={FiEdit2} />}
                    colorScheme="yellow"
                    variant="solid"
                    size="md"
                    onClick={handleEdit}
                    _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                    transition="all 0.2s"
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<Icon as={FiTrash2} />}
                    colorScheme="red"
                    variant="outline"
                    size="md"
                    onClick={handleDelete}
                    _hover={{ bg: 'red.50', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    Delete
                  </Button>
                </HStack> */}
              </Flex>
            </CardBody>
          </Card>

          <Card borderRadius="2xl" shadow="md">
            <CardHeader pb={2}>
              <Heading size="md" color="gray.700">
                Account Information
              </Heading>
            </CardHeader>
            <CardBody pt={0}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <InfoItem label="User ID" value={user.id} icon={FiUser} />
                <InfoItem label="Username" value={user.username} icon={FiMail} />
                <InfoItem label="Role" value={user.role || 'No Role'} icon={FiShield} />
                <InfoItem label="Created" value="N/A" icon={FiClock} />
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>

        <VStack spacing={6} align="stretch">
          <Card borderRadius="2xl" shadow="md">
            <CardHeader pb={2}>
              <Heading size="md" color="gray.700">
                Account Stats
              </Heading>
            </CardHeader>
            <CardBody pt={0}>
              <SimpleGrid columns={2} spacing={4}>
                <StatCard label="Events" value={0} color={EventDesignSystem.primaryColor} />
                <StatCard label="Registrations" value={0} color="blue.500" />
              </SimpleGrid>
            </CardBody>
          </Card>

          <Card borderRadius="2xl" shadow="md">
            <CardHeader pb={2}>
              <Heading size="md" color="gray.700">
                Quick Actions
              </Heading>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3} align="stretch">
                <Button
                  variant="outline"
                  colorScheme="blue"
                  justifyContent="flex-start"
                  leftIcon={<Icon as={FiCalendar} />}
                  onClick={() => navigate(`/register-events`)}
                >
                  View Registrations
                </Button>
                 <Button
                  variant="outline"
                  colorScheme="green"
                  justifyContent="flex-start"
                  leftIcon={<Icon as={FiUsers} />}
                  onClick={() => navigate(`/users`)}
                >
                  View All Users
                </Button>
                {/* <Button
                  variant="outline"
                  colorScheme="purple"
                  justifyContent="flex-start"
                  leftIcon={<Icon as={FiShield} />}
                  onClick={() => toast({ title: 'Coming soon', status: 'info', duration: 2000 })}
                >
                  Manage Permissions
                </Button> */}
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Grid>
    </Box>
  );
};

export default UserDetail;