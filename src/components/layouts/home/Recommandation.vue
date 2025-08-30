<template>
    <div className="w-full bg-transparent relative rounded-md border border-gray-300">
      <div className="p-4 flex flex-col gap-1">
        <h2 className="font-semibold text-[#202020] whitespace-nowrap">
          {{ props.title }}
        </h2>
        <p className=" text-[#454545] text-xs whitespace-nowrap">
          {{ props.content }}
        </p>
        <span v-if="props.priority" className="absolute top-[17px] right-[18px] font-semibold text-[#454545] text-xs whitespace-nowrap">
          {{ props.priority }}
        </span>
        <button variant="ghost"
          className="flex w-fit gap-2 h-auto mt-2 font-semibold text-[#454545] text-xs whitespace-nowrap hover:bg-transparent">
          <p>{{ props.btnText}} </p>
          <ArrowRight class="h-4 w-4 text-gray-500"/>
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

interface Props {
    title: string
    content: string;
    priority?: string;
    btnText: string;
}
  
const props = withDefaults(defineProps<Props>(), {
    title: "",
    content: "",
    priority: "",
    btnText: ""
});

</script>