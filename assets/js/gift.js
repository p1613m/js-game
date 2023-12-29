class Gift extends Drawable {
    constructor(game) {
        super(game);

        this.width = 100
        this.height = 100
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
