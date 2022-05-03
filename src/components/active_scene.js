const DEFAULT_SCENE = 'random_walker'

export const getActiveScene = () => {
    const scene_id = window.location.hash

    if (!(scene_id)) {
        return DEFAULT_SCENE
    }

    return scene_id.substring(1)
}