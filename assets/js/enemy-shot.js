class EnemyShot extends Drawable {
    constructor(game, enemy) {
        super(game);

        this.width = 10
        this.height = 5
        this.x = enemy.x
        this.y = enemy.y + enemy.height / 2
        this.speed = 20
        this.damage = 30
    }

    updateCoords() {
        this.x -= this.speed

        super.updateCoords();
    }

    checkCoords() {
        super.checkCoords();

        if (this.x < -this.width) {
            this.remove()
        }

        this.game.elements.forEach(element => {
            if (element !== this && this.isCollisionWith(element)) {
                if (['Gift', 'Player'].includes(element.constructor.name)) {
                    element.hit(this)
                    this.remove()
                }
            }
        })
    }
}
