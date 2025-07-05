import { useState } from "react";

interface LearningCardProps {
    question: string;
    answer: string;
    questionNumber: number;
    topic: string;
}

export default function LearningCard({ question, answer, questionNumber, topic }: LearningCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);


    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="relative w-full max-w-2xl aspect-video cursor-pointer perspective-1000" onClick={handleFlip}>
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front side */}
                <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 backface-hidden">
                    <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="absolute top-2 right-2 text-sm text-gray-500 dark:text-white">{topic} #{questionNumber}</div>
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Frage</h2>
                        <p className="text-gray-700 overflow-y-auto px-4 mb-4 dark:text-white">{question}</p>
                        <div className="text-xs text-gray-500 dark:text-white text-right mt-auto">Klicken für Antwort</div>
                    </div>
                </div>

                {/* Back side */}
                <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 backface-hidden rotate-y-180">
                    <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="absolute top-2 right-2 text-sm text-gray-500 dark:text-white">{topic} #{questionNumber}</div>
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Antwort</h2>
                        <p className="text-gray-700 overflow-y-auto px-4 mb-4 dark:text-white">{answer}</p>
                        <div className="text-xs text-gray-500 dark:text-white text-right mt-auto">Klicken für Frage</div>
                    </div>
                </div>
            </div>
        </div>
    )
}