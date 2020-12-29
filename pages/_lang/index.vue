/* eslint-disable vue/attribute-hyphenation */
<template>
  <div>
    <TheHeader
      :partials="partials"
      :alt-langs="altLangs"
      :menu-links="menuLinks"
    />
    <!-- Vue tag to add header component -->
    <slice-zone type="page" uid="home" />
  </div>
</template>

<script>
// Imports for all components
import SliceZone from 'vue-slicezone'

export default {
  name: 'Home',
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

      // Query to get the home page content
      const result = await $prismic.api.getSingle('homepage', lang)

      const menuContent = (await $prismic.api.getSingle('partials', lang)).data

      return {
        // partials: menuContent,
        // Menu
        menuLinks: menuContent.menu_links,
        altLangs: result.alternate_languages,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
}
</script>
