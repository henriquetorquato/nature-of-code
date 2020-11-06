import RandomWalker from './random_walker'
import PaintSplatter from './paint_splatter'
import ColorNoise from './color_noise'
import NoiseLanscape from './noise_landscape'
import BouncingSphere from './bouncing_sphere'
import CarAcceleration from './car_acceleration'
import PerlinAcceleration from './perlin_acceleration'
import GravitationalAcceleration from './gravitational_acceleration'
import Ecosystem from './ecosystem'
import HeliumBalloon from './helium_balloon'
import BouncingBall from './bouncing_ball'
import PortalGels from './portal_gels'
import FluidDrag from './fluid_drag'
import LiftDrag from './lift_drag'
import AttractorDesign from './attractor_design'
import MouseAttraction from './mouse_attraction'

const scenes = {
    'random_walker': RandomWalker,
    'paint_splatter': PaintSplatter,
    'color_noise': ColorNoise,
    'noise_landscape': NoiseLanscape,
    'bouncing_sphere': BouncingSphere,
    'car_acceleration': CarAcceleration,
    'perlin_acceleration': PerlinAcceleration,
    'gravitational_acceleration': GravitationalAcceleration,
    'ecosystem': Ecosystem,
    'helium_balloon': HeliumBalloon,
    'bouncing_ball': BouncingBall,
    'portal_gels': PortalGels,
    'fluid_drag': FluidDrag,
    'lift_drag': LiftDrag,
    'attractor_design': AttractorDesign,
    'mouse_attraction': MouseAttraction
}

const getScene = (key) => {
    let scene = scenes[key]
    if (scene) return new scene()
    throw `Scene ${key} not found`
}

export {
    getScene
}