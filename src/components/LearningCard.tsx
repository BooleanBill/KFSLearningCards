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
                <div className="absolute inset-0 w-full h-full bg-base-100 rounded-lg shadow-md p-4 backface-hidden">
                    <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="absolute top-2 right-2 text-xs text-base-content">{topic} #{questionNumber}</div>
                        <h2 className="text-xl font-semibold mb-4 text-base-content">Frage</h2>
                        <p className="text-base-content overflow-y-auto px-4 mb-4">{question}</p>
                        <div className="text-xs text-base-content text-right mt-auto">Klicken für Antwort</div>
                    </div>
                </div>

                {/* Back side */}
                <div className="absolute inset-0 w-full h-full bg-base-100 rounded-lg shadow-md p-4 backface-hidden rotate-y-180">
                    <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="absolute top-2 right-2 text-sm text-base-content">{topic} #{questionNumber}</div>
                        <h2 className="text-xl font-semibold mb-4 text-base-content">Antwort</h2>
                        <p className="text-base-content overflow-y-auto px-4 mb-4">{answer}</p>
                        <div className="text-xs text-base-content text-right mt-auto">Klicken für Frage</div>
                    </div>
                </div>
            </div>
        </div>
    )
}