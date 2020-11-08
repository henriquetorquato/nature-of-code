const COLOR_VARIATION = 0.5
const COLOR_DEVIATION = 20

export const FishType = {
    Prey: 1,
    Predator: 0
}

export class FishGenes {

    constructor(baseGenes) {
        this.color = this.generateColor()
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

    generateColor() {
        let r, g, b
        if (Math.random() < COLOR_VARIATION)
        {
            // Blue
            r = 143
            g = 139
            b = 163
        }
        else
        {
            // Red
            r = 184
            g = 127
            b = 127
        }

        return color(
            randomGaussian(r, COLOR_DEVIATION),
            randomGaussian(g, COLOR_DEVIATION),
            randomGaussian(b, COLOR_DEVIATION))
    }

}