<template>
  <div class="d-flex gap-3">

    <div class="my-5 mx-2" v-for="light in lights" :key="light.id">
      <LightCard :light="light" />
    </div>



  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { onMounted } from 'vue';
import { lightHandler } from '../handlers/LightHandler.js'

export default {
  setup() {

    onMounted(() => {
      lightHandler.emit('GET_LIGHTS')
    })

    return {
      lights: computed(() => AppState.lights),
      changeLightState() {
        lightHandler.emit('CHANGE_THE_LIGHT')
      }

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
}
</style>
