function Animation() {
  var gSobject = gs.init('Animation');
  gSobject.clazz = { name: 'Animation', simpleName: 'Animation'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  Object.defineProperty(gSobject, 'ANIMATION_FPS', { get: function() { return Animation.ANIMATION_FPS; }, set: function(gSval) { Animation.ANIMATION_FPS = gSval; }, enumerable: true });
  gSobject.canvas = null;
  gSobject.context = null;
  gSobject.width = null;
  gSobject.height = null;
  gSobject.actor = null;
  gSobject.line = null;
  gSobject['init'] = function(it) {
    gSobject.actor = gs.list([]);
    gSobject.canvas = (gs.mc(gs.fs('document', this, gSobject),"getElementsByTagName",["canvas"])[0]);
    gSobject.context = gs.mc(gSobject.canvas,"getContext",["2d"]);
    gSobject.width = gs.gp(gSobject.canvas,"clientWidth");
    gSobject.height = gs.gp(gSobject.canvas,"clientHeight");
    gs.mc(gSobject.canvas,"setAttribute",["width", gSobject.width]);
    gs.mc(gSobject.canvas,"setAttribute",["height", gSobject.height]);
    for (var degree = 0 ; degree <= 360 ; degree += (gs.div(360, 86))) {
      gs.mc(gs.gp(gs.thisOrObject(this,gSobject),"actor"),'leftShift', gs.list([Ham("images/ham.png", gs.gp(gs.thisOrObject(this,gSobject),"width"), gs.gp(gs.thisOrObject(this,gSobject),"height"), degree)]));
    };
  }
  gSobject['update'] = function(it) {
    return gs.mc(gSobject.actor,"each",[function(it) {
      return gs.mc(it,"update",[]);
    }]);
  }
  gSobject['render'] = function(it) {
    gs.mc(gs.fs('window', this, gSobject),"requestAnimationFrame",[gSobject.render]);
    if (!gs.bool(gSobject.context)) {
      return null;
    };
    gs.sp(gSobject.context,"fillStyle","#000");
    gs.mc(gSobject.context,"fillRect",[0, 0, gSobject.width, gSobject.height]);
    return gs.mc(gSobject.actor,"each",[function(it) {
      return gs.mc(it,"draw",[gSobject.context]);
    }]);
  }
  gSobject['Animation0'] = function(it) {
    gs.mc(window,"addEventListener",["load", gSobject.init, false]);
    gs.mc(window,"addEventListener",["resize", gSobject.init, false]);
    gs.mc(window,"addEventListener",["orientationchange", gSobject.init, false]);
    gs.mc(window,"setInterval",[gSobject.update, gs.div(1000, Animation.ANIMATION_FPS), false]);
    gs.mc(gSobject,"render",[]);
    return this;
  }
  if (arguments.length==0) {gSobject.Animation0(); }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
Animation.ANIMATION_FPS = 60;

function Actor() {
  var gSobject = gs.init('Actor');
  gSobject.clazz = { name: 'Actor', simpleName: 'Actor'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.image = null;
  gSobject.x = 0;
  gSobject.y = 0;
  gSobject.width = null;
  gSobject.height = null;
  gSobject.draw = function(context) {
    if(!this.image['loaded']) return
        context.drawImage(this.image['image'], this.x, this.y, this.width, this.height)
  }
  gSobject['Actor1'] = function(url) {
    gSobject.image = gs.mc(gs.execStatic(Resource,'getInstance', this,[]),"getImage",[url]);
    return this;
  }
  if (arguments.length==1) {gSobject.Actor1(arguments[0]); }
  
  return gSobject;
};

function Resource() {
  var gSobject = gs.init('Resource');
  gSobject.clazz = { name: 'Resource', simpleName: 'Resource'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  Object.defineProperty(gSobject, 'resource', { get: function() { return Resource.resource; }, set: function(gSval) { Resource.resource = gSval; }, enumerable: true });
  gSobject.images = gs.map();
  gSobject.getInstance = function() { return Resource.getInstance(); }
  gSobject['getImage'] = function(url) {
    if (!gs.bool(gs.mc(gSobject.images,"containsKey",[url]))) {
      (gSobject.images[url]) = gs.map();
      var image = gs.mc(gs.fs('document', this, gSobject),"createElement",["img"]);
      gs.sp(image,"src",url);
      gs.mc(image,"addEventListener",["load", function(it) {
        ((gSobject.images[url])["image"]) = image;
        ((gSobject.images[url])["loaded"]) = true;
        ((gSobject.images[url])["width"]) = gs.gp(image,"naturalWidth");
        return ((gSobject.images[url])["height"]) = gs.gp(image,"naturalHeight");
      }, false]);
    };
    return gSobject.images[url];
  }
  gSobject['Resource0'] = function(it) {
    return this;
  }
  if (arguments.length==0) {gSobject.Resource0(); }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
Resource.getInstance = function(it) {
  return Resource.resource;
}
Resource.resource = Resource();

function Ham() {
  var gSobject = Actor();
  gSobject.clazz = { name: 'Ham', simpleName: 'Ham'};
  gSobject.clazz.superclass = { name: 'Actor', simpleName: 'Actor'};
  gSobject.swidth = null;
  gSobject.sheight = null;
  gSobject.degree = null;
  gSobject.sx = null;
  gSobject.sy = null;
  gSobject.sv = null;
  gSobject.update = function() {
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
  }
  gSobject['Ham4'] = function(url, w, h, d) {
    gSobject.Actor1(url);
    gSobject.swidth = w;
    gSobject.sheight = h;
    gSobject.sx = (gs.div(gSobject.swidth, 2));
    gSobject.sy = (gs.div(gSobject.sheight, 2));
    gSobject.sv = 1;
    gSobject.degree = d;
    gSobject.width = 48;
    gSobject.height = 48;
    return this;
  }
  if (arguments.length==4) {gSobject.Ham4(arguments[0], arguments[1], arguments[2], arguments[3]); }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
Animation();
