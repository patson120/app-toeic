<template>
  <div class="message-wrapper" :class="{ 'own-message': message.sender === 'user' }">
    <div class="message-bubble" :class="messageClasses">
      <!-- Contenu texte -->
      <div v-if="message.type === 'text'" class="message-content">
        {{ message.content }}
      </div>
      
      <!-- Contenu image -->
      <div v-else-if="message.type === 'image' && message.fileData" class="image-content">
        <img 
          :src="message.fileData.url" 
          :alt="message.fileData.name"
          class="message-image"
          @click="openImageModal"
        />
        <div class="file-info">
          <span class="file-name">{{ message.fileData.name }}</span>
          <span class="file-size">{{ formatFileSize(message.fileData.size) }}</span>
          <span v-if="message.fileData.compressed" class="compression-info">
            Compressé {{ Math.round(message.fileData.compressionRatio!) }}x
          </span>
        </div>
      </div>
      
      <!-- Contenu fichier -->
      <div v-else-if="message.type === 'file' && message.fileData" class="file-content">
        <div class="file-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        </div>
        <div class="file-details">
          <span class="file-name">{{ message.fileData.name }}</span>
          <span class="file-size">{{ formatFileSize(message.fileData.size) }}</span>
          <span v-if="message.fileData.compressed" class="compression-info">
            Compressé {{ Math.round(message.fileData.compressionRatio!) }}x
          </span>
        </div>
        <button class="download-btn" @click="downloadFile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
          </svg>
        </button>
      </div>
      
      <div class="message-meta">
        <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
        <div v-if="message.sender === 'user'" class="status-indicators">
          <svg v-if="message.status === 'sending'" class="status-icon sending" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="60" stroke-dashoffset="60">
              <animate attributeName="stroke-dashoffset" values="60;0" dur="1s" repeatCount="indefinite"/>
            </circle>
          </svg>
          <svg v-else-if="message.status === 'sent'" class="status-icon sent" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
          </svg>
          <svg v-else-if="message.status === 'delivered'" class="status-icon delivered" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71,7.21L11,14.93L6.29,10.21L8.71,7.79L11,10.07L16.29,4.79L18.71,7.21M22.29,2.79L20.88,1.38L18.71,3.55L16.54,1.38L15.13,2.79L17.29,4.96L15.13,7.12L16.54,8.54L18.71,6.37L20.88,8.54L22.29,7.12L20.13,4.96L22.29,2.79Z"/>
          </svg>
          <svg v-else-if="message.status === 'read'" class="status-icon read" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71,7.21L11,14.93L6.29,10.21L8.71,7.79L11,10.07L16.29,4.79L18.71,7.21M22.29,2.79L20.88,1.38L18.71,3.55L16.54,1.38L15.13,2.79L17.29,4.96L15.13,7.12L16.54,8.54L18.71,6.37L20.88,8.54L22.29,7.12L20.13,4.96L22.29,2.79Z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from './types/chat'
import { FileCompressionService } from './services/fileCompression'

const props = defineProps<{ message: Message }>()

const messageClasses = computed(() => ({
  'user-message': props.message.sender === 'user',
  'contact-message': props.message.sender === 'contact',
  'text-message': props.message.type === 'text',
  'file-message': props.message.type === 'file' || props.message.type === 'image'
}))

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const formatFileSize = (bytes: number): string => {
  return FileCompressionService.formatFileSize(bytes)
}

const openImageModal = (): void => {
  if (props.message.fileData?.url) {
    window.open(props.message.fileData.url, '_blank')
  }
}

const downloadFile = (): void => {
  if (props.message.fileData?.url) {
    const link = document.createElement('a')
    link.href = props.message.fileData.url
    link.download = props.message.fileData.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>

<style scoped>
.message-wrapper {
  display: flex;
  margin-bottom: 0.75rem;
  animation: slideIn 0.3s ease-out;
}

.message-wrapper.own-message {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1.125rem;
  position: relative;
  background: #1A4FCF1A;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.message-bubble:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-message {
  border-bottom-right-radius: 0.25rem;
}

.contact-message {
  border-bottom-left-radius: 0.25rem;
}

.message-content {
  line-height: 1.4;
  word-wrap: break-word;
}

.image-content {
  max-width: 300px;
}

.message-image {
  width: 100%;
  max-width: 300px;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-bottom: 0.5rem;
}

.message-image:hover {
  transform: scale(1.02);
}

.file-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  min-width: 200px;
}

.file-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-color);
  border-radius: 0.375rem;
  color: white;
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-weight: 500;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  display: block;
  font-size: 0.75rem;
  opacity: 0.7;
}

.compression-info {
  display: block;
  font-size: 0.7rem;
  color: var(--success-color);
  font-weight: 500;
}

.download-btn {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  border-radius: 0.25rem;
  background: rgba(255, 255, 255, 0.2);
  color: currentColor;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.download-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.message-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
  font-size: 0.7rem;
  opacity: 0.7;
}

.timestamp {
  font-size: 0.7rem;
}

.status-indicators {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.status-icon {
  opacity: 0.8;
}

.status-icon.sending {
  color: var(--gray-400);
}

.status-icon.sent {
  color: var(--gray-500);
}

.status-icon.delivered {
  color: var(--success-color);
}

.status-icon.read {
  color: var(--success-color);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .message-bubble {
    max-width: 85%;
    padding: 0.625rem 0.875rem;
    font-size: 0.9rem;
  }
  
  .file-content {
    min-width: 180px;
  }
  
  .message-image {
    max-width: 250px;
  }
}
</style>