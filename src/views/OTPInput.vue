<template>
  <div class="login-container relative">
    
      <div class="absolute top-7 left-7 h-14 w-14 overflow-hidden">
          <img  class="w-full h-full object-contain"
          src="/logo.png" alt="Logo English For Real">
      </div>
      <div class="login-content min-h-screen max-w-md mx-auto flex justify-center items-center">
          <div class="login-card flex flex-col gap-10">
              <div class="">
                  <h1 class="font-bold text-black text-2xl text-center">Code OTP</h1>
              </div>

              <div>
                <p class="text-center text-gray-700">
                  Un code OTP vous a été envoyé par e-mail/SMS.
                  Il a été envoyé à l'adresse e-mail 
                  <span class="font-bold">cl...............@gmail.com</span>
                </p>
              </div>

              <!-- OTP Form -->
              <form @keypress="handleKeyPress" @submit.prevent="handleSubmit"  class="space-y-10">
                  <div class="flex justify-center space-x-4">
                    <input
                      v-for="(digit, index) in otpDigits"
                      :key="index"
                      :ref="(el: any) => setOtpInputRef(el, index)"
                      v-model="otpDigits[index]"
                      @input="handleOtpInput($event, index)"
                      @keydown="handleOtpKeydown($event, index)"
                      @paste="handlePaste($event, index)"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      class="otp-input"
                      :class="getOtpInputClass(index)"
                    />
                  </div>
                  
                  <div v-if="otpError" class="text-center">
                    <div class="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium animate-shake">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                      </svg>
                      {{ otpError }}
                    </div>
                  </div>
                  <BaseButton
                    type="submit"
                    variant="primary"
                    size="md"
                    :loading="isSubmitting"
                    full-width
                    class="bg-orange text-black p-0">
                    Valider
                  </BaseButton>
              </form>
          </div>
      </div>
      
      <!-- Success Alert -->
      <BaseAlert
        v-model="showSuccessAlert"
        :type="modalType"
        :title="modalTitle"
        :message="modalMessage"
        :variant="modalVariant"
        :closable="true"
        class="success-alert"
      />
      
  </div>
</template>

  
<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import BaseAlert from '../components/ui/BaseAlert.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ===== DATA =====
// OTP State
const otpDigits = ref<string[]>(['', '', '', ''])
const otpInputRefs = ref<HTMLInputElement[]>([])
const otpError = ref('')
const showSuccessAlert = ref(false);
const modalType = ref<"success" | "warning" | "info" | "error" | undefined>(undefined);
const modalTitle = ref<string>('');
const modalMessage = ref<string>('');
const modalVariant = ref<"filled" | "outlined" | "soft">('soft');

// Form State
const isSubmitting = ref(false)
const isSuccess = ref(false)

// Computed
const otpCode = computed(() => otpDigits.value.join(''))
const isOtpComplete = computed(() => otpDigits.value.every(digit => digit !== ''))
const isFormValid = computed(() => isOtpComplete.value && !otpError.value)

// Methods
const setOtpInputRef = (el: HTMLInputElement | null, index: number) => {
  if (el) {
    otpInputRefs.value[index] = el
  }
}

const handleOtpInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '') // Only allow digits
  
  if (value.length > 1) {
    // Handle multiple characters (e.g., from paste)
    const digits = value.split('').slice(0, 4)
    digits.forEach((digit, i) => {
      if (index + i < 4) {
        otpDigits.value[index + i] = digit
      }
    })
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(index + digits.length, 3)
    nextTick(() => {
      otpInputRefs.value[nextIndex]?.focus()
    })
  } else {
    otpDigits.value[index] = value
    
    // Auto-focus next input
    if (value && index < 3) {
      nextTick(() => {
        otpInputRefs.value[index + 1]?.focus()
      })
    }
  }
  
  // Clear error when user starts typing
  if (otpError.value) {
    otpError.value = ''
  }
}

const handleOtpKeydown = (event: KeyboardEvent, index: number) => {
  // Handle backspace
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    event.preventDefault()
    otpInputRefs.value[index - 1]?.focus()
  }
  
  // Handle arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    otpInputRefs.value[index - 1]?.focus()
  }
  
  if (event.key === 'ArrowRight' && index < 3) {
    event.preventDefault()
    otpInputRefs.value[index + 1]?.focus()
  }
}

const handlePaste = (event: ClipboardEvent, index: number) => {
  event.preventDefault()
  const paste = event.clipboardData?.getData('text') || ''
  const digits = paste.replace(/\D/g, '').split('').slice(0, 4)
  
  digits.forEach((digit, i) => {
    if (i < 4) {
      otpDigits.value[i] = digit
    }
  })
  
  // Focus the last filled input
  const lastIndex = Math.min(digits.length - 1, 3)
  nextTick(() => {
    otpInputRefs.value[lastIndex]?.focus()
  })
}

const getOtpInputClass = (index: number) => {
  const digit = otpDigits.value[index]
  const hasError = otpError.value !== ''
  
  if (hasError) {
    return 'error animate-shake'
  }
  
  if (digit) {
    return 'filled'
  }
  
  return 'empty'
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && isFormValid.value) {
    handleSubmit();
  }
};

const resetModal = () => {
  showSuccessAlert.value = false;
  modalType.value = undefined;
  modalTitle.value = '';
  modalMessage.value = '';
};

const handleSubmit = async () => {

  // Validate OTP
  if (!isOtpComplete.value) {
    otpError.value = 'Veuillez saisir les 4 chiffres du code OTP'
    showSuccessAlert.value = true
    modalType.value = 'error';
    modalTitle.value = 'Erreur de validation';
    modalMessage.value = otpError.value;
    return
  }
  
  // Reset previous states
  isSuccess.value = false
  isSubmitting.value = true
  otpError.value = ''
  
  try {
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate validation (replace with real API call)
    if (otpCode.value === '1234') {
      isSuccess.value = true

      showSuccessAlert.value = true
      modalType.value = 'success';
      modalTitle.value = "Succès";
      modalMessage.value = "Code OTP validé avec succès !";
      modalVariant.value = 'filled';
      
      // Reset form after success
      setTimeout(() => {
        otpDigits.value = ['', '', '', '']
        isSuccess.value = false
        resetModal()
        nextTick(() => {
          otpInputRefs.value[0]?.focus()
        })
        // Redirect to home or another page
        router.push('/company-completion');
      }, 4000)
    } else {
      otpError.value = 'Code OTP invalide. Essayez 1234 pour tester.'
    }
  } catch (error) {
    otpError.value = 'Erreur de connexion. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}

// Auto-focus first input on mount
nextTick(() => {
  otpInputRefs.value[0]?.focus()
})
</script>


<style scoped>
.login-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: white;
  background-image: url('/assets/img/login-bg.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
}

/* OTP Input Enhanced Styles */
.otp-input {
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 1.5rem;
    color: black;
    font-weight: bold;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(229, 231, 235, 0.8);
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 1px 2px rgba(255, 255, 255, 0.5);
  }
  
  .otp-input.filled {
    background: rgba(16, 185, 129, 0.1);
    border-color: #10b981;
    box-shadow: 
      0 8px 25px rgba(16, 185, 129, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 1px 2px rgba(255, 255, 255, 0.8);
    transform: scale(1.05);
  }
  
  .otp-input.error {
    background: rgba(239, 68, 68, 0.1);
    border-color: #ef4444;
    box-shadow: 
      0 8px 25px rgba(239, 68, 68, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 1px 2px rgba(255, 255, 255, 0.8);
  }
  
  .otp-input.empty:hover {
    border-color: #3b82f6;
    box-shadow: 
      0 6px 20px rgba(59, 130, 246, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 1px 2px rgba(255, 255, 255, 0.6);
    transform: translateY(-1px);
  }
  
  .otp-input:focus {
    border-color: #3b82f6;
    box-shadow: 
      0 0 0 4px rgba(59, 130, 246, 0.2),
      0 8px 25px rgba(59, 130, 246, 0.15),
      inset 0 1px 2px rgba(255, 255, 255, 0.8);
    transform: scale(1.05);
  }
  
.success-alert {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  max-width: 400px;
}  


</style>