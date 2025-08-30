<template>
    <div class="min-h-screen w-screen bg-[#F8F8F8] space-y-10">
        <header className="fixed top-0 w-full py-2 bg-white">
            <div className="flex items-center justify-between max-width">
                <div className="flex items-center shrink-0">
                    <router-link to="/">
                        <img
                            className="w-[45px] h-[45px] md:w-[70px] md:h-[70px] object-contain"
                            alt="Logo English For Real"
                            src="/logo.png"
                        />
                    </router-link>
                </div>
                <div className="">
                    <button
                        className="px-4 py-2 border border-gray-200 rounded-full hover:border-[#ff7a59] transition-all duration-200">
                        <div class="flex items-center gap-3">
                            <div>
                               <Menu class="h-6 w-6 text-gray-600"/>   
                            </div>
                            <div class="rounded-full">
                                <User class="h-6 w-6 text-gray-400"/>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </header>
        <div class="h-[50px]"></div>

        <div class="max-width bg-transparent">
            <div class="w-full flex flex-row gap-10">
                <SideMenuSection />
                <div class="space-y-10 w-full">
                    <div class="h-96 bg-white rounded-2xl mb-10"></div>
                    <div class="h-96 bg-white rounded-2xl"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Menu, User } from 'lucide-vue-next';
import SideMenuSection from './SideMenuSection.vue';


/* const statsData = [
  {
    title: "Career Readiness",
    value: "78%",
    change: "+12%",
    icon: "/lawyer.png",
    bgColor: "bg-[#1a4fcf54]",
  },
  {
    title: "TOEIC Progress",
    value: "720",
    change: "+60%",
    icon: "/sun.png",
    bgColor: "bg-[#ff551c42]",
  },
];

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
 */

</script>