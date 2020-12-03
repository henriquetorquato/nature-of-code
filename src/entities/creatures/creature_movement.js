import { Vector } from 'p5'

/*
* Abstractions for moving creatures in a certain direction,
* without making it go over the canvas borders.
*/
export default class CreatureMovement {

    constructor(minBorderDistance) {
        // The 'flip' vector to maintain the creature inside the canvas
        this.flip = createVector(1, 1)
        this.directionOffset = Math.randomOffset()
        this.minBorderDistance = minBorderDistance
    }

    nextDirection(offset = 0.01) {
        this.directionOffset.add(0.01)

        const direction = createVector(
            map(noise(this.directionOffset.x), 0, 1, -1, 1),
            map(noise(this.directionOffset.y), 0, 1, -1, 1))
            .normalize()

        this.flip = this.flipVector()
        return Vector.mult(direction, this.flip)
    }

    /*
    * The flip vector is a way of changing the direction that the creature is
    * going, it literally flips the direction based on how close it is to the border.
    */
    flipVector() {
    	const flip = Vector.copy(this.flip)

        // Vector representing the distance to the 4 sides of the border
        const top = Vector.sub(createVector(this.position.x, 0), this.position)
        const left = Vector.sub(createVector(0, this.position.y), this.position)
        const bottom = Vector.sub(createVector(this.position.x, window.canvasHeight), this.position)
        const right = Vector.sub(createVector(window.canvasWidth, this.position.y), this.position)

        if (this.checkFlipDimention(left) || this.checkFlipDimention(right))
        {
            flip.x *= -1
        }

        if (this.checkFlipDimention(top) || this.checkFlipDimention(bottom))
        {
            flip.y *= -1
        }

        return flip
    }

    checkFlipDimention(vector) {
        const angle = Math.abs(this.direction.angleBetween(vector))
        return vector.mag() < this.minBorderDistance && angle < 90
    }

}