<template>
    <div class="carousel-container" ref="carouselContainer">
      <div 
        class="carousel-track" 
        ref="carouselTrack" 
        :style="{ 
          transform: `translateX(${translateX}px)`,
          gap: `${gap}px`
        }"
      >
        <slot></slot>
      </div>
      
      <div v-if="showIndicators" class="carousel-indicators">
        <div 
          v-for="(_, index) in indicatorCount" 
          :key="index"
          class="indicator"
          :class="{ active: currentIndex === index }"
        ></div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted, onUnmounted, watch } from 'vue';
    
    interface Props {
        direction?: 'left' | 'right';
        speed?: number;
        itemWidth?: number;
        gap?: number;
        showIndicators?: boolean;
        indicatorCount?: number;
        pauseOnHover?: boolean;
        autoPlay?: boolean;
    }
  
    const props = withDefaults(defineProps<Props>(), {
        direction: 'left',
        speed: 1,
        itemWidth: 370,
        gap: 16,
        showIndicators: true,
        indicatorCount: 6,
        pauseOnHover: true,
        autoPlay: true
    });
  
    const carouselContainer = ref<HTMLElement>();
    const carouselTrack = ref<HTMLElement>();
    const translateX = ref(0);
    const currentIndex = ref(0);
    const animationId = ref<number>();
  
    const startAnimation = () => {
        if (!props.autoPlay) return;
        
        const animate = () => {
        if (props.direction === 'left') {
            translateX.value -= props.speed;
            
            // Reset position for left scroll
            if (translateX.value <= -(props.indicatorCount * (props.itemWidth + props.gap))) {
                translateX.value = 0;
            }
        } else {
            translateX.value += props.speed;
            
            // Reset position for right scroll
            if (translateX.value >= 0) {
            translateX.value = -(props.indicatorCount * (props.itemWidth + props.gap));
            }
        }
        
        // Update current index for indicators
        const progress = Math.abs(translateX.value) / (props.itemWidth + props.gap);
        currentIndex.value = Math.floor(progress % props.indicatorCount);
        
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
        // Set initial position based on direction
        if (props.direction === 'left') {
            translateX.value = 0;
        } else {
            translateX.value = -(props.indicatorCount * (props.itemWidth + props.gap));
        }
        
        startAnimation();
        
        // Pause animation on hover if enabled
        if (props.pauseOnHover) {
            const container = carouselContainer.value;
            if (container) {
                container.addEventListener('mouseenter', stopAnimation);
                container.addEventListener('mouseleave', startAnimation);
            }
        }
    });
    
    onUnmounted(() => {
        stopAnimation();
    });
    
    // Watch for prop changes
    watch(() => props.autoPlay, (newVal) => {
        if (newVal) {
            startAnimation();
        } else {
            stopAnimation();
        }
    });
</script>
  
<style scoped>
    .carousel-container {
        overflow: hidden;
        position: relative;
        /* margin-bottom: 3rem; */
    }
    
    .carousel-track {
        display: flex;
        transition: none;
        will-change: transform;
    }
    
    .carousel-indicators {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 2rem;
    }
  
    .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #CBD5E1;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .indicator.active {
        background: linear-gradient(135deg, #3B82F6, #8B5CF6);
        transform: scale(1.2);
    }
  </style>