import 'p5'
import './resources'
import './index.css'

import { Director, SideMenu } from './components'

const director = new Director()
const sideMenu = new SideMenu()

window.preload = () => {
    window.font = loadFont('./src/assets/NotCourierSans/NotCourierSans.otf')
}

window.setup = () => {
    sideMenu.setup()
    director.setup()
}

window.draw = () => {
    director.draw()
}

window.keyPressed = () => {
    director.keyPressed()
}