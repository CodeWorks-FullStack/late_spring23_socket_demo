<template>
  <div class="card bg-white elevation-3 text-center">
    <div class="card-body">
      <div v-if="light">
        <i v-if="!light.on" class="mdi mdi-lightbulb-variant-outline fs-1"></i>
        <i v-else class="mdi mdi-lightbulb-on fs-1"></i>
        <div class="my-2">
          <em>
            {{ light.location }}
          </em>
        </div>

      </div>
      <button v-if="currentLocation == light.location" @click="changeLightState">toggle light</button>

      <button v-else @click="enterRoom">Enter Room</button>


    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js'
import { socketService } from '../services/SocketService.js';

export default {
  props: {
    light: { type: Object, required: true }
  },
  setup(props) {
    return {
      currentLocation: computed(() => AppState.currentRoom),
      enterRoom() {
        if(AppState.currentRoom){
          socketService.emit('LEAVE_ROOM', AppState.currentRoom)
        }
          socketService.emit('ENTER_ROOM', props.light.location)
      },
      changeLightState() {
        socketService.emit('CHANGE_THE_LIGHT', AppState.currentRoom)
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
