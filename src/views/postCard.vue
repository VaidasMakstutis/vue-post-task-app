<template>
  <div class="container">
    <div v-if="!posts.length"><span class="no-created-posts">No created posts!</span></div>
    <div class="card-container">
      <div class="card" v-for="post in posts" :key="post.id">
        <header class="card-header">
          <p class="card-header-title">{{ post.title }}</p>
        </header>
        <div class="card-content">
          <div class="content">Author: {{ post.author }}</div>
          <div class="content">
            <div class="content" v-if="!post.updated_at">
              Created at: {{ formatDate(post.created_at) }}
            </div>
            <div class="content" v-if="post.updated_at">
              Updated at: {{ formatDate(post.updated_at) }}
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <router-link :to="getPostDetails(post.id)">
            <button class="button is-info">Details</button>
          </router-link>
          <button class="button is-success">Edit</button>
          <button class="button is-danger">Delete</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import date from "../mixins/date";
import { ROUTE_NAME } from "@/router/index.js";

export default {
  props: ["posts"],
  mixins: [date],
  name: "detail",
  methods: {
    getPostDetails(id) {
      return { name: ROUTE_NAME.DETAILS, params: { id: id } };
    },
  },
};
</script>

<style>
.no-created-posts {
  font-size: 30px;
  font-weight: 500;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 15px;
}
.card-header {
  background-color: #00d1b2;
  font-size: 20px;
}
.card-header-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-footer {
  padding: 5px;
}
button {
  margin: 5px;
}
</style>
