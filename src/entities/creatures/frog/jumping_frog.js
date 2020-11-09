import { Vector } from 'p5'

const FrogState = {
    Waiting: 0,
    Jumping: 1
}

export default class JumpingFrog {

    constructor(positions) {
        this.positions = positions
        this.previousPosition = null
        this.currentPosition = this.nextLilypad()
        this.state = FrogState.Waiting

        setInterval(() =>
        {
            this.previousPosition = Vector.copy(this.currentPosition)
            this.currentPosition = this.nextLilypad()
        }, 5000)
    }

    update() {
        /*
        * TO-DO: Apply "f(x) = ((-x^2) / distance) + x" as jump animation,
        * where "f(x)" is the velocity given time "x" (use geogebra).
        */
    }

    display() {
        push()
        rectMode(CENTER)
        fill(0)
        ellipse(this.currentPosition.x, this.currentPosition.y, 20)
        pop()
    }

    nextLilypad() {
        if (this.currentPosition === undefined)
        {
            const index = Math.randomBetween(0, this.positions.length - 1)
            return this.positions[index]
        }
        
        const sortedPositions = this.positions.sort((a, b) =>
        {
            const distanceA = Vector.sub(this.currentPosition, a)
            const distanceB = Vector.sub(this.currentPosition, b)

            if (distanceA.mag() < distanceB.mag())
            {
                return -1
            }
            else if (distanceA.mag() > distanceB.mag())
            {
                return 1
            }
            else
            {
                return 0
            }
        })
        
        // Index 0 is the current
        const index = Math.randomBetween(1, 3)
        return sortedPositions[index]
    }

}