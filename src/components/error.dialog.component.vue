<template>
  <v-dialog
      :value="isError"
      persistent
      :max-width="width"
      :retain-focus="false"
  >
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{errorMsg}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            dark
            color="red"
            @click="popError()"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'ErrorDialogComponent',
  props: {
    title: String,
    width: String,
  },
  computed: {
    ...mapState('errors',['isError','errorMsg'])
  },
  methods: {
    ...mapMutations('errors',['popError'])
  }
};
</script>

<style scoped>

</style>
