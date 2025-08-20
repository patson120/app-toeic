<template>
    <section class="bg-white">
        <div class="max-width grid grid-cols-1 md:grid-cols-2 pb-20 pt-10 md:pt-0">
            <div className="flex flex-col items-start gap-[34px] relative z-10">
                <div className="flex flex-col items-start gap-6">
                    <h2 className="w-full max-w-[498px] [font-family:'Poppins',Helvetica] font-semibold text-black text-2xl tracking-[0] leading-7">
                        Vous avez une question ou une quelconque préoccupation ?
                    </h2>

                    <p className="w-full max-w-[498px] [font-family:'Poppins',Helvetica] font-normal text-[#454545] text-base tracking-[0] leading-[normal]">
                        Contactez-nous via l&apos;un des moyens suivants, nous vous
                        donnerons suite le plutôt possible.
                    </p>
                </div>

                <div className="flex flex-col items-start gap-6 w-full max-w-md">
                    <router-link to="/"
                        className="w-full py-3 md:py-0 md:h-[70px] bg-white rounded-[60px] border border-solid border-neutral-200 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="relative p-0 h-full flex justify-start items-center gap-2 md:gap-5 px-3">
                            <div className="w-[50px] h-[50px] bg-neutral-100 rounded-[60px] flex items-center justify-center">
                                <FacebookIcon :size="22" class="w-6 h-6 text-black" />
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <div className="text-black">
                                    <span class="font-bold"> WhatsApp: </span>
                                    <span className="text-black ">06.51.65.49.22</span>
                                </div>
                                <div className="text-[#454545] text-xs -mt-1">
                                    Engageons une conversation instantanée.
                                </div>
                            </div>
                            <ArrowRight :size="22" class="absolute hidden md:flex w-6 h-6 top-[22px] right-[21px] text-black" />
                        </div>
                    </router-link>

                    <router-link to="/"
                        className="w-full py-3 md:py-0 md:h-[70px] bg-white rounded-[60px] border border-solid border-neutral-200 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="relative p-0 h-full flex justify-start items-center gap-2 md:gap-5 px-3">
                            <div className="w-[50px] h-[50px] bg-neutral-100 rounded-[60px] flex items-center justify-center">
                                <FacebookIcon :size="22" class="w-6 h-6 text-black" />
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <div className="text-black">
                                    <span class="font-bold" >Télégram</span>
                                </div>
                                <div className="text-[#454545] text-xs -mt-1">
                                    Engageons une conversation instantanée.
                                </div>
                            </div>
                            <ArrowRight :size="22" class="absolute hidden md:flex w-6 h-6 top-[22px] right-[21px] text-black" />
                        </div>
                    </router-link>

                    <router-link to="/"
                        className="w-full py-3 md:py-0 md:h-[70px] bg-white rounded-[60px] border border-solid border-neutral-200 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="relative p-0 h-full flex justify-start items-center gap-2 md:gap-5 px-3">
                            <div className="w-[50px] h-[50px] bg-neutral-100 rounded-[60px] flex items-center justify-center">
                                <MailIcon :size="22" class="w-6 h-6 text-black" />
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <div className="text-black">
                                    <span class="font-bold text-sm md:text-base" >Email: </span>
                                    <span className=" text-black text-xm md:text-base">contact@englishforreal.com</span>
                                </div>
                                <div className="text-[#454545] text-xs -mt-1">
                                    Ecrivez-nous, nous vous repondrons aussitôt.
                                </div>
                            </div>
                            <ArrowRight :size="22" class="absolute hidden md:flex w-6 h-6 top-[22px] right-[21px] text-black" />
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="hidden md:flex max-h-[650px] w-full rounded-[60px] overflow-hidden">
                <img 
                    class="h-full w-full object-cover"
                src="/assets/img/image-2.png" alt="">
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ArrowRight, FacebookIcon , MailIcon} from "lucide-vue-next";
</script>