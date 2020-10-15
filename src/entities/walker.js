const STEP_NOISE_OFFSET = 0.01

export default class Walker {

    constructor(x, y, shouldFollowMouse = false) {
        this.position = createVector(x, y)
        this.noiseOffset = createVector(0, 1000)
        this.shouldFollowMouse = shouldFollowMouse
    }

    step() {
        const direction = this.getDirection()
        const step = this.getStepSize()

        // Calculate the ellipse movement
        direction.mult(step)

        // Move the ellipse
        this.position.add(direction)

        this.noiseOffset.add([STEP_NOISE_OFFSET, STEP_NOISE_OFFSET])
    }

    display() {
        fill(255, 100, 0)
        ellipse(this.position.x, this.position.y, 30)
    }

    getDirection() {
        let x, y
        if (this.moveToMouse)
        {
            x = this.position.x - mouseX > 0 ? -1 : 1,
            y = this.position.y - mouseY > 0 ? -1 : 1
        }
        else
        {
            x = Math.randomBetween(-1, 1)
            y = Math.randomBetween(-1, 1)
        }

        return createVector(x, y)
    }

    getStepSize() {
        const x = map(noise(this.noiseOffset.x), 0, 1, 0, 5)
        const y = map(noise(this.noiseOffset.y), 0, 1, 0, 5)
        return createVector(x, y)
    }

    get moveToMouse() {
        return this.shouldFollowMouse && Math.random() > 0.5
    }

}