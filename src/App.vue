<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div>
    <h1>{{ $t('title') }}</h1>
    <div class="intro" style="margin-bottom: 0;text-align: right ">
      <Lang/>
    </div>
    <div class="intro">
      <p>
        {{ $t("description.first") }}
        <br/>
        {{ $t("description.second") }}
      </p>
      <a href='https://ko-fi.com/C0C3BLUJ9' target='_blank'>
        <img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' />
      </a>
      <p v-html="$t('description.third', {target: 'https://github.com/Killaxy/dsa-ini-tracker', text: 'Github' })">
      </p>
    </div>
    <div class="controls"></div>
    <div class="body-wrapper">
      <div v-for="item in entities" :key="item.id">
        <Entity :id="item.id"
                :is-active="item.isActive"
                :was-active-this-round="item.wasActive"
                class="entity-wrapper"
                @remove="removeEntity"
                @child-update="updateChild"
                @resort="resortEntities"
                @attack="attack"
        />
      </div>
      <div class="game-controls">
        <a @click="addNew">Add New Player/Monster</a>
      </div>
    </div>
  </div>
</template>

<script>
import Entity from './components/Entity'
import Lang from './components/LangaugeSwitch.vue'

export default {
  name: 'App',
  components: {
    Entity,
    Lang
  },
  data(){
    return {
      entities: [],
      lastId: 0,
    }
  },
  methods: {
    addNew() {
      const entity = {
        id: this.lastId,
        isActive: this.lastId === 0,
        wasActive: false,
      };
      this.lastId++;
      this.entities.push(entity);
    },
    removeEntity(id){
      for (let i = 0; i < this.entities.length; i++) {
        if(this.entities[i].id === id){
          if(this.entities[i].isActive&&this.entities[i+1]!==undefined)this.entities[i+1].isActive = true;
          this.entities.splice(i,1);
          break;
        }
      }
    },
    updateChild(id,prop,value){
      for (let i = 0; i < this.entities.length; i++) {
        if(this.entities[i].id === id){
          this.entities[i][prop] = value;
          break;
        }
      }
    },
    resortEntities(){
      this.entities.sort(function (a,b){
        const aIni = a.ini ?? 0
        const bIni = b.ini ?? 0
        if ( aIni*1 > bIni*1 ){
          return -1;
        }
        if ( aIni*1 < bIni*1 ){
          return 1;
        }
        return 0;
      });
    },
    attack(id){
      for (let i = 0; i < this.entities.length; i++) {
        if(this.entities[i].id === id){
          this.entities[i].isActive = false;
          this.entities[i].wasActive = true;
          this.entities[(i+1)%this.entities.length].isActive = true
          break;
        }
      }
    },
    persist(){
      console.log("Need to implement");
      for (let i = 0; i < this.entities.length; i++) {
        this.entities[i].persist();
      }
    }
  }
}
</script>

<style>
body{
  background: #ebe2d3;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.body-wrapper{
  display: grid;
  grid-gap: 2em;
  margin: auto;
}
@media only screen and (min-width: 425px) {
  .body-wrapper{
    width: 90%;
  }
}
@media only screen and (min-width: 600px) {
  .body-wrapper{
    grid-template-columns: 50% 50%;
  }
}
@media only screen and (min-width: 1024px) {
  .body-wrapper{
    grid-template-columns: 33% 33% 33%;
  }
}
a{
  cursor: pointer;
}
.intro{
  text-align: left;
  width: 80%;
  margin: auto;
  margin-bottom: 4em;
}
.game-controls a{
    border: solid black;
    border-radius: 20px;
    padding: 7px;
    background: lightgreen;
}
.game-controls{
  margin-top: 1em;
}
</style>
