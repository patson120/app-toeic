<template>
  <div 
    class="dropdown-item"
    :class="itemClasses"
    @click="handleClick"
  >
    <i v-if="icon" :class="icon" class="dropdown-item-icon"></i>
    <span class="dropdown-item-text">
      <slot>{{ text }}</slot>
    </span>
    <i v-if="shortcut" class="dropdown-item-shortcut">{{ shortcut }}</i>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  text?: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  danger: false,
  active: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const itemClasses = computed(() => [
  'dropdown-item',
  {
    'dropdown-item-disabled': props.disabled,
    'dropdown-item-danger': props.danger,
    'dropdown-item-active': props.active
  }
]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  color: #374151;
}

.dropdown-item:hover:not(.dropdown-item-disabled) {
  background: #F3F4F6;
}

.dropdown-item-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropdown-item-danger {
  color: #EF4444;
}

.dropdown-item-danger:hover:not(.dropdown-item-disabled) {
  background: #FEF2F2;
}

.dropdown-item-active {
  background: #EFF6FF;
  color: #2563EB;
}

.dropdown-item-icon {
  font-size: 1rem;
  width: 1rem;
  text-align: center;
}

.dropdown-item-text {
  flex: 1;
}

.dropdown-item-shortcut {
  font-size: 0.75rem;
  color: #9CA3AF;
  font-style: normal;
}
</style>