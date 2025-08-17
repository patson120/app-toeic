<template>
  <div class="bg-white">
    <section className="w-full py-20 max-width ">
      <div className="flex mb-5 justify-between gap-6">
        <h1 className="w-1/2 font-bold text-black text-4xl">
          Une approche d'étude simple pour progresser facilement
        </h1>

        <div className="text-black flex justify-end items-center gap-3">
          <div className="px-7 py-3 rounded-xl border border-black font-extrabold text-sm">
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
      <div className="grid grid-cols-3 gap-6">
        <div
            v-for="(card, index) in approachCards" :key="index"
            :class="[ card.id === 3 ? 'rounded-[44px]' : '',  card.backgroundClass]"
            class="flex-1 h-[354px] rounded-[34px] border-0 ${card.backgroundClass}">
            <div className="p-0 h-full relative">
                <div :class="card.iconBackgroundClass"
                    class="w-[103px] h-[100px] mt-5 ml-[21px] rounded-3xl flex justify-center items-center">
                    <img v-if="card.hasImage"
                      className="w-14 h-[54px] object-contain"
                      alt="Image"
                      :src="card.imageSrc"
                    />
                    <div v-else className="w-14 h-[54px] bg-[#c4c4c4]"></div>
                </div>

              <div className="flex flex-col gap-4 mt-[85px] ml-[21px] mr-[21px]">
                <h3 className="w-full font-bold text-[#202020] text-xl">
                  {{card.title}}
                </h3>

                <p className="w-full text-black text-base">
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