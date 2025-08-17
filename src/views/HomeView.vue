<template>
  <div class="home-container">
    <!-- Header avec navigation -->
    <header class="header">
      <nav class="nav-container">
        <div class="logo bounce-in">
          <h1 class="logo-text">TOEIC Prep</h1>
        </div>
        <div class="nav-links">
          <a href="#" class="nav-link">Practice</a>
          <a href="#" class="nav-link">Progress</a>
          <a href="#" class="nav-link">Profile</a>
        </div>
      </nav>
    </header>

    <!-- Section principale -->
    <main class="main-content">
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-text slide-up-enter-active">
            <h2 class="hero-title">
              Master Your
              <span class="gradient-text">TOEIC</span>
              Skills
            </h2>
            <p class="hero-description">
              Prepare for your TOEIC exam with our comprehensive practice tests and personalized learning experience.
            </p>
          </div>
          
          <div class="hero-actions">
            <button 
              @click="startTest" 
              class="primary-button pulse-glow"
              :class="{ 'loading': isLoading }"
            >
              <Play class="button-icon" v-if="!isLoading" />
              <div class="spinner" v-else></div>
              {{ isLoading ? 'Loading...' : 'Start Practice Test' }}
            </button>
            <button class="secondary-button">
              <BarChart3 class="button-icon" />
              View Progress
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="floating-card card-1">
            <div class="card-content">
              <div class="score-circle">
                <span class="score-number">{{ animatedScore }}</span>
                <span class="score-label">Score</span>
              </div>
            </div>
          </div>
          
          <div class="floating-card card-2">
            <div class="card-content">
              <TrendingUp class="card-icon" />
              <div class="card-text">
                <span class="card-title">Progress</span>
                <span class="card-value">+15%</span>
              </div>
            </div>
          </div>
          
          <div class="floating-card card-3">
            <div class="card-content">
              <Clock class="card-icon" />
              <div class="card-text">
                <span class="card-title">Time</span>
                <span class="card-value">2h 30m</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section des fonctionnalités -->
      <section class="features-section">
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="feature-icon">
              <component :is="feature.icon" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Play, BarChart3, TrendingUp, Clock, BookOpen, Target, Users, Award } from 'lucide-vue-next'

const router = useRouter()
const isLoading = ref(false)
const animatedScore = ref(0)

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Practice',
    description: 'Access hundreds of practice questions covering all TOEIC sections'
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'AI-powered recommendations based on your performance and weak areas'
  },
  {
    icon: Users,
    title: 'Expert Content',
    description: 'Questions created by TOEIC experts and native English speakers'
  },
  {
    icon: Award,
    title: 'Track Progress',
    description: 'Detailed analytics and progress tracking to monitor your improvement'
  }
]

const startTest = async () => {
  isLoading.value = true
  
  // Simulation d'un chargement
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  router.push('/test')
}

// Animation du score
onMounted(() => {
  const targetScore = 850
  const duration = 2000
  const steps = 60
  const increment = targetScore / steps
  let current = 0
  
  const timer = setInterval(() => {
    current += increment
    animatedScore.value = Math.floor(current)
    
    if (current >= targetScore) {
      animatedScore.value = targetScore
      clearInterval(timer)
    }
  }, duration / steps)
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.header {
  position: relative;
  z-index: 10;
  padding: 2rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: white;
}

.nav-link:hover::after {
  width: 100%;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 5;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 70vh;
  padding: 2rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gradient-text {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-button {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
}

.primary-button.loading {
  pointer-events: none;
  opacity: 0.8;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.button-icon {
  width: 20px;
  height: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.hero-visual {
  position: relative;
  height: 500px;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 10%;
  right: 20%;
  animation-delay: 0s;
}

.card-2 {
  top: 40%;
  right: 0%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  right: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.score-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.score-number {
  font-size: 1.5rem;
  font-weight: 700;
}

.score-label {
  font-size: 0.75rem;
  opacity: 0.9;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.card-text {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.card-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
}

.features-section {
  padding: 4rem 0;
  margin-top: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.feature-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .nav-links {
    display: none;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .floating-card {
    position: relative;
    margin: 1rem 0;
  }
  
  .hero-visual {
    height: auto;
  }
}
</style>