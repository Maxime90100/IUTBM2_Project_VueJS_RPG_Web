<template>
  <div class="card">
    <v-btn id="btn" small @click="loadData">Obtenir la liste des {{ listName }}</v-btn>
    <v-btn small dark v-if="data.length > 0" v-on:click="show">
      <span v-if="extend">&lt; hide</span>
      <span v-else>&gt; show</span>
    </v-btn>
    <div v-if="extend">
      <div v-if="filters" class="filerList">
        <h4>Filtres</h4>
        <span v-for="(filter,i) in filterList" :key="'filter-'+i">
          <input v-model="filterListValues[i]" class="filter" :placeholder="filter">
          <span style="margin-left: 5px">{{filterListValues[i]}}</span><br>
        </span>
      </div>
      <span style="text-align: left">
        <h5>{{DATA.length}} item(s)</h5>
      </span>
      <table v-if="data.length > 0">
        <thead>
        <tr>
          <th v-for="(attr, i) in attributes" :key="'attr-th-'+i">{{attr}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, index) in DATA" :key="'data-'+index">
          <td v-for="(attr, index2) in attributes" :key="'attr-td-'+index2">
            <span v-if="i[attr]">{{i[attr]}}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListComponent',
  props:{
    listName:String,
    data:Array,
    attributes:Array,
    filters:Array
  },
  computed:{
    DATA(){
      return this.filterByKeyAndValue(this.data,this.filterList,this.filterListValues)
    }
  },
  data(){
    return{
      extend:false,
      filterList:[],
      filterListValues:[]
    }
  },
  methods:{
    show(){
      this.extend = !this.extend
    },
    loadData(){
      this.$emit('loadData')
    },
    filterByKeyAndValue(arr, filterList, filterListValues) {
      return arr.filter(obj => {
        return filterList.map((key, i) => {
          if(filterListValues[i]) {
            return obj[key].toLowerCase().startsWith(filterListValues[i].toString().toLowerCase());
          } else {
            return true;
          }
        }).every(Boolean);
      });
    }
  },
  created() {
    this.filterList = this.attributes.filter(a=>{
      return this.filters.includes(a)
    })
  }
}
</script>
<style scoped>
table{
  text-align: left;
  border: none;
}
th{
  background-color: white;
  color: #2c3e50;
  border-radius: 10px;
}
th, td {
  padding: 5px;
  text-align: left;
}
.filerList{
  text-align: left;
  padding: 10px;
  margin: 5px 0;
  background-color: #202d3a;
  border-radius: 10px;
}
.filter{
  background-color: white;
  border-radius: 20px;
  margin: 5px 2px;
}
</style>

