import { AspectRatio, Box, Card, CardBody, Container, Flex, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { EventDesignSystem } from "../../events/designSystem";

export const UserHomeSkeleton = () => {
  const pageBg = useColorModeValue(EventDesignSystem.background.primary, EventDesignSystem.background.dark);
  const cardBg = useColorModeValue(EventDesignSystem.background.secondary, EventDesignSystem.background.darkSecondary);
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={pageBg} minH="calc(100vh - 80px)" py={8}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          <Box bg={cardBg} borderRadius="2xl" p={8} boxShadow="lg" border="1px solid" borderColor={borderColor}>
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={4}>
              <VStack align="flex-start" spacing={4}>
                <Skeleton boxSize="48px" borderRadius="full" />
                <Box>
                  <Skeleton height="28px" width="180px" mb={2} />
                  <Skeleton height="18px" width="220px" />
                </Box>
              </VStack>
              <Flex gap={3}>
                <Skeleton height="44px" width="140px" borderRadius="lg" />
                <Skeleton height="44px" width="140px" borderRadius="lg" />
              </Flex>
            </Flex>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[1, 2, 3].map((i) => (
              <Card key={i} bg={cardBg} shadow="md" borderRadius="xl">
                <CardBody>
                  <Flex align="center" justify="space-between">
                    <VStack align="flex-start" spacing={1}>
                      <Skeleton height="14px" width="120px" />
                      <Skeleton height="32px" width="60px" />
                      <Skeleton height="12px" width="100px" />
                    </VStack>
                    <Skeleton height="40px" width="40px" borderRadius="lg" />
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Box bg={cardBg} borderRadius="xl" p={6} boxShadow="md" border="1px solid" borderColor={borderColor}>
            <Skeleton height="20px" width="120px" mb={4} />
            <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height="60px" borderRadius="lg" />
              ))}
            </SimpleGrid>
          </Box>

          <Box bg={cardBg} borderRadius="xl" p={6} boxShadow="md" border="1px solid" borderColor={borderColor}>
            <Flex justify="space-between" align="center" mb={4}>
              <Skeleton height="20px" width="140px" />
              <Skeleton height="30px" width="80px" borderRadius="md" />
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} bg={cardBg} borderRadius="xl" overflow="hidden" boxShadow="md" border="1px solid" borderColor={borderColor}>
                  <AspectRatio ratio={16 / 9}>
                    <Skeleton />
                  </AspectRatio>
                  <CardBody>
                    <VStack align="stretch" spacing={2}>
                      <Skeleton height="20px" width="80%" />
                      <Skeleton height="14px" width="60%" />
                      <Skeleton height="14px" width="40%" />
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          <Box bg={cardBg} borderRadius="xl" boxShadow="md" border="1px solid" borderColor={borderColor} overflow="hidden">
            <Box p={6} pb={4}>
              <Flex justify="space-between" align="center">
                <Skeleton height="20px" width="140px" />
                <Skeleton height="30px" width="80px" borderRadius="md" />
              </Flex>
            </Box>
            <VStack spacing={0} align="stretch" p={4} pt={0}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} height="70px" borderRadius="lg" mb={2} />
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};