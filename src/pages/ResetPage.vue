<script setup lang="ts">
import ShelterLogo from "../components/ShelterLogo.vue";
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { i18n } from "../utils/i18n/i18n";
import { resetPassword } from "../utils/api/auth/resetPassword";

const resetForm = ref<HTMLFormElement | null>(null);

const router = useRouter();
const verificationToken = ref("");
const errorMessage = ref<string | null>(null);
const resetFormIsValid = ref(false);

const checkAuthFormValidity = async () => {
  await nextTick();
  resetFormIsValid.value = resetForm.value?.checkValidity() ?? false;
};

const password = ref("");

onMounted(() => {
  const hash = window.location.hash;
  const hashParams = new URLSearchParams(hash.slice(1));
  const token = hashParams.get("token");
  if (token) {
    verificationToken.value = token;
  }
});

async function onSubmit() {
  errorMessage.value = null;
  let currentRequest;
  try {
    currentRequest = await resetPassword({
      token: verificationToken.value,
      newPassword: password.value,
    });
  } catch {
    errorMessage.value = i18n("errors", "unknown");
  } finally {
    if (currentRequest?.ok) {
      errorMessage.value = null;
      router.push("/auth");
    } else {
      errorMessage.value = i18n("errors", (currentRequest?.code ?? "unknown"));
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 justify-center items-center h-full bg-bg-tertiary">
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
          class="relative bg-bg-secondary rounded-2xl flex flex-col items-center justify-center z-10 w-fit py-8 px-12"
        >
          <h1 class="text-4xl font-bold mb-6">
            {{ "Change Your Password" }}
          </h1>
          <form
            ref="resetForm"
            class="space-y-4 w-md"
            @submit.prevent="onSubmit"
            @input="checkAuthFormValidity"
            @change="checkAuthFormValidity"
          >
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
            <button
              type="submit"
              :disabled="!resetFormIsValid"
              class="w-full bg-accent text-text-primary text-2xl font-bold py-2 rounded-sm hover:bg-accent/80 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed transition-all duration-200"
            >
              {{ "Reset Password" }}
            </button>

            <p
              v-if="errorMessage"
              class="text-red-500 -mt-2 text-sm"
            >
              {{ errorMessage }}
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>
