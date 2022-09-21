<template>
   <div>
    <!-- <button @click="$router.push('new-post')">Create New Post</button> -->
    <!-- <router-link :to="{ name: 'new-post' }"> -->
    <button class="button is-primary">
      Create New Post
    </button>
    <!-- </router-link> -->
    <h1 class="posts-list">Posts List:</h1>
  </div>
</template>

<script>
export default {
    name: 'posts-list',
}
</script>

<style>
.posts-list {
  text-align: center;
  margin-top: 25px;
}
</style>