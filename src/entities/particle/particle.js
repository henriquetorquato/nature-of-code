import Walker from '@entities/walker'

export default class Particle extends Walker {

    lifespan = 255

    constructor(position, size) {
        super(position)
        this.size = size
    }

    update() {
        super.update()
        this.lifespan -= 2
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
        return this.lifespan < 0
    }

}