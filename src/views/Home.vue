<template>
  <div class="min-h-screen bg-white">
    <Header /> 
    <Hero /> 
    <ApproachSection /> 
    <div class="w-auto py-20 bg-white">
      <img 
        class="w-full h-full object-cover"
        src="/assets/img/mask-group.png" 
        alt="" 
      />
    </div>

    <TrainingSection />

    <TestimonialsSection />
    
    <FeaturesSection />
    
    <CallToActionSection />

    <ServiceCarousel />

    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import ApproachSection from '../components/ApproachSection.vue';
import CallToActionSection from '../components/CallToActionSection.vue';
import FeaturesSection from '../components/FeaturesSection.vue';
import FooterSection from '../components/FooterSection.vue';
import Header from '../components/Header.vue';
import Hero from '../components/Hero.vue';
import TestimonialsSection from '../components/TestimonialsSection.vue';
import TrainingSection from '../components/TrainingSection.vue';

</script>