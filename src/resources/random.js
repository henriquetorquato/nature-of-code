Math.randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

Math.randomColor = () => {
    return {
        r: Math.randomBetween(0, 255),
        g: Math.randomBetween(0, 255),
        b: Math.randomBetween(0, 255)
    }
}

Math.randomOffset = () => {
    const baseline = Math.randomBetween(0, 10000)
    return createVector(
        Math.randomBetween(0, baseline),
        Math.randomBetween(baseline, baseline + 1000),
        Math.randomBetween(baseline + 2000, baseline + 3000))
}

Math.randomPosition = () => {
    return createVector(
        Math.randomBetween(0, window.canvasWidth),
        Math.randomBetween(0, window.canvasHeight))
}