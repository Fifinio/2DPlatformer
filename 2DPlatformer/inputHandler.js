 class InputHandler {
        constructor() {
            this.keys = []
            document.body.addEventListener("keydown", (e) => {
                if (["w", "a", "d"].includes(e.key) && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                }
            })
            document.body.addEventListener("keyup", (e) => {
                if (["w", "a", "d"].includes(e.key) && this.keys.indexOf(e.key) !== -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            })
        }
    }

export default InputHandler