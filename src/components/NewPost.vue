<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Post</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <form @submit="$emit('submit', $event)">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Please enter post title"
                v-model="postData.title"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Author</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Please enter post author"
                v-model="postData.author"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Post content</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Please enter post content"
                v-model="postData.body"
              />
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-success">Submit</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postData"],
  // postModalData: {
  //   type: Function,
  // },
};
</script>

<style></style>
