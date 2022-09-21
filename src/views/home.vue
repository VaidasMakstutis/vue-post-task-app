<template>
   <div>
     <NewPost v-if="showModal" @close="showModal = false"></NewPost>
     <button class="button is-primary" @click="showModal = true">
       Create New Post
     </button>
    <h1 class="posts-list">Posts List:</h1>
  </div>
</template>

<script>
import NewPost from '../components/NewPost.vue';

export default {
  name: "posts-list",
  components: { 
      NewPost 
  },

  data() {
    return {
      showModal: false
    };
  }
};

</script>

<style>
.posts-list {
  text-align: center;
  margin-top: 25px;
}
</style>