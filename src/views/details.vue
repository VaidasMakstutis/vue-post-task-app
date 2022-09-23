<template>
  <div class="container">
    <div class="card" v-for="post in posts" :key="post.id">
      <header class="card-header">
        <p class="card-header-title">{{ post.title }}</p>
      </header>
      <div class="card-content">
        <div class="content">Author: {{ post.author }}</div>
        <div class="content">Post content: {{ post.body }}</div>
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
        <button class="button is-success">Edit</button>
        <button class="button is-danger">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["posts"],
  mixins: [date],
};
</script>

<style></style>
