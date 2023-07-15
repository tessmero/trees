class SimpleTree extends Tree {
    
    grow(branch){
        
        if(!( 'spiralDepth' in branch )){
            branch.spiralDepth = 0
        }
        if(!( 'spiralDir' in branch )){
            branch.spiralDir = (rand()<.5) ? -1 : 1
        }
            
        // continue in spiral
        var d = branch.end.sub(branch.start)
        var angle = d.getAngle()
        
        var turn = branch.spiralDir * this.randTurn(branch)
        
        var s = new Segment( branch.end, 
                    branch.end.add( vp(angle+turn,global.segLen) ),
                    branch.depth+1, branch.chunkIds)
        s.spiralDepth = branch.spiralDepth + 1
        s.spiralDir = branch.spiralDir
        
        
        var result = [s]
            
            
            
        // possible spawn a new branch spiraling the opposite direction
        var spawn = rand() < .2
        
        if( spawn ){
            
            turn = -branch.spiralDir * (.2+this.randTurn(branch))
            s = new Segment( branch.end, 
                        branch.end.add( vp(angle+turn,global.segLen) ),
                        branch.depth+1, branch.chunkIds)
            s.spiralDepth = Math.min( 200, branch.depth+30 )
            s.spiralDir = -branch.spiralDir
            s.forceAdd = true // override intersection check
            result.push(s)
        }
        
        return result
    }
    
    randTurn(branch){ 
        return 1e-5 * Math.pow( branch.spiralDepth, 2 )
    }
}