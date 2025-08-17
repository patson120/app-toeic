<template>
    <section class="bg-white py-20">
        <div class="max-width grid grid-cols-5 gap-12 h-full">
            <div class="col-span-3 h-[610px] w-full bg-[#ebf4eb] rounded-[44px] px-10 pt-20">
                <h1 className="font-extrabold text-black text-4xl">
                    TOEIC Training
                </h1>
            </div>
            <div class="col-span-2 h-[610px] w-full  bg-[#f4f0fd] rounded-[44px] px-10 pt-20">
                <h1 className="font-extrabold text-black text-4xl">
                    Career Boost
                </h1>
            </div>
            <div class="col-span-2 h-[610px] w-full bg-[#fff5eb] rounded-[44px]  overflow-hidden">
                <img 
                    class="w-full h-full object-contain"
                    src="/assets/img/phone-1.png" 
                    alt="" 
                />
            </div>
            <div class="col-span-3 h-[610px] w-full bg-[#ebf4eb] rounded-[44px] px-10 pt-20">
                <h1 className="font-extrabold text-black text-4xl">
                    Des petits jeux pour apprendre encore plus vite.
                </h1>
            </div>
            <div class="col-span-3 h-[610px] w-full bg-[#ebf4eb] rounded-[44px] px-10 pt-20">
                <h1 className="font-extrabold text-black text-4xl">
                    Tout pour vous permettre d'apprécier votre évolution.
                </h1>
            </div>
            <div class="col-span-2 h-[610px] w-full bg-[#fff5eb] rounded-[44px] overflow-hidden">
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
  const trainingCards = [
    {
        id: 1,
        title: "TOEIC Training",
        bgColor: "bg-[#ebf4eb]",
        bgImage: "bg-[url(/mask-group.png)]",
        width: "w-[684px]",
        height: "h-[500px]",
        titleWidth: "w-[563px]",
        leftPadding: "left-[30px]",
    },
    {
        id: 2,
        title: "Career Boost",
        bgColor: "bg-[#f4f0fd]",
        bgImage: "bg-[url(/mask-group-1.png)]",
        width: "w-[484px]",
        height: "h-[500px]",
        titleWidth: "w-[404px]",
        leftPadding: "left-10",
    },
    {
        id: 3,
        title: "",
        bgColor: "bg-[#fff5eb]",
        bgImage: "bg-[url(/mask-group-2.png)]",
        width: "w-[484px]",
        height: "h-[500px]",
        titleWidth: "",
        leftPadding: "",
    },
    {
      id: 4,
      title: "Des petits jeux pour apprendre encore plus vite.",
      bgColor: "bg-[#ebf4eb]",
      bgImage: "",
      width: "w-[685px]",
      height: "h-[500px]",
      titleWidth: "w-[563px]",
      leftPadding: "left-[61px]",
      hasOverlayImage: true,
      overlayImage: "/mask-group-3.png",
    },
    {
      id: 5,
      title: "Tout pour vous permettre d'apprécier votre évolution.",
      bgColor: "bg-[#ebf4eb]",
      bgImage: "",
      width: "w-[685px]",
      height: "h-[500px]",
      titleWidth: "w-[563px]",
      leftPadding: "left-[61px]",
      hasOverlayImage: true,
      overlayImage: "/mask-group-4.png",
    },
    {
      id: 6,
      title: "",
      bgColor: "",
      bgImage: "",
      width: "w-[484px]",
      height: "h-[500px]",
      titleWidth: "",
      leftPadding: "",
      isImageCard: true,
      imageSrc: "/rectangle-8.png",
    },
  ];
</script>