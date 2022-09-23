<template>
  <div>
    <div class="container top">
      <NewPost
        v-if="showModal"
        @close="showModal = false"
        :postData="postData"
        :v-on:submit="postModalData"
      />
      <button class="button is-primary" @click="showModal = true">
        Create New Post
      </button>
      <div class="level-item">
        <div class="field has-addons">
          <input class="input" type="text" v-model="searchValue" placeholder="Find a post" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="posts-list-content">
        <postCard :posts="filteredPosts" />
      </div>
    </div>
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
      searchValue: "",
      postData: {
        title: null,
        author: null,
        body: null,
      },
      showModal: false,
    };
  },

  methods: {
    async fetchPosts() {
      await axios
        .get("http://localhost:3000/posts")
        .then((res) => {
          this.posts = res.data;
        })
        .catch((error) => console.log(error));
    },
    async postModalData() {
      await axios
        .post("http://localhost:3000/posts")
        .then((res) => {
          this.postData = res.data;
        })
        .catch((error) => console.log(error));
    },
  },

  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return (
          post.title.toLowerCase().match(this.searchValue) ||
          post.author.toLowerCase().match(this.searchValue) ||
          post.body.toLowerCase().match(this.searchValue)
        );
      });
    },
  },

  mounted() {
    this.fetchPosts("http://localhost:3000/posts");
  },
};
</script>

<style>
.top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.posts-list-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
