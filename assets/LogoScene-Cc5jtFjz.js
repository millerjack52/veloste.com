import{u as W,a as z,j as e,C as Z}from"./r3f-B2s3LvGu.js";import{a as v,e as G,B as J,R as b,H as Q,E as K,L as I}from"./drei-DtmR-F9-.js";import{a1 as M,y as $,D as ee,_ as te}from"./three-4nmV-q_z.js";function ae({overlayBlurAmount:s}){const{gl:t}=W(),r=v.useRef(s),i=v.useRef(!1);return v.useEffect(()=>{r.current=s},[s]),v.useEffect(()=>()=>{t.setClearColor(0,0),t.setClearAlpha(0)},[t]),z(()=>{const d=r.current>.02;d!==i.current&&(i.current=d,d?(t.setClearColor(0,1),t.setClearAlpha(1)):(t.setClearColor(0,0),t.setClearAlpha(0)))}),null}const oe=.42,se=.02,ne=12;function re({spin:s=0,children:t}){const r=v.useRef(null),i=v.useRef(s),d=v.useRef(!1);return v.useEffect(()=>{i.current=s},[s]),v.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)");d.current=n.matches;const l=()=>{d.current=n.matches};return n.addEventListener("change",l),()=>n.removeEventListener("change",l)},[]),z((n,l)=>{const a=r.current;if(!a)return;const c=i.current;if(Math.abs(c)>=se&&!d.current){a.rotation.y+=c*l*oe;return}if(Math.abs(a.rotation.y)<1e-4){a.rotation.y=0;return}const x=d.current?1:1-Math.exp(-l*ne);a.rotation.y=M.lerp(a.rotation.y,0,x)}),e.jsx("group",{ref:r,children:t})}const _=new $(1,1,1);function ie({glow:s=0,...t}){const{scene:r}=G("/models/vstar.glb"),i=v.useRef([]),d=v.useRef(s);return v.useEffect(()=>{d.current=s},[s]),v.useEffect(()=>{const n=[];r.traverse(l=>{if(l.isMesh&&l.material){const a=l.material;a.color&&a.color.multiplyScalar(.76),"metalness"in a&&(a.metalness=.9),"roughness"in a&&(a.roughness=.16),a.envMapIntensity=1.35,a.normalScale&&a.normalScale.set(1,1),a.emissive=new $("#ffffff"),a.emissiveIntensity=.03,a.userData.baseColor=a.color?.clone?.()??new $("#808080"),a.userData.baseMetalness=a.metalness,a.userData.baseRoughness=a.roughness,a.userData.baseEnvMapIntensity=a.envMapIntensity??1,a.userData.baseToneMapped=a.toneMapped,n.push(a)}}),i.current=n},[r]),z(()=>{const n=M.clamp(d.current,0,1),l=1+n*14,a=n*48;for(const c of i.current){const x=c.userData.baseColor,o=c.userData.baseMetalness??.9,g=c.userData.baseRoughness??.18,f=c.userData.baseEnvMapIntensity??1.05,p=c.userData.baseToneMapped??!0;c.toneMapped=n>.02?!1:p,n>=.98?c.color.copy(_):x&&(c.color.copy(x).multiplyScalar(l),c.color.lerp(_,n)),c.emissive.setRGB(1,1,1),c.emissiveIntensity=a,c.metalness=M.clamp(o-n*.92,0,1),c.roughness=M.clamp(g-n*.24,.008,1),c.envMapIntensity=f+n*18}}),e.jsx("primitive",{object:r,...t})}G.preload("/models/thiscouldbeit.glb");function ce(s=0){const{viewport:t,camera:r}=W();return v.useCallback(()=>{const i=t.getCurrentViewport(r,[0,0,s]);return Math.max(i.width,i.height)/1.5},[t,r,s])}function H({side:s,p:t,baseScale:r=.1,pos:i={x:5,y:0,z:0},worldZOfGroup:d=1,deadZone:n=.15,easePower:l=1.5,curvePower:a=1.6,color:c="#ffffff",aboutBlurAmount:x=0}){const o=S=>M.clamp((S-n)/(1-n),0,1),g=s==="right"?Math.max(0,t):Math.max(0,-t),f=o(g),p=Math.pow(f,l),u=ce(d)(),m=r*Math.pow(u/r,Math.pow(p,a)),h=s==="right"?-Math.abs(i.x):+Math.abs(i.x),j=(s==="left"?.55:1)*(1-M.clamp(x,0,1));return e.jsx(J,{position:[h,i.y,i.z],follow:!0,children:e.jsxs("mesh",{scale:m,renderOrder:10,children:[e.jsx("circleGeometry",{args:[1,64]}),e.jsx("meshBasicMaterial",{color:c,transparent:!0,opacity:j,depthTest:!1,depthWrite:!1,side:ee,toneMapped:!1})]})})}function le({p:s,groupWorldZ:t=1,deadZone:r=.15,left:i={x:6,y:.22,z:0},right:d={x:5.8,y:.22,z:0},color:n="#ffffff",aboutBlurAmount:l=0}){return e.jsxs(e.Fragment,{children:[e.jsx(H,{side:"left",p:s,pos:i,worldZOfGroup:t,deadZone:r,aboutBlurAmount:l,color:"#e8e8e8"}),e.jsx(H,{side:"right",p:s,pos:d,worldZOfGroup:t,deadZone:r,aboutBlurAmount:l,color:n})]})}const pe="max(8vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",O=8,de=1240,Y="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",ue="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",fe="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace",me=[{id:"intro",kicker:"01 About",title:"Calgary web developer for lead-generating websites.",body:"Veloste is a Calgary web developer and design studio building custom websites, motion-led interfaces, and immersive 3D experiences for businesses across Canada and the United States."},{id:"services",kicker:"02 Services",title:"Custom websites built to convert.",body:"For teams that need more than a theme: clean structure, conversion-focused UX, strong visual systems, and code your team can iterate with confidence."},{id:"work",kicker:"03 Who it's for",title:"Built for teams that need clarity and momentum.",body:"Veloste works with Calgary small businesses and founder-led teams — local service businesses that need qualified leads, teams replacing dated websites that do not explain value clearly, and businesses launching new offers that need a conversion-ready web presence quickly."},{id:"team",kicker:"04 Process",title:"Discovery through launch, with clear scope.",body:"Every project starts with discovery: goals, audience, constraints, and conversion path. From there we shape structure and art direction, build with responsive QA and performance tuning, then support launch and post-launch iteration. Calgary-first delivery, with support across Airdrie, Cochrane, Okotoks, and Chestermere."}],he=["Brand-led website design and development","Interaction and motion system design","Immersive 3D web experiences"];function xe({opacity:s,active:t}){const r=b.useRef(null),i=b.useRef(null),d=b.useRef(!1),[n,l]=b.useState(!1),[a,c]=b.useState(!1);b.useEffect(()=>{const o=window.matchMedia("(prefers-reduced-motion: reduce)");c(o.matches);const g=()=>c(o.matches);return o.addEventListener("change",g),()=>o.removeEventListener("change",g)},[]);const x=b.useCallback(()=>{const o=r.current;o&&l(o.scrollHeight-o.clientHeight>2)},[]);return v.useLayoutEffect(()=>{t&&x()},[t,x]),b.useEffect(()=>{x();let o=null;return typeof ResizeObserver<"u"&&(o=new ResizeObserver(x),r.current&&o.observe(r.current)),window.addEventListener("resize",x),()=>{o?.disconnect(),window.removeEventListener("resize",x)}},[x]),b.useEffect(()=>{const o=r.current;t&&!d.current&&o&&(o.scrollTo({top:0,behavior:"auto"}),x()),d.current=t},[t,x]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
          width: min(100%, ${de}px);
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
        .about-kicker {
          margin: 0;
          position: sticky;
          top: max(20px, calc(env(safe-area-inset-top, 0px) + 16px));
          font-family: ${fe};
          font-size: clamp(10px, 0.9vw, 12px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-title {
          margin: 0;
          font-family: ${Y};
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
          font-family: ${ue};
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
          font-family: ${Y};
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
          will-change: transform, opacity, filter;
        }
        @keyframes about-reveal-in {
          from {
            opacity: 0;
            transform: translateY(24px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @media (max-width: 900px) {
          .about-shell {
            gap: 12vh;
          }
          .about-block {
            min-height: 72vh;
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .about-kicker {
            position: static;
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
      `}),e.jsx("div",{style:{position:"relative",display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"transparent",color:"#fff",opacity:s,transition:"opacity 160ms linear",pointerEvents:t?"auto":"none",overflow:"hidden"},children:e.jsxs("div",{ref:r,className:"about-scroll",style:{flex:1,height:"100%",width:"100%",overflowY:t?"auto":"hidden",WebkitOverflowScrolling:t?"touch":"auto",overscrollBehavior:t?"contain":"auto",touchAction:t?"auto":"none",padding:pe},onWheel:o=>{if(!t)return;const g=r.current;if(!g)return;const{scrollTop:f,scrollHeight:p,clientHeight:u}=g,m=f<=O,h=f+u>=p-O;m&&o.deltaY<0||h&&o.deltaY>0||o.stopPropagation()},onTouchStart:o=>{!t||o.touches.length!==1||(i.current=o.touches[0].clientY)},onTouchEnd:()=>{i.current=null},onTouchMoveCapture:o=>{if(!t||!n||o.touches.length!==1)return;const g=o.touches[0].clientY,f=i.current;if(f===null)return;const p=f-g;i.current=g;const u=r.current;if(!u)return;const{scrollTop:m,scrollHeight:h,clientHeight:y}=u,j=m<=O,S=m+y>=h-O;j&&p<0||S&&p>0||o.stopPropagation()},onPointerDownCapture:o=>{t&&o.stopPropagation()},children:[e.jsx("div",{className:"about-shell",children:me.map((o,g)=>e.jsxs("section",{className:"about-block about-reveal",style:{animationDelay:a?"0ms":`${g*70}ms`},"aria-label":o.kicker,children:[e.jsx("p",{className:"about-kicker",children:o.kicker}),e.jsxs("div",{children:[e.jsx("h1",{className:"about-title",children:o.title}),e.jsx("p",{className:"about-body",children:o.body}),o.id==="services"&&e.jsx("ul",{className:"about-services","aria-label":"Veloste services",children:he.map(f=>e.jsx("li",{children:f},f))})]})]},o.id))}),e.jsxs("nav",{className:"seo-links-hidden","aria-label":"SEO navigation links",children:[e.jsx("a",{href:"/web-developer-calgary/",children:"Calgary web developer services"}),e.jsx("a",{href:"/service-areas/calgary-region/",children:"Calgary-region coverage"}),e.jsx("a",{href:"mailto:contact@veloste.com",children:"Get a scoped quote"})]})]})})]})}const ge="max(8vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",be=1240,U="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",F="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",V="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace",q="https://veloste-mailer.vercel.app".replace(/\/+$/,"");function ve({opacity:s,active:t}){const[r,i]=b.useState(""),[d,n]=b.useState(""),[l,a]=b.useState(""),[c,x]=b.useState(!1),[o,g]=b.useState(!1),[f,p]=b.useState("");async function u(m){m.preventDefault(),x(!0),p("");try{if(!q)throw new Error("VITE_API_BASE_URL is not defined (and no dev fallback).");const h=await fetch(`${q}/api/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r,email:d,message:l})});if(!h.ok){let y="Failed to send message";try{const j=await h.json();j?.error&&(y=j.error+(j?.hint?` ${j.hint}`:""))}catch{const j=await h.text().catch(()=>"");j&&(y=j)}throw new Error(y)}g(!0),i(""),n(""),a("")}catch(h){p(h instanceof Error?h.message:"Failed to send message. Please try again.")}finally{x(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
          width: min(100%, ${be}px);
          margin: 0 auto;
          padding-bottom: 18vh;
          color: #fff;
        }
        .contact-block {
          min-height: min(84vh, 920px);
          display: grid;
          grid-template-columns: minmax(74px, 11vw) minmax(0, 1fr);
          gap: clamp(14px, 2vw, 32px);
          align-items: start;
        }
        .contact-kicker {
          margin: 0;
          position: sticky;
          top: max(20px, calc(env(safe-area-inset-top, 0px) + 16px));
          font-family: ${V};
          font-size: clamp(10px, 0.9vw, 12px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .contact-title {
          margin: 0;
          font-family: ${U};
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
          font-family: ${F};
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
          font-family: ${V};
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
          font-family: ${F};
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
          font-family: ${F};
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
          font-family: ${U};
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
          font-family: ${F};
          font-size: clamp(15px, 1.7vw, 22px);
          line-height: 1.6;
          color: #fff;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        @media (max-width: 900px) {
          .contact-block {
            min-height: 72vh;
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .contact-kicker {
            position: static;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-scroll {
            scroll-behavior: auto;
          }
        }
      `}),e.jsx("div",{className:"contact-scroll",style:{display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"transparent",color:"#fff",opacity:s,transition:"opacity 160ms linear",pointerEvents:t?"auto":"none",overflowY:t?"auto":"hidden",WebkitOverflowScrolling:t?"touch":"auto",overscrollBehavior:t?"contain":"auto",touchAction:t?"auto":"none",padding:ge,boxSizing:"border-box"},children:e.jsx("div",{className:"contact-shell",children:e.jsxs("section",{className:"contact-block","aria-label":"05 Contact",children:[e.jsx("p",{className:"contact-kicker",children:"05 Contact"}),e.jsxs("div",{children:[e.jsx("h1",{className:"contact-title",children:"Get a scoped quote."}),e.jsx("p",{className:"contact-body",children:"Share your business type, timeline, and budget range. We'll reply with a recommended scope and next steps."}),e.jsxs("p",{className:"contact-meta",children:["Calgary-based, serving Airdrie, Cochrane, Okotoks, and Chestermere. Email"," ",e.jsx("a",{href:"mailto:contact@veloste.com",children:"contact@veloste.com"})," or call ",e.jsx("a",{href:"tel:+18255214542",children:"(825) 521-4542"}),"."]}),o?e.jsx("p",{className:"contact-success",children:"Thanks — we'll get back to you shortly."}):e.jsxs("form",{className:"contact-form",onSubmit:u,noValidate:!0,children:[e.jsxs("div",{className:"contact-fields-row",children:[e.jsxs("div",{className:"contact-field-wrap",children:[e.jsx("label",{htmlFor:"contact-name",className:"contact-label",children:"Name"}),e.jsx("input",{id:"contact-name",className:"contact-field",type:"text",value:r,onChange:m=>i(m.target.value),required:!0,autoComplete:"name",placeholder:"Your name"})]}),e.jsxs("div",{className:"contact-field-wrap",children:[e.jsx("label",{htmlFor:"contact-email",className:"contact-label",children:"Email"}),e.jsx("input",{id:"contact-email",className:"contact-field",type:"email",value:d,onChange:m=>n(m.target.value),required:!0,autoComplete:"email",placeholder:"you@example.com"})]})]}),e.jsxs("div",{className:"contact-field-wrap",children:[e.jsx("label",{htmlFor:"contact-message",className:"contact-label",children:"Message"}),e.jsx("textarea",{id:"contact-message",className:"contact-field contact-textarea",required:!0,value:l,onChange:m=>a(m.target.value),placeholder:"Tell us about your project, timeline, and goals…",rows:5})]}),f&&e.jsx("p",{className:"contact-error",role:"alert","aria-live":"polite",children:f}),e.jsx("button",{type:"submit",className:"contact-submit",disabled:c,children:c?"Sending…":"Send message"})]})]})]})})})]})}function we({p:s,deadZone:t=.15,easePower:r=1.5,curvePower:i=1.6}){const d=w=>M.clamp((w-t)/(1-t),0,1),n=Math.max(0,s),l=Math.max(0,-s),a=Math.pow(d(n),r),c=Math.pow(d(l),r),x=Math.pow(a,i),o=Math.pow(c,i),g=(w,D,X)=>{const B=M.clamp((X-w)/Math.max(1e-6,D-w),0,1);return B*B*(3-2*B)},f=g(.75,.97,x),p=g(.75,.97,o),u=M.clamp(Math.pow(p,.88),0,1),m=M.clamp(Math.pow(f,.88),0,1),h=Math.max(u,m),y=h*8,j=.88,S=.72,E=.88,k=.72,[L,C]=b.useState(!1),[R,N]=b.useState(!1),[T,P]=b.useState(!1);b.useEffect(()=>{const w=window.matchMedia("(prefers-reduced-motion: reduce)");P(w.matches);const D=()=>P(w.matches);return w.addEventListener("change",D),()=>w.removeEventListener("change",D)},[]),b.useEffect(()=>{C(w=>w?p>S:p>j)},[p]),b.useEffect(()=>{N(w=>w?f>k:f>E)},[f]),b.useEffect(()=>{const w=document.documentElement;return w.style.setProperty("--veloste-about-blur",`${Math.round(h*14)}px`),w.style.setProperty("--veloste-about-open",h.toFixed(3)),w.style.setProperty("--veloste-about-dim","0"),()=>{w.style.setProperty("--veloste-about-blur","0px"),w.style.setProperty("--veloste-about-open","0"),w.style.setProperty("--veloste-about-dim","0")}},[h]);const A=1-Math.min(1,Math.abs(s)/.15);return e.jsxs(Q,{fullscreen:!0,transform:!1,children:[A>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{position:"absolute",left:"max(28px, calc(env(safe-area-inset-left, 0px) + 16px))",top:"50%",transform:"translateY(-50%)",display:"flex",alignItems:"center",gap:8,opacity:A*.7,filter:`blur(${y}px)`,pointerEvents:"none",transition:T?"none":"opacity 200ms ease, filter 260ms ease"},children:[e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",style:{opacity:.9},children:e.jsx("path",{d:"M11 4L6 9L11 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),e.jsx("span",{style:{fontSize:11,textTransform:"uppercase",letterSpacing:"0.16em",color:"#fff"},children:"About"})]}),e.jsxs("div",{style:{position:"absolute",right:"max(28px, calc(env(safe-area-inset-right, 0px) + 16px))",top:"50%",transform:"translateY(-50%)",display:"flex",alignItems:"center",gap:8,opacity:A*.7,filter:`blur(${y}px)`,pointerEvents:"none",transition:T?"none":"opacity 200ms ease, filter 260ms ease"},children:[e.jsx("span",{style:{fontSize:11,textTransform:"uppercase",letterSpacing:"0.16em",color:"#fff"},children:"Contact"}),e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",style:{opacity:.9},children:e.jsx("path",{d:"M7 4L12 9L7 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]}),p>0&&e.jsx("div",{style:{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"1fr",justifyItems:"center",pointerEvents:L?"auto":"none",overscrollBehavior:"contain",background:"transparent"},children:e.jsx(xe,{opacity:p>0?1:0,active:L})}),f>0&&e.jsx("div",{style:{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"1fr",justifyItems:"center",pointerEvents:R?"auto":"none",overscrollBehavior:"contain",background:"transparent"},children:e.jsx(ve,{opacity:f,active:R,stacked:!0})})]})}function ye({boost:s=1}){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.08*s}),e.jsx("hemisphereLight",{intensity:.16*s,color:"#ffffff",groundColor:"#080808"}),e.jsxs(K,{background:!1,blur:.65,children:[e.jsx(I,{form:"rect",intensity:4.8*s,color:"#ffffff",scale:[7,3.5,1],position:[0,1.6,4.5],rotation:[-.15,0,0]}),e.jsx(I,{form:"rect",intensity:18*s,color:"#ffffff",scale:[2.2,.5,1],position:[0,.6,2.2],rotation:[-.05,0,0]}),e.jsx(I,{form:"rect",intensity:18*s,color:"#ffffff",scale:[7,2,1],position:[0,6,-2],rotation:[Math.PI/2.4,0,0]}),e.jsx(I,{form:"rect",intensity:6.6*s,color:"#ffffff",scale:[4,4,1],position:[-6,0,2],rotation:[0,Math.PI/3,0]}),e.jsx(I,{form:"rect",intensity:6.6*s,color:"#ffffff",scale:[4,4,1],position:[6,0,2],rotation:[0,-Math.PI/3,0]})]})]})}function je({children:s,ticksToMax:t=24,notchSize:r=120,polarity:i=1,smooth:d=.85}){const n=v.useRef(0),[l,a]=v.useState(0),c=p=>M.clamp(p,-1,1),x=()=>n.current<=-1+1e-6,o=()=>n.current>=1-1e-6,g=p=>-(p/r)*i/t,f=p=>!(p>0&&o()||p<0&&x());return v.useEffect(()=>{const p=E=>{const k=E.deltaMode===1?16:E.deltaMode===2?window.innerHeight:1,L=E.deltaY*k,C=g(L);f(C)&&(E.preventDefault(),n.current=c(n.current+C))};let u=0,m=!1;const h=E=>{E.touches.length===1&&(m=!0,u=E.touches[0].clientY)},y=E=>{if(!m||E.touches.length!==1)return;const k=E.touches[0].clientY,L=u-k;u=k;const C=g(L);f(C)&&(E.preventDefault(),n.current=c(n.current+C))},j=()=>{m=!1};window.addEventListener("wheel",p,{passive:!1}),window.addEventListener("touchstart",h,{passive:!0}),window.addEventListener("touchmove",y,{passive:!1}),window.addEventListener("touchend",j,{passive:!0});const S=E=>{const k=E.detail;!k||typeof k.p!="number"||(n.current=c(k.p))};return window.addEventListener("veloste:setProgress",S),()=>{window.removeEventListener("wheel",p),window.removeEventListener("touchstart",h),window.removeEventListener("touchmove",y),window.removeEventListener("touchend",j),window.removeEventListener("veloste:setProgress",S)}},[t,r,i]),z((p,u)=>{const m=1-Math.pow(d,u*60),h=M.lerp(l,n.current,m);h!==l&&a(h)}),e.jsx(e.Fragment,{children:s(l)})}function Me(){const[s,t]=v.useState(2);return v.useEffect(()=>{const r=()=>{const i=window.innerWidth;t(i<480?1.35:i<768?1.65:2)};return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]),s}const Ce=()=>{const t=M.degToRad(40),r=Me(),i=.15,d=1.5,n=1.6,l={whites:34,highlights:26,shadows:-28,blacks:-36},a=u=>M.clamp(u/100,-1,1),c=a(l.whites),x=a(l.highlights),o=a(l.shadows),g=a(l.blacks),f=1+c*.22+x*.2-Math.abs(o)*.06-Math.abs(g)*.05,p=(u,m,h)=>{const y=M.clamp((h-u)/Math.max(1e-6,m-u),0,1);return y*y*(3-2*y)};return e.jsxs("div",{className:"logo-wrap",children:[e.jsx("div",{className:"bg-text",children:"VELOSTE"}),e.jsx("div",{className:"logo-about-plate","aria-hidden":!0}),e.jsx(Z,{className:"logo-canvas",dpr:[1,Math.min(r,typeof window<"u"?window.devicePixelRatio:1)],gl:{alpha:!0,antialias:!0,powerPreference:"high-performance",toneMapping:te,toneMappingExposure:f},style:{background:"transparent",touchAction:"none"},camera:{position:[0,0,7],fov:80},children:e.jsx(v.Suspense,{fallback:null,children:e.jsx(je,{ticksToMax:7,notchSize:48,polarity:1,smooth:.92,children:u=>{const m=A=>M.clamp((A-i)/(1-i),0,1),h=Math.max(0,-u),y=Math.pow(m(h),d),j=Math.pow(y,n),S=Math.max(0,u),E=Math.pow(m(S),d),k=Math.pow(E,n),L=p(.75,.97,k),C=p(.75,.97,j),R=M.clamp(Math.pow(C,.88),0,1),N=M.clamp(Math.pow(L,.88),0,1),T=Math.max(R,N),P=R>N&&R>.02?-R:N>.02?N:0;return e.jsxs(e.Fragment,{children:[e.jsx(ae,{overlayBlurAmount:T}),e.jsx(ye,{boost:1+T*2.4}),e.jsxs("group",{position:[0,0,1],rotation:[0,u*t,0],children:[e.jsx(re,{spin:P,children:e.jsx(ie,{rotation:[0,Math.PI*1.5,0],glow:T})}),e.jsx(le,{p:u,groupWorldZ:1,deadZone:i,aboutBlurAmount:T}),e.jsx(we,{p:u,deadZone:i,easePower:d,curvePower:n})]})]})}})})})]})};export{Ce as default};
