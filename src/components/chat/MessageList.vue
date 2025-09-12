<template>
  <div ref="messageListRef" class="message-list">
    <div class="messages-container">
      <!-- Messages vides placeholder -->
      <div v-if="messages.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z"/>
          </svg>
        </div>
        <h3>Commencez une conversation</h3>
        <p>Envoyez votre premier message ou partagez un fichier pour commencer.</p>
      </div>
      
      <!-- Messages -->
      <div v-for="message in messages" :key="message.id" class="message-item">
        <MessageBubble :message="message" />
      </div>
      
      <!-- Indicateur de frappe -->
      <div v-if="contact.isTyping" class="typing-indicator-container">
        <div class="typing-bubble">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <!-- Illustratinon -->
      <div id="targetSection" class="targetSection" ref="targetSection"></div>

    </div>
    
    <!-- Bouton scroll vers le bas -->
    <button 
      v-if="showScrollButton"
      class="scroll-to-bottom"
      @click="() => scrollToBottom(true)"
      title="Aller au dernier message"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
  import type { Message, Contact } from './types/chat'
  import MessageBubble from './MessageBubble.vue';

  const props = defineProps<{
    messages: Message[]
    contact: Contact
  }>()

  const messageListRef = ref<HTMLDivElement>()
  const targetSection = ref<HTMLDivElement>()

  const showScrollButton = ref(false)
  let isUserScrolling = false
  let scrollTimeout: number | undefined

  const scrollToBottom = (smooth = true): void => {
    nextTick(() => {
      if (messageListRef.value) {
        messageListRef.value.scrollTo({
          top: messageListRef.value.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto',
        })
      }
    })
  }

  const scrollToElementById = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  const scrollToClass = (className: string) => {
    const element = document.querySelector(`.${className}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToSelector = (selector: string) => {
    const element = document.querySelector(selector)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToElement = () => {
    if (targetSection.value) {
      targetSection.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleScroll = (): void => {
    if (!messageListRef.value) return
    
    const { scrollTop, scrollHeight, clientHeight } = messageListRef.value
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50
    
    showScrollButton.value = !isAtBottom
    
    // Détecter si l'utilisateur fait défiler manuellement
    isUserScrolling = true
    clearTimeout(scrollTimeout)
    scrollTimeout = window.setTimeout(() => {
      isUserScrolling = false
    }, 150)
  }

  // Auto-scroll quand de nouveaux messages arrivent
  watch(() => props.messages.length, () => {
    scrollToElementById("targetSection")
    if (!isUserScrolling) {
      scrollToBottom(true)
    }
  }, { flush: 'post' })

  // Auto-scroll quand l'indicateur de frappe change
  watch(() => props.contact.isTyping, (isTyping) => {
    if (isTyping && !isUserScrolling) {
      scrollToBottom()
    }
  }, { flush: 'post' })

  onMounted(() => {
    scrollToBottom(false)
    messageListRef.value?.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    messageListRef.value?.removeEventListener('scroll', handleScroll)
    clearTimeout(scrollTimeout)
  })
</script>

<style scoped>
  .message-list {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: linear-gradient(to bottom, #fafafa, #f5f5f5);
  }

  .messages-container {
    height: 100%;
    overflow-y: auto;
    padding: 1rem 1.5rem;
    scroll-behavior: smooth;
  }

  .messages-container::-webkit-scrollbar {
    width: 6px;
  }

  .messages-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .messages-container::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 3px;
  }

  .messages-container::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: var(--gray-500);
    padding: 2rem;
  }

  .empty-icon {
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .empty-state h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--gray-700);
  }

  .empty-state p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .message-item {
    animation: fadeInUp 0.3s ease-out;
  }

  .typing-indicator-container {
    display: flex;
    margin-bottom: 0.75rem;
    animation: slideIn 0.3s ease-out;
  }

  .typing-bubble {
    background: var(--gray-100);
    border-radius: 1.125rem;
    border-bottom-left-radius: 0.25rem;
    padding: 0.75rem 1rem;
    max-width: 70%;
  }

  .typing-dots {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .typing-dots span {
    width: 0.5rem;
    height: 0.5rem;
    background: var(--gray-400);
    border-radius: 50%;
    animation: typingDot 1.4s infinite;
  }

  .typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  .scroll-to-bottom {
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    transition: all 0.2s ease;
    z-index: 10;
  }

  .scroll-to-bottom:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes typingDot {
    0%, 60%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    30% {
      transform: scale(1.2);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .messages-container {
      padding: 0.75rem 1rem;
    }
    
    .scroll-to-bottom {
      bottom: 0.75rem;
      right: 1rem;
      width: 2.25rem;
      height: 2.25rem;
    }
    
    .empty-state {
      padding: 1.5rem;
    }
    
    .empty-state h3 {
      font-size: 1.125rem;
    }
    
    .empty-state p {
      font-size: 0.85rem;
    }
  }
</style>