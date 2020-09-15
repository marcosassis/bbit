// GPLv3 marcos assis 2020

// monochrome, monospaced

Glyph=function(width,height,code,char){
  // row-major, MSB first
  XYtoIndex=(x,y)=>(height-y)*width-x-1
  return{
    width,height,code,char,
    getBit(i){
      return this.code>>i&1
    },
    setBit(i,v){
      v^this.getBit(i) ? this.code^=1<<i : 0
    },
    toString(lineSep='\n'){
      return (this.code&0x7FFF).toString(2)
                .padStart(15,0)
                .match(eval(`/.{${width}}/g`))
                .join(lineSep)
    },
    fromStringBinary(A){
      A.match(/0|1/g).map((a,i)=>this.setBit(~~a,i))
    },
    getXY(x,y){
      return this.getBit(XYtoIndex(x,y))
    },
    setXY(x,y,v){
      this.setBit(XYtoIndex(x,y),v)
    },
    drawPixel(ctx,x,y){
      ctx.fillRect(x,y,1,1,ctx.fillStyle=this.getXY(x,y)?"#000":"#fff")
    },
    draw(ctx){
      for(x=0;x<width;++x)
        for(y=0;y<height;++y)
          this.drawPixel(ctx,x,y)
    }
  }
}

Font=function(width,height,glyphs=[]){
  return{
    width,height,glyphs,
    addGlyph(code,char){
      this.glyphs.push(Glyph(width,height,code,char))
    },
    from(str,codes=0){
      [...str].map((c,i)=>this.addGlyph(codes[i]||c.charCodeAt(),c))
      return this
    }
  }
}

ev=ff=0
Editor=function(font){
  return{
    font,
    elementsString(g,i){
      return 
    },
    createElements(){
      G.innerHTML=font.glyphs.map((g,i)=>`
<div id=D${i=i}>
<textarea id=T${i} rows=${h=font.height} style="width:${w=font.width}ch">
${g.toString()}
</textarea>
<canvas id=C${i} width=${w} height=${h}>
</canvas>
</div>`).join``;
      font.glyphs.map((g,i)=>{
        C=document.getElementById('C'+i)
        g.draw(C.getContext`2d`)
        C.onmousedown=C.onmousemove=e=>{
          ev=e
          ff=font
          b=e.buttons
          c=e.target
          if(!b||b&2)return
          r=c.getBoundingClientRect()
          x=(e.x-r.left)*c.width/c.clientWidth|0
          y=(e.y-r.top)*c.height/c.clientHeight|0
          t=e.target
          i=t.getAttribute`id`.slice(1)|0
          font.glyphs[i].setXY(x,y,v=b==1)
          T=document.getElementById('T'+i)
          T.value=font.glyphs[i].toString()
          font.glyphs[i].draw(c.getContext`2d`)
          this.save()
        }
      })
    },
    save(){
      localStorage["_"+font.width+"x"+font.height]=JSON.stringify({
        chars: font.glyphs.map(g=>g.char).join``,
        codes: font.glyphs.map(g=>g.code).join()
      })
    },
    load(){
      if(r=JSON.parse(localStorage["_"+font.width+"x"+font.height])){
        font.glyphs=[]
        font.from(r.chars,r.codes.split`,`)
        font.glyphs.map((g,i)=>{
          g.draw(document.getElementById('C'+i).getContext`2d`)
          document.getElementById('T'+i).value=g.toString()
        })
      }
      return r
    }
  }
}

w=3,h=5
z="ABCDEFGHIJKLMNOPQRSTUWVXYZ.!"
fo=Font(w,h).from(z)
ed=Editor(fo)
ed.createElements()
ed.load()


fromPBM=I=>{
m=I.slice(3).split(/#.*[\r\n]/g)
n=m[m.length-1]
n=n.split(/\D*/g)
n=n.slice(!n[0])
W=n[0]|0
H=n[1]|0
B=n.slice(2)
return{W,H,B}
}