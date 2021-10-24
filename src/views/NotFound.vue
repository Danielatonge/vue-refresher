<template>
  <div>
    <div>NOT FOUND</div>
    <div>The {{ missen }} you are looking for isn't here</div>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
