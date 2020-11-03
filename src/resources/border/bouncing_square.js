import { Vector } from 'p5'

export class BouncingSquareBorder {

    constructor(size) {
        this.size = size
    }

    check(position, velocity) {
        let bounce = createVector(1, 1)
        const nextPosition = Vector.add(position, velocity)

        if (nextPosition.x < 0 || nextPosition.x + this.size.width > window.canvasWidth)
        {
            bounce.x = -1
        }

        if (nextPosition.y < 0 || nextPosition.y + this.size.height > window.canvasHeight)
        {
            bounce.y = -1
        }

        return {
            position,
            velocity: Vector.mult(velocity, bounce)
        }
    }

}