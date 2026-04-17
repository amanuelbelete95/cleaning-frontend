import { AspectRatio, Box, Card, CardBody, Container, Flex, SimpleGrid, Skeleton, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

export const AdminHomeSkeleton = () => {
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={pageBg} minH="calc(100vh - 80px)" py={8} px={4}>
      <Container maxW="7xl" w={"100%"}>
        <VStack spacing={8} align="stretch">
          <Card bg={cardBg} borderRadius="2xl" p={8} boxShadow="lg" border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={4}>
                <VStack align="flex-start" spacing={2}>
                  <Skeleton height="32px" width="200px" />
                  <Skeleton height="20px" width="150px" />
                </VStack>
                <Skeleton height="40px" width="120px" borderRadius="lg" />
              </Flex>
            </CardBody>
          </Card>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} bg={cardBg} shadow="md" borderRadius="xl">
                <CardBody>
                  <Flex align="center" justify="space-between">
                    <VStack align="flex-start" spacing={1}>
                      <Skeleton height="16px" width="80px" />
                      <Skeleton height="36px" width="60px" />
                    </VStack>
                    <Skeleton height="48px" width="48px" borderRadius="lg" />
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Card bg={cardBg} borderRadius="xl" boxShadow="md" border="1px solid" borderColor={borderColor} overflow="hidden">
            <Box p={6} pb={2}>
              <Skeleton height="24px" width="150px" />
            </Box>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th><Skeleton height="16px" width="100px" /></Th>
                  <Th><Skeleton height="16px" width="80px" /></Th>
                  <Th><Skeleton height="16px" width="80px" /></Th>
                  <Th><Skeleton height="16px" width="60px" /></Th>
                  <Th><Skeleton height="16px" width="80px" /></Th>
                </Tr>
              </Thead>
              <Tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Tr key={i}>
                    <Td><Skeleton height="20px" width="120px" /></Td>
                    <Td><Skeleton height="20px" width="150px" /></Td>
                    <Td><Skeleton height="20px" width="80px" /></Td>
                    <Td><Skeleton height="24px" width="60px" borderRadius="md" /></Td>
                    <Td><Skeleton height="32px" width="80px" borderRadius="md" /></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} bg={cardBg} borderRadius="xl" boxShadow="md" border="1px solid" borderColor={borderColor} overflow="hidden">
                <AspectRatio ratio={16 / 9}>
                  <Skeleton />
                </AspectRatio>
                <CardBody>
                  <VStack align="stretch" spacing={2}>
                    <Skeleton height="20px" width="80%" />
                    <Skeleton height="16px" width="60%" />
                    <Skeleton height="16px" width="40%" />
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};