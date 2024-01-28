import { coffeeMugData } from './data'

const MAX_DATA_SIZE = 100
const BUFFER_SIZE = 900

export default class FourierTransformDrawing {

    setup() {
        this.buffer = new Buffer(createVector(0, 0), BUFFER_SIZE)

        const { x, y } = this.getNextDrawing()

        const fourierX = Fourier.discreteTransform(x).map(data => new Epicycle(data)).slice(1, x.length)
        const fourierY = Fourier.discreteTransform(y).map(data => new Epicycle(data)).slice(1, y.length)

        this.time = 0
        this.deltaTime = TWO_PI / fourierX.length

        this.epicyclesX = new EpicycleCollection(createVector(250, 60), fourierX)        
        this.epicyclesY = new EpicycleCollection(createVector(60, 250), fourierY)
    }

    // TODO: Implement global time
    draw() {
        clear()
        background(0)

        this.epicyclesX.update(this.time)
        this.epicyclesX.draw()

        this.epicyclesY.update(this.time)
        this.epicyclesY.draw()

        const lastValueX = this.epicyclesX.getLastValue()
        const lastValueY = this.epicyclesY.getLastValue()

        const data = createVector(lastValueX.x, lastValueY.y)

        line(lastValueX.x, lastValueX.y, data.x, data.y)
        line(lastValueY.x, lastValueY.y, data.x, data.y)

        this.buffer.add(data)
        this.buffer.draw()

        this.time += this.deltaTime
    }

    getNextDrawing() {
        const index = Math.randomBetween(0, MAX_DATA_SIZE - 1)
        const quickDrawShape = coffeeMugData[index]

        let x = []
        let y = []

        for (const stroke of quickDrawShape.drawing) {
            x.push(...stroke[0])
            y.push(...stroke[1])
        }

        return { x, y }
    }
}

class Buffer {

    constructor(position, size) {
        this.size = size
        this.position = position

        this.buffer = []
    }

    add(point) {
        this.buffer.unshift(point)

        if (this.buffer.length > this.size) {
            this.buffer.pop()
        }
    }

    draw() {
        for (let i = 0; i < this.buffer.length; i++) {
            const data = this.buffer[i]
            point(this.position.x + data.x, this.position.x + data.y)
        }
    }
}

class EpicycleCollection {

    constructor(position, epicycles) {
        this.position = position
        this.epicycles = epicycles
        this.lastValue = createVector(0, 0)
    }

    update(time) {
        this.lastValue = this.position
        for (let i = 0; i < this.epicycles.length; i++) {
            const epicycle = this.epicycles[i]
            epicycle.update(this.lastValue, time)
            this.lastValue = epicycle.getValue()
        }
    }

    draw() {
        for (let i = 0; i < this.epicycles.length; i++) {
            const epicycle = this.epicycles[i]
            epicycle.draw()
        }
    }

    getLastValue() {
        return this.lastValue
    }
}

class Epicycle {

    constructor({ frequency, amplitude, phase }) {
        this.frequency = frequency
        this.amplitude = amplitude
        this.phase = phase

        this.position = createVector(0, 0)
        this.value = createVector(0, 0)
    }

    update(position, time) {
        this.position = position
        this.value = this.calculateNextValue(time)
    }

    draw() {
        stroke(255)
        noFill()
        ellipse(this.position.x, this.position.y, this.amplitude * 2)

        fill(255)
        line(this.position.x, this.position.y, this.value.x, this.value.y)
    }

    calculateNextValue(time) {
        const cosTime = cos(this.frequency * time + this.phase + HALF_PI)
        const sinTime = sin(this.frequency * time + this.phase + HALF_PI)

        // God forgive me, but this calculation does not work without the 0 there
        const x = (cosTime * this.amplitude) - 0 + this.position.x
        const y = (sinTime * this.amplitude) + 0 + this.position.y

        return createVector(x, y)
    }

    getValue() {
        return this.value
    }
}

class Fourier {

    static discreteTransform(data) {
        let fourier = []

        for (let k = 0; k < data.length; k++) {
            let real = 0
            let imaginary = 0

            for (let n = 0; n < data.length; n++) {
                const angle = (TWO_PI * k * n) / data.length
                real += data[n] * cos(angle)
                imaginary -= data[n] * sin(angle)
            }

            real = real / data.length
            imaginary = imaginary / data.length

            const frequency = k;
            const amplitude = sqrt(real * real + imaginary * imaginary)
            const phase = atan2(imaginary, real)

            fourier[k] = {
                frequency,
                amplitude,
                phase
            };
        }

        return fourier
    }
}