var AM = new AssetManager();

//ADT for the animation info for the spritesheet
function AniInfo(sheetX, sheetY, direction) {
    this.sheetX = sheetX;
    this.sheetY = sheetY;
    this.direction = direction;
}

function YukikoAnimation(spriteSheet, frameWidth, frameHeight, sheetWidth,
    frameDuration, frames, loop, scale) {
   this.spriteSheet = spriteSheet;
   this.frameWidth = frameWidth;
   this.frameDuration = frameDuration;
   this.frameHeight = frameHeight;
   this.sheetWidth = sheetWidth;
   this.frames = frames;
   this.totalTime = frameDuration * frames;
   this.elapsedTime = 0;
   this.loop = loop;
   this.scale = scale;
}

YukikoAnimation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    //ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    //sx,sy,sw,sh = height of image we want to draw
    //dw,dh = resizing
    //dx,dy = where you want to drwa the image
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

YukikoAnimation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

YukikoAnimation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

/*
* Chocobo specific animation function
*
*/
function ChocoAnimation(spriteSheet, frameWidth, frameHeight, sheetWidth,
     frameDuration, frames, loop, scale, startX, startY, direction, dirArr) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    this.startX = startX;
    this.startY = startY;
    this.direction = direction;
    this.dirArr = dirArr
}

/*
* Modified to use the spritesheet in at specfic points
* Added startX, startY, and direction
* You add the startX and startY inside the drawImage function call.
*/
//TODO: put the directions and there coordinates into a map or array of tuples.
ChocoAnimation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
        if (this.direction == "left") {
            this.startY = 0;
            this.direction = "down";
        } else if (this.direction == "down") {
            this.startY = 432;
            this.direction = "right";
        } else if (this.direction == "right") {
            this.startY = 644;
            this.direction = "up";
        } else if (this.direction == "up") {
            this.startY = this.dirArr["left"].sheetY;
            this.direction = this.dirArr["left"].direction;
        }
        
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    //ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    //sx,sy,sw,sh = height of image we want to draw
    //dw,dh = resizing
    //dx,dy = where you want to drwa the image
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

ChocoAnimation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

ChocoAnimation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

//Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale)
// function MushroomDude(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
//     this.x = 0;
//     this.y = 0;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// MushroomDude.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }

// MushroomDude.prototype.update = function () {
//     if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
//         this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
// }


// // inheritance 
// function Cheetah(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
//     this.speed = 350;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 250);
// }

// Cheetah.prototype = new Entity();
// Cheetah.prototype.constructor = Cheetah;

// Cheetah.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Cheetah.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

// // inheritance 
// function Guy(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 154, 215, 4, 0.15, 8, true, 0.5);
//     this.speed = 100;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 450);
// }

// Guy.prototype = new Entity();
// Guy.prototype.constructor = Guy;

// Guy.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Guy.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }




//Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale)
function Choco(game, spritesheet) {
    
    var directions = []; 
    directions["left"] = new AniInfo(0, 221, "left");
    directions["right"] = new AniInfo(0, 432, "right");
    directions["up"] = new AniInfo(0,644, "up");
    directions["down"] = new AniInfo
    var leftAni = new ChocoAnimation(spritesheet, 206, 213, 4, .4, 4, true, 1, 0, 221, "left", directions);

    //var downAni = new Animation(spritesheet, 206, 213, 4, .5, 4, true, 1, 0, 0, "down")
    this.animation = leftAni;
    console.log("Animation initialized")
    this.speed = 200;
    this.ctx = game.ctx;
    this.x = 600;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Choco.prototype = new Entity();
Choco.prototype.constructor = Choco;

Choco.prototype.update = function() {
    if(this.animation.direction == "left") {
        this.x -= this.game.clockTick * this.speed;
    }
    if(this.animation.direction == "down") {
        this.y += this.game.clockTick * this.speed;
    }
    if(this.animation.direction == "right") {
        this.x += this.game.clockTick * this.speed;
    }
    if(this.animation.direction == "up") {
        this.y -= this.game.clockTick * this.speed;
    }
    if (this.x > 800) this.x = -230;
    if (this.y > 800) this.y = 0;
    Entity.prototype.update.call(this);
}

Choco.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Yukiko(game, spritesheet) {
    this.animation = new YukikoAnimation(spritesheet, 110, 186, 10, 0.50, 15, true, 1);
    console.log("Yukiko Animation initialized");
    this.speed = 100;
    this.ctx = game.ctx;
    this.x = 100;
    this.y = 100;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Yukiko.prototype = new Entity();
Yukiko.prototype.constructor = Yukiko;

Yukiko.prototype.update = function() {
    
    Entity.prototype.update.call(this);
}

Yukiko.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

AM.queueDownload("./img/RobotUnicorn.png");
AM.queueDownload("./img/guy.jpg");
AM.queueDownload("./img/mushroomdude.png");
AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/choco.png");
AM.queueDownload("./img/yukikospritesheet.png")

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));
    // gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/mushroomdude.png")));
    // gameEngine.addEntity(new Cheetah(gameEngine, AM.getAsset("./img/runningcat.png")));
    // gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));
    gameEngine.addEntity(new Choco(gameEngine, AM.getAsset("./img/choco.png")));
    gameEngine.addEntity(new Yukiko(gameEngine, AM.getAsset("./img/yukikospritesheet.png")));

    console.log("All Done!");
});