import moment from "moment";

export default {
  methods: {
    formatDate(date) {
      if (date) {
        return moment(date).format("YYYY-MM-DD");
      }
    },
  },
};
