const rand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

class Game {
    constructor(fps) {
        this.fps = fps

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
            score: document.querySelector('#score'),
        }
        this.$result = {
            score: document.querySelector('#result-score'),
            time: document.querySelector('#result-time'),
        }
        this.$elements = document.querySelector('.game-elements')
        this.$wrapper = document.querySelector('.game-wrapper')

        this.player = null
        this.width = this.$wrapper.offsetWidth
        this.height = this.$wrapper.offsetHeight
        this.isStarted = false
        this.nickname = null
        this.seconds = 0
        this.score = 0
        this.keys = new Set()
        this.elements = []

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

        document.addEventListener('keydown', event => {
            this.keys.add(event.key)
        })
        document.addEventListener('keyup', event => {
            this.keys.delete(event.key)
        })
    }

    start() {
        this.isStarted = true
        this.$controls.nickname.innerText = this.nickname

        this.player = new Player(this)
        this.elements.push(this.player)

        setInterval(() => {
            requestAnimationFrame(() => {
                if (this.isStarted) {
                    this.elements.forEach(element => element.updateCoords())
                }
            })
        }, 1000 / this.fps)

        setInterval(() => {
            if (!this.isStarted) return;

            this.seconds++
            const minutes = ~~(this.seconds / 60)
            const seconds = this.seconds % 60

            this.$controls.timer.innerHTML = `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
        }, 1000)

        this.generateGift()
        this.generateEnemy()

        this.changeScreen('playground')
    }

    changeScreen(screenName) {
        for (const screenName in this.$screens) {
            this.$screens[screenName].classList.remove('active')
        }

        this.$screens[screenName].classList.add('active')
    }

    generateGift() {
        if (this.isStarted) {
            this.elements.push(new Gift(this))
        }

        setTimeout(() => this.generateGift(),  rand(1, 4) * 1000)
    }

    generateEnemy() {
        if (this.isStarted) {
            this.elements.push(new Enemy(this))
        }

        setTimeout(() => this.generateEnemy(),  rand(1, 4) * 1000)
    }

    upScore() {
        this.score++

        this.$controls.score.innerText = this.score
    }

    finish() {
        this.isStarted = false

        this.$result.score.innerText = this.score
        this.$result.time.innerText = this.$controls.timer.innerText

        this.changeScreen('leaderboard')
    }
}

let game = null

document.addEventListener('DOMContentLoaded', () => {
    game = new Game(60)
})
