<template>
  <main className="flex-1 max-h-[80vh] overflow-y-scroll [&::-webkit-scrollbar]:w-0  w-full space-y-6">
    <div class="grid grid-cols-12 p-8 gap-5 bg-white rounded-2xl">
      <div className="col-span-8">
        <div class="flex items-center mb-2 gap-4">
          <div class="shrink-0 w-20 h-20">
            <img class="w-full h-full rounded-full object-contain" src="/logo.png" alt="Avatar"/>
          </div>
          <div>
            <h1 class="text-2xl text-black mb-1">Bonjour, <span class="font-bold">John!</span> 👋</h1>
            <p class="text-sm text-gray-500">Voici les dernières nouvelles de votre apprentissage</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div className="w-full p-5 rounded-md border border-gray-200 relative">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-10 h-10 bg-[#1a4fcf54] rounded-[5px] flex items-center justify-center">
                <User2 class="w-6 h-6 text-[#1a50cf8f]" />
              </div>
              <h3 class="font-medium text-black">Career Readiness</h3>
            </div>
            <p className="font-bold text-black text-3xl">78%</p>
            <p className="text-black text-sm absolute top-4 right-5">+12%</p>
          </div>
          <div className="w-full p-5 rounded-md border-[0.5px] border-gray-200 relative">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-10 h-10 bg-[#ff551c42] rounded-[5px] flex items-center justify-center">
                <Lightbulb class="w-6 h-6 text-[#ff551c9a]" />
              </div>
              <h3 class="font-medium text-black">TOEIC Progress</h3>
            </div>
            <p className="font-bold text-black text-4xl">720</p>
            <p className="text-black text-sm absolute top-4 right-5">+60%</p>
          </div>
        </div>
      </div>
      <div className="col-span-4 space-y-8 border-l-2 p-8 pr-0 border-gray-100">
        <h2 class="font-bold text-black text-xl">Prochaine session</h2>
        <div class="space-y-1">
          <p class="text-gray-700">Mock Interview - Finance Sector</p>
          <p class="text-sm text-gray-500">Demain, 14:30 • Coach Emma</p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-7 flex flex-col gap-3 p-8 bg-white rounded-2xl">
        <h3 className="font-medium text-black text-xl">
          Recommandations
        </h3>
        <RecommendationsSection />
      </div>

      <div className="col-span-5 p-8 bg-white rounded-2xl">
        <h2 className="font-medium text-black text-xl">
          Actions rapides
        </h2>
        <div className="space-y-4 mt-3">
          <div v-for="(action, index) in quickActionsData" :key="index"
              className="flex items-center gap-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-[42px] h-[42px] bg-[#ebebeb] rounded-[10px] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="font-semibold text-[#202020] ">
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
  </main>
</template>

<script setup lang="ts">
import { ChevronRight, Lightbulb, User2 } from 'lucide-vue-next';
import RecommendationsSection from './RecommendationsSection.vue';

const quickActionsData = [
  {
    title: "Test blanc TOEIC",
    description: "Simulation complète en conditions réelles",
  },
  {
    title: "Speaking drill",
    description: "Entraînement oral express (10 min)",
  },
  {
    title: "Générer un pitch",
    description: "Créer votre présentation personnelle",
  },
];

</script>