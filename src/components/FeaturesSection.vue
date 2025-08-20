<template>
    <div class="bg-white border border-white">
        <section className="max-width my-10 sm:my-20 md:my-40">
            <div className="w-fit font-semibold text-black text-4xl mb-4">
                Des résultats qui parlent
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
                <div v-for="(feature, index) in featuresData" :key="index"
                    :class="feature.backgroundColor + ' rounded-[34px] border-0 md:h-[280px]'">
                    <div className="p-5 pt-[52px] h-full">
                        <div className="flex flex-col gap-[34px] h-full">
                            <div className="flex flex-col gap-4">
                                <h3 className="font-semibold text-black text-2xl">
                                    {{feature.title}}
                                </h3>
                                <p className="md:w-[544px] text-black">{{feature.description}}</p>
                            </div>
                            <button
                                :class="feature.buttonStyle + ' md:w-[214px] h-[50px] rounded-xl font-bold md:text-lg'">
                                {{feature.buttonText}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
   const featuresData = [
        {
            id: 1,
            title: "Préparation TOEIC complète",
            description: "Entraînement adaptatif sur toutes les sections : Listening, Reading, Speaking, Writing. Tests blancs et feedback personnalisé.",
            backgroundColor: "bg-[#fff5eb]",
            buttonStyle: "bg-[#ff551c] text-white",
            buttonText: "Commencer l'essai",
        },
        {
            id: 2,
            title: "Coaching humain expert",
            description: "Accédez à nos coachs RH certifiés pour des sessions personnalisées et des conseils carrière sur mesure.",
            backgroundColor: "bg-[#ebf4eb]",
            buttonStyle: "bg-white border-2 border-[#1a4fcf] text-[#1a4fcf]",
            buttonText: "Commencer l'essai",
        },
    ];
</script>