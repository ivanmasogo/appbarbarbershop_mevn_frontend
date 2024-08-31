<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();


</script>

<template lang="pug">
div(class="flex flex-col items-center justify-center h-full gap-8 lg:gap-10")
  h1(class="text-center text-4xl lg:text-8xl font-black text-white mt-20 lg:mt-0") App BarberShop 
  RouterLink(
    class="bg-white font-extrabold text-3xl lg:text-4xl text-center p-2 lg:p-5 hover:bg-black hover:text-white"
    :to="{name: 'my-appointments'}"
  ) Acceder

</template>