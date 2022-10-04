<template>
  <div>
    <div class="page-not-found-number">404</div>
    <div class="page-not-found-text">
      <div>Oops! We couldn't find this page</div>
      <div>
        Please come back to the <router-link :to="{ name: 'posts-list' }">home page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>

<style scoped>
.page-not-found-number {
  font-size: 80px;
  font-weight: 700;
}
.page-not-found-text {
  font-size: 20px;
  font-weight: 400;
}
</style>
