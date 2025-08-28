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
      selectedLevel: '',
      score: targetScore,
      action: 'Commencer'
    },
    {
      title: 'Choisissez votre niveau',
      description: 'Sélectionnez le niveau qui correspond le mieux à vos compétences actuelles',
      action: 'Continuer'
    },
    {
      title: 'Passez le test',
      description: 'Répondez aux questions dans le temps imparti pour obtenir votre score',
      action: 'Continuer'
    },
    {
      title: 'Consultez vos résultats',
      description: 'Obtenez une analyse détaillée de vos performances et des recommandations',
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