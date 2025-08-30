<template>
  <div className="h-[80vh] w-[290px] px-10 pt-10 bg-white rounded-2xl relative text-black ">
    <div className="flex flex-col items-start gap-10 ">
      <div className="flex flex-col items-start gap-4 relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px]  text-xs whitespace-nowrap">
          <h3>Principal</h3>
        </div>

        <div className="flex flex-col items-start gap-4 relative flex-[0_0_auto]">
          <div className="flex items-center gap-4 relative flex-[0_0_auto] cursor-pointer">
            <Home class="h-4 w-4 text-orange"/>
            <h4 class="relative w-fit text-orange whitespace-nowrap">
                Accueil
            </h4>
          </div>

          <div className="flex items-center gap-4 relative flex-[0_0_auto] cursor-pointer">
            <Building class="h-4 w-4 text-gray-400"/>
            <h4 class="relative w-fit whitespace-nowrap">
                TOEIC Training
            </h4>
          </div>

          <div className="flex items-center gap-4 relative flex-[0_0_auto] cursor-pointer">
            <Mail class="h-4 w-4 text-gray-400"/>
            <h4 class="relative w-fit whitespace-nowrap">
                Messages
            </h4>
          </div>

          <div className="flex items-center gap-4 relative flex-[0_0_auto] cursor-pointer">
            <ShoppingBag class="h-4 w-4 text-gray-400"/>
            <h4 class="relative w-fit whitespace-nowrap">
                Carreer Boost RH.
            </h4>
          </div>
        </div>
    </div>

    <div className="flex flex-col items-start gap-4 relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px]  text-xs whitespace-nowrap">
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
        <div className="w-fit mt-[-1.00px] font-normal   text-xs whitespace-nowrap">
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
import { Building, Home, Mail, ShoppingBag } from 'lucide-vue-next';

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
