class DoodleTree extends Tree {
    
    grow(branch){
        
        
        // handle doodle-tree specific member vars
        if(!( 'spiralDepth' in branch )){
            branch.spiralDepth = 0
        }
        if(!( 'spiralDir' in branch )){
            branch.spiralDir = (rand()<.5) ? -1 : 1
        }
        if(!( 'curliness' in branch )){
            branch.curliness = randRange(.5,1)
        }
            
        // continue in spiral
        var turn = branch.spiralDir * this.randTurn(branch)
        
        var s = new Segment( branch.end, 
                    branch.end.add( vp(branch.angle+turn,global.segLen) ),
                    branch.depth+1, branch.chunkIds)
        s.spiralDepth = branch.spiralDepth
        s.spiralDir = branch.spiralDir
        s.curliness = branch.curliness
        
        
        var result = [s]
            
            
            
        // possible spawn a new branch spiraling the opposite direction
        var spawn = rand() < .3
        
        if( spawn ){
            
            turn = -branch.spiralDir * this.randTurn(branch)
            s = new Segment( branch.end, 
                        branch.end.add( vp(branch.angle+turn,global.segLen) ),
                        branch.depth+1, branch.chunkIds)
            s.spiralDepth = Math.min( 20, branch.spiralDepth+1 )
            s.spiralDir = -branch.spiralDir
            s.curliness = branch.curliness
            s.forceAdd = true // override intersection check
            result.push(s)
        }
        
        return result
    }
    
    randTurn(branch){ 
        return branch.curliness * 3e-3 * randRange(.2,1) * (.03*branch.depth) * (branch.spiralDepth+3)
    }
}