import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    // NOTE THIS IS THE FRONTEND
    this
      .on('error', this.onError)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

}

export const socketService = new SocketService()
