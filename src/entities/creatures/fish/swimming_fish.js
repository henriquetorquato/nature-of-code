import Rect from '../../../resources/rect'
import CreatureMovement from '../creature_movement'

const MIN_BORDER_DISTANCE = 20

export default class SwimmingFish extends CreatureMovement {

    constructor(position, genes) {
        super(MIN_BORDER_DISTANCE)

        this.genes = genes
        this.position = position
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.direction = createVector(0, -1)

        this.angle = 90
        this.swimmingY = Math.randomBetween(0, 10000)
    }

    get rect() {
        return Rect.from(this.position, this.genes.size)
    }

    display() {
        push()
        noStroke()
        fill(this.genes.color)
        translate(this.position.x, this.position.y)

        rectMode(CENTER)
        // Direction angle + Swimming Motion angle + 90 degrees for rotating the shape
        rotate(this.direction.heading() + this.angle + 90)
        rect(0, 0, this.genes.size.width, this.genes.size.height)
        pop()        
    }

    update() {
        angleMode(DEGREES)

        this.direction = this.nextDirection()
        this.acceleration = this.accelerationVector()

        this.velocity.add(this.acceleration)
        this.velocity.limit(this.genes.maxVelocity)
        this.position.add(this.velocity)
    }

    swimmingVector() {
        const swimmingX = Math.sin(this.swimmingY) * this.genes.swimmingScale
        const swimming = createVector(swimmingX, 0)
        swimming.rotate(this.direction.heading() + 90)

        this.swimmingY += 0.1
        return swimming
    }

    accelerationVector() {
        const swimming = this.swimmingVector()
        const acceleration = createVector(this.direction.x, this.direction.y)

        const swimmingAngle = Math.atan(swimming.mag() / this.direction.mag()) * 180 / PI
        this.angle = swimming.x < 0 ? -swimmingAngle : swimmingAngle

        acceleration.rotate(this.angle)
        return acceleration
    }

}