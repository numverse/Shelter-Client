<script setup lang="ts">
import { ref, computed } from "vue";
import { login } from "../utils/api/login";
import { register } from "../utils/api/register";
import { i18n } from "../utils/i18n";

const isLogin = ref(true);

const username = ref("");
const email = ref("");
const password = ref("");

const loading = ref(false);
const error = ref<string | null>(null);

const title = computed(() => (isLogin.value ? i18n("login") : i18n("register")));
const buttonText = computed(() =>
  isLogin.value ? i18n("login") : i18n("register"),
);

const isSubmitDisabled = computed(() => {
  if (loading.value) return true;

  if (isLogin.value) {
    return !email.value || !password.value;
  }

  return !username.value || !email.value || !password.value;
});

async function onSubmit() {
  loading.value = true;
  error.value = null;

  try {
    if (isLogin.value) {
      await login({
        email: email.value,
        password: password.value,
      });
    } else {
      await register({
        username: username.value,
        email: email.value,
        password: password.value,
      });
    }
  } catch {
    error.value = isLogin.value
      ? i18n("login_failed")
      : i18n("registration_failed");
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  username.value = "";
  email.value = "";
  password.value = "";
}

function toggleMode() {
  isLogin.value = !isLogin.value;
  error.value = null;
  resetForm();
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold mb-4">
      {{ title }}
    </h1>

    <form
      class="space-y-4 w-1/6"
      @submit.prevent="onSubmit"
    >
      <div v-if="!isLogin">
        <label
          for="username"
          class="block text-sm font-medium text-text-primary"
        >
          {{ i18n("username") }}
        </label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium text-text-primary"
        >
          {{ i18n("email") }}
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
      </div>

      <div>
        <label
          for="password"
          class="block text-sm font-medium text-text-primary"
        >
          {{ i18n("password") }}
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
      </div>

      <button
        type="submit"
        :disabled="isSubmitDisabled"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 hover:cursor-pointer"
      >
        {{ loading ? 'Working…' : buttonText }}
      </button>

      <p
        v-if="error"
        class="text-red-600 text-sm"
      >
        {{ error }}
      </p>
    </form>

    <p class="mt-4 text-sm text-gray-600">
      <span v-if="isLogin">
        {{ i18n("need_an_account") }}
        <button
          class="text-blue-600 hover:underline ml-1 hover:cursor-pointer"
          type="button"
          @click="toggleMode"
        >
          {{ i18n("register") }}
        </button>
      </span>

      <span v-else>
        {{ i18n("have_an_account") }}
        <button
          class="text-blue-600 hover:underline ml-1 hover:cursor-pointer"
          type="button"
          @click="toggleMode"
        >
          {{ i18n("login") }}
        </button>
      </span>
    </p>
  </div>
</template>
