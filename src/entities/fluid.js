import Rect from '../resources/rect'
import { Vector } from 'p5'

export default class Fluid {

    constructor(position, size, color, dragCoeficient) {
        this.position = position
        this.size = size
        this.color = color
        this.dragCoeficient = dragCoeficient
    }

    get rect() {
        return Rect.from(this.position, this.size)
    }

    display() {
        push()
        noStroke()
        if (this.color != null)
        {
            fill(this.color)
        }
        rect(this.position.x, this.position.y, this.size.width, this.size.height)
        pop()
    }

    drag(velocity, area = 1) {
        const speed = velocity.mag()
        const dragMag = area * this.dragCoeficient * Math.pow(speed, 2)
        const drag = Vector.copy(velocity)
        drag.mult(-1)
        drag.normalize()
        drag.setMag(dragMag)

        return drag
    }

}