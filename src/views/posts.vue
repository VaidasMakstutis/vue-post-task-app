<template>
  <div>
    <div class="container top">
      <NewPost v-if="showModal" @close="showModal = false" :postData="postData" />
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
        <postCard :posts="posts" />
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
      postData: {
        title: null,
        author: null,
        body: null,
        created_at: new Date(),
        updated_at: 0,
      },
      searchValue: "",
      showModal: false,
    };
  },

  methods: {
    async fetchPosts() {
      await axios
        .get("http://localhost:3000/posts")
        .then((res) => {
          this.posts = res.data;
          console.log("Initial:", this.posts);
        })
        .catch((error) => console.log(error));
    },
  },

  computed: {
    async searchPosts() {
      if (this.searchValue) {
        await axios
          .get("http://localhost:3000/posts?q=" + this.searchValue)
          .then((res) => {
            this.posts = res.data;
            console.log("Searched posts:", this.posts);
          })
          .catch((error) => console.log(error));
      }
    },
  },

  mounted() {
    this.fetchPosts();
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
