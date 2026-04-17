import { Box, Card, Flex, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import { EventDesignSystem } from "../designSystem";

export const EventHeaderSkeleton = () => {
    return (
        <Box
            bg={`linear-gradient(135deg, ${EventDesignSystem.primaryColor} 0%, #2c5282 100%)`}
            px={{ base: 4, md: 8 }}
            py={{ base: 6, md: 10 }}
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top="-50%"
                right="-10%"
                w="400px"
                h="400px"
                bg="whiteAlpha.100"
                borderRadius="full"
            />
            <Box
                position="absolute"
                bottom="-30%"
                left="-5%"
                w="300px"
                h="300px"
                bg="whiteAlpha.50"
                borderRadius="full"
            />

            <VStack spacing={6} align="stretch" position="relative" zIndex={1} maxW="1400px" mx="auto">
                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "start", md: "center" }}
                    gap={4}
                >
                    <Box>
                        <Skeleton height={{ base: "28px", md: "36px" }} width="200px" mb={2} borderRadius="md" />
                        <Skeleton height="18px" width="280px" borderRadius="md" />
                    </Box>
                    <Skeleton height="44px" width="140px" borderRadius="xl" />
                </Flex>

                <SimpleGrid columns={{ base: 2, md: 2, lg: 3 }} spacing={{ base: 3, md: 6 }}>
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} bg="whiteAlpha.200" backdropFilter="blur(10px)" borderRadius="xl" p={{ base: 3, md: 4 }}>
                            <VStack align="flex-start" spacing={1}>
                                <Skeleton height="12px" width="100px" />
                                <Skeleton height="12px" width="60px" />
                                <Skeleton height="12px" width="80px" />
                            </VStack>
                        </Card>
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
};