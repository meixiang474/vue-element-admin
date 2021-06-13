<template>
  <component :is="type" v-bind="linkProps">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { isExternal } from "@/utils/validate";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "SidebarItemLink",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 判断路径是不是外链
    const isExt = computed(() => isExternal(props.to));
    const type = computed(() => {
      if (isExt.value) {
        return "a";
      }
      return "router-link";
    });
    const linkProps = computed(() => {
      if (isExt.value) {
        return {
          href: props.to,
          target: "_blank",
          rel: "noopener",
        };
      }

      return {
        to: props.to,
      };
    });

    return {
      type,
      linkProps,
    };
  },
});
</script>
