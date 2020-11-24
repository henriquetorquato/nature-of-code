import { Shape, Shapes } from '@resources/shape'
import Walker from '@entities/walker'

export default class SeparatingAxisTheorem {

    setup() {
        this.box = new Box(createVector(250, 250), 20)
    }

    draw() {
        clear()
        background(220)

        // this.box.applyForce(createVector(0, 0.98))
        // this.box.update()
        this.box.display()
        Shapes.intersects(this.box.shape, [])
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