<script setup lang="ts">
import { ref, onMounted } from "vue";
import TextInputBox from "../components/TextInputBox.vue";
import ShelterLogo from "../components/ShelterLogo.vue";
import DialogModal from "../components/DialogModal.vue";
import { login } from "../utils/api/auth/login";
import { i18n } from "../utils/i18n/i18n";
import { useRouter } from "vue-router";
import { forgotPassword } from "../utils/api/auth/forgotPassword";
import { authStore } from "../stores/auth";

const router = useRouter();

const emailbox = ref<typeof TextInputBox | null>(null);
const passwordbox = ref<typeof TextInputBox | null>(null);

const email = ref("");
const password = ref("");

const isLoading = ref(false);
const showInfoModal = ref(false);

onMounted(async () => {
  if (authStore.authed) {
    return router.replace("/channels");
  }
});

const errorMessage = ref<string | null>(null);

async function onSubmit() {
  if (!emailbox.value?.isValid()) {
    emailbox.value?.focus();
    return;
  }
  if (!passwordbox.value?.isValid()) {
    passwordbox.value?.focus();
    return;
  }

  isLoading.value = true;
  errorMessage.value = null;
  try {
    const response = await login({
      email: email.value,
      password: password.value,
    });
    isLoading.value = false;
    if (response?.ok) {
      authStore.authed = true;
      router.push("/channels");
    } else {
      errorMessage.value = i18n("errors", response.code);
    }
  } catch {
    errorMessage.value = i18n("errors", "unknown");
  }
}

async function sendResetPasswordInstructions() {
  if (!emailbox.value?.isValid()) {
    emailbox.value?.focus();
    return;
  }

  try {
    const response = await forgotPassword({
      email: email.value,
    });
    if (response.ok) {
      showInfoModal.value = true;
    } else if (response.code === "USER_NOT_FOUND") {
      emailbox.value.setErrorMessage(i18n("validation", "email_not_found"));
    } else {
      errorMessage.value = i18n("errors", response.code);
    }
  } catch {
    errorMessage.value = i18n("errors", "unknown");
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
            {{ i18n("ui", "login") }}
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
              @update:model-value="emailbox?.value.setErrorMessage(null)"
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
            <p
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
              :disabled="isLoading"
              class="w-full bg-accent text-text1 text-2xl font-bold py-2 rounded-sm hover:bg-accent/80 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed transition-all duration-200"
            >
              {{ i18n(isLoading ? "loading" : "ui", "login" ) }}
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
              {{ i18n("help", "need_an_account" ) }}
              <button
                class="text-blue-600 hover:underline ml-1 hover:cursor-pointer"
                type="button"
                @click="router.push('/register')"
              >
                {{ i18n("ui", "register") }}
              </button>
            </span>
          </p>
        </div>
      </div>
    </Transition>
    <DialogModal
      ref="infoModal"
      v-model="showInfoModal"
      :title="i18n('info', 'instructions_sent')"
      :message="i18n('info', 'reset_instructions_before_email')"
      :highlight="email"
      :message-after="i18n('info', 'reset_instructions_after_email')"
      :confirm-text="i18n('ui', 'okay')"
    />
  </div>
</template>
