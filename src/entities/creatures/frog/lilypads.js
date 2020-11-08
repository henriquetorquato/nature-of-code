const LILYPAD_CHANCE = 0.5
const MIN_DISTANCE = 100

export default class Lilypads {

    lilypads = []

    get positions() {
        return this.lilypads.map(l => l.position)   
    }

    setup() {
        const size = { ...window.canvasSize }

        for (let x = 0; x < size.width; x += MIN_DISTANCE)
        {
            for (let y = 0; y < size.height; y += MIN_DISTANCE)
            {
                if (Math.random() > LILYPAD_CHANCE)
                {
                    continue     
                }

                const size = randomGaussian(30, 3)

                const position = createVector(
                    Math.randomBetween(x, x + MIN_DISTANCE),
                    Math.randomBetween(y, y + MIN_DISTANCE))

                const lilyColor = color(
                    randomGaussian(20, 10),
                    randomGaussian(180, 20),
                    randomGaussian(30, 10)
                )

                const strokeColor = color(
                    lilyColor.levels[0] - 50,
                    lilyColor.levels[1] - 50,
                    lilyColor.levels[2] - 50
                )

                this.lilypads.push({
                    position: position,
                    size : size,
                    color: lilyColor,
                    stroke: strokeColor
                })
            }
        }
    }

    draw() {
        push()
        rectMode(CENTER)
        this.lilypads.forEach(lilypad =>
        {
            stroke(lilypad.stroke)
            fill(lilypad.color)
            ellipse(lilypad.position.x, lilypad.position.y, lilypad.size)
        })
        pop()
    }

}