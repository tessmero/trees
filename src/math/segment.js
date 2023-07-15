// directed line segment connecting two points

class Segment{
    constructor( start, end, depth=0, parentChunkIds=[] ){
        this.start = start
        this.end = end
        
        // prepare to compute intersections with other segments
        var mb = getMb(start,end)
        this.m = mb.m
        this.b = mb.b
        this.xr = [start.x, end.x].sort()
        this.yr = [start.y, end.y].sort()
        
        this.depth = depth
        this.parentChunkIds = parentChunkIds
        this.chunkIds = getChunkIds(this)
    }
    
    containsX(x){
        return (x>this.xr[0]) && (x<this.xr[1])
    }
    
    containsY(y){
        return (y>this.yr[0]) && (y<this.yr[1])
    }
    
    draw(g){
        g.beginPath()
        g.moveTo(this.start.x, this.start.y)
        g.lineTo(this.end.x, this.end.y)
        g.stroke()
    }
}