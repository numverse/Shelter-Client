<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue";
import TextInputBox from "../components/TextInputBox.vue";
import ShelterLogo from "../components/ShelterLogo.vue";
import { login } from "../utils/api/auth/login";
import { register } from "../utils/api/auth/register";
import { i18n } from "../utils/i18n/i18n";
import { useRouter } from "vue-router";
import LoadingCircle from "../components/LoadingCircle.vue";
import { forgotPassword } from "../utils/api/auth/forgotPassword";

import { authStore } from "../stores/auth";
const router = useRouter();

const authForm = ref<HTMLFormElement | null>(null);

const isLogin = ref(true);
const isLoading = ref(false);
const isCheckingAuth = ref(true);
const authFormIsValid = ref(false);

onMounted(async () => {
  const authed = await authStore.checkAuthed();
  setTimeout(() => {
    if (authed) {
      return router.replace("/channels");
    } else {
      isCheckingAuth.value = false;
    }
  }, 300);
});

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
    errorMessage.value = i18n("errors", "unknown");
  } finally {
    isLoading.value = false;
    if (currentRequest?.ok) {
      errorMessage.value = null;
      router.push("/channels");
    } else {
      errorMessage.value = i18n("errors", (currentRequest?.code ?? "unknown"));
    }
  }
}

function toggleMode() {
  isLogin.value = !isLogin.value;
  errorMessage.value = null;
  username.value = "";
  email.value = "";
  password.value = "";
}

async function sendResetPasswordInstructions() {
  if (email.value === "" || !/\S+@\S+\.\S+/.test(email.value)) {
    const input = document.getElementById("email");
    (input as HTMLInputElement | null)?.focus();
  } else {
    const response = await forgotPassword({
      email: email.value,
    });
    if (response.ok) {
      alert("Reset password instructions have been sent to your email.");
    } else {
      errorMessage.value = i18n("errors", (response?.code ?? "unknown"));
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 justify-center items-center h-full bg-bg3">
    <ShelterLogo />
    <Transition
      name="fade"
      mode="out-in"
      appear
    >
      <div
        :key="isCheckingAuth ? 'loading' : 'form'"
        class="flex items-center justify-center"
      >
        <LoadingCircle
          v-if="isCheckingAuth"
          class="w-16 h-16 text-accent animate-spin"
        />
        <div
          v-if="!isCheckingAuth"
          class="relative bg-bg2 rounded-2xl flex flex-col items-center justify-center z-10 w-fit py-8 px-12"
        >
          <h1 class="text-4xl font-bold mb-6">
            {{ isLogin ? i18n("ui", "login") : i18n("ui", "register") }}
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
              :label="i18n('ui', 'username')"
              type="text"
              :placeholder="i18n('placeholders', 'username')"
              :minlength="2"
              :maxlength="32"
              :required="true"
            />
            <TextInputBox
              id="email"
              v-model="email"
              :label="i18n('ui', 'email')"
              type="email"
              :placeholder="i18n('placeholders', 'email')"
              :required="true"
              :autofocus="true"
            />
            <TextInputBox
              id="password"
              v-model="password"
              :label="i18n('ui', 'password')"
              type="password"
              :placeholder="i18n('placeholders', 'password')"
              :minlength="6"
              :maxlength="64"
              :required="true"
            />
            <p
              v-if="isLogin"
              class="mt-3 text-base text-text2"
            >
              <span>
                <button
                  class="text-blue-600 hover:underline ml-1 hover:cursor-pointer"
                  type="button"
                  @click="sendResetPasswordInstructions"
                >
                  {{ i18n("help", "forgot_password") }}
                </button>
              </span>
            </p>
            <button
              type="submit"
              :disabled="!canSubmit"
              class="w-full bg-accent text-text1 text-2xl font-bold py-2 rounded-sm hover:bg-accent/80 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed transition-all duration-200"
            >
              {{ i18n(isLoading ? "loading" : "ui", isLogin ? "login" : "register") }}
            </button>

            <p
              v-if="errorMessage"
              class="text-red-500 -mt-2 text-sm"
            >
              {{ errorMessage }}
            </p>
          </form>

          <p class="mt-3 text-base text-text2">
            <span>
              {{ i18n("help", isLogin ? "need_an_account" : "have_an_account") }}
              <button
                class="text-blue-600 hover:underline ml-1 hover:cursor-pointer"
                type="button"
                @click="toggleMode"
              >
                {{ i18n("ui", isLogin ? "register" : "login") }}
              </button>
            </span>
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
