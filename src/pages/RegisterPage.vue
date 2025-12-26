<script setup lang="ts">
import { ref, onMounted } from "vue";
import TextInputBox from "../components/TextInputBox.vue";
import ShelterLogo from "../components/ShelterLogo.vue";
import { register } from "../utils/api/auth/register";
import { i18n } from "../utils/i18n/i18n";
import { useRouter } from "vue-router";

import { authStore } from "../stores/auth";
import { checkUsernameTaken } from "../utils/api/users/checkUsernameTaken";
const router = useRouter();

const usernamePattern = /^[A-Za-z0-9_.,]+$/;

const usernamebox = ref<typeof TextInputBox | null>(null);
const emailbox = ref<typeof TextInputBox | null>(null);
const passwordbox = ref<typeof TextInputBox | null>(null);

const email = ref("");
const displayName = ref("");
const username = ref("");
const password = ref("");

const isLoading = ref(false);

const errorMessage = ref<string | null>(null);

onMounted(async () => {
  if (authStore.authed) {
    return router.replace("/channels");
  }
});

async function onSubmit() {
  if (!emailbox.value?.isValid()) {
    emailbox.value?.input.value.focus();
    return;
  }
  if (!usernamebox.value?.isValid()) {
    usernamebox.value?.input.value.focus();
    return;
  }
  if (!passwordbox.value?.isValid()) {
    passwordbox.value?.input.value.focus();
    return;
  }

  isLoading.value = true;
  errorMessage.value = null;
  let currentRequest;
  try {
    currentRequest = await register({
      username: username.value,
      email: email.value,
      password: password.value,
    });
  } catch {
    errorMessage.value = i18n("errors", "unknown");
  } finally {
    isLoading.value = false;
    if (currentRequest?.ok) {
      authStore.authed = true;
      router.push("/channels");
    } else {
      errorMessage.value = i18n("errors", (currentRequest?.code ?? "unknown"));
    }
  }
}

async function setUsernameErrorMessage(v: string | undefined) {
  if (v) {
    if (!usernamePattern.test(v)) {
      return usernamebox.value?.setErrorMessage(
        i18n("validation", "username"),
      );
    }
  }
  return usernamebox.value?.setErrorMessage(undefined);
}

async function checkUsernameAvailability() {
  if (usernamebox.value && usernamebox.value.isValid()) {
    const response = await checkUsernameTaken(username.value);
    if (response.ok) {
      if (response.taken) {
        usernamebox.value.setErrorMessage(i18n("validation", "username_taken"));
      } else {
        usernamebox.value.setErrorMessage(null);
      }
    } else {
      usernamebox.value.setErrorMessage(i18n("errors", "unknown"));
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
        :key="'form'"
        class="flex items-center justify-center"
      >
        <div
          class="relative bg-bg2 rounded-2xl flex flex-col items-center justify-center z-10 w-fit py-8 px-12"
        >
          <h1 class="text-4xl font-bold mb-6">
            {{ i18n("ui", "register") }}
          </h1>
          <form
            ref="authForm"
            class="space-y-4 w-md"
            @submit.prevent="onSubmit"
          >
            <TextInputBox
              id="email"
              ref="emailbox"
              v-model="email"
              :label="i18n('ui', 'email')"
              type="email"
              :placeholder="i18n('placeholders', 'email')"
              :required="true"
              :autofocus="true"
            />
            <TextInputBox
              id="displayName"
              v-model="displayName"
              :label="i18n('ui', 'displayName')"
              type="text"
              :placeholder="i18n('placeholders', 'displayName')"
              :minlength="2"
              :maxlength="32"
              :required="false"
            />
            <TextInputBox
              id="username"
              ref="usernamebox"
              v-model="username"
              :label="i18n('ui', 'username')"
              type="text"
              :placeholder="i18n('placeholders', 'username')"
              :minlength="2"
              :maxlength="32"
              :required="true"
              :pattern="usernamePattern"
              @update:model-value="setUsernameErrorMessage"
              @blur="() => checkUsernameAvailability()"
            />
            <TextInputBox
              id="password"
              ref="passwordbox"
              v-model="password"
              :label="i18n('ui', 'password')"
              type="password"
              :placeholder="i18n('placeholders', 'password')"
              :minlength="6"
              :maxlength="64"
              :required="true"
            />
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-accent text-text1 text-2xl font-bold py-2 rounded-sm hover:bg-accent/80 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed transition-all duration-200"
            >
              {{ i18n(isLoading ? "loading" : "ui", "register") }}
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
              {{ i18n("help", "have_an_account") }}
              <button
                class="text-blue-600 hover:underline ml-1 hover:cursor-pointer"
                type="button"
                @click="router.push('/login')"
              >
                {{ i18n("ui", "login") }}
              </button>
            </span>
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
