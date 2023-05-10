<template> </template>
<script>
import auth from "@/APIs/auth";

export default {
  async beforeCreate() {
    await auth.logout();
    window.location.href = "/login";
  },
};
</script>
