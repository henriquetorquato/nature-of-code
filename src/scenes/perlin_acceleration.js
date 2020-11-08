import Walker from '@entities/walker'

const OFFSET_STEP = 0.01
const BALL_SIZE = 20

export default class PerlinAcceleration {

    setup() {
        this.offset = createVector(0, 1000)
        this.ball = new Ball(window.canvasCenter, BALL_SIZE)
    }

    draw() {
        clear()
        background(220)

        this.ball.acceleration = createVector(
            map(noise(this.offset.x), 0, 1, -10, 10),
            map(noise(this.offset.y), 0, 1, -10, 10)
        )
        
        this.ball.velocity.limit(10)
        this.ball.update()

        this.checkBorder()
        this.ball.display()

        this.offset.add(OFFSET_STEP)
    }

    checkBorder() {
        if (this.ball.position.x < 0)
        {
            this.ball.position.x = window.canvasWidth
        }
        else if (this.ball.position.x > window.canvasWidth)
        {
            this.ball.position.x = 0
        }

        if (this.ball.position.y < 0)
        {
            this.ball.position.y = window.canvasHeight
        }
        else if (this.ball.position.y > window.canvasHeight)
        {
            this.ball.position.y = 0
        }
    }

}

class Ball extends Walker {

    constructor(position, size) {
        super()
        this.position = position
        this.size = size
    }

    display() {
        ellipse(this.position.x, this.position.y, this.size)
    }

}