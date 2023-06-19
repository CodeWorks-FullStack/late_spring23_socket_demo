import { AppState } from '../AppState.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    // NOTE THIS IS THE FRONTEND
    this
      .on('error', this.onError)
      .on('LIGHT_STATE', this.setLightState)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  setLightState(lightState) {
    AppState.light = lightState
  }


}

export const socketService = new SocketService()
