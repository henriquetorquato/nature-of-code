import Scene from './scene'
import SceneGroup from './scene_group'

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

// Chapter 3: Oscillation
import RotatingBaton from './chapter_3_oscillation/rotating_baton'
import ObjectCannon from './chapter_3_oscillation/object_cannon/object_cannon'
import DrivingCar from './chapter_3_oscillation/driving_car/driving_car'
import Spiral from './chapter_3_oscillation/spiral'
import AsteroidsSpaceship from './chapter_3_oscillation/asteroids_spaceship/asteroids_spaceship'
import SineSpring from './chapter_3_oscillation/sine_spring'
import InsectLegs from './chapter_3_oscillation/insect_legs'
import PerlinWave from './chapter_3_oscillation/perlin_wave'
import TwoWaves from './chapter_3_oscillation/two_waves'
import ComplexWave from './chapter_3_oscillation/complex_wave'
import MultiplePendulums from './chapter_3_oscillation/multiple_pendulums'
import SlidingBox from './chapter_3_oscillation/sliding_box'
import SpringBob from './chapter_3_oscillation/spring_bob'

// Chapter 4: Particle Systems
import ParticleForce from './chapter_4_particle_systems/particle_force'
import MovingSystem from './chapter_4_particle_systems/moving_system'
import SystemSpawner from './chapter_4_particle_systems/system_spawner'
import ShatteringObject from './chapter_4_particle_systems/shattering_object'
import ParticleRepeller from './chapter_4_particle_systems/particle_repeller'
import RepelingParticleSystem from './chapter_4_particle_systems/particle_repeller/repelling_particle_system'

const scenes = [
    new SceneGroup(
        'projects',
        'Projects',
        [
            new Scene('ecosystem', 'Ecosystem', Ecosystem)
        ]
    ),
    new SceneGroup(
        'chapter_1',
        'Chapter 1: Vectors',
        [
            new Scene('random_walker', 'Random Walker', RandomWalker),
            new Scene('paint_splatter', 'Paint Splatter', PaintSplatter),
            new Scene('color_noise', 'Color Noise', ColorNoise),
            new Scene('noise_landscape', 'Noise Lanscape', NoiseLanscape),
            new Scene('bouncing_sphere', 'Bouncing Sphere', BouncingSphere),
            new Scene('car_acceleration', 'Car Acceleration', CarAcceleration),
            new Scene('perlin_acceleration', 'Perlin Acceleration', PerlinAcceleration),
            new Scene('gravitational_acceleration', 'Gravitational Acceleration', GravitationalAcceleration)
        ]
    ),
    new SceneGroup(
        'chapter_2',
        'Chapter 2: Forces',
        [
            new Scene('helium_balloon', 'Helium Balloon', HeliumBalloon),
            new Scene('bouncing_ball', 'Bouncing Ball', BouncingBall),
            new Scene('portal_gels', 'Portal Gels', PortalGels),
            new Scene('fluid_drag', 'Fluid Drag', FluidDrag),
            new Scene('lift_drag', 'Lift Drag', LiftDrag),
            new Scene('attractor_design', 'Attractor Design', AttractorDesign),
            new Scene('mouse_attraction', 'Mouse Attraction', MouseAttraction)
        ]
    ),
    new SceneGroup(
        'chapter_3',
        'Chapter 3: Oscillation',
        [
            new Scene('rotating_baton', 'Rotating Baton', RotatingBaton),
            new Scene('object_cannon', 'Object Cannon', ObjectCannon),
            new Scene('driving_car', 'Driving Car', DrivingCar),
            new Scene('spiral', 'Spiral', Spiral),
            new Scene('asteroids_spaceship', 'Asteroids Spaceship', AsteroidsSpaceship),
            new Scene('sine_spring', 'Sine Spring', SineSpring),
            new Scene('insect_legs', 'Insect Legs', InsectLegs),
            new Scene('perlin_wave', 'Perlin Wave', PerlinWave),
            new Scene('two_waves', 'Two Waves', TwoWaves),
            new Scene('complex_wave', 'Complex Wave', ComplexWave),
            new Scene('multiple_pendulums', 'Multiple Pendulums', MultiplePendulums),
            new Scene('sliding_box', 'Sliding Box', SlidingBox),
            new Scene('spring_bob', 'Spring Bob', SpringBob)
        ]
    ),
    new SceneGroup(
        'chapter_4',
        'Chapter 4: Particle Systems',
        [
            new Scene('particle_force', 'Particle Force', ParticleForce),
            new Scene('moving_system', 'Moving System', MovingSystem),
            new Scene('system_spawner', 'System Spawner', SystemSpawner),
            new Scene('shattering_object', 'Shattering Object', ShatteringObject),
            new Scene('particle_repeller', 'Particle Repeller',  ParticleRepeller)
        ]
    )
]

const createSceneRegistry = () => {
    const registy = []

    for (const sceneGroup of scenes) {
        for (const scene of sceneGroup.scenes) {
            registy[scene.id] = scene.classtype
        }
    }

    return registy
}

const sceneRegistry = createSceneRegistry()

const getScene = (key) => {
    let scene = sceneRegistry[key]
    if (scene) return new scene()
    throw `Scene ${key} not found`
}

export {
    scenes,
    getScene
}