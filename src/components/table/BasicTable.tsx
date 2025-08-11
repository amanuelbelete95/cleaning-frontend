import {
  Box,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import './table.css';

interface BasicTableProps<Data extends object> {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  tableCaption?: string;
  TableActions?: React.ReactNode;
  TableLeftActions?: React.ReactNode;
}

const BasicTable = <Data extends object>(props: BasicTableProps<Data>) => {
  const { data, columns, tableCaption, TableActions, TableLeftActions } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box display="flex" flexDir="column" width="100%" background="gray.300">
      {(tableCaption || TableActions || TableLeftActions) && (
        <Flex
          p={2}
          px={1}
          alignItems="center"
          flexDir={{ sm: 'row', base: 'column', md: 'row', lg: 'row' }}
          gap={6}
          py={6}
          width="98%"
          flexWrap="wrap"
        >
          <Heading
            as="h5"
            size="sm"
            w="100%"
            fontWeight="normal"
            textAlign="left"
            display="flex"
            flex={1}
          >
            <HStack
              width="100%"
              display="flex"
              justifyContent="space-between"
            ></HStack>

            <Flex
              flexDir="column"
              gap={2}
              display="inline-block"
              alignSelf="flex-end"
            >
              {TableLeftActions}
              {TableActions}
            </Flex>
          </Heading>
        </Flex>
      )}
      <TableContainer width="100%" overflow="scroll">
        <Table
          className="events-table"
          size="sm"
          variant="simple"
          width="70%"
          border="none"
          overflow="scroll"
          borderRadius="20px"
          background="#ffffff"
          style={{ overflow: 'hidden' }}
        >
          <Thead className="table-head" background="gray.200" height="70px">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody background="#ffffff">
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize="small"
                    py={8}
                    boxSize={4}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BasicTable;
