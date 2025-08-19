<template>
    <section class="bg-white py-20">
        <div class="max-width grid grid-cols-5 gap-12 h-full">
            <div class="col-span-3 h-[520px] w-full bg-[#ebf4eb] rounded-[44px] flex flex-col justify-between pt-20 pb-10">
                <h1 className="font-extrabold text-black text-4xl px-10">
                    TOEIC Training
                </h1>
                <Carousel 
                    direction="left" 
                    :itemsLength="services.length">
                    <ItemCard
                        v-for="service in duplicatedServices" 
                        :key="`${service.id}-${Math.random()}`"
                        :service="service"
                    />
                </Carousel>
            </div>
            <div class="col-span-2 h-[520px] w-full  bg-[#f4f0fd] rounded-[44px] pt-20 pb-10">
                <h1 className="font-extrabold text-black text-4xl px-10">
                    Career Boost
                </h1>
            </div>
            <div class="col-span-2 h-[520px] w-full bg-[#fff5eb] rounded-[44px]  overflow-hidden">
                <img 
                    class="w-full h-full object-contain"
                    src="/assets/img/phone-1.png" 
                    alt="" 
                />
            </div>
            <div class="col-span-3 h-[520px] w-full bg-[#ebf4eb] rounded-[44px] flex flex-col justify-between pt-20 pb-10">
                <h1 className="font-extrabold text-black text-4xl px-10">
                    Des petits jeux pour apprendre encore plus vite.
                </h1>
                <!-- 
                    <div class="flex flex-col">
                        <Carousel 
                            direction="right" 
                            :itemsLength="services.length">
                            <div v-for="(service, index) in duplicatedServices" :key="index" 
                            class="h-20 min-w-[200px] mr-3 rounded-full bg-white"></div>
                        </Carousel>
                        <Carousel 
                            direction="left" 
                            :itemsLength="services.length">
                            <div v-for="(service, index) in duplicatedServices" :key="index" 
                            class="h-20 min-w-[200px] mr-3 rounded-full bg-white"></div>
                        </Carousel>
                        <Carousel 
                            direction="right" 
                            :itemsLength="services.length">
                            <div v-for="(service, index) in duplicatedServices" :key="index" 
                            class="h-20 min-w-[200px] mr-3 rounded-full bg-white"></div>
                        </Carousel>
                    </div>
                -->
                <Carousel 
                    direction="right" 
                    :itemsLength="services.length">
                    <ItemCard
                        v-for="service in duplicatedServices" 
                        :key="`${service.id}-${Math.random()}`"
                        :service="service"
                    />
                </Carousel>
            </div>
            <div class="col-span-3 h-[520px] w-full bg-[#ebf4eb] rounded-[44px] flex flex-col justify-between pt-20 pb-10">
                <h1 className="font-extrabold text-black text-4xl px-10">
                    Tout pour vous permettre d'apprécier votre évolution.
                </h1>
                <Carousel 
                    direction="left" 
                    :itemsLength="services.length">
                    <ItemCard
                        v-for="service in duplicatedServices" 
                        :key="`${service.id}-${Math.random()}`"
                        :service="service"
                    />
                </Carousel>
            </div>
            <div class="col-span-2 h-[520px] w-full bg-[#fff5eb] rounded-[44px] overflow-hidden">
                <img 
                    class="w-full h-full object-cover"
                    src="/assets/img/rectangle-8.png" 
                    alt="" 
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { computed, ref, Ref } from 'vue';
    import Carousel from './sliders/Carousel.vue';
    import { Service } from '../types';
    import ItemCard from './sliders/ItemCard.vue';

    const services: Ref<Service[]> = ref([
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
    ])

    // Duplicate services for infinite scroll effect
    const duplicatedServices = computed(() => [ ...services.value, ...services.value, ...services.value ]);
  
</script>