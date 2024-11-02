<template>
  <div class="w-[360px] h-[660px] bg-black rounded-3xl overflow-hidden">
    <div>
      <div
        class="h-[90px] w-full bg-[#121212] text-white font-bold text-center text-2xl flex items-center justify-center"
      >
        {{ user }}
      </div>

      <div class="h-[510px] w-full px-3 space-y-2">
        <Chat
          v-for="message in messages"
          :key="message?.sender_id"
          :message
          :userId="memberId"
        />
      </div>

      <div class="flex items-center gap-2 overflow-y-auto px-2.5">
        <input
          type="text"
          v-model="message"
          placeholder="Enter your message"
          class="w-full bg-transparent border rounded-full outline-none text-white font-bold p-2 pl-3"
          @keydown.enter="send"
        />
        <button
          @click="send"
          class="text-white border font-bold py-2 px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Chat from '@/components/Chat.vue'
import { useChat } from '@/composables/useChat'

const props = defineProps<{
  user: string
  tokenUser: string
}>()

const message = ref('')
const { sendEvent, messages, memberId } = useChat(props.tokenUser)

function send(e: Event) {
  if (e) e.preventDefault()
  if (!message.value) return

  sendEvent('send_message_to_chat', {
    chat_room_id: 2,
    message: message.value,
    reply_message: null,
  })
  message.value = ''
}
</script>
