import { onMounted, onUnmounted, Ref, ref } from 'vue'

type TMessage = {
  action: string
  payload: any
}

interface UseChatOptions {
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

export function useChat(token: string, options: UseChatOptions = {}) {
  const { reconnectInterval = 5000, maxReconnectAttempts = 5 } = options

  const socket: Ref<WebSocket | null> = ref(null)
  const messages = ref<IMessage[]>([])
  const isConnected = ref(false)
  const reconnectAttempts = ref(0)
  const memberId = ref<number>(0)

  const connect = () => {
    if (reconnectAttempts.value >= maxReconnectAttempts) {
      console.warn('Max reconnect attempts reached.')
      return
    }

    socket.value = new WebSocket(`ws://5.182.26.58:4321/ws/web?token=${token}`)

    socket.value.onopen = () => {
      isConnected.value = true
      reconnectAttempts.value = 0 // Reset attempts after a successful connection
      sendEvent('get_private_chat_message', { chat_room_id: 2 })
      sendEvent('get_private_chat_list', { chat_room_id: 2 })
    }

    socket.value.onmessage = (event) => {
      let eventData = JSON.parse(event.data)
      const { data, action } = eventData
      if (action === 'get_private_chat_list') {
        memberId.value = eventData?.results[0]?.member?.id
        console.log('member id: ', memberId.value)
      }
      if (action === 'send_message_to_chat') {
        messages.value.push(data)
      }
      console.log('Message received:', data)
    }

    socket.value.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    socket.value.onclose = () => {
      isConnected.value = false
      console.log('WebSocket connection closed')
      attemptReconnect()
    }
  }

  const attemptReconnect = () => {
    reconnectAttempts.value += 1
    setTimeout(connect, reconnectInterval)
  }

  const sendEvent = (
    action: TMessage['action'],
    payload: TMessage['payload'],
  ) => {
    if (socket.value && isConnected.value) {
      const message = { action, payload }
      socket.value.send(JSON.stringify(message))
    }
  }

  onMounted(connect)

  onUnmounted(() => {
    if (socket.value) {
      socket.value.close()
      socket.value = null
    }
  })

  return {
    sendEvent,
    messages,
    isConnected,
    memberId,
  }
}
