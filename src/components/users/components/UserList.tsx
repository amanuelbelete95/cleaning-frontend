import { Avatar, Badge, Box, Button, Flex, Heading, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, useToast } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { FiSearch, FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { EventDesignSystem } from '../../events/designSystem';
import { getAllUsers } from '../api/getAllUsers';
import { UserAPIResponse } from '../users.type';
import ReactTable from '../../ReactTable';

export const loader: LoaderFunction = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};

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
  const users = useLoaderData() as UserAPIResponse[];
  const navigate = useNavigate();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.username.toLowerCase().includes(term) ||
      user.role?.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const handleView = useCallback((id: string) => {
    navigate(`/users/${id}/detail`);
  }, [navigate]);

  const handleEdit = useCallback((id: string) => {
    navigate(`/users/${id}/edit`);
  }, [navigate]);

  const handleDelete = useCallback((id: string) => {
    toast({
      title: "Delete User",
      description: `User ${id} would be deleted here.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

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
      header: 'User',
      cell: ({ row }) => (
        <HStack spacing={3}>
          <Text fontWeight="medium" color="gray.700">
            {row.original.username}
          </Text>
        </HStack>
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
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Icon as={FiMoreVertical} />}
            variant="ghost"
            size="sm"
            aria-label="Actions"
          />
          <MenuList>
            <MenuItem icon={<Icon as={FiEye} boxSize={4} />} onClick={() => handleView(row.original.id)}>
              View Details
            </MenuItem>
            <MenuItem icon={<Icon as={FiEdit2} boxSize={4} />} onClick={() => handleEdit(row.original.id)}>
              Edit User
            </MenuItem>
            <MenuItem icon={<Icon as={FiTrash2} boxSize={4} />} color="red.500" onClick={() => handleDelete(row.original.id)}>
              Delete User
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ], [handleView, handleEdit, handleDelete]);

  return (
    <Box p={6} bg="gray.100" minHeight="auto">
      <Flex mb={6} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
        <Heading size="xl" color={EventDesignSystem.primaryColor} fontWeight="bold">
          Users Management
        </Heading>
        <Spacer />
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
      </Flex>

      <Box p={4} bg="white" borderRadius="xl" shadow="md" overflow="hidden">
        <ReactTable
          columns={columns}
          data={filteredData}
          searchPlaceholder="Search users..."
          showSearch={false}
          showPagination={true}
          pageSizeOptions={[10, 25, 50, 100]}
          initialPageSize={10}
          tableCaption=""
        />
      </Box>
    </Box>
  );
};

export default UserList;