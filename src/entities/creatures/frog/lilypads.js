export default class Lilypads {

    lilypads = []

    get positions() {
        return this.lilypads.map(l => l.position)   
    }

    setup() {
        const amount = Math.randomBetween(4, 8)

        for (let i = 0; i < amount; i++) {
            const lilypad = {
                size : randomGaussian(20, 3),
                position: Math.randomPosition(),
                color: color(
                    randomGaussian(20, 10),
                    randomGaussian(180, 40),
                    randomGaussian(30, 10)
                )
            }

            this.lilypads.push(lilypad)
        }
    }

    draw() {
        push()
        rectMode(CENTER)
        for (let i = 0; i < this.lilypads.length; i++) {
            this.drawLily(this.lilypads[i])    
        }
        pop()
    }

    drawLily(lily) {
        fill(lily.color)
        ellipse(lily.position.x, lily.position.y, lily.size)
    }

}