<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @input="updateValue">
      <option v-for="item in items" :key="item" :selected="item === value">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
    },
    items: {
      type: Array,
      required: true,
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
