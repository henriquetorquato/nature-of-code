import { ParticleSystem } from '@entities/particle'
import RepellingParticle from './repelling_particle'

export default class RepelingParticleSystem extends ParticleSystem {

    constructor(position, amount) {
        super(position, {})
        this.initialize(amount)
    }

    initialize(amount) {
        for(let i = 0; i < amount; i++)
        {
            const position = Math.randomPosition()
            const particle = new RepellingParticle(position)

            this.particles.push(particle)
        }
    }

    applyRepelling() {
        this.particles.forEach(p1 =>
        {
            this.particles.forEach(p2 =>
            {
                if (p1 === p2) return

                if (p1.shouldRepell(p2))
                {
                    const repelling = p1.repellingForce(p2)
                    p1.applyForce(repelling)
                }
            })
        })
    }

}