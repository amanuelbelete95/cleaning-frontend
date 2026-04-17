import { Box, SimpleGrid } from "@chakra-ui/react";
import { EventCardSkeleton } from "./EventCardSkeleton";
import { EventHeaderSkeleton } from "./EventHeaderSkeleton";

export default function EventsPageSkeleton() {
    return (
        <Box p={4}>
            <EventHeaderSkeleton />
            <Box px={{ base: 4, md: 8 }} py={8} maxW="1400px" mx="auto">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {[...Array(6)].map((_, i) => (
                        <EventCardSkeleton key={i} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
}   