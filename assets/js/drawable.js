class Drawable {
    constructor(game) {
        this.game = game
        this.$element = null
        this.x = null
        this.y = null
        this.width = null
        this.height = null
        this.speed = null
    }

    draw() {
        this.$element = document.createElement('div')
        this.$element.classList.add('drawable')
        this.$element.classList.add(`drawable-${this.constructor.name.toLowerCase()}`)

        this.game.$elements.appendChild(this.$element)

        this.updateCoords()
    }

    updateCoords() {
        if (!this.$element) {
            this.draw()
        }

        this.checkCoords()

        this.$element.style.width = `${this.width}px`
        this.$element.style.height = `${this.height}px`
        this.$element.style.left = `${this.x}px`
        this.$element.style.top = `${this.y}px`
    }

    checkCoords() {

    }

    getFullCoords() {
        return {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.width,
            y2: this.y + this.height,
        }
    }

    remove() {
        const index = this.game.elements.indexOf(this)

        this.game.elements.splice(index, 1)

        this.$element.remove()
    }
}
