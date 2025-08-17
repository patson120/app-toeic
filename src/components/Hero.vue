<template>
    <section class="bg-white pt-10">
        <div className="w-full relative max-width py-20 grid grid-cols-2 ">
            <div className="gap-10 relative inline-flex flex-col items-start">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto]">
                    <h1 className="relative mt-[-1.00px] font-extrabold text-black text-6xl tracking-[0] leading-[56px]">
                        Maîtrisez l&apos;anglais. Boostez votre carrière.
                    </h1>

                    <p className="relative w-[486px] [font-family:'Poppins',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal]">
                        Entraînements TOEIC intensifs, simulations d&apos;entretien RH et
                        coaching IA pour passer l&apos;examen et réussir vos entretiens
                        professionnels.
                    </p>
                </div>
                </div>

                <div className="relative w-[461px] h-[50px]">
                    <div className="absolute w-[242px] h-[50px] top-0 left-0">
                        <Button className="w-60 h-[50px] bg-[#ff551c] hover:bg-[#e64a19] rounded-xl [font-family:'Poppins',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal]">
                        Commencer l&apos;essai
                        </Button>
                    </div>

                    <div className="absolute w-[191px] h-[50px] top-0 left-[272px]">
                        <button
                            className="relative w-[189px] h-[50px] bg-white rounded-xl border-[3px] border-solid border-[#1a4fcf] hover:bg-gray-50 [font-family:'Poppins',Helvetica] font-semibold text-[#1a4fcf] text-base text-center tracking-[0] leading-[normal]">
                            Voir la démo
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 mt-5">
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

                    <div className="inline-flex flex-col items-start gap-1.5">
                        <div className="relative w-fit mt-[-1.00px] font-normal text-black text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                        Rejoignez
                        </div>

                        <div className="relative w-fit font-semibold text-black text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                        +120 apprenants · Partenaires : entreprises / écoles
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full flex justify-end items-center">
                <div className="w-2/3">
                    <img
                        className="w-full h-full object-cover -mt-[90px]"
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