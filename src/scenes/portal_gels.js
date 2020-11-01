import { Vector } from 'p5'
import Walker from '../entities/walker'
import { BouncingCircleBorder } from '../resources/border'
import { BlueGel, OrangeGel } from '../entities/gels'

const BALL_SIZE = 20
const BLUE_GEL_MEAN_AMOUNT = 3
const ORANGE_GEL_MEAN_AMOUNT = 3
const GEL_SIZE_MEAN = 30

export default class PortalGels {

    setup() {
        const position = Vector.copy(window.canvasCenter)
        this.ball = new Ball(position, BALL_SIZE)
        
        const blueGels = this.generateGels(BlueGel, BLUE_GEL_MEAN_AMOUNT)
        const orangeGels = this.generateGels(OrangeGel, ORANGE_GEL_MEAN_AMOUNT)
        this.gels = blueGels.concat(orangeGels)
    }

    draw() {
        clear()
        background(220)

        this.gels.forEach(gel =>
        {
            if (gel.collides(this.ball)) {
                const gelForce = gel.force(this.ball.velocity)
                this.ball.applyForce(gelForce)
            }

            gel.display()
        })

        this.ball.update()
        this.ball.display()
    }

    generateGels(type, meanAmount) {
        let gels = []
        const amount = randomGaussian(meanAmount, 0)

        for (let i = 0; i < amount; i++) {
            const position = Math.randomPosition()
            const size = randomGaussian(GEL_SIZE_MEAN, 10)
            gels.push(new type(position, size))
        }

        return gels
    }

}

class Ball extends Walker {

    constructor(position, diameter) {
        super(position, diameter)
        this.diameter = diameter
        this.radius = diameter / 2

        this.velocity = Vector.mult(Vector.random2D(), 10)
        this.canvasBorder = new BouncingCircleBorder(this.radius)
    }

    display() {
        push()
        noStroke()
        circle(this.position.x, this.position.y, this.diameter)
        pop()
    }

}