<template>
  <div class="pagination-list">
    <a
      class="pagination-link button is-link is-outlined"
      @click="onClickFirstPage"
      :disabled="isInFirstPage"
    >
      First
    </a>

    <a
      class="pagination-link button is-link is-outlined"
      @click="onClickPreviousPage"
      :disabled="isInFirstPage"
    >
      Previous
    </a>

    <!-- Visible Buttons Start -->

    <a
      class="pagination-link"
      v-for="page in pages"
      :key="page"
      :class="{ active: isPageActive(page) }"
      @click="pageChanged(page)"
      >{{ page }}
    </a>

    <!-- Visible Buttons End -->

    <a
      class="pagination-link button is-link is-outlined"
      @click="onClickNextPage"
      :disabled="isInLastPage"
    >
      Next
    </a>

    <a
      class="pagination-link button is-link is-outlined"
      @click="onClickLastPage"
      :disabled="isInLastPage"
    >
      Last
    </a>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    perPageQty: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      current: 1,
      pages: 1,
      totalPostsQty: this.totalCount,
    };
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pageChanged", 1);
    },
    onClickLastPage() {
      this.$emit("pageChanged", this.pages);
    },
    getPerPageQty() {
      return Math.ceil(this.totalPostsQty / this.perPageQty);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
    pageChanged(page) {
      this.$emit("pageChanged", page);
    },
    onClickNextPage() {
      let page = this.current + 1;
      if (page > this.pages) {
        return;
      }
      this.current = page;
      this.pageChanged(page);
    },
    onClickPreviousPage() {
      let page = this.current - 1;
      if (page < 1) {
        return;
      }
      this.current = page;
      this.pageChanged(page);
    },
  },

  computed: {
    isInFirstPage() {
      return this.current === 1;
    },
    isInLastPage() {
      return this.current === this.pages;
    },
  },
  created() {
    this.pages = this.getPerPageQty();
  },
};
</script>

<style scoped>
.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
