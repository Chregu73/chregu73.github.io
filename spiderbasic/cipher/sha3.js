/*
 * js-sha3 v0.5.1
 * https://github.com/emn178/js-sha3
 *
 * Copyright 2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function(r,ma){function n(a,b,c){this.blocks=[];this.s=[];this.padding=b;this.outputBits=c;this.reset=!0;this.start=this.block=0;this.blockCount=1600-(a<<1)>>5;this.byteCount=this.blockCount<<2;this.outputBlocks=c>>5;this.extraBytes=(c&31)>>3;for(a=0;50>a;++a)this.s[a]=0}var ga="undefined"!=typeof module;ga&&(r=global,r.JS_SHA3_TEST&&(r.navigator={userAgent:"Chrome"}));for(var l="0123456789abcdef".split(""),p=[0,8,16,24],ha=[1,0,32898,0,32906,2147483648,2147516416,2147483648,32907,0,2147483649,0,
2147516545,2147483648,32777,2147483648,138,0,136,0,2147516425,0,2147483658,0,2147516555,0,139,2147483648,32905,2147483648,32771,2147483648,32770,2147483648,128,2147483648,32778,0,2147483658,2147483648,2147516545,2147483648,32896,2147483648,2147483649,0,2147516424,2147483648],t=[224,256,384,512],w=["hex","buffer","array"],ia=function(a,b,c){return function(e){return(new n(a,b,a)).update(e)[c]()}},ja=function(a,b,c){return function(e,g){return(new n(a,b,g)).update(e)[c]()}},q=function(a,b){var c=ia(a,
b,"hex");c.create=function(){return new n(a,b,a)};c.update=function(a){return c.create().update(a)};for(var e=0;e<w.length;++e){var g=w[e];c[g]=ia(a,b,g)}return c},t=[{name:"keccak",padding:[1,256,65536,16777216],bits:t,createMethod:q},{name:"sha3",padding:[6,1536,393216,100663296],bits:t,createMethod:q},{name:"shake",padding:[31,7936,2031616,520093696],bits:[128,256],createMethod:function(a,b){var c=ja(a,b,"hex");c.create=function(c){return new n(a,b,c)};c.update=function(a,b){return c.create(b).update(a)};
for(var e=0;e<w.length;++e){var g=w[e];c[g]=ja(a,b,g)}return c}}],x={},ea=0;ea<t.length;++ea)for(var u=t[ea],fa=u.bits,q=u.createMethod,q=0;q<fa.length;++q){var la=u.createMethod(fa[q],u.padding);x[u.name+"_"+fa[q]]=la}n.prototype.update=function(a){var b="string"!=typeof a;b&&a.constructor==r.ArrayBuffer&&(a=new Uint8Array(a));for(var c=a.length,e=this.blocks,g=this.byteCount,k=this.blockCount,h=0,f=this.s,d,m;h<c;){if(this.reset)for(this.reset=!1,e[0]=this.block,d=1;d<k+1;++d)e[d]=0;if(b)for(d=
this.start;h<c&&d<g;++h)e[d>>2]|=a[h]<<p[d++&3];else for(d=this.start;h<c&&d<g;++h)m=a.charCodeAt(h),128>m?e[d>>2]|=m<<p[d++&3]:(2048>m?e[d>>2]|=(192|m>>6)<<p[d++&3]:(55296>m||57344<=m?e[d>>2]|=(224|m>>12)<<p[d++&3]:(m=65536+((m&1023)<<10|a.charCodeAt(++h)&1023),e[d>>2]|=(240|m>>18)<<p[d++&3],e[d>>2]|=(128|m>>12&63)<<p[d++&3]),e[d>>2]|=(128|m>>6&63)<<p[d++&3]),e[d>>2]|=(128|m&63)<<p[d++&3]);this.lastByteIndex=d;if(d>=g){this.start=d-g;this.block=e[k];for(d=0;d<k;++d)f[d]^=e[d];v(f);this.reset=!0}else this.start=
d}return this};n.prototype.finalize=function(){var a=this.blocks,b=this.lastByteIndex,c=this.blockCount,e=this.s;a[b>>2]|=this.padding[b&3];if(this.lastByteIndex==this.byteCount)for(a[0]=a[c],b=1;b<c+1;++b)a[b]=0;a[c-1]|=2147483648;for(b=0;b<c;++b)e[b]^=a[b];v(e)};n.prototype.toString=n.prototype.hex=function(){this.finalize();for(var a=this.blockCount,b=this.s,c=this.outputBlocks,e=this.extraBytes,g=0,k=0,h="",f;k<c;){for(g=0;g<a&&k<c;++g,++k)f=b[g],h+=l[f>>4&15]+l[f&15]+l[f>>12&15]+l[f>>8&15]+l[f>>
20&15]+l[f>>16&15]+l[f>>28&15]+l[f>>24&15];0==k%a&&v(b)}e&&(f=b[g],0<e&&(h+=l[f>>4&15]+l[f&15]),1<e&&(h+=l[f>>12&15]+l[f>>8&15]),2<e&&(h+=l[f>>20&15]+l[f>>16&15]));return h};n.prototype.buffer=function(){this.finalize();var a=this.blockCount,b=this.s,c=this.outputBlocks,e=this.extraBytes,g=0,k=0,h=this.outputBits>>3,f;f=e?new ArrayBuffer(c+1<<2):new ArrayBuffer(h);for(var d=new Uint32Array(f);k<c;){for(g=0;g<a&&k<c;++g,++k)d[k]=b[g];0==k%a&&v(b)}e&&(d[g]=b[g],f=f.slice(0,h));return f};n.prototype.digest=
n.prototype.array=function(){this.finalize();for(var a=this.blockCount,b=this.s,c=this.outputBlocks,e=this.extraBytes,g=0,k=0,h=[],f,d;k<c;){for(g=0;g<a&&k<c;++g,++k)f=k<<2,d=b[g],h[f]=d&255,h[f+1]=d>>8&255,h[f+2]=d>>16&255,h[f+3]=d>>24&255;0==k%a&&v(b)}e&&(f=k<<2,d=b[g],0<e&&(h[f]=d&255),1<e&&(h[f+1]=d>>8&255),2<e&&(h[f+2]=d>>16&255));return h};var v=function(a){var b,c,e,g,k,h,f,d,m,l,n,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,aa,ba,ca,da;for(e=0;48>e;e+=2)g=a[0]^
a[10]^a[20]^a[30]^a[40],k=a[1]^a[11]^a[21]^a[31]^a[41],h=a[2]^a[12]^a[22]^a[32]^a[42],f=a[3]^a[13]^a[23]^a[33]^a[43],d=a[4]^a[14]^a[24]^a[34]^a[44],m=a[5]^a[15]^a[25]^a[35]^a[45],l=a[6]^a[16]^a[26]^a[36]^a[46],n=a[7]^a[17]^a[27]^a[37]^a[47],p=a[8]^a[18]^a[28]^a[38]^a[48],q=a[9]^a[19]^a[29]^a[39]^a[49],b=p^(h<<1|f>>>31),c=q^(f<<1|h>>>31),a[0]^=b,a[1]^=c,a[10]^=b,a[11]^=c,a[20]^=b,a[21]^=c,a[30]^=b,a[31]^=c,a[40]^=b,a[41]^=c,b=g^(d<<1|m>>>31),c=k^(m<<1|d>>>31),a[2]^=b,a[3]^=c,a[12]^=b,a[13]^=c,a[22]^=
b,a[23]^=c,a[32]^=b,a[33]^=c,a[42]^=b,a[43]^=c,b=h^(l<<1|n>>>31),c=f^(n<<1|l>>>31),a[4]^=b,a[5]^=c,a[14]^=b,a[15]^=c,a[24]^=b,a[25]^=c,a[34]^=b,a[35]^=c,a[44]^=b,a[45]^=c,b=d^(p<<1|q>>>31),c=m^(q<<1|p>>>31),a[6]^=b,a[7]^=c,a[16]^=b,a[17]^=c,a[26]^=b,a[27]^=c,a[36]^=b,a[37]^=c,a[46]^=b,a[47]^=c,b=l^(g<<1|k>>>31),c=n^(k<<1|g>>>31),a[8]^=b,a[9]^=c,a[18]^=b,a[19]^=c,a[28]^=b,a[29]^=c,a[38]^=b,a[39]^=c,a[48]^=b,a[49]^=c,b=a[0],c=a[1],M=a[11]<<4|a[10]>>>28,N=a[10]<<4|a[11]>>>28,u=a[20]<<3|a[21]>>>29,v=
a[21]<<3|a[20]>>>29,aa=a[31]<<9|a[30]>>>23,ba=a[30]<<9|a[31]>>>23,I=a[40]<<18|a[41]>>>14,J=a[41]<<18|a[40]>>>14,A=a[2]<<1|a[3]>>>31,B=a[3]<<1|a[2]>>>31,g=a[13]<<12|a[12]>>>20,k=a[12]<<12|a[13]>>>20,O=a[22]<<10|a[23]>>>22,P=a[23]<<10|a[22]>>>22,w=a[33]<<13|a[32]>>>19,x=a[32]<<13|a[33]>>>19,ca=a[42]<<2|a[43]>>>30,da=a[43]<<2|a[42]>>>30,U=a[5]<<30|a[4]>>>2,V=a[4]<<30|a[5]>>>2,C=a[14]<<6|a[15]>>>26,D=a[15]<<6|a[14]>>>26,h=a[25]<<11|a[24]>>>21,f=a[24]<<11|a[25]>>>21,Q=a[34]<<15|a[35]>>>17,R=a[35]<<15|
a[34]>>>17,y=a[45]<<29|a[44]>>>3,z=a[44]<<29|a[45]>>>3,p=a[6]<<28|a[7]>>>4,q=a[7]<<28|a[6]>>>4,W=a[17]<<23|a[16]>>>9,X=a[16]<<23|a[17]>>>9,E=a[26]<<25|a[27]>>>7,F=a[27]<<25|a[26]>>>7,d=a[36]<<21|a[37]>>>11,m=a[37]<<21|a[36]>>>11,S=a[47]<<24|a[46]>>>8,T=a[46]<<24|a[47]>>>8,K=a[8]<<27|a[9]>>>5,L=a[9]<<27|a[8]>>>5,r=a[18]<<20|a[19]>>>12,t=a[19]<<20|a[18]>>>12,Y=a[29]<<7|a[28]>>>25,Z=a[28]<<7|a[29]>>>25,G=a[38]<<8|a[39]>>>24,H=a[39]<<8|a[38]>>>24,l=a[48]<<14|a[49]>>>18,n=a[49]<<14|a[48]>>>18,a[0]=b^~g&
h,a[1]=c^~k&f,a[10]=p^~r&u,a[11]=q^~t&v,a[20]=A^~C&E,a[21]=B^~D&F,a[30]=K^~M&O,a[31]=L^~N&P,a[40]=U^~W&Y,a[41]=V^~X&Z,a[2]=g^~h&d,a[3]=k^~f&m,a[12]=r^~u&w,a[13]=t^~v&x,a[22]=C^~E&G,a[23]=D^~F&H,a[32]=M^~O&Q,a[33]=N^~P&R,a[42]=W^~Y&aa,a[43]=X^~Z&ba,a[4]=h^~d&l,a[5]=f^~m&n,a[14]=u^~w&y,a[15]=v^~x&z,a[24]=E^~G&I,a[25]=F^~H&J,a[34]=O^~Q&S,a[35]=P^~R&T,a[44]=Y^~aa&ca,a[45]=Z^~ba&da,a[6]=d^~l&b,a[7]=m^~n&c,a[16]=w^~y&p,a[17]=x^~z&q,a[26]=G^~I&A,a[27]=H^~J&B,a[36]=Q^~S&K,a[37]=R^~T&L,a[46]=aa^~ca&U,a[47]=
ba^~da&V,a[8]=l^~b&g,a[9]=n^~c&k,a[18]=y^~p&r,a[19]=z^~q&t,a[28]=I^~A&C,a[29]=J^~B&D,a[38]=S^~K&M,a[39]=T^~L&N,a[48]=ca^~U&W,a[49]=da^~V&X,a[0]^=ha[e],a[1]^=ha[e+1]};if(!r.JS_SHA3_TEST&&ga)module.exports=x;else if(r)for(var ka in x)r[ka]=x[ka]})(this);
