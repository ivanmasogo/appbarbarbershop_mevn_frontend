<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import AuthAPI from '@/api/AuthAPI';
import { useUserStore } from "@/stores/user";

const toast = inject("toast");
const router = useRouter();
const user = useUserStore();

const handleSubmit = async (formData) => {
  try{
    const { data: {msg, token} } = await AuthAPI.login(formData);
    localStorage.setItem('AUTH_TOKEN', token);
    router.push({ name: 'my-appointments'});
    await user.checkAuth();
  } catch(error){
    toast.open({
      type: "error",
      message: error.response.data.msg,
    });
  }
}

</script>

<template lang="pug">
h1(class="text-6xl font-extrabold text-white text-center mt-10") Iniciar Sesión
p(class="text-2xl text-white text-center my-5") Si tienes una cuenta, inicia sesión

FormKit(
  id="registerForm"
  type="form"
  :actions="false"
  incomplete-message="No se pudo enviar, revisa las notificaciones."
  @submit="handleSubmit"
)

  FormKit(
    type="email"
    label="Email"
    name="email"
    placeholder="Email de Usuario"
    validation="required|email"
    :validation-messages="{required: 'El email es obligatorio', email: 'Email no válido'}"
  )

  FormKit(
    type="password"
    label="Password"
    name="password"
    placeholder="Password de Usuario"
    :validation-messages="{required: 'El password es obligatorio'}"
  )

  FormKit(
    type="submit"
  ) Iniciar Sesión

</template>