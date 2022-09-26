<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Post</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <form>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Please enter post title"
                v-model="data.title"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Post content</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Please enter post content"
                v-model="data.body"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Author</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Please enter post author"
                v-model="data.author"
              />
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-success" @click="postModalData(data)">
          Submit
        </button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import date from "../mixins/date";

export default {
  props: ["postData"],
  mixins: [date],

  data() {
    return {
      data: {
        title: this.postData.title,
        author: this.postData.author,
        body: this.postData.body,
        created_at: new Date(),
        updated_at: 0,
      },
    };
  },

  methods: {
    async postModalData(item) {
      await axios
        .post("http://localhost:3000/posts", item)
        .then(() => {
          this.$router.go();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
