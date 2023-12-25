class Game {
    constructor() {
        this.$screens = {
            start: document.querySelector('.game-screen-start'),
            playground: document.querySelector('.game-screen-playground'),
            leaderboard: document.querySelector('.game-screen-leaderboard'),
        }
        this.$welcomeElements = {
            nickname: document.querySelector('.game-screen-start input'),
            button: document.querySelector('.game-screen-start button'),
        }
        this.$controls = {
            nickname: document.querySelector('#nickname'),
            timer: document.querySelector('#timer'),
            pause: document.querySelector('#pause'),
        }

        this.isStarted = false
        this.nickname = null
        this.seconds = 0

        this.binds()
    }

    binds() {
        this.$welcomeElements.nickname.addEventListener('input', () => {
            const nickname = this.$welcomeElements.nickname.value.trim()
            this.$welcomeElements.button.disabled = !nickname
        })

        this.$welcomeElements.button.addEventListener('click', () => {
            this.nickname = this.$welcomeElements.nickname.value.trim()
            this.start()
        })

        this.$controls.pause.addEventListener('click', () => {
            this.isStarted = !this.isStarted

            this.$controls.pause.innerText = this.isStarted ? 'Pause' : 'Continue'
        })
    }

    start() {
        this.isStarted = true
        this.$controls.nickname.innerText = this.nickname

        setInterval(() => {
            if (!this.isStarted) return;

            this.seconds++
            const minutes = ~~(this.seconds / 60)
            const seconds = this.seconds % 60

            this.$controls.timer.innerHTML = `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
        }, 1000)

        this.changeScreen('playground')
    }

    changeScreen(screenName) {
        for (const screenName in this.$screens) {
            this.$screens[screenName].classList.remove('active')
        }

        this.$screens[screenName].classList.add('active')
    }
}

let game = null

document.addEventListener('DOMContentLoaded', () => {
    game = new Game()
})
