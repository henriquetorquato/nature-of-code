import RandomWalker from './random_walker'
import PaintSplatter from './paint_splatter'
import ColorNoise from './color_noise'

const scenes = {
    'random_walker': RandomWalker,
    'paint_splatter': PaintSplatter,
    'color_noise': ColorNoise
}

const getScene = (key) => {
    let scene = scenes[key]
    if (scene) return scene
    throw `Scene ${key} not found`
}

export {
    getScene
}