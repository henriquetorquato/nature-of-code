import { Vector } from 'p5'

export class BouncingCircleBorder {

    constructor(radius) {
        this.radius = radius
    }

    check(position, velocity) {
        let bounce = createVector(1, 1)
        const nextPosition = Vector.add(position, velocity)

        if (nextPosition.x - this.radius < 0 || nextPosition.x + this.radius > window.canvasWidth)
        {
            bounce.x = -1
        }

        if (nextPosition.y - this.radius < 0 || nextPosition.y + this.radius > window.canvasHeight)
        {
            bounce.y = -1
        }

        return {
            position,
            velocity: Vector.mult(velocity, bounce)
        }
    }

}