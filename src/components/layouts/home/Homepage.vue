<template>
    <div class="min-h-screen w-screen bg-[#F8F8F8] space-y-10 overflow-hidden">
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
                <MainSection />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Menu, User } from 'lucide-vue-next';
import SideMenuSection from './SideMenuSection.vue';
import MainSection from './MainSection.vue';


</script>