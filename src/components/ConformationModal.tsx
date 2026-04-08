import { Button, useDisclosure, ModalBody, ModalBodyProps, ModalHeader, ModalFooter, ModalCloseButton, ModalContent, Modal, ModalOverlay } from "@chakra-ui/react"


interface ConformationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    posativeAction: string;
    closeAction: string;
    action: string;
    conformationAction: () => void;
}
const ConformationModal = (props: ConformationModalProps) => {
    const { isOpen = false, onClose, action, title, posativeAction, closeAction, conformationAction, message } = props;
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure you want to {action} the {title}?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {message}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' colorScheme='yellow' mr={3} onClick={onClose}>
                            {closeAction}
                        </Button>
                        <Button variant='outline' colorScheme="green" onClick={conformationAction}>{posativeAction}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ConformationModal;