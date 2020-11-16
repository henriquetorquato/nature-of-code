import { Vector } from 'p5'
import Spaceship from './spaceship'

export default class AsteroidsSpaceship {

    setup() {
        const position = Math.randomPosition()
        this.spaceship = new Spaceship(position)
    }

    draw() {
        clear()
        background(20)

        if (keyIsDown(LEFT_ARROW))
        {
            this.spaceship.left()
        }
        else if (keyIsDown(RIGHT_ARROW))
        {
            this.spaceship.right()
        }

        if (keyIsDown(UP_ARROW))
        {
            this.spaceship.forward()
        }

        this.spaceship.update()
        this.spaceship.display()
    }

}