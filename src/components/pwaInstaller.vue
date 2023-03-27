<template>
  <transition name="fade-up-in" appear>
    <div v-if="shown" style="margin: 10px 0">
      Do you want to install application ?

      <v-btn small dark color="green" class="ma-1" @click="installPWA">Yes please !</v-btn>

      <v-btn small dark color="red" class="ma-1" @click="dismissPrompt">No thanks.</v-btn>
    </div>
  </transition>
</template>


<script>
export default {
  data: () => ({
    installEvent: undefined,
    shown: false,
  }),
  beforeMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },
  methods: {
    installPWA() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt() // Hide the banner once the user's clicked
        if (choice.outcome === 'accepted') {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      })
    },
    dismissPrompt() {
      this.shown = false
    }
  }
}
</script>
