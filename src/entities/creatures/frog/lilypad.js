const LILYPAD_CHANCE = 0.5
const MIN_LILYPAD_DISTANCE = 100

const SIZE_MEAN = 30
const SIZE_DEVIATION = 3
const STROKE_COLOR_VALUE = 50
const BASE_COLOR = [20, 180, 30]
const COLOR_VARIATION = [10, 20, 10]

export class Lilypad {

    lilyColor = null
    strokeColor = null

    constructor(position) {
        this.position = position
        
        this.diameter = randomGaussian(SIZE_MEAN, SIZE_DEVIATION)
        this.generateColors()
    }

    display() {
        push()
        rectMode(CENTER)
        fill(this.lilyColor)
        stroke(this.strokeColor)
        circle(this.position.x, this.position.y, this.diameter)
        pop()
    }

    generateColors() {
        this.lilyColor = color(
            randomGaussian(BASE_COLOR[0], COLOR_VARIATION[0]),
            randomGaussian(BASE_COLOR[1], COLOR_VARIATION[1]),
            randomGaussian(BASE_COLOR[2], COLOR_VARIATION[2])
        )

        this.strokeColor = color(
            this.lilyColor.levels[0] - STROKE_COLOR_VALUE,
            this.lilyColor.levels[1] - STROKE_COLOR_VALUE,
            this.lilyColor.levels[2] - STROKE_COLOR_VALUE
        )
    }

}

/*
*   The lily pads are generated on a grid based format, where
*   each cell has a given chance of having onde lily pad on it.
*   
*   If the cell is going to have a lily pad, instead of always
*   placing it at the center of the cell, the position is randomized.
*/
export const generateLilypads = () => {
    const lilypads = []
    const size = { ...window.canvasSize }

    for (let x = 0; x < size.width; x += MIN_LILYPAD_DISTANCE)
    {
        for (let y = 0; y < size.height; y += MIN_LILYPAD_DISTANCE)
        {
            if (Math.random() > LILYPAD_CHANCE)
            {
                continue     
            }

            const position = createVector(
                Math.randomBetween(x, x + MIN_LILYPAD_DISTANCE),
                Math.randomBetween(y, y + MIN_LILYPAD_DISTANCE))

            const lilypad = new Lilypad(position)
            lilypads.push(lilypad)
        }
    }

    return lilypads
}