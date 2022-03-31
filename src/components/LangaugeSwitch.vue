<template>
  <div class="locale-changer">
    <div>
      <a v-for="(lang, i) in langs" :key="`Lang${i}`" @click="switchLang(lang)">
          {{ lang }} <span v-if="i!=Object.keys(langs).length - 1">| </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['de', 'en'] }
  },
  methods:{
    switchLang($lang){
      this.$i18n.locale = $lang;
      localStorage.lang = $lang;
    }
  }
}
</script>