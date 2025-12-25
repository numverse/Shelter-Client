// NOT IMPLEMENTED IN THE API YET
import { ref } from "vue";

const dmStore = {
  dms: ref<string[]>([]),
  currentDM: ref<string | null>(null),
};

export { dmStore };
