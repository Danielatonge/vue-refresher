<template>
  <div>
    <button v-on="$listeners" v-bind="$attrs" :class="buttonClass">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
 
<style lang="scss" scoped></style>
