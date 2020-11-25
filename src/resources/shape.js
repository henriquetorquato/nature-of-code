import { Vector } from 'p5'

// https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
export class Shape {

    constructor(position, points, angle) {
        this.position = position
        this.points = Shape.rotate(position, points, angle)
        this.angle = angle

        const { longestAxis, projectionAngle } = this._longestAxisInfo(points)
        this.longestAxis = longestAxis
        this.projectionAngle = projectionAngle
    }

    _longestAxisInfo(points) {
        let longest = null
        for (let i = 0; i < points.length; i++)
        {
            const p1 = points[i]
            const p2 = points[i + 1] === undefined ? 0 : points[i + 1]
            const distance = Vector.sub(p1, p2)

            if (longest === null || distance.mag() > longest.mag())
            {
                longest = distance
            }
        }

        return {
            longestAxis: longest.mag(),
            projectionAngle: longest.angleBetween(createVector(0, 1))
        }
    }

    draw() {
        beginShape()
        this.points.forEach(point =>
        {
            vertex(point.x, point.y)
        })
        endShape(CLOSE)
    }

    // https://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
    static rotate(pivot, points, angle) {
        angle *= PI / 180
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        return points.map(point =>
        {
            const distance = Vector.sub(pivot, point)
            const x = cos * distance.x - sin * distance.y + pivot.x
            const y = sin * distance.x + cos * distance.y + pivot.y

            return createVector(x, y)
        })  
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

    static projectDimention(shape, dimention, angle = 0, pivot = createVector(0, 0)) {
        let min, rotatedMin = null
        let max, rotatedMax = null

        const angleValue = dimention === 'width'
            ? Math.cos(-angle)
            : Math.sin(-angle)

        shape.points.forEach(point =>
        {
            // Rotate the shape back
            const distance = Vector.sub(pivot, point).mag()
            const value = distance * angleValue

            if (min === null || rotatedMin === null || value < rotatedMin)
            {
                min = point
                rotatedMin = value
            }

            if (max === null || rotatedMax === null || value > rotatedMax)
            {
                max = point
                rotatedMax = value
            }
        })

        return {
            min: min,
            max: max
        }
    }

    static projectShape(shape, angle = 0, pivot = createVector(0, 0)) {
        return {
            x: this.projectDimention(shape, 'width', angle, pivot),
            y: this.projectDimention(shape, 'heigth', angle, pivot)
        }
    }

    static drawProjection(projection, angle, color) {
        let x1 = Vector.sub(createVector(projection.x.min.x, window.canvasHeight), projection.x.min)
        let x2 = Vector.sub(createVector(projection.x.max.x, window.canvasHeight), projection.x.max)
        let y1 = Vector.sub(createVector(window.canvasWidth, projection.y.min.y), projection.y.min)
        let y2 = Vector.sub(createVector(window.canvasWidth, projection.y.max.y), projection.y.max)

        // x1.rotate(-angle)
        // x2.rotate(-angle)
        // y1.rotate(-angle)
        // y2.rotate(-angle)

        Vector.drawArrow(projection.x.min, x1, color)
        Vector.drawArrow(projection.x.max, x2, color)
        Vector.drawArrow(projection.y.min, y1, color)
        Vector.drawArrow(projection.y.max, y2, color)
    }

    static intersects(shape1, shape2) {
        const angle = shape1.longestAxis > shape2.longestAxis
            ? shape1.projectionAngle
            : shape2.projectionAngle

        const projection1 = this.projectShape(shape1)
        const projection2 = this.projectShape(shape2)

        this.drawProjection(projection1, angle, 'red')
        this.drawProjection(projection2, angle, 'blue')
    }

}