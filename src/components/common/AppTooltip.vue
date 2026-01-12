<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: "top",
    validator: (value: string) => ["top", "bottom", "left", "right"].includes(value),
  },
});

const visible = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const bubbleRef = ref<HTMLElement | null>(null);
const tooltipPosition = ref({
  top: 0,
  left: 0,
});

const bubbleClass = computed(() => [
  "fixed",
  "whitespace-nowrap",
  "bg-bg3",
  "text-white",
  "text-sm",
  "font-normal",
  "rounded-md",
  "border",
  "border-bg4",
  "px-2.5",
  "py-1.5",
  "shadow-lg",
  "opacity-95",
  "transition-opacity",
  "duration-150",
  "flex",
  "items-center",
  "justify-center",
].join(" "));

const arrowClass = computed(() => {
  const classes = [
    "absolute",
    "w-3",
    "h-3",
    "bg-bg3",
    "border-bg4",
    "rotate-45",
    "transition-opacity",
    "duration-150",
  ];

  switch (props.position) {
    case "bottom":
      return classes.concat(["rounded-tl border-t border-l"]).join(" ");
    case "left":
      return classes.concat(["rounded-tr border-t border-r"]).join(" ");
    case "right":
      return classes.concat(["rounded-bl border-b border-l"]).join(" ");
    default:
      return classes.concat(["rounded-br border-b border-r"]).join(" ");
  }
});

const tooltipStyle = computed(() => ({
  top: `${tooltipPosition.value.top}px`,
  left: `${tooltipPosition.value.left}px`,
}));

const arrowStyle = computed(() => {
  switch (props.position) {
    case "bottom":
      return {
        top: "-6px",
      };
    case "left":
      return {
        right: "-6px",
      };
    case "right":
      return {
        left: "-6px",
      };
    default:
      return {
        bottom: "-6px",
      };
  }
});

const clampValue = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const updatePosition = () => {
  if (!triggerRef.value || !bubbleRef.value) {
    return;
  }

  const rect = triggerRef.value.getBoundingClientRect();
  const bubbleRect = bubbleRef.value.getBoundingClientRect();
  const gap = 8;
  let top = 0;
  let left = 0;

  switch (props.position) {
    case "bottom":
      top = rect.bottom + gap;
      left = rect.left + rect.width / 2 - bubbleRect.width / 2;
      break;
    case "left":
      top = rect.top + rect.height / 2 - bubbleRect.height / 2;
      left = rect.left - bubbleRect.width - gap;
      break;
    case "right":
      top = rect.top + rect.height / 2 - bubbleRect.height / 2;
      left = rect.right + gap;
      break;
    default:
      top = rect.top - bubbleRect.height - gap;
      left = rect.left + rect.width / 2 - bubbleRect.width / 2;
      break;
  }

  const maxTop = window.innerHeight - bubbleRect.height - 8;
  const maxLeft = window.innerWidth - bubbleRect.width - 8;

  tooltipPosition.value.top = clampValue(top, 8, maxTop);
  tooltipPosition.value.left = clampValue(left, 8, maxLeft);
};

const syncPosition = () => {
  if (visible.value) {
    updatePosition();
  }
};

const handleMouseEnter = () => {
  visible.value = true;
  nextTick(updatePosition);
};

const handleMouseLeave = () => {
  visible.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", syncPosition, true);
  window.addEventListener("resize", syncPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", syncPosition, true);
  window.removeEventListener("resize", syncPosition);
});
</script>

<template>
  <div
    ref="triggerRef"
    class="relative inline-flex"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="bubbleRef"
      :class="bubbleClass"
      :style="tooltipStyle"
    >
      {{ text }}
      <span
        :class="arrowClass"
        :style="arrowStyle"
        aria-hidden="false"
      />
    </div>
  </Teleport>
</template>
