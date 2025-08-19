<template>
    <Teleport to="body">
      <Transition name="modal" appear>
        <div v-if="modelValue" class="modal-overlay" @click="handleOverlayClick">
          <div 
            class="modal-container" 
            :class="modalClasses"
            @click.stop
          >
            <div v-if="showHeader" class="modal-header">
              <h3 v-if="title" class="modal-title">{{ title }}</h3>
              <slot name="header"></slot>
              <button 
                v-if="closable"
                class="modal-close"
                @click="closeModal"
                aria-label="Fermer"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="modal-body">
              <slot></slot>
            </div>
            
            <div v-if="$slots.footer" class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted, onUnmounted, watch } from 'vue';
  
  interface Props {
    modelValue: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closable?: boolean;
    closeOnOverlay?: boolean;
    showHeader?: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    showHeader: true
  });
  
  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    close: [];
  }>();
  
  const modalClasses = computed(() => [
    'modal-container',
    `modal-${props.size}`
  ]);
  
  const closeModal = () => {
    emit('update:modelValue', false);
    emit('close');
  };
  
  const handleOverlayClick = () => {
    if (props.closeOnOverlay) {
      closeModal();
    }
  };
  
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.closable) {
      closeModal();
    }
  };
  
  // Lock body scroll when modal is open
  watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
  });
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = '';
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }
  
  .modal-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  /* Sizes */
  .modal-sm {
    width: 100%;
    max-width: 400px;
  }
  
  .modal-md {
    width: 100%;
    max-width: 500px;
  }
  
  .modal-lg {
    width: 100%;
    max-width: 700px;
  }
  
  .modal-xl {
    width: 100%;
    max-width: 900px;
  }
  
  .modal-full {
    width: 95vw;
    height: 95vh;
    max-width: none;
    max-height: none;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid #E5E7EB;
    background: #F9FAFB;
  }
  
  .modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1F2937;
    margin: 0;
  }
  
  .modal-close {
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
  }
  
  .modal-close:hover {
    background: #E5E7EB;
    color: #374151;
  }
  
  .modal-body {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
  }
  
  .modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #E5E7EB;
    background: #F9FAFB;
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }
  
  /* Transitions */
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: scale(0.9) translateY(-20px);
  }
  
  @media (max-width: 768px) {
    .modal-overlay {
      padding: 0.5rem;
    }
    
    .modal-container {
      width: 100% !important;
      max-width: none !important;
      margin: 0;
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
      padding: 1rem;
    }
  }
</style>