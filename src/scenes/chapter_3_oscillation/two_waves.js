export default class TwoWaves {

    setup() {
        this.wave1 = new Wave(window.canvasCenter.y, window.canvasWidth, 0.01, 0.001, 20, 10)
        this.wave2 = new Wave(-window.canvasCenter.y, window.canvasWidth, 0.01, 0.001, 20, 10)
        this.wave3 = new Wave(100, window.canvasWidth, 0.1, 0.1, 20, 20)
        this.wave4 = new Wave(-window.canvasHeight, window.canvasWidth, 0.05, 0.1, 20, 20)
    }

    draw() {
        clear()
        background(240)

        push()
        noStroke()
        translate(0, window.canvasCenter.y)
        fill(200, 100, 100, 100)
        this.wave1.draw()
        this.wave2.draw()
        pop()

        push()
        noStroke()
        translate(0, window.canvasCenter.y - this.wave3.amplitude / 2)
        fill(100, 100, 200, 100)
        this.wave3.draw()
        pop()

        push()
        noStroke()
        translate(0, window.canvasCenter.y - this.wave4.amplitude / 2)
        fill(100, 200, 100, 100)
        this.wave4.draw()
        pop()

        this.wave1.update()
        this.wave2.update()
        this.wave3.update()
        this.wave4.update()
    }

}

class Wave {

    constructor(amplitude, size, angleVelocity, circleAngleVelocity, circleSize, circleDistance) {
        this.angle = 0
        this.amplitude = amplitude
        this.size = size
        this.angleVelocity = angleVelocity

        this.circleAngleVelocity = circleAngleVelocity
        this.circleSize = circleSize
        this.circleDistance = circleDistance
    }

    update() {
        this.angle += this.angleVelocity
    }

    draw() {
        for (let x = 0; x <= this.size; x++)
        {
            if (x % this.circleDistance != 0) continue

            const angle = this.angle + (x * this.circleAngleVelocity)
            const y = map(Math.sin(angle), -1, 1, 0, this.amplitude)

            circle(x, y, this.circleSize)
        }
    }

}
