import Walker from '@entities/walker'
import Fluid from '@entities/fluid'
import { BouncingSquareBorder } from '@resources/border'
import Rect from '@resources/rect'

export default class FluidDrag {

    setup() {
        const waterPosition = createVector(0, window.canvasCenter.y + 100)
        const size = {
            width: window.canvasSize.width,
            height: window.canvasCenter.y + 100
        }

        const waterColor = color(137, 191, 237, 100)
        const coeficient = 0.15

        this.water = new Fluid(waterPosition, size, waterColor, coeficient)

        this.boxes = [
            new Box(createVector(100, 0), 20),
            new Box(createVector(200, 0), 40),
            new Box(createVector(300, 0), 60)
        ]        

        this.gravity = createVector(0, 0.98)
    }

    draw() {
        clear()
        background(220)

        this.boxes.forEach(box =>
        {
            box.applyForce(this.gravity)

            if (Rect.intersects(box.rect, this.water.rect)) {
                const drag = this.water.drag(box.velocity, box.size.width)
                box.applyForce(drag)
            }

            box.update()
            box.display()
        })

        this.water.display()
    }

}

class Box extends Walker {

    constructor(position, size) {
        super(position, size)
        this.position = position
        this.size = {
            width: size,
            height: size
        }

        this.canvasBorder = new BouncingSquareBorder(this.size)
    }

    get rect() {
        return Rect.from(this.position, this.size)
    }

    display() {
        push()
        square(this.position.x, this.position.y, this.size.width)
        pop()
    }

}