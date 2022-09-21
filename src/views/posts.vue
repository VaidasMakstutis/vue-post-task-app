<template>
  <div>
    <NewPost v-if="showModal" @close="showModal = false"></NewPost>
    <button class="button is-primary" @click="showModal = true">
      Create New Post
    </button>
    <h1 class="posts-list">Posts List:</h1>
  </div>
</template>

<script>
import axios from "axios";
import NewPost from "../components/NewPost.vue";

export default {
  name: "posts-list",
  components: {
    NewPost,
  },

  data() {
    return {
      showModal: false,
    };
  },

  methods: {
    async fetchPosts() {
      await axios
        .get("http://localhost:3000/posts")
        .then((res) => {
          console.log(res.data), (this.name = res.data);
        })
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.fetchPosts("http://localhost:3000/posts");
  },
};
</script>

<style>
.posts-list {
  border: 1px solid green;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-top: 25px;
}
</style>
