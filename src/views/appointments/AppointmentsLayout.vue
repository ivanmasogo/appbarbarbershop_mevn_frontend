<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const user = useUserStore();

const buttonSelected = computed(()=> {
  const page = route.name;
  switch (page) {
    case 'my-appointments':
    case 'edit-appointment':
      return 'left';
    case 'new-appointment':
    case 'appointment-details':
    case 'edit-appointment-details':
      return 'right';
    default:
      return null;
  }
});

</script>

<template lang="pug">
div(class="flex justify-between")
  h1(class="text-2xl lg:text-6xl font-black text-white") App BarberShop 
  div(class="flex flex-col space-y-5")
    div(class="flex gap-2 items-center")
      p(class="text-white text-right") Hola: {{ user.getUserName }}
      button(
        type="button"
        class="bg-red-600 hover:bg-red-500 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
        @click="user.logout"
      ) Cerrar Sesión
    nav(class="flex gap-2 items-center justify-end")
      RouterLink(
        :to="{name: 'my-appointments'}"
        class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
        :class="{'bg-blue-700 hover:bg-blue-600': buttonSelected && buttonSelected === 'left' }"
      ) Mis Citas

      RouterLink(
        :to="{name: 'new-appointment'}"
        class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
        :class="{'bg-blue-700 hover:bg-blue-600': buttonSelected && buttonSelected === 'right' }"
      ) Nueva Cita

main  
  RouterView
</template>