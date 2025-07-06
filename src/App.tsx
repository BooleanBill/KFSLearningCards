import { useState, useEffect, useCallback } from 'react'
import './App.css'
import LearningCard from './components/LearningCard'
import questionsData from './assets/questions.json'

// Type definitions for the JSON structure
interface QAPair {
  question_number: number
  question: string
  answer: string
  sectionTitle: string
}

interface Section {
  title: string
  qa_pairs: QAPair[]
}

interface QuestionsData {
  sections: Section[]
}

function App() {
  const [currentSection, setCurrentSection] = useState<string>('all')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState<QAPair[]>([])

  const data = questionsData as QuestionsData

  // Function to shuffle array
  const shuffleArray = (array: QAPair[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Function to get all questions based on current section
  const getAllQuestions = useCallback(() => {
    if (currentSection === 'all') {
      // Get all questions from all sections
      return data.sections.flatMap(section =>
        section.qa_pairs.map(qa => ({
          ...qa,
          sectionTitle: section.title
        }))
      )
    } else {
      // Get questions from selected section
      const sectionIndex = parseInt(currentSection)
      return data.sections[sectionIndex].qa_pairs.map(qa => ({
        ...qa,
        sectionTitle: data.sections[sectionIndex].title
      }))
    }
  }, [currentSection, data.sections])

  // Shuffle questions
  const handleShuffle = () => {
    const allQuestions = getAllQuestions()
    const shuffled = shuffleArray(allQuestions)
    setShuffledQuestions(shuffled)
    setCurrentQuestionIndex(0)
  }

  // Initialize questions on component mount and when section changes
  useEffect(() => {
    const allQuestions = getAllQuestions()
    setShuffledQuestions(allQuestions)
    setCurrentQuestionIndex(0)
  }, [currentSection, getAllQuestions])

  // Handle section change
  const handleSectionChange = (section: string) => {
    setCurrentSection(section)
  }

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  return (
    <div className="app">
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">KFS Lernkarten App</h1>

        {/* Section selector */}
        <div className="w-full flex-col flex justify-center items-center bg-base-100 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-base-content mb-4">Thema wählen:</h2>
          <select
            id="section-selector"
            className="bg-base-100 text-base-content p-2 rounded-sm border-1 border-base-content"
            value={currentSection}
            onChange={(e) => handleSectionChange(e.target.value)}
          >
            <option value="all" className="bg-white text-black">Alle Themen</option>
            {data.sections.map((section, index) => (
              <option key={index} value={index} className="bg-white text-black">
                {section.title}
              </option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="controls mb-6 flex justify-between items-center bg-base-100 rounded-lg p-4">
          <button
            onClick={handleShuffle}
            className="btn btn-accent"
          >
            Karten mischen
          </button>
          <span className="text-base-content">
            {shuffledQuestions.length > 0 && (
              `Karte ${currentQuestionIndex + 1} von ${shuffledQuestions.length}`
            )}
          </span>
        </div>

        {/* Learning Card */}
        {currentQuestion && (
          <div className="flex justify-center mb-6">
            <LearningCard
              key={currentQuestionIndex}
              question={currentQuestion.question}
              answer={currentQuestion.answer}
              questionNumber={currentQuestion.question_number}
              topic={currentQuestion.sectionTitle}
            />
          </div>
        )}

        {/* Navigation */}
        {shuffledQuestions.length > 1 && (
          <div className="w-full flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="btn btn-primary"
            >
              Vorherige
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === shuffledQuestions.length - 1}
              className="btn btn-primary"
            >
              Nächste
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default App
