import { Vector } from 'p5'
import Fluid from '@entities/fluid'
import RepellingParticle from './repelling_particle'
import RepelingParticleSystem from './repelling_particle_system'

export default class ParticleRepeller {

    get mousePosition() {
        return createVector(mouseX, mouseY)
    }

    setup() {
        this.system = new RepelingParticleSystem(
            Vector.copy(window.canvasCenter), 30)

        this.table = new Fluid(createVector(0, 0), window.canvasSize, null, 0.01)

        this.mouse = new RepellingParticle(this.mousePosition, 120, 1)
    }

    draw() {
        clear()
        background(220)

        // Always move the particle to the mouse position
        this.mouse.position = this.mousePosition

        // Override particle display (only the mouse will be there)
        this.mouse.display = () => { return }

        this.system.particles.forEach(particle =>
        {
            if (this.mouse.shouldRepell(particle))
            {
                const repelling = particle.repellingForce(this.mouse)
                particle.applyForce(repelling)
            }
        })

        this.mouse.run()

        this.system.applyRepelling()
        this.system.applyDrag(this.table)

        this.system.run()
    }

}