class Player extends Drawable {
    constructor(game) {
        super(game)

        this.width = 220
        this.height = 104
        this.x = 0
        this.y = Math.round(this.game.height / 2 - this.height / 2)
        this.speed = 10
        this.isShoted = false
    }

    updateCoords() {
        if (this.game.keys.has('s')) {
            this.y += this.speed
            this.$element?.classList.add('down')
        } else {
            this.$element?.classList.remove('down')
        }

        if (this.game.keys.has('w')) {
            this.y -= this.speed
            this.$element?.classList.add('up')
        } else {
            this.$element?.classList.remove('up')
        }

        if (this.game.keys.has('d')) {
            this.x += this.speed
        }

        if (this.game.keys.has('a')) {
            this.x -= this.speed
        }

        if (this.game.keys.has(' ') && !this.isShoted) {
            this.isShoted = true
            this.game.elements.push(new PlayerShot(this.game))
        } else if (!this.game.keys.has(' ')) {
            this.isShoted = false
        }

        super.updateCoords();
    }

    hit(shot) {
        super.hit(shot)

        if (this.hp <= 0) {
            this.game.finish()
        }
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
}
