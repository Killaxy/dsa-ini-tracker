<template>
  <label :for="getLabelIdentifier('title')"></label>
</template>

<script>
export default {
  name: "VueInput",
  props:{
    value:{
      required:false
    }
  },
  watch:{
    currentValue(){
      return this.value;
    }
  },
  methods:{
    getLabelIdentifier(type){
      return type + "-" + this.id;
    }
  }
}
</script>

<style scoped>

</style>