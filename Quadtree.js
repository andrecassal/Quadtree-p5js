//https://observablehq.com/@mbostock/quadtree-art


class QuadTree{
  constructor(x,y,w,h){
    this.rect = new QuadRect(x,y,w,h);
    this.pointsPerBlock = 4;
		this.minRectWidth = 4;
		this.minRectHeight = 4;
		this.color = color(255);
    this.points = [];
		// this.sections = [];
    this.divided = false;
		this.rendered = false;
  }
  insert(point){
    
    if( !this.rect.contains(point) ){
       return false; 
    }
    if(this.points.length <= this.pointsPerBlock){
       	this.points.push( point ); 
      	return true;
    }else{
      if( !this.divided ){
         this.divide(); 
      }
      return  this.tl.insert(point) ||
              this.tr.insert(point) ||
              this.br.insert(point) ||
              this.bl.insert(point);
    }
  }
  divide(){
		let r = this.rect;
		if(r.w <= this.minRectWidth || r.h <= this.minRectHeight) return [];
    this.tl = new QuadTree(r.x,r.y,r.w2,r.h2);
    this.tr = new QuadTree(r.x+r.w2,r.y,r.w2,r.h2);
    this.bl = new QuadTree(r.x,r.y+r.h2,r.w2,r.h2);		
    this.br = new QuadTree(r.x+r.w2,r.y+r.h2,r.w2,r.h2);
    this.divided = true;
		return [this.tl,this.tr,this.br,this.bl];
  }
  render(){
    if(this.divided){
      this.tl.render();
      this.tr.render();
      this.bl.render();
      this.br.render();
			// return;
    }
		// if(this.rendered){ return; }
		
		push()
		// noStroke()
    stroke(255,50);
		strokeWeight(1);
		// noFill();
    // fill(random(theme));
		fill(this.color);
    rect(this.rect.x,this.rect.y,this.rect.w,this.rect.h);
    
    pop();
		this.rendered = true;
  }
}


class QuadPoint extends p5.Vector{}

class QuadRect{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
		this.w2 = this.w/2;
		this.h2 = this.h/2;
		this.cx = this.x + this.w2;
		this.cy = this.y + this.h2;
  }
  contains(vect){
    return  vect.x > this.x &&
            vect.x < this.x+this.w &&
            vect.y > this.y &&
            vect.y < this.y+this.h;
  }
}
