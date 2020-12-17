import { Vector } from 'p5'

export default class ShapeBoundsCollision {

    constructor(position, size) {
        this.start = position
        this.end = Vector.add(position,
            createVector(size.width, size.height))
    }

    inside(points) {
        const el = points.find(point =>
        {
            return !this.between(point.x, this.start.x, this.end.x)
                || !this.between(point.y, this.start.y, this.end.y)
        })

        return el === undefined
    }

    between(value, min, max) {
        return value > min && value < max
    }

}