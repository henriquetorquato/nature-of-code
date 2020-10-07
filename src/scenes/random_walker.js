import Walker from '../entities/walker'

export default class RandomWalker {

    setup() {
        const { x, y } = window.canvasCenter
        this.walker = new Walker(x, y)
    }

    draw() {
        this.walker.step()
        this.walker.display()
    }

}