<template>
    <div class="login-container relative">
      
        <div class="absolute top-7 left-7 h-14 w-14 overflow-hidden">
            <img  class="w-full h-full object-contain"
            src="/logo.png" alt="Logo English For Real">
        </div>
        <div class="login-content min-h-screen max-w-md mx-auto flex justify-center items-center">
            <div class="login-card flex flex-col gap-10">
                <div class="">
                    <h1 class="font-bold text-black text-2xl text-center">Completez votre profile</h1>
                </div>
  
                <div>
                  <p class="text-center text-gray-700">
                    Personnalisez votre expérience en ajoutant une photo de profil et votre nom d'utilisateur.
                  </p>
                </div>
  
                <!-- Profile Form -->
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <div
                        @click="selectFile" 
                        :class="{'bg-[url(/assets/img/profile-pic.png)]': !profileForm.image }"
                        class="bg-slate-100 h-36 w-36 mx-auto rounded-lg cursor-pointer flex justify-center items-center bg-cover bg-no-repeat">
                        <input type="file" name="" id="profile" class="hidden" />
                        <Camera class="h-12 w-12 text-gray-400" /> 
                    </div>
                    <BaseInput
                        v-model="profileForm.fullname"
                        type="text"
                        label="Nom complet"
                        placeholder="Votre nom complet"
                        :error="errors.fullname"
                        required
                        clearable
                    />
                   
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
    import { Camera } from "lucide-vue-next";
    import { onMounted, reactive, ref, watch } from 'vue';
    import BaseAlert from '../components/ui/BaseAlert.vue';
    import BaseButton from '../components/ui/BaseButton.vue';
    import BaseInput from '../components/ui/BaseInput.vue';
    import { useRouter } from "vue-router";

    const router = useRouter();
    

    // ===== DATA =====
    const isSubmitting = ref<boolean>(false);
    const showSuccessAlert = ref(false);
    const modalType = ref<"success" | "warning" | "info" | "error" | undefined>(undefined);
    const modalTitle = ref<string>('');
    const modalMessage = ref<string>('');
    const modalVariant = ref<"filled" | "outlined" | "soft">('soft');

    const profileForm = reactive({
        fullname: '',
        image: ''
    });

    const errors = reactive({
        fullname: '',
        image: ''
    });


    // ===== LIFECYCLE & EVENT HANDLERS =====
    const handleSubmit = async () => {
        if (isSubmitting.value === true || !validateForm()) return
        isSubmitting.value = true

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // On success
            modalType.value = 'success';
            modalTitle.value = 'Succès';
            modalMessage.value = 'Votre profil a été mis à jour avec succès !';
            showSuccessAlert.value = true;

            // Reset form
            resetForm();

            // Redirect to home or another page
            router.push('/company-completion');
        } catch (error) {
            modalType.value = 'error';
            modalTitle.value = 'Erreur';
            modalMessage.value = 'Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.';
            showSuccessAlert.value = true;
        } finally {
            isSubmitting.value = false;
        }
    }


    // ===== METHODS =====
    const selectFile = async () => {
        const profile = document.querySelector("#profile") as HTMLInputElement
        profile.click()
    }
    const validateForm = () => {
        errors.fullname = '';
        errors.image = '';
        
        if (!profileForm.fullname) {
            errors.fullname = 'Votre nom complet est requis';
            return false;
        }
        if (profileForm.fullname.length < 3) {
            errors.fullname = 'Le nom doit contenir au moins 3 caractères.';
            return false;
        }
        return true;
    }
    const resetForm = () => {
        profileForm.fullname = '';
        profileForm.image = '';
        errors.fullname = '';
        errors.image = '';
    }


    // ===== LIFECYCLE HOOKS =====
    onMounted(() => {
        // Autres initialisations
    });


    // ===== WATCHERS =====
    // Watchers pour le nom de l'utilisateur
    watch(() => profileForm.fullname, (newname) => {
        // Validation en temps réel du nom
        if (newname && newname.length < 3) {
            errors.fullname = 'Le nom doit contenir au moins 3 caractères.';
        } else {
            errors.fullname = '';
        }
    });
    
  
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