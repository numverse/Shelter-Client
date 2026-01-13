<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    scrollRoot: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
  },
  emits: ["show", "hidden"],
  data() {
    const skeletonMessages = new Array(10).fill(null).map(() => {
      const lineCount = Math.floor(Math.random() * 3) + 1;
      const lines = [];
      for (let i = 0; i < lineCount; i++) {
        const widthPercent = Math.floor(Math.random() * 50) + 50;
        lines.push(`${widthPercent}%`);
      }
      return {
        nameWidth: `${Math.floor(Math.random() * 150) + 50}px`,
        lines,
      };
    });

    return {
      skeletonMessages,
      observer: null as IntersectionObserver | null,
      observerOptions: {
        rootMargin: "200px 0px",
        threshold: 0.15,
      },
    };
  },
  watch: {
    scrollRoot() {
      this.resetObserver();
      this.createObserver();
    },
  },
  mounted() {
    this.createObserver();
  },
  beforeUnmount() {
    this.resetObserver();
  },
  methods: {
    createObserver() {
      const observerElement = this.$refs.observerElement as HTMLElement;
      if (!observerElement) return;
      const options = {
        ...this.observerOptions,
        root: this.scrollRoot || null,
      };
      this.observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          this.$emit("show");
        } else {
          this.$emit("hidden");
        }
      }, options);
      this.observer.observe(observerElement);
    },
    resetObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    },
  },
};
</script>
<template>
  <div
    ref="observerElement"
    class="flex flex-col gap-4 p-4"
  >
    <div
      v-for="(msg, index) in skeletonMessages"
      :key="index"
      class="flex gap-3 animate-pulse"
    >
      <!-- Avatar -->
      <div class="rounded-full bg-bg3 shrink-0 w-12 h-12" />

      <!-- Content -->
      <div class="flex flex-col gap-2 flex-1">
        <!-- Username and timestamp -->
        <div class="flex items-center gap-2">
          <div
            class="h-4 bg-bg3 rounded"
            :style="{ width: `${msg.nameWidth}` }"
          />
          <div class="h-3 w-12 bg-bg3 rounded opacity-50" />
        </div>

        <!-- Message lines -->
        <div class="flex flex-col gap-1.5">
          <div
            v-for="(lineWidth, lineIndex) in msg.lines"
            :key="lineIndex"
            class="h-4 bg-bg3 rounded"
            :style="{ width: `${lineWidth}` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
