import { Badge, Box, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Spacer, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import ReactTable from "../ReactTable";
import { getRegisterEvents, RegisterationListAPIResponse } from "./api/getRegisterEvents";
import { FiSearch } from "react-icons/fi";
import { EventDesignSystem } from "../events/designSystem";
import { useMemo, useState } from "react";
import { formatDate } from "../../utils/dateUtility";


const getColorByStatus = (stat: "upcoming" | "completed") => {
  switch (stat?.toLowerCase()) {
    case 'upcoming':
      return 'green';
    case 'completed':
      return 'yellow';
    default:
      return 'gray';
  }
}

const columnHelper = createColumnHelper<RegisterationListAPIResponse>();
const basicColumns = [
  columnHelper.accessor(row => row.name, {
    id: "name",
    header: "Event Name",
    cell: (info: CellContext<RegisterationListAPIResponse, string>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),

  columnHelper.accessor(row => row.status, {
    id: "status",
    header: "Status",
    cell: (info: CellContext<RegisterationListAPIResponse, string>) => {
      const stat = info.getValue() as "upcoming" || "completed";
      return (
        <Badge colorScheme={getColorByStatus(stat)} variant="outline" px={2} py={1} borderRadius="md">
          {stat}
        </Badge>
      );
    },
  }),

  columnHelper.accessor(row => row.position, {
    id: "position",
    header: "Position",
    cell: (info: CellContext<RegisterationListAPIResponse, string>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),

  columnHelper.accessor(row => row.registered_on, {
    id: "registered_on",
    header: "Registered On",
    cell: (info: CellContext<RegisterationListAPIResponse, string>) => {
      const value = formatDate(info.getValue())
      return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor(row => row.registration_count, {
    id: "registration_count",
    header: "Registration Count",
    cell: (info: CellContext<RegisterationListAPIResponse, number>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    }
  }),
  columnHelper.accessor(row => row.capacity, {
    id: "capacity",
    header: "Event Capacity",
    cell: (info: CellContext<RegisterationListAPIResponse, number>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    }
  }),
  columnHelper.accessor(row => row.reason, {
    id: "reason",
    header: "Reason For Registering",
    cell: (info: CellContext<RegisterationListAPIResponse, string>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor(row => row.description, {
    id: "description",
    header: "Description",
    cell: (info: CellContext<RegisterationListAPIResponse, string | undefined>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
];



const RegisterEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: registerEvents = [] } = useQuery<RegisterationListAPIResponse[]>({
    queryKey: ["register-events"],
    queryFn: getRegisterEvents,
  });



  const filteredData = useMemo(() => {
    if (!searchTerm) return registerEvents;
    const term = searchTerm.toLowerCase();
    return registerEvents.filter(event =>
      event.name.toLowerCase().includes(term)

    );
  }, [registerEvents, searchTerm]);
  return (
    <Box p={6} minHeight="100vh">
      <Flex mb={6} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
        <Heading size="xl" color={EventDesignSystem.primaryColor} fontWeight="bold">
          Registered Events
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
          columns={basicColumns}
          data={filteredData}
          tableCaption="Registered Events" />
      </Box>
    </Box>
  )
}

export default RegisterEvents;