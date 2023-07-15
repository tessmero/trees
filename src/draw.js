

function drawTree(g){

    
    var tree = new SimpleTree()
    var n = Math.min( global.maxGrowthIterations,
            Math.floor( global.t / global.growthDelay ) )
    //filledChunks = new Set()
    //global.filledChunks.fill(false)      
            
    g.strokeStyle = 'black'
    g.lineWidth = .001
    for( var i = global.iterationsDrawn ; i < n ; i++ ){
        global.segsToDraw = global.segsToDraw.filter( s => tryAddSegment(s) )
        global.segsToDraw.forEach( s => s.draw(g) )
        global.segsToDraw = global.segsToDraw.flatMap(s => tree.grow(s))
    }
    
    global.iterationsDrawn = n
}
    
    
// Render graphics
function draw(fps, t) {
   var ctx = global.ctx
   var canvas = global.canvas
   
    //ctx.clearRect( 0, 0, canvas.width, canvas.height )

    // draw tree
    drawTree(ctx)
    
    //debug
    //drawFilledChunks(ctx)

    if( false ){
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.arc(global.mousePos.x,global.mousePos.y,.02,0,2*Math.PI)
        ctx.fill()
        ctx.fillStyle = 'blue'
        ctx.beginPath()
        ctx.arc(global.debugPoint.x,global.debugPoint.y,.02,0,2*Math.PI)
        ctx.fill()
    }
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}