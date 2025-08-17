<template>
    <div class="results-container">
      <div class="results-content">
        <!-- Header avec animation -->
        <div class="results-header">
          <div class="celebration-animation" v-if="isGoodScore">
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
          </div>
          
          <h1 class="results-title bounce-in">
            {{ isTimeout ? 'Time\'s Up!' : 'Test Complete!' }}
          </h1>
          <p class="results-subtitle">{{ getResultMessage() }}</p>
        </div>
  
        <!-- Score principal -->
        <div class="score-section">
          <div class="score-card main-score">
            <div class="score-circle" :class="getScoreClass()">
              <span class="score-number">{{ animatedScore }}</span>
              <span class="score-total">/ {{ totalQuestions }}</span>
            </div>
            <div class="score-details">
              <h3 class="score-title">Your Score</h3>
              <p class="score-percentage">{{ Math.round((score / totalQuestions) * 100) }}%</p>
            </div>
          </div>
  
          <!-- Statistiques détaillées -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon correct">
                <CheckCircle class="icon" />
              </div>
              <div class="stat-content">
                <span class="stat-number">{{ score }}</span>
                <span class="stat-label">Correct</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon incorrect">
                <XCircle class="icon" />
              </div>
              <div class="stat-content">
                <span class="stat-number">{{ totalQuestions - score }}</span>
                <span class="stat-label">Incorrect</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon time">
                <Clock class="icon" />
              </div>
              <div class="stat-content">
                <span class="stat-number">{{ formatTime(timeSpent) }}</span>
                <span class="stat-label">Time Spent</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon accuracy">
                <Target class="icon" />
              </div>
              <div class="stat-content">
                <span class="stat-number">{{ Math.round((score / totalQuestions) * 100) }}%</span>
                <span class="stat-label">Accuracy</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Analyse des performances -->
        <div class="analysis-section">
          <h3 class="section-title">Performance Analysis</h3>
          
          <div class="performance-card">
            <div class="performance-header">
              <TrendingUp class="icon" />
              <span>Strengths & Areas for Improvement</span>
            </div>
            
            <div class="performance-content">
              <div class="strength-item" v-if="score >= totalQuestions * 0.7">
                <div class="strength-icon">
                  <Award class="icon" />
                </div>
                <div class="strength-text">
                  <h4>Excellent Performance!</h4>
                  <p>You demonstrated strong understanding across most question types.</p>
                </div>
              </div>
              
              <div class="improvement-item" v-if="score < totalQuestions * 0.7">
                <div class="improvement-icon">
                  <BookOpen class="icon" />
                </div>
                <div class="improvement-text">
                  <h4>Room for Improvement</h4>
                  <p>Focus on practicing more questions to strengthen your skills.</p>
                </div>
              </div>
              
              <div class="recommendation">
                <h4>Next Steps:</h4>
                <ul>
                  <li v-if="score >= totalQuestions * 0.8">Continue practicing to maintain your excellent level</li>
                  <li v-else-if="score >= totalQuestions * 0.6">Focus on your weaker areas with targeted practice</li>
                  <li v-else>Consider reviewing fundamental concepts before taking more practice tests</li>
                  <li>Take regular practice tests to track your progress</li>
                  <li>Review explanations for questions you got wrong</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Actions -->
        <div class="actions-section">
          <button @click="retakeTest" class="action-button primary">
            <RotateCcw class="icon" />
            Retake Test
          </button>
          
          <button @click="goHome" class="action-button secondary">
            <Home class="icon" />
            Back to Home
          </button>
          
          <button @click="shareResults" class="action-button tertiary">
            <Share2 class="icon" />
            Share Results
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { 
    CheckCircle, 
    XCircle, 
    Clock, 
    Target, 
    TrendingUp, 
    Award, 
    BookOpen, 
    RotateCcw, 
    Home, 
    Share2 
  } from 'lucide-vue-next'
  
  const router = useRouter()
  const route = useRoute()
  
  const animatedScore = ref(0)
  const score = ref(parseInt(route.query.score as string) || 0)
  const totalQuestions = ref(parseInt(route.query.total as string) || 3)
  const timeSpent = ref(parseInt(route.query.time as string) || 0)
  const isTimeout = ref(route.query.timeout === 'true')
  
  const isGoodScore = computed(() => score.value >= totalQuestions.value * 0.7)
  
  const getScoreClass = () => {
    const percentage = (score.value / totalQuestions.value) * 100
    if (percentage >= 80) return 'excellent'
    if (percentage >= 60) return 'good'
    return 'needs-improvement'
  }
  
  const getResultMessage = () => {
    if (isTimeout.value) {
      return 'Don\'t worry, practice makes perfect!'
    }
    
    const percentage = (score.value / totalQuestions.value) * 100
    if (percentage >= 90) return 'Outstanding performance! You\'re ready for the real test!'
    if (percentage >= 80) return 'Great job! You\'re on the right track!'
    if (percentage >= 60) return 'Good effort! Keep practicing to improve!'
    return 'Keep studying and you\'ll get there!'
  }
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }
  
  const retakeTest = () => {
    router.push('/test')
  }
  
  const goHome = () => {
    router.push('/')
  }
  
  const shareResults = () => {
    const text = `I just scored ${score.value}/${totalQuestions.value} (${Math.round((score.value / totalQuestions.value) * 100)}%) on my TOEIC practice test!`
    
    if (navigator.share) {
      navigator.share({
        title: 'My TOEIC Test Results',
        text: text,
        url: window.location.origin
      })
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      navigator.clipboard.writeText(text + ' ' + window.location.origin)
      alert('Results copied to clipboard!')
    }
  }
  
  // Animation du score
  onMounted(() => {
    const duration = 2000
    const steps = 60
    const increment = score.value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      animatedScore.value = Math.floor(current)
      
      if (current >= score.value) {
        animatedScore.value = score.value
        clearInterval(timer)
      }
    }, duration / steps)
  })
  </script>
  
  <style scoped>
  .results-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem 0;
    position: relative;
    overflow: hidden;
  }
  
  .results-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
  
  .results-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 5;
  }
  
  .results-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }
  
  .celebration-animation {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    pointer-events: none;
  }
  
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #ffd700;
    animation: confetti-fall 3s ease-out infinite;
  }
  
  .confetti:nth-child(1) {
    left: 20%;
    animation-delay: 0s;
    background: #ff6b6b;
  }
  
  .confetti:nth-child(2) {
    left: 50%;
    animation-delay: 0.5s;
    background: #4ecdc4;
  }
  
  .confetti:nth-child(3) {
    left: 80%;
    animation-delay: 1s;
    background: #45b7d1;
  }
  
  @keyframes confetti-fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(200px) rotate(720deg);
      opacity: 0;
    }
  }
  
  .results-title {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .results-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
  }
  
  .score-section {
    margin-bottom: 3rem;
  }
  
  .main-score {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-shrink: 0;
  }
  
  .score-circle.excellent {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
  }
  
  .score-circle.good {
    background: linear-gradient(45deg, #ffc107, #fd7e14);
    color: white;
  }
  
  .score-circle.needs-improvement {
    background: linear-gradient(45deg, #dc3545, #e83e8c);
    color: white;
  }
  
  .score-number {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
  }
  
  .score-total {
    font-size: 1rem;
    opacity: 0.8;
  }
  
  .score-details {
    flex: 1;
  }
  
  .score-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .score-percentage {
    font-size: 2rem;
    font-weight: 700;
    color: #667eea;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }
  
  .stat-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-2px);
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .stat-icon.correct {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  }
  
  .stat-icon.incorrect {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
  }
  
  .stat-icon.time {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }
  
  .stat-icon.accuracy {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
  }
  
  .stat-content {
    display: flex;
    flex-direction: column;
  }
  
  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
  }
  
  .analysis-section {
    margin-bottom: 3rem;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .performance-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .performance-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    color: #667eea;
    font-weight: 600;
  }
  
  .strength-item,
  .improvement-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .strength-icon,
  .improvement-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .strength-icon {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  }
  
  .improvement-icon {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }
  
  .strength-text h4,
  .improvement-text h4 {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }
  
  .strength-text p,
  .improvement-text p {
    color: #666;
    line-height: 1.5;
  }
  
  .recommendation {
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
  }
  
  .recommendation h4 {
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .recommendation ul {
    list-style: none;
    padding: 0;
  }
  
  .recommendation li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: #666;
    line-height: 1.5;
  }
  
  .recommendation li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
  }
  
  .actions-section {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }
  
  .action-button.primary {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  }
  
  .action-button.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
  }
  
  .action-button.secondary {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  .action-button.secondary:hover {
    background: white;
    transform: translateY(-2px);
  }
  
  .action-button.tertiary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  .action-button.tertiary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    .results-content {
      padding: 0 1rem;
    }
    
    .results-title {
      font-size: 2rem;
    }
    
    .main-score {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }
    
    .score-circle {
      width: 100px;
      height: 100px;
    }
    
    .score-number {
      font-size: 2rem;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .actions-section {
      flex-direction: column;
      align-items: stretch;
    }
    
    .action-button {
      justify-content: center;
    }
  }
  </style>