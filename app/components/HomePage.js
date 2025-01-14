"use client"

import React from "react";
import {
    Input,
    Spinner
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import ArrowRight from "../../public/arrow-right.svg";

export default function HomePage() {

    const [prompt, setPrompt] = React.useState();
    const [response, setResponse] = React.useState('');
    const [isGenerating, setIsGenerating] = React.useState();

    const handleGenerate = async () => {
        try {
            setIsGenerating(true)
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            setIsGenerating(false)
            setResponse(data.result[0].generated_text);
        } catch (error) {
            console.error('Error fetching response:', error);
            setIsGenerating(false)
            setResponse('Failed to generate response.');
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center overflow-y-auto" style={{ margin: "0 15%" }}>

                <h1 className="text-5xl font-bold mb-5">City Hub</h1>
                <Input
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            handleGenerate()
                        }
                    }}
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    label="Search"
                    placeholder="Type to search..."
                    radius="lg"
                    startContent={
                        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                    endContent={
                        prompt ?
                            <button 
                            onClick={handleGenerate}
                            >
                                <ArrowRight
                                    className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"

                                />
                            </button>
                            :
                            null
                    }
                />

                <div className="mt-4"> 
                    {
                        isGenerating ?
                        <Spinner color="primary" label="Generating..." />
                        :
                        response
                    }
                </div>
            </div>
        </>
    );
}
