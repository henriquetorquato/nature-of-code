const STEPSIZE_NOISE_OFFSET = 0.01

export default class Walker {

    constructor(x, y, shouldFollowMouse = false) {
        this.x = x
        this.y = y
        this.shouldFollowMouse = shouldFollowMouse

        this.noiseOffsetX = 0
        this.noiseOffsetY = 1000
    }

    step() {
        const direction = this.getDirection()
        const stepX = map(noise(this.noiseOffsetX), 0, 1, 0, 5)
        const stepY = map(noise(this.noiseOffsetY), 0, 1, 0, 5)

        this.x += direction.x * stepX
        this.y += direction.y * stepY

        this.noiseOffsetX += STEPSIZE_NOISE_OFFSET
        this.noiseOffsetY += STEPSIZE_NOISE_OFFSET
    }

    display() {
        fill(255, 100, 0)
        ellipse(this.x, this.y, 30)
    }

    getDirection() {
        let x, y
        if (this.moveToMouse)
        {
            x = this.x - mouseX > 0 ? -1 : 1,
            y = this.y - mouseY > 0 ? -1 : 1
        }
        else
        {
            x = Math.randomBetween(-1, 1)
            y = Math.randomBetween(-1, 1)
        }

        return {
            x: x,
            y: y
        }
    }

    get moveToMouse() {
        return this.shouldFollowMouse && Math.random() > 0.5
    }

}