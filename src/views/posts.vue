<template>
  <div>
    <NewPost v-if="showModal" @close="showModal = false" />
    <button class="button is-primary" @click="showModal = true">
      Create New Post
    </button>
    <h1 class="posts-list">Posts</h1>
    <postCard v-bind:posts="posts" />
  </div>
</template>

<script>
import axios from "axios";
import NewPost from "../components/NewPost.vue";
import postCard from "./postCard.vue";

export default {
  name: "posts-list",
  components: {
    NewPost,
    postCard,
  },

  // state
  data() {
    return {
      posts: [],
      showModal: false,
    };
  },

  methods: {
    async fetchPosts() {
      await axios
        .get("http://localhost:3000/posts")
        .then((res) => {
          this.posts = res.data;
          // console.log("Posts[]:", this.posts);
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
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin: 25px 0;
}
</style>
