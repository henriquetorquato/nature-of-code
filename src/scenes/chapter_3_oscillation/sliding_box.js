import { Vector } from 'p5'
import Rect from '@resources/rect'
import Walker from '@entities/walker'

const ANGLE = 60
const GRAVITY = 0.98

export default class SlidingBox {
    
    setup() {
        this.box = new Box(createVector(250, 100), 20)
        this.start = Vector.copy(window.canvasCenter)
    }

    draw() {
        clear()
        background(220)

        push()
        translate(this.start.x, this.start.y)
        angleMode(DEGREES)
        rotate(ANGLE)
        rectMode(CENTER)
        rect(0, 0, 3, 250)
        pop()

        this.box.applyForce(createVector(0, GRAVITY))

        // this.box.update()
        this.box.display(ANGLE)
        this.box.rect.draw()
    }

}

class Box extends Walker {

    constructor(position, size) {
        super(position)
        this.size = size
    }

    get rect() {       
        const position = createVector(
            this.position.x - this.size / 2,
            this.position.y - this.size / 2)

        return Rect.from(position,
        {
            width: this.size,
            height: this.size
        })
    }

    display(angle) {
        push()
        translate(this.position.x, this.position.y)
        rotate(angle)
        rectMode(CENTER)
        square(0, 0, this.size)
        pop()
    }

}