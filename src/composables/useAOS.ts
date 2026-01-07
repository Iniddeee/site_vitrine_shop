import { onMounted, onUnmounted } from 'vue'

export const useAOS = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  let observer: IntersectionObserver

  const observeElements = () => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate')
        }
      })
    }, observerOptions)

    // Observe all elements with aos attribute
    const elements = document.querySelectorAll('[data-aos]')
    elements.forEach(el => observer.observe(el))
  }

  onMounted(() => {
    // Add initial styles
    const style = document.createElement('style')
    style.textContent = `
      [data-aos] {
        opacity: 0;
        transition-property: opacity, transform;
        transition-duration: 0.6s;
        transition-timing-function: ease-out;
      }
      
      [data-aos].aos-animate {
        opacity: 1;
      }
      
      [data-aos="fade-up"] {
        transform: translateY(30px);
      }
      
      [data-aos="fade-up"].aos-animate {
        transform: translateY(0);
      }
      
      [data-aos="fade-down"] {
        transform: translateY(-30px);
      }
      
      [data-aos="fade-down"].aos-animate {
        transform: translateY(0);
      }
      
      [data-aos="fade-left"] {
        transform: translateX(-30px);
      }
      
      [data-aos="fade-left"].aos-animate {
        transform: translateX(0);
      }
      
      [data-aos="fade-right"] {
        transform: translateX(30px);
      }
      
      [data-aos="fade-right"].aos-animate {
        transform: translateX(0);
      }
      
      [data-aos="zoom-in"] {
        transform: scale(0.9);
      }
      
      [data-aos="zoom-in"].aos-animate {
        transform: scale(1);
      }
      
      [data-aos="zoom-out"] {
        transform: scale(1.1);
      }
      
      [data-aos="zoom-out"].aos-animate {
        transform: scale(1);
      }
    `
    document.head.appendChild(style)

    // Start observing
    observeElements()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
