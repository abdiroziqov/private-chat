<template>
  <div>
    <h1 class="text-3xl font-bold my-5 text-center">Private Chat</h1>
    <div class="flex items-baseline justify-center min-h-screen gap-5">
      <ChatMain :user="'User 1'" :tokenUser="firstToken" />
      <ChatMain :token-user="secondToken" :user="'User 2'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import ChatMain from '@/components/ChatMain.vue'

const firstToken = computed(() => import.meta.env.VITE_USER1_TOKEN)
const secondToken = computed(() => import.meta.env.VITE_USER2_TOKEN)
</script>
