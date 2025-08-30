<template>
    <header className="w-full py-4 bg-white">
      <div className="flex items-center justify-between max-width">
        <div className="flex items-center shrink-0">
          <router-link to="/">
            <img
              className="w-[45px] h-[45px] md:w-[70px] md:h-[70px] object-contain"
              alt="Logo English For Real"
              src="/logo.png"
            />
          </router-link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <div v-for="(item, index) in navigationItems" :key="index" class="">
            <span v-if="item.isActive"
              className="px-4 py-3 bg-[#fff5eb] text-black rounded-[28px] font-semibold text-sm hover:bg-[#fff5eb] whitespace-nowrap">
              {{ item.label }}
            </span>
            <span v-else className=" text-black text-sm cursor-pointer hover:text-gray-600 whitespace-nowrap">
              {{ item.label }}
            </span>
          </div>
        </nav>
        <button className="bg-[#ff551c] hover:bg-[#e64a19] text-white whitespace-nowrap px-7 py-3 rounded-xl font-bold text-sm h-auto">
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
