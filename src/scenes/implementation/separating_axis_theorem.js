import { Vector } from 'p5'
import Walker from '@entities/walker'
import { Shape, Shapes } from '@resources/shape'

export default class SeparatingAxisTheorem {

    setup() {
        this.box = new Box(createVector(250, 250), 20)
        this.ramp = new Ramp(createVector(250, 300), 200, 5)
    }

    draw() {
        clear()
        background(220)

        this.box.display()
        this.ramp.display()

        Shapes.intersects(this.box.shape, this.ramp.shape)
    }

}

class Box extends Walker {

    constructor(position, size) {
        super(position)
        this.size = size
    }

    get shape() {
        return Shape.fromSquare(this.position, this.size, 45)
    }

    display() {
        push()
        this.shape.draw()
        pop()
    }

}

class Ramp {

    constructor(position, width, heigth) {
        this.position = position
        this.width = width
        this.heigth = heigth
    }

    get shape() {
        return Shape.fromRect(this.position, this.width, this.heigth, -45)
    }

    display() {
        push()
        this.shape.draw()
        pop()
    }

}