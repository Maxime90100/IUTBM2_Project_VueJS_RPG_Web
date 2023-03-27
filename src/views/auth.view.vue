<template>
  <div>
    <div class="card">
      <h1>Authentification</h1>
      <input v-model="pwd" placeholder="Secret password">
    </div>
    <hr>
    <div v-if="login" class="card info">
      LOGIN: {{login.name}}
    </div>
    <FormComponent
        form-name="Sign in"
        :text-fields="[
          {name:'login',type:'text',required:true},
          {name:'password',type:'password',required:true}
      ]"
        send-button="sign in"
        @sendData="signIn"
    ></FormComponent>
    <div v-if="user" class="card info">
      USER: {{user}}
    </div>
    <FormComponent
        form-name="Log in"
        :text-fields="[
          {name:'login',type:'text',required:true}
      ]"
        send-button="log in"
        @sendData="logIn"
    ></FormComponent>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import FormComponent from "@/components/form.component.vue";

export default {
  name: "authenticationView",
  components:{
    FormComponent
  },
  computed:{
    ...mapState('auth',['password','login','user'])
  },
  methods:{
    ...mapMutations('auth',['setPassword']),
    ...mapActions('auth',['signIn','logIn'])
  },
  data(){
    return{
      pwd:this.password
    }
  },
  watch:{
    pwd(secret){
      this.setPassword(secret)
    }
  }
}
</script>

<style scoped>

</style>