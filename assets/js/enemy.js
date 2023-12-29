class Enemy extends Drawable {
    constructor(game) {
        super(game);

        this.width = 200
        this.height = 107
        this.x = this.game.width
        this.y = rand(0, this.game.height - this.height)
        this.speed = rand(5, 12)
    }

    updateCoords() {
        this.x -= this.speed

        super.updateCoords();
    }

    checkCoords() {
        super.checkCoords();

        if (this.x + this.width < 0) {
            this.remove()
        }
    }
}
