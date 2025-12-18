<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import TextInputBox from "../components/TextInputBox.vue";
import ShelterLogo from "../components/ShelterLogo.vue";
import { login } from "../utils/api/auth/login";
import { register } from "../utils/api/auth/register";
import { i18n } from "../utils/i18n";
import enUS from "../locales/en-US.json";

const authForm = ref<HTMLFormElement | null>(null);

const isLogin = ref(true);
const isLoading = ref(false);
const authFormIsValid = ref(false);

const checkAuthFormValidity = async () => {
  await nextTick();
  authFormIsValid.value = authForm.value?.checkValidity() ?? false;
};

const username = ref("");
const email = ref("");
const password = ref("");

const errorMessage = ref<string | null>(null);

const canSubmit = computed(() => {
  return !isLoading.value && authFormIsValid.value;
});

async function onSubmit() {
  isLoading.value = true;
  errorMessage.value = null;
  let currentRequest;
  try {
    if (isLogin.value) {
      currentRequest = await login({
        email: email.value,
        password: password.value,
      });
    } else {
      currentRequest = await register({
        username: username.value,
        email: email.value,
        password: password.value,
      });
    }
  } catch {
    errorMessage.value = i18n("unknown_error");
  } finally {
    if (currentRequest?.ok) {
      errorMessage.value = null;
    } else {
      errorMessage.value = i18n((currentRequest?.code ?? "unknown_error").toLowerCase() as keyof typeof enUS);
    }
    isLoading.value = false;
  }
}

function toggleMode() {
  isLogin.value = !isLogin.value;
  errorMessage.value = null;
  username.value = "";
  email.value = "";
  password.value = "";
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full bg-bg-tertiary">
    <ShelterLogo />
    <div class="relative bg-bg-secondary rounded-2xl flex flex-col items-center justify-center z-10 w-fit py-8 px-12">
      <h1 class="text-4xl font-bold mb-6">
        {{ isLogin ? i18n("login") : i18n("register") }}
      </h1>
      <form
        ref="authForm"
        class="space-y-4 w-md"
        @submit.prevent="onSubmit"
        @input="checkAuthFormValidity"
        @change="checkAuthFormValidity"
      >
        <TextInputBox
          v-if="!isLogin"
          id="username"
          v-model="username"
          :label="i18n('username')"
          type="text"
          :placeholder="i18n('username_placeholder')"
          :minlength="2"
          :maxlength="32"
          :required="true"
        />
        <TextInputBox
          id="email"
          v-model="email"
          :label="i18n('email')"
          type="email"
          :placeholder="i18n('email_placeholder')"
          :required="true"
        />
        <TextInputBox
          id="password"
          v-model="password"
          :label="i18n('password')"
          type="password"
          :placeholder="i18n('password_placeholder')"
          :minlength="6"
          :maxlength="64"
          :required="true"
        />
        <button
          type="submit"
          :disabled="!canSubmit"
          class="w-full bg-accent text-text-primary text-xl font-bold py-2 rounded-sm hover:bg-accent/80 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed transition-all duration-200"
        >
          {{ isLogin ? isLoading ? i18n("login_loading") : i18n("login") : isLoading ? i18n("register_loading") : i18n("register") }}
        </button>

        <p
          v-if="errorMessage"
          class="text-red-500 -mt-2 text-sm"
        >
          {{ errorMessage }}
        </p>
      </form>

      <p class="mt-4 text-sm text-text-secondary">
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
  </div>
</template>
