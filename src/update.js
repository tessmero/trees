

function update(dt) {    
    global.t += dt
    
    global.autoResetCountdown -= dt
    if( global.autoResetCountdown < 0 ){
        resetGame()
    }
    
    // debug chunk grid
    //activeChunks = {}
    //addSegment( new Segment( global.mousePos, global.debugPoint ) )
}