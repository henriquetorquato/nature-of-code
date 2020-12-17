import Walker from '@entities/walker'

export default class Particle extends Walker {

    lifespan = 255

    constructor(position, size, lifespanTic = 2) {
        super(position)
        this.size = size
        this.lifespanTic = lifespanTic
    }

    update() {
        super.update()
        
        const newLifespan = this.lifespan - this.lifespanTic
        this.lifespan = newLifespan > 0
            ? this.lifespan - this.lifespanTic
            : 0
    }

    display() {
        push()
        noStroke()
        fill(0, this.lifespan)
        circle(this.position.x, this.position.y, this.size)
        pop()
    }

    run() {
        this.update()
        this.display()
    }

    get isDead() {
        return this.lifespan <= 0
    }

}