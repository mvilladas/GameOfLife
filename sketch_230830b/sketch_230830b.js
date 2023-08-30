let scl=10, rows,cols,tablero=[],x,y;
function setup() {
  createCanvas(500, 500);
  frameRate(10);
  rows=(height/scl);
  cols=(width/scl);
  for(let i=0;i<rows;i++){
    tablero[i]=[];
    for(let j=0;j<cols;j++){
        tablero[i][j]= new Cell(i,j,false);
    }
  }
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      tablero[i][j].agregarVecinos();
    }
  }
}

function draw() {
  background(0);
  //cell.show();
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){  
      tablero[i][j].nuevoCiclo();
    }
  }
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){  
      tablero[i][j].update();
      tablero[i][j].show();
    }
  }
}
function mouseClicked() {
   x = floor(mouseX/scl);
   y = floor(mouseY/scl);
}

function keyPressed(){
  if(key == 'o'){
    tablero[x][(y-1+rows)%rows].estado=true;
    tablero[x][(y+rows)%rows].estado=true; 
    tablero[x][(y+1+rows)%rows].estado=true;
  }else if(key== 'b'){
    tablero[(x+1+cols)%cols][(y+1+rows)%rows].estado=true;
    tablero[x][(y+1+rows)%rows].estado=true;
    tablero[(x+1+cols)%cols][y].estado=true;
    tablero[x][y].estado=true;
  }else if(key=='r'){
    for(let i=0;i<rows;i++){
      for(let j=0;j<cols;j++){
          tablero[i][j].estado=false;
      }
    }
  }else if(key=='s'){
    tablero[(x-1+cols)%cols][(y-1+rows)%rows].estado=true;
    tablero[(x-1+cols)%cols][(y+1+rows)%rows].estado=true;
    tablero[x][y].estado=true;
    tablero[x][(y+1+rows)%rows].estado=true;
    tablero[(x+1+cols)%cols][y].estado=true;
  }
  
  
}


class Cell{
  constructor(x,y,estado){
    this.x=x;
    this.y=y;
    this.estado=estado;
    this.estadoProximo=this.estado;
    this.vecinos=[];
    }
  
  agregarVecinos(){
    for(let i=-1;i<2;i++){
      for(let j=-1;j<2;j++){
        let xVecino=(this.x+j+cols)%cols;
        let yVecino=(this.y+i+rows)%rows;
        if( i!=0 || j!=0){
          this.vecinos.push(tablero[xVecino][yVecino]);
        }
      }
    }
  }
  nuevoCiclo(){
    let sum=0;
    for(let i=0;i<this.vecinos.length;i++){
        if(this.vecinos[i].estado){
          sum++;
        }
    }
    this.estadoProximo=this.estado;
    if(sum<2||sum>3){
      this.estadoProximo=false;
    }else if(sum==3){
      this.estadoProximo=true;
    }
  }
  update(){
     this.estado=this.estadoProximo;
  }
  
  show(){
    if(this.estado==true){
        fill(140,200,120);
        rect(this.x*scl,this.y*scl,scl,scl);
      }
    }
    
}
