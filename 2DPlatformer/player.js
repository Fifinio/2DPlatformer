import { BASE_SPRITE_X_OFFSET, BASE_SPRITE_Y_OFFSET, FRAME_STAGGER, SFX } from "./constants.js"

export default class Player {
        constructor(gameHeight, gameWidth) {
            this.gameHeight = gameHeight
            this.gameWidth = gameWidth
            this.width = 90
            this.height = 120
            this.x = 0
            this.y = this.gameHeight - this.height
            this.vx = 0
            this.vy = 0
            this.weight = 1
            this.frameX = 0
            this.frameY = 0
            this.sWidth = 90
            this.sHeight = 132
            this.dWidth = 102
            this.dHeight = 153
            this.myImg = document.getElementById("player")
            this.onPlatform = false
            this.onLevel = 1
        }

            checkCollision(coin) {
                return (
                    this.x < coin.x + coin.width &&
                    this.x + this.width > coin.x &&
                    this.y < coin.y + coin.height &&
                    this.y + this.height > coin.y
                )
            }

        isOnGround() {
            this.onGround = true
            return this.y === this.gameHeight - this.height
        }

        isOnPlatform(platform) {
            return (
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width &&
                this.y + this.height <= platform.y &&
                this.y + this.height + this.vy >= platform.y
            )
        }

        draw(context) {
            context.drawImage(
                this.myImg,
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

        checkCollision(portal) {
            return (
                this.x < portal.x + portal.width &&
                this.x + this.width > portal.x &&
                this.y < portal.y + portal.height &&
                this.y + this.height > portal.y 
            )
        }

        update(input, gameFrame, platforms = [], coins = []) {
            let offset = 0
            if (input.keys.includes("d")) {
                this.vx = 5
                this.frameX = 0
                this.frameY = 3
                if(gameFrame % FRAME_STAGGER === 0){
                    if(this.frameX<3){
                        this.frameX++
                    }else{
                        this.frameX = 0
                    }
                }
            } else if (input.keys.includes("a")) {
                this.vx = -5
                this.frameX = 1
                this.frameY = 2
                if(gameFrame % FRAME_STAGGER === 0){
                    if(this.frameX<3) {
                        this.frameX++
                    }else {
                        this.frameX = 0
                    }
                }
            } else {
                this.vx = 0
            }

            this.x += this.vx

            if (input.keys.includes("w") && (this.isOnGround() || this.onPlatform)) {
                SFX.jump.play()
                this.vy = -25
                this.frameX = 1
                this.frameY = 0
            }
            if(this.vx === 0 && this.vy === 0) {
                this.frameX = 0
                this.frameY = 0
            }

            this.onPlatform = false
            if(this.y < this.gameHeight / 3) {
                offset = 2
            }
            platforms.forEach((platform) => {
                platform.y += offset
                if (this.isOnPlatform(platform)) {
                    this.onPlatform = true
                    this.vy = 0
                    platform.y = platform.y - 2
                    this.y  = platform.y - this.height 
                }
            })

            if (!this.isOnGround() && !this.onPlatform) {
                this.vy += this.weight
            }

            this.y += this.vy

            if (this.x < 0) this.x = 0
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

            if (this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height
            }

            coins.forEach((coin) => {
                if(this.checkCollision(coin) && !coin.collected) {
                   //TODO: add score counting on collision with coin 
                   //TODO: destroy coin on collision and create a new one at random position in play area
                    coin.changePosition(this.gameWidth, this.gameHeight) 
                }
            })

            if (!this.soundPlayed && portal.shown === true) {
                SFX.spawn.play()
                this.soundPlayed = true
            }

            if(this.checkCollision(portal) && portal.shown === true) {
                player.onLevel = 2
                platforms.length = 0
                coins.length = 0
            }
        }
    }