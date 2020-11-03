import Rect from '../../resources/rect'

export default class Gel {

    constructor(position, size, color) {
        this.position = position
        this.color = color
        this.size = size
        this.rect = Rect.from(position, { width: size, height: size })
    }

    display() {
        push()
        noStroke()
        fill(this.color)
        square(this.position.x, this.position.y, this.size)
        pop()
    }

}