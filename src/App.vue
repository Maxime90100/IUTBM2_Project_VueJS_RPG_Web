<template>
  <div id="app">
    <v-app>

      <pwa-installer></pwa-installer>

      <ErrorDialogComponent
          title="Error"
          width="500"
      ></ErrorDialogComponent>

      <EventDialogComponent
          title="Message"
          :text="eventMessage"
          :show="isEvent"
          :cancellable="eventCancellable"
          width="500"
          @closeDialog="closeDialog"
      ></EventDialogComponent>

      <v-app-bar
          app
          dark
      >
        <table>
          <tr>
            <td v-for="(btn,i) in btns" :key="'btns-'+i">
              <v-btn v-on:click="goTo(btn.path)">{{btn.title}}</v-btn>
            </td>
          </tr>
        </table>

        <span v-if="password">
          SECRET: {{password}}
        </span>
      </v-app-bar>

      <v-main>
        <router-view name="central"/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import ErrorDialogComponent from "@/components/error.dialog.component.vue";
import EventDialogComponent from "@/components/event.dialog.component.vue";
import {mapMutations, mapState} from "vuex";
import PwaInstaller from "@/components/pwaInstaller.vue";
export default {
  name: 'App',
  components:{
    PwaInstaller,
    ErrorDialogComponent,
    EventDialogComponent
  },
  computed:{
    ...mapState('events',['isEvent','eventMessage','eventCancellable']),
    ...mapState('auth',['password'])
  },
  data: () => ({
    index:-1,
    btns:[
      {title:'Heroes',path:'/heroes'},
      {title:'Teams',path:'/teams'},
      {title:'Organisations',path:'/orgs'},
      {title:'Authentication',path:'/auth'}
    ]
  }),
  methods: {
    ...mapMutations('events',['popEvent']),
    goTo(path) {
      this.$router.push(path)
    },
    closeDialog(bool){
      this.popEvent()
      if(!bool){
        //TODO
      }
    }
  },
  mounted() {
    this.$store.watch(
        state => state.message,
        data => alert(data)
    )
  }
}
</script>

<style scoped>
table{
  margin: 10px auto;
  text-align: center;
}
</style>
