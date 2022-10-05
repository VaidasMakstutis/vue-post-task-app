<template>
  <div>
    <div class="top">
      <PostModal v-if="showPostModal" @close="showPostModal = false" :postData="postData" />
      <EditModal
        v-if="showEditModal"
        :item="selectedEditItem"
        @close="showEditModal = false"
        @openEditModal="toggleEditModal"
        @closeNotification="closeNotification()"
      />
      <DeleteModal
        v-if="showDeleteModal"
        :item="selectedDeleteItem"
        @close="showDeleteModal = false"
        @openDeleteModal="toggleDeleteModal"
        @closeNotification="closeNotification()"
      />
      <Notification
        v-if="notificationMsg != ''"
        :message="notificationMsg"
        :type="notificationStatus"
        @closeNotification="closeNotification()"
      />
      <button class="button is-primary" @click="showPostModal = true">
        New Post
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
import PostModal from "../components/PostModal.vue";
import EditModal from "../components/EditModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import Notification from "../components/Notification.vue";
import PostCard from "./PostCard.vue";
export default {
  name: "posts-list",
  components: {
    PostModal,
    EditModal,
    DeleteModal,
    PostCard,
    Notification,
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
      notificationMsg: "",
      notificationStatus: "",
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

<style scoped>
.top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.level-item {
  margin-left: 8px;
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
