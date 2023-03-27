<template>
  <div v-if="currentOrg">
    <div class="current card">
      <div>
        <h1>{{currentOrg.name}}</h1>
        <h4>{{currentOrg._id}}</h4>
        <h4>SECRET:{{currentOrg.secret}}</h4>
        <ul>
          <li v-for="(team,i) in currentOrg.teams" :key="'currentOrg-team-'+i">
            {{team.name}} [{{team._id}}]
            <ul>
              <li v-for="(member,i) in team.members" :key="'currentOrg-team-'+i">
                {{member}}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <v-btn small v-on:click="unselect">Désélectioner</v-btn>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "CurrentOrgView",
  computed:{
    ...mapState('orgs',['currentOrg'])
  },
  methods:{
    ...mapMutations('orgs',['setCurrentOrg']),
    unselect(){
      this.setCurrentOrg(null)
      this.$router.push('/orgs')
    }
  }
}
</script>

<style scoped>
ul{
  text-align: left;
}
</style>