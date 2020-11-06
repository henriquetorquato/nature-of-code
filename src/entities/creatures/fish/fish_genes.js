const COLOR_DEVIATION = 20

export const FishType = {
    Prey: 1,
    Predator: 0
}

export class FishGenes {

    constructor(baseGenes) {
        this.color = color(
            randomGaussian(60, COLOR_DEVIATION),
            randomGaussian(20, COLOR_DEVIATION),
            randomGaussian(80, COLOR_DEVIATION))
        this.size = this.generateSize(baseGenes)
        this.maxVelocity = Math.randomBetween(0.5, 1)
        this.swimmingScale = Math.random()
    }

    generateSize(baseGenes) {
        return {
            width: randomGaussian(baseGenes.width.mean, baseGenes.width.deviation),
            height: randomGaussian(baseGenes.height.mean, baseGenes.height.deviation)
        }
    }

}