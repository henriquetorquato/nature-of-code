export default class Gel {

    constructor(position, size, color) {
        this.position = position
        this.color = color
        this.size = size

        this.rect = {
            left: this.position.x,
            right: this.position.x + this.size,
            top: this.position.y,
            bottom: this.position.y + this.size
        }
    }

    display() {
        push()
        noStroke()
        fill(this.color)
        square(this.position.x, this.position.y, this.size)
        pop()
    }

    collides(body) {
        if (!this.shouldCheck(body.position, body.diameter)) {
            return false
        }

        const bodyRect = {
            left: body.position.x,
            right: body.position.x + body.diameter,
            top: body.position.y,
            bottom: body.position.y + body.diameter
        }

        // https://math.stackexchange.com/questions/99565/simplest-way-to-calculate-the-intersect-area-of-two-rectangles
        const overlapX = Math.max(0, Math.min(this.rect.right, bodyRect.right) - Math.max(this.rect.left, bodyRect.left))
        const overlapY = Math.max(0, Math.min(this.rect.bottom, bodyRect.bottom) - Math.max(this.rect.top, bodyRect.top))
        const overlapArea = overlapX * overlapY

        return overlapArea > 0
    }

    shouldCheck(position, size) {
        const gelCenter = createVector(
            this.position.x + this.size / 2,
            this.position.y + this.size / 2)

        const ballCenter = createVector(
            position.x + size / 2,
            position.y + size / 2)

        // Distance between two points
        const distance = Math.sqrt(
            Math.pow(gelCenter.x - ballCenter.x, 2) + Math.pow(gelCenter.y - ballCenter.y, 2)
        )

        // The min distance is the sum of the distances
        // from the center to every side of both rects
        const minDistance = this.size / 2 + size / 2

        return distance <= minDistance
    } 

}