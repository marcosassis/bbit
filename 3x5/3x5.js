// GPLv3 marcos assis 2020
w=3,h=5
// rom-major
fromBinaryASCII=A=>A.match(/0|1/g).map(a=>~~a)
drawPixel=(C,v,x,y)=>(X=C.getContext`2d`).fillRect(x,y,1,1,X.fillStyle=v?"#000":"#fff")
draw=(C,M)=>M.map((m,i)=>drawPixel(C,m,i%w,i/w|0))
setBit=(E,v,x,y)=>{
T=this[n=E.target.getAttribute("id")[0]+2]
A=fromBinaryASCII(T.value)
A[x+y*w]=v*1
localStorage[n]=T.value=A.join``.match(/.../g).join`\n`
}
onM=e=>{
b=e.buttons
c=e.target
if(!b||b&2)return
r=c.getBoundingClientRect()
x=(e.x-r.left)*c.width/c.clientWidth|0
y=(e.y-r.top)*c.height/c.clientHeight|0
drawPixel(c,v=b==1,x,y)
setBit(e,v,x,y)
}
z="ABCDEFGHIJKLMNOPQRSTUWVXYZ.!"
d=`111
101
111
101
111`
G.innerHTML=z.replace(/./g,l=>`<div${s=' id='+l}1><textarea${s}2 rows=5 cols=2>
${localStorage[l+2]||d}</textarea><canvas${s}3 width=3 height=5></canvas></div>`);
[...z].map(l=>draw(c=this[l+3],fromBinaryASCII(this[l+2].value),c.onmousedown=c.onmousemove=onM))


//;(I.onchange=e=>[...I.value.toUpperCase(O.width=I.value.length*4)].map((l,i)=>draw(O,fromBinaryASCII((L=this[l+2])?L.value:"0".repeat(15),i*4))))()






// I=T.value
// drawOnCanvas(C,fromBinaryASCII(I))

// d=L.cloneNode(1)
// d.setAttribute("id","_H")
// G.appendChild(d)

// drawOnCanvas(_H.children[1].getContext`2d`,
// fromBinaryASCII(_H.children[0].value))



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



// h=_=>{while(I[i]!='\r'&&I[i]!='\n')++i}

// for(i=3;i<I.length;++i){
//   I[i]=='#'&&h()
// }