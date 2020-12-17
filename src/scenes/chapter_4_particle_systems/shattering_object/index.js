import ShapeReplacer from './shape_replacer'

const GRAVITY = 0.98
const MIN_ANGULAR_ACCELERATION = -100
const MAX_ANGULAR_ACCELERATION = 100
const SIZE_MEAN = 30
const SIZE_DEVIATION = 15

export default class ShatteringObject {

    setup() {
        this.shape = this.spawn()
        this.gravity = createVector(0, GRAVITY)
    }

    draw() {
        clear()
        background(220)

        this.shape.applyForce(this.gravity)
        this.shape.update()
        this.shape.display()

        if (this.shape.isDead())
        {
            this.shape = this.spawn()
        }
    }

    spawn() {
        const position = createVector(
            Math.randomBetween(0, window.canvasWidth),
            Math.randomBetween(0, window.canvasHeight / 2))

        const size = {
            width: randomGaussian(SIZE_MEAN, SIZE_DEVIATION),
            height: randomGaussian(SIZE_MEAN, SIZE_DEVIATION)
        }

        const color = Math.randomColor()
        const shape = new ShapeReplacer(position, size, color)

        const angularAcceleration = Math.randomBetween(
            MIN_ANGULAR_ACCELERATION, MAX_ANGULAR_ACCELERATION) / 1000

        shape.applyAngularForce(angularAcceleration)

        return shape
    }

}