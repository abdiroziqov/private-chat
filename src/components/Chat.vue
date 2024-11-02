<template>
  <div
    class="flex justify-end"
    :class="[message.sender_id == userId ? 'flex-row-reverse' : 'flex-row']"
  >
    <div
      class="bg-blue-600 w-fit py-0.5 px-3"
      :class="[
        message.sender_id == userId
          ? 'bg-[#262629] rounded-tr-xl rounded-br-lg rounded-tl-lg'
          : 'bg-[#33cd59] rounded-tl-xl rounded-bl-lg rounded-tr-lg',
      ]"
    >
      <h2 class="text-white text-right font-bold">{{ message.sender_name }}</h2>
      <p class="text-white leading-none">{{ message.message }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  message: IMessage
}>()

const userId = 27
</script>
