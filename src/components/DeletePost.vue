<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure that you want to delete this post?</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-success" @click="confirmDeletePost()">
          Confirm delete
        </button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DeletePost",
  props: { item: Number },
  data() {
    return {};
  },
  methods: {
    async confirmDeletePost() {
      try {
        await axios.delete("http://localhost:3000/posts/" + this.item).then((res) => {
          return res.data;
        });
        this.$emit("toggleDeleteModal");
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
