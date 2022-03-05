<template>
  <!--
  TODO
    - clickable Actions (attack,parade)
    - effects (overHeal)
    - duplicate entity
    - save & load with local storage => trigger in parent also triggers entities function
  -->
  <div class="entity" :class="{'active':isActive}">
    <div v-if="isEditMode" >
      <div class="editmode-controls">
        <a @click="isEditMode = !isEditMode;" style="float: right;">
          <svg width="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>lock</title><path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/></svg>
        </a>
        <a @click="$emit('remove', id)">
                <svg width="13px" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 105.7 122.88"><title>remove</title><path d="M30.46,14.57V5.22A5.18,5.18,0,0,1,32,1.55v0A5.19,5.19,0,0,1,35.68,0H70a5.22,5.22,0,0,1,3.67,1.53l0,0a5.22,5.22,0,0,1,1.53,3.67v9.35h27.08a3.36,3.36,0,0,1,3.38,3.37V29.58A3.38,3.38,0,0,1,102.32,33H98.51l-8.3,87.22a3,3,0,0,1-2.95,2.69H18.43a3,3,0,0,1-3-2.95L7.19,33H3.37A3.38,3.38,0,0,1,0,29.58V17.94a3.36,3.36,0,0,1,3.37-3.37Zm36.27,0V8.51H39v6.06ZM49.48,49.25a3.4,3.4,0,0,1,6.8,0v51.81a3.4,3.4,0,1,1-6.8,0V49.25ZM69.59,49a3.4,3.4,0,1,1,6.78.42L73,101.27a3.4,3.4,0,0,1-6.78-.43L69.59,49Zm-40.26.42A3.39,3.39,0,1,1,36.1,49l3.41,51.8a3.39,3.39,0,1,1-6.77.43L29.33,49.46ZM92.51,33.38H13.19l7.94,83.55H84.56l8-83.55Z"/></svg>
        </a>
      </div>
      <div class="editmode">
        <div>
          <label :for="getLabelIdentifier('title')">Name:</label>
          <input v-model="title" :id="getLabelIdentifier('title')" placeholder="Name ...">
        </div>
        <div>
          <label :for="getLabelIdentifier('maxHP')">Max HP:</label>
          <input v-model="maxHp" :id="getLabelIdentifier('maxHP')">
        </div>
        <div>
          <label :for="getLabelIdentifier('currentHp')">Current HP:</label>
          <input v-model="currentHp" :id="getLabelIdentifier('currentHp')" @change=" (currentHp>maxHp) ?currentHp=maxHp:currentHp">
        </div>
        <div>
          <label :for="getLabelIdentifier('ini')">INI:</label>
          <input v-model="ini" :id="getLabelIdentifier('ini')" @change="$emit('child-update',id,'ini',ini)">
        </div>
        <div>
          <label :for="getLabelIdentifier(armor)">Armor:</label>
          <input v-model="armor" :id="getLabelIdentifier('armor')">
        </div>
      </div>
    </div>
    <div v-else>
      <div class="main">
        <div class="header">
          <h3>{{ title }}</h3>
          <div class="effects"></div>
          <div class="controls">
            <a><svg width="13px" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 105.802 122.88" enable-background="new 0 0 105.802 122.88" xml:space="preserve"><title>attack</title><g><path fill-rule="evenodd" clip-rule="evenodd" d="M105.689,0H0.112v60.381c-1.824,26.659,18.714,50.316,52.789,62.499 c34.074-12.183,54.613-35.84,52.789-62.499V0L105.689,0z M52.869,8.61H9.417v48.832c-0.022,0.313-0.039,0.625-0.053,0.938h43.504 v49.557l0.142,0.052c27.313-9.715,43.927-28.454,42.962-49.646H52.869V8.61L52.869,8.61z"/></g></svg></a>
            <a @click="$emit('attack',id)"><svg width="13px" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 122.88 121.66" enable-background="new 0 0 122.88 121.66" xml:space="preserve"><title>parade</title><g><path class="st0" d="M7.21,96.55l2.84,2.84l23.32-23.32l-4-4c-3.38-3.38-4.05-8.48-2.01-12.54l7.9,7.9l66.52-66.52 c0.3-0.3,0.71-0.45,1.11-0.42L121.4,0c0.8-0.02,1.46,0.61,1.48,1.41c0,0.03,0,0.06,0,0.09h0l-0.7,18.41 c-0.01,0.38-0.17,0.72-0.42,0.97l0,0L55.24,87.41l7.05,7.05c-4.06,2.04-9.16,1.37-12.54-2.01l-4-4l-23.32,23.32l2.68,2.68 c1.64,1.64,1.64,4.33,0,5.98l0,0c-1.64,1.64-4.33,1.64-5.98,0L1.23,102.52c-1.64-1.64-1.64-4.33,0-5.98h0 C2.88,94.9,5.57,94.9,7.21,96.55L7.21,96.55z M45.22,75.4l60.91-60.91l0,0c0.56-0.56,1.48-0.57,2.05,0 c0.57,0.56,0.57,1.48,0.01,2.05l0,0l0,0L47.27,77.45l6.91,6.91l65.13-65.13l0.62-16.29l-16.49,0.43L38.31,68.49L45.22,75.4 L45.22,75.4z"/></g></svg></a>
            <a @click="isEditMode = !isEditMode;">
              <svg width="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>unlock</title><path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/></svg>
            </a>
            <a @click="$emit('remove', id)">
              <svg width="13px" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 105.7 122.88"><title>remove</title><path d="M30.46,14.57V5.22A5.18,5.18,0,0,1,32,1.55v0A5.19,5.19,0,0,1,35.68,0H70a5.22,5.22,0,0,1,3.67,1.53l0,0a5.22,5.22,0,0,1,1.53,3.67v9.35h27.08a3.36,3.36,0,0,1,3.38,3.37V29.58A3.38,3.38,0,0,1,102.32,33H98.51l-8.3,87.22a3,3,0,0,1-2.95,2.69H18.43a3,3,0,0,1-3-2.95L7.19,33H3.37A3.38,3.38,0,0,1,0,29.58V17.94a3.36,3.36,0,0,1,3.37-3.37Zm36.27,0V8.51H39v6.06ZM49.48,49.25a3.4,3.4,0,0,1,6.8,0v51.81a3.4,3.4,0,1,1-6.8,0V49.25ZM69.59,49a3.4,3.4,0,1,1,6.78.42L73,101.27a3.4,3.4,0,0,1-6.78-.43L69.59,49Zm-40.26.42A3.39,3.39,0,1,1,36.1,49l3.41,51.8a3.39,3.39,0,1,1-6.77.43L29.33,49.46ZM92.51,33.38H13.19l7.94,83.55H84.56l8-83.55Z"/></svg>
            </a>
          </div>
        </div>
        <div class="health-screen info-section">
          <span>HP:{{currentHp}}/{{maxHp}}</span>
          <div class="flex-center">
            <div class="health-bar" >
              <div class="bar" :style="{ width: currentHp/maxHp*100 + '%'}">
                <div class="hit"></div>
              </div>
            </div>
            <div class="flex-center" v-if="currentHp>0">
              <input v-model="hit" class="small-input">
              <button @click="damage()">Hit</button>
              <button @click="heal()">Heal</button>
            </div>
          </div>
        </div>
        <div class="info-section">
          <span>INI:{{ini}}</span>
        </div>
        <div class="info-section">
          <span>Armor:{{armor}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Entity",
  data() {
    return {
      maxHp: 1,
      currentHp: 1,
      ini: 0,
      title: "Entity" + this.id,
      isEditMode: true,
      hit:"",
      armor:0,
    };
  },

  props:{
    id: Number,
    wasActiveThisRound: Boolean,
    isActive: Boolean,
  },
  methods:{
    getLabelIdentifier(type){
      return type + "-" + this.id;
    },
    damage(){
      let damage = this.hit - this.armor;
      this.currentHp -= damage>0?damage:0;
      this.hit = "";
      if(this.currentHp < 0)this.currentHp=0;
    },
    heal(){
      this.currentHp += this.hit*1;
      this.hit = "";
      if(this.currentHp>this.maxHp)this.currentHp = this.maxHp;
    },
    persist(){
      console.log("Need to implement");
    }
  }
}
</script>

<style scoped>
.entity{
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
.entity.active{
  box-shadow: rgba(32, 186, 32, 0.22) 0px 14px 28px, rgba(32, 186, 32, 0.22) 0px 10px 10px;
}

.header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.health-bar {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 200px;
  height: 25px;
  padding: 5px;
  background: #ddd;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}
.bar {
  background: #c54;
  width: 100%;
  height: 15px;
  position: relative;

  transition: width .5s linear;
}

.hit {
  background: rgba(255,255,255,0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 0px;

  transition: width .5s linear;
}
.info-section{
  text-align: left;
  display: flex;
  flex-direction: column;
}
.info-section:not(:last-child){
  margin-bottom: 1em;
}

.controls{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1em;
}
.st0{
  fill-rule:evenodd;clip-rule:evenodd;
}

.flex-center{
  display: flex;
  gap: 0.5em;
  align-items: center;
}

.small-input{
  width: 15%;
}
a{
  cursor: pointer;
}
.editmode{
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0.3em;
}
.editmode > div > label{
  margin-right: 0.5em;
}
.editmode > div > input{
  width: 7em;
}
.editmode-controls{
  display: flex;
  justify-content: flex-end;
  gap: 0.3em;
}