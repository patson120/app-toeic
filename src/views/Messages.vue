<template>
    <div class="overflow-x-hidden text-black relative">
        <MainLayout>
            <div class="w-full min-h-full p-8 space-y-4 relative">
                <p class="text-gray-500">Messages</p>
                <div class="grid grid-cols-12 gap-8 relative">
                    <div class="col-span-3 space-y-5">
                        <div class="px-3 space-y-5">
                            <div @click="handleSelectMsg(message)" v-for="(message, index) in messages" :key="index"
                                class="flex gap-3 items-center border-b border-gray-200 pb-3 cursor-pointer">
                                <div class="h-10 w-10 shadow rounded-full overflow-hidden">
                                    <img class="w-full h-full object-cover" 
                                        :src="message.image" 
                                        :alt="'Utilisateur ' + message.name"
                                    />
                                </div>
                                <div class="">
                                    <h3 class="text-gray-900 font-semibold">{{ message.name }}</h3>
                                    <p class="text-sm text-gray-500 line-clamp-1 text-ellipsis">{{ message.lastMsg }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-9 space-y-4">
                        <div class="bg-[#EEEEEE4D] p-4 flex justify-end items-center">
                            <div class="flex gap-3 items-center">
                                <h3 class="text-gray-900 font-semibold">{{ selectedMsg?.name }}</h3>
                                <div class="h-10 w-10 rounded-full overflow-hidden">
                                    <img class="w-full h-full object-cover" 
                                        :src="selectedMsg?.image" 
                                        :alt="'Utilisateur ' + selectedMsg?.name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="h-[62vh] overflow-y-scroll [&::-webkit-scrollbar]:w-0 w-full border border-gray-200 rounded-md">
                            <ChatInterface />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChatInterface from '../components/chat/ChatInterface.vue';
import MainLayout from '../components/layouts/home/MainLayout.vue';

// ======= DATA ========
const selectedMsg = ref<any>(null)
const messages = ref([
    {
        id: 1,
        name: "Claude KUATE",
        lastMsg: "Bonjour, comment tu vas ?",
        image: "/assets/img/formation-1.png"
    },
    {
        id: 2,
        name: "Patson",
        lastMsg: "Bonjour, comment tu vas ?",
        image: "/assets/img/formation-1.png"
    },
    {
        id: 3,
        name: "Dimitric",
        lastMsg: "Bonjour, comment tu vas ?",
        image: "/assets/img/formation-1.png"
    },
    {
        id: 4,
        name: "Mme Yao",
        lastMsg: "Bonjour, comment tu vas ?",
        image: "/assets/img/formation-1.png"
    }
])

// ========== METHODS ===========
const handleSelectMsg = (message: any) => {
    selectedMsg.value = message
}

// ====== MOUNTED ======
onMounted(() => {
    // set default selected message
    selectedMsg.value = messages.value[0]
})

</script>