import{j as t,u as O,b as se,C as re}from"./r3f-DO8Yqc_K.js";import{a as p,e as G,B as ae,R,E as ce,L as ie}from"./drei-D9WTBiCD.js";import{Z as q,a1 as C,a2 as le,f as ue,a3 as de,u as pe,X as fe}from"./three-Cz9meKTp.js";const ne=p.createContext(null);function me({smooth:e,children:n}){const o=p.useRef(0),a=p.useRef(0),r=p.useRef(0),i=p.useRef(0),d=p.useRef(1),c=p.useRef(0),u=p.useMemo(()=>({pRef:o,pTargetRef:a,pQueuedDeltaRef:r,smooth:e,sceneRefs:{glow:i,lightBoost:d,overlayBlur:c}}),[e]);return t.jsx(ne.Provider,{value:u,children:n})}function I(){const e=p.useContext(ne);if(!e)throw new Error("useScrollProgress must be used within ScrollProgressProvider");return e}const V=new q(1,1,1);function he({...e}){const{scene:n}=G("/models/vstar.glb"),{sceneRefs:o}=I(),a=p.useRef([]),r=p.useRef(-1);return p.useEffect(()=>{const i=[];n.traverse(d=>{if(d.isMesh&&d.material){const c=d.material;c.color&&c.color.multiplyScalar(.76),"metalness"in c&&(c.metalness=.9),"roughness"in c&&(c.roughness=.16),c.envMapIntensity=1.35,c.normalScale&&c.normalScale.set(1,1),c.emissive=new q("#ffffff"),c.emissiveIntensity=.03,c.userData.baseColor=c.color?.clone?.()??new q("#808080"),c.userData.baseMetalness=c.metalness,c.userData.baseRoughness=c.roughness,c.userData.baseEnvMapIntensity=c.envMapIntensity??1,c.userData.baseToneMapped=c.toneMapped,i.push(c)}}),a.current=i},[n]),O(()=>{const i=C.clamp(o.glow.current,0,1);if(Math.abs(i-r.current)<1e-4)return;r.current=i;const d=1+i*16,c=.03+i*72;for(const u of a.current){const s=u.userData.baseColor,m=u.userData.baseMetalness??.9,f=u.userData.baseRoughness??.18,v=u.userData.baseEnvMapIntensity??1.05,b=u.userData.baseToneMapped??!0;u.toneMapped=i>.02?!1:b,i>=.98?u.color.copy(V):s&&(u.color.copy(s).multiplyScalar(d),u.color.lerp(V,i)),u.emissive.setRGB(1,1,1),u.emissiveIntensity=c,u.metalness=C.clamp(m-i*.96,0,1),u.roughness=C.clamp(f-i*.28,.004,1),u.envMapIntensity=v+i*14}}),t.jsx("primitive",{object:n,...e})}G.preload("/models/thiscouldbeit.glb");function ge(e){const{scene:n}=G("/models/vstar.glb"),{sceneRefs:o}=I(),a=p.useRef(-1),{haloGroup:r,materials:i}=p.useMemo(()=>{const d=new le,c=n.clone(!0),u=[];return c.traverse(s=>{const m=s;if(!m.isMesh)return;const f=new ue({color:16777215,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1,blending:de});m.material=f,u.push(f)}),d.add(c),{haloGroup:d,materials:u}},[n]);return O(()=>{const d=C.clamp(o.glow.current,0,1);if(Math.abs(d-a.current)<.02&&d>0&&d<1)return;a.current=d;const c=1+d*.085;r.scale.setScalar(c),r.visible=d>.04;const u=d*.42;for(const s of i)s.opacity=u}),t.jsx("primitive",{object:r,rotation:e.rotation})}G.preload("/models/vstar.glb");const Q=.15,ve=1.5,xe=1.6;function X({side:e,pos:n,worldZOfGroup:o,color:a,baseOpacity:r}){const{pRef:i,sceneRefs:d}=I(),c=p.useRef(null),u=p.useRef(null),s=p.useRef(1),m=p.useRef(-1);O(({viewport:v,camera:b})=>{const h=i.current,g=d.overlayBlur.current;if(g>.92){c.current&&(c.current.visible=!1);return}const w=E=>C.clamp((E-Q)/(1-Q),0,1),l=e==="right"?Math.max(0,h):Math.max(0,-h),x=Math.pow(w(l),ve),S=Math.pow(x,xe);if(Math.abs(S-m.current)<.004&&c.current?.visible){u.current&&(u.current.opacity=r*(1-C.clamp(g,0,1)));return}m.current=S;const j=v.getCurrentViewport(b,[0,0,o]);s.current=Math.max(j.width,j.height)/1.5;const L=.1,T=L*Math.pow(s.current/L,S);c.current&&(c.current.visible=!0,c.current.scale.setScalar(T)),u.current&&(u.current.opacity=r*(1-C.clamp(g,0,1)))});const f=e==="right"?-Math.abs(n.x):+Math.abs(n.x);return t.jsx(ae,{position:[f,n.y,n.z],follow:!0,children:t.jsxs("mesh",{ref:c,scale:.1,renderOrder:10,children:[t.jsx("circleGeometry",{args:[1,32]}),t.jsx("meshBasicMaterial",{ref:u,color:a,transparent:!0,opacity:r,depthTest:!1,depthWrite:!1,side:pe,toneMapped:!1})]})})}function be({groupWorldZ:e=1}){return t.jsxs(t.Fragment,{children:[t.jsx(X,{side:"left",pos:{x:6,y:.22,z:0},worldZOfGroup:e,color:"#e8e8e8",baseOpacity:.55}),t.jsx(X,{side:"right",pos:{x:5.8,y:.22,z:0},worldZOfGroup:e,color:"#ffffff",baseOpacity:1})]})}const we="max(8vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",_=8,ye=1240,Z="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",Me="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",Re=[{id:"intro",title:"Calgary web developer for lead-generating websites.",body:"Veloste is a Calgary web developer and design studio building custom websites, motion-led interfaces, and immersive 3D experiences for businesses across Canada and the United States."},{id:"services",title:"Custom websites built to convert.",body:"For teams that need more than a theme: clean structure, conversion-focused UX, strong visual systems, and code your team can iterate with confidence."},{id:"work",title:"Built for teams that need clarity and momentum.",body:"Veloste works with Calgary small businesses and founder-led teams — local service businesses that need qualified leads, teams replacing dated websites that do not explain value clearly, and businesses launching new offers that need a conversion-ready web presence quickly."},{id:"team",title:"Discovery through launch, with clear scope.",body:"Every project starts with discovery: goals, audience, constraints, and conversion path. From there we shape structure and art direction, build with responsive QA and performance tuning, then support launch and post-launch iteration. Calgary-first delivery, with support across Airdrie, Cochrane, Okotoks, and Chestermere."}],Se=["Brand-led website design and development","Interaction and motion system design","Immersive 3D web experiences"];function Ce({active:e}){const n=R.useRef(null),o=R.useRef(null),a=R.useRef(!1),[r,i]=R.useState(!1),[d,c]=R.useState(!1);R.useEffect(()=>{const s=window.matchMedia("(prefers-reduced-motion: reduce)");c(s.matches);const m=()=>c(s.matches);return s.addEventListener("change",m),()=>s.removeEventListener("change",m)},[]);const u=R.useCallback(()=>{const s=n.current;s&&i(s.scrollHeight-s.clientHeight>2)},[]);return p.useLayoutEffect(()=>{e&&u()},[e,u]),R.useEffect(()=>{u();let s=null;return typeof ResizeObserver<"u"&&(s=new ResizeObserver(u),n.current&&s.observe(n.current)),window.addEventListener("resize",u),()=>{s?.disconnect(),window.removeEventListener("resize",u)}},[u]),R.useEffect(()=>{const s=n.current;e&&!a.current&&s&&(s.scrollTo({top:0,behavior:"auto"}),u()),a.current=e},[e,u]),t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
        .about-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.24) transparent;
          scroll-snap-type: y proximity;
        }
        .about-scroll::-webkit-scrollbar { width: 6px; }
        .about-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.22);
          border-radius: 999px;
        }
        .about-shell {
          width: min(100%, ${ye}px);
          margin: 0 auto;
          display: grid;
          gap: 22vh;
          padding-bottom: 18vh;
          color: #fff;
        }
        .about-block {
          min-height: min(84vh, 920px);
          scroll-snap-align: start;
          display: grid;
          grid-template-columns: minmax(74px, 11vw) minmax(0, 1fr);
          gap: clamp(14px, 2vw, 32px);
          align-items: start;
        }
        .about-title {
          margin: 0;
          font-family: ${Z};
          font-size: clamp(42px, 10vw, 136px);
          line-height: 0.9;
          letter-spacing: 0.01em;
          color: #fff;
          max-width: 12ch;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-body {
          margin: 0;
          margin-top: clamp(14px, 2.2vw, 26px);
          font-family: ${Me};
          font-size: clamp(15px, 1.7vw, 22px);
          line-height: 1.6;
          color: #fff;
          max-width: 58ch;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-services {
          margin: clamp(20px, 3vw, 34px) 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: clamp(8px, 1.4vw, 16px);
        }
        .about-services li {
          font-family: ${Z};
          font-size: clamp(34px, 6.7vw, 92px);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: #fff;
          text-transform: none;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-services li:first-child {
          color: #fff;
        }
        .about-reveal {
          animation: about-reveal-in 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes about-reveal-in {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 900px) {
          .about-shell {
            gap: 12vh;
          }
          .about-block {
            min-height: 72vh;
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-scroll {
            scroll-behavior: auto;
          }
          .about-reveal {
            animation: none;
          }
        }
      `}),t.jsx("div",{style:{position:"relative",display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"transparent",color:"#fff",pointerEvents:e?"auto":"none",overflow:"hidden"},children:t.jsxs("div",{ref:n,className:"about-scroll",style:{flex:1,height:"100%",width:"100%",overflowY:e?"auto":"hidden",WebkitOverflowScrolling:e?"touch":"auto",overscrollBehavior:e?"contain":"auto",touchAction:e?"auto":"none",padding:we},onWheel:s=>{if(!e)return;const m=n.current;if(!m)return;const{scrollTop:f,scrollHeight:v,clientHeight:b}=m,h=f<=_,g=f+b>=v-_;h&&s.deltaY<0||g&&s.deltaY>0||s.stopPropagation()},onTouchStart:s=>{!e||s.touches.length!==1||(o.current=s.touches[0].clientY)},onTouchEnd:()=>{o.current=null},onTouchMoveCapture:s=>{if(!e||!r||s.touches.length!==1)return;const m=s.touches[0].clientY,f=o.current;if(f===null)return;const v=f-m;o.current=m;const b=n.current;if(!b)return;const{scrollTop:h,scrollHeight:g,clientHeight:w}=b,l=h<=_,x=h+w>=g-_;l&&v<0||x&&v>0||s.stopPropagation()},onPointerDownCapture:s=>{e&&s.stopPropagation()},children:[t.jsx("div",{className:"about-shell",children:Re.map((s,m)=>t.jsx("section",{className:"about-block about-reveal",style:{animationDelay:d?"0ms":`${m*70}ms`},"aria-label":s.title,children:t.jsxs("div",{children:[t.jsx("h1",{className:"about-title",children:s.title}),t.jsx("p",{className:"about-body",children:s.body}),s.id==="services"&&t.jsx("ul",{className:"about-services","aria-label":"Veloste services",children:Se.map(f=>t.jsx("li",{children:f},f))})]})},s.id))}),t.jsxs("nav",{className:"seo-links-hidden","aria-label":"SEO navigation links",children:[t.jsx("a",{href:"/web-developer-calgary/",children:"Calgary web developer services"}),t.jsx("a",{href:"/service-areas/calgary-region/",children:"Calgary-region coverage"}),t.jsx("a",{href:"mailto:contact@veloste.com",children:"Get a scoped quote"})]})]})})]})}const je="max(8vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",Te=1240,J="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",z="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",Ee="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace",K="https://veloste-mailer.vercel.app".replace(/\/+$/,"");function Pe({active:e}){const[n,o]=R.useState(""),[a,r]=R.useState(""),[i,d]=R.useState(""),[c,u]=R.useState(!1),[s,m]=R.useState(!1),[f,v]=R.useState("");async function b(h){h.preventDefault(),u(!0),v("");try{if(!K)throw new Error("VITE_API_BASE_URL is not defined (and no dev fallback).");const g=await fetch(`${K}/api/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,email:a,message:i})});if(!g.ok){let w="Failed to send message";try{const l=await g.json();l?.error&&(w=l.error+(l?.hint?` ${l.hint}`:""))}catch{const l=await g.text().catch(()=>"");l&&(w=l)}throw new Error(w)}m(!0),o(""),r(""),d("")}catch(g){v(g instanceof Error?g.message:"Failed to send message. Please try again.")}finally{u(!1)}}return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
        .contact-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.24) transparent;
        }
        .contact-scroll::-webkit-scrollbar { width: 6px; }
        .contact-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.22);
          border-radius: 999px;
        }
        .contact-shell {
          width: min(100%, ${Te}px);
          margin: 0 auto;
          padding-bottom: 18vh;
          color: #fff;
        }
        .contact-block {
          min-height: min(84vh, 920px);
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(14px, 2vw, 32px);
          align-items: start;
        }
        .contact-title {
          margin: 0;
          font-family: ${J};
          font-size: clamp(42px, 10vw, 136px);
          line-height: 0.9;
          letter-spacing: 0.01em;
          color: #fff;
          max-width: 12ch;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .contact-body,
        .contact-meta {
          margin: 0;
          margin-top: clamp(14px, 2.2vw, 26px);
          font-family: ${z};
          font-size: clamp(15px, 1.7vw, 22px);
          line-height: 1.6;
          color: #fff;
          max-width: 58ch;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .contact-meta {
          margin-top: clamp(10px, 1.4vw, 18px);
          font-size: clamp(14px, 1.4vw, 18px);
        }
        .contact-meta a {
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .contact-form {
          margin-top: clamp(28px, 4vw, 48px);
          display: grid;
          gap: clamp(22px, 3vw, 32px);
          max-width: 58ch;
        }
        .contact-fields-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: clamp(18px, 2.5vw, 28px);
        }
        .contact-field-wrap {
          display: grid;
          gap: 10px;
        }
        .contact-label {
          margin: 0;
          font-family: ${Ee};
          font-size: clamp(10px, 0.9vw, 12px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .contact-field {
          box-sizing: border-box;
          width: 100%;
          padding: 12px 0 10px;
          font-size: 16px;
          line-height: 1.45;
          font-family: ${z};
          color: #fff;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.32);
          border-radius: 0;
          outline: none;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
          transition: border-color 160ms ease;
        }
        .contact-field::placeholder {
          color: rgba(255, 255, 255, 0.42);
        }
        .contact-field:hover:not(:disabled) {
          border-bottom-color: rgba(255, 255, 255, 0.52);
        }
        .contact-field:focus,
        .contact-field:focus-visible {
          border-bottom-color: rgba(255, 255, 255, 0.88);
        }
        .contact-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .contact-error {
          margin: 0;
          padding: 12px 0;
          font-family: ${z};
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.5;
          color: #ffb4a8;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .contact-submit {
          justify-self: start;
          margin-top: 4px;
          padding: 0;
          border: none;
          background: transparent;
          font-family: ${J};
          font-size: clamp(28px, 5vw, 52px);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: #fff;
          cursor: pointer;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
          transition: opacity 160ms ease;
        }
        .contact-submit:hover:not(:disabled) {
          opacity: 0.72;
        }
        .contact-submit:disabled {
          opacity: 0.45;
          cursor: default;
        }
        .contact-submit:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.55);
          outline-offset: 4px;
        }
        .contact-success {
          margin: clamp(28px, 4vw, 48px) 0 0;
          max-width: 58ch;
          font-family: ${z};
          font-size: clamp(15px, 1.7vw, 22px);
          line-height: 1.6;
          color: #fff;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        @media (max-width: 900px) {
          .contact-block {
            min-height: 72vh;
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-scroll {
            scroll-behavior: auto;
          }
        }
      `}),t.jsx("div",{className:"contact-scroll",style:{display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"transparent",color:"#fff",pointerEvents:e?"auto":"none",overflowY:e?"auto":"hidden",WebkitOverflowScrolling:e?"touch":"auto",overscrollBehavior:e?"contain":"auto",touchAction:e?"auto":"none",padding:je,boxSizing:"border-box"},children:t.jsx("div",{className:"contact-shell",children:t.jsx("section",{className:"contact-block","aria-label":"05 Contact",children:t.jsxs("div",{children:[t.jsx("h1",{className:"contact-title",children:"Get a scoped quote."}),t.jsx("p",{className:"contact-body",children:"Share your business type, timeline, and budget range. We'll reply with a recommended scope and next steps."}),t.jsxs("p",{className:"contact-meta",children:["Calgary-based, serving Airdrie, Cochrane, Okotoks, and Chestermere. Email"," ",t.jsx("a",{href:"mailto:contact@veloste.com",children:"contact@veloste.com"})," or call ",t.jsx("a",{href:"tel:+18255214542",children:"(825) 521-4542"}),"."]}),s?t.jsx("p",{className:"contact-success",children:"Thanks — we'll get back to you shortly."}):t.jsxs("form",{className:"contact-form",onSubmit:b,noValidate:!0,children:[t.jsxs("div",{className:"contact-fields-row",children:[t.jsxs("div",{className:"contact-field-wrap",children:[t.jsx("label",{htmlFor:"contact-name",className:"contact-label",children:"Name"}),t.jsx("input",{id:"contact-name",className:"contact-field",type:"text",value:n,onChange:h=>o(h.target.value),required:!0,autoComplete:"name",placeholder:"Your name"})]}),t.jsxs("div",{className:"contact-field-wrap",children:[t.jsx("label",{htmlFor:"contact-email",className:"contact-label",children:"Email"}),t.jsx("input",{id:"contact-email",className:"contact-field",type:"email",value:a,onChange:h=>r(h.target.value),required:!0,autoComplete:"email",placeholder:"you@example.com"})]})]}),t.jsxs("div",{className:"contact-field-wrap",children:[t.jsx("label",{htmlFor:"contact-message",className:"contact-label",children:"Message"}),t.jsx("textarea",{id:"contact-message",className:"contact-field contact-textarea",required:!0,value:i,onChange:h=>d(h.target.value),placeholder:"Tell us about your project, timeline, and goals…",rows:5})]}),f&&t.jsx("p",{className:"contact-error",role:"alert","aria-live":"polite",children:f}),t.jsx("button",{type:"submit",className:"contact-submit",disabled:c,children:c?"Sending…":"Send message"})]})]})})})})]})}const Le=R.memo(Ce),Ie=R.memo(Pe);function ke({leftInteractive:e,rightInteractive:n}){return t.jsxs("div",{className:"veloste-overlay","aria-hidden":!1,children:[t.jsxs("div",{className:"veloste-scroll-indicators","aria-hidden":!0,children:[t.jsxs("div",{className:"veloste-scroll-indicator veloste-scroll-indicator--left",children:[t.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:t.jsx("path",{d:"M11 4L6 9L11 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),t.jsx("span",{children:"Contact"})]}),t.jsxs("div",{className:"veloste-scroll-indicator veloste-scroll-indicator--right",children:[t.jsx("span",{children:"About"}),t.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:t.jsx("path",{d:"M7 4L12 9L7 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]}),t.jsx("div",{className:"veloste-pane veloste-pane--left",children:t.jsx(Le,{active:e})}),t.jsx("div",{className:"veloste-pane veloste-pane--right",children:t.jsx(Ie,{active:n,stacked:!0})})]})}function A({baseIntensity:e,...n}){const o=p.useRef(null),{sceneRefs:a}=I(),r=p.useRef(1);return O(()=>{const i=o.current;if(!i)return;const d=a.lightBoost.current;Math.abs(d-r.current)<1e-4||(r.current=d,i.intensity=e*d)}),t.jsx(ie,{ref:o,intensity:e,...n})}function Oe(){const{sceneRefs:e}=I(),n=p.useRef(null),o=p.useRef(null),a=p.useRef(1);return O(()=>{const r=e.lightBoost.current;Math.abs(r-a.current)<1e-4||(a.current=r,n.current&&(n.current.intensity=.08*r),o.current&&(o.current.intensity=.16*r))}),t.jsxs(t.Fragment,{children:[t.jsx("ambientLight",{ref:n,intensity:.08}),t.jsx("hemisphereLight",{ref:o,intensity:.16,color:"#ffffff",groundColor:"#080808"}),t.jsxs(ce,{background:!1,blur:.65,frames:1,children:[t.jsx(A,{baseIntensity:4.8,form:"rect",color:"#ffffff",scale:[7,3.5,1],position:[0,1.6,4.5],rotation:[-.15,0,0]}),t.jsx(A,{baseIntensity:18,form:"rect",color:"#ffffff",scale:[2.2,.5,1],position:[0,.6,2.2],rotation:[-.05,0,0]}),t.jsx(A,{baseIntensity:18,form:"rect",color:"#ffffff",scale:[7,2,1],position:[0,6,-2],rotation:[Math.PI/2.4,0,0]}),t.jsx(A,{baseIntensity:6.6,form:"rect",color:"#ffffff",scale:[4,4,1],position:[-6,0,2],rotation:[0,Math.PI/3,0]}),t.jsx(A,{baseIntensity:6.6,form:"rect",color:"#ffffff",scale:[4,4,1],position:[6,0,2],rotation:[0,-Math.PI/3,0]})]})]})}const ee=(e,n,o)=>{const a=C.clamp((o-e)/Math.max(1e-6,n-e),0,1);return a*a*(3-2*a)};function Fe(e,{deadZone:n=.15,easePower:o=1.5,curvePower:a=1.6}={}){const r=w=>C.clamp((w-n)/(1-n),0,1),i=Math.max(0,e),d=Math.max(0,-e),c=Math.pow(r(i),o),u=Math.pow(r(d),o),s=Math.pow(c,a),m=Math.pow(u,a),f=ee(.62,.95,s),v=ee(.62,.95,m),b=C.clamp(Math.pow(v,.88),0,1),h=C.clamp(Math.pow(f,.88),0,1),g=Math.max(b,h);return{leftOpacity:v,rightOpacity:f,aboutBlurAmount:b,contactBlurAmount:h,overlayBlurAmount:g,indicatorOpacity:1-Math.min(1,Math.abs(e)/n)}}const te=360,Be=240,Ae=120,$e=120,W=2e3,F=()=>typeof performance<"u"?performance.now():Date.now(),H=e=>Math.max(0,Math.min(1,e)),$=(e,n,o)=>{e.push(n),e.length>o&&e.shift()},De=(e,n)=>{if(!e.length)return 0;const o=[...e].sort((r,i)=>r-i),a=Math.min(o.length-1,Math.floor((o.length-1)*n));return o[a]},y=(e,n=2)=>Number(e.toFixed(n)),Ne=()=>typeof window>"u"?!1:new URLSearchParams(window.location.search).get("debugScroll")==="1"?!0:window.localStorage.getItem("velosteDebugScroll")==="1";class _e{enabled=Ne();frameTimesMs=[];frameTs=[];inputEvents=[];longTasks=[];thresholdEvents=[];pCurrent=0;pTarget=0;overlayBlur=0;leftOpacity=0;rightOpacity=0;indicatorOpacity=1;scrollCurveConfig=null;recordFrame({dtSeconds:n,pCurrent:o,pTarget:a}){if(!this.enabled)return;const r=F(),i=n*1e3;$(this.frameTimesMs,i,te),$(this.frameTs,r,te),this.pCurrent=o,this.pTarget=a}recordDerived({overlayBlur:n,leftOpacity:o,rightOpacity:a,indicatorOpacity:r}){this.enabled&&(this.overlayBlur=H(n),this.leftOpacity=H(o),this.rightOpacity=H(a),this.indicatorOpacity=H(r))}recordInput(n){this.enabled&&$(this.inputEvents,n,Be)}recordLongTask(n){this.enabled&&$(this.longTasks,{t:F(),duration:Math.max(0,n)},Ae)}recordThreshold(n,o){this.enabled&&$(this.thresholdEvents,{t:F(),name:n,active:o},$e)}setCurveConfig(n){this.enabled&&(this.scrollCurveConfig=n)}recentFilter(n,o){const a=F()-o;return n.filter(r=>r.t>=a)}getSnapshot(n=W){if(!this.enabled)return{enabled:!1,fpsAvg:0,fpsP95:0,frameTimeAvgMs:0,frameTimeP95Ms:0,worstFrameMs:0,droppedPct:0,longTaskCount:0,longTaskMaxMs:0,wheelPerSec:0,touchPerSec:0,consumedInputPct:0,clampedInputPct:0,maxDeltaP:0,pCurrent:0,pTarget:0,overlayBlur:0,leftOpacity:0,rightOpacity:0,indicatorOpacity:1,sampleCount:0};const o=F()-n,a=this.frameTimesMs.filter((l,x)=>this.frameTs[x]>=o),r=a.length,i=r>0?a.reduce((l,x)=>l+x,0)/r:0,d=De(a,.95),c=a.length?Math.max(...a):0,u=a.filter(l=>l>20).length,s=this.recentFilter(this.inputEvents,n),m=s.filter(l=>l.mode==="wheel").length,f=s.filter(l=>l.mode==="touch").length,v=s.filter(l=>l.consumed).length,b=s.filter(l=>l.clamped).length,h=s.length?Math.max(...s.map(l=>Math.abs(l.deltaP))):0,g=this.recentFilter(this.longTasks,n),w=g.length?Math.max(...g.map(l=>l.duration)):0;return{enabled:!0,fpsAvg:y(i>0?1e3/i:0,1),fpsP95:y(d>0?1e3/d:0,1),frameTimeAvgMs:y(i,2),frameTimeP95Ms:y(d,2),worstFrameMs:y(c,2),droppedPct:y(r>0?u/r*100:0,1),longTaskCount:g.length,longTaskMaxMs:y(w,1),wheelPerSec:y(m*1e3/Math.max(1,n),1),touchPerSec:y(f*1e3/Math.max(1,n),1),consumedInputPct:y(s.length?v/s.length*100:0,1),clampedInputPct:y(s.length?b/s.length*100:0,1),maxDeltaP:y(h,4),pCurrent:y(this.pCurrent,4),pTarget:y(this.pTarget,4),overlayBlur:y(this.overlayBlur,3),leftOpacity:y(this.leftOpacity,3),rightOpacity:y(this.rightOpacity,3),indicatorOpacity:y(this.indicatorOpacity,3),sampleCount:r}}getSummaryLine(n=W){const o=this.getSnapshot(n);return o.enabled?[`fps ${o.fpsAvg} (p95 ${o.fpsP95})`,`ft ${o.frameTimeAvgMs}ms (p95 ${o.frameTimeP95Ms}ms)`,`drop ${o.droppedPct}%`,`long ${o.longTaskCount}/${o.longTaskMaxMs}ms`,`wheel ${o.wheelPerSec}/s`,`max dP ${o.maxDeltaP}`,`p ${o.pCurrent} -> ${o.pTarget}`,`blur ${o.overlayBlur}`].join(" | "):"scroll-debug disabled"}buildReport(n=W){return{snapshot:this.getSnapshot(n),recentThresholdEvents:this.recentFilter(this.thresholdEvents,n).map(o=>({ageMs:y(F()-o.t,1),name:o.name,active:o.active})),curveConfig:this.scrollCurveConfig,generatedAtIso:new Date().toISOString()}}}const M=new _e;typeof window<"u"&&M.enabled&&(window.velosteScrollDebugReport=()=>M.buildReport());const ze=.88,He=.72,Ue=.88,Ge=.72,We=.88,Ye=.025,qe=16;function oe(e,n){return Math.round(e*n)/n}function U(e,n,o,a,r,i=d=>d.toFixed(3)){const d=oe(r,1/Ye);n[o]!==d&&(n[o]=d,e.style.setProperty(a,i(d)))}function Ve({groupRef:e,maxYaw:n,deadZone:o=.15,easePower:a=1.5,curvePower:r=1.6}){const{gl:i}=se(),{pRef:d,sceneRefs:c}=I(),u=p.useRef(!1),s=p.useRef(!1),m=p.useRef(!1),f=p.useRef(!1),v=p.useRef(!1),b=p.useRef({}),h=p.useRef(0),g=typeof window<"u"&&window.innerWidth<768?10:14;return p.useEffect(()=>()=>{i.setClearColor(0,0),i.setClearAlpha(0),document.documentElement.classList.remove("veloste-panel-open","veloste-panel-blurred"),document.documentElement.style.removeProperty("--veloste-about-blur"),document.documentElement.style.removeProperty("--veloste-about-open"),document.documentElement.style.removeProperty("--veloste-left-opacity"),document.documentElement.style.removeProperty("--veloste-right-opacity"),document.documentElement.style.removeProperty("--veloste-indicator-opacity")},[i]),O(()=>{const w=Fe(d.current,{deadZone:o,easePower:a,curvePower:r}),{leftOpacity:l,rightOpacity:x,overlayBlurAmount:S,indicatorOpacity:j}=w;M.setCurveConfig({deadZone:o,easePower:a,curvePower:r}),M.recordDerived({overlayBlur:S,leftOpacity:l,rightOpacity:x,indicatorOpacity:j}),e.current&&(e.current.rotation.y=d.current*n);const L=oe(S,qe);if(c.glow.current=L,c.lightBoost.current=1+L*2.4,c.overlayBlur.current=L,h.current+=1,h.current%2===0){const k=document.documentElement,D=b.current;U(k,D,"open","--veloste-about-open",S),U(k,D,"leftOpacity","--veloste-left-opacity",l),U(k,D,"rightOpacity","--veloste-right-opacity",x),U(k,D,"indicatorOpacity","--veloste-indicator-opacity",j);const N=S>.02;N!==m.current&&(m.current=N,k.classList.toggle("veloste-panel-open",N),M.recordThreshold("panelOpen",N));const B=S>=We;B!==s.current&&(s.current=B,k.classList.toggle("veloste-panel-blurred",B),M.recordThreshold("canvasBlurred",B),k.style.setProperty("--veloste-about-blur",B?`${g}px`:"0px"))}const T=S>.02;T!==u.current&&(u.current=T,M.recordThreshold("opaqueCanvas",T),T?(i.setClearColor(0,1),i.setClearAlpha(1)):(i.setClearColor(0,0),i.setClearAlpha(0)));const E=f.current?l>He:l>ze;E!==f.current&&(f.current=E,M.recordThreshold("leftInteractive",E),window.dispatchEvent(new CustomEvent("veloste:leftInteractive",{detail:{active:E}})));const P=v.current?x>Ge:x>Ue;P!==v.current&&(v.current=P,M.recordThreshold("rightInteractive",P),window.dispatchEvent(new CustomEvent("veloste:rightInteractive",{detail:{active:P}})))}),null}function Qe({children:e}){const{pRef:n,pTargetRef:o,smooth:a}=I();return O((r,i)=>{const d=1-Math.pow(a,i*60);n.current=C.lerp(n.current,o.current,d),M.recordFrame({dtSeconds:i,pCurrent:n.current,pTarget:o.current})}),t.jsx(t.Fragment,{children:e})}function Xe({ticksToMax:e,notchSize:n,polarity:o,children:a}){const{pTargetRef:r}=I();return p.useEffect(()=>{const i=l=>C.clamp(l,-1,1),d=()=>r.current<=-.999999,c=()=>r.current>=.999999,u=l=>-(l/n)*o/e,s=l=>!(l>0&&c()||l<0&&d()),m=l=>{const x=l.deltaMode===1?16:l.deltaMode===2?window.innerHeight:1,S=l.deltaY*x,j=u(S),T=r.current+j,E=i(T),P=s(j);M.recordInput({t:performance.now(),mode:"wheel",deltaP:j,consumed:P,clamped:Math.abs(E-T)>1e-9}),P&&(l.preventDefault(),r.current=E)};let f=0,v=!1;const b=l=>{l.touches.length===1&&(v=!0,f=l.touches[0].clientY)},h=l=>{if(!v||l.touches.length!==1)return;const x=l.touches[0].clientY,S=f-x;f=x;const j=u(S),T=r.current+j,E=i(T),P=s(j);M.recordInput({t:performance.now(),mode:"touch",deltaP:j,consumed:P,clamped:Math.abs(E-T)>1e-9}),P&&(l.preventDefault(),r.current=E)},g=()=>{v=!1},w=l=>{const x=l.detail;if(!x||typeof x.p!="number")return;const S=i(x.p);M.recordInput({t:performance.now(),mode:"api",deltaP:x.p-r.current,consumed:!0,clamped:Math.abs(S-x.p)>1e-9}),r.current=S};return window.addEventListener("wheel",m,{passive:!1}),window.addEventListener("touchstart",b,{passive:!0}),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",g,{passive:!0}),window.addEventListener("veloste:setProgress",w),()=>{window.removeEventListener("wheel",m),window.removeEventListener("touchstart",b),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",g),window.removeEventListener("veloste:setProgress",w)}},[e,n,o,r]),t.jsx(t.Fragment,{children:a})}function Ze({children:e,ticksToMax:n=24,notchSize:o=120,polarity:a=1,smooth:r=.85}){return t.jsx(me,{smooth:r,children:t.jsx(Xe,{ticksToMax:n,notchSize:o,polarity:a,children:t.jsx(Qe,{children:e})})})}const Y=2e3,Je={enabled:!1,fpsAvg:0,fpsP95:0,frameTimeAvgMs:0,frameTimeP95Ms:0,worstFrameMs:0,droppedPct:0,longTaskCount:0,longTaskMaxMs:0,wheelPerSec:0,touchPerSec:0,consumedInputPct:0,clampedInputPct:0,maxDeltaP:0,pCurrent:0,pTarget:0,overlayBlur:0,leftOpacity:0,rightOpacity:0,indicatorOpacity:1,sampleCount:0};function Ke(){const[e,n]=p.useState(Je);return p.useEffect(()=>{if(!M.enabled)return;const o=window.setInterval(()=>{n(M.getSnapshot(Y))},250),a=window.setInterval(()=>{console.info(`[scroll-debug] ${M.getSummaryLine(Y)}`)},Y);return()=>{window.clearInterval(o),window.clearInterval(a)}},[]),p.useEffect(()=>{if(!M.enabled||typeof PerformanceObserver>"u")return;const o=new PerformanceObserver(a=>{for(const r of a.getEntries())M.recordLongTask(r.duration)});try{o.observe({type:"longtask",buffered:!0})}catch{return}return()=>o.disconnect()},[]),M.enabled?t.jsx("aside",{"aria-live":"off",style:{position:"absolute",top:10,right:10,zIndex:30,pointerEvents:"none",userSelect:"text",background:"rgba(0, 0, 0, 0.65)",color:"#d8f1ff",border:"1px solid rgba(152, 220, 255, 0.35)",borderRadius:8,padding:"8px 10px",font:"11px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",minWidth:240,whiteSpace:"pre"},children:[`fps ${e.fpsAvg} | p95 ${e.fpsP95}`,`ft ${e.frameTimeAvgMs}ms | p95 ${e.frameTimeP95Ms}ms`,`drop ${e.droppedPct}% | worst ${e.worstFrameMs}ms`,`long ${e.longTaskCount} | max ${e.longTaskMaxMs}ms`,`wheel ${e.wheelPerSec}/s touch ${e.touchPerSec}/s`,`consume ${e.consumedInputPct}% clamp ${e.clampedInputPct}%`,`max dP ${e.maxDeltaP}`,`p ${e.pCurrent} -> ${e.pTarget}`,`L ${e.leftOpacity}  R ${e.rightOpacity}`,`blur ${e.overlayBlur}  ind ${e.indicatorOpacity}`].join(`
`)}):null}function et(){const[e,n]=p.useState(1.5);return p.useEffect(()=>{const o=()=>{const a=window.innerWidth;n(a<480?1.15:a<768?1.35:1.5)};return o(),window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)},[]),e}const tt=R.memo(function({groupRef:n,maxYaw:o,deadZone:a,easePower:r,curvePower:i,groupZ:d,maxDpr:c,toneMappingExposure:u}){return t.jsx(re,{className:"logo-canvas",dpr:[1,Math.min(c,typeof window<"u"?window.devicePixelRatio:1)],gl:{alpha:!0,antialias:!1,powerPreference:"high-performance",toneMapping:fe,toneMappingExposure:u},style:{background:"transparent",touchAction:"none"},camera:{position:[0,0,7],fov:80},children:t.jsx(p.Suspense,{fallback:null,children:t.jsxs(Ze,{ticksToMax:7,notchSize:48,polarity:1,smooth:.88,children:[t.jsx(Ve,{groupRef:n,maxYaw:o,deadZone:a,easePower:r,curvePower:i}),t.jsx(Oe,{}),t.jsxs("group",{ref:n,position:[0,0,d],children:[t.jsx(ge,{rotation:[0,Math.PI*1.5,0]}),t.jsx(he,{rotation:[0,Math.PI*1.5,0]}),t.jsx(be,{groupWorldZ:d})]})]})})})}),rt=()=>{const e=p.useRef(null),n=1,o=C.degToRad(40),a=et(),r=.15,i=1.5,d=1.6,c={whites:34,highlights:26,shadows:-28,blacks:-36},u=h=>C.clamp(h/100,-1,1),s=1+u(c.whites)*.22+u(c.highlights)*.2-Math.abs(u(c.shadows))*.06-Math.abs(u(c.blacks))*.05,[m,f]=p.useState(!1),[v,b]=p.useState(!1);return p.useEffect(()=>{const h=w=>{const l=w.detail.active;f(l)},g=w=>{const l=w.detail.active;b(l)};return window.addEventListener("veloste:leftInteractive",h),window.addEventListener("veloste:rightInteractive",g),()=>{window.removeEventListener("veloste:leftInteractive",h),window.removeEventListener("veloste:rightInteractive",g)}},[]),t.jsxs("div",{className:"logo-wrap",children:[t.jsx("div",{className:"bg-text",children:"VELOSTE"}),t.jsx("div",{className:"logo-about-plate","aria-hidden":!0}),t.jsx(tt,{groupRef:e,maxYaw:o,deadZone:r,easePower:i,curvePower:d,groupZ:n,maxDpr:a,toneMappingExposure:s}),t.jsx(ke,{leftInteractive:m,rightInteractive:v}),t.jsx(Ke,{})]})};export{rt as default};
