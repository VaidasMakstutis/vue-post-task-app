<template>
  <div>
    <div class="top">
      <NewPost v-if="showPostModal" @close="showPostModal = false" :postData="postData" />
      <EditPost v-if="showEditModal" :item="selectedEditItem" @close="showEditModal = false" />
      <DeletePost
        v-if="showDeleteModal"
        :item="selectedDeleteItem"
        @close="showDeleteModal = false"
      />
      <button class="button is-primary" @click="showPostModal = true">
        Create New Post
      </button>
      <div class="level-item">
        <div class="field has-addons">
          <input
            class="input"
            type="text"
            placeholder="Find a post"
            v-model="searchValue"
            @input="getPosts"
          />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div v-if="!posts.length">
        <span class="no-created-posts">No posts!</span>
      </div>
      <div class="posts-list-content">
        <div class="container">
          <postCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @openDeleteModal="toggleDeleteModal"
            @openEditModal="toggleEditModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewPost from "../components/NewPost.vue";
import EditPost from "../components/EditPost.vue";
import DeletePost from "../components/DeletePost.vue";
import postCard from "./postCard.vue";

export default {
  name: "posts-list",
  components: {
    NewPost,
    EditPost,
    DeletePost,
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
        created_at: new Date(),
        updated_at: "",
      },
      showPostModal: false,
      showEditModal: false,
      showDeleteModal: false,
      selectedDeleteItem: null,
      selectedEditItem: null,
    };
  },

  methods: {
    async getPosts() {
      let query = this.searchValue ? "?q=" + this.searchValue : "";
      try {
        await axios.get("http://localhost:3000/posts" + query).then((res) => {
          this.posts = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    toggleEditModal(item) {
      this.selectedEditItem = item;
      this.showEditModal = !this.showEditModal;
    },
    toggleDeleteModal(item) {
      this.selectedDeleteItem = parseInt(item);
      this.showDeleteModal = !this.showDeleteModal;
    },
  },

  mounted() {
    this.getPosts();
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
.level-item {
  margin-left: 5px;
}
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}
.posts-list-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.no-created-posts {
  font-size: 30px;
  font-weight: 500;
  margin-top: 40px;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
