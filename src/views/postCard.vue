<template>
  <div class="container">
    <div class="card" v-for="post in posts" :key="post.id">
      <header class="card-header">
        <p class="card-header-title">{{ post.title }}</p>
      </header>
      <div class="card-content">
        <div class="content">{{ post.body }}</div>
      </div>
      <footer class="card-footer">
        <button class="button is-success">Edit</button>
        <button class="button is-danger">Delete</button>
        <button class="button is-info">Details</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["posts"],
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 15px;
}
.card-header {
  background-color: #00d1b2;
}
.card-header-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  margin: 5px;
}
</style>
