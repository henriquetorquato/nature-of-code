import { Shape, Shapes } from '@resources/shape'
import Walker from '@entities/walker'

export default class SeparatingAxisTheorem {

    setup() {
        this.ramp = new Ramp(createVector(250, 300), 200, 5)
        this.box = new Box(createVector(250, 250), 20)
    }

    draw() {
        clear()
        background(220)

        this.box.display()
        this.ramp.display()

        Shapes.cast(this.box.shape, 'blue')
        Shapes.cast(this.ramp.shape, 'red')
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
        const position = createVector(0, 0)
        const shape = Shape.fromSquare(position, this.size, 45)

        push()
        translate(this.position.x, this.position.y)
        shape.draw()
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
        return Shape.fromRect(this.position, this.width, this.heigth, -30)
    }

    display() {
        const position = createVector(0, 0)
        const shape = Shape.fromRect(position, this.width, this.heigth, -30)

        push()
        translate(this.position.x, this.position.y)
        shape.draw()
        pop()
    }

}