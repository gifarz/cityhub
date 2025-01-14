"use client"

import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
} from "@nextui-org/react";
import BackgroundVideo from "./BackgroundVideo";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";

export default function ModalHome() {
    const [isClient, setIsClient] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);


    React.useEffect(() => {
        // Ensure modal only opens on the client
        setIsOpen(true);
        setIsClient(true);
    }, []);

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    if (!isClient) return null;

    return (
        <>
            <Modal isOpen={isOpen} hideCloseButton={true} size={"full"}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalBody>
                                <div
                                    className="h-full flex flex-col justify-center items-center"
                                    style={{ margin: "0 30%" }}
                                >
                                    <h1 className="text-4xl font-bold mb-10">Metro City Hub</h1>

                                    <Input
                                        label="Email"
                                        type="email"
                                        variant="underlined"
                                    />
                                    <Input
                                        label="Password"
                                        variant="underlined"
                                        type={isVisible ? "text" : "password"}
                                        endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleVisibility}
                                            >
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                    />

                                    <Button
                                        className="mt-2"
                                        radius="lg"
                                        fullWidth={true}
                                        onPress={handleCloseModal}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

