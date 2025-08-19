<template>
    <Transition name="alert" appear>
      <div v-if="modelValue" :class="alertClasses">
        <div class="alert-icon">
          <i :class="iconClass"></i>
        </div>
        
        <div class="alert-content">
          <h4 v-if="title" class="alert-title">{{ title }}</h4>
          <div class="alert-message">
            <slot>{{ message }}</slot>
          </div>
        </div>
        
        <button 
          v-if="closable"
          class="alert-close"
          @click="closeAlert"
          aria-label="Fermer"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  interface Props {
    modelValue?: boolean;
    type?: 'success' | 'warning' | 'error' | 'info';
    title?: string;
    message?: string;
    closable?: boolean;
    variant?: 'filled' | 'outlined' | 'soft';
  }
  
  const props = withDefaults(defineProps<Props>(), {
    modelValue: true,
    type: 'info',
    closable: true,
    variant: 'soft'
  });
  
  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    close: [];
  }>();
  
  const alertClasses = computed(() => [
    'base-alert',
    `alert-${props.type}`,
    `alert-${props.variant}`
  ]);
  
  const iconClass = computed(() => {
    const icons = {
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-triangle',
      error: 'fas fa-times-circle',
      info: 'fas fa-info-circle'
    };
    return icons[props.type];
  });
  
  const closeAlert = () => {
    emit('update:modelValue', false);
    emit('close');
  };
  </script>
  
  <style scoped>
  .base-alert {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid transparent;
    position: relative;
  }
  
  /* Type colors */
  .alert-success.alert-soft {
    background: #ECFDF5;
    border-color: #A7F3D0;
    color: #065F46;
  }
  
  .alert-success.alert-filled {
    background: #10B981;
    color: white;
  }
  
  .alert-success.alert-outlined {
    background: white;
    border-color: #10B981;
    color: #065F46;
  }
  
  .alert-warning.alert-soft {
    background: #FFFBEB;
    border-color: #FDE68A;
    color: #92400E;
  }
  
  .alert-warning.alert-filled {
    background: #F59E0B;
    color: white;
  }
  
  .alert-warning.alert-outlined {
    background: white;
    border-color: #F59E0B;
    color: #92400E;
  }
  
  .alert-error.alert-soft {
    background: #FEF2F2;
    border-color: #FECACA;
    color: #991B1B;
  }
  
  .alert-error.alert-filled {
    background: #EF4444;
    color: white;
  }
  
  .alert-error.alert-outlined {
    background: white;
    border-color: #EF4444;
    color: #991B1B;
  }
  
  .alert-info.alert-soft {
    background: #EFF6FF;
    border-color: #BFDBFE;
    color: #1E40AF;
  }
  
  .alert-info.alert-filled {
    background: #3B82F6;
    color: white;
  }
  
  .alert-info.alert-outlined {
    background: white;
    border-color: #3B82F6;
    color: #1E40AF;
  }
  
  .alert-icon {
    flex-shrink: 0;
    font-size: 1.25rem;
    margin-top: 0.125rem;
  }
  
  .alert-content {
    flex: 1;
  }
  
  .alert-title {
    font-weight: 600;
    font-size: 1rem;
    margin: 0 0 0.25rem 0;
  }
  
  .alert-message {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  .alert-close {
    background: none;
    border: none;
    color: currentColor;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
  }
  
  .alert-close:hover {
    opacity: 1;
  }
  
  .alert-filled .alert-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  /* Transitions */
  .alert-enter-active,
  .alert-leave-active {
    transition: all 0.3s ease;
  }
  
  .alert-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  .alert-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  </style>