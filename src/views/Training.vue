<template>
    <div class="overflow-x-hidden text-black relative">
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
                    <h1 class="text-gray-900 font-bold">TOEIC</h1>
                    <div class="flex space-x-8">
                        <div class="max-w-[250px] flex flex-col gap-3 border-r-2 border-r-gray-200 pr-5">
                            <div @click="handleSelectType('listening')" class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md cursor-pointer">
                                <Book class="h-6 w-6" :class="getNavLinkClass('listening')"/>
                                <span :class="getNavLinkClass('listening')"
                                class="text-lg font-medium whitespace-nowrap">Listening</span>
                            </div>
                            <div @click="handleSelectType('reading')" class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md cursor-pointer">
                                <BookOpen class="h-6 w-6" :class="getNavLinkClass('reading')"/>
                                <span :class="getNavLinkClass('reading')"
                                class="text-lg text-gray-900 whitespace-nowrap">Reading</span>
                            </div>
                            <div @click="handleSelectType('speaking')" class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md cursor-pointer">
                                <Mic class="h-6 w-6" :class="getNavLinkClass('speaking')"/>
                                <span :class="getNavLinkClass('speaking')" class="text-lg text-gray-900 whitespace-nowrap">Speaking</span>
                            </div>
                            <div @click="handleSelectType('grammar')" class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md cursor-pointer">
                                <TextCursor class="h-6 w-6" :class="getNavLinkClass('grammar')"/>
                                <span :class="getNavLinkClass('grammar')"
                                    class="text-lg text-gray-900 whitespace-nowrap">Grammar</span>
                            </div>
                            <div @click="handleSelectType('vocabulary')" class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md cursor-pointer">
                                <Brain class="h-6 w-6" :class="getNavLinkClass('vocabulary')"/>
                                <span :class="getNavLinkClass('vocabulary')"
                                 class="text-lg text-gray-900 whitespace-nowrap">Vocabulary</span>
                            </div>
                            <div @click="handleSelectType('tests blancs')" class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md cursor-pointer">
                                <BookText class="h-6 w-6" :class="getNavLinkClass('tests blancs')"/>
                                <span :class="getNavLinkClass('tests blancs')"
                                 class="text-lg text-gray-900 whitespace-nowrap">Tests Blancs</span>
                            </div>
                            <div @click="handleSelectType('statistiques')" class="w-full flex justify-start items-center space-x-3 border border-gray-200 p-2 rounded-md cursor-pointer">
                                <BookOpen class="h-6 w-6" :class="getNavLinkClass('statistiques')"/>
                                <span :class="getNavLinkClass('statistiques')"
                                 class="text-lg text-gray-900 whitespace-nowrap">Statistiques</span>
                            </div>
                        </div>
                        <div class="w-full">
                            <h1 class="text-gray-600 mb-2 capitalize">{{ selectedType }}</h1>
                            <div class="grid grid-cols-4 gap-4">
                                <div @click="handleShowModal" class="border border-gray-200 space-y-4 p-3 rounded-md cursor-pointer">
                                    <div class="flex justify-between items-start space-y-4">
                                        <div class="">
                                            <h2>Part 1</h2>
                                            <p class="text-sm text-gray-600">Photographie</p>
                                        </div>
                                        <Image class="h-5 w-5 text-gray-700" />
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
                                <div @click="handleShowModal" class="border border-gray-200 space-y-4 p-3 rounded-md cursor-pointer">
                                    <div class="flex justify-between items-start space-y-4">
                                        <div class="">
                                            <h2>Part 2</h2>
                                            <p class="text-sm text-gray-600">Photographie</p>
                                        </div>
                                        <Image class="h-5 w-5 text-gray-700" />
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
                                <div @click="handleShowModal" class="border border-gray-200 space-y-4 p-3 rounded-md cursor-pointer">
                                    <div class="flex justify-between items-start space-y-4">
                                        <div class="">
                                            <h2>Part 3</h2>
                                            <p class="text-sm text-gray-600">Photographie</p>
                                        </div>
                                        <Image class="h-5 w-5 text-gray-700" />
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
                                <div @click="handleShowModal" class="border border-gray-200 space-y-4 p-3 rounded-md cursor-pointer
                                ">
                                    <div class="flex justify-between items-start space-y-4">
                                        <div class="">
                                            <h2>Part 4</h2>
                                            <p class="text-sm text-gray-600">Photographie</p>
                                        </div>
                                        <Image class="h-5 w-5 text-gray-700" />
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

        <Modal v-model="showExercise">
            <div class="p-8 min-w-md max-w-lg text-gray-800 flex flex-col gap-4">
                <div class="flex">
                    <ChevronLeft @click="showExercise = false" class="h-6 w-6 cursor-pointer"/>
                    <h1 class="flex-1 text-gray-800 font-bold text-center">Part 1 TOEIC</h1>
                    <div class="w-10"></div>
                </div>
                <div class="flex justify-between items-center ">
                    <p class="px-4 py-3 rounded-full border border-gray-300 text-center font-semibold">01/18</p>
                    <div class="flex justify-center items-center gap-2">
                        <Timer class="h-6 w-6"/>
                        <p class="text-center font-semibold">00:30</p>
                    </div>
                </div>
                <div v-if="selectedType=== 'listening'" class="space-y-4">
                    <p class="text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    <div class="flex flex-col gap-3">
                        <h1 class="text-xl font-bold text-gray-800 text-left">Question</h1>
                        <p class="text-gray-700">What's lorem ipsum ?</p>
                        <div class="space-y-3 mb-8">
                            <button @click="currentChoice = 'response1'"
                            :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response1' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 1</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response1' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>
                            <button @click="currentChoice = 'response2'"
                                :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response2' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 2</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response2' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>
                            <button @click="currentChoice = 'response3'"
                                :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response3' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 3</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response3' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>

                            <!-- Actions -->
                            <div class="flex justify-center items-center text-white">
                                <button 
                                    @click="showExercise = false"
                                    class="btn-primary px-6 py-3 inline-flex items-center space-x-2 mt-8">
                                    <span>Valider</span>
                                    <CheckCircle  :size="18" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="selectedType=== 'reading'" class="space-y-4">
                    <p class="text-gray-600">Lorem Ipsum is simply dummy text ________________ printing</p>
                    <div class="flex justify-end items-center gap-3">
                        <p class="underline text-gray-500">Lire la phrase</p>
                        <div class="rounded-full border border-gray-400 p-1">
                            <Volume2 class="h-5 w-5"/>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <h1 class="text-xl font-bold text-gray-800 text-left">Réponse</h1>
                        <div class="mt-7 flex flex-wrap gap-3">
                            <button 
                                @click="currentChoice = 'reponse1'"
                                :class="['py-3 px-4 rounded-lg border text-left text-gray-800 flex justify-between items-center whitespace-nowrap', 
                                    currentChoice === 'reponse1' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                Réponse 1
                            </button>
                            <button 
                                @click="currentChoice = 'reponse2'"
                                :class="['py-3 px-4 rounded-lg border text-left text-gray-800 flex justify-between items-center whitespace-nowrap', 
                                    currentChoice === 'reponse2' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                Réponse 2
                            </button>
                            <button 
                                @click="currentChoice = 'reponse3'"
                                :class="['py-3 px-4 rounded-lg border text-left text-gray-800 flex justify-between items-center whitespace-nowrap', 
                                    currentChoice === 'reponse3' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                Réponse 3
                            </button>
                            <button 
                                @click="currentChoice = 'reponse4'"
                                :class="['py-3 px-4 rounded-lg border text-left text-gray-800 flex justify-between items-center whitespace-nowrap', 
                                    currentChoice === 'reponse4' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                Réponse 4
                            </button>

                        </div>
                        <!-- Actions -->
                        <div class="flex justify-center items-center text-white">
                            <button 
                                @click="showExercise = false"
                                class="btn-primary px-6 py-3 inline-flex items-center space-x-2 mt-8">
                                <span>Valider</span>
                                <CheckCircle  :size="18" />
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="selectedType=== 'speaking'" class="space-y-4">
                    <p class="text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    
                    <div class="flex justify-center items-center">
                        <AudioLines class="h-20 w-full text-gray-300"/>
                    </div>

                    <div class="flex flex-col gap-3">
                        <h1 class="text-xl font-bold text-gray-800 text-left">Réponse</h1>
                        <div class="space-y-3 mb-8">
                            <button @click="currentChoice = 'response1'"
                            :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response1' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 1</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response1' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>
                            <button @click="currentChoice = 'response2'"
                                :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response2' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 2</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response2' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>

                            <!-- Actions -->
                            <div class="flex justify-center items-center text-white">
                                <button 
                                    @click="showExercise = false"
                                    class="btn-primary px-6 py-3 inline-flex items-center space-x-2 mt-8">
                                    <span>Valider</span>
                                    <CheckCircle  :size="18" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="selectedType=== 'grammar'" class="space-y-4">
                    
                    <div className="min-w-[400px] aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.youtube.com/embed/g47jy7tcfdM"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            class="w-full h-64"
                            >
                        </iframe>
                    </div>

                    <div class="flex flex-col gap-3">
                        <h1 class="text-xl font-bold text-gray-800 text-left">Réponse</h1>
                        <div class="space-y-3 mb-8">
                            <button @click="currentChoice = 'response1'"
                            :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response1' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 1</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response1' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>
                            <button @click="currentChoice = 'response3'"
                                :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response3' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 2</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response3' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>
                            <button @click="currentChoice = 'response2'"
                                :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response2' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 2</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response2' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>

                            <!-- Actions -->
                            <div class="flex justify-center items-center text-white">
                                <button 
                                    @click="showExercise = false"
                                    class="btn-primary px-6 py-3 inline-flex items-center space-x-2 mt-8">
                                    <span>Valider</span>
                                    <CheckCircle  :size="18" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="selectedType=== 'vocabulary'" class="space-y-4 ">
                    <div class="h-52 w-full overflow-hidden rounded-2xl">
                        <img class="w-full h-full object-cover" src="/assets/img/image-2.png" alt="" srcset="">
                    </div>
                    <div class="min-w-[400px]">
                        <audio ref="audio" @timeupdate="updateProgress" :src="audioSrc"></audio>
                        <button @click="playAudio">Lire</button>
                        <button @click="pauseAudio">Pause</button>
                        <progress :value="progress" max="100"></progress>
                    </div>

                    <div class="flex flex-col gap-3">
                        <h1 class="text-xl font-bold text-gray-800 text-left">Réponse</h1>
                        <div class="space-y-3 mb-8">
                            <button @click="currentChoice = 'response1'"
                            :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response1' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 1</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response1' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>
                            <button @click="currentChoice = 'response3'"
                                :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response3' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 2</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response3' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>
                            <button @click="currentChoice = 'response2'"
                                :class="['w-full py-3 rounded-lg border text-left text-gray-800 px-4 flex justify-between items-center', 
                                        currentChoice === 'response2' ? 'bg-[#ff551c0e] border border-orange' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                <span>Response 2</span>
                                <span :class="['px-3 h-5 rounded-full border',
                                currentChoice === 'response2' ? 'bg-orange ring-1 ring-orange border-2 border-white' : 'bg-white border-gray-300 hover:bg-gray-100']">
                                </span>
                            </button>

                            <!-- Actions -->
                            <div class="flex justify-center items-center text-white">
                                <button 
                                    @click="showExercise = false"
                                    class="btn-primary px-6 py-3 inline-flex items-center space-x-2 mt-8">
                                    <span>Valider</span>
                                    <CheckCircle  :size="18" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="selectedType=== 'tests blancs'" class="space-y-4 ">
                    <div class="flex flex-col gap-10 text-center min-w-[400px]">
                        <div class="">
                            <h1 class="text-2xl font-bold text-gray-800">Félicitations</h1>
                            <p class="text-gray-500">Tu as achevé ce niveau</p>
                        </div>
                        <div class="h-32 w-full">
                            <img class="w-full h-full object-contain" src="/assets/icons/success-img.png" alt="">
                        </div>
                        <p class=" text-gray-500">Continue de t’améliorer et gagne les points pour délivrer de nouveaux défis.</p>
                        
                        <!-- Actions -->
                        <div class="flex justify-center items-center text-white">
                            <button 
                                @click="showExercise = false"
                                class="btn-primary px-6 py-3 inline-flex items-center space-x-2 mt-8">
                                <span>Valider</span>
                                <CheckCircle  :size="18" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { AudioLines, Book, BookOpen, BookText, Brain, CheckCircle, ChevronLeft, ChevronRight, CircleCheck, Image, Mic, Microwave, PinIcon, SquareRoundCorner, TextCursor, Timer, Volume2, Waves } from 'lucide-vue-next';
import { ref } from 'vue';
import MainLayout from '../components/layouts/home/MainLayout.vue';
import Modal from '../components/ui/Modal.vue';

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

// ======= DATA ========
const showExercise = ref(false)

const currentChoice = ref('')
const selectedType = ref('listening')



// ========== METHODS ===========
const handleShowModal = () => {
    showExercise.value = true
}

const handleSelectType = (type: string) => {
    selectedType.value = type
}

const getNavLinkClass = (path: string) => {
  
  if (path === selectedType.value) {
    return 'text-orange'
  }
  
  return 'text-gray-900'
}


const audioSrc = '/home/patson/Téléchargements/db3ed7d8-de72-4cd5-bbd5-5d61a88f65b9.webm';
const audio = ref<any>(null);
const progress = ref(0);

const playAudio = () => {
  audio.value.play();
};

const pauseAudio = () => {
  audio.value.pause();
};

const updateProgress = () => {
  progress.value = (audio.value.currentTime / audio.value.duration) * 100;
};

</script>