(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[373],{2566:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/DashboardPage",function(){return a(9069)}])},8830:(e,t,a)=>{"use strict";a.d(t,{j:()=>n});var s=a(6042),r=a(2990);let i=(0,s.Dk)().length?(0,s.Sx)():(0,s.Wp)({apiKey:"AIzaSyCZVBC-UagEIVwsILjkwMSBayTagbcnjUc",authDomain:"ragwebsummarizer.firebaseapp.com",projectId:"ragwebsummarizer",storageBucket:"ragwebsummarizer.firebasestorage.app",messagingSenderId:"429265243706",appId:"1:429265243706:web:aa70883af65b8f7579ef03",measurementId:"G-E5JNPYJQXP"}),n=(0,r.xI)(i)},9069:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>ee});var s,r=a(7876),i=a(4232);let n={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=d.p?d.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},p={},m=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+m(e[a]);return t}return e};function u(e){let t,a,s=this||{},r=e.call?e(s.p):e;return((e,t,a,s,r)=>{var i,n,u,h;let f=m(e),g=p[f]||(p[f]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(f));if(!p[g]){let t=f!==e?e:(e=>{let t,a,s=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(a=t[3].replace(c," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(c," ").trim();return s[0]})(e);p[g]=d(r?{["@keyframes "+g]:t}:t,a?"":"."+g)}let y=a&&p.g;return a&&(p.g=p[g]),i=p[g],n=t,u=s,(h=y)?n.data=n.data.replace(h,i):-1===n.data.indexOf(i)&&(n.data=u?i+n.data:n.data+i),g})(r.unshift?r.raw?(t=[].slice.call(arguments,1),a=s.p,r.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):r.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):r,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n})(s.target),s.g,s.o,s.k)}u.bind({g:1});let h,f,g,y=u.bind({k:1});function b(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let o=Object.assign({},i),l=o.className||r.className;a.p=Object.assign({theme:f&&f()},o),a.o=/go\d/.test(l),o.className=u.apply(a,s)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),g&&c[0]&&g(o),h(c,o)}return t?t(r):r}}var w=(e,t)=>"function"==typeof e?e(t):e,v=(()=>{let e=0;return()=>(++e).toString()})(),j=(()=>{let e;return()=>{if(void 0===e&&"u">typeof window){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),N="default",S=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return S(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},k=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},_={},E=(e,t=N)=>{_[t]=S(_[t]||C,e),k.forEach(([e,a])=>{e===t&&a(_[t])})},z=e=>Object.keys(_).forEach(t=>E(e,t)),D=(e=N)=>t=>{E(t,e)},$=e=>(t,a)=>{let s,r=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||v()}))(t,e,a);return D(r.toasterId||(s=r.id,Object.keys(_).find(e=>_[e].toasts.some(e=>e.id===s))))({type:2,toast:r}),r.id},A=(e,t)=>$("blank")(e,t);A.error=$("error"),A.success=$("success"),A.loading=$("loading"),A.custom=$("custom"),A.dismiss=(e,t)=>{let a={type:3,toastId:e};t?D(t)(a):z(a)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let a={type:4,toastId:e};t?D(t)(a):z(a)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,a)=>{let s=A.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?w(t.success,e):void 0;return r?A.success(r,{id:s,...a,...null==a?void 0:a.success}):A.dismiss(s),e}).catch(e=>{let r=t.error?w(t.error,e):void 0;r?A.error(r,{id:s,...a,...null==a?void 0:a.error}):A.dismiss(s)}),e};var I=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,O=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,P=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${O} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${P} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,L=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,R=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,q=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,F=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${q} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,B=b("div")`
  position: absolute;
`,H=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,M=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${J} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?i.createElement(M,null,t):t:"blank"===a?null:i.createElement(H,null,i.createElement(U,{...s}),"loading"!==a&&i.createElement(B,null,"error"===a?i.createElement(T,{...s}):i.createElement(F,{...s})))},Y=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,G=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;i.memo(({toast:e,position:t,style:a,children:s})=>{let r=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[s,r]=j()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${y(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=i.createElement(X,{toast:e}),o=i.createElement(G,{...e.ariaProps},w(e.message,e));return i.createElement(Y,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof s?s({icon:n,message:o}):i.createElement(i.Fragment,null,n,o))}),s=i.createElement,d.p=void 0,h=s,f=void 0,g=void 0,u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var K=a(1798),V=a(8830);let W="https://web-summarizer-using-langchain-groq.onrender.com";async function Z(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=null;V.j.currentUser&&(a=await V.j.currentUser.getIdToken());let s={"Content-Type":"application/json",...t.headers||{}};a&&(s.Authorization="Bearer ".concat(a));let r=await fetch("".concat(W).concat(e),{...t,headers:s}),i=await r.json().catch(()=>({}));if(!r.ok)throw Error(i.detail||"Request failed");return i}let Q={summarize:e=>Z("/summarize",{method:"POST",body:JSON.stringify(e)}),chat:e=>Z("/chat",{method:"POST",body:JSON.stringify(e)}),chatHistory:()=>Z("/chat/history"),uploadPdf:async(e,t,a)=>{let s=null;V.j.currentUser&&(s=await V.j.currentUser.getIdToken());let r=new FormData;r.append("file",e);let i="/upload-pdf?strategy=".concat(t,"&summary_length=").concat(a),n={};s&&(n.Authorization="Bearer ".concat(s));let o=await fetch("".concat(W).concat(i),{method:"POST",body:r,headers:n}),l=await o.json().catch(()=>({}));if(!o.ok)throw Error(l.detail||"Request failed");return l}};function ee(){let[e,t]=(0,i.useState)("url"),[a,s]=(0,i.useState)(null),[n,o]=(0,i.useState)(""),[l,c]=(0,i.useState)("stuff"),[d,p]=(0,i.useState)("medium"),[m,u]=(0,i.useState)(""),[h,f]=(0,i.useState)(""),[g,y]=(0,i.useState)(null),[b,w]=(0,i.useState)(""),[v,j]=(0,i.useState)([]),[N,S]=(0,i.useState)(!1),[k,C]=(0,i.useState)(!1),[_,E]=(0,i.useState)(!1),[z,D]=(0,i.useState)([]),[$,I]=(0,i.useState)("");async function O(){E(!0);try{let e=await Q.chatHistory();D(e.items||[])}catch(e){I(e.message)}finally{E(!1)}}async function P(){I(""),S(!0);try{let t,s=m?Number(m):d;"pdf"===e&&a?(t=await Q.uploadPdf(a,l,s),o(t.url)):t=await Q.summarize({url:n,strategy:l,summary_length:s}),f(t.summary||""),y(t),A.success(t.cached?"Loaded cached summary":"Summary generated")}catch(e){I(e.message),A.error(e.message||"Summarization failed")}finally{S(!1)}}async function T(){if(!b.trim())return;let e=b.trim();w("");let t=[...v,{role:"user",content:e}];j(t),C(!0),I("");try{let a=t.map(e=>"".concat(e.role,": ").concat(e.content)),s=await Q.chat({url:n,question:e,history:a});j(e=>[...e,{role:"assistant",content:s.answer}]),A.success("Answer ready"),O()}catch(e){I(e.message),A.error(e.message||"Chat failed")}finally{C(!1)}}return(0,i.useEffect)(()=>{O()},[]),(0,r.jsxs)("main",{className:"mx-auto max-w-6xl p-4 md:p-6",children:[(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsx)("h1",{className:"app-text text-3xl font-semibold",children:"Dashboard"}),(0,r.jsx)("p",{className:"app-muted text-sm",children:"Summarize and chat with web content using RAG."})]}),(0,r.jsxs)("section",{className:"glow-card space-y-3 p-4",children:[(0,r.jsxs)("div",{className:"flex gap-4 mb-1",children:[(0,r.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,r.jsx)("input",{type:"radio",checked:"url"===e,onChange:()=>t("url"),className:"accent-blue-500"}),(0,r.jsx)("span",{className:"app-muted text-sm font-medium",children:"Website URL"})]}),(0,r.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,r.jsx)("input",{type:"radio",checked:"pdf"===e,onChange:()=>t("pdf"),className:"accent-blue-500"}),(0,r.jsx)("span",{className:"app-muted text-sm font-medium",children:"PDF Document"})]})]}),"url"===e?(0,r.jsx)("input",{className:"app-input w-full rounded-lg px-3 py-2",type:"url",value:n,onChange:e=>o(e.target.value),placeholder:"https://example.com"}):(0,r.jsx)("input",{className:"app-input w-full rounded-lg px-3 py-2 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30",type:"file",accept:".pdf",onChange:e=>{e.target.files&&e.target.files.length>0&&s(e.target.files[0])}}),(0,r.jsxs)("div",{className:"grid gap-3 md:grid-cols-3",children:[(0,r.jsxs)("select",{className:"app-input rounded-lg px-3 py-2",value:l,onChange:e=>c(e.target.value),children:[(0,r.jsx)("option",{value:"stuff",children:"stuff"}),(0,r.jsx)("option",{value:"map_reduce",children:"map_reduce"}),(0,r.jsx)("option",{value:"refine",children:"refine"})]}),(0,r.jsxs)("select",{className:"app-input rounded-lg px-3 py-2",value:d,onChange:e=>p(e.target.value),disabled:!!m,children:[(0,r.jsx)("option",{value:"short",children:"short"}),(0,r.jsx)("option",{value:"medium",children:"medium"}),(0,r.jsx)("option",{value:"long",children:"long"})]}),(0,r.jsx)("button",{onClick:P,disabled:("url"===e?!n.trim():!a)||N,className:"neon-btn disabled:opacity-60",children:N?"Summarizing...":"Summarize"})]}),(0,r.jsx)("div",{className:"mt-1",children:(0,r.jsx)("input",{className:"app-input w-full rounded-lg px-3 py-2",type:"number",min:"80",max:"900",placeholder:"Optional custom summary length in words (80-900)",value:m,onChange:e=>u(e.target.value)})}),g&&(0,r.jsxs)("p",{className:"app-muted text-sm",children:["Strategy: ",g.strategy," | Length: ",g.summary_length," | Cached:"," ",g.cached?"Yes":"No"]}),N?(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("div",{className:"h-4 w-full animate-pulse rounded bg-white/10"}),(0,r.jsx)("div",{className:"h-4 w-5/6 animate-pulse rounded bg-white/10"}),(0,r.jsx)("div",{className:"h-4 w-4/6 animate-pulse rounded bg-white/10"})]}):h?(0,r.jsx)("pre",{className:"app-panel whitespace-pre-wrap rounded-lg p-3 text-sm app-text",children:h}):null]}),(0,r.jsxs)("section",{className:"glow-card mt-4 p-4",children:[(0,r.jsx)("h2",{className:"app-text text-lg font-semibold",children:"Chat with website"}),(0,r.jsx)("div",{className:"app-panel my-3 h-72 overflow-y-auto rounded-lg p-3",children:0===v.length?(0,r.jsx)("div",{className:"grid h-full place-items-center text-center",children:(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"mx-auto mb-3 text-4xl",children:"\uD83D\uDCAC"}),(0,r.jsx)("p",{className:"app-muted text-sm",children:"Ask a question about the URL content."})]})}):v.map((e,t)=>(0,r.jsxs)(K.P.div,{className:"mb-2",initial:{opacity:0,y:6},animate:{opacity:1,y:0},children:[(0,r.jsx)("p",{className:"app-muted text-xs uppercase tracking-wide",children:e.role}),(0,r.jsx)("p",{className:"app-text",children:e.content})]},t))}),(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsx)("input",{className:"app-input w-full rounded-lg px-3 py-2",value:b,onChange:e=>w(e.target.value),onKeyDown:e=>"Enter"===e.key&&T(),placeholder:"Ask something..."}),(0,r.jsx)("button",{onClick:T,disabled:!n.trim()||!b.trim()||k,className:"rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] disabled:opacity-60",children:k?"Sending...":"Send"})]})]}),(0,r.jsxs)("section",{className:"glow-card mt-4 p-4",children:[(0,r.jsxs)("div",{className:"mb-2 flex items-center justify-between",children:[(0,r.jsx)("h2",{className:"app-text text-lg font-semibold",children:"Recent chats"}),(0,r.jsx)("button",{onClick:O,className:"app-input rounded-md px-2 py-1 text-xs",children:"Refresh"})]}),_?(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("div",{className:"h-12 animate-pulse rounded bg-white/10"}),(0,r.jsx)("div",{className:"h-12 animate-pulse rounded bg-white/10"})]}):0===z.length?(0,r.jsx)("div",{className:"grid h-28 place-items-center rounded-lg border border-dashed border-white/15 app-muted",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"text-3xl",children:"\uD83D\uDDC2️"}),(0,r.jsx)("p",{className:"text-sm",children:"No chat history yet"})]})}):(0,r.jsx)("div",{className:"space-y-2",children:z.map((e,t)=>(0,r.jsxs)("div",{className:"app-panel rounded-lg p-3",children:[(0,r.jsx)("p",{className:"app-muted line-clamp-1 text-xs",children:e.url}),(0,r.jsx)("p",{className:"app-text line-clamp-1 text-sm",children:e.question})]},"".concat(e.created_at,"-").concat(t)))})]}),$&&(0,r.jsx)("p",{className:"mt-3 text-sm text-rose-400",children:$})]})}}},e=>{e.O(0,[102,696,636,593,792],()=>e(e.s=2566)),_N_E=e.O()}]);