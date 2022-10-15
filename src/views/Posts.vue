<template>
  <div>
    <div class="top">
      <PostModal
        v-if="showPostModal"
        @close="showPostModal = false"
        :postData="postData"
      />
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
            @input="handleSearch"
          />
        </div>
      </div>
    </div>
    <div class="pagination-wrapper">
      <div class="pagination">
        <Pagination
          :key="totalPostsQty"
          :perPageQty="perPageQty"
          :totalCount="totalPostsQty"
          :currentPage="currentPage"
          @pageChanged="onPageChange"
        />
      </div>
    </div>
    <div class="bottom">
      <div class="posts-list-content">
        <div class="container">
          <h1 v-if="!posts.length" class="no-posts">No Posts!</h1>
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @openDeleteModal="toggleDeleteModal"
            @openEditModal="toggleEditModal"
          />
        </div>
      </div>
    </div>
    <div class="pagination-wrapper">
      <div class="pagination">
        <Pagination
          :key="totalPostsQty"
          :perPageQty="perPageQty"
          :totalCount="totalPostsQty"
          :currentPage="currentPage"
          @pageChanged="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import date from "../mixins/date";
import PostModal from "../components/PostModal.vue";
import EditModal from "../components/EditModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import Notification from "../components/Notification.vue";
import PostCard from "../components/PostCard.vue";
import Pagination from "../components/Pagination.vue";

export default {
  name: "posts-list",
  components: {
    PostModal,
    EditModal,
    DeleteModal,
    PostCard,
    Notification,
    Pagination
  },
  mixins: [date],
  // state
  data() {
    return {
      posts: [],
      searchValue: "",
      postData: {
        title: null,
        author: null,
        body: null,
        created_at: this.formatDate(date),
        updated_at: ""
      },
      notificationMsg: "",
      notificationStatus: "",
      showPostModal: false,
      showEditModal: false,
      showDeleteModal: false,
      selectedDeleteItem: null,
      selectedEditItem: null,
      currentPage: 1,
      perPageQty: 7,
      totalPostsQty: 0
    };
  },
  methods: {
    handleSearch() {
      this.currentPage = 1;
      this.getPosts();
    },
    async getPosts() {
      let query = this.searchValue ? "?q=" + this.searchValue : "";
      try {
        await axios
          .get("http://localhost:3000/posts" + query, {
            params: {
              _limit: this.perPageQty,
              _page: this.currentPage
            }
          })
          .then(res => {
            this.posts = res.data;
            this.totalPostsQty = parseInt(res.headers["x-total-count"]);
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
    onPageChange(page) {
      this.currentPage = page ? page : 1;
      this.getPosts();
    }
  },
  async created() {
    await this.getPosts();
  }
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
.no-posts {
  font-size: 30px;
  font-weight: 500;
  padding: 40px;
}
.pagination-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
</style>
