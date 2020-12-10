import Spaceship from './spaceship'

export default class AsteroidsSpaceship {

    setup() {
        const position = Math.randomPosition()
        this.spaceship = new Spaceship(position)

        textSize(20)
        textFont(window.font)
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

        push()
        fill(200)
        text('Use "left arrow" to rotate left', 20, window.canvasHeight - 60)
        text('Use "right arrow" to rotate right', 20, window.canvasHeight - 40)
        text('Use "up arrow" to turn thrusters on!', 20, window.canvasHeight - 20)
        pop()
    }

}