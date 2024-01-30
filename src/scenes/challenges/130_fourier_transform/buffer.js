const DEFAULT_BUFFER_SIZE = 500

class StrokeBuffer {

    constructor() {
        this.buffer = []
    }

    add(point) {
        this.buffer.push(point)
    }

    draw() {
        beginShape()
        noFill()
        for (let i = 0; i < this.buffer.length; i++) {
            const data = this.buffer[i]
            vertex(data.x, data.y)
        }
        endShape()
    }

    clear() {
        this.buffer = []
    }
}

class DrawingBuffer {

    constructor() {
        this.clear()
    }

    draw() {
        for (const stroke of this.strokes) {
            stroke.draw()
        }
    }

    nextStroke(size) {
        this.strokeIndex++
        this.strokes[this.strokeIndex] = new StrokeBuffer(size)
    }

    add(point) {
        this.getCurrentStroke().add(point)
    }

    getCurrentStroke() {
        return this.strokes[this.strokeIndex]
    }

    clear() {
        this.strokes = []
        this.strokeIndex = -1
    }
}

export { DrawingBuffer }