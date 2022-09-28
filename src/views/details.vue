<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{ postInfo.title }}</p>
      </header>
      <div class="card-content">
        <div class="content post-content">
          {{ postInfo.body }}
        </div>
        <div class="content">Author: {{ postInfo.author }}</div>
        <div class="content">
          <div class="content" v-if="!postInfo.updated_at">
            Created at: {{ formatDate(postInfo.created_at) }}
          </div>
          <div class="content" v-if="postInfo.updated_at">
            Updated at: {{ formatDate(postInfo.updated_at) }}
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button class="button is-success">
          Edit
        </button>
        <button class="button is-danger">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script>
import date from "../mixins/date";
import axios from "axios";
import EditPost from "../components/EditPost.vue";
import DeletePost from "../components/DeletePost.vue";

export default {
  mixins: [date],
  components: { EditPost, DeletePost },

  data() {
    return {
      postInfo: {},
      selectedPost: null,
    };
  },

  methods: {
    async getPostDetailsInfo() {
      try {
        await axios.get("http://localhost:3000/posts/" + this.$route.params.id).then((res) => {
          this.postInfo = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getPostDetailsInfo();
  },
};
</script>

<style>
.container {
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
</style>
