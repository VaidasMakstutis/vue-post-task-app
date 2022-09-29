<template>
  <div>
    <EditPost v-if="showEditModal" :item="selectedEditItem" @close="showEditModal = false" />
    <DeletePost
      v-if="showDeleteModal"
      :item="selectedDeleteItem"
      @close="showDeleteModal = false"
    />
    <div class="card-container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ item.title }}</p>
        </header>
        <div class="card-content">
          <div class="content post-content">
            {{ item.body }}
          </div>
          <div class="content">Author: {{ item.author }}</div>
          <div class="content">
            <div class="content" v-if="!item.updated_at">
              Created at: {{ formatDate(item.created_at) }}
            </div>
            <div class="content" v-if="item.updated_at">
              Updated at: {{ formatDate(item.updated_at) }}
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button class="button is-info">
            <router-link :to="{ name: 'posts-list' }">Back</router-link>
          </button>
          <button class="button is-success" @click="toggleEditModal(item)">
            Edit
          </button>
          <button class="button is-danger" @click="toggleDeleteModal(item)">
            Delete
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import date from "../mixins/date";
import axios from "axios";
import EditPost from "../components/EditPost.vue";
import DeletePost from "../components/DeletePost.vue";

export default {
  name: "detail",
  mixins: [date],
  components: { EditPost, DeletePost },

  data() {
    return {
      item: {},
      showEditModal: false,
      showDeleteModal: false,
    };
  },

  methods: {
    async getPostDetailsInfo() {
      try {
        await axios.get("http://localhost:3000/posts/" + this.$route.params.id).then((res) => {
          this.item = res.data;
          console.log("Item info:", this.item);
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
      this.selectedDeleteItem = parseInt(item.id);
      this.showDeleteModal = !this.showDeleteModal;
    },
  },

  mounted() {
    this.getPostDetailsInfo();
  },
};
</script>

<style>
.card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.post-content {
  padding: 10px;
  background-color: rgb(235, 255, 252);
}
.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
button a {
  color: #fff;
}
</style>
