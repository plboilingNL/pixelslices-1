/* eslint-disable vue/attribute-hyphenation */
<template>
  <div>
    <TheHeader
      :partials="partials"
      :altLangs="altLangs"
      :menuLinks="menuLinks"
    />
    <!-- Slices block component -->
    <slice-zone
      type="page"
      :uid="$route.params.uid"
      :lang="$route.params.lang"
    />
  </div>
</template>

<script>
import SliceZone from 'vue-slicezone'

export default {
  name: 'Page',
  components: {
    SliceZone,
  },
  async asyncData({ $prismic, params, error }) {
    try {
      // Languages from API response
      const languages = $prismic.api.data.languages

      // Setting Master language as default language option
      let lang = { lang: languages[0].id }

      // If there is a langauge code in the URL set this as language option
      if (params.lang !== undefined || null) {
        lang = { lang: params.lang }
      }

      // Query to get post content
      const result = await $prismic.api.getByUID('page', params.uid, lang)

      const menuContent = (await $prismic.api.getSingle('partials', lang)).data

      return {
        // Page content, set slices as variable
        // Menu
        // partials: menuContent,
        menuLinks: menuContent.menu_links,
        altLangs: result.alternate_languages,
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    partials() {
      return this.$store.state.partials
    },
  },
  head() {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
}
</script>
