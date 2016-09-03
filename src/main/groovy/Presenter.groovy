import org.grooscript.asts.GsNative
 
class Animation {
 
    static ANIMATION_FPS = 60;
 
    def canvas
    def context
    def width
    def height
 
    def actor
    def line
 
    Animation() {
        window.addEventListener('load', init, false)
        window.addEventListener('resize', init, false)
        window.addEventListener('orientationchange', init, false)
        window.setInterval(update, 1000 / ANIMATION_FPS, false)
        render()
    }
 
    def init() {
        actor = []
        canvas = document.getElementsByTagName('canvas')[0]
        context = canvas.getContext('2d')
        width = canvas.clientWidth
        height = canvas.clientHeight
        canvas.setAttribute("width" ,width);
        canvas.setAttribute("height" ,height);
        for(def degree = 0 ; degree <= 360; degree += 360/86) {
            this.actor << new Ham("images/ham.png"
                , this.width
                , this.height
                , degree
            )
        }
    }
 
    def update() {
        actor.each {
            it.update()
        }
    }
 
    def render() {
        window.requestAnimationFrame(render)
        if(!context) return
        context.fillStyle = "#000"
        context.fillRect(0, 0, width, height)
        actor.each {
            it.draw(context)
        }
    }
}
 
class Ham extends Actor {
 
    def swidth
    def sheight
    def degree
    def sx
    def sy
    def sv
 
    Ham(def url, def w, def h, def d) {
        super(url)
        swidth = w
        sheight = h
        sx = swidth / 2
        sy = sheight / 2
        sv = 1
        degree = d
        width = 48
        height = 48
    }
 
    @GsNative
    def update() {/*
        var radian = Math.PI / 180 * this.degree
        this.x = Math.cos(radian) * (this.sx / 2 - 24) + this.swidth / 2 - 24
        this.y = Math.sin(radian) * (this.sy / 2 - 24) + this.sheight / 2 - 24
        this.degree += 0.9
        if(this.degree > 360) {
            this.degree = 0
        }
        this.sx += this.sv * 8
        this.sy += this.sv * 8
        if(this.sx >= this.swidth
            || this.sy >= this.sheight
            || this.sx <= (this.swidth * -1) + 48 + 24
            || this.sy <= (this.sheight * -1) + 48 + 24
            ) {
            this.sv = this.sv * -1
        }
        this.width = 48 + (this.sx / 48)
        this.height = 48 + (this.sy / 48)
    */}
}
 
abstract class Actor {
 
    def image
    def x = 0
    def y = 0
    def width
    def height
 
    Actor(def url) {
        image = Resource.getInstance().getImage(url)
    }
 
    abstract update()
 
    @GsNative
    def draw(context) {/*
        if(!this.image['loaded']) return
        context.drawImage(this.image['image'], this.x, this.y, this.width, this.height)
    */}
}
 
class Resource {
 
    def static resource = new Resource()
    def images = [:]
 
    private Resource() { }
     
    def static getInstance() {
        return resource
    }
 
    def getImage(url) {
        if(!images.containsKey(url)) {
            images[url] = [:]
            def image = document.createElement('img')
            image.src = url
            image.addEventListener('load', {
                images[url]['image'] = image
                images[url]['loaded'] = true
                images[url]['width'] = image.naturalWidth
                images[url]['height'] = image.naturalHeight
            }, false)
        }
        return images[url]
    }
}
 
new Animation()
