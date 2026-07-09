const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WorkPane-BeaSeU5s.js","assets/r3f-DS0y2Osb.js","assets/drei-BF3AKx-h.js","assets/three-Dis90294.js"])))=>i.map(i=>d[i]);
import{a as f,R as U,e as ve,B as xt,E as bt,L as St,_ as wt}from"./drei-BF3AKx-h.js";import{b as tt,u as H,j as o,e as Tt,C as Et}from"./r3f-DS0y2Osb.js";import{_ as I,i as X,n as O,a3 as yt,a4 as Mt,a5 as Rt,F as st,W as z,L as fe,a6 as Bt,Z as Q,a7 as pe,a8 as J,a9 as Me,d as rt,aa as nt,ab as E,S as _e,O as _t,a as Ct,ac as ie,u as re,e as W,ad as Ut,N as Y,ae as it,T as at,af as ot,w as Pt,ag as It,a1 as Dt,ah as Ce,ai as Ue,H as At,K as Ot,aj as _,ak as Nt,f as Ft,al as Lt,X as kt}from"./three-Dis90294.js";/**
 * postprocessing v6.39.1 build Fri Apr 17 2026
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2026 Raoul van Rüschen
 * @license Zlib
 */var zt=(()=>{const e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]),s=new Dt;return s.setAttribute("position",new Ce(e,3)),s.setAttribute("uv",new Ce(t,2)),s})(),F=class ye{static get fullscreenGeometry(){return zt}constructor(t="Pass",s=new _e,r=new _t){this.name=t,this.renderer=null,this.scene=s,this.camera=r,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(t){if(this.rtt===t){const s=this.fullscreenMaterial;s!==null&&(s.needsUpdate=!0),this.rtt=!t}}set mainScene(t){}set mainCamera(t){}setRenderer(t){this.renderer=t}isEnabled(){return this.enabled}setEnabled(t){this.enabled=t}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(t){let s=this.screen;s!==null?s.material=t:(s=new Ct(ye.fullscreenGeometry,t),s.frustumCulled=!1,this.scene===null&&(this.scene=new _e),this.scene.add(s),this.screen=s)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(t){this.fullscreenMaterial=t}getDepthTexture(){return null}setDepthTexture(t,s=J){}render(t,s,r,n,a){throw new Error("Render method not implemented!")}setSize(t,s){}initialize(t,s,r){}dispose(){for(const t of Object.keys(this)){const s=this[t];(s instanceof z||s instanceof it||s instanceof at||s instanceof ye)&&this[t].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},Ht=class extends F{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(e,t,s,r,n){const a=e.state.buffers.stencil;a.setLocked(!1),a.setTest(!1)}},Gt=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,lt="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",ct=class extends W{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new E(null),depthBuffer:new E(null),channelWeights:new E(null),opacity:new E(1)},blending:Y,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Gt,vertexShader:lt}),this.depthFunc=It}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(e){const t=e!==null;this.colorWrite!==t&&(t?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=t,this.needsUpdate=!0),this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){const t=e!==null;this.depthWrite!==t&&(t?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=t,this.depthWrite=t,this.needsUpdate=!0),this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(e){this.colorSpaceConversion!==e&&(e?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(e){e!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=e):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}},jt=class extends F{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new ct,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new z(1,1,{minFilter:fe,magFilter:fe,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,s,r,n){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,s){s!==void 0&&(this.renderTarget.texture.type=s,s!==X?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e!==null&&e.outputColorSpace===O&&(this.renderTarget.texture.colorSpace=O))}},Pe=new Q,ut=class extends F{constructor(e=!0,t=!0,s=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=e,this.depth=t,this.stencil=s,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(e,t,s){this.color=e,this.depth=t,this.stencil=s}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(e){this.overrideClearColor=e}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(e){this.overrideClearAlpha=e}render(e,t,s,r,n){const a=this.overrideClearColor,i=this.overrideClearAlpha,l=e.getClearAlpha(),u=a!==null,c=i>=0;u?(e.getClearColor(Pe),e.setClearColor(a,c?i:l)):c&&e.setClearAlpha(i),e.setRenderTarget(this.renderToScreen?null:t),e.clear(this.color,this.depth,this.stencil),u?e.setClearColor(Pe,l):c&&e.setClearAlpha(l)}},Vt=class extends F{constructor(e,t){super("MaskPass",e,t),this.needsSwap=!1,this.clearPass=new ut(!1,!1,!0),this.inverse=!1}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get inverted(){return this.inverse}set inverted(e){this.inverse=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(e){this.inverted=e}render(e,t,s,r,n){const a=e.getContext(),i=e.state.buffers,l=this.scene,u=this.camera,c=this.clearPass,p=this.inverted?0:1,d=1-p;i.color.setMask(!1),i.depth.setMask(!1),i.color.setLocked(!0),i.depth.setLocked(!0),i.stencil.setTest(!0),i.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.stencil.setFunc(a.ALWAYS,p,4294967295),i.stencil.setClear(d),i.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(e,null):(c.render(e,t),c.render(e,s))),this.renderToScreen?(e.setRenderTarget(null),e.render(l,u)):(e.setRenderTarget(t),e.render(l,u),e.setRenderTarget(s),e.render(l,u)),i.color.setLocked(!1),i.depth.setLocked(!1),i.stencil.setLocked(!1),i.stencil.setFunc(a.EQUAL,1,4294967295),i.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.stencil.setLocked(!0)}},xe=1/1e3,Wt=1e3,$t=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(e){typeof document<"u"&&document.hidden!==void 0&&(e?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=e)}get delta(){return this._delta*xe}get fixedDelta(){return this._fixedDelta*xe}set fixedDelta(e){this._fixedDelta=e*Wt}get elapsed(){return this._elapsed*xe}update(e){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(e!==void 0?e:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(e){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},Kt=class{constructor(e=null,{depthBuffer:t=!0,stencilBuffer:s=!1,multisampling:r=0,frameBufferType:n}={}){this.renderer=null,this.inputBuffer=this.createBuffer(t,s,n,r),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new jt,this.depthTexture=null,this.depthRenderTarget=null,this.passes=[],this.timer=new $t,this.autoRenderToScreen=!0,this.setRenderer(e)}get multisampling(){return this.inputBuffer.samples}set multisampling(e){const t=this.inputBuffer,s=this.multisampling;s>0&&e>0?(this.inputBuffer.samples=e,this.outputBuffer.samples=e,this.inputBuffer.dispose(),this.outputBuffer.dispose()):s!==e&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(t.depthBuffer,t.stencilBuffer,t.texture.type,e),this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(e){if(this.renderer=e,e!==null){const t=e.getSize(new I),s=e.getContext().getContextAttributes().alpha,r=this.inputBuffer.texture.type;r===X&&e.outputColorSpace===O&&(this.inputBuffer.texture.colorSpace=O,this.outputBuffer.texture.colorSpace=O,this.inputBuffer.dispose(),this.outputBuffer.dispose()),e.autoClear=!1,this.setSize(t.width,t.height);for(const n of this.passes)n.initialize(e,s,r)}}replaceRenderer(e,t=!0){const s=this.renderer,r=s.domElement.parentNode;return this.setRenderer(e),t&&r!==null&&(r.removeChild(s.domElement),r.appendChild(e.domElement)),s}createDepthTexture(){const e=this.inputBuffer,t=new yt;this.depthTexture=t,e.stencilBuffer?(t.format=Mt,t.type=Rt):t.type=st;const s=t.clone();return s.name="EffectComposer.StableDepth",this.depthRenderTarget=new z(e.width,e.height,{depthBuffer:!0,stencilBuffer:e.stencilBuffer,depthTexture:s}),s}blitDepthBuffer(e){const t=this.renderer,s=this.depthRenderTarget,r=t.properties,n=t.getContext();t.setRenderTarget(s);const a=r.get(e).__webglFramebuffer,i=r.get(s).__webglFramebuffer,l=e.stencilBuffer?n.DEPTH_BUFFER_BIT|n.STENCIL_BUFFER_BIT:n.DEPTH_BUFFER_BIT;n.bindFramebuffer(n.READ_FRAMEBUFFER,a),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,i),n.blitFramebuffer(0,0,e.width,e.height,0,0,s.width,s.height,l,n.NEAREST),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),t.setRenderTarget(null)}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.depthRenderTarget.dispose(),this.depthRenderTarget=null,this.inputBuffer.depthTexture=null,this.outputBuffer.depthTexture=null;for(const e of this.passes)e.setDepthTexture(null)}}createBuffer(e,t,s,r){const n=this.renderer,a=n===null?new I:n.getDrawingBufferSize(new I),i={minFilter:fe,magFilter:fe,stencilBuffer:t,depthBuffer:e,type:s},l=new z(a.width,a.height,i);return r>0&&(l.samples=r),s===X&&n!==null&&n.outputColorSpace===O&&(l.texture.colorSpace=O),l.texture.name="EffectComposer.Buffer",l.texture.generateMipmaps=!1,l}setMainScene(e){for(const t of this.passes)t.mainScene=e}setMainCamera(e){for(const t of this.passes)t.mainCamera=e}addPass(e,t){const s=this.passes,r=this.renderer,n=r.getDrawingBufferSize(new I),a=r.getContext().getContextAttributes().alpha,i=this.inputBuffer.texture.type;if(e.renderer=r,e.setSize(n.width,n.height),e.initialize(r,a,i),this.autoRenderToScreen&&(s.length>0&&(s[s.length-1].renderToScreen=!1),e.renderToScreen&&(this.autoRenderToScreen=!1)),t!==void 0?s.splice(t,0,e):s.push(e),this.autoRenderToScreen&&(s[s.length-1].renderToScreen=!0),e.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const l=this.createDepthTexture();for(e of s)e.setDepthTexture(l)}else{const l=this.depthRenderTarget.depthTexture;e.setDepthTexture(l)}}removePass(e){const t=this.passes,s=t.indexOf(e);if(s!==-1&&t.splice(s,1).length>0){if(this.depthTexture!==null){const a=(l,u)=>l||u.needsDepthTexture;if(!t.reduce(a,!1)){const l=this.depthRenderTarget.depthTexture;e.getDepthTexture()===l&&e.setDepthTexture(null),this.deleteDepthTexture()}}this.autoRenderToScreen&&s===t.length&&(e.renderToScreen=!1,t.length>0&&(t[t.length-1].renderToScreen=!0))}}removeAllPasses(){const e=this.passes;this.deleteDepthTexture(),e.length>0&&(this.autoRenderToScreen&&(e[e.length-1].renderToScreen=!1),this.passes=[])}render(e){const t=this.renderer,s=this.copyPass;let r=this.inputBuffer,n=this.outputBuffer,a,i=!1;e===void 0&&(this.timer.update(),e=this.timer.getDelta());for(const l of this.passes)if(l.enabled){if(r.depthTexture=this.depthTexture,n.depthTexture=null,l.render(t,r,n,e,i),l.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(r),l.needsSwap){if(i){s.renderToScreen=l.renderToScreen;const u=t.getContext(),c=t.state.buffers.stencil;c.setFunc(u.NOTEQUAL,1,4294967295),s.render(t,r,n,e,i),c.setFunc(u.EQUAL,1,4294967295)}a=r,r=n,n=a}l instanceof Vt?i=!0:l instanceof Ht&&(i=!1)}}setSize(e,t,s){const r=this.renderer,n=r.getSize(new I);(e===void 0||t===void 0)&&(e=n.width,t=n.height),(n.width!==e||n.height!==t)&&r.setSize(e,t,s);const a=r.getDrawingBufferSize(new I);this.inputBuffer.setSize(a.width,a.height),this.outputBuffer.setSize(a.width,a.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(a.width,a.height);for(const i of this.passes)i.setSize(a.width,a.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const e of this.passes)e.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),F.fullscreenGeometry.dispose()}},q={NONE:0,DEPTH:1,CONVOLUTION:2},y={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},qt=class{constructor(){this.shaderParts=new Map([[y.FRAGMENT_HEAD,null],[y.FRAGMENT_MAIN_UV,null],[y.FRAGMENT_MAIN_IMAGE,null],[y.VERTEX_HEAD,null],[y.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=q.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=rt}},be=!1,Ie=class{constructor(e=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(e),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let s;if(t.material.flatShading)switch(t.material.side){case re:s=this.materialsFlatShadedDoubleSide;break;case ie:s=this.materialsFlatShadedBackSide;break;default:s=this.materialsFlatShaded;break}else switch(t.material.side){case re:s=this.materialsDoubleSide;break;case ie:s=this.materialsBackSide;break;default:s=this.materials;break}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=s[2]:t.isInstancedMesh?t.material=s[1]:t.material=s[0],++this.meshCount}}}cloneMaterial(e){if(!(e instanceof W))return e.clone();const t=e.uniforms,s=new Map;for(const n in t){const a=t[n].value;a.isRenderTargetTexture&&(t[n].value=null,s.set(n,a))}const r=e.clone();for(const n of s)t[n[0]].value=n[1],r.uniforms[n[0]].value=n[1];return r}setMaterial(e){if(this.disposeMaterials(),this.material=e,e!==null){const t=this.materials=[this.cloneMaterial(e),this.cloneMaterial(e),this.cloneMaterial(e)];for(const s of t)s.uniforms=Object.assign({},e.uniforms),s.side=Ut;t[2].skinning=!0,this.materialsBackSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.side=ie,r}),this.materialsDoubleSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.side=re,r}),this.materialsFlatShaded=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r}),this.materialsFlatShadedBackSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=ie,r}),this.materialsFlatShadedDoubleSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=re,r})}}render(e,t,s){const r=e.shadowMap.enabled;if(e.shadowMap.enabled=!1,be){const n=this.originalMaterials;this.meshCount=0,t.traverse(this.replaceMaterial),e.render(t,s);for(const a of n)a[0].material=a[1];this.meshCount!==n.size&&n.clear()}else{const n=t.overrideMaterial;t.overrideMaterial=this.material,e.render(t,s),t.overrideMaterial=n}e.shadowMap.enabled=r}disposeMaterials(){if(this.material!==null){const e=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const t of e)t.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return be}static set workaroundEnabled(e){be=e}},V=-1,N=class extends Me{constructor(e=null,t=V,s=V,r=1){super(),e!==null&&this.addEventListener("change",()=>e.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new I(1,1),this.preferredSize=new I(t,s),this.target=this.preferredSize,this.s=r,this.effectiveSize=new I,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const e=this.baseSize,t=this.preferredSize,s=this.effectiveSize,r=this.scale;t.width!==V?s.width=t.width:t.height!==V?s.width=Math.round(t.height*(e.width/Math.max(e.height,1))):s.width=Math.round(e.width*r),t.height!==V?s.height=t.height:t.width!==V?s.height=Math.round(t.width/Math.max(e.width/Math.max(e.height,1),1)):s.height=Math.round(e.height*r)}get width(){return this.effectiveSize.width}set width(e){this.preferredWidth=e}get height(){return this.effectiveSize.height}set height(e){this.preferredHeight=e}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(e){this.s!==e&&(this.s=e,this.preferredSize.setScalar(V),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(e){this.scale=e}get baseWidth(){return this.baseSize.width}set baseWidth(e){this.baseSize.width!==e&&(this.baseSize.width=e,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(e){this.baseWidth=e}get baseHeight(){return this.baseSize.height}set baseHeight(e){this.baseSize.height!==e&&(this.baseSize.height=e,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(e){this.baseHeight=e}setBaseSize(e,t){(this.baseSize.width!==e||this.baseSize.height!==t)&&(this.baseSize.set(e,t),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(e){this.preferredSize.width!==e&&(this.preferredSize.width=e,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(e){this.preferredWidth=e}get preferredHeight(){return this.preferredSize.height}set preferredHeight(e){this.preferredSize.height!==e&&(this.preferredSize.height=e,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(e){this.preferredHeight=e}setPreferredSize(e,t){(this.preferredSize.width!==e||this.preferredSize.height!==t)&&(this.preferredSize.set(e,t),this.dispatchEvent({type:"change"}))}copy(e){this.s=e.scale,this.baseSize.set(e.baseWidth,e.baseHeight),this.preferredSize.set(e.preferredWidth,e.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return V}},T={ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},Xt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Yt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",Zt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Qt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Jt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",es="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ts="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ss="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",rs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ns="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",is="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",as="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",os="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ls="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",cs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",us="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ds="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",hs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",fs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ps="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ms="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",vs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",gs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",xs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",bs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ss="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ws="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ts="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Es="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ys="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",Ms="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Rs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Bs=new Map([[T.ADD,Xt],[T.ALPHA,Yt],[T.AVERAGE,Zt],[T.COLOR,Qt],[T.COLOR_BURN,Jt],[T.COLOR_DODGE,es],[T.DARKEN,ts],[T.DIFFERENCE,ss],[T.DIVIDE,rs],[T.DST,null],[T.EXCLUSION,ns],[T.HARD_LIGHT,is],[T.HARD_MIX,as],[T.HUE,os],[T.INVERT,ls],[T.INVERT_RGB,cs],[T.LIGHTEN,us],[T.LINEAR_BURN,ds],[T.LINEAR_DODGE,hs],[T.LINEAR_LIGHT,fs],[T.LUMINOSITY,ps],[T.MULTIPLY,ms],[T.NEGATION,vs],[T.NORMAL,gs],[T.OVERLAY,xs],[T.PIN_LIGHT,bs],[T.REFLECT,Ss],[T.SATURATION,ws],[T.SCREEN,Ts],[T.SOFT_LIGHT,Es],[T.SRC,ys],[T.SUBTRACT,Ms],[T.VIVID_LIGHT,Rs]]),_s=class extends Me{constructor(e,t=1){super(),this._blendFunction=e,this.opacity=new E(t)}getOpacity(){return this.opacity.value}setOpacity(e){this.opacity.value=e}get blendFunction(){return this._blendFunction}set blendFunction(e){this._blendFunction=e,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(e){this.blendFunction=e}getShaderCode(){return Bs.get(this.blendFunction)}},me=class extends Me{constructor(e,t,{attributes:s=q.NONE,blendFunction:r=T.NORMAL,defines:n=new Map,uniforms:a=new Map,extensions:i=null,vertexShader:l=null}={}){super(),this.name=e,this.renderer=null,this.attributes=s,this.fragmentShader=t,this.vertexShader=l,this.defines=n,this.uniforms=a,this.extensions=i,this.blendMode=new _s(r),this.blendMode.addEventListener("change",u=>this.setChanged()),this._inputColorSpace=rt,this._outputColorSpace=nt}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(e){this._inputColorSpace=e,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e,this.setChanged()}set mainScene(e){}set mainCamera(e){}getName(){return this.name}setRenderer(e){this.renderer=e}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(e){this.attributes=e,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(e){this.fragmentShader=e,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(e){this.vertexShader=e,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(e,t=J){}update(e,t,s){}setSize(e,t){}initialize(e,t,s){}dispose(){for(const e of Object.keys(this)){const t=this[e];(t instanceof z||t instanceof it||t instanceof at||t instanceof F)&&this[e].dispose()}}},Re={MEDIUM:2,LARGE:3},Cs=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,Us="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",Ps=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Is=class extends W{constructor(e=new Ue){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new E(null),texelSize:new E(new Ue),scale:new E(1),kernel:new E(0)},blending:Y,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Cs,vertexShader:Us}),this.setTexelSize(e.x,e.y),this.kernelSize=Re.MEDIUM}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.inputBuffer=e}get kernelSequence(){return Ps[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(e){this.uniforms.scale.value=e}getScale(){return this.uniforms.scale.value}setScale(e){this.uniforms.scale.value=e}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(e){this.uniforms.kernel.value=e}setKernel(e){this.kernel=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t,e*.5,t*.5)}setSize(e,t){const s=1/e,r=1/t;this.uniforms.texelSize.value.set(s,r,s*.5,r*.5)}},Ds=class extends F{constructor({kernelSize:e=Re.MEDIUM,resolutionScale:t=.5,width:s=N.AUTO_SIZE,height:r=N.AUTO_SIZE,resolutionX:n=s,resolutionY:a=r}={}){super("KawaseBlurPass"),this.renderTargetA=new z(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const i=this.resolution=new N(this,n,a,t);i.addEventListener("change",l=>this.setSize(i.baseWidth,i.baseHeight)),this._blurMaterial=new Is,this._blurMaterial.kernelSize=e,this.copyMaterial=new ct}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(e){this._blurMaterial=e}get dithering(){return this.copyMaterial.dithering}set dithering(e){this.copyMaterial.dithering=e}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(e){this.blurMaterial.kernelSize=e}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get scale(){return this.blurMaterial.scale}set scale(e){this.blurMaterial.scale=e}getScale(){return this.blurMaterial.scale}setScale(e){this.blurMaterial.scale=e}getKernelSize(){return this.kernelSize}setKernelSize(e){this.kernelSize=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,s,r,n){const a=this.scene,i=this.camera,l=this.renderTargetA,u=this.renderTargetB,c=this.blurMaterial,p=c.kernelSequence;let d=t;this.fullscreenMaterial=c;for(let g=0,v=p.length;g<v;++g){const S=(g&1)===0?l:u;c.kernel=p[g],c.inputBuffer=d.texture,e.setRenderTarget(S),e.render(a,i),d=S}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=d.texture,e.setRenderTarget(this.renderToScreen?null:s),e.render(a,i)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t);const r=s.width,n=s.height;this.renderTargetA.setSize(r,n),this.renderTargetB.setSize(r,n),this.blurMaterial.setSize(e,t)}initialize(e,t,s){s!==void 0&&(this.renderTargetA.texture.type=s,this.renderTargetB.texture.type=s,s!==X?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):e!==null&&e.outputColorSpace===O&&(this.renderTargetA.texture.colorSpace=O,this.renderTargetB.texture.colorSpace=O))}static get AUTO_SIZE(){return N.AUTO_SIZE}},As=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,Os=class extends W{constructor(e=!1,t=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:ot.replace(/\D+/g,"")},uniforms:{inputBuffer:new E(null),threshold:new E(0),smoothing:new E(1),range:new E(null)},blending:Y,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:As,vertexShader:lt}),this.colorOutput=e,this.luminanceRange=t}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get threshold(){return this.uniforms.threshold.value}set threshold(e){this.smoothing>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=e}getThreshold(){return this.threshold}setThreshold(e){this.threshold=e}get smoothing(){return this.uniforms.smoothing.value}set smoothing(e){this.threshold>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=e}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(e){this.smoothing=e}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(e){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(e){e?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(e){return this.colorOutput}setColorOutputEnabled(e){this.colorOutput=e}get useRange(){return this.luminanceRange!==null}set useRange(e){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(e){e!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=e,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(e){this.luminanceRange=e}},Ns=class extends F{constructor({renderTarget:e,luminanceRange:t,colorOutput:s,resolutionScale:r=1,width:n=N.AUTO_SIZE,height:a=N.AUTO_SIZE,resolutionX:i=n,resolutionY:l=a}={}){super("LuminancePass"),this.fullscreenMaterial=new Os(s,t),this.needsSwap=!1,this.renderTarget=e,this.renderTarget===void 0&&(this.renderTarget=new z(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const u=this.resolution=new N(this,i,l,r);u.addEventListener("change",c=>this.setSize(u.baseWidth,u.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(e,t,s,r,n){const a=this.fullscreenMaterial;a.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height)}initialize(e,t,s){s!==void 0&&s!==X&&(this.renderTarget.texture.type=s,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},Fs=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,Ls="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",ks=class extends W{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new E(null),texelSize:new E(new I)},blending:Y,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Fs,vertexShader:Ls})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},zs=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,Hs="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",Gs=class extends W{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new E(null),supportBuffer:new E(null),texelSize:new E(new I),radius:new E(.85)},blending:Y,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:zs,vertexShader:Hs})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}set supportBuffer(e){this.uniforms.supportBuffer.value=e}get radius(){return this.uniforms.radius.value}set radius(e){this.uniforms.radius.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},js=class extends F{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new z(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new ks,this.upsamplingMaterial=new Gs,this.resolution=new I}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(e){if(this.levels!==e){const t=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let s=0;s<e;++s){const r=t.clone();r.texture.name="Downsampling.Mipmap"+s,this.downsamplingMipmaps.push(r)}this.upsamplingMipmaps.push(t);for(let s=1,r=e-1;s<r;++s){const n=t.clone();n.texture.name="Upsampling.Mipmap"+s,this.upsamplingMipmaps.push(n)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(e){this.upsamplingMaterial.radius=e}render(e,t,s,r,n){const{scene:a,camera:i}=this,{downsamplingMaterial:l,upsamplingMaterial:u}=this,{downsamplingMipmaps:c,upsamplingMipmaps:p}=this;let d=t;this.fullscreenMaterial=l;for(let g=0,v=c.length;g<v;++g){const S=c[g];l.setSize(d.width,d.height),l.inputBuffer=d.texture,e.setRenderTarget(S),e.render(a,i),d=S}this.fullscreenMaterial=u;for(let g=p.length-1;g>=0;--g){const v=p[g];u.setSize(d.width,d.height),u.inputBuffer=d.texture,u.supportBuffer=c[g].texture,e.setRenderTarget(v),e.render(a,i),d=v}}setSize(e,t){const s=this.resolution;s.set(e,t);let r=s.width,n=s.height;for(let a=0,i=this.downsamplingMipmaps.length;a<i;++a)r=Math.round(r*.5),n=Math.round(n*.5),this.downsamplingMipmaps[a].setSize(r,n),a<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[a].setSize(r,n)}initialize(e,t,s){if(s!==void 0){const r=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const n of r)n.texture.type=s;if(s!==X)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(e!==null&&e.outputColorSpace===O)for(const n of r)n.texture.colorSpace=O}}dispose(){super.dispose();for(const e of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))e.dispose()}},Vs=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,Ws=class extends me{constructor({blendFunction:e=T.SCREEN,luminanceThreshold:t=1,luminanceSmoothing:s=.03,mipmapBlur:r=!0,intensity:n=1,radius:a=.85,levels:i=8,kernelSize:l=Re.LARGE,resolutionScale:u=.5,width:c=N.AUTO_SIZE,height:p=N.AUTO_SIZE,resolutionX:d=c,resolutionY:g=p}={}){super("BloomEffect",Vs,{blendFunction:e,uniforms:new Map([["map",new E(null)],["intensity",new E(n)]])}),this.renderTarget=new z(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Ds({kernelSize:l}),this.luminancePass=new Ns({colorOutput:!0}),this.luminanceMaterial.threshold=t,this.luminanceMaterial.smoothing=s,this.mipmapBlurPass=new js,this.mipmapBlurPass.enabled=r,this.mipmapBlurPass.radius=a,this.mipmapBlurPass.levels=i,this.uniforms.get("map").value=r?this.mipmapBlurPass.texture:this.renderTarget.texture;const v=this.resolution=new N(this,d,g,u);v.addEventListener("change",S=>this.setSize(v.baseWidth,v.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get dithering(){return this.blurPass.dithering}set dithering(e){this.blurPass.dithering=e}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(e){this.blurPass.kernelSize=e}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(e){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(e){this.uniforms.get("intensity").value=e}getIntensity(){return this.intensity}setIntensity(e){this.intensity=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}update(e,t,s){const r=this.renderTarget,n=this.luminancePass;n.enabled?(n.render(e,t),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,n.renderTarget):this.blurPass.render(e,n.renderTarget,r)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,t):this.blurPass.render(e,t,r)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height),this.blurPass.resolution.copy(s),this.luminancePass.setSize(e,t),this.mipmapBlurPass.setSize(e,t)}initialize(e,t,s){this.blurPass.initialize(e,t,s),this.luminancePass.initialize(e,t,s),this.mipmapBlurPass.initialize(e,t,s),s!==void 0&&(this.renderTarget.texture.type=s,e!==null&&e.outputColorSpace===O&&(this.renderTarget.texture.colorSpace=O))}},dt=class extends F{constructor(e,t,s=null){super("RenderPass",e,t),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new ut,this.overrideMaterialManager=s===null?null:new Ie(s),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get renderToScreen(){return super.renderToScreen}set renderToScreen(e){super.renderToScreen=e,this.clearPass.renderToScreen=e}get overrideMaterial(){const e=this.overrideMaterialManager;return e!==null?e.material:null}set overrideMaterial(e){const t=this.overrideMaterialManager;e!==null?t!==null?t.setMaterial(e):this.overrideMaterialManager=new Ie(e):t!==null&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(e){this.overrideMaterial=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getSelection(){return this.selection}setSelection(e){this.selection=e}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(e){this.ignoreBackground=e}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(e){this.skipShadowMapUpdate=e}getClearPass(){return this.clearPass}render(e,t,s,r,n){const a=this.scene,i=this.camera,l=this.selection,u=i.layers.mask,c=a.background,p=e.shadowMap.autoUpdate,d=this.renderToScreen?null:t;l!==null&&i.layers.set(l.getLayer()),this.skipShadowMapUpdate&&(e.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(a.background=null),this.clearPass.enabled&&this.clearPass.render(e,t),e.setRenderTarget(d),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(e,a,i):e.render(a,i),i.layers.mask=u,a.background=c,e.shadowMap.autoUpdate=p}},te={DEFAULT:0,ESKIL:1},$s=`#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
#ifdef DOWNSAMPLE_NORMALS
uniform lowp sampler2D normalBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}int findBestDepth(const in float samples[4]){float c=(samples[0]+samples[1]+samples[2]+samples[3])*0.25;float distances[4];distances[0]=abs(c-samples[0]);distances[1]=abs(c-samples[1]);distances[2]=abs(c-samples[2]);distances[3]=abs(c-samples[3]);float maxDistance=max(max(distances[0],distances[1]),max(distances[2],distances[3]));int remaining[3];int rejected[3];int i,j,k;for(i=0,j=0,k=0;i<4;++i){if(distances[i]<maxDistance){remaining[j++]=i;}else{rejected[k++]=i;}}for(;j<3;++j){remaining[j]=rejected[--k];}vec3 s=vec3(samples[remaining[0]],samples[remaining[1]],samples[remaining[2]]);c=(s.x+s.y+s.z)/3.0;distances[0]=abs(c-s.x);distances[1]=abs(c-s.y);distances[2]=abs(c-s.z);float minDistance=min(distances[0],min(distances[1],distances[2]));for(i=0;i<3;++i){if(distances[i]==minDistance){break;}}return remaining[i];}void main(){float d[4];d[0]=readDepth(vUv0);d[1]=readDepth(vUv1);d[2]=readDepth(vUv2);d[3]=readDepth(vUv3);int index=findBestDepth(d);
#ifdef DOWNSAMPLE_NORMALS
vec3 n[4];n[0]=texture2D(normalBuffer,vUv0).rgb;n[1]=texture2D(normalBuffer,vUv1).rgb;n[2]=texture2D(normalBuffer,vUv2).rgb;n[3]=texture2D(normalBuffer,vUv3).rgb;
#else
vec3 n[4];n[0]=vec3(0.0);n[1]=vec3(0.0);n[2]=vec3(0.0);n[3]=vec3(0.0);
#endif
gl_FragColor=vec4(n[index],d[index]);}`,Ks="uniform vec2 texelSize;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vUv0=uv;vUv1=vec2(uv.x,uv.y+texelSize.y);vUv2=vec2(uv.x+texelSize.x,uv.y);vUv3=uv+texelSize;gl_Position=vec4(position.xy,1.0,1.0);}",qs=class extends W{constructor(){super({name:"DepthDownsamplingMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new E(null),normalBuffer:new E(null),texelSize:new E(new I)},blending:Y,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:$s,vertexShader:Ks})}set depthBuffer(e){this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=J){this.depthBuffer=e,this.depthPacking=t}set normalBuffer(e){this.uniforms.normalBuffer.value=e,e!==null?this.defines.DOWNSAMPLE_NORMALS="1":delete this.defines.DOWNSAMPLE_NORMALS,this.needsUpdate=!0}setNormalBuffer(e){this.normalBuffer=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t)}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},Xs=class extends F{constructor({normalBuffer:e=null,resolutionScale:t=.5,width:s=N.AUTO_SIZE,height:r=N.AUTO_SIZE,resolutionX:n=s,resolutionY:a=r}={}){super("DepthDownsamplingPass");const i=new qs;i.normalBuffer=e,this.fullscreenMaterial=i,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new z(1,1,{minFilter:pe,magFilter:pe,depthBuffer:!1,type:st}),this.renderTarget.texture.name="DepthDownsamplingPass.Target",this.renderTarget.texture.generateMipmaps=!1;const l=this.resolution=new N(this,n,a,t);l.addEventListener("change",u=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}setDepthTexture(e,t=J){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t}render(e,t,s,r,n){e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height),this.fullscreenMaterial.setSize(e,t)}initialize(e,t,s){const r=e.getContext();if(!(r.getExtension("EXT_color_buffer_float")||r.getExtension("EXT_color_buffer_half_float")))throw new Error("Rendering to float texture is not supported.")}},Ys=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,Zs=class extends me{constructor({blendFunction:e,eskil:t=!1,technique:s=t?te.ESKIL:te.DEFAULT,offset:r=.5,darkness:n=.5}={}){super("VignetteEffect",Ys,{blendFunction:e,defines:new Map([["VIGNETTE_TECHNIQUE",s.toFixed(0)]]),uniforms:new Map([["offset",new E(r)],["darkness",new E(n)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(e){this.technique!==e&&(this.defines.set("VIGNETTE_TECHNIQUE",e.toFixed(0)),this.setChanged())}get eskil(){return this.technique===te.ESKIL}set eskil(e){this.technique=e?te.ESKIL:te.DEFAULT}getTechnique(){return this.technique}setTechnique(e){this.technique=e}get offset(){return this.uniforms.get("offset").value}set offset(e){this.uniforms.get("offset").value=e}getOffset(){return this.offset}setOffset(e){this.offset=e}get darkness(){return this.uniforms.get("darkness").value}set darkness(e){this.uniforms.get("darkness").value=e}getDarkness(){return this.darkness}setDarkness(e){this.darkness=e}},Qs=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,Js="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",er=class extends W{constructor(e,t,s,r,n=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:ot.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new E(null),depthBuffer:new E(null),resolution:new E(new I),texelSize:new E(new I),cameraNear:new E(.3),cameraFar:new E(1e3),aspect:new E(1),time:new E(0)},blending:Y,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:n}),e&&this.setShaderParts(e),t&&this.setDefines(t),s&&this.setUniforms(s),this.copyCameraSettings(r)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=J){this.depthBuffer=e,this.depthPacking=t}setShaderData(e){this.setShaderParts(e.shaderParts),this.setDefines(e.defines),this.setUniforms(e.uniforms),this.setExtensions(e.extensions)}setShaderParts(e){return this.fragmentShader=Qs.replace(y.FRAGMENT_HEAD,e.get(y.FRAGMENT_HEAD)||"").replace(y.FRAGMENT_MAIN_UV,e.get(y.FRAGMENT_MAIN_UV)||"").replace(y.FRAGMENT_MAIN_IMAGE,e.get(y.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=Js.replace(y.VERTEX_HEAD,e.get(y.VERTEX_HEAD)||"").replace(y.VERTEX_MAIN_SUPPORT,e.get(y.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(e){for(const t of e.entries())this.defines[t[0]]=t[1];return this.needsUpdate=!0,this}setUniforms(e){for(const t of e.entries())this.uniforms[t[0]]=t[1];return this}setExtensions(e){this.extensions={};for(const t of e)this.extensions[t]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(e){this.encodeOutput!==e&&(e?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(e){return this.encodeOutput}setOutputEncodingEnabled(e){this.encodeOutput=e}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}setDeltaTime(e){this.uniforms.time.value+=e}adoptCameraSettings(e){this.copyCameraSettings(e)}copyCameraSettings(e){e&&(this.uniforms.cameraNear.value=e.near,this.uniforms.cameraFar.value=e.far,e instanceof Pt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(e,t){const s=this.uniforms;s.resolution.value.set(e,t),s.texelSize.value.set(1/e,1/t),s.aspect.value=e/t}static get Section(){return y}};function De(e,t,s){for(const r of t){const n="$1"+e+r.charAt(0).toUpperCase()+r.slice(1),a=new RegExp("([^\\.])(\\b"+r+"\\b)","g");for(const i of s.entries())i[1]!==null&&s.set(i[0],i[1].replace(a,n))}}function tr(e,t,s){let r=t.getFragmentShader(),n=t.getVertexShader();const a=r!==void 0&&/mainImage/.test(r),i=r!==void 0&&/mainUv/.test(r);if(s.attributes|=t.getAttributes(),r===void 0)throw new Error(`Missing fragment shader (${t.name})`);if(i&&(s.attributes&q.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${t.name})`);if(!a&&!i)throw new Error(`Could not find mainImage or mainUv function (${t.name})`);{const l=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,u=s.shaderParts;let c=u.get(y.FRAGMENT_HEAD)||"",p=u.get(y.FRAGMENT_MAIN_UV)||"",d=u.get(y.FRAGMENT_MAIN_IMAGE)||"",g=u.get(y.VERTEX_HEAD)||"",v=u.get(y.VERTEX_MAIN_SUPPORT)||"";const S=new Set,x=new Set;if(i&&(p+=`	${e}MainUv(UV);
`,s.uvTransformation=!0),n!==null&&/mainSupport/.test(n)){const m=/mainSupport *\([\w\s]*?uv\s*?\)/.test(n);v+=`	${e}MainSupport(`,v+=m?`vUv);
`:`);
`;for(const b of n.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const M of b[1].split(/\s*,\s*/))s.varyings.add(M),S.add(M),x.add(M);for(const b of n.matchAll(l))x.add(b[1])}for(const m of r.matchAll(l))x.add(m[1]);for(const m of t.defines.keys())x.add(m.replace(/\([\w\s,]*\)/g,""));for(const m of t.uniforms.keys())x.add(m);x.delete("while"),x.delete("for"),x.delete("if"),t.uniforms.forEach((m,b)=>s.uniforms.set(e+b.charAt(0).toUpperCase()+b.slice(1),m)),t.defines.forEach((m,b)=>s.defines.set(e+b.charAt(0).toUpperCase()+b.slice(1),m));const w=new Map([["fragment",r],["vertex",n]]);De(e,x,s.defines),De(e,x,w),r=w.get("fragment"),n=w.get("vertex");const h=t.blendMode;if(s.blendModes.set(h.blendFunction,h),a){t.inputColorSpace!==null&&t.inputColorSpace!==s.colorSpace&&(d+=t.inputColorSpace===O?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),t.outputColorSpace!==nt?s.colorSpace=t.outputColorSpace:t.inputColorSpace!==null&&(s.colorSpace=t.inputColorSpace);const m=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;d+=`${e}MainImage(color0, UV, `,(s.attributes&q.DEPTH)!==0&&m.test(r)&&(d+="depth, ",s.readDepth=!0),d+=`color1);
	`;const b=e+"BlendOpacity";s.uniforms.set(b,h.opacity),d+=`color0 = blend${h.blendFunction}(color0, color1, ${b});

	`,c+=`uniform float ${b};

`}if(c+=r+`
`,n!==null&&(g+=n+`
`),u.set(y.FRAGMENT_HEAD,c),u.set(y.FRAGMENT_MAIN_UV,p),u.set(y.FRAGMENT_MAIN_IMAGE,d),u.set(y.VERTEX_HEAD,g),u.set(y.VERTEX_MAIN_SUPPORT,v),t.extensions!==null)for(const m of t.extensions)s.extensions.add(m)}}var sr=class extends F{constructor(e,...t){super("EffectPass"),this.fullscreenMaterial=new er(null,null,null,e),this.listener=s=>this.handleEvent(s),this.effects=[],this.setEffects(t),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(e){for(const t of this.effects)t.mainScene=e}set mainCamera(e){this.fullscreenMaterial.copyCameraSettings(e);for(const t of this.effects)t.mainCamera=e}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(e){this.fullscreenMaterial.encodeOutput=e}get dithering(){return this.fullscreenMaterial.dithering}set dithering(e){const t=this.fullscreenMaterial;t.dithering=e,t.needsUpdate=!0}setEffects(e){for(const t of this.effects)t.removeEventListener("change",this.listener);this.effects=e.sort((t,s)=>s.attributes-t.attributes);for(const t of this.effects)t.addEventListener("change",this.listener)}updateMaterial(){const e=new qt;let t=0;for(const i of this.effects)if(i.blendMode.blendFunction===T.DST)e.attributes|=i.getAttributes()&q.DEPTH;else{if((e.attributes&i.getAttributes()&q.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${i.name})`);tr("e"+t++,i,e)}let s=e.shaderParts.get(y.FRAGMENT_HEAD),r=e.shaderParts.get(y.FRAGMENT_MAIN_IMAGE),n=e.shaderParts.get(y.FRAGMENT_MAIN_UV);const a=/\bblend\b/g;for(const i of e.blendModes.values())s+=i.getShaderCode().replace(a,`blend${i.blendFunction}`)+`
`;(e.attributes&q.DEPTH)!==0?(e.readDepth&&(r=`float depth = readDepth(UV);

	`+r),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,e.colorSpace===O&&(r+=`color0 = sRGBToLinear(color0);
	`),e.uvTransformation?(n=`vec2 transformedUv = vUv;
`+n,e.defines.set("UV","transformedUv")):e.defines.set("UV","vUv"),e.shaderParts.set(y.FRAGMENT_HEAD,s),e.shaderParts.set(y.FRAGMENT_MAIN_IMAGE,r),e.shaderParts.set(y.FRAGMENT_MAIN_UV,n);for(const[i,l]of e.shaderParts)l!==null&&e.shaderParts.set(i,l.trim().replace(/^#/,`
#`));this.skipRendering=t===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(e)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(e,t=J){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t;for(const s of this.effects)s.setDepthTexture(e,t)}render(e,t,s,r,n){for(const a of this.effects)a.update(e,t,r);if(!this.skipRendering||this.renderToScreen){const a=this.fullscreenMaterial;a.inputBuffer=t.texture,a.time+=r*this.timeScale,e.setRenderTarget(this.renderToScreen?null:s),e.render(this.scene,this.camera)}}setSize(e,t){this.fullscreenMaterial.setSize(e,t);for(const s of this.effects)s.setSize(e,t)}initialize(e,t,s){this.renderer=e;for(const r of this.effects)r.initialize(e,t,s);this.updateMaterial(),s!==void 0&&s!==X&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const e of this.effects)e.removeEventListener("change",this.listener),e.dispose()}handleEvent(e){switch(e.type){case"change":this.recompile();break}}},rr=class extends F{constructor(e,t,{renderTarget:s,resolutionScale:r=1,width:n=N.AUTO_SIZE,height:a=N.AUTO_SIZE,resolutionX:i=n,resolutionY:l=a}={}){super("NormalPass"),this.needsSwap=!1,this.renderPass=new dt(e,t,new Bt);const u=this.renderPass;u.ignoreBackground=!0,u.skipShadowMapUpdate=!0;const c=u.getClearPass();c.overrideClearColor=new Q(7829503),c.overrideClearAlpha=1,this.renderTarget=s,this.renderTarget===void 0&&(this.renderTarget=new z(1,1,{minFilter:pe,magFilter:pe}),this.renderTarget.texture.name="NormalPass.Target");const p=this.resolution=new N(this,i,l,r);p.addEventListener("change",d=>this.setSize(p.baseWidth,p.baseHeight))}set mainScene(e){this.renderPass.mainScene=e}set mainCamera(e){this.renderPass.mainCamera=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,s,r,n){const a=this.renderToScreen?null:this.renderTarget;this.renderPass.render(e,a,a)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height)}};function ne(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}new I;new I;function ht(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var k=function e(t,s,r){var n=this;ht(this,e),ne(this,"dot2",function(a,i){return n.x*a+n.y*i}),ne(this,"dot3",function(a,i,l){return n.x*a+n.y*i+n.z*l}),this.x=t,this.y=s,this.z=r},nr=[new k(1,1,0),new k(-1,1,0),new k(1,-1,0),new k(-1,-1,0),new k(1,0,1),new k(-1,0,1),new k(1,0,-1),new k(-1,0,-1),new k(0,1,1),new k(0,-1,1),new k(0,1,-1),new k(0,-1,-1)],Ae=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],Oe=new Array(512),Ne=new Array(512),ir=function(t){t>0&&t<1&&(t*=65536),t=Math.floor(t),t<256&&(t|=t<<8);for(var s=0;s<256;s++){var r;s&1?r=Ae[s]^t&255:r=Ae[s]^t>>8&255,Oe[s]=Oe[s+256]=r,Ne[s]=Ne[s+256]=nr[r%12]}};ir(0);function ar(e){if(typeof e=="number")e=Math.abs(e);else if(typeof e=="string"){var t=e;e=0;for(var s=0;s<t.length;s++)e=(e+(s+1)*(t.charCodeAt(s)%96))%2147483647}return e===0&&(e=311),e}function Fe(e){var t=ar(e);return function(){var s=t*48271%2147483647;return t=s,s/2147483647}}var or=function e(t){var s=this;ht(this,e),ne(this,"seed",0),ne(this,"init",function(r){s.seed=r,s.value=Fe(r)}),ne(this,"value",Fe(this.seed)),this.init(t)};new or(Math.random());const lr=f.createContext(null),Le=e=>(e.getAttributes()&2)===2,cr=f.memo(f.forwardRef(({children:e,camera:t,scene:s,resolutionScale:r,enabled:n=!0,renderPriority:a=1,autoClear:i=!0,depthBuffer:l,enableNormalPass:u,stencilBuffer:c,multisampling:p=8,frameBufferType:d=At},g)=>{const{gl:v,scene:S,camera:x,size:w}=tt(),h=s||S,m=t||x,[b,M,B]=f.useMemo(()=>{const R=new Kt(v,{depthBuffer:l,stencilBuffer:c,multisampling:p,frameBufferType:d});R.addPass(new dt(h,m));let j=null,L=null;return u&&(L=new rr(h,m),L.enabled=!1,R.addPass(L),r!==void 0&&(j=new Xs({normalBuffer:L.texture,resolutionScale:r}),j.enabled=!1,R.addPass(j))),[R,L,j]},[m,v,l,c,p,d,h,u,r]);f.useEffect(()=>b?.setSize(w.width,w.height),[b,w]),H((R,j)=>{if(n){const L=v.autoClear;v.autoClear=i,c&&!i&&v.clearStencil(),b.render(j),v.autoClear=L}},n?a:0);const D=f.useRef(null);f.useLayoutEffect(()=>{const R=[],j=D.current.__r3f;if(j&&b){const L=j.children;for(let $=0;$<L.length;$++){const ee=L[$].object;if(ee instanceof me){const Be=[ee];if(!Le(ee)){let ge=null;for(;(ge=L[$+1]?.object)instanceof me&&!Le(ge);)Be.push(ge),$++}const gt=new sr(m,...Be);R.push(gt)}else ee instanceof F&&R.push(ee)}for(const $ of R)b?.addPass($);M&&(M.enabled=!0),B&&(B.enabled=!0)}return()=>{for(const L of R)b?.removePass(L);M&&(M.enabled=!1),B&&(B.enabled=!1)}},[b,e,m,M,B]),f.useEffect(()=>{const R=v.toneMapping;return v.toneMapping=Ot,()=>{v.toneMapping=R}},[v]);const A=f.useMemo(()=>({composer:b,normalPass:M,downSamplingPass:B,resolutionScale:r,camera:m,scene:h}),[b,M,B,r,m,h]);return f.useImperativeHandle(g,()=>b,[b]),o.jsx(lr.Provider,{value:A,children:o.jsx("group",{ref:D,children:e})})}));let ur=0;const ke=new WeakMap,ft=(e,t)=>function({blendFunction:s=t?.blendFunction,opacity:r=t?.opacity,...n}){let a=ke.get(e);if(!a){const u=`@react-three/postprocessing/${e.name}-${ur++}`;Tt({[u]:e}),ke.set(e,a=u)}const i=tt(u=>u.camera),l=U.useMemo(()=>[...t?.args??[],...n.args??[{...t,...n}]],[JSON.stringify(n)]);return o.jsx(a,{camera:i,"blendMode-blendFunction":s,"blendMode-opacity-value":r,...n,args:l})},dr=ft(Ws,{blendFunction:0}),hr=ft(Zs),pt=f.createContext(null);function G(){const e=f.useContext(pt);if(!e)throw new Error("useScrollProgress must be used within ScrollProgressProvider");return e}const ze=new Q(1,1,1),fr=.42,He=.015,Ge=.6,je=1.42,Ve=3.05,ae=new Q;function We(e,t,s,r){const n=Math.max(1e-4,s-t);e.r=Math.pow(_.clamp((e.r-t)/n,0,1),r),e.g=Math.pow(_.clamp((e.g-t)/n,0,1),r),e.b=Math.pow(_.clamp((e.b-t)/n,0,1),r)}function $e(e,t){e.r=_.clamp((e.r-.5)*t+.5,0,1),e.g=_.clamp((e.g-.5)*t+.5,0,1),e.b=_.clamp((e.b-.5)*t+.5,0,1)}function pr({...e}){const{scene:t}=ve("/models/vstar.glb"),{sceneRefs:s}=G(),r=f.useRef([]),n=f.useRef(-1);return f.useEffect(()=>{const a=[];t.traverse(i=>{if(i.isMesh&&i.material){const l=i.material;l.userData.velosteBasePrepared||(l.color&&(l.color.multiplyScalar(.76*fr),We(l.color,He,Ge,je),$e(l.color,Ve)),"metalness"in l&&(l.metalness=.78),"roughness"in l&&(l.roughness=.38),l.envMapIntensity=.78,l.normalScale&&l.normalScale.set(1,1),l.emissive=new Q("#ffffff"),l.emissiveIntensity=0,l.toneMapped=!0,l.userData.baseColor=l.color?.clone?.()??new Q("#808080"),l.userData.baseMetalness=l.metalness,l.userData.baseRoughness=l.roughness,l.userData.baseEnvMapIntensity=l.envMapIntensity??1,l.userData.baseToneMapped=l.toneMapped,l.userData.velosteBasePrepared=!0),a.push(l)}}),r.current=a},[t]),H(()=>{const a=_.clamp(s.glow.current,0,1);for(const i of r.current){const l=i.userData.baseColor,u=i.userData.baseMetalness??.78,c=i.userData.baseRoughness??.38,p=i.userData.baseEnvMapIntensity??.78,d=i.userData.baseToneMapped??!0;if(a<=0){l&&i.color.copy(l),i.toneMapped=d,i.emissive.setRGB(1,1,1),i.emissiveIntensity=0,i.metalness=u,i.roughness=c,i.envMapIntensity=p;continue}if(Math.abs(a-n.current)<1e-4)continue;const g=1+a*4.35,v=a*12.5;i.toneMapped=d,a>=.98?i.color.copy(ze):l&&(ae.copy(l).multiplyScalar(g),We(ae,Math.max(0,He-a*.11),Math.max(.48,Ge-a*.06),Math.max(.58,je-a*.12)),$e(ae,Ve+a*.24),i.color.copy(ae).lerp(ze,a)),i.emissive.setRGB(1,1,1),i.emissiveIntensity=v,i.metalness=_.clamp(u-a*.42,0,1),i.roughness=_.clamp(c-a*.12,.08,1),i.envMapIntensity=p+a*2.45}n.current=a}),o.jsx("primitive",{object:t,...e})}ve.preload("/models/vstar.glb");function mr(e){const{scene:t}=ve("/models/vstar.glb"),{sceneRefs:s}=G(),r=f.useRef(-1),{haloGroup:n,materials:a}=f.useMemo(()=>{const i=new Nt,l=t.clone(!0),u=[];return l.traverse(c=>{const p=c;if(!p.isMesh)return;const d=new Ft({color:16777215,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1,blending:Lt});p.material=d,u.push(d)}),i.add(l),{haloGroup:i,materials:u}},[t]);return H(()=>{const i=_.clamp(s.glow.current,0,1);if(Math.abs(i-r.current)<.02&&i>0&&i<1)return;r.current=i;const l=1+i*.045;n.scale.setScalar(l),n.visible=i>.04;const u=i*.1;for(const c of a)c.opacity=u}),o.jsx("primitive",{object:n,rotation:e.rotation})}ve.preload("/models/vstar.glb");const Ke=.15,vr=1.5,gr=1.6,xr=.55;function qe({side:e,pos:t,worldZOfGroup:s,startOpacity:r}){const{pRef:n}=G(),a=f.useRef(null),i=f.useRef(null),l=f.useRef(1),u=f.useRef(-1);H(({viewport:p,camera:d})=>{const g=n.current,v=B=>_.clamp((B-Ke)/(1-Ke),0,1),S=e==="right"?Math.max(0,g):Math.max(0,-g),x=Math.pow(v(S),vr),w=Math.pow(x,gr);if(Math.abs(w-u.current)<.004&&a.current?.visible)return;u.current=w;const h=p.getCurrentViewport(d,[0,0,s]);l.current=Math.max(h.width,h.height)/1.5;const m=.1,b=Math.pow(w,xr),M=m*Math.pow(l.current/m,b);a.current&&(a.current.visible=w>.008,a.current.scale.setScalar(M)),i.current&&(i.current.opacity=_.lerp(r,1,w))});const c=e==="right"?-Math.abs(t.x):+Math.abs(t.x);return o.jsx(xt,{position:[c,t.y,t.z],follow:!0,children:o.jsxs("mesh",{ref:a,scale:.1,renderOrder:10,children:[o.jsx("circleGeometry",{args:[1,48]}),o.jsx("meshBasicMaterial",{ref:i,color:"#ffffff",transparent:!0,opacity:r,depthTest:!1,depthWrite:!1,side:re,toneMapped:!1})]})})}function br({groupWorldZ:e=1}){return o.jsxs(o.Fragment,{children:[o.jsx(qe,{side:"left",pos:{x:6,y:.22,z:0},worldZOfGroup:e,startOpacity:.6}),o.jsx(qe,{side:"right",pos:{x:5.8,y:.22,z:0},worldZOfGroup:e,startOpacity:.8})]})}const Sr="max(12vh, calc(env(safe-area-inset-top, 0px) + 84px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",oe=8,wr=1240,Se="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",we="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",le="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace",Tr=[{id:"intro",eyebrow:"Calgary-first. Built custom.",title:"Calgary web developer for lead-generating websites.",body:"Veloste is a Calgary web developer and design studio building custom websites, motion-led interfaces, and immersive 3D experiences for businesses across Canada and the United States."},{id:"services",eyebrow:"Strategy, design, code.",title:"Custom websites built to convert.",body:"For teams that need more than a theme: clean structure, conversion-focused UX, strong visual systems, and code your team can iterate with confidence."},{id:"work",eyebrow:"For teams with momentum.",title:"Built for teams that need clarity and momentum.",body:"Veloste works with Calgary small businesses and founder-led teams - local service businesses that need qualified leads, teams replacing dated websites that do not explain value clearly, and businesses launching new offers that need a conversion-ready web presence quickly."},{id:"team",eyebrow:"Clear scope. Fast iteration.",title:"Discovery through launch, with clear scope.",body:"Every project starts with discovery: goals, audience, constraints, and conversion path. From there we shape structure and art direction, build with responsive QA and performance tuning, then support launch and post-launch iteration. Calgary-first delivery, with support across Airdrie, Cochrane, Okotoks, and Chestermere."}],Er=[{title:"Brand-led website design and development",body:"Positioning, UX, visual systems, and implementation shaped around the offer."},{title:"Interaction and motion system design",body:"Motion that clarifies the experience instead of decorating around it."},{title:"Immersive 3D web experiences",body:"Real-time interfaces for teams that need a distinctive first impression."}],yr=["Custom builds","Conversion-focused UX","Motion-led interfaces"],Mr=["Local service businesses that need qualified leads.","Teams replacing dated sites that no longer explain their value.","Founders launching new offers that need a focused web presence quickly."],Rr=["Discovery","Structure","Art direction","Build and launch"];function Br({active:e}){const t=U.useRef(null),s=U.useRef(null),r=U.useRef(!1),[n,a]=U.useState(!1),[i,l]=U.useState(!1);U.useEffect(()=>{const c=window.matchMedia("(prefers-reduced-motion: reduce)");l(c.matches);const p=()=>l(c.matches);return c.addEventListener("change",p),()=>c.removeEventListener("change",p)},[]);const u=U.useCallback(()=>{const c=t.current;c&&a(c.scrollHeight-c.clientHeight>2)},[]);return f.useLayoutEffect(()=>{e&&u()},[e,u]),U.useEffect(()=>{u();let c=null;return typeof ResizeObserver<"u"&&(c=new ResizeObserver(u),t.current&&c.observe(t.current)),window.addEventListener("resize",u),()=>{c?.disconnect(),window.removeEventListener("resize",u)}},[u]),U.useEffect(()=>{const c=t.current;e&&!r.current&&c&&(c.scrollTo({top:0,behavior:"auto"}),u()),r.current=e},[e,u]),o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .about-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.28) transparent;
          scroll-snap-type: y proximity;
          scroll-padding-top: max(12vh, calc(env(safe-area-inset-top, 0px) + 84px));
        }
        .about-scroll::-webkit-scrollbar { width: 6px; }
        .about-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.25);
          border-radius: 999px;
        }
        .about-shell {
          width: min(100%, ${wr}px);
          margin: 0 auto;
          display: grid;
          gap: clamp(96px, 18vh, 190px);
          padding-bottom: clamp(88px, 16vh, 170px);
          color: #000;
        }
        .about-block {
          min-height: min(86vh, 940px);
          scroll-snap-align: start;
          display: grid;
          grid-template-columns: minmax(76px, 0.18fr) minmax(0, 1fr);
          gap: clamp(18px, 4vw, 68px);
          align-items: center;
        }
        // .about-rail {
        //   align-self: stretch;
        //   display: block;
        //   padding: clamp(6px, 1vw, 12px) 0;
        //   border-left: 1px solid rgba(0, 0, 0, 0.16);
        // }
        .about-content {
          width: min(100%, 70rem);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(260px, 0.72fr);
          gap: clamp(24px, 5.6vw, 76px);
          align-items: start;
        }
        .about-heading {
          min-width: 0;
        }
        .about-eyebrow {
          margin: 0 0 clamp(12px, 1.7vw, 20px);
          font-family: ${le};
          font-size: clamp(10px, 0.9vw, 12px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.55);
        }
        .about-title {
          margin: 0;
          font-family: ${Se};
          font-size: clamp(42px, 8.4vw, 118px);
          line-height: 0.88;
          letter-spacing: 0.01em;
          color: #000;
          max-width: 11.5ch;
        }
        .about-support {
          min-width: 0;
          display: grid;
          gap: clamp(18px, 2.6vw, 30px);
        }
        .about-body {
          margin: 0;
          font-family: ${we};
          font-size: clamp(15px, 1.45vw, 20px);
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.78);
          max-width: 54ch;
        }
        .about-signals {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        .about-signal {
          min-height: 72px;
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-left: 1px solid rgba(0, 0, 0, 0.14);
          font-family: ${le};
          font-size: clamp(10px, 0.95vw, 12px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.72);
        }
        .about-signal:first-child {
          border-left: 0;
        }
        .about-case-link {
          appearance: none;
          width: fit-content;
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 20px;
          border: 1px solid rgba(0, 0, 0, 0.32);
          border-radius: 999px;
          font-family: ${le};
          font-size: clamp(10px, 0.92vw, 12px);
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #000;
          background: transparent;
          cursor: pointer;
          transition:
            background-color 180ms ease,
            color 180ms ease,
            border-color 180ms ease;
        }
        .about-case-link:hover,
        .about-case-link:focus-visible {
          background: #000;
          border-color: #000;
          color: #fff;
          text-decoration: none;
          outline: none;
        }
        .about-services {
          grid-column: 1 / -1;
          margin: clamp(10px, 1.4vw, 16px) 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
        }
        .about-services li {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(240px, 0.7fr);
          gap: clamp(18px, 3vw, 44px);
          padding: clamp(18px, 2.4vw, 28px) 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        }
        .about-service-title {
          margin: 0;
          font-family: ${Se};
          font-size: clamp(28px, 4.7vw, 68px);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: #000;
        }
        .about-service-body {
          margin: 0;
          align-self: center;
          font-family: ${we};
          font-size: clamp(14px, 1.24vw, 17px);
          line-height: 1.55;
          color: rgba(0, 0, 0, 0.66);
        }
        .about-fit-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
        }
        .about-fit-list li {
          padding: 16px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.14);
          font-family: ${we};
          font-size: clamp(14px, 1.26vw, 18px);
          line-height: 1.55;
          color: rgba(0, 0, 0, 0.72);
        }
        .about-process {
          margin: 0;
          padding: 0;
          list-style: none;
          display: block;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
        }
        .about-process li {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: clamp(14px, 2vw, 24px);
          align-items: baseline;
          padding: clamp(12px, 1.8vw, 18px) 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        }
        .about-process-num {
          font-family: ${le};
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(0, 0, 0, 0.4);
        }
        .about-process-name {
          font-family: ${Se};
          font-size: clamp(30px, 4vw, 58px);
          line-height: 0.9;
          color: #000;
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
            gap: 18px;
            align-items: start;
          }
          .about-rail {
            min-height: 0;
            border-left: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            padding: 14px 0 0;
          }
          .about-content {
            grid-template-columns: minmax(0, 1fr);
            gap: clamp(18px, 5vw, 34px);
            align-items: start;
          }
          .about-title {
            max-width: 11ch;
          }
          .about-signals {
            grid-template-columns: minmax(0, 1fr);
          }
          .about-signal {
            min-height: 52px;
            border-left: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            padding-left: 0;
          }
          .about-signal:first-child {
            border-top: 0;
          }
          .about-services li {
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
      `}),o.jsx("div",{style:{position:"relative",display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"transparent",color:"#000",pointerEvents:e?"auto":"none",overflow:"hidden"},children:o.jsxs("div",{ref:t,className:"about-scroll",style:{flex:1,height:"100%",width:"100%",overflowY:e?"auto":"hidden",WebkitOverflowScrolling:e?"touch":"auto",overscrollBehavior:e?"contain":"auto",touchAction:e?"auto":"none",padding:Sr},onWheel:c=>{if(!e)return;const p=t.current;if(!p)return;const{scrollTop:d,scrollHeight:g,clientHeight:v}=p,S=d<=oe,x=d+v>=g-oe;S&&c.deltaY<0||x&&c.deltaY>0||c.stopPropagation()},onTouchStart:c=>{!e||c.touches.length!==1||(s.current=c.touches[0].clientY)},onTouchEnd:()=>{s.current=null},onTouchMoveCapture:c=>{if(!e||!n||c.touches.length!==1)return;const p=c.touches[0].clientY,d=s.current;if(d===null)return;const g=d-p;s.current=p;const v=t.current;if(!v)return;const{scrollTop:S,scrollHeight:x,clientHeight:w}=v,h=S<=oe,m=S+w>=x-oe;h&&g<0||m&&g>0||c.stopPropagation()},onPointerDownCapture:c=>{e&&c.stopPropagation()},children:[o.jsx("div",{className:"about-shell",children:Tr.map((c,p)=>o.jsxs("section",{className:`about-block about-block--${c.id} about-reveal`,style:{animationDelay:i?"0ms":`${p*70}ms`},"aria-label":c.title,children:[o.jsx("aside",{className:"about-rail","aria-hidden":!0}),o.jsxs("div",{className:"about-content",children:[o.jsx("div",{className:"about-heading",children:o.jsx("h1",{className:"about-title",children:c.title})}),o.jsxs("div",{className:"about-support",children:[o.jsx("p",{className:"about-body",children:c.body}),c.id==="intro"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"about-signals","aria-label":"Veloste focus",children:yr.map(d=>o.jsx("span",{className:"about-signal",children:d},d))}),o.jsx("button",{type:"button",className:"about-case-link",onClick:()=>window.dispatchEvent(new CustomEvent("veloste:openWork")),children:"View case studies"})]}),c.id==="work"&&o.jsx("ul",{className:"about-fit-list","aria-label":"Who Veloste works with",children:Mr.map(d=>o.jsx("li",{children:d},d))}),c.id==="team"&&o.jsx("ul",{className:"about-process","aria-label":"Veloste process",children:Rr.map(d=>o.jsx("li",{children:o.jsx("span",{className:"about-process-name",children:d})},d))})]}),c.id==="services"&&o.jsx("ul",{className:"about-services","aria-label":"Veloste services",children:Er.map(d=>o.jsxs("li",{children:[o.jsx("p",{className:"about-service-title",children:d.title}),o.jsx("p",{className:"about-service-body",children:d.body})]},d.title))})]})]},c.id))}),o.jsxs("nav",{className:"seo-links-hidden","aria-label":"SEO navigation links",children:[o.jsx("a",{href:"/web-developer-calgary/",children:"Calgary web developer services"}),o.jsx("a",{href:"/service-areas/calgary-region/",children:"Calgary-region coverage"}),o.jsx("a",{href:"/uptown-workroom/",children:"Uptown Workroom case study"}),o.jsx("a",{href:"mailto:contact@veloste.com",children:"Get a scoped quote"})]})]})})]})}const _r="max(12vh, calc(env(safe-area-inset-top, 0px) + 84px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",Cr=1240,Ur="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",ce="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",Xe="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace",Ye="https://veloste-mailer.vercel.app".replace(/\/+$/,"");function Pr({active:e}){const[t,s]=U.useState(""),[r,n]=U.useState(""),[a,i]=U.useState(""),[l,u]=U.useState(!1),[c,p]=U.useState(!1),[d,g]=U.useState("");async function v(S){S.preventDefault(),u(!0),g("");try{if(!Ye)throw new Error("VITE_API_BASE_URL is not defined (and no dev fallback).");const x=await fetch(`${Ye}/api/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:r,message:a})});if(!x.ok){let w="Failed to send message";try{const h=await x.json();h?.error&&(w=h.error+(h?.hint?` ${h.hint}`:""))}catch{const h=await x.text().catch(()=>"");h&&(w=h)}throw new Error(w)}p(!0),s(""),n(""),i("")}catch(x){g(x instanceof Error?x.message:"Failed to send message. Please try again.")}finally{u(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .contact-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.28) transparent;
        }
        .contact-scroll::-webkit-scrollbar { width: 6px; }
        .contact-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.25);
          border-radius: 999px;
        }
        .contact-shell {
          width: min(100%, ${Cr}px);
          margin: 0 auto;
          padding-bottom: 18vh;
          color: #000;
        }
        .contact-block {
          min-height: min(84vh, 920px);
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(14px, 2vw, 32px);
          align-items: start;
        }
        .contact-content {
          width: min(100%, 60rem);
          margin: 0 auto;
        }
        .contact-title {
          margin: 0;
          font-family: ${Ur};
          font-size: clamp(42px, 10vw, 136px);
          line-height: 0.92;
          letter-spacing: 0.01em;
          color: #000;
          max-width: 12ch;
        }
        .contact-body,
        .contact-meta {
          margin: 0;
          margin-top: clamp(14px, 2.2vw, 26px);
          font-family: ${ce};
          font-size: clamp(16px, 1.8vw, 23px);
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.78);
          max-width: 58ch;
        }
        .contact-meta {
          margin-top: clamp(10px, 1.4vw, 18px);
          font-size: clamp(15px, 1.5vw, 19px);
        }
        .contact-meta a {
          color: #000;
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
          font-family: ${Xe};
          font-size: clamp(11px, 1vw, 13px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.55);
        }
        .contact-field {
          box-sizing: border-box;
          width: 100%;
          padding: 12px 14px;
          font-size: 16px;
          line-height: 1.45;
          font-family: ${ce};
          color: #000;
          background: rgba(0, 0, 0, 0.035);
          border: 1px solid rgba(0, 0, 0, 0.16);
          border-radius: 12px;
          outline: none;
          transition: background-color 160ms ease, border-color 160ms ease;
        }
        .contact-field::placeholder {
          color: rgba(0, 0, 0, 0.38);
        }
        .contact-field:hover:not(:disabled) {
          border-color: rgba(0, 0, 0, 0.3);
        }
        .contact-field:focus,
        .contact-field:focus-visible {
          background: #fff;
          border-color: rgba(0, 0, 0, 0.65);
        }
        .contact-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .contact-error {
          margin: 0;
          padding: 12px 0;
          font-family: ${ce};
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.5;
          color: #a4241a;
        }
        .contact-submit {
          justify-self: start;
          margin-top: 8px;
          padding: 14px 28px;
          border: none;
          border-radius: 999px;
          background: #000;
          font-family: ${Xe};
          font-size: 12px;
          line-height: 1.2;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          transition: transform 160ms ease, opacity 160ms ease;
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          opacity: 0.85;
        }
        .contact-submit:disabled {
          opacity: 0.4;
          cursor: default;
        }
        .contact-submit:focus-visible {
          outline: 1px solid rgba(0, 0, 0, 0.6);
          outline-offset: 3px;
        }
        .contact-success {
          margin: clamp(28px, 4vw, 48px) 0 0;
          max-width: 58ch;
          font-family: ${ce};
          font-size: clamp(15px, 1.7vw, 22px);
          line-height: 1.6;
          color: #000;
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
      `}),o.jsx("div",{className:"contact-scroll",style:{display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"transparent",color:"#000",pointerEvents:e?"auto":"none",overflowY:e?"auto":"hidden",WebkitOverflowScrolling:e?"touch":"auto",overscrollBehavior:e?"contain":"auto",touchAction:e?"auto":"none",padding:_r,boxSizing:"border-box"},children:o.jsx("div",{className:"contact-shell",children:o.jsx("section",{className:"contact-block","aria-label":"05 Contact",children:o.jsxs("div",{className:"contact-content",children:[o.jsx("h1",{className:"contact-title",children:"Get a scoped quote."}),o.jsx("p",{className:"contact-body",children:"Share your business type, timeline, and budget range. We'll reply with a recommended scope and next steps."}),o.jsxs("p",{className:"contact-meta",children:["Calgary-based, serving Airdrie, Cochrane, Okotoks, and Chestermere. Email"," ",o.jsx("a",{href:"mailto:contact@veloste.com",children:"contact@veloste.com"})," or call ",o.jsx("a",{href:"tel:+18255214542",children:"(825) 521-4542"}),"."]}),c?o.jsx("p",{className:"contact-success",children:"Thanks — we'll get back to you shortly."}):o.jsxs("form",{className:"contact-form",onSubmit:v,noValidate:!0,children:[o.jsxs("div",{className:"contact-fields-row",children:[o.jsxs("div",{className:"contact-field-wrap",children:[o.jsx("label",{htmlFor:"contact-name",className:"contact-label",children:"Name"}),o.jsx("input",{id:"contact-name",className:"contact-field",type:"text",value:t,onChange:S=>s(S.target.value),required:!0,autoComplete:"name",placeholder:"Your name"})]}),o.jsxs("div",{className:"contact-field-wrap",children:[o.jsx("label",{htmlFor:"contact-email",className:"contact-label",children:"Email"}),o.jsx("input",{id:"contact-email",className:"contact-field",type:"email",value:r,onChange:S=>n(S.target.value),required:!0,autoComplete:"email",placeholder:"you@example.com"})]})]}),o.jsxs("div",{className:"contact-field-wrap",children:[o.jsx("label",{htmlFor:"contact-message",className:"contact-label",children:"Message"}),o.jsx("textarea",{id:"contact-message",className:"contact-field contact-textarea",required:!0,value:a,onChange:S=>i(S.target.value),placeholder:"Tell us about your project, timeline, and goals…",rows:5})]}),d&&o.jsx("p",{className:"contact-error",role:"alert","aria-live":"polite",children:d}),o.jsx("button",{type:"submit",className:"contact-submit",disabled:l,children:l?"Sending…":"Send message"})]})]})})})})]})}const Ir=U.memo(Br),Dr=U.memo(Pr);function Ar({leftInteractive:e,rightInteractive:t}){return o.jsxs("div",{className:"veloste-overlay","aria-hidden":!1,children:[o.jsxs("div",{className:"veloste-scroll-indicators","aria-hidden":!0,children:[o.jsxs("div",{className:"veloste-scroll-indicator veloste-scroll-indicator--left",children:[o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:o.jsx("path",{d:"M11 4L6 9L11 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),o.jsx("span",{children:"About"})]}),o.jsxs("div",{className:"veloste-scroll-indicator veloste-scroll-indicator--right",children:[o.jsx("span",{children:"Contact"}),o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:o.jsx("path",{d:"M7 4L12 9L7 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]}),o.jsx("div",{className:"veloste-pane veloste-pane--left",children:o.jsx(Ir,{active:e})}),o.jsx("div",{className:"veloste-pane veloste-pane--right",children:o.jsx(Dr,{active:t,stacked:!0})})]})}function K({baseIntensity:e,...t}){const s=f.useRef(null),{sceneRefs:r}=G(),n=f.useRef(1);return H(()=>{const a=s.current;if(!a)return;const i=r.lightBoost.current;Math.abs(i-n.current)<1e-4||(n.current=i,a.intensity=e*i)}),o.jsx(St,{ref:s,intensity:e,...t})}function ue({baseIntensity:e,position:t}){const s=f.useRef(null),{sceneRefs:r}=G(),n=f.useRef(1);return H(()=>{const a=r.lightBoost.current;Math.abs(a-n.current)<1e-4||(n.current=a,s.current&&(s.current.intensity=e*a))}),o.jsx("directionalLight",{ref:s,position:t,intensity:e,color:"#ffffff"})}function Or({baseIntensity:e,position:t,distance:s}){const r=f.useRef(null),{sceneRefs:n}=G(),a=f.useRef(1);return H(()=>{const i=n.lightBoost.current;Math.abs(i-a.current)<1e-4||(a.current=i,r.current&&(r.current.intensity=e*i))}),o.jsx("pointLight",{ref:r,position:t,intensity:e,color:"#ffffff",distance:s,decay:2})}function Nr(){const{sceneRefs:e}=G(),t=f.useRef(null),s=f.useRef(null),r=f.useRef(1);return H(()=>{const n=e.lightBoost.current;Math.abs(n-r.current)<1e-4||(r.current=n,t.current&&(t.current.intensity=.008*n),s.current&&(s.current.intensity=.016*n))}),o.jsxs(o.Fragment,{children:[o.jsx("ambientLight",{ref:t,intensity:.008}),o.jsx("hemisphereLight",{ref:s,intensity:.016,color:"#ffffff",groundColor:"#000000"}),o.jsx(ue,{baseIntensity:10,position:[5.5,6.5,5.5]}),o.jsx(ue,{baseIntensity:6.5,position:[-7.5,2.8,-5.5]}),o.jsx(ue,{baseIntensity:4.2,position:[.8,.4,-9]}),o.jsx(ue,{baseIntensity:2.8,position:[7,1.5,-4.5]}),o.jsx(Or,{baseIntensity:22,position:[-1.8,-5.8,3.2],distance:7}),o.jsxs(bt,{background:!1,blur:.55,frames:1,children:[o.jsx(K,{baseIntensity:28,form:"rect",color:"#ffffff",scale:[1.4,1.1,1],position:[2.4,3.2,3.6],rotation:[-.62,-.32,0]}),o.jsx(K,{baseIntensity:17,form:"rect",color:"#ffffff",scale:[1.5,.32,1],position:[1.2,.8,2.4],rotation:[-.12,-.18,0]}),o.jsx(K,{baseIntensity:22,form:"rect",color:"#ffffff",scale:[.42,7.5,1],position:[-2.1,.45,-3.6],rotation:[0,Math.PI,0]}),o.jsx(K,{baseIntensity:11,form:"rect",color:"#ffffff",scale:[.38,6,1],position:[2.3,-.15,-3.4],rotation:[0,Math.PI,0]}),o.jsx(K,{baseIntensity:18,form:"rect",color:"#ffffff",scale:[5.5,.38,1],position:[0,3.1,-3.2],rotation:[-.42,0,0]}),o.jsx(K,{baseIntensity:12,form:"rect",color:"#ffffff",scale:[4.5,.32,1],position:[0,-2.6,-3.3],rotation:[.38,0,0]}),o.jsx(K,{baseIntensity:7,form:"rect",color:"#ffffff",scale:[5,1.1,1],position:[.5,6.2,-1.2],rotation:[Math.PI/2.35,.12,0]})]})]})}const Ze=(e,t,s)=>{const r=_.clamp((s-e)/Math.max(1e-6,t-e),0,1);return r*r*(3-2*r)};function Fr(e,{deadZone:t=.15,easePower:s=1.5,curvePower:r=1.6}={}){const n=w=>_.clamp((w-t)/(1-t),0,1),a=Math.max(0,e),i=Math.max(0,-e),l=Math.pow(n(a),s),u=Math.pow(n(i),s),c=Math.pow(l,r),p=Math.pow(u,r),d=Ze(.62,.95,c),g=Ze(.62,.95,p),v=_.clamp(Math.pow(g,.88),0,1),S=_.clamp(Math.pow(d,.88),0,1),x=Math.max(v,S);return{leftOpacity:g,rightOpacity:d,aboutBlurAmount:v,contactBlurAmount:S,overlayBlurAmount:x,indicatorOpacity:1-Math.min(1,Math.abs(e)/t)}}const Qe=360,Lr=240,kr=120,zr=120,Te=2e3,Z=()=>typeof performance<"u"?performance.now():Date.now(),de=e=>Math.max(0,Math.min(1,e)),se=(e,t,s)=>{e.push(t),e.length>s&&e.shift()},Hr=(e,t)=>{if(!e.length)return 0;const s=[...e].sort((n,a)=>n-a),r=Math.min(s.length-1,Math.floor((s.length-1)*t));return s[r]},C=(e,t=2)=>Number(e.toFixed(t)),Gr=()=>typeof window>"u"?!1:new URLSearchParams(window.location.search).get("debugScroll")==="1"?!0:window.localStorage.getItem("velosteDebugScroll")==="1";class jr{enabled=Gr();frameTimesMs=[];frameTs=[];inputEvents=[];longTasks=[];thresholdEvents=[];pCurrent=0;pTarget=0;overlayBlur=0;leftOpacity=0;rightOpacity=0;indicatorOpacity=1;scrollCurveConfig=null;recordFrame({dtSeconds:t,pCurrent:s,pTarget:r}){if(!this.enabled)return;const n=Z(),a=t*1e3;se(this.frameTimesMs,a,Qe),se(this.frameTs,n,Qe),this.pCurrent=s,this.pTarget=r}recordDerived({overlayBlur:t,leftOpacity:s,rightOpacity:r,indicatorOpacity:n}){this.enabled&&(this.overlayBlur=de(t),this.leftOpacity=de(s),this.rightOpacity=de(r),this.indicatorOpacity=de(n))}recordInput(t){this.enabled&&se(this.inputEvents,t,Lr)}recordLongTask(t){this.enabled&&se(this.longTasks,{t:Z(),duration:Math.max(0,t)},kr)}recordThreshold(t,s){this.enabled&&se(this.thresholdEvents,{t:Z(),name:t,active:s},zr)}setCurveConfig(t){this.enabled&&(this.scrollCurveConfig=t)}recentFilter(t,s){const r=Z()-s;return t.filter(n=>n.t>=r)}getSnapshot(t=Te){if(!this.enabled)return{enabled:!1,fpsAvg:0,fpsP95:0,frameTimeAvgMs:0,frameTimeP95Ms:0,worstFrameMs:0,droppedPct:0,longTaskCount:0,longTaskMaxMs:0,wheelPerSec:0,touchPerSec:0,consumedInputPct:0,clampedInputPct:0,maxDeltaP:0,pCurrent:0,pTarget:0,overlayBlur:0,leftOpacity:0,rightOpacity:0,indicatorOpacity:1,sampleCount:0};const s=Z()-t,r=this.frameTimesMs.filter((h,m)=>this.frameTs[m]>=s),n=r.length,a=n>0?r.reduce((h,m)=>h+m,0)/n:0,i=Hr(r,.95),l=r.length?Math.max(...r):0,u=r.filter(h=>h>20).length,c=this.recentFilter(this.inputEvents,t),p=c.filter(h=>h.mode==="wheel").length,d=c.filter(h=>h.mode==="touch").length,g=c.filter(h=>h.consumed).length,v=c.filter(h=>h.clamped).length,S=c.length?Math.max(...c.map(h=>Math.abs(h.deltaP))):0,x=this.recentFilter(this.longTasks,t),w=x.length?Math.max(...x.map(h=>h.duration)):0;return{enabled:!0,fpsAvg:C(a>0?1e3/a:0,1),fpsP95:C(i>0?1e3/i:0,1),frameTimeAvgMs:C(a,2),frameTimeP95Ms:C(i,2),worstFrameMs:C(l,2),droppedPct:C(n>0?u/n*100:0,1),longTaskCount:x.length,longTaskMaxMs:C(w,1),wheelPerSec:C(p*1e3/Math.max(1,t),1),touchPerSec:C(d*1e3/Math.max(1,t),1),consumedInputPct:C(c.length?g/c.length*100:0,1),clampedInputPct:C(c.length?v/c.length*100:0,1),maxDeltaP:C(S,4),pCurrent:C(this.pCurrent,4),pTarget:C(this.pTarget,4),overlayBlur:C(this.overlayBlur,3),leftOpacity:C(this.leftOpacity,3),rightOpacity:C(this.rightOpacity,3),indicatorOpacity:C(this.indicatorOpacity,3),sampleCount:n}}getSummaryLine(t=Te){const s=this.getSnapshot(t);return s.enabled?[`fps ${s.fpsAvg} (p95 ${s.fpsP95})`,`ft ${s.frameTimeAvgMs}ms (p95 ${s.frameTimeP95Ms}ms)`,`drop ${s.droppedPct}%`,`long ${s.longTaskCount}/${s.longTaskMaxMs}ms`,`wheel ${s.wheelPerSec}/s`,`max dP ${s.maxDeltaP}`,`p ${s.pCurrent} -> ${s.pTarget}`,`blur ${s.overlayBlur}`].join(" | "):"scroll-debug disabled"}buildReport(t=Te){return{snapshot:this.getSnapshot(t),recentThresholdEvents:this.recentFilter(this.thresholdEvents,t).map(s=>({ageMs:C(Z()-s.t,1),name:s.name,active:s.active})),curveConfig:this.scrollCurveConfig,generatedAtIso:new Date().toISOString()}}}const P=new jr;typeof window<"u"&&P.enabled&&(window.velosteScrollDebugReport=()=>P.buildReport());const Vr=.88,Wr=.72,$r=.88,Kr=.72,qr=.7,Xr=.55,Je=1.6,Yr=.025,Zr=16;function mt(e,t){return Math.round(e*t)/t}function he(e,t,s,r,n,a=i=>i.toFixed(3)){const i=mt(n,1/Yr);t[s]!==i&&(t[s]=i,e.style.setProperty(r,a(i)))}function Qr({groupRef:e,maxYaw:t,deadZone:s=.15,easePower:r=1.5,curvePower:n=1.6}){const{pRef:a,sceneRefs:i}=G(),l=f.useRef(!1),u=f.useRef(!1),c=f.useRef(!1),p=f.useRef(!1),d=f.useRef({}),g=f.useRef(0);return f.useEffect(()=>()=>{document.documentElement.classList.remove("veloste-panel-open","veloste-light"),document.documentElement.style.removeProperty("--veloste-about-open"),document.documentElement.style.removeProperty("--veloste-left-opacity"),document.documentElement.style.removeProperty("--veloste-right-opacity"),document.documentElement.style.removeProperty("--veloste-indicator-opacity")},[]),H(()=>{const v=Fr(a.current,{deadZone:s,easePower:r,curvePower:n}),{leftOpacity:S,rightOpacity:x,overlayBlurAmount:w,indicatorOpacity:h}=v;P.setCurveConfig({deadZone:s,easePower:r,curvePower:n}),P.recordDerived({overlayBlur:w,leftOpacity:S,rightOpacity:x,indicatorOpacity:h}),e.current&&(e.current.rotation.y=a.current*t);const m=w<.02?0:mt(w,Zr);if(i.glow.current=m,i.lightBoost.current=1+m*.6,i.overlayBlur.current=m,g.current+=1,g.current%2===0){const B=document.documentElement,D=d.current;he(B,D,"open","--veloste-about-open",w),he(B,D,"leftOpacity","--veloste-left-opacity",Math.pow(S,Je)),he(B,D,"rightOpacity","--veloste-right-opacity",Math.pow(x,Je)),he(B,D,"indicatorOpacity","--veloste-indicator-opacity",h);const A=w>.02;A!==u.current&&(u.current=A,B.classList.toggle("veloste-panel-open",A),P.recordThreshold("panelOpen",A));const R=l.current?w>Xr:w>qr;R!==l.current&&(l.current=R,B.classList.toggle("veloste-light",R),P.recordThreshold("lightPage",R))}const b=c.current?S>Wr:S>Vr;b!==c.current&&(c.current=b,P.recordThreshold("leftInteractive",b),window.dispatchEvent(new CustomEvent("veloste:leftInteractive",{detail:{active:b}})));const M=p.current?x>Kr:x>$r;M!==p.current&&(p.current=M,P.recordThreshold("rightInteractive",M),window.dispatchEvent(new CustomEvent("veloste:rightInteractive",{detail:{active:M}})))}),null}function Jr({smooth:e,children:t}){const s=f.useRef(0),r=f.useRef(0),n=f.useRef(0),a=f.useRef(1),i=f.useRef(0),l=f.useMemo(()=>({pRef:s,pTargetRef:r,smooth:e,sceneRefs:{glow:n,lightBoost:a,overlayBlur:i}}),[e]);return o.jsx(pt.Provider,{value:l,children:t})}function en({children:e}){const{pRef:t,pTargetRef:s,smooth:r}=G();return H((n,a)=>{const i=1-Math.pow(r,a*60);t.current=_.lerp(t.current,s.current,i),P.recordFrame({dtSeconds:a,pCurrent:t.current,pTarget:s.current})}),o.jsx(o.Fragment,{children:e})}function tn({ticksToMax:e,notchSize:t,polarity:s,children:r}){const{pTargetRef:n}=G();return f.useEffect(()=>{const a=h=>_.clamp(h,-1,1),i=()=>n.current<=-.999999,l=()=>n.current>=.999999,u=h=>-(h/t)*s/e,c=h=>!(h>0&&l()||h<0&&i()),p=h=>{const m=h.deltaMode===1?16:h.deltaMode===2?window.innerHeight:1,b=h.deltaY*m,M=u(b),D=n.current+M,A=a(D),R=c(M);P.recordInput({t:performance.now(),mode:"wheel",deltaP:M,consumed:R,clamped:Math.abs(A-D)>1e-9}),R&&(h.preventDefault(),n.current=A)};let d=0,g=!1;const v=h=>{h.touches.length===1&&(g=!0,d=h.touches[0].clientY)},S=h=>{if(!g||h.touches.length!==1)return;const m=h.touches[0].clientY,b=d-m;d=m;const M=u(b),D=n.current+M,A=a(D),R=c(M);P.recordInput({t:performance.now(),mode:"touch",deltaP:M,consumed:R,clamped:Math.abs(A-D)>1e-9}),R&&(h.preventDefault(),n.current=A)},x=()=>{g=!1},w=h=>{const m=h.detail;if(!m||typeof m.p!="number")return;const b=a(m.p);P.recordInput({t:performance.now(),mode:"api",deltaP:m.p-n.current,consumed:!0,clamped:Math.abs(b-m.p)>1e-9}),n.current=b};return window.addEventListener("wheel",p,{passive:!1}),window.addEventListener("touchstart",v,{passive:!0}),window.addEventListener("touchmove",S,{passive:!1}),window.addEventListener("touchend",x,{passive:!0}),window.addEventListener("veloste:setProgress",w),()=>{window.removeEventListener("wheel",p),window.removeEventListener("touchstart",v),window.removeEventListener("touchmove",S),window.removeEventListener("touchend",x),window.removeEventListener("veloste:setProgress",w)}},[e,t,s,n]),o.jsx(o.Fragment,{children:r})}function sn({children:e,ticksToMax:t=24,notchSize:s=120,polarity:r=1,smooth:n=.85}){return o.jsx(Jr,{smooth:n,children:o.jsx(tn,{ticksToMax:t,notchSize:s,polarity:r,children:o.jsx(en,{children:e})})})}const Ee=2e3,rn={enabled:!1,fpsAvg:0,fpsP95:0,frameTimeAvgMs:0,frameTimeP95Ms:0,worstFrameMs:0,droppedPct:0,longTaskCount:0,longTaskMaxMs:0,wheelPerSec:0,touchPerSec:0,consumedInputPct:0,clampedInputPct:0,maxDeltaP:0,pCurrent:0,pTarget:0,overlayBlur:0,leftOpacity:0,rightOpacity:0,indicatorOpacity:1,sampleCount:0};function nn(){const[e,t]=f.useState(rn);return f.useEffect(()=>{if(!P.enabled)return;const s=window.setInterval(()=>{t(P.getSnapshot(Ee))},250),r=window.setInterval(()=>{console.info(`[scroll-debug] ${P.getSummaryLine(Ee)}`)},Ee);return()=>{window.clearInterval(s),window.clearInterval(r)}},[]),f.useEffect(()=>{if(!P.enabled||typeof PerformanceObserver>"u")return;const s=new PerformanceObserver(r=>{for(const n of r.getEntries())P.recordLongTask(n.duration)});try{s.observe({type:"longtask",buffered:!0})}catch{return}return()=>s.disconnect()},[]),P.enabled?o.jsx("aside",{"aria-live":"off",style:{position:"absolute",top:10,right:10,zIndex:30,pointerEvents:"none",userSelect:"text",background:"rgba(0, 0, 0, 0.65)",color:"#d8f1ff",border:"1px solid rgba(152, 220, 255, 0.35)",borderRadius:8,padding:"8px 10px",font:"11px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",minWidth:240,whiteSpace:"pre"},children:[`fps ${e.fpsAvg} | p95 ${e.fpsP95}`,`ft ${e.frameTimeAvgMs}ms | p95 ${e.frameTimeP95Ms}ms`,`drop ${e.droppedPct}% | worst ${e.worstFrameMs}ms`,`long ${e.longTaskCount} | max ${e.longTaskMaxMs}ms`,`wheel ${e.wheelPerSec}/s touch ${e.touchPerSec}/s`,`consume ${e.consumedInputPct}% clamp ${e.clampedInputPct}%`,`max dP ${e.maxDeltaP}`,`p ${e.pCurrent} -> ${e.pTarget}`,`L ${e.leftOpacity}  R ${e.rightOpacity}`,`blur ${e.overlayBlur}  ind ${e.indicatorOpacity}`].join(`
`)}):null}function et(e){window.dispatchEvent(new CustomEvent("veloste:setProgress",{detail:{p:e}}))}function an({onOpenWork:e,onPrefetchWork:t}){const[s,r]=f.useState(null);return f.useEffect(()=>{const n=i=>{const l=i.detail.active;r(u=>l?"left":u==="left"?null:u)},a=i=>{const l=i.detail.active;r(u=>l?"right":u==="right"?null:u)};return window.addEventListener("veloste:leftInteractive",n),window.addEventListener("veloste:rightInteractive",a),()=>{window.removeEventListener("veloste:leftInteractive",n),window.removeEventListener("veloste:rightInteractive",a)}},[]),o.jsx("nav",{className:"site-nav","aria-label":"Primary",children:o.jsxs("div",{className:"site-nav__pill glass",children:[o.jsx("button",{type:"button",className:`site-nav__link${s==="left"?" is-active":""}`,onClick:()=>et(s==="left"?0:-1),children:"About"}),o.jsx("button",{type:"button",className:"site-nav__link",onClick:e,onMouseEnter:t,onFocus:t,children:"Work"}),o.jsx("button",{type:"button",className:`site-nav__link${s==="right"?" is-active":""}`,onClick:()=>et(s==="right"?0:1),children:"Contact"})]})})}const vt=()=>wt(()=>import("./WorkPane-BeaSeU5s.js"),__vite__mapDeps([0,1,2,3])),on=f.lazy(vt);function ln(){const[e,t]=f.useState(1.5);return f.useEffect(()=>{const s=()=>{const r=window.innerWidth;t(r<480?1.15:r<768?1.35:1.5)};return s(),window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]),e}const cn=U.memo(function({groupRef:t,maxYaw:s,deadZone:r,easePower:n,curvePower:a,groupZ:i,maxDpr:l,toneMappingExposure:u}){return o.jsx(Et,{className:"logo-canvas",dpr:[1,Math.min(l,typeof window<"u"?window.devicePixelRatio:1)],gl:{alpha:!0,antialias:!1,powerPreference:"high-performance",toneMapping:kt,toneMappingExposure:u},style:{background:"transparent",touchAction:"none"},camera:{position:[0,0,7],fov:80},children:o.jsx(f.Suspense,{fallback:null,children:o.jsxs(sn,{ticksToMax:7,notchSize:48,polarity:1,smooth:.88,children:[o.jsx(Qr,{groupRef:t,maxYaw:s,deadZone:r,easePower:n,curvePower:a}),o.jsx(Nr,{}),o.jsxs("group",{ref:t,position:[0,0,i],children:[o.jsx(mr,{rotation:[0,Math.PI*1.5,0]}),o.jsx(pr,{rotation:[0,Math.PI*1.5,0]}),o.jsx(br,{groupWorldZ:i})]}),o.jsxs(cr,{multisampling:l>1.25?4:0,children:[o.jsx(dr,{intensity:.36,luminanceThreshold:.72,luminanceSmoothing:.18,mipmapBlur:!0}),o.jsx(hr,{offset:.32,darkness:.72})]})]})})})}),fn=()=>{const e=f.useRef(null),t=1,s=_.degToRad(40),r=ln(),n=.15,a=1.5,i=1.6,l={whites:52,highlights:46,shadows:-76,blacks:-86},u=M=>_.clamp(M/100,-1,1),c=1+u(l.whites)*.22+u(l.highlights)*.2-Math.abs(u(l.shadows))*.06-Math.abs(u(l.blacks))*.05,[p,d]=f.useState(!1),[g,v]=f.useState(!1),[S,x]=f.useState(!1),w=f.useCallback(()=>x(!0),[]),h=f.useCallback(()=>x(!1),[]),m=f.useCallback(()=>{vt()},[]),b=f.useCallback(()=>{x(!1),window.dispatchEvent(new CustomEvent("veloste:setProgress",{detail:{p:1}}))},[]);return f.useEffect(()=>{const M=A=>{const R=A.detail.active;d(R)},B=A=>{const R=A.detail.active;v(R)},D=()=>x(!0);return window.addEventListener("veloste:leftInteractive",M),window.addEventListener("veloste:rightInteractive",B),window.addEventListener("veloste:openWork",D),()=>{window.removeEventListener("veloste:leftInteractive",M),window.removeEventListener("veloste:rightInteractive",B),window.removeEventListener("veloste:openWork",D)}},[]),o.jsxs("div",{className:"logo-wrap",children:[o.jsx("div",{className:"bg-text",children:"VELOSTE"}),o.jsx("div",{className:"logo-about-plate","aria-hidden":!0}),o.jsx(cn,{groupRef:e,maxYaw:s,deadZone:n,easePower:a,curvePower:i,groupZ:t,maxDpr:r,toneMappingExposure:c}),o.jsx(Ar,{leftInteractive:p,rightInteractive:g}),o.jsx(an,{onOpenWork:w,onPrefetchWork:m}),S&&o.jsx(f.Suspense,{fallback:null,children:o.jsx(on,{onClose:h,onContact:b})}),o.jsx(nn,{})]})};export{fn as default};
