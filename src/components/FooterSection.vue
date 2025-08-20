<template>
    <section class="bg-white">
        <footer className="max-width min-h-[100px] bg-white border-t border-neutral-200 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 py-[27px] h-full">
                <div className="px-7 py-3 rounded-full whitespace-nowrap border border-black text-black font-bold text-sm">
                    Suivez-nous sur nos réseaux
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-[30px]">
                    <router-link to="/" className="text-black text-xs whitespace-nowrap">
                        Conditions d'utilisation
                    </router-link>
                    <router-link to="/" className="text-black text-xs  whitespace-nowrap">
                        Politique de confidentialité
                    </router-link>
                    <router-link to="/" className="text-black text-xs  whitespace-nowrap">
                        @ENGLISH FOR REAL 2025
                    </router-link>
                </div>

                <div className="text-black flex justify-end items-center gap-4">
                    <div className="px-4 rounded-xl font-bold text-sm">
                        Suivez-nous
                    </div>
                    <router-link to="/" className="border border-black text-white px-3 py-[10px] rounded-full font-extrabold text-sm h-auto">
                        <FacebookIcon :size="22" class="text-black" />
                    </router-link>
                    <router-link to="/" className="border border-black text-white px-3 py-[10px] rounded-full font-extrabold text-sm h-auto">
                        <LinkedinIcon :size="22" class="text-black" />
                    </router-link>
                </div>
            </div>
        </footer>
    </section>
</template>

<script setup lang="ts">
    import { FacebookIcon, LinkedinIcon } from "lucide-vue-next";

</script>