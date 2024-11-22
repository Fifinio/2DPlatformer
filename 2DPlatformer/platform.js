import { BASE_SPRITE_X_OFFSET, BASE_SPRITE_Y_OFFSET } from "./constants.js"

export default class Platform {
        constructor(x, y, width, height, gameWidth, gameHeight) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
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
            this.x = Math.floor(Math.random() * (this.gameWidth - this.width)) 
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