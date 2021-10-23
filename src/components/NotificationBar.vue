<template>
  <div class="notificaiton-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    },
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  data() {
    return {
      timeout: null,
    };
  },
  methods: mapActions("notification", ["remove"]),
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
