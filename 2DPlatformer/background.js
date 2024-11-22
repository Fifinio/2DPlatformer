export default class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById("background")
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