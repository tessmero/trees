

// Initialize the game
function init() {
    var cvs = document.getElementById("gameCanvas");
    cvs.addEventListener("mousemove", mouseMove);
    cvs.addEventListener("click", mouseClick);
    global.canvas = cvs
    global.ctx = cvs.getContext("2d");
    
    resetRand()
    global.chunksPerRow = Math.floor(1/global.chunkWidth)
    global.nChunks = Math.floor(Math.pow(global.chunksPerRow,2))
    global.filledChunks = new Array(global.nChunks);
    //var filledChunks = new Set()
    
    
    global.segsToDraw = []
    
    var x = randRange(.1,.3)
    var y = .75
    while( x < .8 ){
        global.segsToDraw.push(new Segment( v(x,y), v(x+1e-7,y-global.segLen) ))
        x += randRange(.1,.2)
    }
    
    var x = randRange(.1,.3)
    var y = .25
    while( x < .8 ){
        global.segsToDraw.push(new Segment( v(x,y), v(x+1e-7,y+global.segLen) ))
        x += randRange(.1,.2)
    }
    
    fitToContainer()
    requestAnimationFrame(gameLoop);
}


function fitToContainer(){
    
    var cvs = global.canvas
  cvs.style.width='100%';
  cvs.style.height='100%';  
  cvs.width  = cvs.offsetWidth;
  cvs.height = cvs.offsetHeight;
  
    
    var dimension = Math.max(cvs.width, cvs.height);
    global.canvasScale = dimension;
    global.canvasOffsetX = (cvs.width - dimension) / 2;
    global.canvasOffsetY = (cvs.height - dimension) / 2;
    
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
    global.ctx.fillStyle = global.backgroundColor
    global.ctx.fillRect( 0, 0, cvs.width, cvs.height )
}

// Main game loop
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
    
    var msPassed = 0;
    if (oldTimeStamp) {
      msPassed = timeStamp - oldTimeStamp;
    }
    var secondsPassed = msPassed / 1000;
    oldTimeStamp = timeStamp;
    var fps = Math.round(1 / secondsPassed);


    msPassed = Math.min(msPassed,1000)

    update(msPassed);
    draw(fps);

    requestAnimationFrame(gameLoop);
}


// Initialize the game
init();