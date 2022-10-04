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
              <Notification
                v-if="notificationMsg != ''"
                :message="notificationMsg"
                :type="notificationStatus"
              />
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
                <textarea class="textarea" 
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
import axios from "axios";
import Notification from "./Notification.vue";
  
  export default {
    components: { Notification },
    props: ["item"],
    name: "EditModal",
    mixins: [date],

    data() {
      return {
        editData: {
          id: "",
          title: "",
          author: "",
          body: "",
          created_at: "",
          updated_at: "",
        },
        errors: [],
        notificationMsg: "",
        notificationStatus: "",
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
            const putPost = await axios.put("http://localhost:3000/posts/" + this.item.id,
            {
              id: this.item.id,
              title: this.item.title,
              author: this.item.author,
              body: this.item.body,
              updated_at: this.item.updated_at,
            }
            );
            this.notificationMsg = "Post has been edited succesfully!";
            this.notificationStatus = "success";
            this.$router.push({ name: "posts-list" });
            this.$emit("toggleEditModal");
            // this.$router.go();
          } catch (error) {
            console.log(error);
          }
      },
    },
    mounted() {
        this.editData = this.item;
    },
  };
  </script>
  
  <style scoped>
  .errors {
    padding: 20px;
    margin: 10px;
    background-color: #48c78e;
  }
  </style>
  