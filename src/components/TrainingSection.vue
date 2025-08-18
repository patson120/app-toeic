<template>
    <section class="bg-white py-20">
        <div class="max-width grid grid-cols-5 gap-12 h-full">
            <div class="col-span-3 h-[520px] w-full bg-[#ebf4eb] rounded-[44px] flex flex-col justify-between pt-20 pb-10">
                <h1 className="font-extrabold text-black text-4xl px-10">
                    TOEIC Training
                </h1>
                <Carousel />
            </div>
            <div class="col-span-2 h-[520px] w-full  bg-[#f4f0fd] rounded-[44px] pt-20 pb-10">
                <h1 className="font-extrabold text-black text-4xl px-10">
                    Career Boost
                </h1>
            </div>
            <div class="col-span-2 h-[520px] w-full bg-[#fff5eb] rounded-[44px]  overflow-hidden">
                <img 
                    class="w-full h-full object-contain"
                    src="/assets/img/phone-1.png" 
                    alt="" 
                />
            </div>
            <div class="col-span-3 h-[520px] w-full bg-[#ebf4eb] rounded-[44px] flex flex-col justify-between pt-20 pb-10">
                <h1 className="font-extrabold text-black text-4xl px-10">
                    Des petits jeux pour apprendre encore plus vite.
                </h1>
                <Carousel />
            </div>
            <div class="col-span-3 h-[520px] w-full bg-[#ebf4eb] rounded-[44px] px-10 pt-20">
                <h1 className="font-extrabold text-black text-4xl">
                    Tout pour vous permettre d'apprécier votre évolution.
                </h1>
            </div>
            <div class="col-span-2 h-[520px] w-full bg-[#fff5eb] rounded-[44px] overflow-hidden">
                <img 
                    class="w-full h-full object-contain"
                    src="/assets/img/rectangle-8.png" 
                    alt="" 
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Carousel from './sliders/Carousel.vue';


  
</script>