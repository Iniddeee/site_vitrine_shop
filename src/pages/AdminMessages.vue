<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Mail, MailOpen, Clock, CheckCircle, XCircle } from 'lucide-vue-next'

interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  device: string
  issue: string
  message: string
  status: 'new' | 'read' | 'answered' | 'archived'
  created_at: string
  updated_at: string
}

defineOptions({
  name: 'AdminMessages',
})

const messages = ref<Message[]>([])
const loading = ref(true)
const selectedMessage = ref<Message | null>(null)

const fetchMessages = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/messages')
    messages.value = await response.json()
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}

const updateStatus = async (messageId: string, status: string) => {
  try {
    await fetch(`http://localhost:3001/api/messages/${messageId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })

    const message = messages.value.find(m => m.id === messageId)
    if (message) message.status = status
  } catch (error) {
    console.error('Erreur:', error)
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'new': return Mail
    case 'read': return MailOpen
    case 'answered': return CheckCircle
    case 'archived': return XCircle
    default: return Clock
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'text-blue-600 bg-blue-100'
    case 'read': return 'text-yellow-600 bg-yellow-100'
    case 'answered': return 'text-green-600 bg-green-100'
    case 'archived': return 'text-gray-600 bg-gray-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('fr-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(fetchMessages)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Messages des clients
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Liste messages -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="font-semibold text-gray-900 dark:text-white">
                {{ messages.length }} message{{ messages.length > 1 ? 's' : '' }}
              </h2>
            </div>

            <div class="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
              <div
                v-for="message in messages"
                :key="message.id"
                @click="selectedMessage = message"
                class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                :class="{ 'bg-primary-50 dark:bg-primary-900/20': selectedMessage?.id === message.id }"
              >
                <div class="flex items-start justify-between mb-2">
                  <h3 class="font-medium text-gray-900 dark:text-white truncate">
                    {{ message.name }}
                  </h3>
                  <span
                    :class="getStatusColor(message.status)"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  >
                    <component :is="getStatusIcon(message.status)" class="w-3 h-3 mr-1" />
                    {{ message.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {{ message.subject }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {{ formatDate(message.created_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Détail message -->
        <div class="lg:col-span-2">
          <div v-if="selectedMessage" class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-start justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {{ selectedMessage.name }}
                  </h2>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {{ selectedMessage.email }}
                  </p>
                  <p v-if="selectedMessage.phone" class="text-sm text-gray-600 dark:text-gray-400">
                    {{ selectedMessage.phone }}
                  </p>
                </div>

                <select
                  :value="selectedMessage.status"
                  @change="updateStatus(selectedMessage.id, ($event.target as HTMLSelectElement).value)"
                  class="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="new">Nouveau</option>
                  <option value="read">Lu</option>
                  <option value="answered">Répondu</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </div>

            <div class="p-6">
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Type</p>
                  <p class="text-gray-900 dark:text-white capitalize">{{ selectedMessage.subject }}</p>
                </div>
                <div v-if="selectedMessage.device">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Appareil</p>
                  <p class="text-gray-900 dark:text-white">{{ selectedMessage.device }}</p>
                </div>
                <div v-if="selectedMessage.issue">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Problème</p>
                  <p class="text-gray-900 dark:text-white">{{ selectedMessage.issue }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Date</p>
                  <p class="text-gray-900 dark:text-white">{{ formatDate(selectedMessage.created_at) }}</p>
                </div>
              </div>

              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</p>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p class="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {{ selectedMessage.message }}
                  </p>
                </div>
              </div>

              <div class="mt-6 flex gap-3">
                <a
                  :href="`mailto:${selectedMessage.email}`"
                  class="btn-primary inline-flex items-center px-4 py-2"
                >
                  Répondre par email
                </a>
                <button
                  @click="selectedMessage = null"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>

          <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <Mail class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600 dark:text-gray-400">
              Sélectionnez un message pour voir les détails
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
