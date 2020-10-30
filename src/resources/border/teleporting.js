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