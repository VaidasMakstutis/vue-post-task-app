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
    props: {
      item: {
       type: Object
      }
    },
    name: "EditModal",
    mixins: [date],

    data() {
      return {
        editData: {
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
          this.errors.push("Title is required");
        }
        if (!this.editData.body) {
          this.errors.push("Content is required");
        }
      },
  
      async submitEditPost() {
        try {
            this.editData.updated_at = this.formatDate(date);
            await axios.put(this.$baseURL + "posts/" + this.item.id, this.item).then(() => {
              this.notificationMsg = "Post has been edited succesfully!";
              this.notificationStatus = "is-success";
              setTimeout(() => {
                if (this.$router.currentRoute.name == "details") {
                  this.$router.push({ name: "posts-list" });
                } else {
                  this.$router.go();
                }
              }, 1000);
              this.$emit("toggleEditModal");
            });
        } catch (error) {
           this.notificationMsg = "Something went wrong. Please try it again!";
           this.notificationStatus = "is-success";
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
    background-color: #FFCCCB;
  }
  </style>
  