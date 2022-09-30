<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure that you want to delete this post?</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <p>
        <Notification
          v-if="notificationMsg != ''"
          :message="notificationMsg"
          :type="notificationStatus"
        />
      </p>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="$emit('delete-post', item)">
          Confirm delete
        </button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Notification from "./Notification.vue";
import postCard from "../views/postCard.vue";

export default {
  components: { Notification, postCard },
  name: "DeletePost",
  props: { item: Number },
  data() {
    return {
      notificationMsg: "",
      notificationStatus: "",
    };
  },
};
</script>

<style scoped></style>
