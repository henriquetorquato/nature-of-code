const CIRCLE_SIZE = 30

export default class ComplexWave {

    setup() {
        this.angle = 0
        this.positionY = window.canvasCenter.y
        this.waveSize = window.canvasWidth / 3

        this.wave1 = new Wave(this.positionY, this.waveSize, 0.005, CIRCLE_SIZE, 15)
        this.wave2 = new Wave(this.positionY, this.waveSize, 0.01, CIRCLE_SIZE, 15)
        this.wave3 = new Wave(this.positionY, this.waveSize, 0.02, CIRCLE_SIZE, 10)
    }

    draw() {
        clear()
        background(255)

        let nextAngle = this.drawWave(this.wave1, this.angle,
            0, this.positionY / 2, color(200, 100, 100, 100))

        nextAngle = this.drawWave(this.wave2, nextAngle,
            this.waveSize, this.positionY / 2, color(100, 200, 100, 100))

        this.drawWave(this.wave3, nextAngle,
            this.waveSize * 2, this.positionY / 2, color(100, 100, 200, 100))

        this.angle += 0.1
    }

    drawWave(wave, startAngle, x, y, color) {
        push()
        noStroke()
        fill(color)
        ellipseMode(CENTER)
        translate(x, y)
        let nextAngle = wave.draw(startAngle)
        pop()

        return nextAngle
    }

}

class Wave {

    constructor(amplitude, size, circleAngleVelocity, circleSize, circleDistance) {
        this.amplitude = amplitude
        this.size = size

        this.circleAngleVelocity = circleAngleVelocity
        this.circleSize = circleSize
        this.circleDistance = circleDistance
    }

    draw(startingAngle) {
        let angle
        for (let x = 0; x <= this.size; x++)
        {
            if (x % this.circleDistance != 0) continue

            angle = startingAngle + this.angleOffset(x)
            const y = map(Math.sin(angle), -1, 1, 0, this.amplitude)

            circle(x, y, this.circleSize)
        }

        return angle
    }

    angleOffset(value) {
        return value * this.circleAngleVelocity
    }

}
