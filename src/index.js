import 'p5'
import './resources'
import './index.css'

import { Director } from './components'

const director = new Director()

window.preload = () => {
    window.font = loadFont('./src/assets/NotCourierSans/NotCourierSans.otf')
}

window.setup = () => {
    director.setup()
}

window.draw = () => {
    director.draw()
}