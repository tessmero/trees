// shorthands
var pi = Math.PI
var pio2 = Math.PI/2
var twopi = 2*Math.PI
function v(){return new Vector(...arguments)}
function vp(){return Vector.polar(...arguments)}


function randRange(min,max){
    return min + rand()*(max-min)
}


// used in segment.js
//
// given two points, get slope and intercept
function getMb(a,b){
    var m = (b.y-a.y)/(b.x-a.x)
    var b = a.y - m*a.x
    return {m:m,b:b}
}

// used in chunk_grid.js
//
// given two line segments, 
// return true if they intersect
function segmentsIntersect(line1,line2){
    // m1*x+b1 = m2*x + b2
    // x = (b2-b1)/(m1-m2)
    
    if(!( line1.containsX(line2.xr[0]) || line2.containsX(line1.xr[0]))){
        return false
    }
    
    if(!( line1.containsY(line2.yr[0]) || line2.containsY(line1.yr[0]))){
        return false
    }
    
    var x = (line2.b-line1.b) / (line1.m-line2.m)
    return line1.containsX(x) && line2.containsX(x)
}