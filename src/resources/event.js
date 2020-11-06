export default class EventManager {

    // Events is a dictionary of lists
    events = {}

    subscribe(name, callback) {
        const handlers = this.events[name]
        if (handlers === undefined)
        {
            this.events[name] = [callback]
        }
        else
        {
            this.events[name].push(callback)
        }
    }

    unsubscribe(name, callback) {
        const handlers = this.events[name]
        if (handlers !== undefined)
        {
            const index = handlers.indexOf(callback)
            this.events[name].splice(index, 1)
        }
    }

    publish(name, args = {}) {
        this.events[name]
        .forEach(handler => handler(args))
    }

}