import { socketProvider } from '../SocketProvider.js'
import { SocketHandler } from '../utils/SocketHandler'


const lightState = {
  on: true
}

export class LightHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    // SECTION THIS IS THE BACKEND
    this
      .on('GET_LIGHT_STATE', this.getLightState)
      .on('CHANGE_THE_LIGHT', this.toggleLight)

  }

  getLightState() {
    this.socket.emit('LIGHT_STATE', lightState)
  }

  toggleLight() {
    lightState.on = !lightState.on
    socketProvider.message('LIGHT_STATE', lightState)
  }



}
