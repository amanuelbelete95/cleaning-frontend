import { CalendarIcon, ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { EventDesignSystem } from "../events/designSystem";

const NAV_ITEMS_ADMIN = [
  { path: "/", label: "Dashboard" },
  { path: "/events", label: "Events" },
  { path: "/users", label: "Users" },
];

const NAV_ITEMS_USER = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Browse Events" },
  { path: "/register-events", label: "My Registrations" },
  { path: "/contact", label: "Contact" }
];

function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  const bg = useColorModeValue("teal.600", "gray.900");
  const navHover = useColorModeValue("white", "teal.200");
  const cardBg = useColorModeValue("white", "gray.800");

  const navItems = user?.role === "admin" ? NAV_ITEMS_ADMIN : NAV_ITEMS_USER;

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map(({ path, label }) => {
        const isActive = location.pathname === path;

        return (
          <ChakraLink
            key={path}
            as={Link}
            to={path}
            onClick={onClick}
            fontWeight="semibold"
            fontSize="md"
            position="relative"
            py={2}
            color={isActive ? "white" : "whiteAlpha.800"}
            _hover={{
              textDecoration: "none",
              color: navHover
            }}
            _after={{
              content: '""',
              position: "absolute",
              width: isActive ? "100%" : "0%",
              height: "2px",
              bottom: "0",
              left: 0,
              bg: "white",
              transition: "0.3s"
            }}
          >
            {label}
          </ChakraLink>
        );
      })}
    </>
  );

  return (
    <Flex
      px={{ base: 4, md: 8 }}
      py={4}
      align="center"
      justify="space-between"
      bg={bg}
      color="white"
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Logo + Title */}
      <HStack spacing={3}>
        <CalendarIcon boxSize={{ base: 5, md: 6 }} />
        <Box>
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
            EMS
          </Text>
          <Text display={{ base: "none", sm: "block" }} fontSize="xs" opacity={0.85}>
            {user?.role === "admin" ? "Admin Dashboard" : "Discover Events"}
          </Text>
        </Box>
      </HStack>

      {/* Desktop Navigation */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        align="center"
        gap={8}
      >
        <HStack spacing={8}>
          <NavLinks />
        </HStack>

        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
            _active={{ bg: "whiteAlpha.300" }}
            rightIcon={<ChevronDownIcon />}
            color="white"
          >
            <HStack spacing={2}>
              <Avatar
                size="sm"
                name={user?.firstname}
                bg="white"
                color={EventDesignSystem.primaryColor}
              />
              <Text fontSize="sm" fontWeight="medium">
                {user?.firstname}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList bg={cardBg} borderColor="gray.200">
            <Box px={3} py={2}>
              <Text fontWeight="semibold">{user?.firstname} {user?.lastname}</Text>
              <Text fontSize="sm" color="gray.500" textTransform="capitalize">
                {user?.role}
              </Text>
            </Box>
            <MenuDivider />
            <MenuItem
              as={Link}
              to="/profile"
              icon={<FiSettings />}
              _hover={{ bg: "gray.300" }}
              color={"gray"}
            >
              Profile
            </MenuItem>
            <MenuItem
              as={Link}
              to="/"
              icon={<FiSettings />}
              _hover={{ bg: "gray.300" }}
              color={"gray"}
            >
              Settings
            </MenuItem>

            <MenuItem
              onClick={logout}
              icon={<FiLogOut />}
              _hover={{ bg: "gray.100" }}
              color="red.500"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Mobile Menu Button */}
      <IconButton
        display={{ base: "flex", lg: "none" }}
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        variant="ghost"
        color="white"
        onClick={onDrawerOpen}
        _hover={{ bg: "whiteAlpha.200" }}
      />

      {/* Mobile Drawer */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" color="white">
            <HStack spacing={3}>
              <CalendarIcon boxSize={6} />
              <Text>Menu</Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              <NavLinks onClick={onDrawerClose} />
              
              <Box pt={4} borderTopWidth="1px" borderColor="whiteAlpha.300" mt={4}>
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    width="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                    color="white"
                    leftIcon={
                      <Avatar
                        size="sm"
                        name={user?.firstname}
                        bg="white"
                        color={EventDesignSystem.primaryColor}
                      />
                    }
                    rightIcon={<ChevronDownIcon />}
                  >
                    <Text fontSize="sm" fontWeight="medium">
                      {user?.firstname}
                    </Text>
                  </MenuButton>
                  <MenuList bg={cardBg} borderColor="gray.200">
                    <Box px={3} py={2}>
                      <Text fontWeight="semibold">{user?.firstname} {user?.lastname}</Text>
                      <Text fontSize="sm" color="gray.500" textTransform="capitalize">
                        {user?.role}
                      </Text>
                    </Box>
                    <MenuDivider />
                    <MenuItem
                      as={Link}
                      to="/profile"
                      icon={<FiSettings />}
                      _hover={{ bg: "gray.300" }}
                      color={"gray"}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      to="/"
                      icon={<FiSettings />}
                      _hover={{ bg: "gray.300" }}
                      color={"gray"}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={logout}
                      icon={<FiLogOut />}
                      _hover={{ bg: "gray.100" }}
                      color="red.500"
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Header;
