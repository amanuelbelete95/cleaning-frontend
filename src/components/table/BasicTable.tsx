import { Box, Flex, Heading, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useTable } from "react-table";
import './table.css';

interface BasicTableProps <Data extends object>{
  data: Data[];
  columns: any;
  tableCaption?: string;
  TableActions?: React.ReactNode;
  TableLeftActions?: React.ReactNode;
}
const BasicTable =  <Data extends object>(props: BasicTableProps<Data>) => {
  const { data, columns, tableCaption, TableActions, TableLeftActions } = props
  const tableInstance = useTable({
    columns: columns,
    data: data,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance
  return (
    <Box display={"flex"} flexDir={"column"} width={"100%"} background={"gray.300"}>
       {(tableCaption || TableActions || TableLeftActions) && (
          <Flex
            p={2}
            px={1}
            alignItems={"center"}
            flexDir={{ sm: "row", base: "column", md: "row", lg: "row" }}
            gap={6}
            py={6}
            width={"98%"}
            flex-wrap="wrap"
          >
            <Heading
              as="h5"
              size="sm"
              w="100%"
              fontWeight={"normal"}
              textAlign={"left"}
              display={'flex'}
              flex={1}
            >
              <HStack
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
              </HStack>

              <Flex flexDir={"column"} gap={2} display={'inline-block'} alignSelf={"flex-end"}>
                {TableLeftActions}
                {TableActions}
              </Flex>
            </Heading>
          </Flex>
        )}
      <TableContainer
        width={"100%"}
        justifyContent={"center"}
        overflow="scroll">
        
        
        <Table {...getTableProps} className='events-table' size="sm"
          variant="simple"
          width={"70%"}
          border="none"
          overflow="scroll"
          borderRadius={"20px"}
          background={"#ffffff"}
          style={{ overflow: "hidden" }}>
          <Thead className='table-head' background={"gray.200"} height={"70px"}>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <Th {...column.getHeaderProps()}>{column.render('header')}</Th>
                  ))
                }
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps} height={"inherit"} overflowY="scroll" background={"#ffffff"}>
            {
              rows.map(row => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()} p={8}>
                    {
                      row.cells.map(cell => {
                        return (
                          <Td  {...cell.getCellProps()} py={8}
                            fontSize={"small"}
                            boxSize={4}>{cell.render('Cell')}</Td>
                        )
                      })
                    }
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default BasicTable