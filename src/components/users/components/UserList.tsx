import { Avatar, Badge, Box, Button, Flex, Heading, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Spacer, Text, Tooltip, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { FiSearch, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { EventDesignSystem } from '../../events/designSystem';
import { getAllUsers } from '../api/getAllUsers';
import { UserAPIResponse } from '../users.type';
import ReactTable from '../../ReactTable';
import { onDeleteUser } from '../api/deleteUser';
import ConformationModal from '../../ConformationModal';
import { AddIcon } from '@chakra-ui/icons';

const getRoleBadgeColor = (role: string | null) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return 'purple';
    case 'organizer':
      return 'blue';
    case 'user':
      return 'green';
    default:
      return 'gray';
  }
};

const UserList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const filteredData = useMemo(() => {
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.username.toLowerCase().includes(term) ||
      user.role?.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const { mutate: deleteUserFn } = useMutation({
    mutationFn: (id: string) => onDeleteUser(id),
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User deleted",
        description: "User removed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleView = useCallback((id: string) => {
    navigate(`/users/${id}/detail`);
  }, [navigate]);

  const handleEdit = useCallback((id: string) => {
    navigate(`/users/${id}/edit`);
  }, [navigate]);

  const handleDeleteClick = useCallback((id: string, username: string) => {
    setSelectedUserId(id);
    setSelectedUserName(username);
    onOpen();
  }, [onOpen]);

  const handleConfirmDelete = useCallback(() => {
    if (selectedUserId) {
      deleteUserFn(selectedUserId);
    }
  }, [selectedUserId, deleteUserFn]);

  const columns = useMemo<ColumnDef<UserAPIResponse>[]>(() => [
    {
      accessorKey: 'firstname',
      header: 'First Name',
      cell: ({ row }) => (
        <HStack spacing={3}>
          <Avatar
            size="sm"
            name={row.original.firstname}
            bg={EventDesignSystem.primaryColor}
            color="white"
          />
          <Text fontWeight="medium" color="gray.700">
            {row.original.firstname}
          </Text>
        </HStack>
      ),
    },
    {
      accessorKey: 'lastname',
      header: 'Last Name',
      cell: ({ row }) => (
        <HStack spacing={3}>
          <Text fontWeight="medium" color="gray.700">
            {row.original.lastname}
          </Text>
        </HStack>
      ),
    },
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => (
        <Text fontWeight="medium" color="gray.700">
          {row.original.username}
        </Text>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ getValue }) => {
        const role = getValue() as string | null;
        return (
          <Badge colorScheme={getRoleBadgeColor(role)} variant="subtle" px={2} py={1} borderRadius="md">
            {role || 'No Role'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'id',
      header: 'User ID',
      cell: ({ getValue }) => (
        <Text fontSize="sm" color="gray.500" fontFamily="mono">
          {String(getValue())}
        </Text>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <HStack spacing={2}>
          <Tooltip label="View Details" hasArrow>
            <IconButton
              aria-label="View user"
              icon={<Icon as={FiEye} />}
              size="sm"
              variant="ghost"
              colorScheme="green"
              onClick={() => handleView(row.original.id)}
            />
          </Tooltip>
          <Tooltip label="Edit User" hasArrow>
            <IconButton
              aria-label="Edit user"
              icon={<Icon as={FiEdit2} />}
              size="sm"
              variant="ghost"
              colorScheme="gray"
              onClick={() => handleEdit(row.original.id)}
            />
          </Tooltip>
          <Tooltip label="Delete User" hasArrow>
            <IconButton
              aria-label="Delete user"
              icon={<Icon as={FiTrash2} />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={() => handleDeleteClick(row.original.id, row.original.username)}
            />
          </Tooltip>
        </HStack>
      ),
    },
  ], [handleView, handleEdit, handleDeleteClick]);

  return (
    <>
      <Box p={6} bg="gray.100" minHeight="auto">
        <Flex mb={6} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
          <VStack>
          <Heading size="xl" color={EventDesignSystem.primaryColor} fontWeight="bold">
            Users Management
          </Heading>
          <InputGroup maxW="350px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="white"
              borderRadius="lg"
              _focus={{
                borderColor: EventDesignSystem.primaryColor,
                boxShadow: `0 0 0 1px ${EventDesignSystem.primaryColor}`
              }}
            />
          </InputGroup>
          </VStack>

          <Spacer />
          <Button
            leftIcon={<AddIcon />}
            onClick={() => navigate("/users/new")}
            size="lg"
            borderRadius="xl"
            bg="white"
            color={EventDesignSystem.primaryColor}
            _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
            boxShadow="lg"
            transition="all 0.2s"
          >
            Add User
          </Button>
        </Flex>

        <Box p={4} bg="white" borderRadius="xl" shadow="md" overflow="hidden">
          <ReactTable
            columns={columns}
            data={filteredData}
            isLoading={isLoading}
            searchPlaceholder="Search users..."
            showSearch={false}
            showPagination={true}
            pageSizeOptions={[10, 25, 50, 100]}
            initialPageSize={10}
            tableCaption=""
          />
        </Box>
      </Box>

      <ConformationModal
        isOpen={isOpen}
        onClose={onClose}
        message={`This action will permanently remove ${selectedUserName} from the system.`}
        posativeAction={"Delete"}
        closeAction={"Cancel"}
        action={"delete"}
        conformationAction={handleConfirmDelete}
      />
    </>
  );
};

export default UserList;