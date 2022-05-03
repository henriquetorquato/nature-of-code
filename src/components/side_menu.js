import 'p5'
import { scenes } from '@scenes'
import { getActiveScene } from './active_scene'

const PARENT_ELEMENT_ID = 'side-menu'

export const ON_SCENE_CHANGE_EVENT = 'on-scene-change'

export default class SideMenu {

    setup() {
        const parentElement = document.getElementById(PARENT_ELEMENT_ID)

        for (const sceneGroup of scenes) {
            const component = this.createSceneGroupComponent(sceneGroup)
            parentElement.appendChild(component)
        }
    }

    createSceneComponent(scene) {
        const { id, name } = scene
    
        const element = document.createElement("div")
        element.id = id
        element.className = "scene-component"

        const nameTextElement = document.createTextNode(name)
        element.appendChild(nameTextElement)

        element.onclick = () => {
            window.location.hash = id
            window.location.reload()
        }

        return element
    }

    createSceneGroupComponent(sceneGroup) {
        const { id, name, scenes } = sceneGroup
    
        const element = document.createElement("div")
        element.id = id
        element.className = "scene-group-component"

        const nameTextElement = document.createElement("div")
        nameTextElement.textContent = name
        nameTextElement.className = "scene-group-component_label"
        element.appendChild(nameTextElement)

        const listElement = document.createElement("div")
        listElement.className = "scene-group-component_list"
        
        const activeScene = getActiveScene()

        for (const scene of scenes) {
            const sceneElement = this.createSceneComponent(scene)            

            if (activeScene === scene.id) {
                sceneElement.classList.add("selected")
            }

            listElement.appendChild(sceneElement)
        }

        element.appendChild(listElement)

        return element
    }
}