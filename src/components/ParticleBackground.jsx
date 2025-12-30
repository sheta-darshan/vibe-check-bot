import { useRef, useEffect } from 'react'

const ParticleBackground = ({ isMatrix }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []
        let mouse = { x: null, y: null, radius: 150 }

        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initParticles()
        }

        const debouncedResize = debounce(resizeCanvas, 100);

        const initParticles = () => {
            particles = []
            // Responsive density: Lower density (higher divisor) for mobile
            const density = window.innerWidth < 768 ? 15000 : 9000
            const numberOfParticles = (canvas.width * canvas.height) / density
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2)
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2)
                let directionX = (Math.random() * 0.4) - 0.2
                let directionY = (Math.random() * 0.4) - 0.2
                let color = isMatrix ? '#00FF00' : (Math.random() > 0.5 ? '#FF00FF' : '#00FFFF')

                particles.push({ x, y, directionX, directionY, size, color })
            }
        }

        const animate = () => {
            requestAnimationFrame(animate)
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i]

                // Movement
                p.x += p.directionX
                p.y += p.directionY

                // Boundary Check
                if (p.x > canvas.width || p.x < 0) p.directionX = -p.directionX
                if (p.y > canvas.height || p.y < 0) p.directionY = -p.directionY

                // Mouse Interaction
                let dx = mouse.x - p.x
                let dy = mouse.y - p.y
                let distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouse.radius + p.size) {
                    if (mouse.x < p.x && p.x < canvas.width - p.size * 10) p.x += 1
                    if (mouse.x > p.x && p.x > p.size * 10) p.x -= 1
                    if (mouse.y < p.y && p.y < canvas.height - p.size * 10) p.y += 1
                    if (mouse.y > p.y && p.y > p.size * 10) p.y -= 1
                }

                // Draw Particle
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false)
                ctx.fillStyle = p.color
                ctx.fill()

                // Draw Connections
                connect()
            }
        }

        const connect = () => {
            let opacityValue = 1
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                        ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y))
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000)
                        ctx.strokeStyle = isMatrix
                            ? `rgba(0, 255, 0, ${opacityValue})`
                            : `rgba(255, 255, 255, ${opacityValue * 0.15})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        window.addEventListener('resize', debouncedResize)
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x
            mouse.y = e.y
        })
        window.addEventListener('mouseout', () => {
            mouse.x = undefined
            mouse.y = undefined
        })

        resizeCanvas()
        animate()

        return () => {
            window.removeEventListener('resize', debouncedResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [isMatrix])

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10 opacity-40" />
}

export default ParticleBackground
