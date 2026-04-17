import { Box, Card, CardBody, Divider, Flex, HStack, SimpleGrid, SkeletonCircle, SkeletonText, useColorModeValue, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Skeleton from "../../Skeleton";
export const EventCardSkeleton = () => {
    const cardBg = useColorModeValue("white", "gray.800");
    const hoverBg = useColorModeValue("gray.50", "gray.700");

    return (
        <Card
            borderRadius="xl"
            overflow="hidden"
            boxShadow="lg"
            borderWidth="1px"
            borderColor="transparent"
            h="100%"
            display="flex"
            flexDirection="column"
            bg={cardBg}
            position="relative"
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="6px"
                bg="gray.200"
            />

            <CardBody p={{ base: 4, md: 6 }} display="flex" flexDirection="column" flex={1}>
                <VStack spacing={4} align="stretch" flex={1} justify="space-between">
                    <Flex justify="space-between" align="flex-start">
                        <Skeleton height="20px" width="70%" borderRadius="md" />
                        <Skeleton height="20px" width="60px" borderRadius="md" />
                    </Flex>

                    <HStack spacing={2}>
                        <Skeleton height="20px" width="50px" borderRadius="md" />
                        <Skeleton height="20px" width="70px" borderRadius="md" />
                    </HStack>

                    <SkeletonText noOfLines={2} spacing={2} skeletonHeight="14px" />

                    <Divider />

                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                        <Flex align="center" p={2} bg={hoverBg} borderRadius="lg">
                            <SkeletonCircle size="8" mr={3} />
                            <Box>
                                <Skeleton height="10px" width="40px" style={{ marginBottom: 1 }} />
                                <Skeleton height="14px" width="80px" />
                            </Box>
                        </Flex>

                        <Flex align="center" p={2} bg={hoverBg} borderRadius="lg">
                            <SkeletonCircle size="8" mr={3} />
                            <Box>
                                <Skeleton height="10px" width="40px" style={{ marginBottom: 1 }} />
                                <Skeleton height="14px" width="60px" />
                            </Box>
                        </Flex>

                        <Flex align="center" p={2} bg={hoverBg} borderRadius="lg" gridColumn={{ sm: "span 2" }}>
                            <SkeletonCircle size="8" mr={3} />
                            <Box>
                                <Skeleton height="10px" width="50px" style={{ marginBottom: 1 }} />
                                <Skeleton height="14px" width="100px" />
                            </Box>
                        </Flex>
                    </SimpleGrid>

                    <Box>
                        <Flex justify="space-between" mb={2}>
                            <Skeleton height="14px" width="120px" />
                            <Skeleton height="14px" width="30px" />
                        </Flex>
                        <Skeleton height="8px" borderRadius="full" />
                    </Box>

                    <Divider />

                    <Wrap spacing={2} justify={{ base: "space-between", md: "space-between" }}>
                        <WrapItem>
                            <Skeleton height="32px" width="70px" borderRadius="md" />
                        </WrapItem>
                        <WrapItem>
                            <Skeleton height="32px" width="60px" borderRadius="md" />
                        </WrapItem>
                        <WrapItem>
                            <Skeleton height="32px" width="80px" borderRadius="md" />
                        </WrapItem>
                    </Wrap>
                </VStack>
            </CardBody>
        </Card>
    );
};