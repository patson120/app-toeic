<template>
  <div class="message-input-container">
    <!-- Barre d'upload en cours -->
    <div v-if="uploadProgress" class="upload-progress-bar">
      <div class="upload-info">
        <span class="upload-text">
          {{ uploadProgress.status === 'compressing' ? 'Compression...' : 'Envoi...' }}
        </span>
        <span class="upload-percentage">{{ Math.round(uploadProgress.progress) }}%</span>
      </div>
      <div class="progress-track">
        <div 
          class="progress-fill" 
          :style="{ width: `${uploadProgress.progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Prévisualisation des fichiers sélectionnés -->
    <div v-if="selectedFiles.length > 0" class="file-preview-container">
      <div class="file-previews">
        <div 
          v-for="(file, index) in selectedFiles" 
          :key="index"
          class="file-preview"
        >
          <div v-if="file.type.startsWith('image/')" class="image-preview">
            <img :src="getFilePreviewUrl(file)" :alt="file.name" />
          </div>
          <div v-else class="file-icon-preview">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          </div>
          
          <div class="file-preview-info">
            <span class="file-preview-name">{{ file.name }}</span>
            <span class="file-preview-size">{{ formatFileSize(file.size) }}</span>
          </div>
          
          <button 
            class="remove-file-btn"
            @click="removeFile(index)"
            type="button"
          >
            ×
          </button>
        </div>
      </div>
      
      <div class="preview-actions">
        <button class="cancel-btn" @click="clearFiles" type="button">
          Annuler
        </button>
        <button class="send-files-btn" @click="sendFiles" type="button">
          Envoyer {{ selectedFiles.length }} fichier(s)
        </button>
      </div>
    </div>

    <!-- Zone de saisie principale -->
    <div class="input-area">
      <button 
        class="attach-btn"
        @click="triggerFileInput"
        type="button"
        title="Joindre un fichier"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
        </svg>
      </button>
      
      <div class="text-input-container">
        <textarea
          ref="textareaRef"
          v-model="messageText"
          @keydown="handleKeydown"
          @input="adjustTextareaHeight"
          placeholder="Tapez votre message..."
          class="message-textarea"
          rows="1"
        ></textarea>
      </div>
      
      <button 
        class="send-btn"
        :class="{ active: canSend }"
        @click="sendMessage"
        :disabled="!canSend"
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
        </svg>
      </button>
      
      <input
        ref="fileInputRef"
        type="file"
        multiple
        @change="handleFileSelect"
        style="display: none;"
        accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import type { UploadProgress } from './types/chat'
import { FileCompressionService } from './services/fileCompression'

const emit = defineEmits<{
  sendMessage: [content: string]
  uploadFile: [file: File]
}>()

const messageText = ref('')
const selectedFiles = ref<File[]>([])
const uploadProgress = ref<UploadProgress | null>(null)
const textareaRef = ref<HTMLTextAreaElement>()
const fileInputRef = ref<HTMLInputElement>()

const canSend = computed(() => 
  (messageText.value.trim().length > 0 || selectedFiles.value.length > 0) && !uploadProgress.value
)

const triggerFileInput = (): void => {
  fileInputRef.value?.click()
}

const handleFileSelect = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const newFiles = Array.from(input.files)
    selectedFiles.value.push(...newFiles)
    input.value = '' // Reset input
  }
}

const removeFile = (index: number): void => {
  selectedFiles.value.splice(index, 1)
}

const clearFiles = (): void => {
  selectedFiles.value = []
}

const getFilePreviewUrl = (file: File): string => {
  return URL.createObjectURL(file)
}

const formatFileSize = (bytes: number): string => {
  return FileCompressionService.formatFileSize(bytes)
}

const sendMessage = (): void => {
  if (messageText.value.trim()) {
    emit('sendMessage', messageText.value.trim())
    messageText.value = ''
    adjustTextareaHeight()
  }
}

const sendFiles = async (): Promise<void> => {
  if (selectedFiles.value.length === 0) return
  
  for (const file of selectedFiles.value) {
    emit('uploadFile', file)
  }
  
  clearFiles()
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    if (canSend.value) {
      sendMessage()
    }
  }
}

const adjustTextareaHeight = (): void => {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = Math.min(textareaRef.value.scrollHeight, 120) + 'px'
    }
  })
}

onMounted(() => {
  adjustTextareaHeight()
})

defineExpose({
  setUploadProgress: (progress: UploadProgress | null) => {
    uploadProgress.value = progress
  }
})
</script>

<style scoped>
.message-input-container {
  background: white;
  border-radius: 0 0 1rem 1rem;
  border-top: 1px solid var(--gray-200);
}

.upload-progress-bar {
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  background: var(--gray-50);
}

.upload-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.upload-text {
  font-size: 0.875rem;
  color: var(--gray-600);
  font-weight: 500;
}

.upload-percentage {
  font-size: 0.875rem;
  color: var(--primary-color);
  font-weight: 600;
}

.progress-track {
  height: 0.25rem;
  background: var(--gray-200);
  border-radius: 0.125rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--success-color));
  border-radius: 0.125rem;
  transition: width 0.2s ease;
}

.file-preview-container {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.file-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  position: relative;
  max-width: 200px;
}

.image-preview img {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
  border-radius: 0.25rem;
}

.file-icon-preview {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: 0.25rem;
  color: var(--primary-color);
}

.file-preview-info {
  flex: 1;
  min-width: 0;
}

.file-preview-name {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--gray-900);
}

.file-preview-size {
  display: block;
  font-size: 0.7rem;
  color: var(--gray-600);
}

.remove-file-btn {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  border: none;
  border-radius: 50%;
  background: var(--error-color);
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.remove-file-btn:hover {
  transform: scale(1.1);
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.cancel-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  background: white;
  color: var(--gray-700);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: var(--gray-50);
}

.send-files-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.send-files-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.input-area {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
}

.attach-btn {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--gray-100);
  color: var(--gray-600);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.attach-btn:hover {
  background: var(--gray-200);
  color: var(--gray-800);
  transform: translateY(-1px);
}

.text-input-container {
  flex: 1;
  position: relative;
}

.message-textarea {
  width: 100%;
  min-height: 2.5rem;
  max-height: 120px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 1.25rem;
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.4;
  background: white;
  transition: all 0.2s ease;
}

.message-textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.message-textarea::placeholder {
  color: var(--gray-500);
}

.send-btn {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: var(--gray-300);
  color: var(--gray-500);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  transform: rotate(0deg);
}

.send-btn.active {
  background: var(--primary-color);
  color: white;
  transform: rotate(0deg) scale(1.05);
  cursor: pointer;
}

.send-btn.active:hover {
  background: var(--primary-dark);
  transform: rotate(0deg) scale(1.1);
}

.send-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .input-area {
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }
  
  .attach-btn,
  .send-btn {
    width: 2.25rem;
    height: 2.25rem;
  }
  
  .message-textarea {
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
  }
  
  .file-preview-container {
    padding: 0.75rem 1rem;
  }
  
  .file-previews {
    gap: 0.5rem;
  }
  
  .file-preview {
    max-width: 150px;
  }
}
</style>