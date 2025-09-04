<template>
    <Teleport to="body">
      <Transition name="modal" appear>
        <div v-if="modelValue" class="modal-overlay" @click="handleOverlayClick">
          <div 
            class="modal-container rounded-3xl overflow-hidden"
            @click.stop>
            <slot></slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onUnmounted, watch } from 'vue';
  
  interface Props {
    modelValue: boolean;
    closable?: boolean;
    closeOnOverlay?: boolean;
    showHeader?: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    closable: true,
    closeOnOverlay: true,
    showHeader: true
  });
  
  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    close: [];
  }>();
  
  
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
  }
  
  .modal-container {
    background: white;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
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
  
</style>