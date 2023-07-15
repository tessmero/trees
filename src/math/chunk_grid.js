// optimize segment intersection checks
// by binning segments into a square grid
//
// assume that all segments are shorter than chunk width
// so a single segment can involve at most 3 chunks



// debug
function drawFilledChunks(g){
    var cw = global.chunkWidth
    
    g.strokeStyle = 'red'
    g.lineWidth = .001
    for( var i = 0 ; i < global.nChunks ; i++ ){
        if( global.filledChunks[i] ){
            var c = _chunkIdToCoords(i)
            g.strokeRect(c[0]*cw, c[1]*cw, cw, cw)
        }
    }
}

// return true if the given segment 
// does not intersect any existing segments
//
// if true then the given segment will 
// be considered in future intersection checks
function tryAddSegment(seg){
    
    // check if off-screen
    if( (seg.xr[0]<0) || (seg.yr[0]<0) || (seg.xr[1]>=1) || (seg.yr[1]>=1) ){
        return false
    }
    
    // identify relevant chunks
    var chunkIds = seg.chunkIds;
    
    // check for intersections with
    // lines in relevant chunks
    chunkIds = chunkIds.filter(i => !seg.parentChunkIds.includes(i))
    
    var intersects = false
    if( !seg.forceAdd ){
        intersects = chunkIds.some(i => global.filledChunks[i])
        
        if( intersects ){
            return false
        }
    }
    
    // check for intersections ahead of the new segment
    var ahead = new Segment( seg.end, 
        seg.end.add( vp( seg.end.sub(seg.start).getAngle(), global.segMargin ) ) )
    var aheadChunkIds = ahead.chunkIds.filter(i => !seg.chunkIds.includes(i))
    intersects = aheadChunkIds.some( i => global.filledChunks[i] )
    if( intersects ){
        return false
    }
    
    // add this segment to relevent chunks 
    chunkIds.forEach(i => global.filledChunks[i] = true)
    return true
}

// used in segment.js
//
// given a line segemnt,
// get a list of 1, 2, or 3 relevant chunk IDs
function getChunkIds(seg){
    var ca = _getChunkCoords(seg.start)
    var cb = _getChunkCoords(seg.end)
    var ida = _coordsToChunkId(ca)
    var idb = _coordsToChunkId(cb)
    
    if( idb==ida ){
        // both ends of the segment are in the same chunk
        return [ida]
    }
    
    // segment in two diagonal chunks
    // add a third chunk
    if( (ca[0]!=cb[0]) && (ca[1]!=cb[1]) ){
        
        var midx = Math.max(ca[0],cb[0]) * global.chunkWidth
        var midy = Math.max(ca[1],cb[1]) * global.chunkWidth
        var segy = seg.m*midx + seg.b
        var idc = _coordsToChunkId( 
            (segy>midy) == (cb[1]>ca[1]) ? 
            [ca[0],cb[1]] : [cb[0],ca[1]] )
        return [ida,idb,idc]
    }
    
    
    // segment in two adjacent
    return [ida,idb]
}

function _getChunkCoords(p){
    return [Math.floor(p.x/global.chunkWidth),Math.floor(p.y/global.chunkWidth)]
}

function _coordsToChunkId(c){
    return c[0]*global.chunksPerRow + c[1]
}

function _chunkIdToCoords(id){
    return [ Math.floor(id/global.chunksPerRow), id%global.chunksPerRow ]
}
