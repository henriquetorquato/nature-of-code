import { Vector } from 'p5'
import Oscillator from '@entities/oscillator'

export default class InsectLegs {

    setup() {
        const centerPair = Vector.copy(window.canvasCenter)

        const topPair = Vector.copy(window.canvasCenter)
        topPair.y -= 80

        const bottomPair = Vector.copy(window.canvasCenter)
        bottomPair.y += 80

        this.balls = [
            new Ball(createVector(0, 0), createVector(0.025, -0.05), createVector(50, 25), topPair),
            new Ball(createVector(0, 0), createVector(0.025, -0.05), createVector(-50, 25), topPair),
            new Ball(createVector(1, -2), createVector(0.025, -0.05), createVector(50, 25), centerPair),
            new Ball(createVector(1, -2), createVector(0.025, -0.05), createVector(-50, 25), centerPair),
            new Ball(createVector(2, -4), createVector(0.025, -0.05), createVector(50, 25), bottomPair),
            new Ball(createVector(2, -4), createVector(0.025, -0.05), createVector(-50, 25), bottomPair)
        ]
    }

    draw() {
        clear()
        background(220)

        this.balls.forEach(ball =>
        {
            ball.update()

            push()
            translate(ball.reference.x, ball.reference.y)
            line(0, 0, ball.position.x, ball.position.y)
            pop()

            ball.display()
        })
    }

}

class Ball extends Oscillator {

    constructor(angle, velocity, amplitude, reference) {
        super(angle, amplitude)
        this.velocity = velocity
        this.reference = reference
        this.position = createVector(0, 0)
    }
    
    update() {
        this.oscillate()
        this.position = this.oscillation()
    }

    display() {
        push()
        translate(this.reference.x, this.reference.y)
        circle(this.position.x, this.position.y, 20)
        pop()
    }

}