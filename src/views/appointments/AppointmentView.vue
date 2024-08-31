<script setup>
import { ref } from 'vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';
import { formatCurrency } from '@/helpers';
import SelectedService from '@/components/SelectedService.vue';
import { useAppointmentsStore } from '@/stores/appointments';

const appointments = useAppointmentsStore()

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM'
})

const disableDate = (date) => {
  const today = new Date()
  return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay()) || date.getYear() > today.getYear()
}

</script>

<template lang="pug">
h2(class="text-4xl font-extrabold text-white mt-10") Detalles Cita y Resumen
p(class="text-white text-lg") Verifica la reserva y confirma tu cita: 

h3(class="text-3xl font-extrabold text-white") Servicios

p(
  v-if="appointments.noServicesSelected"
  class="text-white text-2xl text-center"  
) No hay servicios seleccionados

div(v-else class="grid gap-5")
  SelectedService(
    v-for="service in appointments.services"
    :key="service._id"
    :service="service"
  )

  p(class="text-right text-white text-2xl") Total a pagar: 
    span.font-black {{ formatCurrency(appointments.totalAmount) }}

div(class="space-y-8" v-if="!appointments.noServicesSelected")
  h3(class="text-3xl font-extrabold text-white") Fecha y Hora 
  div(class="lg:flex gap-5 items-start")
    div(class="w-full lg:w-96 flex justify-center lg:justify-start rounded-lg")
      VueTailwindDatepicker(
        :disable-date="disableDate"
        i18n="es"
        as-single
        no-input
        disable-in-range
        :formatter="formatter"
        v-model="appointments.date"
      )
    div(v-if="appointments.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0")
      button(
        v-for="hour in appointments.hours"
        class="block text-blue-500 rounded-lg text-lg font-black p-3 disabled:opacity-30"
        :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100'"
        @click="appointments.time = hour"
        :disabled="appointments.disableTime(hour)"
      ) {{ hour }}
    
  div(v-if="appointments.isValidReservation" class="flex justify-end")
    button(
      @click="appointments.saveAppointment"
      class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
    ) Confirmar Reserva
</template>