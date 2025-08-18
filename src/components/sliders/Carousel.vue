<template>
    <section class="services-section">
        <div class="container">
            <div class="carousel-container" ref="carouselContainer">
                <div class="carousel-track" ref="carouselTrack" :style="{ transform: `translateX(${translateX}px)` }">
                    <ItemCard 
                        v-for="service in duplicatedServices" 
                        :key="`${service.id}-${Math.random()}`"
                        :service="service"
                    />
                </div>
            </div>
        </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue';
import ItemCard from './ItemCard.vue';
  
  interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    price: string;
  }
  
  const services: Service[] = [
    {
      id: 1,
      title: "Développement Web",
      description: "Création de sites web modernes et responsive avec les dernières technologies.",
      icon: "fas fa-code",
      features: ["React/Vue", "Node.js", "Responsive", "SEO"],
      price: "À partir de 1 500€"
    },
    {
      id: 2,
      title: "Design UI/UX",
      description: "Conception d'interfaces utilisateur intuitives et d'expériences mémorables.",
      icon: "fas fa-paint-brush",
      features: ["Figma", "Prototyping", "User Research", "Mobile First"],
      price: "À partir de 800€"
    },
    {
      id: 3,
      title: "Mobile App",
      description: "Applications mobiles natives et cross-platform pour iOS et Android.",
      icon: "fas fa-mobile-alt",
      features: ["React Native", "Flutter", "iOS", "Android"],
      price: "À partir de 3 000€"
    },
    {
      id: 4,
      title: "E-commerce",
      description: "Solutions complètes pour votre boutique en ligne avec paiements sécurisés.",
      icon: "fas fa-shopping-cart",
      features: ["Shopify", "WooCommerce", "Stripe", "PayPal"],
      price: "À partir de 2 500€"
    },
    {
      id: 5,
      title: "SEO & Marketing",
      description: "Optimisation pour les moteurs de recherche et stratégies marketing digitales.",
      icon: "fas fa-chart-line",
      features: ["Google Analytics", "Keywords", "Content", "Social Media"],
      price: "À partir de 600€"
    },
    {
      id: 6,
      title: "Maintenance",
      description: "Support technique et maintenance continue de vos projets digitaux.",
      icon: "fas fa-cogs",
      features: ["24/7 Support", "Updates", "Backup", "Security"],
      price: "À partir de 200€/mois"
    }
  ];
  
  const carouselContainer = ref<HTMLElement>();
  const carouselTrack = ref<HTMLElement>();
  const translateX = ref(0);
  const currentIndex = ref(0);
  const cardWidth = 370; // Width of card + margin
  const animationId = ref<number>();
  
  // Duplicate services for infinite scroll effect
  const duplicatedServices = computed(() => [...services, ...services, ...services]);
  
  const startAnimation = () => {
    const animate = () => {
      translateX.value -= 1;
      
      // Reset position when we've scrolled through one complete set
      const resetPosition = -(services.length * cardWidth);
      if (translateX.value <= resetPosition) {
        translateX.value = 0;
      }
      
      // Update current index for indicators
      const progress = Math.abs(translateX.value) / cardWidth;
      currentIndex.value = Math.floor(progress % services.length);
      
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
  });
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