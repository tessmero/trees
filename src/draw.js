

function drawTree(g){

    
    var tree = new DoodleTree()
    var n = Math.min( global.maxGrowthIterations,
            Math.floor( global.t / global.growthDelay ) )
            
    g.strokeStyle = 'black'
    g.lineWidth = .001
    g.beginPath()
    for( var i = global.iterationsDrawn ; i < n ; i++ ){
        global.segsToDraw = global.segsToDraw.filter( s => tryAddSegment(s) )
        global.segsToDraw.forEach( s => s.draw(g) )
        global.segsToDraw = global.segsToDraw.flatMap(s => tree.grow(s))
    }
    g.stroke()
    
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
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}