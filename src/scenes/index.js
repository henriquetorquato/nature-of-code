import RandomWalker from './random_walker'
import PaintSplatter from './paint_splatter'
import ColorNoise from './color_noise'
import NoiseLanscape from './noise_landscape'
import BouncingSphere from './bouncing_sphere'
import CarAcceleration from './car_acceleration'
import PerlinAcceleration from './perlin_acceleration'
import GravitationalAcceleration from './gravitational_acceleration'

const scenes = {
    'random_walker': RandomWalker,
    'paint_splatter': PaintSplatter,
    'color_noise': ColorNoise,
    'noise_landscape': NoiseLanscape,
    'bouncing_sphere': BouncingSphere,
    'car_acceleration': CarAcceleration,
    'perlin_acceleration': PerlinAcceleration,
    'gravitational_acceleration': GravitationalAcceleration
}

const getScene = (key) => {
    let scene = scenes[key]
    if (scene) return new scene()
    throw `Scene ${key} not found`
}

export {
    getScene
}