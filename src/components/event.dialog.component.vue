<template>
  <v-dialog
      :value="show"
      persistent
      :max-width="width"
      :retain-focus="false"
  >
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{text}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            dark
            color="green darken-1"
            @click="$emit('closeDialog', true)"
        >
          Ok
        </v-btn>
        <v-btn
            v-if="cancellable"
            dark
            color="warning"
            @click="$emit('closeDialog', false)"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>

export default {
  name: 'EventDialogComponent',
  props: {
    title: String,
    text: String,
    width: String,
    show: Boolean,
    cancellable:Boolean
  },
};
</script>
