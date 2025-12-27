<script setup lang="ts">
import ShelterLogo from "../components/common/ShelterLogo.vue";
import LoadingCircle from "../components/common/LoadingCircle.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { verifyEmail } from "../utils/api/auth/verifyEmail";
import { i18n } from "../utils/i18n/i18n";
import { authStore } from "../stores/auth";

const router = useRouter();
const verificationToken = ref("");
const isVerifying = ref(true);
const isVerified = ref(false);
const errorMessage = ref<string | null>(null);

onMounted(() => {
  const hash = window.location.hash;
  if (hash) {
    const hashParams = new URLSearchParams(hash.slice(1));
    const token = hashParams.get("token");
    if (token) {
      verificationToken.value = token;
      onSubmit();
    }
  } else {
    isVerifying.value = false;
  }
});

async function onSubmit() {
  errorMessage.value = null;
  try {
    const res = await verifyEmail({
      token: verificationToken.value,
    });
    if (res.ok) {
      isVerified.value = true;
      authStore.authed = true;
    }
  } catch (_) {
    errorMessage.value = "";
  } finally {
    isVerifying.value = false;
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
        :key="isVerifying ? 'loading' : 'form'"
        class="flex items-center justify-center"
      >
        <LoadingCircle
          v-if="isVerifying"
          class="w-16 h-16 text-accent"
        />
        <div
          v-if="!isVerifying"
          class="flex flex-col gap-4 items-center"
        >
          <ul class="text-center text-text1 space-y-1">
            <li class="text-2xl font-medium">
              {{ i18n("verify", isVerified ? "verified" : "link_expired") }}
            </li>
            <li class="text-lg text-text2">
              {{ i18n("verify", isVerified ? "click_to_chat" :"login_resend") }}
            </li>
          </ul>
          <button
            class="px-4 py-2 text-lg bg-accent text-text1 cursor-pointer rounded-md hover:bg-accent/80  transition-colors duration-200"
            @click="router.replace('/')"
          >
            {{ i18n("verify", isVerified ? "chat" : "login") }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
