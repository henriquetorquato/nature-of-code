const SIZE_MEAN = 10
const SIZE_DEVIATION = 2
const LENGTH_MEAN = 100
const LENGTH_DEVIATION = 20
const MAX_VELOCITY_MEAN = 1
const MAX_VELOCITY_DEVIATION = 0.2
const COLOR_DEVIATION = 30

export default class SlitheringSnakeGenes {

    constructor() {
        this.size = randomGaussian(SIZE_MEAN, SIZE_DEVIATION)
        this.length = randomGaussian(LENGTH_MEAN, LENGTH_DEVIATION)
        this.maxVelocity = randomGaussian(MAX_VELOCITY_MEAN, MAX_VELOCITY_DEVIATION)
        this.color = color(
            randomGaussian(60, COLOR_DEVIATION),
            randomGaussian(80, COLOR_DEVIATION),
            randomGaussian(20, COLOR_DEVIATION))
    }

}