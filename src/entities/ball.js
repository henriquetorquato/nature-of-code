import Walker from './walker'

export default class Ball extends Walker {

    constructor(position, size) {
        super()
        this.position = position
        this.size = size
    }

    display() {
        ellipse(this.position.x, this.position.y, this.size)
    }

}