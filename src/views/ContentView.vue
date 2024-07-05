<template>
  <div id="contents">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: "contentSection",
};
</script>

<style lang="scss">
#contents {
  height: 100%;
  padding-left: 10px;
}
</style>
