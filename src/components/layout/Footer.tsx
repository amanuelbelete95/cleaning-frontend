import { Box, Container, Stack, Text, Link, Icon, HStack, useColorModeValue } from '@chakra-ui/react';
import { FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

const Footer = function () {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box bg={bgColor} borderTop="1px" borderColor={borderColor} py={8}>
      <Container maxW="container.xl">
        <Stack direction={{ base: 'column', md: 'row' }} spacing={8} justify="space-between" align="start">
          <Stack spacing={3} maxW="300px">
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              Event Management
            </Text>
            <Text fontSize="sm" color={textColor}>
              Streamline your event planning and management with our comprehensive platform.
            </Text>
          </Stack>

          <Stack spacing={2}>
            <Text fontSize="sm" fontWeight="semibold">Contact</Text>
            <HStack fontSize="sm" color={textColor}>
              <Icon as={FiMail} />
              <Link href="mailto:support@eventmanagement.com">support@eventmanagement.com</Link>
            </HStack>
            <HStack fontSize="sm" color={textColor}>
              <Icon as={FiPhone} />
              <Link href="tel:+1234567890">+1 (234) 567-890</Link>
            </HStack>
            <HStack fontSize="sm" color={textColor}>
              <Icon as={FiMapPin} />
              <Text>123 Event Street, City, Country</Text>
            </HStack>
          </Stack>

          <Stack spacing={2}>
            <Text fontSize="sm" fontWeight="semibold">Quick Links</Text>
            <Link href="/events" fontSize="sm" color={textColor}>Browse Events</Link>
            <Link href="/register" fontSize="sm" color={textColor}>Create Account</Link>
            <Link href="/login" fontSize="sm" color={textColor}>Sign In</Link>
          </Stack>

          <Stack spacing={2}>
            <Text fontSize="sm" fontWeight="semibold">Resources</Text>
            <Link href="#" fontSize="sm" color={textColor}>Help Center</Link>
            <Link href="#" fontSize="sm" color={textColor}>Privacy Policy</Link>
            <Link href="#" fontSize="sm" color={textColor}>Terms of Service</Link>
          </Stack>
        </Stack>

        <Box borderTop="1px" borderColor={borderColor} mt={8} pt={6}>
          <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" spacing={4}>
            <Text fontSize="sm" color={textColor}>
              © {new Date().getFullYear()} Event Management System. All rights reserved.
            </Text>
            <HStack spacing={2} color={textColor}>
              <Icon as={FiCalendar} />
              <Text fontSize="sm">Built for efficient event management</Text>
            </HStack>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer;