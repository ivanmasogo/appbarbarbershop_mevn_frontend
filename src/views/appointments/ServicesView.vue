<script setup>
import ServiceItem from "@/components/ServiceItem.vue";
import { useServicesStore } from "@/stores/services";

const store = useServicesStore();
</script>

<template lang="pug">
h2(class="text-4xl font-extrabold text-white mt-10") Servicios
p(class="text-white text-lg mt-5") Elige al menos un servicio para tu cita:

div(class="grid grid-cols-2 gap-5 mt-5")
  ServiceItem(
    v-for="service in store.services"
    :key="service._id"
    :service="service"
  )
</template>
