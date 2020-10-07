const DISTANCE_MEAN = 5
const DISTANCE_DEVIATION = 5

export default class Walker {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    step() {
        const moveToMouse = Math.random() > 0.5
        if (moveToMouse)
        {
            const x = this.x - mouseX > 0 ? -1 : 1
            const y = this.y - mouseY > 0 ? -1 : 1
            const distance = randomGaussian(DISTANCE_MEAN, DISTANCE_DEVIATION)

            this.x += x * distance
            this.y += y * distance
        }
        else
        {
            this.x += Math.randomBetween(-1, 1)
            this.y += Math.randomBetween(-1, 1)
        }
    }

    display() {
        ellipse(this.x, this.y, 10)
    }

}