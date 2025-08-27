<template>
  <div class="onboarding-container relative">
    <div class="absolute top-7 left-7 h-14 w-14 overflow-hidden">
      <img  class="w-full h-full object-contain"
      src="/logo.png" alt="Logo English For Real">
    </div>
    <div v-if="!onboardingStore.hasCompletedOnboarding" 
         class="fixed inset-0 max-w-md mx-auto flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        <!-- Progress bar -->
        <div class="mb-6">
          <h1 class="text-3xl text-gray-700 my-2 font-bold text-center">Juste quelques questions</h1>
          <div class="text-6xl text-center my-4 animate-bounce">
            {{ currentStep.icon }}
          </div>
          <div class="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Étape {{ onboardingStore.currentStep + 1 }} sur {{ onboardingStore.steps.length }}</span>
            <span>{{ Math.round(((onboardingStore.currentStep + 1) / onboardingStore.steps.length) * 100) }}%</span>
          </div>
          <div class="flex justify-start items-center gap-4">
            <button 
              v-if="onboardingStore.currentStep > 0"
              @click="onboardingStore.previousStep"
              class="p-3 rounded-full flex justify-center items-center border">
              <ArrowLeft :size="18" class="text-gray-700 font-bold" />
            </button>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="progress-bars rounded-full bg-[#202020] h-2  transition-all duration-500" 
                :style="{ width: `${((onboardingStore.currentStep + 1) / onboardingStore.steps.length) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
  
        <!-- Content -->
        <div class="text-center mb-8">
          <!-- <div class="text-6xl mb-4 animate-bounce">
            {{ currentStep.icon }}
          </div> -->
          <h2 class="text-2xl font-bold text-gray-900 mb-3">
            {{ currentStep.title }}
          </h2>
          <p class="text-gray-600 text-left leading-relaxed">
            {{ currentStep.description }}
          </p>
          <div>
            <input type="range" name="score" id="score" min="20" max="2000" step="10" class="w-full mt-6"
             style="accent-color: #FF551C; color: red;"
             v-model="onboardingStore.targetScore">
            <div class="text-center mt-2 text-gray-700 font-semibold">
              Score cible : {{ onboardingStore.targetScore }} points
            </div>
          </div>
        </div>
  
        <!-- Actions -->
        <div class="flex justify-center items-center">
          <button 
            @click="navigate"
            class="btn-primary px-6 py-3 inline-flex items-center space-x-2"
          >
            <span>{{ currentStep.action }}</span>
            <ArrowRight v-if="onboardingStore.currentStep < onboardingStore.steps.length - 1" :size="18" />
            <router-link to="/" v-else>
              <CheckCircle  :size="18" />
            </router-link>
          </button>
        </div>
  
        <!-- Skip option -->
        <div class="text-center mt-6">
          <button 
            @click="skipOnboarding"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors"
          >
            Passer l'introduction
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useOnboardingStore } from '../stores/onboarding'
  import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-vue-next'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  
  const onboardingStore = useOnboardingStore()
  
  const currentStep = computed(() => onboardingStore.steps[onboardingStore.currentStep])

  const navigate = () => {
    if (onboardingStore.currentStep < onboardingStore.steps.length - 1){
      onboardingStore.nextStep()
    }
    else {
      router.push("/")
    }
  }

  const skipOnboarding = ()  => {
    onboardingStore.completeOnboarding()
    router.push('/')
  }


  onMounted(() => {
    onboardingStore.hasCompletedOnboarding = false
    // Autres initialisations
  });
</script>

<style scoped>
  .onboarding-container {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background: white;
    background-image: url('/assets/img/login-bg.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>