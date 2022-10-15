<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Are you sure that you want to delete this post?
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <p>
        <Notification
          v-if="notificationMsg != ''"
          :message="notificationMsg"
          :type="notificationStatus"
        />
      </p>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="submitDeletePost()">
          Confirm delete
        </button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Notification from "./Notification.vue";
import axios from "axios";

export default {
  components: { Notification },
  name: "DeleteModal",
  props: { item: Number },
  data() {
    return {
      notificationMsg: "",
      notificationStatus: ""
    };
  },
  methods: {
    async submitDeletePost() {
      try {
        await axios.delete(this.$baseURL + "posts/" + this.item).then(() => {
          this.notificationMsg = "Post has been edited succesfully!";
          this.notificationStatus = "is-success";
          setTimeout(() => {
            if (this.$router.currentRoute.name == "details") {
              this.$router.push({ name: "posts-list" });
            } else {
              this.$router.go();
            }
          }, 1000);
          this.$emit("toggleDeleteModal");
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped></style>
