import Fluid from '@entities/fluid'

export class Water extends Fluid {
    constructor() {
        super(createVector(0, 0), window.canvasSize, color(0, 126, 255, 102), 0.2)
    }
}

export class Air extends Fluid {
    constructor() {
        super(createVector(0, 0), window.canvasSize, null, 0.1)
    }
}
