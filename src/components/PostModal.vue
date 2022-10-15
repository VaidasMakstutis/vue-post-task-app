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
          <p class="errors" v-if="errors.length">
            <b>Please fill all required fields:</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Post title"
                v-model="data.title"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Post content</label>
            <div class="control">
              <textarea class="textarea" 
                  placeholder="Post content"
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
                placeholder="Post author"
                v-model="data.author"
              />
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-primary" @click="formValidation()">
          Create
        </button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["postData"],

  data() {
    return {
      data: {
        title: this.postData.title,
        author: this.postData.author,
        body: this.postData.body,
        created_at: this.postData.created_at,
        updated_at: 0,
      },
      errors: [],
    };
  },

  methods: {

    formValidation() {
      const letters  = /^[a-zA-Z]+$/;
      this.errors = [];

      if (this.data.title && this.data.author && this.data.author.match(letters) && this.data.body) {
        this.submitNewPost(this.data);
      }
      if (!this.data.title) {
        this.errors.push("Title is required");
      }
      if (!this.data.body) {
        this.errors.push("Content is required");
      }
      if (!this.data.author) {
        this.errors.push("Author is required");
      } else if (!this.data.author.match(letters)) {
        this.errors.push("Only letters are acceptable for author");
        return;
      }
    },

    async submitNewPost(item) {
      try {
        await axios.post(this.$baseURL + "/posts", item)
          .then(() => {
            this.$router.go();
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.errors {
  padding: 20px;
  margin: 10px;
  background-color: #FFCCCB;
}

</style>
