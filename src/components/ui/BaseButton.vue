<template>
    <button 
      :class="buttonClasses"
      :disabled="disabled || loading"
      @click="handleClick"
      :type="type"
    >
      <span v-if="loading" class="loading-spinner"></span>
      <i v-if="icon && !loading" :class="icon" class="button-icon"></i>
      <span v-if="$slots.default" class="button-text">
        <slot></slot>
      </span>
    </button>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  interface Props {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    rounded?: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    type: 'button',
    fullWidth: false,
    rounded: false
  });
  
  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();
  
  const buttonClasses = computed(() => [
    'base-button',
    `button-${props.variant}`,
    `button-${props.size}`,
    {
      'button-disabled': props.disabled || props.loading,
      'button-loading': props.loading,
      'button-full-width': props.fullWidth,
      'button-rounded': props.rounded,
      'button-icon-only': props.icon // && !props.$slots?.default
    }
  ]);
  
  const handleClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
      emit('click', event);
    }
  };
  </script>
  
  <style scoped>
  .base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    font-family: inherit;
    outline: none;
    border-radius: 8px;
  }
  
  .base-button:focus-visible {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
  }
  
  /* Sizes */
  .button-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    min-height: 2rem;
  }
  
  .button-md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-height: 2.5rem;
  }
  
  .button-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    min-height: 3rem;
  }
  
  .button-xl {
    padding: 1.25rem 2.5rem;
    font-size: 1.25rem;
    min-height: 3.5rem;
  }
  
  /* Variants */
  .button-primary {
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    color: white;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  }
  
  .button-primary:hover:not(.button-disabled) {
    background: linear-gradient(135deg, #2563EB, #1E40AF);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
  }
  
  .button-secondary {
    background: linear-gradient(135deg, #6B7280, #4B5563);
    color: white;
    box-shadow: 0 4px 15px rgba(107, 114, 128, 0.4);
  }
  
  .button-secondary:hover:not(.button-disabled) {
    background: linear-gradient(135deg, #4B5563, #374151);
    transform: translateY(-2px);
  }
  
  .button-success {
    background: linear-gradient(135deg, #10B981, #059669);
    color: white;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  }
  
  .button-success:hover:not(.button-disabled) {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-2px);
  }
  
  .button-warning {
    background: linear-gradient(135deg, #F59E0B, #D97706);
    color: white;
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
  }
  
  .button-warning:hover:not(.button-disabled) {
    background: linear-gradient(135deg, #D97706, #B45309);
    transform: translateY(-2px);
  }
  
  .button-danger {
    background: linear-gradient(135deg, #EF4444, #DC2626);
    color: white;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
  }
  
  .button-danger:hover:not(.button-disabled) {
    background: linear-gradient(135deg, #DC2626, #B91C1C);
    transform: translateY(-2px);
  }
  
  .button-ghost {
    background: transparent;
    color: #6B7280;
    border: 1px solid transparent;
  }
  
  .button-ghost:hover:not(.button-disabled) {
    background: rgba(107, 114, 128, 0.1);
    color: #374151;
  }
  
  .button-outline {
    background: transparent;
    color: #3B82F6;
    border: 2px solid #3B82F6;
  }
  
  .button-outline:hover:not(.button-disabled) {
    background: #3B82F6;
    color: white;
  }
  
  /* States */
  .button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  .button-loading {
    cursor: wait;
  }
  
  .button-full-width {
    width: 100%;
  }
  
  .button-rounded {
    border-radius: 50px;
  }
  
  .button-icon-only {
    aspect-ratio: 1;
    padding: 0.75rem;
  }
  
  /* Loading spinner */
  .loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .button-icon {
    font-size: 1em;
  }
  
  .button-text {
    white-space: nowrap;
  }
  </style>