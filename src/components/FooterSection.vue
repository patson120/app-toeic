<template>
    <section class="bg-white">
        <footer className="max-width h-[100px] bg-white border-t border-neutral-200 relative">
            <div className="flex items-center justify-between py-[27px] h-full">
                <div className="px-7 py-3 rounded-full border border-black text-black font-extrabold text-sm">
                    Suivez-nous sur nos réseaux
                </div>

                <div className="flex items-center gap-[30px]">
                    <div className="text-black text-xs whitespace-nowrap">
                        Conditions d'utilisation
                    </div>
                    <div className="text-black text-xs  whitespace-nowrap">
                        Politique de confidentialité
                    </div>
                    <div className="text-black text-xs  whitespace-nowrap">
                        @ENGLISH FOR REAL 2025
                    </div>
                </div>

                <div className="text-black flex justify-end items-center gap-4">
                    <div className="px-4 rounded-xl font-extrabold text-sm">
                        Suivez-nous
                    </div>
                    <div className="border border-black text-white px-3 py-[10px] rounded-full font-extrabold text-sm h-auto">
                        <FacebookIcon :size="22" class="text-black" />
                    </div>
                    <div className="border border-black text-white px-3 py-[10px] rounded-full font-extrabold text-sm h-auto">
                        <LinkedinIcon :size="22" class="text-black" />
                    </div>
                </div>
            </div>
        </footer>
    </section>
</template>

<script setup lang="ts">
import { FacebookIcon, LinkedinIcon } from "lucide-vue-next";

</script>