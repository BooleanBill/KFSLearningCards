import { useState } from "react";

interface LearningCardProps {
    question: string;
    answer: string;
    questionNumber: number;
}

export default function LearningCard({ question, answer, questionNumber }: LearningCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 w-full h-auto relative cursor-pointer transition-transform duration-300">

            <div className={`front ${isFlipped ? 'hidden' : ''} h-full justify-center items-center text-center`} onClick={handleFlip}>
                <div className="absolute top-2 right-2 text-sm text-gray-500 dark:text-white">#{questionNumber}</div>
                <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Frage</h2>
                <p className="text-gray-700 px-4 mb-4 dark:text-white">{question}</p>
                <div className="text-xs text-gray-500 dark:text-white text-right">Klicken für Antwort</div>
            </div>
            
            <div className={`back ${isFlipped ? '' : 'hidden'} h-full text-center`} onClick={handleFlip}>
                <div className="absolute top-2 right-2 text-sm text-gray-500 dark:text-white">#{questionNumber}</div>
                <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Antwort</h2>
                <p className="text-gray-700 px-4 mb-4 dark:text-white">{answer}</p>
                <div className="text-xs text-gray-500 dark:text-white text-right">Klicken für Frage</div>
            </div>
        </div>
    )
}