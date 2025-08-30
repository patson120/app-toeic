<template>
  <div class="onboarding-container relative">
    <div class="absolute top-7 left-7 h-14 w-14 overflow-hidden">
      <img  class="w-full h-full object-contain"
      src="/logo.png" alt="Logo English For Real">
    </div>
    <div v-if="!onboardingStore.hasCompletedOnboarding" 
         class="md:fixed md:inset-0 max-w-2xl mx-auto flex items-center justify-center z-50 p-4">
      <div class="bg-white md:min-h-[70vh] rounded-2xl shadow-2xl w-full p-8 animate-fade-in">
        <!-- Progress bar -->
        <div class="mb-6">
          <h1 class="text-3xl text-gray-700 my-2 font-bold text-center">Juste quelques questions</h1>
          <div class="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Étape {{ onboardingStore.currentStep + 1 }} sur {{ onboardingStore.steps.length }}</span>
            <span>{{ Math.round(((onboardingStore.currentStep + 1) / onboardingStore.steps.length) * 100) }}%</span>
          </div>
          <div class="flex justify-start items-center gap-4">
            <button 
              v-if="onboardingStore.currentStep > 0"
              @click="onboardingStore.previousStep"
              class="p-3 rounded-full flex justify-center items-center border">
              <ArrowLeft :size="18" class="text-gray-700 font-extrabold" />
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
        <div class="mt-10 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-3">{{ currentStep.title }} <span class="text-orange">{{ currentStep.subtitle }}</span> </h2>
          <p class="text-gray-600 text-left leading-relaxed">{{ currentStep.description }}</p>
          <div v-if="currentStep.score" class="mt-5">
            <h1 class="text-xl font-bold text-gray-800 text-left">Score TOEIC visé :</h1>
            <input type="range" name="score" id="score" min="20" max="2000" step="10" class="w-full mt-6"
              style="accent-color: #FF551C; color: red;"
              v-model="onboardingStore.targetScore">
            <div class="flex flex-col justify-center items-center">
              <h1 class="text-orange text-4xl font-extrabold">{{ onboardingStore.targetScore }}</h1>
              <p class="text-gray-500">Points TOEIC</p>
            </div>
          </div>
          <div v-if="currentStep.buttons" class="mt-7 flex flex-col font-semibold gap-3">
            <h1 class="text-xl font-bold text-gray-800 text-left">Votre niveau actuel :</h1>
            <div class="space-y-3 mb-8">
              <button 
                v-for="(button, index) in currentStep.buttons" 
                :key="index"
                @click="currentStep.selectedLevel = button"
                :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                          currentStep.selectedLevel === button ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                <span>{{ button }}</span>
                <span :class="['px-3 h-5 rounded-full border',
                  currentStep.selectedLevel === button ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                </span>
              </button>
            </div>
          </div>
          <div v-if="currentStep.sectors" class="mt-7 flex flex-wrap gap-3">
            <button 
              v-if="currentStep.sectors"
              v-for="(sector, index) in currentStep.sectors" 
              :key="index"
              @click="currentStep.selectedSector = sector"
              :class="['py-3 px-4 rounded-lg border text-left text-gray-800 flex justify-between items-center whitespace-nowrap', 
                currentStep.selectedSector === sector ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
              {{ sector }}
            </button>
          </div>
          <div v-if="currentStep.levels" class="mt-7 space-y-4">
            <button 
              v-for="(level, index) in currentStep.levels" 
              :key="index"
              @click="currentStep.selectedExperience = index"
              :class="['relative w-full text-left p-4 border rounded-lg cursor-pointer',
                currentStep.selectedExperience === index ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
              <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ level.title }}</h3>
              <p class="text-gray-600">{{ level.description }}</p>
              <span :class="['absolute top-3 right-3 px-3 h-5 rounded-full border',
                currentStep.selectedExperience === index ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
              </span>
            </button>
          </div>  
        </div>
  
        <!-- Actions -->
        <div class="flex justify-center items-center">
          <button 
            @click="navigate"
            class="btn-primary px-6 py-3 inline-flex items-center space-x-2">
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
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors">
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
    overflow-x: hidden;
    background: white;
    background-image: url('/assets/img/login-bg.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
</style>