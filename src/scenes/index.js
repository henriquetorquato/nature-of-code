// Main Project
import Ecosystem from './ecosystem/scene'

// Chapter 1: Vectors
import RandomWalker from './chapter_1_vectors/random_walker'
import PaintSplatter from './chapter_1_vectors/paint_splatter'
import ColorNoise from './chapter_1_vectors/color_noise'
import NoiseLanscape from './chapter_1_vectors/noise_landscape'
import BouncingSphere from './chapter_1_vectors/bouncing_sphere'
import CarAcceleration from './chapter_1_vectors/car_acceleration'
import PerlinAcceleration from './chapter_1_vectors/perlin_acceleration'
import GravitationalAcceleration from './chapter_1_vectors/gravitational_acceleration'

// Chapter 2: Forces
import HeliumBalloon from './chapter_2_forces/helium_balloon'
import BouncingBall from './chapter_2_forces/bouncing_ball'
import PortalGels from './chapter_2_forces/portal_gels'
import FluidDrag from './chapter_2_forces/fluid_drag'
import LiftDrag from './chapter_2_forces/lift_drag'
import AttractorDesign from './chapter_2_forces/attractor_design'
import MouseAttraction from './chapter_2_forces/mouse_attraction'

const scenes = {
    'ecosystem': Ecosystem,
    'random_walker': RandomWalker,
    'paint_splatter': PaintSplatter,
    'color_noise': ColorNoise,
    'noise_landscape': NoiseLanscape,
    'bouncing_sphere': BouncingSphere,
    'car_acceleration': CarAcceleration,
    'perlin_acceleration': PerlinAcceleration,
    'gravitational_acceleration': GravitationalAcceleration,
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