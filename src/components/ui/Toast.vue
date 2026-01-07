<script setup lang="ts">
defineOptions({
  name: 'ToastNotification',
})
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-vue-next'

interface Props {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 5000,
})

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(true)

let timeoutId: ReturnType<typeof setTimeout>

onMounted(() => {
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      emit('close')
    }, props.duration)
  }
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertCircle
    default:
      return AlertCircle
  }
})

const bgColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    case 'error':
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    case 'warning':
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    default:
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
  }
})

const textColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-800 dark:text-green-200'
    case 'error':
      return 'text-red-800 dark:text-red-200'
    case 'warning':
      return 'text-yellow-800 dark:text-yellow-200'
    default:
      return 'text-blue-800 dark:text-blue-200'
  }
})

const iconColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-600 dark:text-green-400'
    case 'error':
      return 'text-red-600 dark:text-red-400'
    case 'warning':
      return 'text-yellow-600 dark:text-yellow-400'
    default:
      return 'text-blue-600 dark:text-blue-400'
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <div
      v-if="isVisible"
      class="fixed top-4 right-4 z-50 max-w-sm w-full p-4 rounded-lg border shadow-lg"
      :class="bgColor"
    >
      <div class="flex items-start">
        <component :is="icon" class="h-5 w-5 mt-0.5 flex-shrink-0" :class="iconColor" />
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium" :class="textColor">
            {{ message }}
          </p>
        </div>
        <button
          @click="emit('close')"
          class="ml-4 flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
        >
          <X class="h-4 w-4" :class="textColor" />
        </button>
      </div>
    </div>
  </Transition>
</template>
