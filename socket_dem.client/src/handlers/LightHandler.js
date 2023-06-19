import { AppState } from "../AppState.js";
import { SocketHandler } from "../utils/SocketHandler.js";

class LightHandler extends SocketHandler {

  constructor() {
    super()
    this
      .on('LIGHTS', this.setLights)
      .on('LIGHT_STATE', this.setLightState)
      .on('ENTERED_ROOM', this.setCurrentRoom)
  }


  setLights(lights) {
    AppState.lights = lights
  }

  setLightState(light) {
    const i = AppState.lights.findIndex(l => l.location == light.location)

    AppState.lights.splice(i, 1, light)
  }

  setCurrentRoom(roomName) {
    AppState.currentRoom = roomName
  }

}

export const lightHandler = new LightHandler()
