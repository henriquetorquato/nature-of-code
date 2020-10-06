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