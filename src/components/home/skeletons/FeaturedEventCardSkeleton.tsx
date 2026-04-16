import { AspectRatio, Box, Card, CardBody, Divider, Flex, Skeleton, Stack, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

export const FeaturedEventCardSkeleton = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Card
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
      w={"100%"}
    >
      <AspectRatio ratio={16 / 9}>
        <Box bgGradient="linear(to-br, gray.300, gray.400)">
          <Flex
            h="full"
            align="center"
            justify="center"
            direction="column"
            color="white"
          >
            <Skeleton width="48px" height="48px" borderRadius="md" />
            <Skeleton height="14px" width="180px" borderRadius="md" mt={2} />
          </Flex>
        </Box>
      </AspectRatio>

      <CardBody>
        <VStack align="stretch" spacing={3}>
          <Skeleton height="24px" width="80%" borderRadius="md" />
          <Skeleton height="24px" width="50px" borderRadius="md" />

          <Stack spacing={2}>
            <Flex>
              <Skeleton height="16px" width="16px" borderRadius="sm" mr={2} />
              <Skeleton height="14px" width="100px" borderRadius="md" />
            </Flex>
            <Flex>
              <Skeleton height="16px" width="16px" borderRadius="sm" mr={2} />
              <Skeleton height="14px" width="60px" borderRadius="md" />
            </Flex>
          </Stack>

          <Skeleton height="14px" width="100%" borderRadius="md" />
          <Skeleton height="14px" width="70%" borderRadius="md" />

          <Divider />

          <Flex justify="space-between" align="center">
            <Skeleton height="32px" width="100px" borderRadius="md" />
            <Skeleton height="32px" width="90px" borderRadius="md" />
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};