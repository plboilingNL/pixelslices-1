<template>
  <header
    ref="header"
    class="top-0 left-0 z-40 flex items-center justify-between w-full px-6 py-5 md:py-6 md:px-8 xl:px-20"
  >
    <nuxt-link to="/" class="flex items-center" aria-label="home">
      <prismic-image
        v-if="partials.logo_image"
        :field="partials.logo_image"
        class="w-auto h-8 mr-4 md:h-12"
      />
      <span class="text-2xl uppercase text-contrast md:text-3xl font-display">{{
        partials.logo_text
      }}</span>
    </nuxt-link>
    <nav>
      <ul>
        <li v-for="menuLink in menuLinks" :key="menuLink.id">
          <prismic-link :field="menuLink.link">{{
            $prismic.asText(menuLink.label)
          }}</prismic-link>
        </li>
        <li v-for="altLang in altLangs" :key="altLang.id">
          <nuxt-link :to="$prismic.linkResolver(altLang)">
            <span
              :class="'flag-icon flag-icon-' + altLang.lang.slice(-2)"
            ></span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <client-only>
      <ThemeSwitch v-if="$colorMode" />
    </client-only>
  </header>
</template>

<script>
import Headroom from 'headroom.js'

export default {
  props: {
    partials: {
      type: Object,
      required: true,
    },
    altLangs: {
      type: Array,
      required: true,
      default() {
        return {}
      },
    },
    menuLinks: {
      type: Array,
      required: true,
      default() {
        return {}
      },
    },
  },
  mounted() {
    const header = this.$refs.header
    const headroom = new Headroom(header, { offset: 0 })
    headroom.init()
  },
  methods: {
    toogleMenu() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="postcss" scoped>
.headroom {
  @apply fixed transition-all duration-300;
}

.headroom--unpinned {
  @apply opacity-100 bg-theme-op;
  backdrop-filter: blur(16px);
}

.headroom--pinned {
  @apply opacity-100 bg-theme-op;
  backdrop-filter: blur(16px);
}

.headroom--top {
  @apply bg-transparent;
  backdrop-filter: blur(0);
}

.sb-show-main .headroom--top {
  @apply bg-theme-tint;
}
</style>
