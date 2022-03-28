<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div>
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
      <a @click="addNew">Add New</a>
    </div>
  </div>
</template>

<script>
import Entity from './components/Entity'

export default {
  name: 'App',
  components: {
    Entity
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
        if ( aIni > bIni ){
          return -1;
        }
        if ( aIni < bIni ){
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

</style>
