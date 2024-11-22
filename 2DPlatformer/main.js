import InputHandler from "./inputHandler.js"
import Player from "./player.js"
import Background from "./background.js"
import Coin from "./coin.js"
import Portal from "./portal.js"
import Platform from "./platform.js"
import { BASE_SPRITE_X_OFFSET, BASE_SPRITE_Y_OFFSET } from "./constants.js"

    function displayScore(score) {
        const scoreDisplay = document.getElementById("scoreDisplay")
        scoreDisplay.textContent = "Score: " + score
    }

    function displayGoal() {
        const goalDisplay = document.getElementById("goalScore")
        goalDisplay.textContent = "Goal: Collect 15 coins"
    }

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGameButton")
    const menu = document.getElementById("menu")
    const gameCanvas = document.getElementById("gameCanva")
    const secondLevel = document.getElementById("secondLevel")

startButton.addEventListener("click", () => {
    menu.style.display = "none"
    gameCanvas.style.display = "block"
    startGame()
   })
})
function startGame() {
    const canvas = document.getElementById("gameCanva")
    const ctx = canvas.getContext("2d")

    canvas.width = 800
    canvas.height = 720  
    let level = 1 

    const input = new InputHandler()
    const player = new Player(canvas.height, canvas.width)
    const background = new Background(canvas.width, canvas.height)
    const level2 = new Level2(canvas.width, canvas.height)

    const platforms = [
        new Platform(100, 400, 100, 20),
        new Platform(700, 450, 100, 20),
        new Platform(570, 300, 100, 20),        
    ]

    const level2Platforms = [
        new level2Platform(100, 400, 100, 20),
        new level2Platform(400, 100, 100, 20),
        new level2Platform(600, 300, 100, 20),
    ]

    const coins = [
        new Coin(470, 550, 50, 50),
        new Coin(700, 400, 50, 50),
    ]

    const portal = new Portal(300, 525, 200, 200) 

    const debugPlayer = document.getElementById("playerDebug")
    const debugBackground = document.getElementById("backgroundDebug")
    const debugPlatform = document.getElementById("platformDebug")
    const debugLevel2 = document.getElementById("level2Debug") 

    function animate(gameFrame, score, level) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if(player.onLevel === 1) {
            background.draw(ctx)
            background.update(player)
            platforms.forEach((platform) => {
                platform.update(canvas.height) 
                platform.draw(ctx) 
            })
            player.draw(ctx)
            player.update(input,gameFrame, platforms, coins, portal)
        
            
            coins.forEach((coin) => coin.draw(ctx))
            if(score >= 15) {
            portal.draw(ctx)
            }
        }
        if(player.onLevel === 2) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            level2.draw(ctx)
            level2.update(player)

            level2Platforms.forEach((platform) => {
                platform.update(canvas.height)
                platform.draw(ctx)
            })
            player.draw(ctx)
            player.update(input, level2Platforms)
        }

        debugPlayer.textContent = Object.keys(player).reduce((acc, curr) => acc += `${curr} = ${player[curr]}, `, '')
        debugBackground.textContent = Object.keys(background).reduce((acc, curr) => acc += `${curr} = ${background[curr]}, `, '')
        if(platforms.length > 0) {
        debugPlatform.textContent = Object.keys(platforms[0]).reduce((acc, curr) => acc += `${curr} = ${platforms[0][curr]}, `, '')
        }
        debugLevel2.textContent = Object.keys(level2).reduce((acc, curr) => acc += `${curr} = ${level2[curr]}, `, '')

        displayGoal()
        displayScore(score)
        requestAnimationFrame(() => animate(gameFrame, score, level))
        gameFrame++
    }

    animate(0, 0, 1)
}
   class Level2 {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById("secondLevel")
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 720 
            this.speed = 2
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height) //main
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height) //right
            context.drawImage(this.image, this.x - this.width, this.y, this.width, this.height) //left
            context.drawImage(this.image, this.x, this.y + this.height, this.width, this.height) //down
            context.drawImage(this.image, this.x, this.y - this.height, this.width, this.height) //up
            context.drawImage(this.image, this.x + this.width, this.y + this.height, this.width, this.height) // right down corner
            context.drawImage(this.image, this.x - this.width, this.y + this.height, this.width, this.height) // left down corner
            context.drawImage(this.image, this.x + this.width, this.y - this.height, this.width, this.height) // right top corner
            context.drawImage(this.image, this.x - this.width, this.y - this.height, this.width, this.height) // left top corner
        }

        update(player) {
            if(player.vx > 0) {
                this.x -= this.speed
            } else if(player.vx < 0) {
                this.x += this.speed
            }
            if(player.vy > 0 && player.onPlatform) {
                this.y -= this.speed
            } else if(player.vy < 0) {
                this.y += this.speed
            }
        
            if (!player.onPlatform) {
                if (this.y < -this.height) this.y = 0
                if (this.y > 0) this.y = -this.height
            }
            if (this.x < -this.width) this.x = 0
            if (this.x > 0) this.x = -this.width 
        }

    }





    

    class level2Platform {
        constructor(x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.img = document.getElementById("platform")
            this.frameX = 1
            this.frameY = 0
            this.sWidth = 60
            this.sHeight = 100
            this.dWidth = width
            this.dHeight = height
            this.speedY = 1
            this.reseted = false
        }

        resetPosition() {
            this.y = -this.height
            this.x = Math.floor(Math.random() * (canvas.width - this.width)) 
        }
    
        update(gameHeight) {
            this.y += this.speedY
    
            if (this.y > gameHeight) {
                this.resetPosition()
            }
        }

        draw(context) {
            context.drawImage(
                this.img,
                this.frameX * this.dWidth + BASE_SPRITE_X_OFFSET,
                this.frameY * this.dHeight + BASE_SPRITE_Y_OFFSET,
                this.sWidth,
                this.sHeight,
                this.x,
                this.y,
                this.dWidth,
                this.dHeight
            )

        }
    }  

