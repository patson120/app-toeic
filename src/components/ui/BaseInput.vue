<template>
    <div class="input-wrapper" :class="wrapperClasses">
      <label v-if="label" :for="inputId" class="input-label">
        {{ label }}
        <span v-if="required" class="required-asterisk">*</span>
      </label>
      
      <div class="input-container">
        <div v-if="prefixIcon" class="input-prefix">
          <i :class="prefixIcon"></i>
        </div>
        
        <input
          :id="inputId"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :class="inputClasses"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
        />
        
        <div v-if="suffixIcon || clearable" class="input-suffix">
          <button
            v-if="clearable && modelValue"
            type="button"
            class="clear-button"
            @click="clearInput"
          >
            <i class="fas fa-times"></i>
          </button>
          <i v-else-if="suffixIcon" :class="suffixIcon"></i>
        </div>
      </div>
      
      <div v-if="error || hint" class="input-message">
        <span v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </span>
        <span v-else-if="hint" class="hint-message">{{ hint }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  
  interface Props {
    modelValue?: string | number;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    error?: string;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled' | 'outlined';
    prefixIcon?: string;
    suffixIcon?: string;
    clearable?: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    size: 'md',
    variant: 'default',
    clearable: false
  });
  
  const emit = defineEmits<{
    'update:modelValue': [value: string | number];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
    keydown: [event: KeyboardEvent];
    clear: [];
  }>();
  
  const isFocused = ref(false);
  const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);
  
  const wrapperClasses = computed(() => [
    'input-wrapper',
    `input-${props.size}`,
    `input-${props.variant}`,
    {
      'input-focused': isFocused.value,
      'input-error': props.error,
      'input-disabled': props.disabled
    }
  ]);
  
  const inputClasses = computed(() => [
    'base-input',
    {
      'has-prefix': props.prefixIcon,
      'has-suffix': props.suffixIcon || props.clearable
    }
  ]);
  
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = props.type === 'number' ? Number(target.value) : target.value;
    emit('update:modelValue', value);
  };
  
  const handleFocus = (event: FocusEvent) => {
    isFocused.value = true;
    emit('focus', event);
  };
  
  const handleBlur = (event: FocusEvent) => {
    isFocused.value = false;
    emit('blur', event);
  };
  
  const handleKeydown = (event: KeyboardEvent) => {
    emit('keydown', event);
  };
  
  const clearInput = () => {
    emit('update:modelValue', '');
    emit('clear');
  };
  </script>
  
  <style scoped>
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .input-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
  }
  
  .required-asterisk {
    color: #EF4444;
    margin-left: 0.25rem;
  }
  
  .input-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .base-input {
    width: 100%;
    border: 2px solid #E5E7EB;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
    color: #1F2937;
  }
  
  .base-input:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .base-input:disabled {
    background: #F9FAFB;
    color: #9CA3AF;
    cursor: not-allowed;
  }
  
  .base-input::placeholder {
    color: #9CA3AF;
  }
  
  /* Sizes */
  .input-sm .base-input {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    min-height: 2rem;
  }
  
  .input-md .base-input {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    min-height: 2.5rem;
  }
  
  .input-lg .base-input {
    padding: 1rem 1.25rem;
    font-size: 1.125rem;
    min-height: 3rem;
  }
  
  /* Variants */
  .input-filled .base-input {
    background: #F9FAFB;
    border: 2px solid transparent;
  }
  
  .input-filled .base-input:focus {
    background: white;
    border-color: #3B82F6;
  }
  
  .input-outlined .base-input {
    background: transparent;
    border: 2px solid #D1D5DB;
  }
  
  /* With icons */
  .has-prefix {
    padding-left: 2.5rem !important;
  }
  
  .has-suffix {
    padding-right: 2.5rem !important;
  }
  
  .input-prefix,
  .input-suffix {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #6B7280;
    pointer-events: none;
  }
  
  .input-prefix {
    left: 0.75rem;
  }
  
  .input-suffix {
    right: 0.75rem;
  }
  
  .clear-button {
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    pointer-events: auto;
    transition: color 0.2s ease;
  }
  
  .clear-button:hover {
    color: #374151;
  }
  
  /* States */
  .input-error .base-input {
    border-color: #EF4444;
  }
  
  .input-error .base-input:focus {
    border-color: #EF4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
  
  .input-focused .input-label {
    color: #3B82F6;
  }
  
  /* Messages */
  .input-message {
    font-size: 0.875rem;
  }
  
  .error-message {
    color: #EF4444;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .hint-message {
    color: #6B7280;
  }
  </style>