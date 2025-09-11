<template>
  <div class="chat-container">
    <MessageList 
      :messages="messages" 
      :contact="currentContact"
    />
    <MessageInput 
      ref="messageInputRef"
      @send-message="handleSendMessage"
      @upload-file="handleFileUpload"
    />
    
    <!-- Notifications toast -->
    <!-- <div v-if="notification" class="notification-toast" :class="notification.type">
      <div class="notification-content">
        <svg v-if="notification.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.41,10.09L6,11.5L11,16.5Z"/>
        </svg>
        <svg v-else-if="notification.type === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
        </svg>
        <span>{{ notification.message }}</span>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import MessageInput from './MessageInput.vue'
import MessageList from './MessageList.vue'
import { ChatService } from './services/chatService'
import type { Contact, Message } from './types/chat'

const messages = ref<Message[]>([])
const messageInputRef = ref<InstanceType<typeof MessageInput>>()
const notification = ref<{ message: string; type: 'success' | 'error' } | null>(null)

const currentContact = reactive<Contact>({
  id: 'contact_1',
  name: 'Sophie Dubois',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
  lastSeen: new Date(Date.now() - 1000 * 60 * 5), // Il y a 5 minutes
  isOnline: true,
  isTyping: false,
  status: 'online'
})

let messagesUnsubscribe: (() => void) | null = null
let uploadUnsubscribe: (() => void) | null = null

const handleSendMessage = (content: string): void => {
  ChatService.addMessage({
    content,
    sender: 'user',
    type: 'text'
  })
  
  // Simuler l'indicateur de frappe du contact
  simulateContactTyping()
  
  // Son de notification (optionnel)
  playNotificationSound()
}

const handleFileUpload = async (file: File): Promise<void> => {
  try {
    await ChatService.uploadFile(file)
    
    showNotification('Fichier envoyé avec succès !', 'success')
    
    // Simuler une réponse du contact
    setTimeout(() => {
      simulateContactTyping()
    }, 1000)
    
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    showNotification('Erreur lors de l\'envoi du fichier', 'error')
  }
}

const simulateContactTyping = (): void => {
  currentContact.isTyping = true
  
  setTimeout(() => {
    currentContact.isTyping = false
    ChatService.simulateContactResponse()
  }, 1500 + Math.random() * 1000)
}

const showNotification = (message: string, type: 'success' | 'error'): void => {
  notification.value = { message, type }
  
  setTimeout(() => {
    notification.value = null
  }, 3000)
}

const playNotificationSound = (): void => {
  // Créer un son simple avec Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = 800
  oscillator.type = 'sine'
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

onMounted(() => {
  // S'abonner aux mises à jour des messages
  messagesUnsubscribe = ChatService.onMessagesUpdate((newMessages) => {
    messages.value = [...newMessages]
  })
  
  // S'abonner aux mises à jour d'upload
  uploadUnsubscribe = ChatService.onUploadProgress((progress) => {
    messageInputRef.value?.setUploadProgress(progress.status === 'completed' ? null : progress)
  })
  
  // Charger les messages existants
  messages.value = ChatService.getMessages()
})

onUnmounted(() => {
  messagesUnsubscribe?.()
  uploadUnsubscribe?.()
})
</script>

<style scoped>
.chat-container {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  @apply !h-full flex-1 flex flex-col justify-between bg-white relative overflow-hidden;
}

.notification-toast {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease-out;
  border-left: 4px solid;
}

.notification-toast.success {
  border-left-color: var(--success-color);
}

.notification-toast.error {
  border-left-color: var(--error-color);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.notification-toast.success .notification-content {
  color: var(--success-dark);
}

.notification-toast.error .notification-content {
  color: var(--error-dark);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  .chat-container {
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }
  
  .notification-toast {
    left: 1rem;
    right: 1rem;
    transform: none;
  }
}
</style>