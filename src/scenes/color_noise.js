export default class ColorNoise {

    setup() {
        this.zRedOff = 0
        this.zGreenOff = 0
        this.zBlueOff = 0
    }

    draw() {
        loadPixels()

        // Color offset changes with camera movement
        let xRedOff = 0
        let xGreenOff = 2000
        let xBlueOff = 4000

        for (let x = 0; x < window.canvasWidth; x++) {
            
            let yRedOff = 1000
            let yGreenOff = 3000
            let yBlueOff = 5000

            for (let y = 0; y < window.canvasHeight; y++) {
                noiseDetail(1, 0.3)
                const r = this.getPerlinColor(xRedOff, yRedOff, this.zRedOff)
                const g = this.getPerlinColor(xGreenOff, yGreenOff, this.zGreenOff)
                const b = this.getPerlinColor(xBlueOff, yBlueOff, this.zBlueOff)
                
                set(x, y, color(r, g, b))
                
                yRedOff += 0.01
                yGreenOff += 0.01
                yBlueOff += 0.01
            }
            
            xRedOff += 0.01
            xGreenOff += 0.01
            xBlueOff += 0.01   
        }

        updatePixels()
        
        this.zRedOff += 0.1
        this.zGreenOff += 0.1
        this.zBlueOff += 0.1
    }

    getPerlinColor(xoff, yoff, zoff) {
        // Color range start at higher value, to avoid black value
        return map(noise(xoff, yoff, zoff), 0, 1, 50, 255)
    }

}