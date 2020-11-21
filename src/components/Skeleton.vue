<template>
  <div>
    <div class="skeleton-paragraphs">
      <sl-skeleton></sl-skeleton>
      <sl-skeleton></sl-skeleton>
      <sl-skeleton></sl-skeleton>
      <sl-skeleton></sl-skeleton>
      <sl-skeleton></sl-skeleton>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.skeleton-paragraphs sl-skeleton {
  margin-bottom: 1rem;
}

.skeleton-paragraphs sl-skeleton:nth-child(2) {
  width: 95%;
}

.skeleton-paragraphs sl-skeleton:nth-child(4) {
  width: 90%;
}

.skeleton-paragraphs sl-skeleton:last-child {
  width: 50%;
}
</style>
