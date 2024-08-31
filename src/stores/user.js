import { ref, onMounted, computed, onUnmounted } from 'vue';
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AuthAPI from '@/api/AuthAPI';
import AppointmentAPI from '@/api/AppointmentAPI';

export const useUserStore = defineStore('user', () => {

  const router = useRouter();
  const user = ref({});
  const userAppointments = ref([]);
  const loading = ref(true);

  onMounted(async () => {
    try {
      const { data } = await AuthAPI.auth();
      user.value = data;
      await getUserAppointments();
    } catch(error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });


  async function checkAuth() {
    const token = localStorage.getItem('AUTH_TOKEN') ?? '';
    if(token !=='' && Object.keys(user.value).length === 0) {
      const { data } = await AuthAPI.auth();
      user.value = data;
      await getUserAppointments();
    }
  }

  async function getUserAppointments() {
    const { data } = await AppointmentAPI.getUserAppointments(user.value._id);
    userAppointments.value = data;
  }

  function logout() {
    localStorage.removeItem('AUTH_TOKEN');
    user.value = userAppointments.value = {};
    router.push({name: 'login'});
  }

  const getUserName = computed(() => user.value?.name ? user.value?.name : '' );

  const noAppointments = computed(() => userAppointments.value.length === 0 );

  return {
    user,
    userAppointments,
    loading,
    checkAuth,
    getUserAppointments,
    logout,
    getUserName,
    noAppointments
  }
});