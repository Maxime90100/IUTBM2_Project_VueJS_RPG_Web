<template>
  <div v-if="currentHero">
    <div class="current card">
      <h1>{{currentHero.publicName}} ({{currentHero.realName}})</h1>
      <h4>{{currentHero._id}}</h4>
      <ul>
        <li v-for="(power,i) in currentHero.powers" :key="'currentHero-power-'+i">
          {{power}}
        </li>
      </ul>
      <v-btn small v-on:click="unselect">Désélectioner</v-btn>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "CurrentHeroView",
  computed: {
    ...mapState('heroes',['currentHero'])
  },
  methods: {
    ...mapMutations('heroes',['setCurrentHero']),
    unselect() {
      this.setCurrentHero(null)
      this.$router.push('/heroes')
    }
  }
}
</script>

<style scoped>
ul {
  text-align: left;
}
</style>