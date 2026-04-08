import { AlertIcon, Button, Flex, Heading, Icon, Modal, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { EventDesignSystem } from "./events/designSystem";

interface ConformationModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    posativeAction: string;
    closeAction: string;
    action: string;
    conformationAction: () => void;
}

const ConformationModal = (props: ConformationModalProps) => {
    const { isOpen = false, onClose, action, posativeAction, closeAction, conformationAction, message } = props;

    const handleConfirm = () => {
        conformationAction();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
            <ModalContent
                borderRadius="2xl"
                shadow="xl"
                mx={4}
                overflow="hidden"
            >
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    p={8}
                    textAlign="center"
                >
                    <Flex
                        w={16}
                        h={16}
                        borderRadius="full"
                        bg="red.50"
                        align="center"
                        justify="center"
                        mb={4}
                    >
                        <Icon as={FiAlertTriangle} boxSize={8} color="red.500" />
                    </Flex>

                    <Heading size="md" color="gray.700" mb={2}>
                        Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
                    </Heading>

                    <Text color="gray.400" fontSize="xs" mb={6}>
                        {message}
                    </Text>

                    <Flex gap={3} w="full" maxW="280px">
                        <Button
                            flex={1}
                            variant="outline"
                            colorScheme="gray"
                            onClick={onClose}
                            borderRadius="lg"
                            _hover={{ bg: "gray.50" }}
                        >
                            {closeAction}
                        </Button>
                        <Button
                            flex={1}
                            bg={action === "delete" ? "red.500" : EventDesignSystem.primaryColor}
                            color="white"
                            onClick={handleConfirm}
                            borderRadius="lg"
                            _hover={{
                                bg: action === "delete" ? "red.600" : EventDesignSystem.primaryDark,
                                transform: "translateY(-1px)",
                            }}
                            _active={{ transform: "scale(0.98)" }}
                        >
                            {posativeAction}
                        </Button>
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    );
};

export default ConformationModal;
