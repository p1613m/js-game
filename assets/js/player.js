class Player extends Drawable {
    constructor(game) {
        super(game)

        this.width = 220
        this.height = 104
        this.x = 0
        this.y = Math.round(this.game.height / 2 - this.height / 2)
        this.speed = 10
    }

    updateCoords() {
        if (game.keys.has('s')) {
            this.y += this.speed
            this.$element?.classList.add('down')
        } else {
            this.$element?.classList.remove('down')
        }

        if (game.keys.has('w')) {
            this.y -= this.speed
            this.$element?.classList.add('up')
        } else {
            this.$element?.classList.remove('up')
        }

        if (game.keys.has('d')) {
            this.x += this.speed
        }

        if (game.keys.has('a')) {
            this.x -= this.speed
        }

        super.updateCoords();
    }

    checkCoords() {
        super.checkCoords();

        if (this.y < 0) {
            this.y = 0
        }
        if (this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height
        }
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width
        }

        this.game.elements.forEach(element => {
            if (element !== this && this.isCollisionWith(element)) {
                if (element.constructor.name === 'Gift') {
                    this.game.upScore()
                    element.remove();
                }
                if (element.constructor.name === 'Enemy') {
                    this.game.finish()
                }
            }
        })
    }

    isCollisionWith(element) {
        const a = this.getFullCoords()
        const b = element.getFullCoords()

        return a.x1 < b.x2 && b.x1 < a.x2 &&
               a.y1 < b.y2 && b.y1 < a.y2
    }
}
