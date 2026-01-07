import { ref, onMounted, watch } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  // Charger le thème depuis localStorage au montage
  onMounted(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme !== null) {
      isDark.value = savedTheme === 'true'
    } else {
      // Vérifier la préférence système si aucune sauvegarde
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  })

  // Appliquer le thème au document
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Sauvegarder dans localStorage et appliquer le thème
  const toggleDark = () => {
    isDark.value = !isDark.value
    localStorage.setItem('darkMode', isDark.value.toString())
    applyTheme()
  }

  // Watcher pour appliquer le thème quand il change
  watch(isDark, () => {
    localStorage.setItem('darkMode', isDark.value.toString())
    applyTheme()
  })

  return {
    isDark,
    toggleDark,
  }
}
