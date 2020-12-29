/* eslint-disable vue/attribute-hyphenation */
<template>
  <div>
    <main class="mt-20 md:mt-24 xl:mt-24">
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
export default {
  async middleware({ store, $prismic }) {
    await store.dispatch('fetchMenu', $prismic)
  },
}
</script>
