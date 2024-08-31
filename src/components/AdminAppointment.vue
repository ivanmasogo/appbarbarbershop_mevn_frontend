<script setup>
import { displayDate } from "../helpers/date";
import { formatCurrency } from "../helpers";

defineProps({
  appointment: {
    type: Object,
  },
});
</script>

<template lang="pug">
div(class="bg-white p-5 space-y-3 rounded-lg")
  p(class="text-gray-500 font-black flex flex-col lg:flex-row gap-3")
    span Fecha: 
      span(class="font-light") {{ displayDate(appointment.date) }}
    span Hora: 
      span(class="font-light") {{ appointment.time }}
  
  p(class="text-gray-500 font-black flex flex-col lg:flex-row gap-3")
    span Nombre Cliente: 
      span(class="font-light") {{ appointment.user.name }}
    span Email: 
      span(class="font-light") {{ appointment.user.email }}

  p(class="text-lg font-black") Servicios Solicitados en la cita
  
  div(v-for="service in appointment.services")
    p {{ service.name }}
    p(class="text-2xl font-black text-blue-500") {{ formatCurrency(service.price) }}

  p(class="text-2xl font-black text-right")
    | Total a pagar: 
    span(class="text-blue-600") {{ formatCurrency(appointment.totalAmount) }}

</template>
