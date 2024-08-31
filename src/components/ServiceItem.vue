<script setup>
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';

const appointments = useAppointmentsStore();
defineProps({
  service: {
    type: Object
  }
})
</script>

<template lang="pug">
div(
  class="p-5 space-y-5 rounded-lg cursor-pointer"
  :class="appointments.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100'"
  @click="appointments.onServiceSelected(service)" 
)
  p(class="text-2xl font-light") {{ service.name }}
  p(
    class="text-3xl font-black"
    :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'"
  ) {{ formatCurrency(service.price) }}
</template>
