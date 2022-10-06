<template>
  <ul class="pagination-list">
    <li class="pagination-item">
      <button
        type="button"
        class="button is-link is-outlined"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        First
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        class="button is-link is-outlined"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        Previous
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li v-for="page in pages" :key="page" class="pagination-item">
      <button
        type="button"
        class="button is-link"
        :class="{ active: isPageActive(page) }"
        @click="pageChanged(page)"
        :disabled="page.isDisabled"
      >
        {{ page }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <button
        type="button"
        class="button is-link is-outlined"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        class="button is-link is-outlined"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        Last
      </button>
    </li>
  </ul>
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
      console.log("Qty of pages:", Math.ceil(this.totalPostsQty / this.perPageQty));
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
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.pages;
    },
  },
  created() {
    this.pages = this.getPerPageQty();
  },
};
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
button {
  margin: 5px;
}
</style>
