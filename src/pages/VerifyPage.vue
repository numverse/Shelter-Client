<script setup lang="ts">
import ShelterLogo from "../components/ShelterLogo.vue";
import LoadingCircle from "../components/LoadingCircle.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { verifyEmail } from "../utils/api/auth/verifyEmail";
import { i18n } from "../utils/i18n/i18n";

const router = useRouter();
const verificationToken = ref("");
const isVerifying = ref(true);
const errorMessage = ref<string | null>(null);

onMounted(() => {
  const hash = window.location.hash;
  if (hash) {
    const hashParams = new URLSearchParams(hash.slice(1));
    const token = hashParams.get("token");
    // history.replaceState(null, "", window.location.pathname);
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
    if (res.ok)
      router.replace("/");
  } catch (_) {
    errorMessage.value = "";
  } finally {
    isVerifying.value = false;
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
        :key="isVerifying ? 'loading' : 'form'"
        class="flex items-center justify-center"
      >
        <LoadingCircle
          v-if="isVerifying"
          class="w-16 h-16 text-accent animate-spin"
        />
        <div
          v-if="!isVerifying"
          class="flex flex-col gap-4 items-center"
        >
          <ul class="text-center text-text-primary space-y-1">
            <li class="text-lg font-medium">
              {{ i18n("verify", "link_expired") }}
            </li>
            <li class="text-sm text-text-secondary">
              {{ i18n("verify", "login_resend") }}
            </li>
          </ul>
          <button
            class="px-4 py-2 bg-accent text-white rounded hover:bg-accent-hover transition"
            @click="router.replace('/login')"
          >
            {{ i18n("verify", "login") }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
