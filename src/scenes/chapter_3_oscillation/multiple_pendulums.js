import { Vector } from 'p5'
import Pendulum from '@entities/pendulum'

const GRAVITY = 0.98

export default class MultiplePendulums {

    setup() {
        const length = 100
        const distance = createVector(0, length)
        
        const origin1 = Vector.sub(window.canvasCenter, distance)
        this.pendulum1 = new PendulumObject(origin1, length, 30)

        const origin2 = Vector.add(origin1, distance)
        this.pendulum2 = new PendulumObject(origin2, length, 30, 90)

        const origin3 = Vector.add(origin2, distance)
        this.pendulum3 = new PendulumObject(origin3, length, 30, 180)
    }

    draw() {
        clear()
        background(220)

        this.pendulum1.update(GRAVITY)
        this.pendulum1.display()

        this.pendulum2.update(GRAVITY, this.pendulum1.position)
        this.pendulum2.display()

        this.pendulum3.update(GRAVITY, this.pendulum2.position)
        this.pendulum3.display()
    }

}

class PendulumObject extends Pendulum {

    constructor(origin, length, size, angle = 1) {
        super(origin, length, size, angle)
    }

    update(gravity, origin = null) {
        if (origin !== null) this.origin = origin
        super.update(gravity)
    }

    display() {
        push()
        line(this.origin.x, this.origin.y, this.position.x, this.position.y)
        circle(this.position.x, this.position.y, this.size)
        pop()
    }

}