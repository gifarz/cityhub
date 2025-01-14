import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";

export default function ModalDeleteEvent({ isOpen, onClose, eventInfo}) {

    const handleDeleteEvent = () => {
        eventInfo?.event.remove()
        onClose()
    }

    return (
        <>
            <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Are you sure want to delete the event "{eventInfo?.event.title}" on {eventInfo?.event.startStr} ?
                            </ModalHeader>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleDeleteEvent}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

