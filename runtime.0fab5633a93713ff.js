(()=>{"use strict";var e,v={},g={};function r(e){var i=g[e];if(void 0!==i)return i.exports;var t=g[e]={id:e,loaded:!1,exports:{}};return v[e].call(t.exports,t,t.exports,r),t.loaded=!0,t.exports}r.m=v,e=[],r.O=(i,t,f,o)=>{if(!t){var a=1/0;for(n=0;n<e.length;n++){for(var[t,f,o]=e[n],s=!0,d=0;d<t.length;d++)(!1&o||a>=o)&&Object.keys(r.O).every(b=>r.O[b](t[d]))?t.splice(d--,1):(s=!1,o<a&&(a=o));if(s){e.splice(n--,1);var u=f();void 0!==u&&(i=u)}}return i}o=o||0;for(var n=e.length;n>0&&e[n-1][2]>o;n--)e[n]=e[n-1];e[n]=[t,f,o]},r.n=e=>{var i=e&&e.__esModule?()=>e.default:()=>e;return r.d(i,{a:i}),i},r.d=(e,i)=>{for(var t in i)r.o(i,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:i[t]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((i,t)=>(r.f[t](e,i),i),[])),r.u=e=>e+"."+{83:"e9b409e9ae286cfc",228:"1a730b0fac598d72",379:"67f6bfc1cfd4432a",435:"89f73ed0c68596c3",582:"01f839893dd9d64d",880:"3016117ce269f94f"}[e]+".js",r.miniCssF=e=>"styles.a588b1b7c3efa0a7.css",r.o=(e,i)=>Object.prototype.hasOwnProperty.call(e,i),(()=>{var e={},i="ranks:";r.l=(t,f,o,n)=>{if(e[t])e[t].push(f);else{var a,s;if(void 0!==o)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var l=d[u];if(l.getAttribute("src")==t||l.getAttribute("data-webpack")==i+o){a=l;break}}a||(s=!0,(a=document.createElement("script")).type="module",a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",i+o),a.src=r.tu(t)),e[t]=[f];var c=(m,b)=>{a.onerror=a.onload=null,clearTimeout(p);var h=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),h&&h.forEach(_=>_(b)),m)return m(b)},p=setTimeout(c.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=c.bind(null,a.onerror),a.onload=c.bind(null,a.onload),s&&document.head.appendChild(a)}}})(),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;r.tu=i=>(void 0===e&&(e={createScriptURL:t=>t},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e.createScriptURL(i))})(),r.p="",(()=>{var e={666:0};r.f.j=(f,o)=>{var n=r.o(e,f)?e[f]:void 0;if(0!==n)if(n)o.push(n[2]);else if(666!=f){var a=new Promise((l,c)=>n=e[f]=[l,c]);o.push(n[2]=a);var s=r.p+r.u(f),d=new Error;r.l(s,l=>{if(r.o(e,f)&&(0!==(n=e[f])&&(e[f]=void 0),n)){var c=l&&("load"===l.type?"missing":l.type),p=l&&l.target&&l.target.src;d.message="Loading chunk "+f+" failed.\n("+c+": "+p+")",d.name="ChunkLoadError",d.type=c,d.request=p,n[1](d)}},"chunk-"+f,f)}else e[f]=0},r.O.j=f=>0===e[f];var i=(f,o)=>{var d,u,[n,a,s]=o,l=0;if(n.some(p=>0!==e[p])){for(d in a)r.o(a,d)&&(r.m[d]=a[d]);if(s)var c=s(r)}for(f&&f(o);l<n.length;l++)r.o(e,u=n[l])&&e[u]&&e[u][0](),e[n[l]]=0;return r.O(c)},t=self.webpackChunkranks=self.webpackChunkranks||[];t.forEach(i.bind(null,0)),t.push=i.bind(null,t.push.bind(t))})()})();