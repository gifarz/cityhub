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
import { formattedDate } from "@/lib/date";

export default function ModalAddEvent({ isOpen, onClose, eventDate, eventInfo }) {

    let formattedEventDate
    let detailEvent

    if (eventInfo?.startStr?.includes('T')) {
        formattedEventDate = formattedDate(eventInfo?.startStr) || eventDate
    } else {
        formattedEventDate = eventInfo?.startStr || eventDate
    }

    const handleChangeDetailEvent = (e) => {
        detailEvent = e.target.value
    }

    const handleSubmitDetailEvent = () => {

        if (detailEvent) {
            eventInfo.view.calendar.addEvent({
                id: 1,
                title: detailEvent,
                start: eventInfo.startStr,
                end: eventInfo.endStr,
                allDay: eventInfo.allDay
            })
        }

        onClose()
    }

    return (
        <>
            <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add Event or Task for the date : {formattedEventDate}
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Please input the detail below
                                </p>
                                <Input
                                    label="Detail Task or Event"
                                    type="text"
                                    variant="bordered"
                                    onChange={handleChangeDetailEvent}
                                    onKeyDown={(e) => {
                                        if(e.key == "Enter"){
                                            handleSubmitDetailEvent()
                                        }
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleSubmitDetailEvent}
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

