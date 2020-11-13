import { Vector } from 'p5'
import Rect from '@resources/rect'
import Walker from '@entities/walker'

const SIZE_MEAN = 20
const SIZE_DEVIATION = 10

export default class RandomObject extends Walker {

    constructor(position) {
        super(position)

        this.size = this.randomSize()
        this.color = Math.randomColor()

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
        translate(center.x, center.y)
        rotate(this.angle)
        fill(this.color.r, this.color.g, this.color.b)
        rect(this.centerOffset.x, this.centerOffset.y, this.size.width, this.size.height)
        pop()
    }

    randomSize() {
        const size = randomGaussian(SIZE_MEAN, SIZE_DEVIATION)

        return {
            width: size,
            height: size
        }
    }

    disappear() {
        this.velocity.mult(0)
        this.visible = false
    }

    appear() {
        this.visible = true
    }

}