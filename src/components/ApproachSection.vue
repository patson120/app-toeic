<template>
  <div class="bg-white">
    <section className="w-full py-20 max-width ">
      <div className="flex mb-5 justify-between gap-6">
        <h1 className="lg:w-1/2 font-bold text-black text-2xl md:text-4xl">
          Une approche d'étude simple pour progresser facilement
        </h1>
        <div className="hidden lg:flex justify-end items-center text-black gap-3">
          <div className="px-7 py-3 rounded-xl border border-black font-bold text-sm">
            Suivez-nous sur nos réseaux
          </div>
          <div className="border border-black text-white px-3 py-[10px] rounded-full font-extrabold text-sm h-auto">
            <FacebookIcon :size="22" class="text-black" />
          </div>
          <div className="border border-black text-white px-3 py-[10px] rounded-full font-extrabold text-sm h-auto">
            <LinkedinIcon :size="22" class="text-black" />
          </div>
        </div>
      </div>
      <div className="flex flex-row overflow-x-scroll lg:overflow-x-hidden xl:grid-cols-4 gap-6 pb-6 [&::-webkit-scrollbar]:h-0">
        <div v-for="(card, index) in approachCards" :key="index"
            :class="[ card.id === 3 ? 'rounded-[44px]' : '', card.backgroundClass]"
            class="flex-1 shrink-0 xl:h-[354px] min-w-[280px] xl:w-full rounded-[34px] pb-5 xl:pb-0 border-0">
            <div className="p-0 h-full relative">
              <div :class="card.iconBackgroundClass"
                class="w-[103px] h-[100px] mt-5 ml-5 rounded-3xl flex justify-center items-center">
                <img v-if="card.hasImage"
                  className="w-14 h-[54px] object-contain"
                  alt="Image"
                  :src="card.imageSrc"
                />
                <div v-else className="w-14 h-[54px] bg-[#c4c4c4]"></div>
              </div>

              <div className="flex flex-col gap-4 mt:mt-5 sm:mt-8 md:mt-10 lg:mt-[20px] xl:mt-[85px] mx-5">
                <h3 className="font-bold text-[#202020] text-xl">
                  {{card.title}}
                </h3>
                <p className="text-black">
                  {{card.description}}
                </p>
              </div>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

  import { FacebookIcon, LinkedinIcon } from "lucide-vue-next";
  const approachCards = [
      {
        id: 1,
        title: "Entraînement TOEIC complet",
        description:
          "Tests blancs, Listening, Reading, Vocabulary et Speaking drills pour améliorer votre score rapidement.",
        backgroundClass:
          "bg-[linear-gradient(180deg,rgba(26,79,207,0.3)_0%,rgba(3,198,62,0.3)_100%)]",
        iconBackgroundClass:
          "bg-[linear-gradient(180deg,rgba(26,79,207,0.3)_0%,rgba(3,198,62,0.3)_100%)]",
        hasImage: false,
      },
      {
        id: 2,
        title: "Career Boost (coaching RH)",
        description:
          "Mock interviews IA, feedback vocal et coaching humain pour réussir vos entretiens en anglais",
        backgroundClass: "bg-[#fff2beed]",
        iconBackgroundClass: "bg-[#d9e9d9]",
        hasImage: false,
      },
      {
        id: 3,
        title: "Assistant RH intelligent",
        description:
          "Générateur de pitch & CV, suggestions personnalisées et actions adaptées à vos faiblesses TOEIC.",
        backgroundClass: "bg-[#f4f0fd]",
        iconBackgroundClass: "bg-[#e9e2fa]",
        hasImage: true,
        imageSrc: "/assets/icons/icon-1.png",
      },
  ];
</script>