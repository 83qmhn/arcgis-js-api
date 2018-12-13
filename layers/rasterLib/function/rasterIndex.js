// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["dojo/_base/lang"],function(e){return{calculate:function(e,r){if(e&&e.pixels&&e.pixels.length){var n=r&&r.bandIndexes,t=r&&r.method,l=n.trim().split(" ").map(function(e){return parseInt(e,10)}).filter(function(e){return null!=e}),a=this._clonePixelBlock(e),o=a.pixels,i=a.mask;switch(t){case 1:o=this._calculateNDVI(i,o[l[0]-1],o[l[1]-1]);break;case 2:o=this._calculateSAVI(i,o[l[0]-1],o[l[1]-1],l[2]);break;case 3:o=this._calculateTSAVI(i,o[l[0]-1],o[l[1]-1],l[2],l[3],l[4]);break;case 4:o=this._calculateMSAVI(i,o[l[0]-1],o[l[1]-1]);break;case 5:o=this._calculateGEMI(i,o[l[0]-1],o[l[1]-1]);break;case 6:o=this._calculatePVI(i,o[l[0]-1],o[l[1]-1],l[2],l[3]);break;case 7:o=this._calculateGVITM(i,o[l[0]-1],o[l[1]-1],o[l[2]-1],o[l[3]-1],o[l[4]-1],o[l[5]-1]);break;case 8:o=this._calculateSultan(i,o[l[0]-1],o[l[1]-1],o[l[2]-1],o[l[3]-1],o[l[4]-1],o[l[5]-1]);break;case 0:o=this._calculateUserDefined(i,o,n)}return a.pixels=o,a.pixelType="F32",a.calculateStatistics(),a}},_clonePixelBlock:function(r){return r.clone?r.clone():e.clone(r)},_parseUserDefined:function(e,r){e=e.replace(" ",""),0===e.indexOf("-")&&(e="0"+e),0===e.indexOf("+")&&(e=e.slice(1,e.length));var n,t,l=e.split(""),a=[],o=[],i=["+","-","*","/","(",")"],c="";for(n=0;n<l.length;n++)if(t=l[n],i.some(function(e){return e===t}))""!==c&&o.push(parseFloat(c)),a.push(t),c="";else{if("b"===t.toLowerCase()){n++,c=t.concat(l[n]),o.push(r[parseInt(c[1],10)-1]),c="";continue}c=c.concat(t),n===l.length-1&&o.push(parseFloat(c))}return{ops:a,nums:o}},_op:function(e,r,n,t){if(n.constructor===Number&&t.constructor===Number)return n+t;var l,a,o;if(n.constructor===Number)for(l=t.length,a=n,n=new Float32Array(l),o=0;o<l;o++)n[o]=a;else if(l=n.length,t.constructor===Number)for(a=t,t=new Float32Array(l),o=0;o<l;o++)t[o]=a;var i=new Float32Array(l);if(null==e){if("+"===r)for(o=0;o<l;o++)i[o]=n[o]+t[o];else if("-"===r)for(o=0;o<l;o++)i[o]=n[o]-t[o];else if("*"===r)for(o=0;o<l;o++)i[o]=n[o]*t[o];else if("/"===r)for(o=0;o<l;o++)i[o]=n[o]/t[o]}else if("+"===r)for(o=0;o<l;o++)e[o]&&(i[o]=n[o]+t[o]);else if("-"===r)for(o=0;o<l;o++)e[o]&&(i[o]=n[o]-t[o]);else if("*"===r)for(o=0;o<l;o++)e[o]&&(i[o]=n[o]*t[o]);else if("/"===r)for(o=0;o<l;o++)e[o]&&(i[o]=n[o]/t[o]);return i},_shrinkOp:function(e,r){e.splice(r,1);var n=0,t=0,l=0;do{for(t=0,l=0,n=0;n<e.length;n++)if("("===e[n])t=n;else if(")"===e[n]){l=n;break}l===t+1&&e.splice(t,2)}while(l===t+1);return e},_getPriorityOpIndex:function(e,r){if(1===e.length)return{opIndex:0,numIndex:0};var n,t=0,l=0,a=0,o=-1,i=0;for(t=0;t<e.length;t++)if("("===e[t])l=t;else if(")"===e[t]){a=t;break}for(n=0===a?e:e.slice(l+1,a),t=0;t<n.length;t++)if("*"===n[t]||"/"===n[t]){o=t;break}if(o>-1)a>0&&(o+=l+1);else{for(t=0;t<n.length;t++)if("+"===n[t]||"-"===n[t]){o=t;break}a>0&&(o+=l+1)}for(t=0;t<o;t++)"("===e[t]&&i++;return{opIndex:o,numIndex:o-i}},_calculateUserDefined:function(e,r,n){for(var t,l,a,o,i=this._parseUserDefined(n,r),c=i.ops,u=i.nums;c.length>0&&(i=this._getPriorityOpIndex(c,u),t=c[i.opIndex],a=u[i.numIndex],o=u[i.numIndex+1],l=this._op(e,t,a,o),1!==c.length);)c=this._shrinkOp(c,i.opIndex),u.splice(i.numIndex,2,l);return[l]},_calculateNDVI:function(e,r,n){var t,l,a,o=n.length,i=new Float32Array(o);if(null==e)for(t=0;t<o;t++)l=n[t],a=r[t],i[t]=(a-l)/(a+l);else for(t=0;t<o;t++)e[t]&&(l=n[t],a=r[t],i[t]=(a-l)/(a+l));return[i]},_calculateSAVI:function(e,r,n,t){var l,a,o,i=n.length,c=new Float32Array(i);if(null==e)for(l=0;l<i;l++)a=n[l],o=r[l],c[l]=(o-a)/(o+a+t)*(1+t);else for(l=0;l<i;l++)e[l]&&(a=n[l],o=r[l],c[l]=(o-a)/(o+a+t)*(1+t));return[c]},_calculateTSAVI:function(e,r,n,t,l,a){var o,i,c,u=n.length,f=new Float32Array(u),s=-l*t+a*(1+t*t);if(null==e)for(o=0;o<u;o++)i=n[o],c=r[o],f[o]=t*(c-t*i-l)/(l*c+i+s);else for(o=0;o<u;o++)e[o]&&(i=n[o],c=r[o],f[o]=t*(c-t*i-l)/(l*c+i+s));return[f]},_calculateMSAVI:function(e,r,n){var t,l,a,o=n.length,i=new Float32Array(o);if(null==e)for(t=0;t<o;t++)l=n[t],a=r[t],i[t]=.5*(2*(a+1)-Math.sqrt(Math.pow(2*a+1,2)-8*(a-l)));else for(t=0;t<o;t++)e[t]&&(i[t]=.5*(2*(a+1)-Math.sqrt(Math.pow(2*a+1,2)-8*(a-l))));return[i]},_calculateGEMI:function(e,r,n){var t,l,a,o,i=n.length,c=new Float32Array(i);if(null==e)for(t=0;t<i;t++)l=n[t],a=r[t],o=(2*(a*a-l*l)+1.5*a+.5*l)/(a+l+.5),c[t]=o*(1-.25*o)-(l-.125)/(1-l);else for(t=0;t<i;t++)e[t]&&(l=n[t],a=r[t],o=(2*(a*a-l*l)+1.5*a+.5*l)/(a+l+.5),c[t]=o*(1-.25*o)-(l-.125)/(1-l));return[c]},_calculatePVI:function(e,r,n,t,l){var a,o,i,c=n.length,u=new Float32Array(c),f=Math.sqrt(1+t*t);if(null==e)for(a=0;a<c;a++)o=n[a],i=r[a],u[a]=(i-t*o-l)/f;else for(a=0;a<c;a++)e[a]&&(o=n[a],i=r[a],u[a]=(i-t*o-l)/f);return[u]},_calculateGVITM:function(e,r,n,t,l,a,o){var i,c=r.length,u=new Float32Array(c);if(null==e)for(i=0;i<c;i++)u[i]=-.2848*r[i]-.2435*n[i]-.5436*t[i]+.7243*l[i]+.084*a[i]-1.18*o[i];else for(i=0;i<c;i++)e[i]&&(u[i]=-.2848*r[i]-.2435*n[i]-.5436*t[i]+.7243*l[i]+.084*a[i]-1.18*o[i]);return[u]},_calculateSultan:function(e,r,n,t,l,a,o){var i,c=r.length,u=new Float32Array(c),f=new Float32Array(c),s=new Float32Array(c);if(null==e)for(i=0;i<c;i++)u[i]=a[i]/o[i]*100,f[i]=a[i]/r[i]*100,s[i]=t[i]/l[i]*(a[i]/l[i])*100;else for(i=0;i<c;i++)e[i]&&(u[i]=a[i]/o[i]*100,f[i]=a[i]/r[i]*100,s[i]=t[i]/l[i]*(a[i]/l[i])*100);return[u,f,s]}}});