<template>
    <section class="bg-[#F9F8F8]">
        <div class="max-width py-20 grid grid-cols-7 gap-8">
            <div class="col-span-full md:col-span-2 flex flex-col gap-6">
                <img
                    class="w-full h-full object-cover" 
                    src="/assets/img/groupe-1.png" 
                    alt=""
                />
                <div class="bg-gray-200 h-32 rounded-[32px]"></div>
            </div>
            <div class="col-span-full md:col-span-3 bg-white rounded-[44px]">
                <div className="p-10 h-full flex flex-col">
                    <div className="flex flex-col gap-4 mb-8">
                        <h2 className="w-full [font-family:'Manrope',Helvetica] font-extrabold text-black text-[34px] tracking-[0] leading-[normal]">
                        Fonctionnalités
                        </h2>
                        <p className="w-full [font-family:'Poppins',Helvetica] font-normal text-[#454545] text-base text-justify tracking-[0] leading-[normal]">
                        Notre méthode combine l&#39;apprentissage académique du TOEIC
                        avec la mise en pratique professionnelle.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 mb-8">
                        <div v-for="(feature, index) in featureCards" :key="index"
                            className="w-full md:h-[100px] bg-white rounded-3xl border border-solid border-neutral-200">
                            <div className="p-5 h-full flex flex-col justify-center">
                            <div className="flex flex-col gap-3">
                                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-[#202020] text-sm text-justify tracking-[0] leading-[normal]">
                                {{ feature.title }}
                                </h3>
                                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#454545] text-base text-justify tracking-[0] leading-[normal]">
                                {{ feature.description }}
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="text-black flex justify-center items-center gap-3">
                        <div className="px-7 py-3 rounded-xl border border-black font-extrabold text-sm">
                            rejoindre le file d'attente
                        </div>
                        <div className="border border-black text-white px-3 py-[10px] rounded-full font-extrabold text-sm h-auto">
                            <FacebookIcon :size="22" class="text-black" />
                        </div>
                        <div className="border border-black text-white px-3 py-[10px] rounded-full font-extrabold text-sm h-auto">
                            <LinkedinIcon :size="22" class="text-black" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-full md:col-span-2 flex flex-col gap-6">
                <img
                    class="w-full h-[320px] rounded-[44px] object-cover" 
                    src="/assets/img/groupe-2.png" 
                    alt=""
                />
                <div class="bg-white h-[280px] rounded-[32px]"></div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { LinkedinIcon, FacebookIcon } from "lucide-vue-next";

    const featureCards = [
    {
        title: "TOEIC Training",
        description:
        "Application conviviale qui simplifie l'apprentissage même pour les plus petits.",
    },
    {
        title: "Career Boost RH.",
        description: "T",
    },
    ];
</script>