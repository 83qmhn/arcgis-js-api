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

define([],function(){"use strict";function r(t,n,e,u){this.message=t,this.expected=n,this.found=e,this.location=u,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,r)}function t(t,n){function e(r,t){return{type:"literal",text:r,ignoreCase:t}}function u(r,t,n){return{type:"class",parts:r,inverted:t,ignoreCase:n}}function o(r){return{type:"other",description:r}}function i(r){var n,e=to[r];if(e)return e;for(n=r-1;!to[n];)n--;for(e=to[n],e={line:e.line,column:e.column};n<r;)10===t.charCodeAt(n)?(e.line++,e.column=1):e.column++,n++;return to[r]=e,e}function s(r,t){var n=i(r),e=i(t);return{start:{offset:r,line:n.line,column:n.column},end:{offset:t,line:e.line,column:e.column}}}function a(r){$u<no||($u>no&&(no=$u,eo=[]),eo.push(r))}function c(t,n,e){return new r(r.buildMessage(t,n),t,n,e)}function f(){var r,t,n,e;return r=$u,t=Xr(),t!==et?(n=v(),n!==et?(e=Xr(),e!==et?(ro=r,t=it(n),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function l(){var r,t,n,e,u,o,i,s;if(r=$u,(t=v())!==et){for(n=[],e=$u,u=Xr(),u!==et?(o=Yr(),o!==et?(i=Xr(),i!==et?(s=v(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);e!==et;)n.push(e),e=$u,u=Xr(),u!==et?(o=Yr(),o!==et?(i=Xr(),i!==et?(s=v(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);n!==et?(ro=r,t=st(t,n),r=t):($u=r,r=et)}else $u=r,r=et;return r}function v(){var r,t,n,e,u,o,i,s;if(r=$u,(t=p())!==et){for(n=[],e=$u,u=Xr(),u!==et?(o=Er(),o!==et?(i=Xr(),i!==et?(s=p(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);e!==et;)n.push(e),e=$u,u=Xr(),u!==et?(o=Er(),o!==et?(i=Xr(),i!==et?(s=p(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);n!==et?(ro=r,t=at(t,n),r=t):($u=r,r=et)}else $u=r,r=et;return r}function p(){var r,t,n,e,u,o,i,s;if(r=$u,(t=h())!==et){for(n=[],e=$u,u=Xr(),u!==et?(o=yr(),o!==et?(i=Xr(),i!==et?(s=h(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);e!==et;)n.push(e),e=$u,u=Xr(),u!==et?(o=yr(),o!==et?(i=Xr(),i!==et?(s=h(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);n!==et?(ro=r,t=at(t,n),r=t):($u=r,r=et)}else $u=r,r=et;return r}function h(){var r,n,e,u,o;return r=$u,n=gr(),n===et&&(n=$u,33===t.charCodeAt($u)?(e=ct,$u++):(e=et,0===uo&&a(ft)),e!==et?(u=$u,uo++,61===t.charCodeAt($u)?(o=lt,$u++):(o=et,0===uo&&a(vt)),uo--,o===et?u=void 0:($u=u,u=et),u!==et?(e=[e,u],n=e):($u=n,n=et)):($u=n,n=et)),n!==et?(e=Xr(),e!==et?(u=h(),u!==et?(ro=r,n=pt(u),r=n):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r===et&&(r=d()),r}function d(){var r,t,n,e;return r=$u,t=m(),t!==et?(n=Xr(),n!==et?(e=b(),e===et&&(e=null),e!==et?(ro=r,t=ht(t,e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function b(){var r;return r=A(),r===et&&(r=x())===et&&(r=y())===et&&(r=g())===et&&(r=w()),r}function A(){var r,t,n,e,u,o,i;if(r=$u,t=[],n=$u,e=Xr(),e!==et?(u=C(),u!==et?(o=Xr(),o!==et?(i=m(),i!==et?(e=[e,u,o,i],n=e):($u=n,n=et)):($u=n,n=et)):($u=n,n=et)):($u=n,n=et),n!==et)for(;n!==et;)t.push(n),n=$u,e=Xr(),e!==et?(u=C(),u!==et?(o=Xr(),o!==et?(i=m(),i!==et?(e=[e,u,o,i],n=e):($u=n,n=et)):($u=n,n=et)):($u=n,n=et)):($u=n,n=et);else t=et;return t!==et&&(ro=r,t=dt(t)),r=t}function C(){var r;return t.substr($u,2)===bt?(r=bt,$u+=2):(r=et,0===uo&&a(At)),r===et&&(62===t.charCodeAt($u)?(r=Ct,$u++):(r=et,0===uo&&a(gt)),r===et&&(t.substr($u,2)===yt?(r=yt,$u+=2):(r=et,0===uo&&a(Et)),r===et&&(t.substr($u,2)===Lt?(r=Lt,$u+=2):(r=et,0===uo&&a(wt)),r===et&&(60===t.charCodeAt($u)?(r=xt,$u++):(r=et,0===uo&&a(mt)),r===et&&(61===t.charCodeAt($u)?(r=lt,$u++):(r=et,0===uo&&a(vt)),r===et&&(t.substr($u,2)===Tt?(r=Tt,$u+=2):(r=et,0===uo&&a(Nt)))))))),r}function g(){var r,t,n,e,u,o;return r=$u,t=br(),t!==et?(n=Xr(),n!==et?(e=gr(),e!==et?(u=Xr(),u!==et?(o=m(),o!==et?(ro=r,t=Ft(t,o),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=br(),t!==et?(n=Xr(),n!==et?(e=m(),e!==et?(ro=r,t=Ot(t,e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)),r}function y(){var r,t,n,e,u,o,i,s,a,c;return r=$u,t=gr(),t!==et?(n=Xr(),n!==et?(e=Lr(),e!==et?(u=Xr(),u!==et?(o=m(),o!==et?(i=Xr(),i!==et?(s=yr(),s!==et?(a=Xr(),a!==et?(c=m(),c!==et?(ro=r,t=_t(e,o,c),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=Lr(),t!==et?(n=Xr(),n!==et?(e=m(),e!==et?(u=Xr(),u!==et?(o=yr(),o!==et?(i=Xr(),i!==et?(s=m(),s!==et?(ro=r,t=It(t,e,s),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)),r}function E(){var r,t,n,e,u;return r=$u,t=$u,n=gr(),n!==et?(e=Xr(),e!==et?(u=Ar(),u!==et?(n=[n,e,u],t=n):($u=t,t=et)):($u=t,t=et)):($u=t,t=et),t!==et&&(ro=r,t=St(t)),r=t,r===et&&(r=Ar()),r}function L(){var r,t,n,e,u;return r=$u,t=$u,n=gr(),n!==et?(e=Xr(),e!==et?(u=dr(),u!==et?(n=[n,e,u],t=n):($u=t,t=et)):($u=t,t=et)):($u=t,t=et),t!==et&&(ro=r,t=St(t)),r=t,r===et&&(r=dr()),r}function w(){var r,t,n,e,u,o,i,s;return r=$u,t=E(),t!==et?(n=Xr(),n!==et?(e=J(),e!==et?(u=Xr(),u!==et?(o=Cr(),o!==et?(i=Xr(),i!==et?(s=Q(),s!==et?(ro=r,t=Rt(t,e,s),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=E(),t!==et?(n=Xr(),n!==et?(e=J(),e!==et?(ro=r,t=Mt(t,e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)),r}function x(){var r,t,n,e,u,o,i,s;return r=$u,t=L(),t!==et?(n=Xr(),n!==et?(e=kr(),e!==et?(u=Xr(),u!==et?(o=l(),o!==et?(i=Xr(),i!==et?(s=Kr(),s!==et?(ro=r,t=Dt(t,o),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=L(),t!==et?(n=Xr(),n!==et?(e=kr(),e!==et?(u=Xr(),u!==et?(o=Kr(),o!==et?(ro=r,t=Ht(t),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=L(),t!==et?(n=Xr(),n!==et?(e=U(),e!==et?(ro=r,t=Ut(t,e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et))),r}function m(){var r,t,n,e,u,o,i,s;if(r=$u,(t=N())!==et){for(n=[],e=$u,u=Xr(),u!==et?(o=T(),o!==et?(i=Xr(),i!==et?(s=N(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);e!==et;)n.push(e),e=$u,u=Xr(),u!==et?(o=T(),o!==et?(i=Xr(),i!==et?(s=N(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);n!==et?(ro=r,t=at(t,n),r=t):($u=r,r=et)}else $u=r,r=et;return r}function T(){var r;return 43===t.charCodeAt($u)?(r=Bt,$u++):(r=et,0===uo&&a(zt)),r===et&&(45===t.charCodeAt($u)?(r=Gt,$u++):(r=et,0===uo&&a(Pt))),r}function N(){var r,t,n,e,u,o,i,s;if(r=$u,(t=O())!==et){for(n=[],e=$u,u=Xr(),u!==et?(o=F(),o!==et?(i=Xr(),i!==et?(s=O(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);e!==et;)n.push(e),e=$u,u=Xr(),u!==et?(o=F(),o!==et?(i=Xr(),i!==et?(s=O(),s!==et?(u=[u,o,i,s],e=u):($u=e,e=et)):($u=e,e=et)):($u=e,e=et)):($u=e,e=et);n!==et?(ro=r,t=Zt(t,n),r=t):($u=r,r=et)}else $u=r,r=et;return r}function F(){var r;return 42===t.charCodeAt($u)?(r=jt,$u++):(r=et,0===uo&&a(Wt)),r===et&&(47===t.charCodeAt($u)?(r=Yt,$u++):(r=et,0===uo&&a(kt))),r}function O(){var r,t,n,e,u,o;return r=Y(),r===et&&(r=B())===et&&(r=z())===et&&(r=G())===et&&(r=Z())===et&&(r=j())===et&&(r=V())===et&&(r=_())===et&&(r=U())===et&&(r=$u,t=kr(),t!==et?(n=Xr(),n!==et?(e=v(),e!==et?(u=Xr(),u!==et?(o=Kr(),o!==et?(ro=r,t=Kt(e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)),r}function _(){var r,t;return r=$u,t=I(),t!==et&&(ro=r,t=Xt(t)),r=t}function I(){var r,t;return r=$u,t=S(),t!==et&&(ro=r,t=qt(t)),r=t}function S(){var r,t,n,e;if(r=$u,(t=M())!==et){for(n=[],e=H();e!==et;)n.push(e),e=H();n!==et?(ro=r,t=Jt(t,n),r=t):($u=r,r=et)}else $u=r,r=et;return r}function R(){var r,t,n,e;if(r=$u,(t=M())!==et){for(n=[],e=D();e!==et;)n.push(e),e=D();n!==et?(ro=r,t=Jt(t,n),r=t):($u=r,r=et)}else $u=r,r=et;return r}function M(){var r;return Qt.test(t.charAt($u))?(r=t.charAt($u),$u++):(r=et,0===uo&&a(Vt)),r}function D(){var r;return $t.test(t.charAt($u))?(r=t.charAt($u),$u++):(r=et,0===uo&&a(rn)),r}function H(){var r;return tn.test(t.charAt($u))?(r=t.charAt($u),$u++):(r=et,0===uo&&a(nn)),r}function U(){var r,n,e,u;return r=$u,n=$u,64===t.charCodeAt($u)?(e=en,$u++):(e=et,0===uo&&a(un)),e!==et?(u=R(),u!==et?(e=[e,u],n=e):($u=n,n=et)):($u=n,n=et),n!==et&&(ro=r,n=on(n)),r=n}function B(){var r,t,n,e,u,o,i,s,a,c,f,l;return r=$u,t=Tr(),t!==et?(n=Xr(),n!==et?(e=kr(),e!==et?(u=Xr(),u!==et?(o=W(),o!==et?(i=Xr(),i!==et?(s=wr(),s!==et?(a=Xr(),a!==et?(c=v(),c!==et?(f=Xr(),f!==et?(l=Kr(),l!==et?(ro=r,t=sn(o,c),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function z(){var r,t,n,e,u,o,i,s,a,c,f,l,p,h,d,b;return r=$u,t=mr(),t!==et?(n=Xr(),n!==et?(e=kr(),e!==et?(u=Xr(),u!==et?(o=v(),o!==et?(i=Xr(),i!==et?(s=wr(),s!==et?(a=Xr(),a!==et?(c=v(),c!==et?(f=Xr(),f!==et?(l=$u,p=xr(),p!==et?(h=Xr(),h!==et?(d=v(),d!==et?(b=Xr(),b!==et?(p=[p,h,d,b],l=p):($u=l,l=et)):($u=l,l=et)):($u=l,l=et)):($u=l,l=et),l===et&&(l=null),l!==et?(p=Kr(),p!==et?(ro=r,t=an(o,c,l),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function G(){var r,t,n,e,u,o,i,s,a,c,f,l,p,h;return r=$u,t=Nr(),t!==et?(n=Xr(),n!==et?(e=kr(),e!==et?(u=Xr(),u!==et?(o=P(),o===et&&(o=null),o!==et?(i=Xr(),i!==et?(s=v(),s!==et?(a=Xr(),a!==et?(c=wr(),c!==et?(f=Xr(),f!==et?(l=v(),l!==et?(p=Xr(),p!==et?(h=Kr(),h!==et?(ro=r,t=cn(o,s,l),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=Nr(),t!==et?(n=Xr(),n!==et?(e=kr(),e!==et?(u=Xr(),u!==et?(o=P(),o===et&&(o=null),o!==et?(i=Xr(),i!==et?(s=v(),s!==et?(a=Xr(),a!==et?(c=Kr(),c!==et?(ro=r,t=fn(o,s),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)),r}function P(){var r;return r=Ir(),r===et&&(r=Sr())===et&&(r=Rr()),r}function Z(){var r,t,n,e,u,o,i,s,a,c,f,l;return r=$u,t=Fr(),t!==et?(n=Xr(),n!==et?(e=kr(),e!==et?(u=Xr(),u!==et?(o=v(),o!==et?(i=Xr(),i!==et?(s=dr(),s!==et?(a=Xr(),a!==et?(c=v(),c!==et?(f=Xr(),f!==et?(l=Kr(),l!==et?(ro=r,t=ln(o,c),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function j(){var r,t,n,e,u,o,i,s;return r=$u,t=Jr(),t!==et?(n=Xr(),n!==et?(e=kr(),e!==et?(u=Xr(),u!==et?(o=l(),o===et&&(o=null),o!==et?(i=Xr(),i!==et?(s=Kr(),s!==et?(ro=r,t=vn(t,o),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function W(){var r;return r=Mr(),r===et&&(r=Dr())===et&&(r=Hr())===et&&(r=Ur())===et&&(r=Br())===et&&(r=zr()),r}function Y(){var r;return r=Q(),r===et&&(r=ur())===et&&(r=q())===et&&(r=X())===et&&(r=K())===et&&(r=k()),r}function k(){var r,t,n,e;return r=$u,t=Or(),t!==et?(n=Xr(),n!==et?(e=J(),e!==et?(ro=r,t=pn(e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function K(){var r,t,n,e;return r=$u,t=_r(),t!==et?(n=Xr(),n!==et?(e=J(),e!==et?(ro=r,t=hn(e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function X(){var r,t;return r=$u,t=vr(),t!==et&&(ro=r,t=dn()),r=t}function q(){var r,t;return r=$u,t=pr(),t!==et&&(ro=r,t=bn()),r=t,r===et&&(r=$u,t=hr(),t!==et&&(ro=r,t=An()),r=t),r}function J(){var r;return r=Q(),r===et&&(r=U()),r}function Q(){var r,n,e,u,o;if(r=$u,39===t.charCodeAt($u)?(n=Cn,$u++):(n=et,0===uo&&a(gn)),n===et&&(t.substr($u,2)===yn?(n=yn,$u+=2):(n=et,0===uo&&a(En))),n!==et){for(e=[],u=$u,t.substr($u,2)===Ln?(o=Ln,$u+=2):(o=et,0===uo&&a(wn)),o!==et&&(ro=u,o=xn()),u=o,u===et&&(mn.test(t.charAt($u))?(u=t.charAt($u),$u++):(u=et,0===uo&&a(Tn)));u!==et;)e.push(u),u=$u,t.substr($u,2)===Ln?(o=Ln,$u+=2):(o=et,0===uo&&a(wn)),o!==et&&(ro=u,o=xn()),(u=o)===et&&(mn.test(t.charAt($u))?(u=t.charAt($u),$u++):(u=et,0===uo&&a(Tn)));e!==et?(39===t.charCodeAt($u)?(u=Cn,$u++):(u=et,0===uo&&a(gn)),u!==et?(ro=r,n=Nn(e),r=n):($u=r,r=et)):($u=r,r=et)}else $u=r,r=et;return r}function V(){var r;return r=$(),r===et&&(r=rr()),r}function $(){var r,t,n,e,u,o,i,s;if(r=$u,(t=Gr())!==et)if(Xr()!==et)if((n=v())!==et)if(Xr()!==et){for(e=[],u=nr();u!==et;)e.push(u),u=nr();e!==et?(u=Xr(),u!==et?(o=Pr(),o!==et?(ro=r,t=Fn(n,e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)}else $u=r,r=et;else $u=r,r=et;else $u=r,r=et;else $u=r,r=et;if(r===et)if(r=$u,(t=Gr())!==et)if(Xr()!==et)if((n=v())!==et)if(Xr()!==et){for(e=[],u=nr();u!==et;)e.push(u),u=nr();e!==et?(u=Xr(),u!==et?(o=er(),o!==et?(i=Xr(),i!==et?(s=Pr(),s!==et?(ro=r,t=On(n,e,o),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)}else $u=r,r=et;else $u=r,r=et;else $u=r,r=et;else $u=r,r=et;return r}function rr(){var r,t,n,e,u,o,i;if(r=$u,(t=Gr())!==et)if(Xr()!==et){for(n=[],e=tr();e!==et;)n.push(e),e=tr();n!==et?(e=Xr(),e!==et?(u=Pr(),u!==et?(ro=r,t=_n(n),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)}else $u=r,r=et;else $u=r,r=et;if(r===et)if(r=$u,(t=Gr())!==et)if(Xr()!==et){for(n=[],e=tr();e!==et;)n.push(e),e=tr();n!==et?(e=Xr(),e!==et?(u=er(),u!==et?(o=Xr(),o!==et?(i=Pr(),i!==et?(ro=r,t=In(n,u),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)}else $u=r,r=et;else $u=r,r=et;return r}function tr(){var r,t,n,e,u,o,i,s;return r=$u,t=Zr(),t!==et?(n=Xr(),n!==et?(e=v(),e!==et?(u=Xr(),u!==et?(o=jr(),o!==et?(i=Xr(),i!==et?(s=v(),s!==et?(ro=r,t=Sn(e,s),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function nr(){var r,t,n,e,u,o,i,s;return r=$u,t=Zr(),t!==et?(n=Xr(),n!==et?(e=v(),e!==et?(u=Xr(),u!==et?(o=jr(),o!==et?(i=Xr(),i!==et?(s=v(),s!==et?(ro=r,t=Sn(e,s),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function er(){var r,t,n,e;return r=$u,t=Wr(),t!==et?(n=Xr(),n!==et?(e=v(),e!==et?(ro=r,t=Rn(e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r}function ur(){var r,t,n,e;return r=$u,t=or(),t!==et?(n=$u,uo++,e=M(),uo--,e===et?n=void 0:($u=n,n=et),n!==et?(ro=r,t=Mn(t),r=t):($u=r,r=et)):($u=r,r=et),r}function or(){var r,t,n,e;return r=$u,t=ir(),t!==et?(n=sr(),n!==et?(e=ar(),e!==et?(ro=r,t=Dn(t,n,e),r=t):($u=r,r=et)):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=ir(),t!==et?(n=sr(),n!==et?(ro=r,t=Hn(t,n),r=t):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=ir(),t!==et?(n=ar(),n!==et?(ro=r,t=Un(t,n),r=t):($u=r,r=et)):($u=r,r=et),r===et&&(r=$u,t=ir(),t!==et&&(ro=r,t=Bn(t)),r=t))),r}function ir(){var r,n,e;return r=cr(),r===et&&(r=$u,45===t.charCodeAt($u)?(n=Gt,$u++):(n=et,0===uo&&a(Pt)),n===et&&(43===t.charCodeAt($u)?(n=Bt,$u++):(n=et,0===uo&&a(zt))),n!==et?(e=cr(),e!==et?(ro=r,n=zn(n,e),r=n):($u=r,r=et)):($u=r,r=et)),r}function sr(){var r,n,e;return r=$u,46===t.charCodeAt($u)?(n=Gn,$u++):(n=et,0===uo&&a(Pn)),n!==et?(e=cr(),e===et&&(e=null),e!==et?(ro=r,n=Zn(e),r=n):($u=r,r=et)):($u=r,r=et),r}function ar(){var r,t,n;return r=$u,t=lr(),t!==et?(n=cr(),n!==et?(ro=r,t=jn(t,n),r=t):($u=r,r=et)):($u=r,r=et),r}function cr(){var r,t,n;if(r=$u,t=[],(n=fr())!==et)for(;n!==et;)t.push(n),n=fr();else t=et;return t!==et&&(ro=r,t=Wn(t)),r=t}function fr(){var r;return Yn.test(t.charAt($u))?(r=t.charAt($u),$u++):(r=et,0===uo&&a(kn)),r}function lr(){var r,n,e;return r=$u,Kn.test(t.charAt($u))?(n=t.charAt($u),$u++):(n=et,0===uo&&a(Xn)),n!==et?(qn.test(t.charAt($u))?(e=t.charAt($u),$u++):(e=et,0===uo&&a(Jn)),e===et&&(e=null),e!==et?(ro=r,n=Qn(n,e),r=n):($u=r,r=et)):($u=r,r=et),r}function vr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===Vn?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a($n)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(n=[n,e],r=n):($u=r,r=et)):($u=r,r=et),r}function pr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===re?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(te)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(n=[n,e],r=n):($u=r,r=et)):($u=r,r=et),r}function hr(){var r,n,e,u;return r=$u,t.substr($u,5).toLowerCase()===ne?(n=t.substr($u,5),$u+=5):(n=et,0===uo&&a(ee)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(n=[n,e],r=n):($u=r,r=et)):($u=r,r=et),r}function dr(){var r,n,e,u;return r=$u,t.substr($u,2).toLowerCase()===ue?(n=t.substr($u,2),$u+=2):(n=et,0===uo&&a(oe)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=ie(),r=n):($u=r,r=et)):($u=r,r=et),r}function br(){var r,n,e,u;return r=$u,t.substr($u,2).toLowerCase()===se?(n=t.substr($u,2),$u+=2):(n=et,0===uo&&a(ae)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=ce(),r=n):($u=r,r=et)):($u=r,r=et),r}function Ar(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===fe?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(le)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=ve(),r=n):($u=r,r=et)):($u=r,r=et),r}function Cr(){var r,n,e,u;return r=$u,t.substr($u,6).toLowerCase()===pe?(n=t.substr($u,6),$u+=6):(n=et,0===uo&&a(he)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=de(),r=n):($u=r,r=et)):($u=r,r=et),r}function gr(){var r,n,e,u;return r=$u,t.substr($u,3).toLowerCase()===be?(n=t.substr($u,3),$u+=3):(n=et,0===uo&&a(Ae)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Ce(),r=n):($u=r,r=et)):($u=r,r=et),r}function yr(){var r,n,e,u;return r=$u,t.substr($u,3).toLowerCase()===ge?(n=t.substr($u,3),$u+=3):(n=et,0===uo&&a(ye)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Ee(),r=n):($u=r,r=et)):($u=r,r=et),r}function Er(){var r,n,e,u;return r=$u,t.substr($u,2).toLowerCase()===Le?(n=t.substr($u,2),$u+=2):(n=et,0===uo&&a(we)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=xe(),r=n):($u=r,r=et)):($u=r,r=et),r}function Lr(){var r,n,e,u;return r=$u,t.substr($u,7).toLowerCase()===me?(n=t.substr($u,7),$u+=7):(n=et,0===uo&&a(Te)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Ne(),r=n):($u=r,r=et)):($u=r,r=et),r}function wr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===Fe?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(Oe)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=_e(),r=n):($u=r,r=et)):($u=r,r=et),r}function xr(){var r,n,e,u;return r=$u,t.substr($u,3).toLowerCase()===Ie?(n=t.substr($u,3),$u+=3):(n=et,0===uo&&a(Se)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Re(),r=n):($u=r,r=et)):($u=r,r=et),r}function mr(){var r,n,e,u;return r=$u,t.substr($u,9).toLowerCase()===Me?(n=t.substr($u,9),$u+=9):(n=et,0===uo&&a(De)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=He(),r=n):($u=r,r=et)):($u=r,r=et),r}function Tr(){var r,n,e,u;return r=$u,t.substr($u,7).toLowerCase()===Ue?(n=t.substr($u,7),$u+=7):(n=et,0===uo&&a(Be)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=ze(),r=n):($u=r,r=et)):($u=r,r=et),r}function Nr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===Ge?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(Pe)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Ze(),r=n):($u=r,r=et)):($u=r,r=et),r}function Fr(){var r,n,e,u;return r=$u,t.substr($u,8).toLowerCase()===je?(n=t.substr($u,8),$u+=8):(n=et,0===uo&&a(We)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Ye(),r=n):($u=r,r=et)):($u=r,r=et),r}function Or(){var r,n,e,u;return r=$u,t.substr($u,9).toLowerCase()===ke?(n=t.substr($u,9),$u+=9):(n=et,0===uo&&a(Ke)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Xe(),r=n):($u=r,r=et)):($u=r,r=et),r}function _r(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===qe?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(Je)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Qe(),r=n):($u=r,r=et)):($u=r,r=et),r}function Ir(){var r,n,e,u;return r=$u,t.substr($u,7).toLowerCase()===Ve?(n=t.substr($u,7),$u+=7):(n=et,0===uo&&a($e)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=ru(),r=n):($u=r,r=et)):($u=r,r=et),r}function Sr(){var r,n,e,u;return r=$u,t.substr($u,8).toLowerCase()===tu?(n=t.substr($u,8),$u+=8):(n=et,0===uo&&a(nu)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=eu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Rr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===uu?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(ou)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=iu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Mr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===su?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(au)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=cu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Dr(){var r,n,e,u;return r=$u,t.substr($u,5).toLowerCase()===fu?(n=t.substr($u,5),$u+=5):(n=et,0===uo&&a(lu)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=vu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Hr(){var r,n,e,u;return r=$u,t.substr($u,3).toLowerCase()===pu?(n=t.substr($u,3),$u+=3):(n=et,0===uo&&a(hu)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=du(),r=n):($u=r,r=et)):($u=r,r=et),r}function Ur(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===bu?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(Au)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Cu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Br(){var r,n,e,u;return r=$u,t.substr($u,6).toLowerCase()===gu?(n=t.substr($u,6),$u+=6):(n=et,0===uo&&a(yu)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Eu(),r=n):($u=r,r=et)):($u=r,r=et),r}function zr(){var r,n,e,u;return r=$u,t.substr($u,6).toLowerCase()===Lu?(n=t.substr($u,6),$u+=6):(n=et,0===uo&&a(wu)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=xu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Gr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===mu?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(Tu)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Nu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Pr(){var r,n,e,u;return r=$u,t.substr($u,3).toLowerCase()===Fu?(n=t.substr($u,3),$u+=3):(n=et,0===uo&&a(Ou)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=_u(),r=n):($u=r,r=et)):($u=r,r=et),r}function Zr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===Iu?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(Su)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Ru(),r=n):($u=r,r=et)):($u=r,r=et),r}function jr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===Mu?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(Du)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=Hu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Wr(){var r,n,e,u;return r=$u,t.substr($u,4).toLowerCase()===Uu?(n=t.substr($u,4),$u+=4):(n=et,0===uo&&a(Bu)),n!==et?(e=$u,uo++,u=D(),uo--,u===et?e=void 0:($u=e,e=et),e!==et?(ro=r,n=zu(),r=n):($u=r,r=et)):($u=r,r=et),r}function Yr(){var r;return 44===t.charCodeAt($u)?(r=Gu,$u++):(r=et,0===uo&&a(Pu)),r}function kr(){var r;return 40===t.charCodeAt($u)?(r=Zu,$u++):(r=et,0===uo&&a(ju)),r}function Kr(){var r;return 41===t.charCodeAt($u)?(r=Wu,$u++):(r=et,0===uo&&a(Yu)),r}function Xr(){var r,t;for(r=[],t=qr();t!==et;)r.push(t),t=qr();return r}function qr(){var r;return ku.test(t.charAt($u))?(r=t.charAt($u),$u++):(r=et,0===uo&&a(Ku)),r}function Jr(){var r,n,e,u;if(r=$u,n=R(),n!==et&&(ro=r,n=qt(n)),(r=n)===et)if(r=$u,96===t.charCodeAt($u)?(n=Xu,$u++):(n=et,0===uo&&a(qu)),n!==et){if(e=[],Ju.test(t.charAt($u))?(u=t.charAt($u),$u++):(u=et,0===uo&&a(Qu)),u!==et)for(;u!==et;)e.push(u),Ju.test(t.charAt($u))?(u=t.charAt($u),$u++):(u=et,0===uo&&a(Qu));else e=et;e!==et?(96===t.charCodeAt($u)?(u=Xu,$u++):(u=et,0===uo&&a(qu)),u!==et?(ro=r,n=Vu(e),r=n):($u=r,r=et)):($u=r,r=et)}else $u=r,r=et;return r}function Qr(r,t){return{type:"unary_expr",operator:r,expr:t}}function Vr(r,t,n,e){var u={type:"binary_expr",operator:r,left:t,right:n};return void 0!==e&&(u.escape=e),u}function $r(r,t){for(var n=[r],e=0;e<t.length;e++)n.push(t[e][3]);return n}function rt(r,t,n){return $r(r,t)}function tt(r,t){for(var n=r,e=0;e<t.length;e++)n=Vr(t[e][1],n,t[e][3]);return n}n=void 0!==n?n:{};var nt,et={},ut={start:f},ot=f,it=function(r){return r},st=function(r,t){var n={type:"expr_list"},e=rt(r,t,n);return n.value=e,n},at=function(r,t){return tt(r,t)},ct="!",ft=e("!",!1),lt="=",vt=e("=",!1),pt=function(r){return Qr("NOT",r)},ht=function(r,t){if(""==t||void 0==t||null==t)return r;return"arithmetic"==t.type?tt(r,t.tail):Vr(t.op,r,t.right,t.escape)},dt=function(r){return{type:"arithmetic",tail:r}},bt=">=",At=e(">=",!1),Ct=">",gt=e(">",!1),yt="<=",Et=e("<=",!1),Lt="<>",wt=e("<>",!1),xt="<",mt=e("<",!1),Tt="!=",Nt=e("!=",!1),Ft=function(r,t){return{op:r+"NOT",right:t}},Ot=function(r,t){return{op:r,right:t}},_t=function(r,t,n){return{op:"NOT"+r,right:{type:"expr_list",value:[t,n]}}},It=function(r,t,n){return{op:r,right:{type:"expr_list",value:[t,n]}}},St=function(r){return r[0]+" "+r[2]},Rt=function(r,t,n){return{op:r,right:t,escape:n.value}},Mt=function(r,t){return{op:r,right:t,escape:""}},Dt=function(r,t){return{op:r,right:t}},Ht=function(r){return{op:r,right:{type:"expr_list",value:[]}}},Ut=function(r,t){return{op:r,right:t}},Bt="+",zt=e("+",!1),Gt="-",Pt=e("-",!1),Zt=function(r,t){return tt(r,t)},jt="*",Wt=e("*",!1),Yt="/",kt=e("/",!1),Kt=function(r){return r.paren=!0,r},Xt=function(r){return{type:"column_ref",table:"",column:r}},qt=function(r){return r},Jt=function(r,t){return r+t.join("")},Qt=/^[A-Za-z_\x80-\uFFFF]/,Vt=u([["A","Z"],["a","z"],"_",["","￿"]],!1,!1),$t=/^[A-Za-z0-9_]/,rn=u([["A","Z"],["a","z"],["0","9"],"_"],!1,!1),tn=/^[A-Za-z0-9_.\x80-\uFFFF]/,nn=u([["A","Z"],["a","z"],["0","9"],"_",".",["","￿"]],!1,!1),en="@",un=e("@",!1),on=function(r){return{type:"param",value:r[1]}},sn=function(r,t){return{type:"function",name:"extract",args:{type:"expr_list",value:[{type:"string",value:r},t]}}},an=function(r,t,n){return{type:"function",name:"substring",args:{type:"expr_list",value:n?[r,t,n[2]]:[r,t]}}},cn=function(r,t,n){return{type:"function",name:"trim",args:{type:"expr_list",value:[{type:"string",value:null==r?"BOTH":r},t,n]}}},fn=function(r,t){return{type:"function",name:"trim",args:{type:"expr_list",value:[{type:"string",value:null==r?"BOTH":r},t]}}},ln=function(r,t){return{type:"function",name:"position",args:{type:"expr_list",value:[r,t]}}},vn=function(r,t){return{type:"function",name:r,args:t||{type:"expr_list",value:[]}}},pn=function(r){return{type:"timestamp",value:r.value}},hn=function(r){return{type:"date",value:r.value}},dn=function(){return{type:"null",value:null}},bn=function(){return{type:"bool",value:!0}},An=function(){return{type:"bool",value:!1}},Cn="'",gn=e("'",!1),yn="N'",En=e("N'",!1),Ln="''",wn=e("''",!1),xn=function(){return"'"},mn=/^[^']/,Tn=u(["'"],!0,!1),Nn=function(r){return{type:"string",value:r.join("")}},Fn=function(r,t){return{type:"case_expression",format:"simple",operand:r,clauses:t,else:null}},On=function(r,t,n){return{type:"case_expression",format:"simple",operand:r,clauses:t,else:n.value}},_n=function(r){return{type:"case_expression",format:"searched",clauses:r,else:null}},In=function(r,t){return{type:"case_expression",format:"searched",clauses:r,else:t.value}},Sn=function(r,t){return{type:"when_clause",operand:r,value:t}},Rn=function(r){return{type:"else_clause",value:r}},Mn=function(r){return{type:"number",value:r}},Dn=function(r,t,n){return parseFloat(r+t+n)},Hn=function(r,t){return parseFloat(r+t)},Un=function(r,t){return parseFloat(r+t)},Bn=function(r){return parseFloat(r)},zn=function(r,t){return r[0]+t},Gn=".",Pn=e(".",!1),Zn=function(r){return"."+(null!=r?r:"")},jn=function(r,t){return r+t},Wn=function(r){return r.join("")},Yn=/^[0-9]/,kn=u([["0","9"]],!1,!1),Kn=/^[eE]/,Xn=u(["e","E"],!1,!1),qn=/^[+\-]/,Jn=u(["+","-"],!1,!1),Qn=function(r,t){return"e"+(null===t?"":t)},Vn="null",$n=e("NULL",!0),re="true",te=e("TRUE",!0),ne="false",ee=e("FALSE",!0),ue="in",oe=e("IN",!0),ie=function(){return"IN"},se="is",ae=e("IS",!0),ce=function(){return"IS"},fe="like",le=e("LIKE",!0),ve=function(){return"LIKE"},pe="escape",he=e("ESCAPE",!0),de=function(){return"ESCAPE"},be="not",Ae=e("NOT",!0),Ce=function(){return"NOT"},ge="and",ye=e("AND",!0),Ee=function(){return"AND"},Le="or",we=e("OR",!0),xe=function(){return"OR"},me="between",Te=e("BETWEEN",!0),Ne=function(){return"BETWEEN"},Fe="from",Oe=e("FROM",!0),_e=function(){return"FROM"},Ie="for",Se=e("FOR",!0),Re=function(){return"FOR"},Me="substring",De=e("SUBSTRING",!0),He=function(){return"SUBSTRING"},Ue="extract",Be=e("EXTRACT",!0),ze=function(){return"EXTRACT"},Ge="trim",Pe=e("TRIM",!0),Ze=function(){return"TRIM"},je="position",We=e("POSITION",!0),Ye=function(){return"POSITION"},ke="timestamp",Ke=e("TIMESTAMP",!0),Xe=function(){return"TIMESTAMP"},qe="date",Je=e("DATE",!0),Qe=function(){return"DATE"},Ve="leading",$e=e("LEADING",!0),ru=function(){return"LEADING"},tu="trailing",nu=e("TRAILING",!0),eu=function(){return"TRAILING"},uu="both",ou=e("BOTH",!0),iu=function(){return"BOTH"},su="year",au=e("YEAR",!0),cu=function(){return"YEAR"},fu="month",lu=e("MONTH",!0),vu=function(){return"MONTH"},pu="day",hu=e("DAY",!0),du=function(){return"DAY"},bu="hour",Au=e("HOUR",!0),Cu=function(){return"HOUR"},gu="minute",yu=e("MINUTE",!0),Eu=function(){return"MINUTE"},Lu="second",wu=e("SECOND",!0),xu=function(){return"SECOND"},mu="case",Tu=e("CASE",!0),Nu=function(){return"CASE"},Fu="end",Ou=e("END",!0),_u=function(){return"END"},Iu="when",Su=e("WHEN",!0),Ru=function(){return"WHEN"},Mu="then",Du=e("THEN",!0),Hu=function(){return"THEN"},Uu="else",Bu=e("ELSE",!0),zu=function(){return"ELSE"},Gu=",",Pu=e(",",!1),Zu="(",ju=e("(",!1),Wu=")",Yu=e(")",!1),ku=/^[ \t\n\r]/,Ku=u([" ","\t","\n","\r"],!1,!1),Xu="`",qu=e("`",!1),Ju=/^[^`]/,Qu=u(["`"],!0,!1),Vu=function(r){return r.join("")},$u=0,ro=0,to=[{line:1,column:1}],no=0,eo=[],uo=0;if("startRule"in n){if(!(n.startRule in ut))throw new Error("Can't start parsing from rule \""+n.startRule+'".');ot=ut[n.startRule]}if((nt=ot())!==et&&$u===t.length)return nt;throw nt!==et&&$u<t.length&&a(function(){return{type:"end"}}()),c(eo,no<t.length?t.charAt(no):null,no<t.length?s(no,no+1):s(no,no))}return function(r,t){function n(){this.constructor=r}n.prototype=t.prototype,r.prototype=new n}(r,Error),r.buildMessage=function(r,t){function n(r){return r.charCodeAt(0).toString(16).toUpperCase()}function e(r){return r.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(r){return"\\x0"+n(r)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(r){return"\\x"+n(r)})}function u(r){return r.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(r){return"\\x0"+n(r)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(r){return"\\x"+n(r)})}function o(r){return i[r.type](r)}var i={literal:function(r){return'"'+e(r.text)+'"'},class:function(r){var t,n="";for(t=0;t<r.parts.length;t++)n+=r.parts[t]instanceof Array?u(r.parts[t][0])+"-"+u(r.parts[t][1]):u(r.parts[t]);return"["+(r.inverted?"^":"")+n+"]"},any:function(r){return"any character"},end:function(r){return"end of input"},other:function(r){return r.description}};return"Expected "+function(r){var t,n,e=new Array(r.length);for(t=0;t<r.length;t++)e[t]=o(r[t]);if(e.sort(),e.length>0){for(t=1,n=1;t<e.length;t++)e[t-1]!==e[t]&&(e[n]=e[t],n++);e.length=n}switch(e.length){case 1:return e[0];case 2:return e[0]+" or "+e[1];default:return e.slice(0,-1).join(", ")+", or "+e[e.length-1]}}(r)+" but "+function(r){return r?'"'+e(r)+'"':"end of input"}(t)+" found."},{SyntaxError:r,parse:t}});