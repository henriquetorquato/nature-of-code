export default class Walker {

    constructor(x, y, shouldFollowMouse = false) {
        this.x = x
        this.y = y
        this.shouldFollowMouse = shouldFollowMouse
    }

    step() {
        const direction = this.getDirection()
        const stepX = this.getStepSize()
        const stepY = this.getStepSize()

        this.x += direction.x * stepX
        this.y += direction.y * stepY
    }

    display() {
        fill(255, 100, 0)
        ellipse(this.x, this.y, 10)
    }

    getStepSize() {
        let size = null
        do {
            const r1 = Math.randomBetween(0, 10)
            const r2 = Math.randomBetween(0, 10)
            const probability = Math.pow(r1, 2)

            if (r2 < probability){
                size = r1
                break
            }
        } while (size == null)

        return size
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