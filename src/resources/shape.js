import { Vector } from 'p5'

// https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
export class Shape {

    constructor(position, points, angle) {
        this.position = position
        this.points = Shape.rotate(position, points, angle)
    }

    draw() {
        beginShape()
        this.points.forEach(point =>
            vertex(point.x, point.y))
        endShape(CLOSE)
    }

    // https://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
    static rotate(pivot, points, angle) {
        angle *= PI / 180

        const rotated = []
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        points.forEach(point =>
        {
            const distance = Vector.sub(pivot, point)
            const x = cos * distance.x - sin * distance.y + pivot.x
            const y = sin * distance.x + cos * distance.y + pivot.y

            rotated.push(
                createVector(x, y))
        })

        return rotated
    }

    static fromRect(position, width, height, angle) {
        const points = [
            createVector(position.x, position.y),
            createVector(position.x + width, position.y),
            createVector(position.x + width, position.y + height),
            createVector(position.x, position.y + height)
        ]

        return new this(position, points, angle)
    }

    static fromSquare(position, size, angle) {
        return this.fromRect(position, size, size, angle)
    }

}

export class Shapes {

    static castDimention(shape, dimention) {
        let min = null
        let max = null

        shape.points.forEach(point =>
        {
            const value = point[dimention]

            if (min === null || value < min[dimention])
            {
                min = point
            }

            if (max === null || value > max[dimention])
            {
                max = point
            }
        })

        return {
            min: min,
            max: max
        }
    }

    static intersects(shape1, shape2) {
        const castX1 = this.castDimention(shape1, 'x')
        const castY1 = this.castDimention(shape1, 'y')

        const v1 = Vector.sub(createVector(castX1.min.x, window.canvasHeight), castX1.min)
        const v2 = Vector.sub(createVector(castX1.max.x, window.canvasHeight), castX1.max)

        Vector.drawArrow(castX1.min, v1, 'red')
        Vector.drawArrow(castX1.max, v2, 'red')
    }

}