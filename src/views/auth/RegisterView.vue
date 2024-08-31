<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import AuthAPI from "@/api/AuthAPI";

const toast = inject("toast");

const handleSubmit = async ({ password_confirm, ...FormData }) => {
  try {
    const { data } = await AuthAPI.register(FormData);
    console.log(data);
    toast.open({
      type: "success",
      message: data.msg,
    });
    reset("registerForm");
  } catch (error) {
    toast.open({
      type: "error",
      message: error.response.data.msg,
    });
    console.log(error);
  }
};
</script>

<template lang="pug">
h1(class="text-6xl font-extrabold text-white text-center mt-10") Crea una cuenta
p(class="text-2xl text-white text-center my-5") Crea una cuenta en AppBarberShop

FormKit(
  id="registerForm"
  type="form"
  :actions="false"
  incomplete-message="No se pudo enviar, revisa las notificaciones."
  @submit="handleSubmit"
)
  FormKit(
    type="text"
    label="Nombre"
    name="name"
    placeholder="Tu nombre"
    validation="required|length:3"
    :validation-messages="{required: 'El nombre es obligatorio', length: 'El nombre es muy corto'}"
  )

  FormKit(
    type="email"
    label="Email"
    name="email"
    placeholder="Email de Registro"
    validation="required|email"
    :validation-messages="{required: 'El email es obligatorio', email: 'Email no válido'}"
  )

  FormKit(
    type="password"
    label="Password"
    name="password"
    placeholder="Password de Usuario - Mín. 8 caracteres"
    validation="required|length:8"
    :validation-messages="{required: 'El password es obligatorio', length: 'El password debe contener al menos 8 caracteres'}"
  )

  FormKit(
    type="password"
    label="Repetir Password"
    name="password_confirm"
    placeholder="Repite el Password"
    validation="required|confirm:password"
    :validation-messages="{required: 'Repetir el password es obligatorio', confirm: 'Los password no son iguales'}"
  )

  FormKit(
    type="submit"
  ) Crear Cuenta


</template>
