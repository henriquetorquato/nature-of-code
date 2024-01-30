import { coffeeMugData } from './data'
import { DrawingBuffer } from './buffer'

export default class FourierTransformDrawing {

    setup() {
        this.drawingBuffer = new DrawingBuffer(createVector(0, 0))

        this.isDrawingEnd = true
        this.isStrokeEnd = true

        this.timeoutEnd = undefined
    }

    draw() {
        clear()
        background(0)

        if (this.timeoutEnd != undefined) {
            const now = Date.now()
            if (now > this.timeoutEnd) {
                this.timeoutEnd = undefined
            } else {
                return
            }
        }

        if (this.isDrawingEnd) {
            this.strokeIndex = 0
            this.drawingData = this.getNextDrawing()

            this.isDrawingEnd = false
            this.isStrokeEnd = true
        }
        
        if (this.isStrokeEnd) {
            if (this.strokeIndex == this.drawingData.length) {
                this.drawingBuffer.clear()
                this.isDrawingEnd = true
                this.timeoutEnd = Date.now() + 1000
                return
            }

            const { x, y } = this.drawingData[this.strokeIndex]

            const fourierX = Fourier.discreteTransform(x).map(data => new Epicycle(data, 0))
            const fourierY = Fourier.discreteTransform(y).map(data => new Epicycle(data, HALF_PI))
            const dataLenght = fourierX.length

            this.time = 0
            this.deltaTime = TWO_PI / dataLenght

            this.drawingBuffer.nextStroke(dataLenght)

            this.epicyclesX = new EpicycleCollection(createVector(250, 60), fourierX)        
            this.epicyclesY = new EpicycleCollection(createVector(60, 250), fourierY)

            this.isStrokeEnd = false
            this.strokeIndex += 1
        }

        this.epicyclesX.update(this.time)
        this.epicyclesX.draw()

        this.epicyclesY.update(this.time)
        this.epicyclesY.draw()

        const lastValueX = this.epicyclesX.getLastValue()
        const lastValueY = this.epicyclesY.getLastValue()

        const data = createVector(lastValueX.x, lastValueY.y)

        line(lastValueX.x, lastValueX.y, data.x, data.y)
        line(lastValueY.x, lastValueY.y, data.x, data.y)

        this.drawingBuffer.add(data)
        this.drawingBuffer.draw()

        this.time += this.deltaTime

        if (this.time > TWO_PI) {
            this.isStrokeEnd = true
        }
    }

    getNextDrawing() {
        // TODO: Remove non recognized drawings from dataset
        let quickDrawShape
        do {
            const index = Math.randomBetween(0, coffeeMugData.length - 1)
            quickDrawShape = coffeeMugData[index]
        } while(!quickDrawShape.recognized)

        let data = []

        for (const stroke of quickDrawShape.drawing) {
            let x = []
            let y = []

            for (let i = 0; i < stroke[0].length; i++) {
                x.push(stroke[0][i])
                y.push(stroke[1][i])    
            }

            data.push({ x, y })
        }

        return data
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

    constructor({ frequency, amplitude, phase }, rotation) {
        this.frequency = frequency
        this.amplitude = amplitude
        this.phase = phase
        this.rotation = rotation

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
        const cosTime = cos(this.frequency * time + this.phase + this.rotation)
        const sinTime = sin(this.frequency * time + this.phase + this.rotation)

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
            .sort((a, b) => b.amplitude - a.amplitude)
    }
}