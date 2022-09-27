<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <article class="message is-primary">
          <div class="message-header">
            {{ postInfo.title }}
          </div>
          <div class="message-body">
            {{ postInfo.body }}
          </div>
        </article>
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
        <button class="button is-success">Edit</button>
        <button class="button is-danger">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script>
import date from "../mixins/date";
import axios from "axios";

export default {
  mixins: [date],

  data() {
    return {
      postInfo: {},
    };
  },

  methods: {
    async getPostDetailsInfo() {
      try {
        await axios.get("http://localhost:3000/posts/" + this.$route.params.id).then((res) => {
          this.postInfo = res.data;
          console.log("Post info:", this.postInfo);
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
.message-header {
  font-size: 20px;
}
.card-content {
  padding: 20px;
}

.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
