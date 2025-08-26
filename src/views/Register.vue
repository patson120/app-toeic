<template>
  <div class="login-container relative">
    
      <div class="absolute top-7 left-7 h-14 w-14 overflow-hidden">
          <img  class="w-full h-full object-contain"
          src="/logo.png" alt="Logo English For Real">
      </div>
      <div class="login-content min-h-screen max-w-md mx-auto flex justify-center items-center">

          <div class="login-card">
              <div class="mb-5">
                  <h1 class="font-bold text-black text-2xl text-center">S'inscrire</h1>
              </div>
          
              <form @keypress="handleKeyPress" @submit.prevent="handleRegister" class="login-form">
                  <BaseInput
                    v-model="registerForm.email"
                    type="email"
                    label="Adresse email"
                    placeholder="votre@email.com"
                    :error="errors.email"
                    required
                    clearable
                  />
                  
                  <BaseInput
                    v-model="registerForm.password"
                    type="password"
                    label="Mot de passe"
                    placeholder="••••••••"
                    :error="errors.password"
                    required
                  />
                  
                  <BaseButton
                    type="submit"
                    variant="primary"
                    size="md"
                    :loading="isLoading"
                    full-width
                    class="login-button bg-orange text-black p-0"
                    >
                    S'inscrire
                  </BaseButton>
                  
                  <div class="divider flex flex-row justify-center">
                      <span class="h-1 border-t border-t-gray-600 w-max mt-3"></span>
                      <span class="bg-white">ou</span>
                      <span class="h-1 border-t border-t-gray-600 w-max mt-3"></span>
                  </div>
                  
                  <div class="social-login">
                  <BaseButton
                      variant="outline"
                      size="sm"
                      full-width
                      @click="registerWithGoogle"
                      class="social-button !rounded-full text-black/85 !border-[1px] !border-gray-500">
                      <div class="flex gap-3 py-[5px] font-normal">
                          <FacebookIcon :size="22" class="text-black" />
                          Continuer avec Google
                      </div>
                  </BaseButton>
                  
                  <BaseButton
                      variant="outline"
                      size="sm"
                      full-width
                      @click="registerWithFacebook"
                      class="social-button !rounded-full text-black/85 !border-[1px] !border-gray-500"
                  >
                      <div class="flex gap-3 py-[5px] font-normal">
                          <FacebookIcon :size="22" class="text-black" />
                          Continuer avec Facebook
                      </div>
                  </BaseButton>
                  <BaseButton
                      variant="outline"
                      size="sm"
                      full-width
                      @click="registerWithApple"
                      class="social-button !rounded-full text-black/85 !border-[1px] !border-gray-500"
                  >
                      <div class="flex gap-3 py-[5px] font-normal">
                          <FacebookIcon :size="22" class="text-black" />
                          Continuer avec Apple
                      </div>
                  </BaseButton>
                  </div>
                  
                  <div class="signup-link">
                    <p>Avez-vous déjà un compte ? <router-link to="/login">Se connecter</router-link></p>
                  </div>
              </form>
          </div>
      </div>
      
      <!-- Success Alert -->
      <BaseAlert
          v-model="showSuccessAlert"
          type="success"
          title="Inscription réussie !"
          message="Vous allez être redirigé vers le formulaire de connexion"
          variant="filled"
          :closable="false"
          class="success-alert"
      />
      
  </div>
</template>

<script setup lang="ts">
import { FacebookIcon } from "lucide-vue-next";
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { BaseAlert, BaseButton, BaseInput } from '../components/ui';

import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter()
const authStore = useAuthStore()



// ===== DATA =====
const isLoading = ref(false);
const showSuccessAlert = ref(false);

const registerForm = reactive({
  email: '',
  password: ''
});

const signupForm = reactive({
  name: '',
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: ''
});

// ===== COMPUTED =====
// Computed properties pour une utilisation future
const isFormValid = computed(() => {
  return registerForm.email && 
         registerForm.password && 
         registerForm.email.includes('@') && 
         registerForm.password.length >= 6;
});

//const loginButtonText = computed(() => {
//  return isLoading.value ? 'Connexion...' : 'Se connecter';
//});

// const formClasses = computed(() => {
//   return {
//     'form-loading': isLoading.value,
//     'form-valid': isFormValid.value
//   };
// });

// ===== METHODS =====
const validateForm = () => {
  errors.email = '';
  errors.password = '';
  
  if (!registerForm.email) {
    errors.email = 'L\'adresse email est requise';
    return false;
  }
  
  if (!registerForm.email.includes('@')) {
    errors.email = 'Veuillez entrer une adresse email valide';
    return false;
  }
  
  if (!registerForm.password) {
    errors.password = 'Le mot de passe est requis';
    return false;
  }
  
  if (registerForm.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    return false;
  }
  
  return true;
};

const resetForm = () => {
  registerForm.email = '';
  registerForm.password = '';
  errors.email = '';
  errors.password = '';
};

const showNotification = (type: 'success' | 'error', message: string) => {
  // Méthode pour afficher des notifications
  console.log(`${type}: ${message}`);
};


// ===== LIFECYCLE & EVENT HANDLERS =====

const handleRegister = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;


  // Simulation d'une requête de connexion
  const result = await authStore.register(registerForm.email.split("@")[0], registerForm.email, registerForm.password)
  
  if (result.success) {
    isLoading.value = false;
    showSuccessAlert.value = true;
    showNotification('success', 'Inscription réussie !');

    // Masquer l'alerte après 3 secondes
    setTimeout(() => {
      showSuccessAlert.value = false;
      resetForm()
      router.push('/login')
    }, 3000);
  } else {
    // error.value = result.error || 'Erreur de connexion'
    console.log("Erreur d'inscription !");
    
  }
};

const registerWithGoogle = () => {
  console.log('Inscription avec Google');
  // Logique future pour Google OAuth
};

const registerWithFacebook = () => {
  console.log('Inscription avec Facebook');
  // Logique future pour Facebook OAuth
};
const registerWithApple = () => {
  console.log('Inscription avec Apple');
  // Logique future pour Apple OAuth
};

// const handleSignup = () => {
//   console.log('Création de compte:', signupForm);
//   // showSignup.value = false;
//   // Logique future pour la création de compte
// };


const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && isFormValid.value) {
    handleRegister();
  }
};

// ===== WATCHERS =====
// Watchers pour une utilisation future
watch(() => registerForm.email, (newEmail) => {
  // Validation en temps réel de l'email
  if (newEmail && !newEmail.includes('@')) {
    errors.email = 'Format d\'email invalide';
  } else {
    errors.email = '';
  }
});

watch(() => registerForm.password, (newPassword) => {
  // Validation en temps réel du mot de passe
  if (newPassword && newPassword.length < 6) {
    errors.password = 'Minimum 6 caractères requis';
  } else {
    errors.password = '';
  }
});

// ===== LIFECYCLE HOOKS =====
onMounted(() => {
  // loadFromLocalStorage();
  // Autres initialisations
});

onUnmounted(() => {
  // Nettoyage si nécessaire
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
  flex: 1;
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
}


.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-button {
  margin-top: 1rem;
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
}

.divider span {
  background: white;
  color: #9CA3AF;
  padding: 0 1rem;
  font-size: 0.875rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.social-button i {
  font-size: 1.1rem;
}

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
}

.signup-link p {
  color: #6B7280;
  font-size: 0.875rem;
  margin: 0;
}

.signup-link a {
  color: #3B82F6;
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}
 
.success-alert {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  max-width: 400px;
}  
</style>