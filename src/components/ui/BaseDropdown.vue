<template>
    <div class="dropdown-wrapper" ref="dropdownRef">
      <div 
        class="dropdown-trigger"
        @click="toggleDropdown"
        :class="{ 'dropdown-active': isOpen }"
      >
        <slot name="trigger">
          <BaseButton :variant="triggerVariant" :size="triggerSize">
            {{ triggerText }}
            <i class="fas fa-chevron-down dropdown-arrow" :class="{ 'rotated': isOpen }"></i>
          </BaseButton>
        </slot>
      </div>
      
      <Transition name="dropdown">
        <div 
          v-if="isOpen"
          class="dropdown-menu"
          :class="menuClasses"
        >
          <slot></slot>
        </div>
      </Transition>
    </div>
  </template>
  
<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';
import BaseButton from './BaseButton.vue';
  
  interface Props {
    triggerText?: string;
    triggerVariant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    triggerSize?: 'sm' | 'md' | 'lg';
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    width?: 'auto' | 'trigger' | 'full';
  }
  
  const props = withDefaults(defineProps<Props>(), {
    triggerText: 'Menu',
    triggerVariant: 'outline',
    triggerSize: 'md',
    placement: 'bottom-start',
    width: 'auto'
  });
  
  const isOpen = ref(false);
  const dropdownRef = ref<HTMLElement>();
  
  const menuClasses = computed(() => [
    'dropdown-menu',
    `dropdown-${props.placement}`,
    `dropdown-width-${props.width}`
  ]);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const closeDropdown = () => {
    isOpen.value = false;
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      closeDropdown();
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  <style scoped>
  .dropdown-wrapper {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-trigger {
    cursor: pointer;
  }
  
  .dropdown-arrow {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
    font-size: 0.75rem;
  }
  
  .dropdown-arrow.rotated {
    transform: rotate(180deg);
  }
  
  .dropdown-menu {
    position: absolute;
    z-index: 1000;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem 0;
  }
  
  /* Placements */
  .dropdown-bottom-start {
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
  }
  
  .dropdown-bottom-end {
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
  }
  
  .dropdown-top-start {
    bottom: 100%;
    left: 0;
    margin-bottom: 0.5rem;
  }
  
  .dropdown-top-end {
    bottom: 100%;
    right: 0;
    margin-bottom: 0.5rem;
  }
  
  /* Widths */
  .dropdown-width-auto {
    width: auto;
  }
  
  .dropdown-width-trigger {
    width: 100%;
  }
  
  .dropdown-width-full {
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
  }
  
  /* Transitions */
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.2s ease;
  }
  
  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>