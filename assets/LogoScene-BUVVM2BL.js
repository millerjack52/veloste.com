import{u as Pt,r as K,j as t,a as je,B as Se,R as c,H as Me,E as Te,L as it,b as ke,C as Re,O as _e}from"./r3f-McBo03gL.js";import{D as Ce,a2 as at,A as Ee}from"./three-CX2SFsO7.js";function $e(a){const{scene:n}=Pt("/models/vstar.glb");return K.useEffect(()=>{n.traverse(s=>{if(s.isMesh&&s.material){const l=s.material;l.color&&l.color.multiplyScalar(.6),"metalness"in l&&(l.metalness=.9),"roughness"in l&&(l.roughness=.18),l.envMapIntensity=1.05,l.normalScale&&l.normalScale.set(1,1)}})},[n]),t.jsx("primitive",{object:n,...a})}Pt.preload("/models/thiscouldbeit.glb");function Ne(a=0){const{viewport:n,camera:s}=je();return K.useCallback(()=>{const l=n.getCurrentViewport(s,[0,0,a]);return Math.max(l.width,l.height)/1.5},[n,s,a])}function Dt({side:a,p:n,baseScale:s=.1,pos:l={x:5,y:0,z:0},worldZOfGroup:f=1,deadZone:m=.15,easePower:j=1.5,curvePower:C=1.6,color:R="#ffffff"}){const k=u=>at.clamp((u-m)/(1-m),0,1),E=a==="right"?Math.max(0,n):Math.max(0,-n),$=k(E),M=Math.pow($,j),b=Ne(f)(),g=s*Math.pow(b/s,Math.pow(M,C)),p=a==="right"?-Math.abs(l.x):+Math.abs(l.x);return t.jsx(Se,{position:[p,l.y,l.z],follow:!0,children:t.jsxs("mesh",{scale:g,renderOrder:10,children:[t.jsx("circleGeometry",{args:[1,64]}),t.jsx("meshBasicMaterial",{color:R,transparent:!0,opacity:a==="left"?.55:1,depthTest:!1,depthWrite:!1,side:Ce,toneMapped:!1})]})})}function Le({p:a,groupWorldZ:n=1,deadZone:s=.15,left:l={x:6,y:.22,z:0},right:f={x:5.8,y:.22,z:0},color:m="#ffffff"}){return t.jsxs(t.Fragment,{children:[t.jsx(Dt,{side:"left",p:a,pos:l,worldZOfGroup:n,deadZone:s,color:"#e8e8e8"}),t.jsx(Dt,{side:"right",p:a,pos:f,worldZOfGroup:n,deadZone:s,color:m})]})}function Ae({opacity:a}){return t.jsx("div",{style:{position:"absolute",top:"max(16px, env(safe-area-inset-top))",left:"50%",transform:"translateX(-50%)",opacity:a,transition:"opacity 120ms linear",pointerEvents:a>.6?"auto":"none",zIndex:3},children:t.jsx("div",{className:"page-header-box",style:{width:"clamp(220px, 28vw, 520px)",aspectRatio:"5 / 1",borderRadius:14,overflow:"hidden",background:"transparent",boxShadow:"none",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx("img",{src:"/vstar.svg",alt:"Veloste",width:520,height:104,draggable:!1,style:{width:"100%",height:"100%",objectFit:"contain",display:"block"}})})})}function wt(a){return{position:"absolute",top:a.top,left:a.left,width:a.width,height:a.height,boxSizing:"border-box"}}const Ie=`
.about-artifact-root {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  contain: strict;
  border-radius: inherit;
}

/* --- Card 0: wireframe — positions come from measured DOM rects (inline styles) --- */
.about-artifact-a0-frameMeas {
  position: absolute;
  box-sizing: border-box;
  border: 2px dashed var(--ab-sc-m);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.5s ease 0.06s;
}
.about-artifact-root--active.about-artifact-root--a0 .about-artifact-a0-frameMeas { opacity: 0.95; }

.about-artifact-a0-blockMeas {
  position: absolute;
  box-sizing: border-box;
  border: 2px dashed var(--ab-sc-m);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.48s ease;
}
.about-artifact-root--active.about-artifact-root--a0 .about-artifact-a0-blockMeas { opacity: 0.88; }

.about-artifact-a0-spacer-ruleMeas {
  position: absolute;
  border-top: 1px dotted var(--ab-sc-m);
  opacity: 0;
  transition: opacity 0.4s ease 0.08s;
  pointer-events: none;
}
.about-artifact-root--active.about-artifact-root--a0 .about-artifact-a0-spacer-ruleMeas { opacity: 0.55; }

/* Card 0 — dimension lines (horizontal + vertical); box from inline style */
.about-artifact-a0-dim {
  position: absolute;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.about-artifact-root--active.about-artifact-root--a0 .about-artifact-a0-dim { opacity: 1; }
.about-artifact-a0-dim-w .about-artifact-a0-dim-line {
  position: absolute;
  left: 5px;
  right: 5px;
  top: 50%;
  height: 2px;
  margin-top: -1px;
  background: var(--ab-sc-m);
  border-radius: 1px;
}
.about-artifact-a0-dim-cap {
  position: absolute;
  top: 50%;
  width: 2px;
  height: 8px;
  margin-top: -4px;
  background: var(--ab-sc-m);
  border-radius: 1px;
}
.about-artifact-a0-dim-cap-l { left: 0; }
.about-artifact-a0-dim-cap-r { right: 0; }
.about-artifact-a0-dim-label {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  font-family: ui-monospace, "Cascadia Code", monospace;
  font-size: 8px;
  letter-spacing: 0.05em;
  text-transform: none;
  color: var(--ab-mg);
  white-space: nowrap;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.35);
}
.about-artifact-a0-dim-v .about-artifact-a0-dim-line {
  position: absolute;
  left: 50%;
  top: 5px;
  bottom: 5px;
  width: 2px;
  margin-left: -1px;
  background: var(--ab-sc-m);
  border-radius: 1px;
}
.about-artifact-a0-dim-cap-t {
  top: 0;
  left: 50%;
  width: 8px;
  height: 2px;
  margin-left: -4px;
  margin-top: 0;
}
.about-artifact-a0-dim-cap-b {
  bottom: 0;
  top: auto;
  left: 50%;
  width: 8px;
  height: 2px;
  margin-left: -4px;
}
.about-artifact-a0-dim-v .about-artifact-a0-dim-label {
  left: auto;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
}
.about-artifact-a0-dim-v .about-artifact-a0-dim-cap-t,
.about-artifact-a0-dim-v .about-artifact-a0-dim-cap-b {
  width: 8px;
  height: 2px;
  top: auto;
  margin-top: 0;
}
.about-artifact-a0-dim-v .about-artifact-a0-dim-cap-t {
  top: 0;
  left: 50%;
  margin-left: -4px;
}
.about-artifact-a0-dim-v .about-artifact-a0-dim-cap-b {
  bottom: 0;
  top: auto;
  left: 50%;
  margin-left: -4px;
}

/* Card 0 — crop marks (corners from measured inner frame) */
.about-artifact-a0-cropMeas {
  position: absolute;
  width: 10px;
  height: 10px;
  opacity: 0;
  transition: opacity 0.4s ease;
  border-color: var(--ab-sc-m);
  border-style: solid;
  pointer-events: none;
}
.about-artifact-root--active.about-artifact-root--a0 .about-artifact-a0-cropMeas { opacity: 0.95; }
.about-artifact-a0-cropMeas-tl { border-width: 2px 0 0 2px; transition-delay: 0.06s; }
.about-artifact-a0-cropMeas-tr { border-width: 2px 2px 0 0; transition-delay: 0.08s; }
.about-artifact-a0-cropMeas-bl { border-width: 0 0 2px 2px; transition-delay: 0.1s; }
.about-artifact-a0-cropMeas-br { border-width: 0 2px 2px 0; transition-delay: 0.12s; }

/* Card 0 — mono tags (position from measured rects) */
.about-artifact-a0-tagMeas {
  position: absolute;
  font-family: ui-monospace, "Cascadia Code", monospace;
  font-size: 8px;
  line-height: 1.25;
  letter-spacing: 0.03em;
  color: var(--ab-mg);
  opacity: 0;
  transition: opacity 0.42s ease;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
  pointer-events: none;
}
.about-artifact-root--active.about-artifact-root--a0 .about-artifact-a0-tagMeas { opacity: 1; }
.about-artifact-a0-spacer-hintMeas {
  position: absolute;
  font-family: ui-monospace, "Cascadia Code", monospace;
  font-size: 7px;
  letter-spacing: 0.04em;
  color: var(--ab-mg);
  opacity: 0;
  transition: opacity 0.38s ease 0.09s;
  pointer-events: none;
  white-space: nowrap;
}
.about-artifact-root--active.about-artifact-root--a0 .about-artifact-a0-spacer-hintMeas { opacity: 0.65; }

/* --- Card 1: baseline / guides --- */
.about-artifact-a1-lines {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 17px,
    var(--ab-sc) 17px,
    var(--ab-sc) 18px
  );
}
.about-artifact-root--active .about-artifact-a1-lines { opacity: 0.55; }
.about-artifact-a1-g {
  position: absolute;
  top: 9%;
  bottom: 12%;
  width: 1px;
  background: var(--ab-sc-m);
  opacity: 0;
  transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.about-artifact-a1-gl { left: 15%; transform: translate3d(-5px, 0, 0); }
.about-artifact-a1-gr { right: 15%; transform: translate3d(5px, 0, 0); }
.about-artifact-root--active .about-artifact-a1-g { opacity: 0.5; transform: translate3d(0, 0, 0); }

/* --- Card 2: depth / horizon --- */
.about-artifact-a2-h {
  position: absolute;
  left: 7%;
  right: 7%;
  top: 33%;
  border-top: 1px dashed var(--ab-sc-m);
  opacity: 0;
  transition: opacity 0.45s ease;
}
.about-artifact-root--active .about-artifact-a2-h { opacity: 0.65; }
.about-artifact-a2-c {
  position: absolute;
  width: 13px;
  height: 13px;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.about-artifact-a2-tl {
  top: 9px;
  left: 9px;
  border-left: 1px solid var(--ab-mg);
  border-top: 1px solid var(--ab-mg);
}
.about-artifact-a2-br {
  bottom: 9px;
  right: 9px;
  border-right: 1px solid var(--ab-mg);
  border-bottom: 1px solid var(--ab-mg);
}
.about-artifact-root--active .about-artifact-a2-c {
  opacity: 0.7;
  animation: about-artifact-float 5.5s ease-in-out infinite;
}
@keyframes about-artifact-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(1.5px, -1.5px, 0); }
}

/* --- Card 3: affordance residue --- */
.about-artifact-a3-ring {
  position: absolute;
  inset: 6px;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.35s ease, box-shadow 0.55s ease;
}
.about-artifact-root--active .about-artifact-a3-ring {
  opacity: 1;
  box-shadow:
    0 0 0 2px var(--ab-ring),
    0 0 0 1px var(--ab-ring-2);
}
.about-artifact-a3-line {
  position: absolute;
  left: 12%;
  right: 12%;
  top: 39%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--ab-mg), transparent);
  transform: scaleX(0);
  transform-origin: 50% 50%;
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.04s;
}
.about-artifact-root--active .about-artifact-a3-line { transform: scaleX(1); }

/* --- Card 4: handoff / rail --- */
.about-artifact-a4-rail {
  position: absolute;
  left: 0;
  top: 10%;
  bottom: 12%;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(
    180deg,
    var(--ab-mg) 0%,
    var(--ab-br) 38%,
    var(--ab-br2) 62%,
    var(--ab-mg) 100%
  );
  background-size: 100% 220%;
  background-position: 0 0;
  opacity: 0;
  transition: opacity 0.45s ease, background-position 0.85s ease;
}
.about-artifact-root--active .about-artifact-a4-rail {
  opacity: 0.8;
  background-position: 0 100%;
}
.about-artifact-a4-tick {
  position: absolute;
  left: 5px;
  width: 9px;
  height: 1px;
  background: var(--ab-sc-m);
  opacity: 0;
  transform: translate3d(-4px, 0, 0);
  transition: opacity 0.28s ease, transform 0.38s ease;
}
.about-artifact-a4-t0 { top: 21%; transition-delay: 0s; }
.about-artifact-a4-t1 { top: 49%; transition-delay: 0.07s; }
.about-artifact-a4-t2 { top: 77%; transition-delay: 0.14s; }
.about-artifact-root--active .about-artifact-a4-tick {
  opacity: 0.72;
  transform: translate3d(0, 0, 0);
}

/* Reduced motion: no loops; short transitions; settle states */
.about-artifact-root--rm .about-artifact-a2-c { animation: none !important; }
.about-artifact-root--rm,
.about-artifact-root--rm * {
  transition-duration: 0.01ms !important;
  transition-delay: 0s !important;
}
.about-artifact-root--rm.about-artifact-root--active .about-artifact-a3-line {
  transform: scaleX(0.88);
}
.about-artifact-root--rm.about-artifact-root--active .about-artifact-a1-g {
  transform: translate3d(0, 0, 0);
}
.about-artifact-root--rm.about-artifact-root--active .about-artifact-a4-tick {
  transform: translate3d(0, 0, 0);
}
.about-artifact-root--rm.about-artifact-root--active .about-artifact-a0-blockMeas {
  opacity: 0.78;
}
.about-artifact-root--rm.about-artifact-root--active .about-artifact-a0-tagMeas {
  opacity: 0.92;
}
.about-artifact-root--rm.about-artifact-root--active .about-artifact-a0-frameMeas {
  opacity: 0.88;
}
.about-artifact-root--rm.about-artifact-root--active .about-artifact-a0-cropMeas {
  opacity: 0.85;
}
`;function Fe({cardIndex:a,active:n,reducedMotion:s,panelRadius:l,scaffoldRgb:f,panelBorderRgb:m,caseMeta:j,wireLayout:C}){const[R,k,E]=m,$=a===0,M={borderRadius:l,...$?{"--ab-sc":`rgba(${f}, 0.08)`,"--ab-sc-m":`rgba(${f}, 0.58)`,"--ab-mg":"rgba(180, 0, 120, 0.78)"}:{"--ab-sc":`rgba(${f}, 0.1)`,"--ab-sc-m":`rgba(${f}, 0.22)`,"--ab-mg":"rgba(180, 0, 120, 0.2)"},"--ab-ring":`rgba(${f}, 0.26)`,"--ab-ring-2":"rgba(180, 0, 120, 0.12)","--ab-br":`rgba(${R},${k},${E},0.5)`,"--ab-br2":`rgba(${R},${k},${E},0.28)`},b=["about-artifact-root",$?"about-artifact-root--a0":"",n?"about-artifact-root--active":"",s?"about-artifact-root--rm":""].filter(Boolean).join(" "),g=j??{articleId:0,indexNum:"01",label:""},p=C,u=p?.inner;return t.jsxs("div",{className:b,style:M,"aria-hidden":!0,children:[a===0&&p&&u&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"about-artifact-a0-frameMeas",style:wt(u)}),t.jsx("div",{className:"about-artifact-a0-cropMeas about-artifact-a0-cropMeas-tl",style:{top:u.top,left:u.left}}),t.jsx("div",{className:"about-artifact-a0-cropMeas about-artifact-a0-cropMeas-tr",style:{top:u.top,left:u.left+u.width-10}}),t.jsx("div",{className:"about-artifact-a0-cropMeas about-artifact-a0-cropMeas-bl",style:{top:u.top+u.height-10,left:u.left}}),t.jsx("div",{className:"about-artifact-a0-cropMeas about-artifact-a0-cropMeas-br",style:{top:u.top+u.height-10,left:u.left+u.width-10}}),t.jsx("div",{className:"about-artifact-a0-blockMeas",style:wt(p.meta)}),t.jsx("div",{className:"about-artifact-a0-spacer-ruleMeas",style:{top:p.meta.top+p.meta.height,left:u.left,width:u.width}}),t.jsx("span",{className:"about-artifact-a0-spacer-hintMeas",style:{left:p.spacer.left+p.spacer.width/2,top:p.spacer.top+p.spacer.height/2,transform:"translate(-50%, -50%)"},children:"flex:1 · min 24px"}),t.jsx("div",{className:"about-artifact-a0-blockMeas",style:wt(p.copy)}),t.jsxs("div",{className:"about-artifact-a0-dim about-artifact-a0-dim-w",style:{top:p.paragraph.top+p.paragraph.height+6,left:p.paragraph.left,width:p.paragraph.width,height:14},children:[t.jsx("span",{className:"about-artifact-a0-dim-cap about-artifact-a0-dim-cap-l"}),t.jsx("span",{className:"about-artifact-a0-dim-line"}),t.jsx("span",{className:"about-artifact-a0-dim-cap about-artifact-a0-dim-cap-r"}),t.jsx("span",{className:"about-artifact-a0-dim-label",children:"50ch max · <p>"})]}),t.jsxs("div",{className:"about-artifact-a0-dim about-artifact-a0-dim-v",style:{top:p.copy.top,left:p.copy.left+p.copy.width-14,width:14,height:p.copy.height},children:[t.jsx("span",{className:"about-artifact-a0-dim-cap about-artifact-a0-dim-cap-t"}),t.jsx("span",{className:"about-artifact-a0-dim-line"}),t.jsx("span",{className:"about-artifact-a0-dim-cap about-artifact-a0-dim-cap-b"}),t.jsx("span",{className:"about-artifact-a0-dim-label",children:"h3 + p"})]}),t.jsx("span",{className:"about-artifact-a0-tagMeas",style:{top:u.top+2,left:u.left+4},children:"<article>"}),t.jsx("span",{className:"about-artifact-a0-tagMeas",style:{top:u.top+2,left:u.left+u.width-4,transform:"translateX(-100%)",textAlign:"right"},children:`#${g.articleId}`}),t.jsx("span",{className:"about-artifact-a0-tagMeas",style:{top:p.meta.top+3,left:p.meta.left+4,maxWidth:Math.max(0,p.meta.width-8)},children:g.label?`#${g.indexNum} · ${g.label}`:`#${g.indexNum}`}),t.jsx("span",{className:"about-artifact-a0-tagMeas",style:{top:p.copy.top+2,left:p.copy.left+4},children:"<h3> · title"}),t.jsx("span",{className:"about-artifact-a0-tagMeas",style:{top:p.paragraph.top+1,left:p.paragraph.left+3},children:"<p> · body"}),t.jsx("span",{className:"about-artifact-a0-tagMeas",style:{top:u.top+u.height-14,left:u.left+u.width-4,transform:"translateX(-100%)",textAlign:"right"},children:"</article>"})]}),a===1&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"about-artifact-a1-lines"}),t.jsx("div",{className:"about-artifact-a1-g about-artifact-a1-gl"}),t.jsx("div",{className:"about-artifact-a1-g about-artifact-a1-gr"})]}),a===2&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"about-artifact-a2-h"}),t.jsx("div",{className:"about-artifact-a2-c about-artifact-a2-tl"}),t.jsx("div",{className:"about-artifact-a2-c about-artifact-a2-br"})]}),a===3&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"about-artifact-a3-ring"}),t.jsx("div",{className:"about-artifact-a3-line"})]}),a===4&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"about-artifact-a4-rail"}),t.jsx("div",{className:"about-artifact-a4-tick about-artifact-a4-t0"}),t.jsx("div",{className:"about-artifact-a4-tick about-artifact-a4-t1"}),t.jsx("div",{className:"about-artifact-a4-tick about-artifact-a4-t2"})]})]})}const Bt=.09,ze="10vh 40px 12vh",De=900,He=24,Oe="0px",Pe=380,Be=32,We=36,qe=18,Ue=16,Ve=24,Wt=.43;function jt(a,n){const s=a.getBoundingClientRect(),l=n.getBoundingClientRect(),f=s.top+s.height*Wt,m=l.top+l.height/2,j=Math.round(a.scrollTop+(m-f)),C=Math.max(0,a.scrollHeight-a.clientHeight);return Math.max(0,Math.min(C,j))}function ct(a,n){if(n.length===0)return 0;let s=0,l=1/0;for(let f=0;f<n.length;f++){const m=Math.abs(n[f]-a);m<l&&(l=m,s=f)}return s}function Ye(a){return a<.5?16*Math.pow(a,5):1-Math.pow(-2*a+2,5)/2}function Ge(a){return(1-Math.pow(1-a,3))*.72+Ye(a)*.28}function Xe(a,n,s,l,f,m){const j=a.scrollTop;if(w("scroll_anim_start",{...m,start:j,target:n,delta:n-j,durationMs:s,reducedMotion:l}),l)return a.scrollTop=n,w("scroll_anim_done",{...m,mode:"instant",final:a.scrollTop}),f?.(),()=>{};const C=n-j;if(Math.abs(C)<.5)return w("scroll_anim_skip",{...m,reason:"delta_lt_0.5",final:a.scrollTop}),f?.(),()=>{};const R=performance.now();let k=0,E=!1;const $=M=>{if(E)return;const b=M-R,g=Math.min(1,b/s);a.scrollTop=j+C*Ge(g),g<1?k=requestAnimationFrame($):(a.scrollTop=n,w("scroll_anim_done",{...m,mode:"eased",final:a.scrollTop,elapsedMs:Math.round(M-R)}),f?.())};return k=requestAnimationFrame($),()=>{E||w("scroll_anim_cancel",{...m,at:a.scrollTop}),E=!0,cancelAnimationFrame(k)}}const qt=880,St=120,Ze=220;let Je=0;const et=[];let Z=!1;function Ut(){try{if(typeof window>"u")return!1;if(window.localStorage.getItem("veloste_about_debug")==="1")return!0;const a=new URLSearchParams(window.location.search);return a.has("aboutDebug")||a.get("aboutDebug")==="1"}catch{return!1}}function w(a,n={}){if(!Z)return;const s={id:++Je,t:Math.round(performance.now()*10)/10,wallIso:new Date().toISOString(),type:a,data:n};et.push(s),et.length>Ze&&et.shift(),console.log(`[Veloste About #${s.id}] ${a}`,n)}function Vt(){typeof window>"u"||(window.__VELABOUT__={version:1,get enabled(){return Z},setEnabled(a){Z=a;try{a?window.localStorage.setItem("veloste_about_debug","1"):window.localStorage.removeItem("veloste_about_debug")}catch{}w("debug_toggle",{on:a})},refresh(){Z=Ut(),w("debug_refresh",{on:Z})},getLog:()=>[...et],clearLog:()=>{et.length=0},dump:()=>JSON.stringify(et,null,2),constants:()=>({SECTION_SCROLL_DURATION_MS:qt,WHEEL_COOLDOWN_MS:St,SECTION_VIEWPORT_ALIGN_FROM_TOP:Wt,SMOOTH_ALPHA:Bt,SECTION_COUNT:I})})}Vt();function i(a,n,s){return a+(n-a)*s}function Mt(a){return Math.min(1,Math.max(0,a))}function Yt(a,n,s){const l=Mt((s-a)/Math.max(1e-6,n-a));return l*l*(3-2*l)}function V(a,n,s){return[Math.round(i(a[0],n[0],s)),Math.round(i(a[1],n[1],s)),Math.round(i(a[2],n[2],s))]}function Ke(a){return`rgb(${a[0]}, ${a[1]}, ${a[2]})`}function J(a,n){return`rgba(${a[0]}, ${a[1]}, ${a[2]}, ${n})`}function Qe(a,n=Yt(.32,.74,a)){const s=n,l={main:[10,10,12],body:[28,30,36],muted:[58,60,68],faint:[92,94,102]},f={main:[252,252,255],body:[228,230,238],muted:[168,170,182],faint:[130,132,145]};return{main:Ke(V(l.main,f.main,s)),body:J(V(l.body,f.body,s),i(.94,.9,s)),muted:J(V(l.muted,f.muted,s),i(.88,.78,s)),faint:J(V(l.faint,f.faint,s),i(.78,.62,s))}}const Tt=[{id:1,label:"Studio",title:"Veloste designs surfaces, not templates.",body:"We create graphic, motion-led web experiences that feel like crafted spaces. Every build starts from a visual and interaction system tailored to your brand, not a pre-existing theme."},{id:2,label:"Graphic Systems",title:"Art direction that shapes interaction.",body:"Type, grids, and composition come first. We use editorial thinking to decide how content flows, then layer motion and depth so the interface feels intentional rather than decorated."},{id:3,label:"Immersive Web",title:"3D as a wayfinding tool, not a gimmick.",body:"3D canvases explain products, spaces, and ideas in ways flat UI can't. We use subtle movement, parallax, and perspective to guide attention—always with performance budgets and fallbacks in mind."},{id:4,label:"Interactions",title:"Unique, but never unfamiliar.",body:"We lean on affordances—hover, motion cues, depth, and cursor feedback—to introduce new patterns without confusing people. The experience feels fresh, while still behaving like the web."},{id:5,label:"Partnership",title:"Built with product teams, not around them.",body:"We work as an embedded design–dev partner: aligning with your roadmap, collaborating with internal teams, and shipping surfaces that can be iterated on—not one-off experiments."}],I=1+Tt.length+1,Ht=Math.max(1,I-1),ta=[{q:"How much does a custom Veloste website cost?",a:"Pricing is project-specific and depends on scope, timeline, and interaction complexity. We provide a custom quote after discovery."},{q:"How long does a project usually take?",a:"Delivery timelines depend on scope, revisions, and technical requirements. We provide timeline estimates in your proposal."},{q:"Do you serve clients outside your home city?",a:"Yes. We support clients across Canada and the United States, with priority areas in Calgary, Edmonton, and Red Deer."},{q:"Do you offer web design in Calgary?",a:"Yes. Veloste is Calgary-based and provides web design and development for local businesses, with in-person collaboration when helpful. The same custom process applies for Edmonton, Red Deer, and remote clients across Canada and the US."},{q:"What services are included in a standard engagement?",a:"Most engagements include strategy, visual direction, interaction design, and implementation. Scope can also include 3D elements, content structure, and post-launch iteration."},{q:"Do you offer retainers after launch?",a:"Yes. Ongoing support arrangements are available for optimization, feature work, and design updates, based on your required scope."},{q:"What makes Veloste different from template-based studios?",a:"We design custom systems around your brand goals instead of starting from a prebuilt theme. That gives you clearer differentiation and more control over performance and maintainability."},{q:"Do you provide warranty or post-launch support?",a:"Yes. We provide free post-completion support for launch-related issues if anything unexpected appears after go-live."},{q:"How do we start a project?",a:"Send your goals, rough budget, and timeline through the contact form. We follow with a discovery call and then a scoped proposal."}];function ea({opacity:a,active:n}){const s=c.useRef(null),l=c.useRef(null),f=c.useRef(null),m=c.useRef(null),j=c.useRef([]),C=c.useRef(null),R=c.useRef(null),k=c.useRef(null),E=c.useRef(null),$=c.useRef(null),[M,b]=c.useState(null),g=c.useRef([]),p=c.useRef(!1),u=c.useRef(0),O=c.useRef(null),B=c.useRef(""),P=c.useRef({t:0,idx:-1,scrollTop:-1}),x=c.useRef(!1),y=c.useRef(0),N=c.useRef(0),v=c.useRef(null),W=c.useRef(()=>{}),ot=c.useRef(0),[lt,Q]=c.useState(0),[Gt,kt]=c.useState(0),[Xt,Zt]=c.useState(0),[rt,Jt]=c.useState(!1),[Rt,Kt]=c.useState(0),[_t,nt]=c.useState(0),ut=12,Y=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;c.useEffect(()=>{y.current=0,N.current=0,Y?(y.current=I-1,N.current=1,nt(1)):nt(0)},[Y]),c.useEffect(()=>{const r=()=>document.documentElement.style.setProperty("--vh",`${window.innerHeight*.01}px`);return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]),c.useEffect(()=>{Z=Ut(),Vt(),w("about_pane_mount",{aboutDebugEnabled:Z,hint:"After repro: copy(__VELABOUT__.dump()) in console"})},[]);const ft=c.useCallback(r=>{if(Y){y.current=I-1,N.current=1,nt(1);return}const o=g.current;if(o.length<I)return;const d=ct(r.scrollTop,o),h=Math.min(d,I-1);y.current=Math.max(y.current,h)},[Y]),Ct=c.useCallback(()=>{const r=s.current;if(!r||!f.current)return;const o=[];o.push(jt(r,f.current));for(let d=0;d<Tt.length;d++){const h=j.current[d];h&&o.push(jt(r,h))}m.current&&o.push(jt(r,m.current)),o.length===I&&(g.current=o)},[]),dt=c.useCallback(r=>{const o=s.current,d=g.current;if(!o||d.length<I){w("go_section_skip",{reason:o?"offsets_incomplete":"no_scroll_el",offLen:d.length,SECTION_COUNT:I});return}if(p.current){w("go_section_skip",{reason:"snap_lock",delta:r,scrollTop:o.scrollTop});return}const h=ct(o.scrollTop,d),S=Math.max(0,Math.min(I-1,h+r));if(S===h){w("go_section_skip",{reason:"same_section",idx:h,delta:r,scrollTop:o.scrollTop});return}O.current?.(),p.current=!0,w("go_section",{fromIdx:h,toIdx:S,delta:r,scrollTopBefore:o.scrollTop,targetScrollTop:d[S],gapPx:d[S]-o.scrollTop}),O.current=Xe(o,d[S],qt,Y,()=>{p.current=!1,u.current=performance.now()+St,O.current=null,w("wheel_cooldown_set",{ms:St,until:u.current})},{fromIdx:h,toIdx:S})},[Y]),mt=c.useCallback(()=>{if(Y||v.current!=null)return;const r=()=>{v.current=null;const o=y.current/Ht;let d=N.current;d+=(o-d)*Bt,Math.abs(d-o)<.002&&(d=o),N.current=d,nt(d),Math.abs(d-o)>.0015&&(v.current=requestAnimationFrame(r))};v.current=requestAnimationFrame(r)},[Y]),ht=c.useCallback(r=>{const o=g.current;if(o.length<I)return;const d=ct(r.scrollTop,o);d!==ot.current&&(ot.current=d,Q(d))},[]),X=c.useCallback(()=>{const r=s.current;if(!r)return;Jt(r.scrollHeight-r.clientHeight>2),l.current&&Zt(l.current.getBoundingClientRect().height),Ct();const o=g.current;if(o.length===I){const h=o.join(",");if(h!==B.current){B.current=h;const S=o.slice(1).map((_,L)=>Math.round(_-o[L]));w("offsets_changed",{offs:[...o],deltasPx:S,scrollH:r.scrollHeight,clientH:r.clientHeight})}}const d=Math.max(1,r.scrollHeight-r.clientHeight);kt(r.scrollTop/d),ft(r),mt(),ht(r)},[ft,Ct,mt,ht]);c.useEffect(()=>()=>{v.current!=null&&(cancelAnimationFrame(v.current),v.current=null),O.current?.(),O.current=null},[]),c.useEffect(()=>{n||(u.current=0,ot.current=0,Q(0))},[n]),c.useEffect(()=>{X();let r=null;return typeof ResizeObserver<"u"&&(r=new ResizeObserver(X),s.current&&r.observe(s.current),l.current&&r.observe(l.current)),window.addEventListener("resize",X),()=>{r&&r.disconnect(),window.removeEventListener("resize",X)}},[X]),c.useEffect(()=>{if(n&&!x.current&&s.current){s.current.scrollTo({top:0}),X();const r=y.current/Ht;N.current=r,nt(r)}x.current=n},[n,X]),c.useEffect(()=>{if(!n)return;const r=o=>{o.target?.closest("button, [href], input, textarea, select")||(o.key==="ArrowDown"||o.key==="PageDown"?(o.preventDefault(),w("key_step",{key:o.key,dir:1}),dt(1)):(o.key==="ArrowUp"||o.key==="PageUp")&&(o.preventDefault(),w("key_step",{key:o.key,dir:-1}),dt(-1)))};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[n,dt]);const Qt=r=>{const o=r.currentTarget,d=Math.max(1,o.scrollHeight-o.clientHeight);kt(o.scrollTop/d),ft(o),mt();const h=g.current;if(h.length===I){ht(o);const S=ct(o.scrollTop,h),_=h.map(we=>Math.round(Math.abs(o.scrollTop-we))),L=Math.min(..._),T=performance.now(),D=P.current,A=S!==D.idx,G=Math.abs(o.scrollTop-D.scrollTop)>8,tt=T-D.t>140;(A||G||tt)&&(P.current={t:T,idx:S,scrollTop:o.scrollTop},w("scroll_sample",{scrollTop:Math.round(o.scrollTop),nearestIdx:S,minDistToSnapPx:L,snapLock:p.current,progress:Math.round(o.scrollTop/d*1e3)/1e3,maxStage:y.current}))}};W.current=r=>{if(!n||!rt){w("wheel_ignore",{reason:n?"not_scrollable":"inactive"});return}const o=s.current,d=g.current;if(!o||d.length<I){w("wheel_ignore",{reason:o?"offsets_incomplete":"no_el",offLen:d.length});return}const h=performance.now(),S=u.current-h;if(h<u.current){w("wheel_cooldown_block",{cdLeftMs:Math.round(S),scrollTop:o.scrollTop}),r.preventDefault(),r.stopPropagation();return}const _=r.deltaY,L=r.deltaMode;let T=_;L===1?T*=16:L===2&&(T*=o.clientHeight||400);const D=ct(o.scrollTop,d),A=T>0?1:T<0?-1:0;if(A===0){w("wheel_ignore",{reason:"zero_step_dir",dyRaw:_,deltaMode:L});return}const G=Math.max(0,Math.min(I-1,D+A));if(G===D){if(D===0&&A<0||D===I-1&&A>0){w("wheel_pass_to_parent",{idx:D,stepDir:A,reason:"at_terminal_section",dyRaw:_,deltaMode:L,dyNorm:T});return}w("wheel_block_no_move",{idx:D,next:G,stepDir:A,dyRaw:_,deltaMode:L,dyNorm:T,scrollTop:o.scrollTop}),r.preventDefault(),r.stopPropagation();return}if(p.current){w("wheel_block_snap_lock",{idx:D,wouldNext:G,dyRaw:_,deltaMode:L,dyNorm:T,scrollTop:o.scrollTop}),r.preventDefault(),r.stopPropagation();return}w("wheel_commit_step",{idx:D,toIdx:G,stepDir:A,dyRaw:_,deltaMode:L,dyNorm:T,scrollTop:o.scrollTop}),r.preventDefault(),r.stopPropagation(),dt(A)},c.useEffect(()=>{const r=s.current;if(!r||!n||!rt)return;const o=d=>W.current(d);return r.addEventListener("wheel",o,{passive:!1,capture:!0}),()=>{r.removeEventListener("wheel",o,{capture:!0})}},[n,rt]);const te=()=>{window.dispatchEvent(new CustomEvent("veloste:setProgress",{detail:{p:1}}))},e=Math.pow(_t,.82),F=Yt(.32,.74,e),st="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",Et="'Georgia', 'Times New Roman', 'Times', serif",q="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",z="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, 'Courier New', monospace",H=Qe(e,F),U="0, 120, 212",ee=Mt(i(.5,0,e*1.35)),pt=Mt(i(.85,0,e*1.15)),bt=V([235,232,225],[14,14,16],F),ae=`rgba(${bt[0]}, ${bt[1]}, ${bt[2]}, ${i(.97,0,F)})`,oe=Oe,re=i(0,10,e),ne=`rgba(255, 252, 245, ${i(.5,0,e*.85)})`,$t=V([55,55,62],[200,200,210],F),Nt=`1px solid ${J($t,i(.4,.2,F))}`,se=e<.32?2:1,ie=e<.32?"dashed":"solid",Lt=V([55,58,68],[220,222,232],F),ce=J(Lt,i(.55,.22,F)),le=`${se}px ${ie} ${ce}`,gt=i(0,14,e),xt=V([252,249,242],[22,20,26],F),de=`rgba(${xt[0]}, ${xt[1]}, ${xt[2]}, ${i(.94,.98,F)})`,pe=H.main,ue=H.body,At=H.muted,It=e>.44,Ft=e<.28?st:e<.42?z:q,fe=e<.32?st:e<.48?Et:q,me={fontSize:i(10,11,e),letterSpacing:`${i(.02,.2,e)}em`,textTransform:e>.4?"uppercase":"none",color:H.muted,fontFamily:e<.4?z:q,marginBottom:12};c.useLayoutEffect(()=>{if(!n){b(null);return}const r=j.current[0],o=C.current,d=R.current,h=k.current,S=E.current,_=$.current;if(!r||!o||!d||!h||!S||!_){b(null);return}const L=()=>{const D=r.getBoundingClientRect(),A=G=>{const tt=G.getBoundingClientRect();return{top:tt.top-D.top,left:tt.left-D.left,width:tt.width,height:tt.height}};b({inner:A(o),meta:A(d),spacer:A(h),copy:A(S),paragraph:A(_)})};L();const T=new ResizeObserver(()=>{requestAnimationFrame(L)});return T.observe(r),T.observe(o),T.observe(d),T.observe(h),T.observe(S),T.observe(_),()=>T.disconnect()},[n,e,lt,_t]);const he=V([48,50,58],[210,212,222],F),zt=`${e<.3?2:1}px ${e<.3?"dashed":"solid"} ${J(he,i(.5,.18,F))}`,yt=V([255,255,255],[32,30,36],F),be=`rgba(${yt[0]}, ${yt[1]}, ${yt[2]}, ${i(.08,.045,F)})`,ge=H.main,vt=H.main,xe=H.body,ye=H.muted,ve=`repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 11px,
      rgba(${U}, 0.07) 11px,
      rgba(${U}, 0.07) 12px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 11px,
      rgba(180, 0, 120, 0.05) 11px,
      rgba(180, 0, 120, 0.05) 12px
    )`;return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
        .about-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .about-scroll::-webkit-scrollbar { width: 0; height: 0; }
        ${Ie}
      `}),t.jsxs("div",{style:{position:"relative",display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"#000",opacity:a,transition:"opacity 120ms linear",pointerEvents:n?"auto":"none",overflow:"hidden"},children:[t.jsx("div",{ref:s,className:"about-scroll",style:{flex:1,height:"100%",width:"100%",overflowY:n?"auto":"hidden",WebkitOverflowScrolling:n?"touch":"auto",overscrollBehavior:n?"auto":"contain",padding:ze,touchAction:n?"auto":"none",background:"#000"},onScroll:n?Qt:void 0,onTouchMoveCapture:r=>{if(!n||!rt)return;const o=s.current;if(!o)return;const{scrollTop:d,scrollHeight:h,clientHeight:S}=o,_=6,L=d<=_,T=d+S>=h-_;!L&&!T&&r.stopPropagation()},onPointerDownCapture:r=>{n&&r.stopPropagation()},children:t.jsxs("div",{style:{position:"relative",maxWidth:De,margin:"0 auto",width:"100%",background:ae,borderRadius:i(0,12,e),boxShadow:e>.55?"0 28px 80px rgba(0,0,0,0.35)":e<.22?`inset 0 0 0 1px rgba(${U}, 0.25)`:"0 12px 40px rgba(0,0,0,0.12)",transition:"background-color 0.45s ease, border-radius 0.45s ease, box-shadow 0.45s ease"},children:[t.jsx("div",{"aria-hidden":!0,style:{position:"absolute",inset:0,borderRadius:i(0,12,e),opacity:ee,backgroundImage:ve,pointerEvents:"none",transition:"opacity 0.5s ease"}}),t.jsxs("div",{style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:He,padding:oe,width:"100%"},children:[t.jsxs("header",{ref:f,style:{position:"relative",borderRadius:re,padding:"28px 32px 36px",marginLeft:0,marginRight:0,backgroundColor:ne,border:(e<.18,"none"),borderBottom:Nt,transition:"background-color 0.35s ease, border-color 0.35s ease, border-radius 0.35s ease",boxShadow:e>.55?"0 20px 50px rgba(0,0,0,0.2)":"none"},children:[t.jsx("span",{"aria-hidden":!0,style:{position:"absolute",top:i(4,8,e),right:i(6,10,e),fontSize:9,lineHeight:1.2,fontFamily:z,color:`rgba(${U}, 0.85)`,opacity:e>.48?0:pt,whiteSpace:"nowrap",pointerEvents:"none",transition:"opacity 0.35s ease"},children:e<.18?"<header>":e<.45?"header":""}),t.jsx("p",{style:{margin:0,marginBottom:10,fontSize:i(11,12,e),letterSpacing:`${i(0,.16,e)}em`,textTransform:e>.38?"uppercase":"none",color:H.muted,fontFamily:e<.38?z:q},children:"About"}),t.jsx("h1",{style:{margin:0,fontFamily:Ft,fontSize:`clamp(${18+e*12}px, ${2.4+e*2.6}vw, ${28+e*10}px)`,lineHeight:i(1.28,1.08,e),fontWeight:i(600,400,e),letterSpacing:`${i(0,.045,e)}em`,textTransform:e>.5?"uppercase":"none",color:H.main,transition:"color 0.35s ease, font-family 0.35s ease"},children:"Calgary web design & custom websites — graphic, motion-led experiences that turn attention into clarity — and clarity into conversion."}),t.jsx("p",{style:{margin:0,marginTop:16,maxWidth:"52ch",fontSize:i(14,16,e),lineHeight:i(1.55,1.65,e),fontFamily:fe,color:H.body},children:"Veloste is a Calgary web design studio working with clients across Canada and the US: website design, interaction systems, and implementation tailored in-house — custom systems, not templates."}),t.jsx("p",{style:{margin:0,marginTop:14,fontSize:i(10,11,e),letterSpacing:`${i(.06,.14,e)}em`,textTransform:"uppercase",color:H.faint,fontFamily:z},children:"Scroll or ↑↓ — one step per section"}),t.jsx("div",{"aria-hidden":!0,style:{marginTop:16,paddingTop:12,borderTop:`1px dashed ${J($t,i(.35,.28,F))}`}})]}),t.jsxs("section",{"aria-label":"What we do",style:{marginTop:4,position:"relative"},children:[t.jsx("span",{"aria-hidden":!0,style:{position:"absolute",left:0,top:i(-14,-18,e),fontSize:9,fontFamily:z,color:`rgba(${U}, 0.75)`,opacity:e>.5?0:pt,pointerEvents:"none",transition:"opacity 0.35s ease"},children:e<.2?'<section id="focus">':""}),t.jsx("h2",{style:{margin:0,marginBottom:18,fontSize:i(13,11,e),letterSpacing:`${i(.02,.2,e)}em`,textTransform:e>.35?"uppercase":"none",color:H.muted,fontFamily:e<.38?z:q,borderLeft:`${i(3,0,e)}px solid rgba(${U}, ${i(.55,0,e)})`,paddingLeft:i(8,0,e)},children:"Focus areas"}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:qe},children:Tt.map((r,o)=>{const d=String(o+1).padStart(2,"0"),h=i(10,0,e),S=lt===o+1;return t.jsxs("article",{ref:_=>{j.current[o]=_},style:{position:"relative",isolation:"isolate",minHeight:Pe,border:le,borderRadius:gt,background:de,padding:`${Be}px ${We}px`,display:"flex",flexDirection:"column",overflow:"hidden",transition:"border-color 0.45s ease, background 0.45s ease, border-radius 0.45s ease, border-width 0.45s ease, border-style 0.25s ease, box-shadow 0.45s ease",boxShadow:e>.55?"0 28px 70px rgba(0,0,0,0.45)":e<.25?"none":"0 12px 40px rgba(0,0,0,0.2)"},children:[t.jsx(Fe,{cardIndex:o,active:S,reducedMotion:Y,panelRadius:gt,scaffoldRgb:U,panelBorderRgb:Lt,caseMeta:{articleId:r.id,indexNum:d,label:r.label},wireLayout:o===0?M:null}),t.jsxs("div",{ref:o===0?C:void 0,style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",flex:1,minHeight:0,width:"100%"},children:[h>.5&&t.jsxs(t.Fragment,{children:[t.jsx("span",{"aria-hidden":!0,style:{position:"absolute",top:6,left:6,width:h,height:h,borderLeft:`1px solid rgba(${U},0.5)`,borderTop:`1px solid rgba(${U},0.5)`,pointerEvents:"none"}}),t.jsx("span",{"aria-hidden":!0,style:{position:"absolute",bottom:6,right:6,width:h,height:h,borderRight:"1px solid rgba(180,0,120,0.35)",borderBottom:"1px solid rgba(180,0,120,0.35)",pointerEvents:"none"}})]}),t.jsx("span",{"aria-hidden":!0,style:{position:"absolute",top:i(6,10,e),right:i(8,12,e),fontSize:8,fontFamily:z,color:`rgba(${U}, 0.7)`,opacity:e>.42?0:pt*.9,pointerEvents:"none"},children:e<.25?`<article #${r.id}>`:""}),t.jsxs("div",{ref:o===0?R:void 0,style:{display:"flex",flexDirection:e<.3?"column":"row",justifyContent:"space-between",alignItems:e<.3?"stretch":"flex-start",gap:Ue},children:[t.jsx("span",{style:{fontFamily:z,fontSize:e<.32?i(12,14,e/.32):i(38,52,e),lineHeight:e<.32?1.2:.85,color:At,fontWeight:e<.32?600:300,letterSpacing:e<.32?"0.02em":"-0.04em",order:e<.3?1:0},"aria-hidden":!0,children:e<.32?`${d}.`:d}),t.jsx("span",{style:{...me,color:At,alignSelf:e<.3?"flex-start":"flex-end",textAlign:e<.3?"left":"right",order:e<.3?0:1},children:r.label})]}),t.jsx("div",{ref:o===0?k:void 0,style:{flex:e<.35?0:1,minHeight:Ve}}),t.jsxs("div",{ref:o===0?E:void 0,style:{display:"flex",flexDirection:"column",justifyContent:"flex-end"},children:[t.jsx("h3",{style:{margin:0,fontFamily:Ft,fontSize:e<.32?"clamp(17px, 3.8vw, 22px)":e<.42?"clamp(20px, 4vw, 28px)":"clamp(24px, 4.5vw, 42px)",lineHeight:i(1.2,1.05,e),fontWeight:i(650,400,e),letterSpacing:It?"0.06em":`${i(.01,.02,e)}em`,textTransform:It?"uppercase":"none",color:pe,transition:"color 0.4s ease, font-family 0.35s ease, font-size 0.35s ease"},children:r.title}),t.jsx("p",{ref:o===0?$:void 0,style:{margin:0,marginTop:16,fontSize:i(14,15,e),lineHeight:i(1.55,1.65,e),fontFamily:e<.34?st:e<.48?Et:q,color:ue,maxWidth:"50ch"},children:r.body})]})]})]},r.id)})})]}),t.jsxs("section",{ref:m,style:{position:"relative",marginTop:12,borderTop:Nt,paddingTop:22,transition:"border-color 0.4s ease"},children:[t.jsx("span",{"aria-hidden":!0,style:{position:"absolute",left:0,top:i(-12,-16,e),fontSize:9,fontFamily:z,color:`rgba(${U}, 0.7)`,opacity:e>.55?0:pt*.85,pointerEvents:"none"},children:e<.22?'<section id="faq">':""}),t.jsx("h2",{style:{margin:0,marginBottom:16,fontSize:`clamp(${16+e*6}px, ${1.8+e*1.4}vw, ${22+e*6}px)`,textTransform:e>.48?"uppercase":"none",letterSpacing:`${i(.02,.08,e)}em`,color:ge,fontFamily:e<.4?z:q},children:"Frequently asked questions"}),t.jsxs("div",{style:{display:"grid",gap:12},children:[ta.map((r,o)=>t.jsxs("article",{style:{border:zt,borderRadius:gt,padding:"6px 12px",background:be,transition:"border-color 0.4s ease, border-radius 0.4s ease, background 0.4s ease"},children:[t.jsxs("button",{type:"button",onClick:()=>Kt(d=>d===o?null:o),style:{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:14,padding:"10px 4px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left",color:vt,fontFamily:e<.4?st:e>.48?q:z},children:[t.jsx("span",{style:{margin:0,fontSize:i(14,15,e),lineHeight:1.45,color:vt,fontWeight:e>.42?700:600},children:r.q}),t.jsx("span",{style:{fontSize:20,lineHeight:1,color:ye,transform:Rt===o?"rotate(45deg)":"rotate(0deg)",transition:"transform 180ms ease"},"aria-hidden":!0,children:"+"})]}),Rt===o&&t.jsx("p",{style:{margin:0,marginTop:2,marginBottom:8,padding:"0 4px 4px",fontSize:i(13,14,e),lineHeight:1.6,color:xe,fontFamily:e<.36?st:e>.48?q:z},children:r.a})]},r.q)),t.jsx("div",{children:t.jsx("article",{style:{marginTop:8,display:"grid",justifyItems:"center"},children:t.jsxs("div",{style:{display:"grid",justifyItems:"center",gap:10,textAlign:"center"},children:[t.jsx("img",{src:"/vstar.svg",alt:"Veloste logo",loading:"lazy",decoding:"async",style:{width:28,height:28,opacity:i(.72,.92,e),filter:F<.42?"brightness(0) opacity(0.78)":"none",transition:"filter 0.4s ease, opacity 0.4s ease"}}),t.jsxs("p",{style:{margin:0,color:H.faint,fontSize:12,letterSpacing:`${i(.06,.08,e)}em`,textTransform:"uppercase",fontFamily:e>.5?q:z},children:["© ",new Date().getFullYear()," Veloste. All rights reserved."]}),t.jsx("button",{type:"button",onClick:te,style:{border:zt,background:"transparent",color:vt,borderRadius:i(0,8,e),padding:"9px 16px",marginBottom:100,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",cursor:"pointer",fontFamily:e>.5?q:z,transition:"border-radius 0.4s ease, border-color 0.4s ease, color 0.4s ease"},children:"Contact"})]})})})]})]})]})]})}),rt&&t.jsx("div",{ref:l,style:{position:"absolute",top:"10vh",bottom:"8vh",right:6,width:2,background:"rgba(255,255,255,0.15)",borderRadius:2,pointerEvents:"none",opacity:n?1:0,transition:"opacity 160ms ease"},children:t.jsx("div",{style:{position:"absolute",top:Math.round(Gt*Math.max(0,Xt-ut)),left:-5,width:ut,height:ut,borderRadius:"50%",background:"#fff",boxShadow:"0 2px 6px rgba(0,0,0,0.4)"}})})]})]})}const Ot="https://veloste-mailer.vercel.app".replace(/\/+$/,"");function aa({opacity:a,stacked:n,active:s}){const[l,f]=c.useState(""),[m,j]=c.useState(""),[C,R]=c.useState(""),[k,E]=c.useState(!1),[$,M]=c.useState(!1),[b,g]=c.useState(""),[p,u]=c.useState(!1);async function O(x){x.preventDefault(),E(!0),g("");try{if(!Ot)throw new Error("VITE_API_BASE_URL is not defined (and no dev fallback).");const y=await fetch(`${Ot}/api/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l,email:m,message:C})});if(!y.ok){let N="Failed to send message";try{const v=await y.json();v?.error&&(N=v.error+(v?.hint?` ${v.hint}`:""))}catch{const v=await y.text().catch(()=>"");v&&(N=v)}throw new Error(N)}M(!0),f(""),j(""),R("")}catch(y){g(y?.message||"Failed to send message. Please try again.")}finally{E(!1)}}const B={boxSizing:"border-box",width:"100%",padding:"14px 16px",fontSize:14,borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#fff",outline:"none",transition:"border-color 160ms ease"},P={display:"block",marginBottom:6,fontSize:11,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.14em",color:"rgba(255,255,255,0.5)"};return t.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",opacity:a,transition:"opacity 120ms linear",pointerEvents:s?"auto":"none",touchAction:s?"auto":"none",padding:"10vh 40px 8vh"},children:t.jsxs("div",{style:{width:"100%",maxWidth:560},children:[t.jsx("h1",{style:{fontSize:"clamp(32px, 5vw, 52px)",textTransform:"uppercase",letterSpacing:"0.06em",lineHeight:1.05,color:"#fff",margin:0},children:"Get in touch"}),t.jsx("p",{style:{fontSize:15,lineHeight:1.65,color:"rgba(255,255,255,0.65)",marginTop:14,marginBottom:36,maxWidth:"44ch"},children:"Interested in exploring what Veloste can create for you? Send a message and we'll get back to you shortly."}),t.jsx("div",{style:{padding:"28px 28px 32px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12},children:$?t.jsx("div",{style:{fontSize:16,color:"rgba(255,255,255,0.85)",lineHeight:1.6,padding:"20px 0"},children:"Thanks! We'll get back to you shortly."}):t.jsxs("form",{onSubmit:O,style:{display:"grid",gap:20},children:[t.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:16},children:[t.jsxs("div",{style:{flex:"1 1 220px",minWidth:0},children:[t.jsx("label",{style:P,children:"Name"}),t.jsx("input",{type:"text",value:l,onChange:x=>f(x.target.value),required:!0,autoComplete:"name",placeholder:"Your name",style:B})]}),t.jsxs("div",{style:{flex:"1 1 220px",minWidth:0},children:[t.jsx("label",{style:P,children:"Email"}),t.jsx("input",{type:"email",value:m,onChange:x=>j(x.target.value),required:!0,autoComplete:"email",placeholder:"you@example.com",style:B})]})]}),t.jsxs("div",{children:[t.jsx("label",{style:P,children:"Message"}),t.jsx("textarea",{required:!0,value:C,onChange:x=>R(x.target.value),placeholder:"Tell us about your project...",rows:5,style:{...B,resize:"vertical"}})]}),b&&t.jsx("div",{style:{color:"#ff6b6b",fontSize:13,lineHeight:1.5},children:b}),t.jsx("button",{type:"submit",disabled:k,onMouseEnter:()=>u(!0),onMouseLeave:()=>u(!1),style:{alignSelf:"start",padding:"12px 28px",borderRadius:8,fontSize:13,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",background:p?"#fff":"rgba(255,255,255,0.1)",color:p?"#111":"#fff",border:"1px solid rgba(255,255,255,0.15)",cursor:k?"default":"pointer",opacity:k?.6:1,transition:"background 160ms ease, color 160ms ease, border-color 160ms ease"},children:k?"Sending...":"Send message"})]})})]})})}function oa(){K.useEffect(()=>{const a=()=>document.documentElement.style.setProperty("--vh",`${window.innerHeight*.01}px`);return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[])}function ra({p:a,deadZone:n=.15,easePower:s=1.5,curvePower:l=1.6}){oa();const f=W=>at.clamp((W-n)/(1-n),0,1),m=Math.max(0,a),j=Math.max(0,-a),C=Math.pow(f(m),s),R=Math.pow(f(j),s),k=Math.pow(C,l),E=Math.pow(R,l),$=(W,ot,lt)=>{const Q=at.clamp((lt-W)/Math.max(1e-6,ot-W),0,1);return Q*Q*(3-2*Q)},M=$(.75,.97,k),b=$(.75,.97,E),g=Math.max(b,M),p=.88,u=.72,O=.88,B=.72,[P,x]=c.useState(!1),[y,N]=c.useState(!1);c.useEffect(()=>{x(W=>W?b>u:b>p)},[b]),c.useEffect(()=>{N(W=>W?M>B:M>O)},[M]);const v=1-Math.min(1,Math.abs(a)/.15);return t.jsxs(Me,{fullscreen:!0,transform:!1,children:[t.jsx(Ae,{opacity:g}),v>0&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{style:{position:"absolute",left:28,top:"50%",transform:"translateY(-50%)",display:"flex",alignItems:"center",gap:8,opacity:v*.7,pointerEvents:"none",transition:"opacity 200ms ease"},children:[t.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",style:{opacity:.9},children:t.jsx("path",{d:"M11 4L6 9L11 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),t.jsx("span",{style:{fontSize:11,textTransform:"uppercase",letterSpacing:"0.16em",color:"#fff"},children:"About"})]}),t.jsxs("div",{style:{position:"absolute",right:28,top:"50%",transform:"translateY(-50%)",display:"flex",alignItems:"center",gap:8,opacity:v*.7,pointerEvents:"none",transition:"opacity 200ms ease"},children:[t.jsx("span",{style:{fontSize:11,textTransform:"uppercase",letterSpacing:"0.16em",color:"#fff"},children:"Contact"}),t.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",style:{opacity:.9},children:t.jsx("path",{d:"M7 4L12 9L7 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]}),b>0&&t.jsx("div",{style:{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"1fr",justifyItems:"center",pointerEvents:P?"auto":"none",overscrollBehavior:"contain",background:`rgba(0,0,0,${b*.92})`},children:t.jsx(ea,{opacity:b,active:P})}),M>0&&t.jsx("div",{style:{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"1fr",justifyItems:"center",pointerEvents:y?"auto":"none",overscrollBehavior:"contain",background:`rgba(0,0,0,${M*.92})`},children:t.jsx(aa,{opacity:M,active:y,stacked:!0})})]})}function na({boost:a=1}){return t.jsxs(t.Fragment,{children:[t.jsx("ambientLight",{intensity:.18*a}),t.jsx("hemisphereLight",{intensity:.25*a,color:"#ffffff",groundColor:"#1a1a1a"}),t.jsxs(Te,{background:!1,blur:.45,children:[t.jsx(it,{form:"rect",intensity:3.6*a,color:"#ffffff",scale:[7,3.5,1],position:[0,1.6,4.5],rotation:[-.15,0,0]}),t.jsx(it,{form:"rect",intensity:16*a,color:"#ffffff",scale:[2.2,.5,1],position:[0,.6,2.2],rotation:[-.05,0,0]}),t.jsx(it,{form:"rect",intensity:14*a,color:"#ffffff",scale:[7,2,1],position:[0,6,-2],rotation:[Math.PI/2.4,0,0]}),t.jsx(it,{form:"rect",intensity:5.5*a,color:"#ffffff",scale:[4,4,1],position:[-6,0,2],rotation:[0,Math.PI/3,0]}),t.jsx(it,{form:"rect",intensity:5.5*a,color:"#ffffff",scale:[4,4,1],position:[6,0,2],rotation:[0,-Math.PI/3,0]})]})]})}function sa({children:a,ticksToMax:n=24,notchSize:s=120,polarity:l=1,smooth:f=.85}){const m=K.useRef(0),[j,C]=K.useState(0),R=b=>at.clamp(b,-1,1),k=()=>m.current<=-1+1e-6,E=()=>m.current>=1-1e-6,$=b=>-(b/s)*l/n,M=b=>!(b>0&&E()||b<0&&k());return K.useEffect(()=>{const b=x=>{const y=x.deltaMode===1?16:x.deltaMode===2?window.innerHeight:1,N=x.deltaY*y,v=$(N);M(v)&&(x.preventDefault(),m.current=R(m.current+v))};let g=0,p=!1;const u=x=>{x.touches.length===1&&(p=!0,g=x.touches[0].clientY)},O=x=>{if(!p||x.touches.length!==1)return;const y=x.touches[0].clientY,N=g-y;g=y;const v=$(N);M(v)&&(x.preventDefault(),m.current=R(m.current+v))},B=()=>{p=!1};window.addEventListener("wheel",b,{passive:!1}),window.addEventListener("touchstart",u,{passive:!0}),window.addEventListener("touchmove",O,{passive:!1}),window.addEventListener("touchend",B,{passive:!0});const P=x=>{const y=x.detail;!y||typeof y.p!="number"||(m.current=R(y.p))};return window.addEventListener("veloste:setProgress",P),()=>{window.removeEventListener("wheel",b),window.removeEventListener("touchstart",u),window.removeEventListener("touchmove",O),window.removeEventListener("touchend",B),window.removeEventListener("veloste:setProgress",P)}},[n,s,l]),ke((b,g)=>{const p=1-Math.pow(f,g*60),u=at.lerp(j,m.current,p);u!==j&&C(u)}),t.jsx(t.Fragment,{children:a(j)})}const da=()=>{const n=at.degToRad(40);return t.jsxs("div",{className:"logo-wrap",children:[t.jsx("div",{className:"bg-text",children:"VELOSTE"}),t.jsxs(Re,{className:"logo-canvas",dpr:[1,Math.min(2,typeof window<"u"?window.devicePixelRatio:1)],gl:{alpha:!0,antialias:!0,powerPreference:"high-performance",toneMapping:Ee,toneMappingExposure:1},style:{background:"transparent",touchAction:"none"},camera:{position:[0,0,7],fov:80},children:[t.jsxs(K.Suspense,{fallback:null,children:[t.jsx(na,{}),t.jsx(sa,{ticksToMax:8,notchSize:60,polarity:1,smooth:.92,children:s=>t.jsxs("group",{position:[0,0,1],rotation:[0,s*n,0],children:[t.jsx($e,{rotation:[0,Math.PI*1.5,0]}),t.jsx(Le,{p:s,groupWorldZ:1,deadZone:.15}),t.jsx(ra,{p:s,deadZone:.15,easePower:1.5,curvePower:1.6})]})})]}),t.jsx(_e,{enablePan:!1,enableZoom:!1,enableRotate:!1})]})]})};export{da as default};
