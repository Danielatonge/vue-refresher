<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    >
      <option v-for="item in items" :key="item" :selected="item === value">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formFieldMixin";

export default {
  mixins: [formFieldMixin],
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
