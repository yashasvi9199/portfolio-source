export const createParticleSystem = (canvas, particleCount = 100) => {
  const ctx = canvas.getContext('2d')
  const particles = []

  class Particle {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 2
      this.vy = (Math.random() - 0.5) * 2
      this.size = Math.random() * 3 + 1
      this.alpha = Math.random() * 0.5 + 0.2
      this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1

      this.alpha = Math.max(0.1, this.alpha - 0.002)
      if (this.alpha <= 0.1) {
        this.reset()
      }
    }

    draw() {
      ctx.save()
      ctx.globalAlpha = this.alpha
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  const init = () => {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  const update = () => {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
      particle.update()
      particle.draw()
    })
  }

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  return { init, update, resize }
}