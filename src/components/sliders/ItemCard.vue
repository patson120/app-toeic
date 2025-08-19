<template> 
  <div class="min-w-[220px] h-min mx-2 bg-white rounded-2xl px-5 py-7 flex flex-col gap-8">
    <div class="bg-gray-200 rounded-md h-[20px] w-1/2"></div>
    <div class="flex flex-col gap-2">
        <div class="bg-gray-200 rounded-lg h-[10px]"></div> 
        <div class="bg-gray-200 rounded-lg h-[10px]"></div> 
        <div class="bg-gray-200 rounded-lg h-[10px]"></div> 
        <div class="bg-gray-200 rounded-lg h-[10px] w-1/2"></div> 
    </div>
    <div class="bg-gray-200 rounded-md h-[24px]"></div>
  </div>
</template>
  
<script setup lang="ts">

  interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    price: string;
  }
  
  defineProps<{
    service: Service;
  }>();
</script>
  
<style scoped>
 
</style>