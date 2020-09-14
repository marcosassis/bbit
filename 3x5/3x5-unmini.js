// GPLv3 marcos assis 2020

// monochrome, monospaced

Glyph=function(width,height,code,char){
  // row-major, MSB first
  XYtoIndex=(x,y)=>(height-y)*width-x-1
  return{
    code,char,width,height,
    getBit(i){
      return code>>i&1
    },
    setBit(i,v){
      v^this.getBit(i)?code^=1<<i:0
    },
    toString_3x5(lineSep='\n'){
      return (code&0x7FFF).toString(2).padStart(15,0).match(/.../g).join(lineSep)
    },
    fromStringBinary(A){
      A.match(/0|1/g).map((a,i)=>this.setBit(~~a,i))
    },
    getXY(x,y){
      return this.getBit(XYtoIndex(x,y))
    },
    setXY(x,y,v){
      this.setBit(XYtoIndex(x,y),v)
    }
  }
}

Font=function(width,height,alphabet){

}


w=3,h=5
z="ABCDEFGHIJKLMNOPQRSTUWVXYZ.!"

// rom-major
fromBinaryASCII=A=>A.match(/0|1/g).map(a=>~~a)

drawPixel=(C,x,y,v)=>(X=C.getContext`2d`).fillRect(x,y,1,1,X.fillStyle=v?"#000":"#fff")

draw=(C,M)=>M.map((v,i)=>drawPixel(C,i%w,i/w|0,v))
drawASCII=(C,A)=>draw(C,fromBinaryASCII(A))

L=localStorage
U=Uint16Array

_3x5=L._3x5?U.from(L._3x5.split`,`):U.from(z).map((a,i)=>z[i].charCodeAt())

glyphIndex=l=>z.indexOf(l)
glyph=(l)=>_3x5[glyphIndex(l)]
getBit=(l,i)=>glyph(l)>>i&1
setBit=(l,i,v)=>v^getBit(l,i)?_3x5[glyphIndex(l)]^=1<<i:0

loadASCII=(l,A)=>fromBinaryASCII(A).map((a,i)=>setBit(l,i,a))

toASCII=(l)=>(glyph(l)&0x7FFF).toString(2).padStart(15,0).match(/.../g).join`\n`
//{for(g=glyph(l),i=15,r='';i--;i%w||i^14?0:r+='\n')r+=getBit(g,i%w,i/w|0);return r}
//glyph(l).toString(2).padStart(15,0).match(/.../g).reverse().join`\n`

onM=e=>{
b=e.buttons
c=e.target
if(!b||b&2)return
r=c.getBoundingClientRect()
x=(e.x-r.left)*c.width/c.clientWidth|0
y=(e.y-r.top)*c.height/c.clientHeight|0
drawPixel(c,x,y,v=b==1)
t=e.target
setBit(l=t.getAttribute`id`[0],(h-y-1)*w+(w-x-1),v)
this[l+2].value=toASCII(l)
//L._3x5=_3x5
//console.log(l,x,y,v,e)
}

G.innerHTML=z.replace(/./g,l=>`<div${s=' id='+l}1><textarea${s}2 rows=5 cols=2>
${toASCII(l)}</textarea><canvas${s}3 width=3 height=5></canvas></div>`);
[...z].map(l=>draw(c=this[l+3],fromBinaryASCII(this[l+2].value),c.onmousedown=c.onmousemove=onM))


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