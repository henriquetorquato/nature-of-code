import { Vector } from 'p5'
import Walker from '@entities/walker'
import ShapeBoundsCollision from './shape_bounds_collision'
import EventManager from '@resources/event'

const SHATTER_EVENT = 'SolidShape:Shatter'

export default class SolidShape extends Walker {

    constructor(position, size, color) {
        super(position)
        this.size = size
        this.color = color
        this.event = new EventManager()

        this.bounds = new ShapeBoundsCollision(createVector(0, 0), window.canvasSize)
        this.centerOffset = createVector(this.size.width / 2, this.size.height / 2)
    }

    get points() {
        return [
            createVector(this.position.x, this.position.y),
            createVector(this.position.x + this.size.width, this.position.y),
            createVector(this.position.x + this.size.width, this.position.y + this.size.height),
            createVector(this.position.x, this.position.y + this.size.height)
        ]
    }

    update() {
        if (!this.bounds.inside(this.points))
        {
            this.shatter()
        }

        super.update()
    }

    display() {
        push()
        translate(this.position.x, this.position.y)
        noStroke()
        fill(this.color.r, this.color.g, this.color.b)
        beginShape()
        this.points.forEach(point =>
        {
            let position = Vector
                // Reposition the point in relation to the position
                .sub(point, this.position)
                // Reposition in relation to the center
                .sub(this.centerOffset)

            // Rotate each point around the angle
            position = Vector.rotateAround(position, this.angle, createVector(0, 0))

            // Draw the point
            vertex(position.x, position.y)
        })
        endShape(CLOSE)
        pop()
    }

    shatter() {
        this.event.publish(SHATTER_EVENT)
    }

    onShatter(callback) {
        this.event.subscribe(SHATTER_EVENT, callback)
    }

    unsubscribe(callback) {
        this.event.unsubscribe(SHATTER_EVENT, callback)
    }

}