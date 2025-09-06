<template>
    <div class="overflow-x-hidden text-black relative">
        <MainLayout>
            <div class="bg-white w-full rounded-2xl p-8 space-y-4 relative">
                <div>
                    <h1 class="font-semibold text-2xl text-gray-700">Réalisez un bilan de compétences pour un bénéficiaire</h1>
                    <p class="text-gray-500 w-3/4">Réalisez le bilan de compétences d'un bénéficiaire, en analysant précisément son expérience passée, ses compétences et motivations.</p>
                </div>
                <div class="grid grid-cols-12 gap-8 relative">
                    <div class="col-span-8 clear-start space-y-4">
                        <div class="w-full h-auto">
                            <img class="w-full h-full object-cover" src="/assets/img/formation-1.png" alt=""/>
                        </div>
                        <h4 class="font-medium">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h4>
                        <p class="text-gray-700">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of 
                            classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, 
                            a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure 
                            Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
                             word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from 
                             sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) 
                             by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular 
                             during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", 
                             comes from a line in section 1.10.32.
                        </p>
                        <div class="flex justify-end items-center">
                            <BaseButton
                                type="button"
                                variant="outline"
                                size="md"
                                @click=""
                                class="h-fit w-fit !border !border-orange text-black">
                                Chapitre suivant
                            </BaseButton>
                        </div>
                    </div>
                    <div class="col-span-4 border-l border-l-gray-200 space-y-5 sticky">
                        <div class="bg-gray-200 py-2 px-3">
                            <h3 class="font-semibold">Chapitres(05)</h3>
                        </div>
                        <div class="px-3 space-y-3">
                            <h5 class="font-medium text-orange cursor-pointer">Chapitre 1: Where does it come from?</h5>
                            <h5 class="font-medium text-gray-700 cursor-pointer">Chapitre 2: Where does it come from?</h5>
                            <h5 class="font-medium text-gray-700 cursor-pointer">Chapitre 3: Where does it come from?</h5>
                            <h5 class="font-medium text-gray-700 cursor-pointer">Chapitre 4: Where does it come from?</h5>
                            <h5 class="font-medium text-gray-700 cursor-pointer">Chapitre 5: Where does it come from?</h5>
                            <h5 class="font-medium text-gray-700 cursor-pointer">Quiz</h5>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '../components/layouts/home/MainLayout.vue';
import BaseButton from '../components/ui/BaseButton.vue';

const route = useRoute()

// ======= DATA ========
const trainingId = ref('')

// ========== METHODS ===========


// ====== MOUNTED ======
onMounted(() => {
    const id = route.params.trainingId as string
    trainingId.value = id
})

</script>