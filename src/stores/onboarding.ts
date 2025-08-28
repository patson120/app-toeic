import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnboardingStore = defineStore('onboarding', () => {
  const hasCompletedOnboarding = ref(false)
  const targetScore = ref(780)
  const currentStep = ref(0)

  const steps = [
    {
      title: 'Quel est votre objectif TOEIC ?',
      description: "Définissons ensemble votre score cible pour personnaliser votre parcours d'apprentissage",
      buttons: ['Débutant (A1-A2)', 'Intermédiaire (B1-B2)', 'Avancé (C1-C2)'],
      selectedLevel: 'Intermédiaire (B1-B2)',
      score: targetScore,
      action: 'Suivant'
    },
    {
      title: 'Dans quel secteur travaillez-vous ?',
      description: "Nous adapterons le vocabulaire et les situations d'entraînement à votre domaine.",
      sectors: ['Tech & IT', 'Finance', 'Marketing', 'Conseil', 'Santé', 'Éducation', 'Autre'],
      selectedSector: 'Finance',
      action: 'Continuer'
    },
    {
      title: 'Quelle est votre expérience ?',
      description: 'Aidez-nous à calibrer votre parcours selon votre familiarité avec le TOEIC et les entretiens.',
      levels: [
        { title: 'Aucune expérience', description: 'Je n\'ai jamais passé le TOEIC ni d\'entretiens en anglais.' },
        { title: 'Expérience modérée', description: 'J\'ai passé le TOEIC il y a plus d\'un an ou j\'ai eu quelques entretiens en anglais.' },
        { title: 'Bonne expérience', description: 'J\'ai passé le TOEIC récemment ou j\'ai eu plusieurs entretiens en anglais.' }   
      ],
      selectedExperience: 1,
      action: 'Continuer'
    },
    {
      title: 'A chacun son rythme. Le programme s’adapte à',
      subtitle: 'ton rythme.',
      description: "Prenez le temps de vous poser et de profiter pleinement d'une expérience d'apprentissage personnalisée. Partez à la découverte du monde.",
      action: 'Terminer'
    }
  ]

  const loadOnboardingStatus = () => {
    const completed = localStorage.getItem('onboarding_completed')
    hasCompletedOnboarding.value = completed === 'true'
  }

  const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    } else {
      completeOnboarding()
    }
  }

  const previousStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }

  const completeOnboarding = () => {
    hasCompletedOnboarding.value = true
    localStorage.setItem('onboarding_completed', 'true')
    currentStep.value = 0
  }

  const resetOnboarding = () => {
    hasCompletedOnboarding.value = false
    currentStep.value = 0
    localStorage.removeItem('onboarding_completed')
  }

  const shouldShowOnboarding = () => {
    return !hasCompletedOnboarding.value
  }

  return {
    hasCompletedOnboarding,
    currentStep,
    targetScore,
    steps,
    loadOnboardingStatus,
    nextStep,
    previousStep,
    completeOnboarding,
    resetOnboarding,
    shouldShowOnboarding
  }
})