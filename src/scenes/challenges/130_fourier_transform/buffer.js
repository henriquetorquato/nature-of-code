const DEFAULT_BUFFER_SIZE = 500

class StrokeBuffer {

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

    constructor(position) {
        this.position = position
        this.clear()
    }

    draw() {
        for (const stroke of this.strokes) {
            stroke.draw()
        }
    }

    nextStroke(size) {
        this.strokeIndex++
        this.strokes[this.strokeIndex] = new StrokeBuffer(this.position, size)
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