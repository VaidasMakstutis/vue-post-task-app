import moment from "moment";

export default {
  methods: {
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("YYYY-MM-DD");
      }
    },
  },
};
