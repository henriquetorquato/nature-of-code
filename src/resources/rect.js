export default class Rect {

    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.center = createVector(x + width / 2, y + height / 2)
        this.left = x,
        this.right = x + width,
        this.top = y,
        this.bottom = y + height
    }

    draw() {
        push()
        stroke(0)
        line(this.left, this.top, this.right, this.top)
        line(this.left, this.top, this.left, this.bottom)
        line(this.left, this.bottom, this.right, this.bottom)
        line(this.right, this.top, this.right, this.bottom)
        pop()
    }

    static from(position, size) {
        return new this(position.x, position.y, size.width, size.height)
    }

    static fromCircle(position, size) {
        const x = position.x - size / 2
        const y = position.y - size / 2
        return new this(x, y, size, size)
    }

    static inside(rect1, rect2) {
        const left = rect1.x > rect2.x
        const right = rect1.x + rect1.width < rect2.x + rect2.width
        const top = rect1.y > rect2.y
        const bottom = rect1.y + rect1.height < rect2.y + rect2.height
        
        return left && right && top && bottom
    }

    static intersects(rect1, rect2) {
        return this.overlapArea(rect1, rect2) > 0
    }

    static overlapArea(rect1, rect2) {
        // https://math.stackexchange.com/questions/99565/simplest-way-to-calculate-the-intersect-area-of-two-rectangles
        const x_overlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left))
        const y_overlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top))
        return x_overlap * y_overlap
    }

}