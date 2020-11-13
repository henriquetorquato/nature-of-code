import { Vector } from 'p5'
import Rect from '@resources/rect'
import Walker from '@entities/walker'

export default class RandomObject extends Walker {

    constructor(position) {
        super(position)
        this.size = {
            width: 20,
            height: 20
        }

        this.centerOffset = createVector(-this.size.width / 2, -this.size.height / 2)
        this.area = (this.size.width * this.size.height) / 4
        this.mass = this.area
        this.visible = true
    }

    get rect() {
        return Rect.from(this.position, this.size)
    }

    display() {
        if (this.visible === false) return

        const center = Vector.sub(this.position, this.centerOffset)

        push()
        noStroke()
        translate(center.x, center.y)
        rotate(this.angle)
        fill(100, 200, 100)
        rect(this.centerOffset.x, this.centerOffset.y, this.size.width, this.size.height)
        pop()
    }

    disappear() {
        this.velocity.mult(0)
        this.visible = false
    }

    appear() {
        this.visible = true
    }

}