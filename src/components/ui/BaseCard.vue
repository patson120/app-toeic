<template>
    <div :class="cardClasses" @click="handleClick">
      <div v-if="$slots.header || title" class="card-header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
        <slot name="header"></slot>
      </div>
      
      <div v-if="$slots.media" class="card-media">
        <slot name="media"></slot>
      </div>
      
      <div class="card-body">
        <slot></slot>
      </div>
      
      <div v-if="$slots.footer" class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  interface Props {
    title?: string;
    variant?: 'default' | 'elevated' | 'outlined' | 'filled';
    size?: 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    clickable?: boolean;
    loading?: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'md',
    hoverable: false,
    clickable: false,
    loading: false
  });
  
  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();
  
  const cardClasses = computed(() => [
    'base-card',
    `card-${props.variant}`,
    `card-${props.size}`,
    {
      'card-hoverable': props.hoverable,
      'card-clickable': props.clickable,
      'card-loading': props.loading
    }
  ]);
  
  const handleClick = (event: MouseEvent) => {
    if (props.clickable) {
      emit('click', event);
    }
  };
  </script>
  
  <style scoped>
  .base-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
  }
  
  /* Variants */
  .card-default {
    border: 1px solid #E5E7EB;
  }
  
  .card-elevated {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .card-outlined {
    border: 2px solid #E5E7EB;
  }
  
  .card-filled {
    background: #F9FAFB;
    border: 1px solid #F3F4F6;
  }
  
  /* Sizes */
  .card-sm {
    font-size: 0.875rem;
  }
  
  .card-md {
    font-size: 1rem;
  }
  
  .card-lg {
    font-size: 1.125rem;
  }
  
  /* States */
  .card-hoverable:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .card-clickable {
    cursor: pointer;
  }
  
  .card-clickable:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
  
  .card-loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
  .card-loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  /* Card sections */
  .card-header {
    padding: 1.25rem 1.25rem 0;
    border-bottom: 1px solid #F3F4F6;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1F2937;
    margin: 0;
  }
  
  .card-media {
    margin: 0;
  }
  
  .card-media img,
  .card-media video {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .card-body {
    padding: 1.25rem;
  }
  
  .card-footer {
    padding: 0 1.25rem 1.25rem;
    border-top: 1px solid #F3F4F6;
    margin-top: 1.25rem;
    padding-top: 1.25rem;
  }
  
  /* Size adjustments */
  .card-sm .card-header,
  .card-sm .card-body,
  .card-sm .card-footer {
    padding: 1rem;
  }
  
  .card-sm .card-header {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  
  .card-sm .card-footer {
    padding-top: 1rem;
    margin-top: 1rem;
  }
  
  .card-lg .card-header,
  .card-lg .card-body,
  .card-lg .card-footer {
    padding: 1.5rem;
  }
  
  .card-lg .card-header {
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .card-lg .card-footer {
    padding-top: 1.5rem;
    margin-top: 1.5rem;
  }
  </style>