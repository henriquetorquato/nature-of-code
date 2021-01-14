export default class ParticleSystem {

    particles = []

    constructor(position, creator) {
        this.position = position
        this.creator = creator
    }

    run() {
        this.particles.forEach((particle, index, particles) =>
        {
            if (particle.isDead)
            {
                particles.splice(index, 1)
                return
            }

            particle.run()
        })
    }

    add() {
        const particle = this.creator(this.position)
        this.particles.push(particle)
    }

    applyForce(force) {
        this.particles.forEach(particle =>
            particle.applyForce(force))
    }

    applyDrag(fluid) {
        this.particles.forEach(particle =>
        {
            const friction = fluid.drag(particle.velocity, particle.area)
            particle.applyForce(friction)
        })
    }

}