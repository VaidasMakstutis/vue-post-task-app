<template>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Post</p>
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
                  v-model="editData.title"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Post content</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Post content"
                  v-model="editData.body"
                />
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button type="submit" class="button is-success" @click="formValidation()">
            Save changes
          </button>
          <button class="button" @click="$emit('close')">Cancel</button>
        </footer>
      </div>
    </div>
  </template>
  
  <script>

import date from "../mixins/date";
  
  export default {
    name: "EditPost",
    props: {id: Number},
    mixins: [date],
    data() {
      return {
        editData: {
          id: Number,
          title: "",
          body: "",
          author: "",
          created_at: "",
          updated_at: 0,
        },
        errors: [],
      };
    },
  
    methods: {
      formValidation() {
        this.errors = [];
  
        if (this.editData.title && this.editData.body) {
          this.submitEditPost(this.editData);
        }
        if (!this.editData.title) {
          this.errors.push("Name is required");
        }
        if (!this.editData.body) {
          this.errors.push("Content is required");
        }
      },
  
      async submitEditPost() {
        try {
            this.editData.updated_at = new Date();
            await axios.put(`http://localhost:3000/posts/$id`, data).then((res) => {
              console.log("Edit modal data:", res);
              this.editData.id,
              this.editData
            });
            this.$emit("toggleEditModal");
            this.$router.go();
        } catch (error) {
          console.log(error);
        }
      },
    },
    mounted() {
        this.editData = this.id;
    }
  };
  </script>
  
  <style>
  .errors {
    padding: 20px;
    margin: 10px;
    background-color: #48c78e;
  }
  </style>
  