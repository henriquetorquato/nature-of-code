import 'p5'
import './resources/random'
import './index.css'

import { Director, Window } from './components'

const director = new Director()
const gameWindow = new Window(500, 500)

window.setup = () => {
    gameWindow.create()
    gameWindow.setBackroundColor(225)

    director.setup()
}

window.draw = () => {
    director.draw()
}