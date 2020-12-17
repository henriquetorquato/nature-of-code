import { Vector } from 'p5'

export class BouncingSquareBorder {

    constructor(size, bounceFactor = 1) {
        this.size = size
        this.bounceFactor = -bounceFactor
    }

    check(position, velocity) {
        let bounce = createVector(1, 1)
        const nextPosition = Vector.add(position, velocity)

        if (nextPosition.x < 0 || nextPosition.x + this.size.width > window.canvasWidth)
        {
            bounce.x = this.bounceFactor
        }

        if (nextPosition.y < 0 || nextPosition.y + this.size.height > window.canvasHeight)
        {
            bounce.y = this.bounceFactor
        }

        return {
            position,
            velocity: Vector.mult(velocity, bounce)
        }
    }

}