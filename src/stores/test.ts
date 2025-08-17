import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Question {
  id: number
  type: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface TestResult {
  score: number
  totalQuestions: number
  timeSpent: number
  answers: number[]
  isTimeout: boolean
}

export const useTestStore = defineStore('test', () => {
  const currentTest = ref<Question[]>([])
  const currentQuestion = ref(0)
  const answers = ref<number[]>([])
  const startTime = ref<number>(0)
  const testResults = ref<TestResult[]>([])

  const initializeTest = (questions: Question[]) => {
    currentTest.value = questions
    currentQuestion.value = 0
    answers.value = []
    startTime.value = Date.now()
  }

  const submitAnswer = (questionIndex: number, answerIndex: number) => {
    answers.value[questionIndex] = answerIndex
  }

  const calculateScore = (): number => {
    let score = 0
    currentTest.value.forEach((question, index) => {
      if (answers.value[index] === question.correct) {
        score++
      }
    })
    return score
  }

  const saveTestResult = (isTimeout: boolean = false) => {
    const result: TestResult = {
      score: calculateScore(),
      totalQuestions: currentTest.value.length,
      timeSpent: Math.floor((Date.now() - startTime.value) / 1000),
      answers: [...answers.value],
      isTimeout
    }
    
    testResults.value.push(result)
    return result
  }

  const getAverageScore = (): number => {
    if (testResults.value.length === 0) return 0
    const totalScore = testResults.value.reduce((sum, result) => sum + result.score, 0)
    const totalQuestions = testResults.value.reduce((sum, result) => sum + result.totalQuestions, 0)
    return totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0
  }

  const getProgressData = () => {
    return testResults.value.map((result, index) => ({
      test: index + 1,
      score: (result.score / result.totalQuestions) * 100,
      timeSpent: result.timeSpent
    }))
  }

  return {
    currentTest,
    currentQuestion,
    answers,
    testResults,
    initializeTest,
    submitAnswer,
    calculateScore,
    saveTestResult,
    getAverageScore,
    getProgressData
  }
})