<template>
  <div className="h-[80vh] w-[290px] px-10 pt-10 bg-white rounded-2xl relative ">
    <div className="flex flex-col items-start gap-10 ">
      <div className="flex flex-col items-start gap-4 relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] text-gris text-xs whitespace-nowrap">
        <h3>Principal</h3>
        </div>

        <div className="flex flex-col items-start gap-4 relative flex-[0_0_auto]">
            <div v-for="(item, index) in principalMenuItems" :key="index"
                className="flex items-center gap-4 relative flex-[0_0_auto] cursor-pointer">
                <img
                    className="relative w-3.5 h-3.5"
                    :alt="item.label"
                    :src="item.icon"
                />
                <div class="relative w-fit whitespace-nowrap"
                    :class="{ 'text-[#ff551c]': item.isActive, 'text-black': !item.isActive}">
                    {{item.label}}
                </div>
            </div>
        </div>
    </div>

    <div className="flex flex-col items-start gap-4 relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] text-gris text-xs whitespace-nowrap">
        <h3>Mon activité</h3>
        </div>

        <div className="flex flex-col items-start gap-4 relative flex-[0_0_auto]">
            <div v-for="(item, index) in activityMenuItems" :key="index"
                className="flex items-center gap-4 relative flex-[0_0_auto] cursor-pointer">
                <img
                    className="relative w-3.5 h-3.5"
                    :alt="item.label"
                    :src="item.icon"
                />
                <div className="relative w-fit font-normal text-noir text-base whitespace-nowrap">
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>

    <div className=" flex flex-col items-start gap-4 flex-[0_0_auto]">
        <div className="w-fit mt-[-1.00px] font-normal text-gris text-xs whitespace-nowrap">
          <h3>Paramètres</h3>
        </div>

        <div className="flex flex-col items-start gap-4 flex-[0_0_auto]">

            <div v-for="(item, index) in settingsMenuItems" :key="index"
                className="flex items-center gap-4 flex-[0_0_auto] cursor-pointer">
                <img
                    className="w-3.5 h-3.5"
                    :alt="item.label"
                    :src="item.icon"
                />
                <div className="w-fit font-normal text-noir text-base whitespace-nowrap">
                    {{item.label}}
                </div>
            </div>
        </div>
    </div>
    </div>

    <div className="mt-10">
      <img
        className="w-[40px] h-[40px] object-contain"
        alt="Top"
        src="/logo.png"
      />
      <div className="flex flex-col items-start">
        <div className="w-fit mt-[-1.00px] font-bold">
            John Adebamgbe
        </div>
        <div className=" w-fit text-gray-400">
            @adebamgbe
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">

const principalMenuItems = [
    {
      icon: "/logo.png",
      label: "Accueil",
      isActive: true,
    },
    {
      icon: "/logo.png",
      label: "TOEIC Training",
      isActive: false,
    },
    {
      icon: "/logo.png",
      label: "Messages",
      isActive: false,
    },
    {
      icon: "/logo.png",
      label: "Career Boost RH.",
      isActive: false,
    },
  ];

  const activityMenuItems = [
    {
      icon: "/logo.png",
      label: "Tests blanc",
    },
    {
      icon: "/logo.png",
      label: "Favoris",
    },
    {
      icon: "/logo.png",
      label: "Historique",
    },
    {
      icon: "/logo.png",
      label: "Statistiques",
    },
  ];

  const settingsMenuItems = [
    {
      icon: "/logo.png",
      label: "Préférence",
    },
    {
      icon: "/logo.png",
      label: "Abonnement",
    },
    {
      icon: "/logo.png",
      label: "Compte",
    },
  ];


</script>
