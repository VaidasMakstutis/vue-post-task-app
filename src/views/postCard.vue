<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ post.title }}</p>
    </header>
    <div class="card-content">
      <div class="content">Author: {{ post.author }}</div>
      <div class="content">
        <div class="content" v-if="!post.updated_at">
          Created at: {{ formatDate(post.created_at) }}
        </div>
        <div class="content" v-if="post.updated_at">
          Updated at: {{ formatDate(post.updated_at) }}
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="getPostDetails(post.id)">
        <button class="button is-info">
          Details
        </button>
      </router-link>
      <button class="button is-success" @click="toggleEditModal()">
        Edit
      </button>
      <button class="button is-danger" @click="toggleDeleteModal()">
        Delete
      </button>
    </footer>
  </div>
</template>

<script>
import date from "../mixins/date";

export default {
  props: ["post"],
  mixins: [date],
  name: "detail",

  data() {
    return {};
  },

  methods: {
    getPostDetails(id) {
      return { name: "details", params: { id: id } };
    },
    toggleEditModal() {
      this.$emit("openEditModal", this.post);
    },
    toggleDeleteModal() {
      this.$emit("openDeleteModal", this.post.id);
      // console.log("This post id:", this.post.id);
    },
  },
};
</script>

<style scoped>
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
.card-footer {
  padding: 5px;
}
button {
  margin: 5px;
}
</style>
