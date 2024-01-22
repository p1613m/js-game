class PlayerShot extends Drawable {
    constructor(game) {
        super(game);

        this.width = 10
        this.height = 5
        this.x = this.game.player.x + this.game.player.width
        this.y = this.game.player.y + this.game.player.height / 2
        this.speed = 20
        this.damage = 50
    }

    updateCoords() {
        this.x += this.speed

        super.updateCoords();
    }

    checkCoords() {
        super.checkCoords();

        if (this.x > this.game.width) {
            this.remove()
        }

        this.game.elements.forEach(element => {
            if (element !== this && this.isCollisionWith(element)) {
                if (['Gift', 'Enemy'].includes(element.constructor.name)) {
                    element.hit(this)
                    this.remove()
                }
            }
        })
    }
}
