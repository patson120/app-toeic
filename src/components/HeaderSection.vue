<template>
    <header className="w-full px-6 py-4 bg-white">
      <div className="flex items-center justify-between max-width">
        <div className="flex items-center shrink-0">
          <img
            className="w-[70px] h-[70px] object-cover"
            alt="Logo English For Real"
            src="/logo.png"
          />
        </div>

        <nav className="flex items-center gap-6">
          <div v-for="(item, index) in navigationItems" :key="index" class="">
            <span v-if="item.isActive"
              className="px-4 py-3 bg-[#fff5eb] text-black rounded-[28px] [font-family:'Inter',Helvetica] font-semibold text-sm hover:bg-[#fff5eb]">
              {{ item.label }}
          </span>
            <span v-else className="[font-family:'Inter',Helvetica] font-normal text-black text-sm cursor-pointer hover:text-gray-600">
              {{ item.label }}
            </span>
          </div>
        </nav>
        <button className="bg-[#ff551c] hover:bg-[#e64a19] text-white px-7 py-3 rounded-xl [font-family:'Manrope',Helvetica] font-extrabold text-sm h-auto">
          Commencer l&apos;essai
        </button>
      </div>
    </header>
</template>

<script setup lang="ts">

  const navigationItems = [
    { label: "Accueil", isActive: true },
    { label: "TOEIC Training", isActive: false },
    { label: "Career Boost RH", isActive: false },
  ]
  
</script>
