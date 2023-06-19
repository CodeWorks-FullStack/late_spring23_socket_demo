<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-white rounded elevation-3">

      <div v-if="light">
        <i v-if="!light.on" class="mdi mdi-lightbulb-variant-outline fs-1"></i>
        <i v-else class="mdi mdi-lightbulb-on fs-1"></i>
      </div>
      <button @click="changeLightState">toggle light</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { socketService } from '../services/SocketService.js';
import { AppState } from '../AppState.js';
import { onMounted } from 'vue';

export default {
  setup() {

    onMounted(() => {
      socketService.emit('GET_LIGHT_STATE')
    })

    return {
      light: computed(() => AppState.light),
      changeLightState() {
        socketService.emit('CHANGE_THE_LIGHT')
      }

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
