const END_OF_SHAPE_DATA = '\n'
const READ_BUFFER_SIZE = 200

/**
 * Unfortunetely, P5 does not support async operations on it's lifecycle.
 * I had to reduce the dataset to only 100 drawins and pre-load everything before the scene.
 * 
 * But, this piece of code was fun to make and I don't want to trow it away.
 * This should be able to open and stream new drawings from the QuickDraw dataset :)
 */

export default class QuickDraw {

    constructor(datasource) {
        this.datasource = datasource
        this.decoder = new TextDecoder('utf-8')
    }

    setup() {
        (async () => {
            await new Promise((resolve, reject) => {
                fetch(this.datasource)
                    .then(response => {
                        if (!response.ok) {
                            reject('Unable to read source: ' + this.datasource)
                        }
                        
                        return response.body.getReader({ mode: 'byob' })
                    })
                    .then(reader => this.reader = reader)
                    .then(() => resolve())
            })
            .catch(err => {
                throw err
            })
        })()
    }

    async *getShapeGenerator() {
        let done = false
        let readBuffer = new ArrayBuffer(READ_BUFFER_SIZE)

        let quickDrawShape = ''

        while (!done) {
            const bufferArray = new Uint8Array(readBuffer, 0, READ_BUFFER_SIZE)
            const { value: view, done } = await this.reader.read(bufferArray)

            readBuffer = view.buffer;
            const chunk = this.decoder.decode(readBuffer)
            const dataEndAt = chunk.indexOf(END_OF_SHAPE_DATA)

            if (dataEndAt === -1) {
                quickDrawShape += chunk
            } else {
                const chunkEnd = chunk.slice(0, dataEndAt)
                const currentShape = quickDrawShape + chunkEnd

                quickDrawShape = chunk.slice(dataEndAt, chunk.length)

                yield cleanupQuickDrawDrawing(currentShape)
            }

            // if (done) {
            //     return undefined
            // }
        }
    }

    cleanupQuickDrawDrawing(shapeStr) {
        const shapeObj = JSON.parse(shapeStr)

        let x = []
        let y = []

        for (let stroke of shapeObj.drawing) {
            x.push(...stroke[0])
            y.push(...stroke[1])
        }

        return [x, y]
    }
}