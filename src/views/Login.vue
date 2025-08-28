<template>
  <div class="login-container relative">
    
      <div class="absolute top-7 left-7 h-14 w-14 overflow-hidden">
          <img  class="w-full h-full object-contain"
          src="/logo.png" alt="Logo English For Real">
      </div>
      <div class="login-content min-h-screen max-w-md mx-auto flex justify-center items-center">

          <div class="login-card">
              <div class="mb-5">
                  <h1 class="font-bold text-black text-2xl text-center">Se connecter</h1>
              </div>
          
              <form @keypress="handleKeyPress" @submit.prevent="handleLogin" class="login-form">
                  <BaseInput
                    v-model="loginForm.email"
                    type="email"
                    label="Adresse email"
                    placeholder="votre@email.com"
                    :error="errors.email"
                    required
                    clearable
                  />
                  
                  <BaseInput
                    v-model="loginForm.password"
                    type="password"
                    label="Mot de passe"
                    placeholder="••••••••"
                    :error="errors.password"
                    required
                  />
                  
                  <div class="form-options">
                    <label class="remember-me">
                        <input type="checkbox" v-model="loginForm.rememberMe">
                        <span class="checkmark"></span>
                        Se souvenir de moi
                    </label>
                    <a href="#" class="forgot-password">Mot de passe oublié ?</a>
                    </div>
                  
                    <BaseButton
                      type="submit"
                      variant="primary"
                      size="md"
                      :loading="isLoading"
                      full-width
                      class="login-button bg-orange text-black p-0"
                      >
                      Se connecter
                    </BaseButton>
                    
                    <div class="divider flex flex-row justify-center">
                        <span class="h-1 border-t border-t-gray-600 w-max mt-3"></span>
                        <span class="bg-white">ou</span>
                        <span class="h-1 border-t border-t-gray-600 w-max mt-3"></span>
                    </div>
                  
                    <div class="social-login flex !flex-row md:!flex-col justify-center items-center">
                      <BaseButton
                          variant="outline"
                          size="sm"
                          rounded
                          @click="loginWithGoogle"
                          class="social-button md:!w-full text-black/85 !border-[1px] !border-gray-500">
                          <div class="flex gap-3 py-[5px] font-normal">
                            <img 
                              src="/assets/icons/google.png"
                              alt="Logo Google" 
                              class="w-6 h-6 object-contain"
                            />
                            <span class="hidden md:inline-flex">Continuer avec Google</span>
                          </div>
                      </BaseButton>
                      
                      <BaseButton
                        variant="outline"
                        size="sm"
                        rounded
                        @click="loginWithFacebook"
                        class="social-button md:!w-full text-black/85 !border-[1px] !border-gray-500">
                        <div class="flex justify-center items-center gap-3 py-[5px] font-normal">
                          <img 
                            src="/assets/icons/facebook.png"
                            alt="Logo facebook" 
                            class="w-6 h-6 object-contain"
                          />
                          <span class="hidden md:inline-flex">Continuer avec Facebook</span>
                        </div>
                      </BaseButton>

                      <BaseButton
                        variant="outline"
                        size="sm"
                        rounded
                        @click="loginWithApple"
                        class="social-button md:!w-full text-black/85 !border-[1px] !border-gray-500">
                        <div class="flex justify-center items-center gap-3 py-[5px] font-normal">
                          <img 
                            src="/assets/icons/logo-apple.png"
                            alt="Logo Apple" 
                            class="w-6 h-6 object-contain"
                          />
                          <span class="hidden md:inline-flex">Continuer avec Apple</span>
                        </div>
                      </BaseButton>
                    </div>
                  <div class="signup-link">
                    <p>Vous découvrez l'application TOEIC ? <router-link to="/register">Inscrivez-vous</router-link></p>
                  </div>
              </form>
          </div>
      </div>
      
      <!-- Success Alert -->
      <BaseAlert
        v-model="showSuccessAlert"
        type="success"
        title="Connexion réussie !"
        message="Vous allez être redirigé vers votre tableau de bord."
        variant="filled"
        :closable="false"
        class="success-alert"
      />
      
      <!-- Signup Modal -->
      <BaseModal v-model="showSignup" title="Créer un compte" size="md">
          <div class="signup-content">
          <BaseInput
              v-model="signupForm.name"
              label="Nom complet"
              placeholder="Votre nom"
              prefix-icon="fas fa-user"
          />
          <BaseInput
              v-model="signupForm.email"
              type="email"
              label="Adresse email"
              placeholder="votre@email.com"
              prefix-icon="fas fa-envelope"
          />
          <BaseInput
              v-model="signupForm.password"
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              prefix-icon="fas fa-lock"
          />
          </div>
          
          <template #footer>
          <BaseButton variant="ghost" @click="showSignup = false">Annuler</BaseButton>
          <BaseButton variant="primary" @click="handleSignup">Créer le compte</BaseButton>
          </template>
      </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { BaseAlert, BaseButton, BaseInput, BaseModal } from '../components/ui';

import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter()
const authStore = useAuthStore()


// ===== DATA =====
const isLoading = ref(false);
const showSuccessAlert = ref(false);
const showSignup = ref(false);

const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false
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
  return loginForm.email && 
         loginForm.password && 
         loginForm.email.includes('@') && 
         loginForm.password.length >= 6;
});

// const loginButtonText = computed(() => {
//   return isLoading.value ? 'Connexion...' : 'Se connecter';
// });

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
  
  if (!loginForm.email) {
    errors.email = 'L\'adresse email est requise';
    return false;
  }
  
  if (!loginForm.email.includes('@')) {
    errors.email = 'Veuillez entrer une adresse email valide';
    return false;
  }
  
  if (!loginForm.password) {
    errors.password = 'Le mot de passe est requis';
    return false;
  }
  
  if (loginForm.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    return false;
  }
  
  return true;
};

const resetForm = () => {
  loginForm.email = '';
  loginForm.password = '';
  loginForm.rememberMe = false;
  errors.email = '';
  errors.password = '';
};

const showNotification = (type: 'success' | 'error', message: string) => {
  // Méthode pour afficher des notifications
  console.log(`${type}: ${message}`);
};

const saveToLocalStorage = () => {
  if (loginForm.rememberMe) {
    localStorage.setItem('rememberedEmail', loginForm.email);
  } else {
    localStorage.removeItem('rememberedEmail');
  }
};

const loadFromLocalStorage = () => {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    loginForm.email = rememberedEmail;
    loginForm.rememberMe = true;
  }
};

// ===== LIFECYCLE & EVENT HANDLERS =====

const handleLogin = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  saveToLocalStorage();
  
  // Simulation d'une requête de connexion

  const result = await authStore.login(loginForm.email, loginForm.password)
  
  if (result.success) {
    isLoading.value = false;
    showSuccessAlert.value = true;
    showNotification('success', 'Connexion réussie !');
    // Masquer l'alerte après 3 secondes
    setTimeout(() => {
      showSuccessAlert.value = false;
      resetForm()
      router.push('/onboarding')
    }, 3000);
  } else {
    // error.value = result.error || 'Erreur de connexion'
    console.log("Erreur de connexion !");
    
  }
};

const loginWithGoogle = () => {
  console.log('Connexion avec Google');
  // Logique future pour Google OAuth
};

const loginWithFacebook = () => {
  console.log('Connexion avec Facebook');
  // Logique future pour Facebook OAuth
};
const loginWithApple = () => {
  console.log('Connexion avec Apple');
  // Logique future pour Apple OAuth
};

const handleSignup = () => {
  console.log('Création de compte:', signupForm);
  showSignup.value = false;
  // Logique future pour la création de compte
};

// const handleForgotPassword = () => {
//   console.log('Mot de passe oublié pour:', loginForm.email);
//   // Logique future pour la récupération de mot de passe
// };

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && isFormValid.value) {
    handleLogin();
  }
};

// ===== WATCHERS =====
// Watchers pour une utilisation future
watch(() => loginForm.email, (newEmail) => {
  // Validation en temps réel de l'email
  if (newEmail && !newEmail.includes('@')) {
    errors.email = 'Format d\'email invalide';
  } else {
    errors.email = '';
  }
});

watch(() => loginForm.password, (newPassword) => {
  // Validation en temps réel du mot de passe
  if (newPassword && newPassword.length < 6) {
    errors.password = 'Minimum 6 caractères requis';
  } else {
    errors.password = '';
  }
});

// ===== LIFECYCLE HOOKS =====
onMounted(() => {
  loadFromLocalStorage();
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -0.5rem 0 0.5rem 0;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6B7280;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #D1D5DB;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
}

.remember-me input[type="checkbox"]:checked + .checkmark {
  background: #3B82F6;
  border-color: #3B82F6;
}

.remember-me input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 2px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.forgot-password {
  color: #3B82F6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
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