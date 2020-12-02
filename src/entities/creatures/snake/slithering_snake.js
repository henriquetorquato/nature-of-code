import { Vector } from 'p5'
import CreatureMovement from '../creature_movement'
import SlitheringSnakeGenes from './genes'
import Slithering from './slithering'

const MAX_VELOCITY = 1
const ACCELERATION_SCALE = 2
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
        const angle = this.velocity.angleBetween(createVector(0, 1))

        push()
        noStroke()
        fill(this.genes.color)
        translate(this.position.x, this.position.y)
        rotate(angle)
        this.slithering.display()
        pop()
    }

    update() {
        this.direction = this.nextDirection()
        this.acceleration = Vector.mult(this.direction, ACCELERATION_SCALE)

        this.velocity.add(this.acceleration)
        this.velocity.limit(MAX_VELOCITY)
        this.position.add(this.velocity)
    }

}