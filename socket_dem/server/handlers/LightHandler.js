import { socketProvider } from '../SocketProvider.js'
import { SocketHandler } from '../utils/SocketHandler'

const lights = [{
  on: false,
  location: 'kitchen'
}, {
  on: true,
  location: 'hallway'
}, {
  on: false,
  location: 'master'
}, {
  on: true,
  location: 'bathroom'
}]


export class LightHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    // SECTION THIS IS THE BACKEND
    this
      .on('GET_LIGHTS', this.getLights)
      .on('CHANGE_THE_LIGHT', this.toggleLight)
      .on('ENTER_ROOM', this.enterRoom)
      .on('LEAVE_ROOM', this.leaveRoom)

  }

  getLights() {
    this.socket.emit('LIGHTS', lights)
  }

  toggleLight(location) {

    const light = lights.find(l => l.location == location)
    light.on = !light.on

    socketProvider.messageRoom(location, 'LIGHT_STATE', light)
  }

  enterRoom(roomName){
    this.socket.join(roomName)
    this.socket.emit('ENTERED_ROOM', roomName)

  }
  leaveRoom(roomName){
    this.socket.leave(roomName)
    this.socket.emit('YOU_LEFT', roomName)

  }



}
