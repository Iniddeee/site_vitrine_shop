<script setup lang="ts">
import { ref } from 'vue'
import { Quote, Star } from 'lucide-vue-next'

defineOptions({
  name: 'TestimonialsSection',
})

const testimonials = ref([
  {
    id: 1,
    name: 'Nom Client',
    role: 'Poste',
    company: 'Entreprise',
    avatar: '',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Nom Client',
    role: 'Poste',
    company: 'Entreprise',
    avatar: '',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Nom Client',
    role: 'Poste',
    company: 'Entreprise',
    avatar: '',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Nom Client',
    role: 'Poste',
    company: 'Entreprise',
    avatar: '',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Nom Client',
    role: 'Poste',
    company: 'Entreprise',
    avatar: '',
    content:
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Nom Client',
    role: 'Poste',
    company: 'Entreprise',
    avatar: '',
    content:
      'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.',
    rating: 5,
  },
])
</script>

<template>
  <section class="py-16 md:py-24 bg-white dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12" data-aos="fade-up">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Ce Que Disent Nos Clients
        </h2>
        <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          class="relative"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        >
          <div class="card h-full">
            <Quote class="h-8 w-8 text-primary-200 dark:text-primary-800 mb-4" />

            <div class="flex mb-4">
              <Star
                v-for="i in testimonial.rating"
                :key="i"
                class="h-5 w-5 text-yellow-400 fill-current"
              />
            </div>

            <p class="text-gray-600 dark:text-gray-400 mb-6 italic">"{{ testimonial.content }}"</p>

            <div class="flex items-center">
              <div
                class="h-12 w-12 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              >
                <span class="text-gray-500 dark:text-gray-400 text-sm">Photo</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ testimonial.name }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ testimonial.role }} • {{ testimonial.company }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
