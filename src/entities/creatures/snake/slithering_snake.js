import { Vector } from 'p5'
import CreatureMovement from '../creature_movement'
import SlitheringSnakeGenes from './genes'
import Slithering from './slithering'

const DIRECTION_OFFSET = 0.0001
const MIN_BORDER_DISTANCE = 80

export default class SlitheringSnake extends CreatureMovement {

    constructor(position) {
        super(MIN_BORDER_DISTANCE)
        this.genes = new SlitheringSnakeGenes()
        this.slithering = new Slithering(this.genes)

        this.position = position
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.direction = createVector(0, 0)
    }
    
    display() {
        this.slithering.update()

        push()
        noStroke()
        fill(this.genes.color)
        translate(this.position.x, this.position.y)
        // Don't know why, but the PI constant was not working. Thus the 180 value.
        rotate(this.direction.heading() + 180)
        this.slithering.display()
        pop()
    }

    update() {
        this.direction = this.nextDirection(DIRECTION_OFFSET)
        this.velocity = Vector.mult(this.direction, this.genes.maxVelocity)
        this.position.add(this.velocity)
    }

}