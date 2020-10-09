import RandomWalker from './random_walker'
import PaintSplatter from './paint_splatter'
import ColorNoise from './color_noise'
import NoiseLanscape from './noise_landscape'

const scenes = {
    'random_walker': RandomWalker,
    'paint_splatter': PaintSplatter,
    'color_noise': ColorNoise,
    'noise_landscape': NoiseLanscape
}

const getScene = (key) => {
    let scene = scenes[key]
    if (scene) return new scene()
    throw `Scene ${key} not found`
}

export {
    getScene
}