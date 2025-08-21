<template>
    <section class="bg-white pt-10">
        <div className="w-full relative max-width md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
            <div className="gap-10 relative inline-flex flex-col items-start">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                    <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto]">
                        <h1 className="relative mt-[-1.00px] font-extrabold text-black text-4xl md:text-6xl leading-[42px] md:leading-[60px]">
                            Maîtrisez l&apos;anglais. Boostez votre carrière.
                        </h1>
                        <p className="md:w-[486px] text-black">
                            Entraînements TOEIC intensifs, simulations d&apos;entretien RH et
                            coaching IA pour passer l&apos;examen et réussir vos entretiens
                            professionnels.
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-center md:justify-start gap-6">
                    <button className="w-full sm:w-min px-10 h-[50px] bg-[#ff551c] hover:bg-[#e64a19] rounded-xl font-semibold text-white text-base whitespace-nowrap">
                        Commencer l&apos;essai
                    </button>
                    <button className="hidden md:block px-4 md:px-8 h-[50px] bg-white rounded-xl border-[3px] border-solid border-[#1a4fcf] hover:bg-gray-50 font-semibold text-[#1a4fcf] text-center whitespace-nowrap">
                        Voir la démo
                    </button>
                </div>
                <div className="flex gap-4 md:mt-5">
                    <div className="inline-flex items-start">
                        <div v-for="(item, index) in avatarData" :key="index" 
                            :class="{'-ml-5': index > 0 }"
                            class="w-[45px] h-[45px] overflow-hidden rounded-full border-2 border-green-100">
                            <img
                                :src="item.src"
                                :alt="item.alt"
                                className="object-cover -mt-[7px]"
                            />
                        </div>  
                    </div>

                    <div className="flex flex-col items-start gap-2 md:gap-1.5">
                        <div className="relative w-fit mt-[-1.00px] font-normal text-black text-xs whitespace-nowrap">
                            Rejoignez
                        </div>
                        <div className="font-semibold text-black text-xs md:text-sm">
                            +120 apprenants · Partenaires : entreprises / écoles
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-full flex justify-center md:justify-end items-center ">
                <div className="w-full md:w-2/3">
                    <img
                        className="w-full h-full object-fill -mt-[90px]"
                        alt="Hero English For Real"
                        src="/assets/img/hero-img.png"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const avatarData = [
  {
    src: "/assets/img/hero-img.png",
    alt: "User avatar 1",
    className: "ml-[-2.00px]",
  },
  {
    src: "/assets/img/hero-img.png",
    alt: "User avatar 2",
    className: "-ml-4",
  },
  {
    src: "/assets/img/hero-img.png",
    alt: "User avatar 3",
    className: "-ml-4",
  },
  {
    src: "/assets/img/hero-img.png",
    alt: "User avatar 4",
    className: "mr-[-2.00px] -ml-4",
  },
];
</script>