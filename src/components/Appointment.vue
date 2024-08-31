<script setup>
import { displayDate } from "@/helpers/date";
import { formatCurrency } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";

const appointments = useAppointmentsStore();

defineProps({
  appointment: {
    type: Object
  }
})
</script>

<template lang="pug">
div(class="bg-white p-5 space-y-5 rounded-lg")
  p(class="text-gray-500 font-black flex flex-col lg:flex-row gap-3")
    span Fecha: 
      span(class="font-light") {{ displayDate(appointment.date) }}
    span Hora: 
      span(class="font-light") {{ appointment.time }}
  
  p(class="text-lg font-black") Servicios Solicitados en la cita 
  div(v-for="service in appointment.services")
    p(class="") {{ service.name }}
    p(class="text-2xl font-black text-blue-500") {{ formatCurrency(service.price) }}

  p(class="text-2xl font-black text-right") Total a pagar: 
   span(class="text-blue-600") {{ formatCurrency(appointment.totalAmount) }}
  
  div(class="flex gap-2 items-center")
    RouterLink(
      :to="{name: 'edit-appointment',params: {id : appointment._id}}"
      class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
    ) Editar Cita
    button(
      class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
      @click="appointments.cancelAppointment(appointment._id)"
    ) Cancelar Cita
</template>