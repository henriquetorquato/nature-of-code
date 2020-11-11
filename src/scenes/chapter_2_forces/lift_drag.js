import { Vector } from 'p5'
import Fluid from '@entities/fluid'
import Walker from '@entities/walker'
import Rect from '@resources/rect'

export default class LiftDrag {

    setup() {
        this.air = new Fluid(createVector(0, 0), window.canvasSize, null, 0.1)
        this.ball = new Ball(createVector(20, window.canvasHeight - 20), 20)

        this.lift = createVector(Math.randomBetween(1, 5), 0)
    }

    draw() {
        clear()
        background(220)

        this.ball.applyForce(this.lift)

        const drag = this.air.drag(this.ball.velocity)
        const liftDrag = Vector.copy(drag)
        liftDrag.rotate(90)

        this.ball.applyForce(drag)
        this.ball.applyForce(liftDrag)

        Vector.drawArrow(this.ball.position, Vector.mult(drag, 10), 'blue')
        Vector.drawArrow(this.ball.position, Vector.mult(liftDrag, 10), 'blue')

        this.ball.update()
        this.ball.display()

        Vector.drawArrow(this.ball.position, Vector.mult(this.ball.velocity, 10), 'red')
    }

}

class Ball extends Walker {

    constructor(position, size) {
        super(position, size)
        this.size = size
    }

    get rect() {
        return Rect.fromCircle(this.position, this.size)
    }

    display() {
        push()
        ellipse(this.position.x, this.position.y, this.size)
        pop()
    }
    
}