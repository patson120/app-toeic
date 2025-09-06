<template>
    <div class="overflow-x-hidden text-black">
        <MainLayout>
            <div class="bg-white w-full rounded-2xl p-8">
                <div>
                    <h1 class="font-semibold text-2xl text-gray-700">Career Boost RH</h1>
                    <p class="text-gray-500">Préparez-vous aux entretiens et boostez votre carrière internationale</p>
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <div class="flex justify-center items-center">
                        <div class="flex space-x-3">
                        <div class="space-y-3 border border-orange/75 rounded-md p-3 min-w-[150px]">
                            <div class="flex justify-between items-start">
                                <Stars class="w-6 h-6 text-orange" />
                                <p class="text-xs text-gray-500">+12%</p>
                            </div>
                            <h1 class="text-xl text-orange font-bold text-center">78%</h1>
                            <p class="text-xs text-gray-500">Career Readiness</p>
                        </div>
                        <div class="space-y-3 border border-blue-400 rounded-md p-3 min-w-[150px]">
                            <div class="flex justify-between items-start">
                                <UserStar class="w-6 h-6 text-blue-600" />
                                <p class="text-xs text-gray-500">+0.3%</p>
                            </div>
                            <h1 class="text-xl text-blue-600 font-bold text-center">4.2/5</h1>
                            <p class="text-xs text-gray-500">Avg. Interview Score</p>
                        </div>
                        <div class="space-y-3 border border-green-400 rounded-md p-3 min-w-[150px]">
                            <div class="flex justify-between items-start">
                                <VideoIcon class="w-6 h-6 text-green-600" />
                                <p class="text-xs text-gray-500">+12%</p>
                            </div>
                            <h1 class="text-xl text-green-600 font-bold text-center">78%</h1>
                            <p class="text-xs text-gray-500">Career Readiness</p>
                        </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl space-y-2">
                        <h2 className="font-semibold text-black text-xl">
                            Actions Recommandées
                        </h2>
                        <div className="space-y-3">
                        <div v-for="(action, index) in recommandationData" :key="index"
                            className="flex items-center gap-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="flex-1">
                                <h2 className="font-medium text-[#202020] ">
                                {{action.title}}
                                </h2>
                                <p className="font-normal text-[#454545] text-xs">
                                {{action.description}}
                                </p>
                            </div>
                            <ChevronRight class="h-4 w-4 text-gray-500"/>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl space-y-2">
                        <h2 className="font-semibold text-black text-xl">
                            Activité Récente
                        </h2>
                        <div className="space-y-3">
                        <div v-for="(action, index) in recentsData" :key="index"
                            className="flex items-center gap-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="flex-1">
                                <h2 className="font-medium text-[#202020] ">
                                {{action.title}}
                                </h2>
                                <p className="font-normal text-[#454545] text-xs">
                                {{action.description}}
                                </p>
                            </div>
                            <ChevronRight class="h-4 w-4 text-gray-500"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-full p-5 border border-gray-300 rounded-lg space-y-5">
                    <div class="space-y-2">
                        <h2 class="font-medium text-gray-700 text-2xl">Formations</h2>
                        <form @keypress="handleKeyPress" @submit.prevent="handleSubmit" class="login-form">
                            <BaseInput
                                v-model="searchText"
                                type="text"
                                placeholder="Rechercher..."
                                clearable
                                class="w-fit"
                            />
                        </form>
                    </div>

                    <div class="space-y-4">
                        <div class="flex justify-between gap-10 items-center">
                            <div class="flex gap-5 ">
                                <div class="w-36 h-28">
                                    <img class="w-full h-full" src="/assets/img/image-2.png" alt=""/>
                                </div>
                                <div class="space-y-2">
                                    <h1 class="text-gray-600 font-semibold text-lg">Réalisez un bilan de compétences pour un bénéficiaire</h1>
                                    <p class="text-gray-600">Réalisez le bilan de compétences d'un bénéficiaire, en analysant précisément son expérience passée, ses compétences et motivations.</p>
                                    <div class="flex gap-3">
                                        <div class="flex gap-2 justify-center items-center">
                                            <ListCheck class="w-6 h-6 text-gray-700" />
                                            <p class="text-gray-700">Facile</p>
                                        </div>
                                        <div class="flex gap-2 justify-center items-center">
                                            <Timer class="w-6 h-6 text-gray-700" />
                                            <p class="text-gray-700">8 heures</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <BaseButton
                                type="button"
                                variant="outline"
                                size="md"
                                @click="handleSelect"
                                class="h-fit w-fit !border !border-orange text-black">
                                Commencer
                            </BaseButton>
                        </div>
                        <div class="flex justify-between gap-10 items-center">
                            <div class="flex gap-5 ">
                                <div class="w-36 h-28">
                                    <img class="w-full h-full" src="/assets/img/groupe-2.png" alt=""/>
                                </div>
                                <div class="space-y-2">
                                    <h1 class="text-gray-600 font-semibold text-lg">Réalisez un bilan de compétences pour un bénéficiaire</h1>
                                    <p class="text-gray-600">Réalisez le bilan de compétences d'un bénéficiaire, en analysant précisément son expérience passée, ses compétences et motivations.</p>
                                    <div class="flex gap-3">
                                        <div class="flex gap-2 justify-center items-center">
                                            <ListCheck class="w-6 h-6 text-gray-700" />
                                            <p class="text-gray-700">Facile</p>
                                        </div>
                                        <div class="flex gap-2 justify-center items-center">
                                            <Timer class="w-6 h-6 text-gray-700" />
                                            <p class="text-gray-700">8 heures</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <BaseButton
                                type="button"
                                variant="outline"
                                size="md"
                                @click="handleSelect"
                                class="h-fit w-fit !border !border-orange text-black">
                                Commencer
                            </BaseButton>
                        </div>
                        <div class="flex justify-between gap-10 items-center">
                            <div class="flex gap-5 ">
                                <div class="w-36 h-28">
                                    <img class="w-full h-full" src="/assets/img/image-2.png" alt=""/>
                                </div>
                                <div class="space-y-2">
                                    <h1 class="text-gray-600 font-semibold text-lg">Réalisez un bilan de compétences pour un bénéficiaire</h1>
                                    <p class="text-gray-600">Réalisez le bilan de compétences d'un bénéficiaire, en analysant précisément son expérience passée, ses compétences et motivations.</p>
                                    <div class="flex gap-3">
                                        <div class="flex gap-2 justify-center items-center">
                                            <ListCheck class="w-6 h-6 text-gray-700" />
                                            <p class="text-gray-700">Facile</p>
                                        </div>
                                        <div class="flex gap-2 justify-center items-center">
                                            <Timer class="w-6 h-6 text-gray-700" />
                                            <p class="text-gray-700">8 heures</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <BaseButton
                                type="button"
                                variant="outline"
                                size="md"
                                @click="handleSelect"
                                class="h-fit w-fit !border !border-orange text-black">
                                Commencer
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </div>
</template>

<script setup lang="ts">
import { ChevronRight, ListCheck, Stars, Timer, UserStar, VideoIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import MainLayout from '../components/layouts/home/MainLayout.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import BaseInput from '../components/ui/BaseInput.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const recommandationData = [
  {
    title: "Coaching Humain",
    description: "Réservez une session avec un coach RH certifié",
  },
  {
    title: "Pratiquez les questions STAR",
    description: "Structurez mieux vos réponses comportementales",
  },
  {
    title: "Demander un accompagnement",
    description: "Demander un accompagnement personnalisé avec un coach.",
  },
];

const recentsData = [
  {
    title: "Mock Interview Finance",
    description: "Hier, 14:30",
  },
  {
    title: "CV Review Tech",
    description: "2 jours",
  },
  {
    title: "CV Review Tech",
    description: "2 jours",
  },
];


// ===== DATA ======
const searchText = ref("")

// ===== METHODS ======
const handleSubmit = () => {
  
};
const handleSelect = () => {
    router.push("/training/formation toeic")
}


// ===== LIFECYCLE & EVENT HANDLERS =====

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && searchText) {
    // Do something
  }
};

</script>