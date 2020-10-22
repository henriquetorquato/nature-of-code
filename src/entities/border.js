import { Vector } from 'p5'

/*
    When the walker goes beyond the border,
    it is teleported to the parallel side.
*/
export class TeleportingBorder {

    check(position, velocity) {
        let nextPosition = Vector.add(position, velocity)

        if (nextPosition.x < 0)
        {
            nextPosition.x = window.canvasWidth
        }
        else if (nextPosition.x > window.canvasWidth)
        {
            nextPosition.x = 0
        }

        if (nextPosition.y < 0)
        {
            nextPosition.y = window.canvasHeight
        }
        else if (nextPosition.y > window.canvasHeight)
        {
            nextPosition.y = 0
        }

        return {
            position: nextPosition,
            velocity
        }
    }

}

/*
    When the walker goes beyond the border,
    the velocity vector is mult by -1, giving a border bounce effect.
*/
export class BouncingBorder {

    check(position, velocity) {
        let bounce = createVector(1, 1)
        const nextPosition = Vector.add(position, velocity)

        if (nextPosition.x < 0 || nextPosition.x > window.canvasWidth)
        {
            bounce.x = -1
        }

        if (nextPosition.y < 0 || nextPosition.y > window.canvasHeight)
        {
            bounce.y = -1
        }

        return {
            position,
            velocity: Vector.mult(velocity, bounce)
        }
    }

}