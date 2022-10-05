<template>
  <article :class="['message is-success', type]">
    <div class="notification is-success">
      <div class="notification-body">
        {{ message }}
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "info",
    },
    message: {
      type: String,
      default: "information",
    },
  },
  data() {
    return {
      notification: this.message,
      alertClass: this.type,
    };
  },
};
</script>

<style scoped></style>
