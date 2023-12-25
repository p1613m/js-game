class Game {
    constructor() {
        this.screens = {
            start: document.querySelector('.game-screen-start'),
            playground: document.querySelector('.game-screen-playground'),
            leaderboard: document.querySelector('.game-screen-leaderboard'),
        }
        this.welcomeElements = {
            nickname: document.querySelector('.game-screen-start input'),
            button: document.querySelector('.game-screen-start button'),
        }

        this.binds()
    }

    binds() {
        this.welcomeElements.nickname.addEventListener('input', () => {
            const value = this.welcomeElements.nickname.value.trim()
            if (value) {
                this.welcomeElements.button.disabled = false
            } else {
                this.welcomeElements.button.disabled = true
            }
        })
    }
}

let game = null

document.addEventListener('DOMContentLoaded', () => {
    game = new Game()
})
