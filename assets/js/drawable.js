class Drawable {
    constructor(game) {
        this.game = game
        this.$element = null
        this.x = null
        this.y = null
        this.width = null
        this.height = null
        this.speed = null
        this.hp = 100
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

    hit(shot) {
        this.hp -= shot.damage

        this.$element.classList.add('shot')

        setTimeout(() => {
            this.$element.classList.remove('shot')
        }, 100)

        if (this.hp <= 0) {
            this.remove()
        }
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

    isCollisionWith(element) {
        const a = this.getFullCoords()
        const b = element.getFullCoords()

        return a.x1 < b.x2 && b.x1 < a.x2 &&
            a.y1 < b.y2 && b.y1 < a.y2
    }

    remove() {
        const index = this.game.elements.indexOf(this)

        this.game.elements.splice(index, 1)

        this.$element.remove()
    }
}
