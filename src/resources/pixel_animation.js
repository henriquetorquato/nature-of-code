export default class PixelAnimation {

    constructor(frames) {
        this.frames = frames
        this.height = frames[0].length
        this.width = frames[0][0].length
        this.state = 0
        this.frameGraphics = this.preRender()
    }

    preRender() {
        return this.frames.map((_, index) => this.renderFrame(index))
    }

    renderFrame(i) {
        const frame = this.frames[i]
        const graphics = createGraphics(this.width, this.height)
        graphics.noStroke()
        graphics.fill(0)

        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.height; x++) {
                if (frame[y][x] === 0) continue
                graphics.square(x, y, 1)
            }
        }

        return graphics
    }

    frame(index) {
        return this.frameGraphics[index]
    }

    next() {
        if (this.state > this.frameGraphics.length - 1) {
            this.state = 0
        }

        const frame = this.frame(this.state)
        this.state++

        return frame
    }

}