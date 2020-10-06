import RandomWalker from './random_walker'
import PaintSplatter from './paint_splatter'

const scenes = {
    'random_walker': RandomWalker,
    'paint_splatter': PaintSplatter
}

const getScene = (key) => {
    let scene = scenes[key]
    if (scene) return scene
    throw `Scene ${key} not found`
}

export {
    getScene
}