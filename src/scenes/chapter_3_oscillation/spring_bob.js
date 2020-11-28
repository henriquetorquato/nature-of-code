import { Vector } from 'p5'
import Walker from '@entities/walker'
import Spring from '@entities/spring'

const SPRING_CONSTANT = 0.1
const SPRING_LENGTH = 100
const GRAVITY = 0.98

export default class SpringBob {

    setup() {
        const anchor1 = Vector.sub(window.canvasCenter, createVector(0, 100))
        const position1 = Vector.add(anchor1, createVector(0, SPRING_LENGTH + 30))

        this.spring1 = new Spring(anchor1, SPRING_LENGTH, SPRING_CONSTANT)
        this.bob1 = new Bob(position1, 40, 10)

        const anchor2 = Vector.copy(this.bob1.position)
        const position2 = Vector.add(anchor2, createVector(0, SPRING_LENGTH))

        this.spring2 = new Spring(anchor2, SPRING_LENGTH, SPRING_CONSTANT)
        this.bob2 = new Bob(position2, 40, 10)

        this.gravity = createVector(0, GRAVITY)
    }

    draw() {
        clear()
        background(220)

        this.spring1.connect(this.bob1)

        this.bob1.applyForce(this.gravity)
        this.bob1.update()

        this.spring2.anchor = Vector.copy(this.bob1.position)
        this.spring2.connect(this.bob2)

        this.bob2.applyForce(this.gravity)
        this.bob2.update()

        this.spring1.display()
        this.spring2.display()
        this.bob1.display()
        this.bob2.display()

        this.bob1.velocity = Vector.mult(this.bob1.velocity, 0.99)
        this.bob2.velocity = Vector.mult(this.bob2.velocity, 0.99)
    }

}

class Bob extends Walker {

    constructor(position, size, mass) {
        super(position, mass)
        this.size = size
        this.velocityLimit = 10
    }

    display() {
        push()
        circle(this.position.x, this.position.y, this.size)
        pop()
    }

}