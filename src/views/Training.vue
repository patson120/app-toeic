<template>
    <div class="overflow-x-hidden text-black">
        <MainLayout>
            <div class="bg-white w-full rounded-2xl p-8">
                <div>
                    <h1 class="font-semibold text-2xl text-gray-700">TOEIC Training</h1>
                    <p class="text-gray-500">Préparez-vous efficacement au test TOEIC avec nos modules interactifs</p>
                </div>
                <div class="grid grid-cols-2 gap-20">
                    <div class="flex justify-center items-center">
                        <div class="flex space-x-3">
                        <div class="space-y-3 border border-orange/75 rounded-md p-3 min-w-[150px]">
                            <div class="flex justify-between items-start">
                                <PinIcon class="w-6 h-6 text-orange" />
                                <p class="text-xs text-gray-500">+12%</p>
                            </div>
                            <h1 class="text-xl text-orange font-bold text-center">720</h1>
                            <p class="text-xs text-gray-500">Score actuel</p>
                        </div>
                        <div class="space-y-3 border border-blue-400 rounded-md p-3 min-w-[150px]">
                            <div class="flex justify-between items-start">
                                <CircleCheck class="w-6 h-6 text-blue-600" />
                                <p class="text-xs text-gray-500">+0.3%</p>
                            </div>
                            <h1 class="text-xl text-blue-600 font-bold text-center">78</h1>
                            <p class="text-xs text-gray-500">Modules terminés</p>
                        </div>
                        <div class="space-y-3 border border-green-400 rounded-md p-3 min-w-[150px]">
                            <div class="flex justify-between items-start">
                                <Timer class="w-6 h-6 text-green-600" />
                                <p class="text-xs text-gray-500">+12%</p>
                            </div>
                            <h1 class="text-xl text-green-600 font-bold text-center">25h</h1>
                            <p class="text-xs text-gray-500">Temps d'étude</p>
                        </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl space-y-2">
                        <h2 className="font-semibold text-black text-xl">
                            Recommandations
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
                </div>

                <div class="h-full p-5 border border-gray-300 rounded-lg space-y-5">
                    <h1 class="text-lg text-gray-900 font-bold">TOEIC</h1>
                    <div class="grid grid-cols-12 gap-8">
                        <div class="col-span-3 flex flex-col gap-3 border-r-2 border-r-gray-200 pr-5">
                            <div class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md">
                                <Book class="h-6 w-6 text-orange"/>
                                <span class="text-lg text-orange font-semibold">Listening</span>
                            </div>
                            <div class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md">
                                <BookOpen class="h-6 w-6"/>
                                <span class="text-lg text-gray-900 font-semibold">Reading</span>
                            </div>
                            <div class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md">
                                <Mic class="h-6 w-6"/>
                                <span class="text-lg text-gray-900 font-semibold">Speaking</span>
                            </div>
                            <div class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md">
                                <TextCursor class="h-6 w-6"/>
                                <span class="text-lg text-gray-900 font-semibold">Grammar</span>
                            </div>
                            <div class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md">
                                <Brain class="h-6 w-6"/>
                                <span class="text-lg text-gray-900 font-semibold">Vocabulary</span>
                            </div>
                            <div class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md">
                                <BookText class="h-6 w-6"/>
                                <span class="text-lg text-gray-900 font-semibold">Tests Blancs</span>
                            </div>
                            <div class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md">
                                <BookOpen class="h-6 w-6"/>
                                <span class="text-lg text-gray-900 font-semibold">Statistiques</span>
                            </div>
                        </div>
                        <div class="col-span-9">
                            <h1 class="text-gray-600 mb-2">Listening</h1>
                            <div class="grid grid-cols-4 gap-4">
                                <div class="border border-gray-200 space-y-4 p-3 rounded-md">
                                    <div class="flex justify-between space-y-4">
                                        <div class="">
                                            <h2>Part 1</h2>
                                            <p class="text-sm text-gray-400">Photographie</p>
                                        </div>
                                        <Image class="h-5 w-5" />
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex items-center gap-2">
                                            <p class="text-xs">Complete</p>
                                            <div class="w-full h-2 bg-gray-200 rounded-full">
                                                <div class="w-1/2 h-full bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <p class="text-xs">Correct</p>
                                            <div class="w-full h-2 bg-gray-200 rounded-full">
                                                <div class="w-1/2 h-full bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border border-gray-200 space-y-4 p-3 rounded-md">
                                    <div class="flex justify-between space-y-4">
                                        <div class="">
                                            <h2>Part 2</h2>
                                            <p class="text-sm text-gray-400">Photographie</p>
                                        </div>
                                        <Image class="h-5 w-5" />
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex items-center gap-2">
                                            <p class="text-xs">Complete</p>
                                            <div class="w-full h-2 bg-gray-200 rounded-full">
                                                <div class="w-1/2 h-full bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <p class="text-xs">Correct</p>
                                            <div class="w-full h-2 bg-gray-200 rounded-full">
                                                <div class="w-1/2 h-full bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border border-gray-200 space-y-4 p-3 rounded-md">
                                    <div class="flex justify-between space-y-4">
                                        <div class="">
                                            <h2>Part 3</h2>
                                            <p class="text-sm text-gray-400">Photographie</p>
                                        </div>
                                        <Image class="h-5 w-5" />
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex items-center gap-2">
                                            <p class="text-xs">Complete</p>
                                            <div class="w-full h-2 bg-gray-200 rounded-full">
                                                <div class="w-1/2 h-full bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <p class="text-xs">Correct</p>
                                            <div class="w-full h-2 bg-gray-200 rounded-full">
                                                <div class="w-1/2 h-full bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border border-gray-200 space-y-4 p-3 rounded-md">
                                    <div class="flex justify-between space-y-4">
                                        <div class="">
                                            <h2>Part 4</h2>
                                            <p class="text-sm text-gray-400">Photographie</p>
                                        </div>
                                        <Image class="h-5 w-5" />
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex items-center gap-2">
                                            <p class="text-xs">Complete</p>
                                            <div class="w-full h-2 bg-gray-200 rounded-full">
                                                <div class="w-1/2 h-full bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <p class="text-xs">Correct</p>
                                            <div class="w-full h-2 bg-gray-200 rounded-full">
                                                <div class="w-1/2 h-full bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </div>
</template>

<script setup lang="ts">
import { Book, BookOpen, BookText, Brain, ChevronRight, CircleCheck, Image, Mic, PinIcon, Text, TextCursor, Timer } from 'lucide-vue-next';
import MainLayout from '../components/layouts/home/MainLayout.vue';

const recommandationData = [
{
    title: "Focus sur Part 3",
    description: "Conversations longues à améliorer.",
  },
  {
    title: "Excellent en Grammar",
    description: "Score stable au-dessus de 85%.",
  },
  {
    title: "Prêt pour Test Complet",
    description: "Niveau suffisant pour simulation.",
  },
];

</script>