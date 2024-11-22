export default class Portal {
        constructor(x,y,width,height) {
            this.img = document.getElementById("portal")
            this.x = x
            this.y = y
            this.width = width
            this.height = height 
            this.sWidth = 32
            this.sHeight = 32
            this.dWidth = width
            this.dHeight = height
            this.currentFrame = 0
            this.totalFrames = 3
            this.shown = false
            this.soundPlayed = false
        }

        draw(context, gameFrame) {

            const frameX = (this.currentFrame % 3) * this.sWidth

            if(score >= 15) {
                context.drawImage(
                    this.img,
                    frameX, 0,
                    this.sWidth,
                    this.sHeight,
                    this.x,
                    this.y,
                    this.dWidth,
                    this.dHeight
                )
                if(gameFrame % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
                }
                this.shown = true
            }
            
        }
    }