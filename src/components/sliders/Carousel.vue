<template>
    <section class="services-section">
        <div class="container">
            <div class="carousel-container" ref="carouselContainer">
                <div class="carousel-track" ref="carouselTrack" :style="{ transform: `translateX(${translateX}px)` }">
                    <slot></slot>
                </div>
            </div>
        </div>
    </section>
  </template>
  
<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';

    const props = defineProps<{
        direction: "right" | "left";
        itemsLength: number;
        itemWidth?: number;
    }>();
  
    const carouselContainer = ref<HTMLElement>();
    const carouselTrack = ref<HTMLElement>();
    const translateX = ref(0);
    const currentIndex = ref(0);
    const cardWidth = props.itemWidth ?? 220; // Width of card + margin
    const animationId = ref<number>();

    const startAnimation = () => {
        const animate = () => {

        props.direction === 'left' ? translateX.value -= 1 : translateX.value += 1;
        
        // Reset position when we've scrolled through one complete set
        const resetPosition = props.direction === 'left' ? -(props.itemsLength * cardWidth) : 0;
    
        if (props.direction === 'right' && translateX.value >= resetPosition) {
            translateX.value = -(props.itemsLength * cardWidth)
        }
        else if (props.direction === 'left' && translateX.value <= resetPosition) {
            translateX.value = 0
        }
        
        // Update current index for indicators
        const progress = Math.abs(translateX.value) / cardWidth;
        currentIndex.value = Math.floor(progress % props.itemsLength);
        
        animationId.value = requestAnimationFrame(animate);
        };
        
        animationId.value = requestAnimationFrame(animate);
    };
  
    const stopAnimation = () => {
        if (animationId.value) {
        cancelAnimationFrame(animationId.value);
        }
    };
    
    onMounted(() => {
        startAnimation();
        
        // Pause animation on hover
        const container = carouselContainer.value;
        if (container) {
        container.addEventListener('mouseenter', stopAnimation);
        container.addEventListener('mouseleave', startAnimation);
        }
    });
    
    onUnmounted(() => {
        stopAnimation();
    })
</script>
  
<style scoped>
  .services-section {
    padding: 0;
    overflow: hidden;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }
  
  .carousel-container {
    overflow: hidden;
    position: relative;
    margin-bottom: 1rem;
  }
  
  .carousel-track {
    display: flex;
    transition: none;
    will-change: transform;
  }

  @media (max-width: 768px) {
    .services-section {
      padding: 3rem 0;
    }
  }
</style>