<template>
  <div>
    <EditModal
      v-if="showEditModal"
      :item="selectedItem"
      @close="showEditModal = false"
      @openEditModal="toggleDeleteModal"
    />
    <DeleteModal
      v-if="showDeleteModal"
      :item="selectedItem"
      @close="showDeleteModal = false"
      @openDeleteModal="toggleDeleteModal"
    />
    <Notification
      v-if="notificationMsg != ''"
      :message="notificationMsg"
      :type="notificationStatus"
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
            <div class="content updated" v-if="item.updated_at">
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
import EditModal from "../components/EditModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import Notification from "../components/Notification.vue";
export default {
  name: "detail",
  mixins: [date],
  components: { EditModal, DeleteModal, Notification },
  data() {
    return {
      item: {},
      showEditModal: false,
      showDeleteModal: false,
      notificationMsg: "",
      notificationStatus: "",
      selectedItem: null
    };
  },
  methods: {
    async getPostDetailsInfo() {
      try {
        await axios
          .get(this.$baseURL + "posts/" + this.$route.params.id)
          .then(res => {
            this.item = res.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    toggleEditModal(item) {
      this.selectedItem = item;
      this.showEditModal = !this.showEditModal;
    },
    toggleDeleteModal(item) {
      this.selectedItem = item.id;
      this.showDeleteModal = !this.showDeleteModal;
    }
  },
  mounted() {
    this.getPostDetailsInfo();
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.card {
  margin: 15px;
}
.card-header {
  background-color: #00d1b2;
  font-size: 20px;
}
.card-header-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.post-content {
  padding: 5px;
  background-color: rgb(235, 255, 252);
  border-radius: 5%;
}
.updated {
  padding: 5px;
  background-color: #48c78e;
  color: #fff;
  border-radius: 5%;
}
.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
button {
  margin: 5px;
}
button a {
  color: #fff;
}
</style>
