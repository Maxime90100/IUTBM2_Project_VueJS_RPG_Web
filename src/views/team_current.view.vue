<template>
  <div v-if="currentTeam">
    <div class="current card">
      <h1>{{currentTeam.name}}</h1>
      <h4>{{currentTeam._id}}</h4>
      <h4>NBAFFILIATIONS:{{currentTeam.nbAffiliations}}</h4>
      <v-btn small v-on:click="unselect">Désélectioner</v-btn>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "CurrentTeamView",
  computed:{
    ...mapState('teams',['currentTeam'])
  },
  methods:{
    ...mapMutations('teams',['setCurrentTeam']),
    unselect(){
      this.setCurrentTeam(null)
      this.$router.push('/teams')
    }
  }
}
</script>

<style scoped>
ul{
  text-align: left;
}
</style>