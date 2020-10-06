export default class Walker {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    step() {
        const moveToMouse = Math.random() > 0.5
        if (moveToMouse)
        {
            this.x += this.x - mouseX > 0 ? -1 : 1
            this.y += this.y - mouseY > 0 ? -1 : 1
        }
        else
        {
            this.x += Math.randomBetween(-1, 1)
            this.y += Math.randomBetween(-1, 1)
        }
    }

    display() {
        ellipse(this.x, this.y, 5)
    }

}