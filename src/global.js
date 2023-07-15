const global = {
    // graphics context
    canvas: null,
    ctx: null,
    
    // relate pixels to virtual units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,

    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //internal units

    // 
    backgroundColor: '#CCC',
    
    // total time elapsed in milliseconds
    t: 0,
    
    
    // growth animation delay (ms)
    growthDelay: 5,
    maxGrowthIterations: 200000,
    
    //
    segLen: .002,
    chunkWidth: .004,
    segMargin: .002,
    
    //
    segsToDraw: null,
    iterationsDrawn: 0,
    autoResetCountdown: 0,
    autoResetDelay: 8000,
    
    // chunk grid
    // initialized in setup.js
    chunksPerRow : null,
    chunkIdMul : null,
    nChunks : null,
    filledChunks : null,

    
    //debug
    //debugPoint: v(0,0),
}