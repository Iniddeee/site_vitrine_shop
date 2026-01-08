<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'

defineOptions({
  name: 'ContactPage',
})

const toast = useToast()
const route = useRoute()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '', // 'devis' ou 'question'
  device: '',
  issue: '',
  message: '',
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de l\'envoi')
    }

    toast.success('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.')

    // Reset form
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      device: '',
      issue: '',
      message: '',
    }

  } catch (error) {
    console.error('Erreur:', error)
    toast.error(error.message || 'Une erreur est survenue, veuillez réessayer')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // Check if a service is passed in the query params
  if (route.query.service) {
    formData.value.subject = 'devis'
    formData.value.message = `Bonjour, je souhaite obtenir un devis pour le service suivant : ${route.query.service}`
  } else if (route.query.type === 'devis') {
    formData.value.subject = 'devis'
  }
})

const contactInfo = {
  address: {
    icon: MapPin,
    title: 'Adresse',
    details: ['Shop', 'Esplanade', '2900 Porrentruy'],
  },
  phone: {
    icon: Phone,
    title: 'Téléphone',
    details: ['+41 22 731 84 56', 'Lun-Ven: 9h-18h', 'Sam: 9h-17h'],
  },
  email: {
    icon: Mail,
    title: 'Email',
    details: ['info@fixphone.ch', 'support@fixphone.ch'],
  },
  hours: {
    icon: Clock,
    title: 'Horaires',
    details: ['Lundi-Vendredi: 9h-18h', 'Samedi: 9h-17h', 'Dimanche: Fermé'],
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Contactez-nous
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
            Nous sommes là pour répondre à vos questions et discuter de votre projet.
          </p>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Info -->
        <div class="lg:col-span-1">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Informations de contact
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            N'hésitez pas à nous contacter par téléphone, email ou à nous rendre dans nos bureaux.
          </p>

          <div class="space-y-6">
            <div v-for="(info, key) in contactInfo" :key="key" class="flex items-start">
              <div class="flex-shrink-0">
                <div
                  class="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg"
                >
                  <component
                    :is="info.icon"
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                  />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ info.title }}
                </p>
                <div class="space-y-1">
                  <p
                    v-for="(detail, index) in info.details"
                    :key="index"
                    class="text-gray-600 dark:text-gray-400"
                  >
                    {{ detail }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="mt-12">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Horaires d'ouverture
            </h3>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div class="space-y-2 text-gray-600 dark:text-gray-400">
                <p>Lundi - Vendredi: 9h00 - 18h00</p>
                <p>Samedi: 9h00 - 12h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Envoyez-nous un message
            </h2>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Type de demande -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type de demande *
                </label>
                <select
                  v-model="formData.subject"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="devis">Demander un devis pour une réparation</option>
                  <option value="question">Question générale</option>
                  <option value="sav">Service après-vente</option>
                  <option value="partenariat">Proposition de partenariat</option>
                </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone
                </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="+41 79 123 45 67"
                />
              </div>

              <!-- Champs conditionnels pour les devis -->
              <div
                v-if="formData.subject === 'devis'"
                class="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Appareil concerné
                  </label>
                  <select
                    v-model="formData.device"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="iPhone">iPhone</option>
                    <option value="Samsung">Samsung</option>
                    <option value="iPad">iPad</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type de problème
                  </label>
                  <select
                    v-model="formData.issue"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="ecran">Écran cassé</option>
                    <option value="batterie">Problème de batterie</option>
                    <option value="chargement">Problème de chargement</option>
                    <option value="eau">Dégât des eaux</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  v-model="formData.message"
                  required
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Décrivez votre problème ou votre demande..."
                ></textarea>
              </div>

              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600 dark:text-gray-400">* Champs obligatoires</p>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="btn-primary inline-flex items-center px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send v-if="!isSubmitting" class="w-5 h-5 mr-2" />
                  <div
                    v-else
                    class="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"
                  ></div>
                  {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Retrouvez-nous
        </h2>
        <div class="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=Esplanade,%202900%20Porrentruy,%20Suisse&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            class="w-full"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>
