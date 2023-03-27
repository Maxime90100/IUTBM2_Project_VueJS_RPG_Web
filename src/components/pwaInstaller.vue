<template>
  <transition name="fade-up-in" appear>
    <div v-if="shown"
    >
      Add app to home screen?

      <button @click="installPWA">Install!</button>

      <button @click="dismissPrompt">
        <span>Dismiss without installing</span>
      </button>
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
