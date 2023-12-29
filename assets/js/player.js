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
        }

        if (game.keys.has('w')) {
            this.y -= this.speed
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
    }
}
