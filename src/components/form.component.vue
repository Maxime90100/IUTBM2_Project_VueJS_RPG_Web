<template>
  <div class="card">
    <h2>{{ formName }}</h2>
    <span v-if="extend"><v-btn x-small dark v-on:click="show">&lt; hide</v-btn></span>
    <span v-else><v-btn x-small v-on:click="show">&gt; show</v-btn></span>

    <hr>
    <div v-if="extend">
      <div v-for="(tf,index) in textFields" :key="'Form-textField-'+index">
        <h3>
          {{tf.name}}
          <b v-if="tf.required">*</b>
        </h3>
        <div v-if="tf.type === 'add'" class="item">
          <div v-for="(item,i) in tf.components" :key="'Form-textField-item-'+i">
            <h5>{{item.name}}</h5>
            <input :id="formName+'-item-'+item.name" :name="item.name" :type="item.type" :min="item.min" :max="item.max" :value="item.value" :class="'required-'+item.required">
          </div>
          <v-btn small rounded v-on:click="add(tf,index)">+Add</v-btn>
          <ul>
            <li v-for="(item,i) in addItems" :key="'Form-textField-list-item-'+i">
              {{item}}
              <v-btn x-small dark v-on:click="supress(i)">Delete</v-btn>
            </li>
          </ul>
        </div>
        <span v-else>
        <input :id="formName+'-id-'+index" :type="tf.type" :value="tf.value">
      </span>
      </div>
      <v-btn small style="margin: 5px 0" v-on:click="sendData">{{ sendButton }}</v-btn>
      <h6>Les champs marqués d'un * sont obligatoires</h6>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "FormComponent",
  props:{
    formName:String,
    textFields:Array,
    sendButton:String
  },
  data(){
    return{
      addItems:[],
      extend:false
    }
  },
  methods:{
    ...mapMutations('events',['pushEvent']),
    show(){
      this.extend = !this.extend
    },
    add(tf,index){
      let object = {}
      let check = true

      tf.components.forEach(item=>{
        const name = item.name
        const input = document.getElementById(this.formName+'-item-'+item.name)
        input.style.borderColor = "white"
        let value = input.value
        const required = input.classList.contains('required-true')

        if(!value){
          value = null
          if(required){
            check = false
            input.style.borderColor = "red"
          }
        }

        if(item.type === 'number' && (value<item.min || value>item.max)){
          check = false
          input.style.borderColor = "red"
          this.pushEvent({message:`"${name}" must be between ${item.min} and ${item.max}`})
        }
        object[name] = value
      });

      if(check){
        object['_id'] = index
        this.addItems.push(object)
      }
    },
    supress(index){
      this.addItems.splice(index,1)
    },
    sendData(){
      let response = {}
      let check = true
      let emptyInputs = []

      this.textFields.forEach((tf,index)=>{
        let value

        if(tf.type !== 'add'){
          value = document.getElementById(`${this.formName}-id-${index}`).value
          if(tf.required === true && !value){
            check = false
            emptyInputs.push(tf.name)
          }
        }

        else{
          value = this.addItems.filter(item=>item._id === index)
          if(value.length > 0) delete value[0]._id
          if(tf.required === true && value.length === 0){
            check = false
            emptyInputs.push(tf.name)
          }
        }

        response[tf.name] = value
      })

      if(check) this.$emit('sendData',response)
      else this.pushEvent({message:`"${emptyInputs.toString()}" required !`})
    }
  }
}
</script>

<style scoped>
input{
  background-color: white;
  border: 2px solid white;
  border-radius: 10px;
  width: 100%;
  height: 30px;
}
div{
  text-align: left;
}
.item{
  padding: 5px 20px 10px 20px;
  background-color: #4b6986;
  border-radius: 10px;
}
.item > div{
  margin-bottom: 5px;
}
</style>