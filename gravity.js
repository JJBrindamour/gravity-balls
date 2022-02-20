const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let gravity = 0.75
let frictiony = 0.97
let frictionx = 0.5

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

canvas.onclick = () => init()

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy
    this.dx = dx
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * frictiony
    } else {
      this.dy += gravity
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx * frictionx
    }
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

// Implementation
let balls
function init() {
  balls = []
  for (var i = 0; i < 300; i++) {
    let radius = randomIntFromRange(10, 20)
    let x = randomIntFromRange(radius, canvas.width - radius)
    let y = randomIntFromRange(0, canvas.height - radius)
    let dx = randomIntFromRange(-3, 3)
    let dy = randomIntFromRange(1, 3)
    let color = randomColor(colors)
    balls.push(new Ball(x, y, dx, dy, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  
  for (var i = 0; i < balls.length; i++) {
    balls[i].update()
  }
}

init()
animate()