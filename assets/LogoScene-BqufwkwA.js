import{b as Me,u as V,j as l,e as pt,C as mt}from"./r3f-DS0y2Osb.js";import{a as p,R as _,e as ve,B as vt,E as gt,L as xt}from"./drei-BF3AKx-h.js";import{_ as I,i as Y,n as N,a3 as bt,a4 as St,a5 as wt,F as Je,W as j,L as fe,a6 as Tt,Z as J,a7 as pe,a8 as ee,a9 as Re,d as et,aa as tt,ab as T,S as _e,O as Et,a as yt,ac as ae,u as ne,e as q,ad as Mt,N as Z,ae as st,T as rt,af as nt,w as Rt,ag as Bt,a1 as Ct,ah as Ue,ai as Pe,H as _t,K as Ut,aj as B,ak as Pt,f as Dt,al as It,X as At}from"./three-Dis90294.js";/**
 * postprocessing v6.39.1 build Fri Apr 17 2026
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2026 Raoul van Rüschen
 * @license Zlib
 */var Nt=(()=>{const e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]),s=new Ct;return s.setAttribute("position",new Ue(e,3)),s.setAttribute("uv",new Ue(t,2)),s})(),z=class ye{static get fullscreenGeometry(){return Nt}constructor(t="Pass",s=new _e,r=new Et){this.name=t,this.renderer=null,this.scene=s,this.camera=r,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(t){if(this.rtt===t){const s=this.fullscreenMaterial;s!==null&&(s.needsUpdate=!0),this.rtt=!t}}set mainScene(t){}set mainCamera(t){}setRenderer(t){this.renderer=t}isEnabled(){return this.enabled}setEnabled(t){this.enabled=t}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(t){let s=this.screen;s!==null?s.material=t:(s=new yt(ye.fullscreenGeometry,t),s.frustumCulled=!1,this.scene===null&&(this.scene=new _e),this.scene.add(s),this.screen=s)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(t){this.fullscreenMaterial=t}getDepthTexture(){return null}setDepthTexture(t,s=ee){}render(t,s,r,n,i){throw new Error("Render method not implemented!")}setSize(t,s){}initialize(t,s,r){}dispose(){for(const t of Object.keys(this)){const s=this[t];(s instanceof j||s instanceof st||s instanceof rt||s instanceof ye)&&this[t].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},Ot=class extends z{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(e,t,s,r,n){const i=e.state.buffers.stencil;i.setLocked(!1),i.setTest(!1)}},Ft=`#ifdef COLOR_WRITE
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
}`,it="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",at=class extends q{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new T(null),depthBuffer:new T(null),channelWeights:new T(null),opacity:new T(1)},blending:Z,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Ft,vertexShader:it}),this.depthFunc=Bt}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(e){const t=e!==null;this.colorWrite!==t&&(t?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=t,this.needsUpdate=!0),this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){const t=e!==null;this.depthWrite!==t&&(t?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=t,this.depthWrite=t,this.needsUpdate=!0),this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(e){this.colorSpaceConversion!==e&&(e?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(e){e!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=e):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}},Lt=class extends z{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new at,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new j(1,1,{minFilter:fe,magFilter:fe,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,s,r,n){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,s){s!==void 0&&(this.renderTarget.texture.type=s,s!==Y?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e!==null&&e.outputColorSpace===N&&(this.renderTarget.texture.colorSpace=N))}},De=new J,ot=class extends z{constructor(e=!0,t=!0,s=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=e,this.depth=t,this.stencil=s,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(e,t,s){this.color=e,this.depth=t,this.stencil=s}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(e){this.overrideClearColor=e}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(e){this.overrideClearAlpha=e}render(e,t,s,r,n){const i=this.overrideClearColor,a=this.overrideClearAlpha,o=e.getClearAlpha(),u=i!==null,c=a>=0;u?(e.getClearColor(De),e.setClearColor(i,c?a:o)):c&&e.setClearAlpha(a),e.setRenderTarget(this.renderToScreen?null:t),e.clear(this.color,this.depth,this.stencil),u?e.setClearColor(De,o):c&&e.setClearAlpha(o)}},zt=class extends z{constructor(e,t){super("MaskPass",e,t),this.needsSwap=!1,this.clearPass=new ot(!1,!1,!0),this.inverse=!1}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get inverted(){return this.inverse}set inverted(e){this.inverse=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(e){this.inverted=e}render(e,t,s,r,n){const i=e.getContext(),a=e.state.buffers,o=this.scene,u=this.camera,c=this.clearPass,f=this.inverted?0:1,d=1-f;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),a.stencil.setFunc(i.ALWAYS,f,4294967295),a.stencil.setClear(d),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(e,null):(c.render(e,t),c.render(e,s))),this.renderToScreen?(e.setRenderTarget(null),e.render(o,u)):(e.setRenderTarget(t),e.render(o,u),e.setRenderTarget(s),e.render(o,u)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(i.EQUAL,1,4294967295),a.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),a.stencil.setLocked(!0)}},xe=1/1e3,kt=1e3,Ht=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(e){typeof document<"u"&&document.hidden!==void 0&&(e?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=e)}get delta(){return this._delta*xe}get fixedDelta(){return this._fixedDelta*xe}set fixedDelta(e){this._fixedDelta=e*kt}get elapsed(){return this._elapsed*xe}update(e){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(e!==void 0?e:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(e){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},Gt=class{constructor(e=null,{depthBuffer:t=!0,stencilBuffer:s=!1,multisampling:r=0,frameBufferType:n}={}){this.renderer=null,this.inputBuffer=this.createBuffer(t,s,n,r),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new Lt,this.depthTexture=null,this.depthRenderTarget=null,this.passes=[],this.timer=new Ht,this.autoRenderToScreen=!0,this.setRenderer(e)}get multisampling(){return this.inputBuffer.samples}set multisampling(e){const t=this.inputBuffer,s=this.multisampling;s>0&&e>0?(this.inputBuffer.samples=e,this.outputBuffer.samples=e,this.inputBuffer.dispose(),this.outputBuffer.dispose()):s!==e&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(t.depthBuffer,t.stencilBuffer,t.texture.type,e),this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(e){if(this.renderer=e,e!==null){const t=e.getSize(new I),s=e.getContext().getContextAttributes().alpha,r=this.inputBuffer.texture.type;r===Y&&e.outputColorSpace===N&&(this.inputBuffer.texture.colorSpace=N,this.outputBuffer.texture.colorSpace=N,this.inputBuffer.dispose(),this.outputBuffer.dispose()),e.autoClear=!1,this.setSize(t.width,t.height);for(const n of this.passes)n.initialize(e,s,r)}}replaceRenderer(e,t=!0){const s=this.renderer,r=s.domElement.parentNode;return this.setRenderer(e),t&&r!==null&&(r.removeChild(s.domElement),r.appendChild(e.domElement)),s}createDepthTexture(){const e=this.inputBuffer,t=new bt;this.depthTexture=t,e.stencilBuffer?(t.format=St,t.type=wt):t.type=Je;const s=t.clone();return s.name="EffectComposer.StableDepth",this.depthRenderTarget=new j(e.width,e.height,{depthBuffer:!0,stencilBuffer:e.stencilBuffer,depthTexture:s}),s}blitDepthBuffer(e){const t=this.renderer,s=this.depthRenderTarget,r=t.properties,n=t.getContext();t.setRenderTarget(s);const i=r.get(e).__webglFramebuffer,a=r.get(s).__webglFramebuffer,o=e.stencilBuffer?n.DEPTH_BUFFER_BIT|n.STENCIL_BUFFER_BIT:n.DEPTH_BUFFER_BIT;n.bindFramebuffer(n.READ_FRAMEBUFFER,i),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,a),n.blitFramebuffer(0,0,e.width,e.height,0,0,s.width,s.height,o,n.NEAREST),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),t.setRenderTarget(null)}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.depthRenderTarget.dispose(),this.depthRenderTarget=null,this.inputBuffer.depthTexture=null,this.outputBuffer.depthTexture=null;for(const e of this.passes)e.setDepthTexture(null)}}createBuffer(e,t,s,r){const n=this.renderer,i=n===null?new I:n.getDrawingBufferSize(new I),a={minFilter:fe,magFilter:fe,stencilBuffer:t,depthBuffer:e,type:s},o=new j(i.width,i.height,a);return r>0&&(o.samples=r),s===Y&&n!==null&&n.outputColorSpace===N&&(o.texture.colorSpace=N),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(e){for(const t of this.passes)t.mainScene=e}setMainCamera(e){for(const t of this.passes)t.mainCamera=e}addPass(e,t){const s=this.passes,r=this.renderer,n=r.getDrawingBufferSize(new I),i=r.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(e.renderer=r,e.setSize(n.width,n.height),e.initialize(r,i,a),this.autoRenderToScreen&&(s.length>0&&(s[s.length-1].renderToScreen=!1),e.renderToScreen&&(this.autoRenderToScreen=!1)),t!==void 0?s.splice(t,0,e):s.push(e),this.autoRenderToScreen&&(s[s.length-1].renderToScreen=!0),e.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const o=this.createDepthTexture();for(e of s)e.setDepthTexture(o)}else{const o=this.depthRenderTarget.depthTexture;e.setDepthTexture(o)}}removePass(e){const t=this.passes,s=t.indexOf(e);if(s!==-1&&t.splice(s,1).length>0){if(this.depthTexture!==null){const i=(o,u)=>o||u.needsDepthTexture;if(!t.reduce(i,!1)){const o=this.depthRenderTarget.depthTexture;e.getDepthTexture()===o&&e.setDepthTexture(null),this.deleteDepthTexture()}}this.autoRenderToScreen&&s===t.length&&(e.renderToScreen=!1,t.length>0&&(t[t.length-1].renderToScreen=!0))}}removeAllPasses(){const e=this.passes;this.deleteDepthTexture(),e.length>0&&(this.autoRenderToScreen&&(e[e.length-1].renderToScreen=!1),this.passes=[])}render(e){const t=this.renderer,s=this.copyPass;let r=this.inputBuffer,n=this.outputBuffer,i,a=!1;e===void 0&&(this.timer.update(),e=this.timer.getDelta());for(const o of this.passes)if(o.enabled){if(r.depthTexture=this.depthTexture,n.depthTexture=null,o.render(t,r,n,e,a),o.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(r),o.needsSwap){if(a){s.renderToScreen=o.renderToScreen;const u=t.getContext(),c=t.state.buffers.stencil;c.setFunc(u.NOTEQUAL,1,4294967295),s.render(t,r,n,e,a),c.setFunc(u.EQUAL,1,4294967295)}i=r,r=n,n=i}o instanceof zt?a=!0:o instanceof Ot&&(a=!1)}}setSize(e,t,s){const r=this.renderer,n=r.getSize(new I);(e===void 0||t===void 0)&&(e=n.width,t=n.height),(n.width!==e||n.height!==t)&&r.setSize(e,t,s);const i=r.getDrawingBufferSize(new I);this.inputBuffer.setSize(i.width,i.height),this.outputBuffer.setSize(i.width,i.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(i.width,i.height);for(const a of this.passes)a.setSize(i.width,i.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const e of this.passes)e.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),z.fullscreenGeometry.dispose()}},X={NONE:0,DEPTH:1,CONVOLUTION:2},E={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},jt=class{constructor(){this.shaderParts=new Map([[E.FRAGMENT_HEAD,null],[E.FRAGMENT_MAIN_UV,null],[E.FRAGMENT_MAIN_IMAGE,null],[E.VERTEX_HEAD,null],[E.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=X.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=et}},be=!1,Ie=class{constructor(e=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(e),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let s;if(t.material.flatShading)switch(t.material.side){case ne:s=this.materialsFlatShadedDoubleSide;break;case ae:s=this.materialsFlatShadedBackSide;break;default:s=this.materialsFlatShaded;break}else switch(t.material.side){case ne:s=this.materialsDoubleSide;break;case ae:s=this.materialsBackSide;break;default:s=this.materials;break}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=s[2]:t.isInstancedMesh?t.material=s[1]:t.material=s[0],++this.meshCount}}}cloneMaterial(e){if(!(e instanceof q))return e.clone();const t=e.uniforms,s=new Map;for(const n in t){const i=t[n].value;i.isRenderTargetTexture&&(t[n].value=null,s.set(n,i))}const r=e.clone();for(const n of s)t[n[0]].value=n[1],r.uniforms[n[0]].value=n[1];return r}setMaterial(e){if(this.disposeMaterials(),this.material=e,e!==null){const t=this.materials=[this.cloneMaterial(e),this.cloneMaterial(e),this.cloneMaterial(e)];for(const s of t)s.uniforms=Object.assign({},e.uniforms),s.side=Mt;t[2].skinning=!0,this.materialsBackSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.side=ae,r}),this.materialsDoubleSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.side=ne,r}),this.materialsFlatShaded=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r}),this.materialsFlatShadedBackSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=ae,r}),this.materialsFlatShadedDoubleSide=t.map(s=>{const r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=ne,r})}}render(e,t,s){const r=e.shadowMap.enabled;if(e.shadowMap.enabled=!1,be){const n=this.originalMaterials;this.meshCount=0,t.traverse(this.replaceMaterial),e.render(t,s);for(const i of n)i[0].material=i[1];this.meshCount!==n.size&&n.clear()}else{const n=t.overrideMaterial;t.overrideMaterial=this.material,e.render(t,s),t.overrideMaterial=n}e.shadowMap.enabled=r}disposeMaterials(){if(this.material!==null){const e=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const t of e)t.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return be}static set workaroundEnabled(e){be=e}},$=-1,O=class extends Re{constructor(e=null,t=$,s=$,r=1){super(),e!==null&&this.addEventListener("change",()=>e.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new I(1,1),this.preferredSize=new I(t,s),this.target=this.preferredSize,this.s=r,this.effectiveSize=new I,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const e=this.baseSize,t=this.preferredSize,s=this.effectiveSize,r=this.scale;t.width!==$?s.width=t.width:t.height!==$?s.width=Math.round(t.height*(e.width/Math.max(e.height,1))):s.width=Math.round(e.width*r),t.height!==$?s.height=t.height:t.width!==$?s.height=Math.round(t.width/Math.max(e.width/Math.max(e.height,1),1)):s.height=Math.round(e.height*r)}get width(){return this.effectiveSize.width}set width(e){this.preferredWidth=e}get height(){return this.effectiveSize.height}set height(e){this.preferredHeight=e}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(e){this.s!==e&&(this.s=e,this.preferredSize.setScalar($),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(e){this.scale=e}get baseWidth(){return this.baseSize.width}set baseWidth(e){this.baseSize.width!==e&&(this.baseSize.width=e,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(e){this.baseWidth=e}get baseHeight(){return this.baseSize.height}set baseHeight(e){this.baseSize.height!==e&&(this.baseSize.height=e,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(e){this.baseHeight=e}setBaseSize(e,t){(this.baseSize.width!==e||this.baseSize.height!==t)&&(this.baseSize.set(e,t),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(e){this.preferredSize.width!==e&&(this.preferredSize.width=e,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(e){this.preferredWidth=e}get preferredHeight(){return this.preferredSize.height}set preferredHeight(e){this.preferredSize.height!==e&&(this.preferredSize.height=e,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(e){this.preferredHeight=e}setPreferredSize(e,t){(this.preferredSize.width!==e||this.preferredSize.height!==t)&&(this.preferredSize.set(e,t),this.dispatchEvent({type:"change"}))}copy(e){this.s=e.scale,this.baseSize.set(e.baseWidth,e.baseHeight),this.preferredSize.set(e.preferredWidth,e.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return $}},w={ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},Vt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Wt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",$t="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",qt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Kt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Xt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Yt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Zt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Qt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Jt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",es="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ts="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ss="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",rs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ns="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",is="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",as="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",os="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ls="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",cs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",us="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ds="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",hs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",fs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ps="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ms="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",vs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",gs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",xs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",bs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",Ss="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ws="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ts=new Map([[w.ADD,Vt],[w.ALPHA,Wt],[w.AVERAGE,$t],[w.COLOR,qt],[w.COLOR_BURN,Kt],[w.COLOR_DODGE,Xt],[w.DARKEN,Yt],[w.DIFFERENCE,Zt],[w.DIVIDE,Qt],[w.DST,null],[w.EXCLUSION,Jt],[w.HARD_LIGHT,es],[w.HARD_MIX,ts],[w.HUE,ss],[w.INVERT,rs],[w.INVERT_RGB,ns],[w.LIGHTEN,is],[w.LINEAR_BURN,as],[w.LINEAR_DODGE,os],[w.LINEAR_LIGHT,ls],[w.LUMINOSITY,cs],[w.MULTIPLY,us],[w.NEGATION,ds],[w.NORMAL,hs],[w.OVERLAY,fs],[w.PIN_LIGHT,ps],[w.REFLECT,ms],[w.SATURATION,vs],[w.SCREEN,gs],[w.SOFT_LIGHT,xs],[w.SRC,bs],[w.SUBTRACT,Ss],[w.VIVID_LIGHT,ws]]),Es=class extends Re{constructor(e,t=1){super(),this._blendFunction=e,this.opacity=new T(t)}getOpacity(){return this.opacity.value}setOpacity(e){this.opacity.value=e}get blendFunction(){return this._blendFunction}set blendFunction(e){this._blendFunction=e,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(e){this.blendFunction=e}getShaderCode(){return Ts.get(this.blendFunction)}},me=class extends Re{constructor(e,t,{attributes:s=X.NONE,blendFunction:r=w.NORMAL,defines:n=new Map,uniforms:i=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=e,this.renderer=null,this.attributes=s,this.fragmentShader=t,this.vertexShader=o,this.defines=n,this.uniforms=i,this.extensions=a,this.blendMode=new Es(r),this.blendMode.addEventListener("change",u=>this.setChanged()),this._inputColorSpace=et,this._outputColorSpace=tt}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(e){this._inputColorSpace=e,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e,this.setChanged()}set mainScene(e){}set mainCamera(e){}getName(){return this.name}setRenderer(e){this.renderer=e}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(e){this.attributes=e,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(e){this.fragmentShader=e,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(e){this.vertexShader=e,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(e,t=ee){}update(e,t,s){}setSize(e,t){}initialize(e,t,s){}dispose(){for(const e of Object.keys(this)){const t=this[e];(t instanceof j||t instanceof st||t instanceof rt||t instanceof z)&&this[e].dispose()}}},Be={MEDIUM:2,LARGE:3},ys=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,Ms="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",Rs=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Bs=class extends q{constructor(e=new Pe){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new T(null),texelSize:new T(new Pe),scale:new T(1),kernel:new T(0)},blending:Z,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ys,vertexShader:Ms}),this.setTexelSize(e.x,e.y),this.kernelSize=Be.MEDIUM}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.inputBuffer=e}get kernelSequence(){return Rs[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(e){this.uniforms.scale.value=e}getScale(){return this.uniforms.scale.value}setScale(e){this.uniforms.scale.value=e}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(e){this.uniforms.kernel.value=e}setKernel(e){this.kernel=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t,e*.5,t*.5)}setSize(e,t){const s=1/e,r=1/t;this.uniforms.texelSize.value.set(s,r,s*.5,r*.5)}},Cs=class extends z{constructor({kernelSize:e=Be.MEDIUM,resolutionScale:t=.5,width:s=O.AUTO_SIZE,height:r=O.AUTO_SIZE,resolutionX:n=s,resolutionY:i=r}={}){super("KawaseBlurPass"),this.renderTargetA=new j(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const a=this.resolution=new O(this,n,i,t);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new Bs,this._blurMaterial.kernelSize=e,this.copyMaterial=new at}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(e){this._blurMaterial=e}get dithering(){return this.copyMaterial.dithering}set dithering(e){this.copyMaterial.dithering=e}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(e){this.blurMaterial.kernelSize=e}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get scale(){return this.blurMaterial.scale}set scale(e){this.blurMaterial.scale=e}getScale(){return this.blurMaterial.scale}setScale(e){this.blurMaterial.scale=e}getKernelSize(){return this.kernelSize}setKernelSize(e){this.kernelSize=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,s,r,n){const i=this.scene,a=this.camera,o=this.renderTargetA,u=this.renderTargetB,c=this.blurMaterial,f=c.kernelSequence;let d=t;this.fullscreenMaterial=c;for(let m=0,v=f.length;m<v;++m){const b=(m&1)===0?o:u;c.kernel=f[m],c.inputBuffer=d.texture,e.setRenderTarget(b),e.render(i,a),d=b}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=d.texture,e.setRenderTarget(this.renderToScreen?null:s),e.render(i,a)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t);const r=s.width,n=s.height;this.renderTargetA.setSize(r,n),this.renderTargetB.setSize(r,n),this.blurMaterial.setSize(e,t)}initialize(e,t,s){s!==void 0&&(this.renderTargetA.texture.type=s,this.renderTargetB.texture.type=s,s!==Y?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):e!==null&&e.outputColorSpace===N&&(this.renderTargetA.texture.colorSpace=N,this.renderTargetB.texture.colorSpace=N))}static get AUTO_SIZE(){return O.AUTO_SIZE}},_s=`#include <common>
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
}`,Us=class extends q{constructor(e=!1,t=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:nt.replace(/\D+/g,"")},uniforms:{inputBuffer:new T(null),threshold:new T(0),smoothing:new T(1),range:new T(null)},blending:Z,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:_s,vertexShader:it}),this.colorOutput=e,this.luminanceRange=t}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get threshold(){return this.uniforms.threshold.value}set threshold(e){this.smoothing>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=e}getThreshold(){return this.threshold}setThreshold(e){this.threshold=e}get smoothing(){return this.uniforms.smoothing.value}set smoothing(e){this.threshold>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=e}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(e){this.smoothing=e}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(e){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(e){e?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(e){return this.colorOutput}setColorOutputEnabled(e){this.colorOutput=e}get useRange(){return this.luminanceRange!==null}set useRange(e){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(e){e!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=e,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(e){this.luminanceRange=e}},Ps=class extends z{constructor({renderTarget:e,luminanceRange:t,colorOutput:s,resolutionScale:r=1,width:n=O.AUTO_SIZE,height:i=O.AUTO_SIZE,resolutionX:a=n,resolutionY:o=i}={}){super("LuminancePass"),this.fullscreenMaterial=new Us(s,t),this.needsSwap=!1,this.renderTarget=e,this.renderTarget===void 0&&(this.renderTarget=new j(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const u=this.resolution=new O(this,a,o,r);u.addEventListener("change",c=>this.setSize(u.baseWidth,u.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(e,t,s,r,n){const i=this.fullscreenMaterial;i.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height)}initialize(e,t,s){s!==void 0&&s!==Y&&(this.renderTarget.texture.type=s,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},Ds=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,Is="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",As=class extends q{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new T(null),texelSize:new T(new I)},blending:Z,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Ds,vertexShader:Is})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},Ns=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,Os="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",Fs=class extends q{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new T(null),supportBuffer:new T(null),texelSize:new T(new I),radius:new T(.85)},blending:Z,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Ns,vertexShader:Os})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}set supportBuffer(e){this.uniforms.supportBuffer.value=e}get radius(){return this.uniforms.radius.value}set radius(e){this.uniforms.radius.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},Ls=class extends z{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new j(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new As,this.upsamplingMaterial=new Fs,this.resolution=new I}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(e){if(this.levels!==e){const t=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let s=0;s<e;++s){const r=t.clone();r.texture.name="Downsampling.Mipmap"+s,this.downsamplingMipmaps.push(r)}this.upsamplingMipmaps.push(t);for(let s=1,r=e-1;s<r;++s){const n=t.clone();n.texture.name="Upsampling.Mipmap"+s,this.upsamplingMipmaps.push(n)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(e){this.upsamplingMaterial.radius=e}render(e,t,s,r,n){const{scene:i,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:u}=this,{downsamplingMipmaps:c,upsamplingMipmaps:f}=this;let d=t;this.fullscreenMaterial=o;for(let m=0,v=c.length;m<v;++m){const b=c[m];o.setSize(d.width,d.height),o.inputBuffer=d.texture,e.setRenderTarget(b),e.render(i,a),d=b}this.fullscreenMaterial=u;for(let m=f.length-1;m>=0;--m){const v=f[m];u.setSize(d.width,d.height),u.inputBuffer=d.texture,u.supportBuffer=c[m].texture,e.setRenderTarget(v),e.render(i,a),d=v}}setSize(e,t){const s=this.resolution;s.set(e,t);let r=s.width,n=s.height;for(let i=0,a=this.downsamplingMipmaps.length;i<a;++i)r=Math.round(r*.5),n=Math.round(n*.5),this.downsamplingMipmaps[i].setSize(r,n),i<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[i].setSize(r,n)}initialize(e,t,s){if(s!==void 0){const r=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const n of r)n.texture.type=s;if(s!==Y)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(e!==null&&e.outputColorSpace===N)for(const n of r)n.texture.colorSpace=N}}dispose(){super.dispose();for(const e of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))e.dispose()}},zs=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,ks=class extends me{constructor({blendFunction:e=w.SCREEN,luminanceThreshold:t=1,luminanceSmoothing:s=.03,mipmapBlur:r=!0,intensity:n=1,radius:i=.85,levels:a=8,kernelSize:o=Be.LARGE,resolutionScale:u=.5,width:c=O.AUTO_SIZE,height:f=O.AUTO_SIZE,resolutionX:d=c,resolutionY:m=f}={}){super("BloomEffect",zs,{blendFunction:e,uniforms:new Map([["map",new T(null)],["intensity",new T(n)]])}),this.renderTarget=new j(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Cs({kernelSize:o}),this.luminancePass=new Ps({colorOutput:!0}),this.luminanceMaterial.threshold=t,this.luminanceMaterial.smoothing=s,this.mipmapBlurPass=new Ls,this.mipmapBlurPass.enabled=r,this.mipmapBlurPass.radius=i,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=r?this.mipmapBlurPass.texture:this.renderTarget.texture;const v=this.resolution=new O(this,d,m,u);v.addEventListener("change",b=>this.setSize(v.baseWidth,v.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get dithering(){return this.blurPass.dithering}set dithering(e){this.blurPass.dithering=e}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(e){this.blurPass.kernelSize=e}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(e){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(e){this.uniforms.get("intensity").value=e}getIntensity(){return this.intensity}setIntensity(e){this.intensity=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}update(e,t,s){const r=this.renderTarget,n=this.luminancePass;n.enabled?(n.render(e,t),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,n.renderTarget):this.blurPass.render(e,n.renderTarget,r)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,t):this.blurPass.render(e,t,r)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height),this.blurPass.resolution.copy(s),this.luminancePass.setSize(e,t),this.mipmapBlurPass.setSize(e,t)}initialize(e,t,s){this.blurPass.initialize(e,t,s),this.luminancePass.initialize(e,t,s),this.mipmapBlurPass.initialize(e,t,s),s!==void 0&&(this.renderTarget.texture.type=s,e!==null&&e.outputColorSpace===N&&(this.renderTarget.texture.colorSpace=N))}},lt=class extends z{constructor(e,t,s=null){super("RenderPass",e,t),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new ot,this.overrideMaterialManager=s===null?null:new Ie(s),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get renderToScreen(){return super.renderToScreen}set renderToScreen(e){super.renderToScreen=e,this.clearPass.renderToScreen=e}get overrideMaterial(){const e=this.overrideMaterialManager;return e!==null?e.material:null}set overrideMaterial(e){const t=this.overrideMaterialManager;e!==null?t!==null?t.setMaterial(e):this.overrideMaterialManager=new Ie(e):t!==null&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(e){this.overrideMaterial=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getSelection(){return this.selection}setSelection(e){this.selection=e}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(e){this.ignoreBackground=e}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(e){this.skipShadowMapUpdate=e}getClearPass(){return this.clearPass}render(e,t,s,r,n){const i=this.scene,a=this.camera,o=this.selection,u=a.layers.mask,c=i.background,f=e.shadowMap.autoUpdate,d=this.renderToScreen?null:t;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(e.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(i.background=null),this.clearPass.enabled&&this.clearPass.render(e,t),e.setRenderTarget(d),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(e,i,a):e.render(i,a),a.layers.mask=u,i.background=c,e.shadowMap.autoUpdate=f}},te={DEFAULT:0,ESKIL:1},Hs=`#include <packing>
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
gl_FragColor=vec4(n[index],d[index]);}`,Gs="uniform vec2 texelSize;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vUv0=uv;vUv1=vec2(uv.x,uv.y+texelSize.y);vUv2=vec2(uv.x+texelSize.x,uv.y);vUv3=uv+texelSize;gl_Position=vec4(position.xy,1.0,1.0);}",js=class extends q{constructor(){super({name:"DepthDownsamplingMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new T(null),normalBuffer:new T(null),texelSize:new T(new I)},blending:Z,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Hs,vertexShader:Gs})}set depthBuffer(e){this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=ee){this.depthBuffer=e,this.depthPacking=t}set normalBuffer(e){this.uniforms.normalBuffer.value=e,e!==null?this.defines.DOWNSAMPLE_NORMALS="1":delete this.defines.DOWNSAMPLE_NORMALS,this.needsUpdate=!0}setNormalBuffer(e){this.normalBuffer=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t)}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},Vs=class extends z{constructor({normalBuffer:e=null,resolutionScale:t=.5,width:s=O.AUTO_SIZE,height:r=O.AUTO_SIZE,resolutionX:n=s,resolutionY:i=r}={}){super("DepthDownsamplingPass");const a=new js;a.normalBuffer=e,this.fullscreenMaterial=a,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new j(1,1,{minFilter:pe,magFilter:pe,depthBuffer:!1,type:Je}),this.renderTarget.texture.name="DepthDownsamplingPass.Target",this.renderTarget.texture.generateMipmaps=!1;const o=this.resolution=new O(this,n,i,t);o.addEventListener("change",u=>this.setSize(o.baseWidth,o.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}setDepthTexture(e,t=ee){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t}render(e,t,s,r,n){e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height),this.fullscreenMaterial.setSize(e,t)}initialize(e,t,s){const r=e.getContext();if(!(r.getExtension("EXT_color_buffer_float")||r.getExtension("EXT_color_buffer_half_float")))throw new Error("Rendering to float texture is not supported.")}},Ws=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,$s=class extends me{constructor({blendFunction:e,eskil:t=!1,technique:s=t?te.ESKIL:te.DEFAULT,offset:r=.5,darkness:n=.5}={}){super("VignetteEffect",Ws,{blendFunction:e,defines:new Map([["VIGNETTE_TECHNIQUE",s.toFixed(0)]]),uniforms:new Map([["offset",new T(r)],["darkness",new T(n)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(e){this.technique!==e&&(this.defines.set("VIGNETTE_TECHNIQUE",e.toFixed(0)),this.setChanged())}get eskil(){return this.technique===te.ESKIL}set eskil(e){this.technique=e?te.ESKIL:te.DEFAULT}getTechnique(){return this.technique}setTechnique(e){this.technique=e}get offset(){return this.uniforms.get("offset").value}set offset(e){this.uniforms.get("offset").value=e}getOffset(){return this.offset}setOffset(e){this.offset=e}get darkness(){return this.uniforms.get("darkness").value}set darkness(e){this.uniforms.get("darkness").value=e}getDarkness(){return this.darkness}setDarkness(e){this.darkness=e}},qs=`#include <common>
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
}`,Ks="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",Xs=class extends q{constructor(e,t,s,r,n=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:nt.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new T(null),depthBuffer:new T(null),resolution:new T(new I),texelSize:new T(new I),cameraNear:new T(.3),cameraFar:new T(1e3),aspect:new T(1),time:new T(0)},blending:Z,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:n}),e&&this.setShaderParts(e),t&&this.setDefines(t),s&&this.setUniforms(s),this.copyCameraSettings(r)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=ee){this.depthBuffer=e,this.depthPacking=t}setShaderData(e){this.setShaderParts(e.shaderParts),this.setDefines(e.defines),this.setUniforms(e.uniforms),this.setExtensions(e.extensions)}setShaderParts(e){return this.fragmentShader=qs.replace(E.FRAGMENT_HEAD,e.get(E.FRAGMENT_HEAD)||"").replace(E.FRAGMENT_MAIN_UV,e.get(E.FRAGMENT_MAIN_UV)||"").replace(E.FRAGMENT_MAIN_IMAGE,e.get(E.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=Ks.replace(E.VERTEX_HEAD,e.get(E.VERTEX_HEAD)||"").replace(E.VERTEX_MAIN_SUPPORT,e.get(E.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(e){for(const t of e.entries())this.defines[t[0]]=t[1];return this.needsUpdate=!0,this}setUniforms(e){for(const t of e.entries())this.uniforms[t[0]]=t[1];return this}setExtensions(e){this.extensions={};for(const t of e)this.extensions[t]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(e){this.encodeOutput!==e&&(e?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(e){return this.encodeOutput}setOutputEncodingEnabled(e){this.encodeOutput=e}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}setDeltaTime(e){this.uniforms.time.value+=e}adoptCameraSettings(e){this.copyCameraSettings(e)}copyCameraSettings(e){e&&(this.uniforms.cameraNear.value=e.near,this.uniforms.cameraFar.value=e.far,e instanceof Rt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(e,t){const s=this.uniforms;s.resolution.value.set(e,t),s.texelSize.value.set(1/e,1/t),s.aspect.value=e/t}static get Section(){return E}};function Ae(e,t,s){for(const r of t){const n="$1"+e+r.charAt(0).toUpperCase()+r.slice(1),i=new RegExp("([^\\.])(\\b"+r+"\\b)","g");for(const a of s.entries())a[1]!==null&&s.set(a[0],a[1].replace(i,n))}}function Ys(e,t,s){let r=t.getFragmentShader(),n=t.getVertexShader();const i=r!==void 0&&/mainImage/.test(r),a=r!==void 0&&/mainUv/.test(r);if(s.attributes|=t.getAttributes(),r===void 0)throw new Error(`Missing fragment shader (${t.name})`);if(a&&(s.attributes&X.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${t.name})`);if(!i&&!a)throw new Error(`Could not find mainImage or mainUv function (${t.name})`);{const o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,u=s.shaderParts;let c=u.get(E.FRAGMENT_HEAD)||"",f=u.get(E.FRAGMENT_MAIN_UV)||"",d=u.get(E.FRAGMENT_MAIN_IMAGE)||"",m=u.get(E.VERTEX_HEAD)||"",v=u.get(E.VERTEX_MAIN_SUPPORT)||"";const b=new Set,S=new Set;if(a&&(f+=`	${e}MainUv(UV);
`,s.uvTransformation=!0),n!==null&&/mainSupport/.test(n)){const g=/mainSupport *\([\w\s]*?uv\s*?\)/.test(n);v+=`	${e}MainSupport(`,v+=g?`vUv);
`:`);
`;for(const x of n.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const M of x[1].split(/\s*,\s*/))s.varyings.add(M),b.add(M),S.add(M);for(const x of n.matchAll(o))S.add(x[1])}for(const g of r.matchAll(o))S.add(g[1]);for(const g of t.defines.keys())S.add(g.replace(/\([\w\s,]*\)/g,""));for(const g of t.uniforms.keys())S.add(g);S.delete("while"),S.delete("for"),S.delete("if"),t.uniforms.forEach((g,x)=>s.uniforms.set(e+x.charAt(0).toUpperCase()+x.slice(1),g)),t.defines.forEach((g,x)=>s.defines.set(e+x.charAt(0).toUpperCase()+x.slice(1),g));const y=new Map([["fragment",r],["vertex",n]]);Ae(e,S,s.defines),Ae(e,S,y),r=y.get("fragment"),n=y.get("vertex");const h=t.blendMode;if(s.blendModes.set(h.blendFunction,h),i){t.inputColorSpace!==null&&t.inputColorSpace!==s.colorSpace&&(d+=t.inputColorSpace===N?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),t.outputColorSpace!==tt?s.colorSpace=t.outputColorSpace:t.inputColorSpace!==null&&(s.colorSpace=t.inputColorSpace);const g=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;d+=`${e}MainImage(color0, UV, `,(s.attributes&X.DEPTH)!==0&&g.test(r)&&(d+="depth, ",s.readDepth=!0),d+=`color1);
	`;const x=e+"BlendOpacity";s.uniforms.set(x,h.opacity),d+=`color0 = blend${h.blendFunction}(color0, color1, ${x});

	`,c+=`uniform float ${x};

`}if(c+=r+`
`,n!==null&&(m+=n+`
`),u.set(E.FRAGMENT_HEAD,c),u.set(E.FRAGMENT_MAIN_UV,f),u.set(E.FRAGMENT_MAIN_IMAGE,d),u.set(E.VERTEX_HEAD,m),u.set(E.VERTEX_MAIN_SUPPORT,v),t.extensions!==null)for(const g of t.extensions)s.extensions.add(g)}}var Zs=class extends z{constructor(e,...t){super("EffectPass"),this.fullscreenMaterial=new Xs(null,null,null,e),this.listener=s=>this.handleEvent(s),this.effects=[],this.setEffects(t),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(e){for(const t of this.effects)t.mainScene=e}set mainCamera(e){this.fullscreenMaterial.copyCameraSettings(e);for(const t of this.effects)t.mainCamera=e}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(e){this.fullscreenMaterial.encodeOutput=e}get dithering(){return this.fullscreenMaterial.dithering}set dithering(e){const t=this.fullscreenMaterial;t.dithering=e,t.needsUpdate=!0}setEffects(e){for(const t of this.effects)t.removeEventListener("change",this.listener);this.effects=e.sort((t,s)=>s.attributes-t.attributes);for(const t of this.effects)t.addEventListener("change",this.listener)}updateMaterial(){const e=new jt;let t=0;for(const a of this.effects)if(a.blendMode.blendFunction===w.DST)e.attributes|=a.getAttributes()&X.DEPTH;else{if((e.attributes&a.getAttributes()&X.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);Ys("e"+t++,a,e)}let s=e.shaderParts.get(E.FRAGMENT_HEAD),r=e.shaderParts.get(E.FRAGMENT_MAIN_IMAGE),n=e.shaderParts.get(E.FRAGMENT_MAIN_UV);const i=/\bblend\b/g;for(const a of e.blendModes.values())s+=a.getShaderCode().replace(i,`blend${a.blendFunction}`)+`
`;(e.attributes&X.DEPTH)!==0?(e.readDepth&&(r=`float depth = readDepth(UV);

	`+r),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,e.colorSpace===N&&(r+=`color0 = sRGBToLinear(color0);
	`),e.uvTransformation?(n=`vec2 transformedUv = vUv;
`+n,e.defines.set("UV","transformedUv")):e.defines.set("UV","vUv"),e.shaderParts.set(E.FRAGMENT_HEAD,s),e.shaderParts.set(E.FRAGMENT_MAIN_IMAGE,r),e.shaderParts.set(E.FRAGMENT_MAIN_UV,n);for(const[a,o]of e.shaderParts)o!==null&&e.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=t===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(e)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(e,t=ee){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t;for(const s of this.effects)s.setDepthTexture(e,t)}render(e,t,s,r,n){for(const i of this.effects)i.update(e,t,r);if(!this.skipRendering||this.renderToScreen){const i=this.fullscreenMaterial;i.inputBuffer=t.texture,i.time+=r*this.timeScale,e.setRenderTarget(this.renderToScreen?null:s),e.render(this.scene,this.camera)}}setSize(e,t){this.fullscreenMaterial.setSize(e,t);for(const s of this.effects)s.setSize(e,t)}initialize(e,t,s){this.renderer=e;for(const r of this.effects)r.initialize(e,t,s);this.updateMaterial(),s!==void 0&&s!==Y&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const e of this.effects)e.removeEventListener("change",this.listener),e.dispose()}handleEvent(e){switch(e.type){case"change":this.recompile();break}}},Qs=class extends z{constructor(e,t,{renderTarget:s,resolutionScale:r=1,width:n=O.AUTO_SIZE,height:i=O.AUTO_SIZE,resolutionX:a=n,resolutionY:o=i}={}){super("NormalPass"),this.needsSwap=!1,this.renderPass=new lt(e,t,new Tt);const u=this.renderPass;u.ignoreBackground=!0,u.skipShadowMapUpdate=!0;const c=u.getClearPass();c.overrideClearColor=new J(7829503),c.overrideClearAlpha=1,this.renderTarget=s,this.renderTarget===void 0&&(this.renderTarget=new j(1,1,{minFilter:pe,magFilter:pe}),this.renderTarget.texture.name="NormalPass.Target");const f=this.resolution=new O(this,a,o,r);f.addEventListener("change",d=>this.setSize(f.baseWidth,f.baseHeight))}set mainScene(e){this.renderPass.mainScene=e}set mainCamera(e){this.renderPass.mainCamera=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,s,r,n){const i=this.renderToScreen?null:this.renderTarget;this.renderPass.render(e,i,i)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height)}};function ie(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}new I;new I;function ct(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var H=function e(t,s,r){var n=this;ct(this,e),ie(this,"dot2",function(i,a){return n.x*i+n.y*a}),ie(this,"dot3",function(i,a,o){return n.x*i+n.y*a+n.z*o}),this.x=t,this.y=s,this.z=r},Js=[new H(1,1,0),new H(-1,1,0),new H(1,-1,0),new H(-1,-1,0),new H(1,0,1),new H(-1,0,1),new H(1,0,-1),new H(-1,0,-1),new H(0,1,1),new H(0,-1,1),new H(0,1,-1),new H(0,-1,-1)],Ne=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],Oe=new Array(512),Fe=new Array(512),er=function(t){t>0&&t<1&&(t*=65536),t=Math.floor(t),t<256&&(t|=t<<8);for(var s=0;s<256;s++){var r;s&1?r=Ne[s]^t&255:r=Ne[s]^t>>8&255,Oe[s]=Oe[s+256]=r,Fe[s]=Fe[s+256]=Js[r%12]}};er(0);function tr(e){if(typeof e=="number")e=Math.abs(e);else if(typeof e=="string"){var t=e;e=0;for(var s=0;s<t.length;s++)e=(e+(s+1)*(t.charCodeAt(s)%96))%2147483647}return e===0&&(e=311),e}function Le(e){var t=tr(e);return function(){var s=t*48271%2147483647;return t=s,s/2147483647}}var sr=function e(t){var s=this;ct(this,e),ie(this,"seed",0),ie(this,"init",function(r){s.seed=r,s.value=Le(r)}),ie(this,"value",Le(this.seed)),this.init(t)};new sr(Math.random());const rr=p.createContext(null),ze=e=>(e.getAttributes()&2)===2,nr=p.memo(p.forwardRef(({children:e,camera:t,scene:s,resolutionScale:r,enabled:n=!0,renderPriority:i=1,autoClear:a=!0,depthBuffer:o,enableNormalPass:u,stencilBuffer:c,multisampling:f=8,frameBufferType:d=_t},m)=>{const{gl:v,scene:b,camera:S,size:y}=Me(),h=s||b,g=t||S,[x,M,A]=p.useMemo(()=>{const R=new Gt(v,{depthBuffer:o,stencilBuffer:c,multisampling:f,frameBufferType:d});R.addPass(new lt(h,g));let D=null,P=null;return u&&(P=new Qs(h,g),P.enabled=!1,R.addPass(P),r!==void 0&&(D=new Vs({normalBuffer:P.texture,resolutionScale:r}),D.enabled=!1,R.addPass(D))),[R,P,D]},[g,v,o,c,f,d,h,u,r]);p.useEffect(()=>x?.setSize(y.width,y.height),[x,y]),V((R,D)=>{if(n){const P=v.autoClear;v.autoClear=a,c&&!a&&v.clearStencil(),x.render(D),v.autoClear=P}},n?i:0);const F=p.useRef(null);p.useLayoutEffect(()=>{const R=[],D=F.current.__r3f;if(D&&x){const P=D.children;for(let k=0;k<P.length;k++){const G=P[k].object;if(G instanceof me){const Ce=[G];if(!ze(G)){let ge=null;for(;(ge=P[k+1]?.object)instanceof me&&!ze(ge);)Ce.push(ge),k++}const ft=new Zs(g,...Ce);R.push(ft)}else G instanceof z&&R.push(G)}for(const k of R)x?.addPass(k);M&&(M.enabled=!0),A&&(A.enabled=!0)}return()=>{for(const P of R)x?.removePass(P);M&&(M.enabled=!1),A&&(A.enabled=!1)}},[x,e,g,M,A]),p.useEffect(()=>{const R=v.toneMapping;return v.toneMapping=Ut,()=>{v.toneMapping=R}},[v]);const L=p.useMemo(()=>({composer:x,normalPass:M,downSamplingPass:A,resolutionScale:r,camera:g,scene:h}),[x,M,A,r,g,h]);return p.useImperativeHandle(m,()=>x,[x]),l.jsx(rr.Provider,{value:L,children:l.jsx("group",{ref:F,children:e})})}));let ir=0;const ke=new WeakMap,ut=(e,t)=>function({blendFunction:s=t?.blendFunction,opacity:r=t?.opacity,...n}){let i=ke.get(e);if(!i){const u=`@react-three/postprocessing/${e.name}-${ir++}`;pt({[u]:e}),ke.set(e,i=u)}const a=Me(u=>u.camera),o=_.useMemo(()=>[...t?.args??[],...n.args??[{...t,...n}]],[JSON.stringify(n)]);return l.jsx(i,{camera:a,"blendMode-blendFunction":s,"blendMode-opacity-value":r,...n,args:o})},ar=ut(ks,{blendFunction:0}),or=ut($s),dt=p.createContext(null);function W(){const e=p.useContext(dt);if(!e)throw new Error("useScrollProgress must be used within ScrollProgressProvider");return e}const He=new J(1,1,1),lr=.42,Ge=.015,je=.6,Ve=1.42,We=3.05,oe=new J;function $e(e,t,s,r){const n=Math.max(1e-4,s-t);e.r=Math.pow(B.clamp((e.r-t)/n,0,1),r),e.g=Math.pow(B.clamp((e.g-t)/n,0,1),r),e.b=Math.pow(B.clamp((e.b-t)/n,0,1),r)}function qe(e,t){e.r=B.clamp((e.r-.5)*t+.5,0,1),e.g=B.clamp((e.g-.5)*t+.5,0,1),e.b=B.clamp((e.b-.5)*t+.5,0,1)}function cr({...e}){const{scene:t}=ve("/models/vstar.glb"),{sceneRefs:s}=W(),r=p.useRef([]),n=p.useRef(-1);return p.useEffect(()=>{const i=[];t.traverse(a=>{if(a.isMesh&&a.material){const o=a.material;o.userData.velosteBasePrepared||(o.color&&(o.color.multiplyScalar(.76*lr),$e(o.color,Ge,je,Ve),qe(o.color,We)),"metalness"in o&&(o.metalness=.78),"roughness"in o&&(o.roughness=.38),o.envMapIntensity=.78,o.normalScale&&o.normalScale.set(1,1),o.emissive=new J("#ffffff"),o.emissiveIntensity=0,o.toneMapped=!0,o.userData.baseColor=o.color?.clone?.()??new J("#808080"),o.userData.baseMetalness=o.metalness,o.userData.baseRoughness=o.roughness,o.userData.baseEnvMapIntensity=o.envMapIntensity??1,o.userData.baseToneMapped=o.toneMapped,o.userData.velosteBasePrepared=!0),i.push(o)}}),r.current=i},[t]),V(()=>{const i=B.clamp(s.glow.current,0,1);for(const a of r.current){const o=a.userData.baseColor,u=a.userData.baseMetalness??.78,c=a.userData.baseRoughness??.38,f=a.userData.baseEnvMapIntensity??.78,d=a.userData.baseToneMapped??!0;if(i<=0){o&&a.color.copy(o),a.toneMapped=d,a.emissive.setRGB(1,1,1),a.emissiveIntensity=0,a.metalness=u,a.roughness=c,a.envMapIntensity=f;continue}if(Math.abs(i-n.current)<1e-4)continue;const m=1+i*4.35,v=i*12.5;a.toneMapped=d,i>=.98?a.color.copy(He):o&&(oe.copy(o).multiplyScalar(m),$e(oe,Math.max(0,Ge-i*.11),Math.max(.48,je-i*.06),Math.max(.58,Ve-i*.12)),qe(oe,We+i*.24),a.color.copy(oe).lerp(He,i)),a.emissive.setRGB(1,1,1),a.emissiveIntensity=v,a.metalness=B.clamp(u-i*.42,0,1),a.roughness=B.clamp(c-i*.12,.08,1),a.envMapIntensity=f+i*2.45}n.current=i}),l.jsx("primitive",{object:t,...e})}ve.preload("/models/vstar.glb");function ur(e){const{scene:t}=ve("/models/vstar.glb"),{sceneRefs:s}=W(),r=p.useRef(-1),{haloGroup:n,materials:i}=p.useMemo(()=>{const a=new Pt,o=t.clone(!0),u=[];return o.traverse(c=>{const f=c;if(!f.isMesh)return;const d=new Dt({color:16777215,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1,blending:It});f.material=d,u.push(d)}),a.add(o),{haloGroup:a,materials:u}},[t]);return V(()=>{const a=B.clamp(s.glow.current,0,1);if(Math.abs(a-r.current)<.02&&a>0&&a<1)return;r.current=a;const o=1+a*.045;n.scale.setScalar(o),n.visible=a>.04;const u=a*.1;for(const c of i)c.opacity=u}),l.jsx("primitive",{object:n,rotation:e.rotation})}ve.preload("/models/vstar.glb");const Ke=.15,dr=1.5,hr=1.6;function Xe({side:e,pos:t,worldZOfGroup:s,color:r,baseOpacity:n}){const{pRef:i,sceneRefs:a}=W(),o=p.useRef(null),u=p.useRef(null),c=p.useRef(1),f=p.useRef(-1);V(({viewport:m,camera:v})=>{const b=i.current,S=a.overlayBlur.current;if(S>.92){o.current&&(o.current.visible=!1);return}const y=L=>B.clamp((L-Ke)/(1-Ke),0,1),h=e==="right"?Math.max(0,b):Math.max(0,-b),g=Math.pow(y(h),dr),x=Math.pow(g,hr);if(Math.abs(x-f.current)<.004&&o.current?.visible){u.current&&(u.current.opacity=n*(1-B.clamp(S,0,1)));return}f.current=x;const M=m.getCurrentViewport(v,[0,0,s]);c.current=Math.max(M.width,M.height)/1.5;const A=.1,F=A*Math.pow(c.current/A,x);o.current&&(o.current.visible=x>.008,o.current.scale.setScalar(F)),u.current&&(u.current.opacity=n*(1-B.clamp(S,0,1)))});const d=e==="right"?-Math.abs(t.x):+Math.abs(t.x);return l.jsx(vt,{position:[d,t.y,t.z],follow:!0,children:l.jsxs("mesh",{ref:o,scale:.1,renderOrder:10,children:[l.jsx("circleGeometry",{args:[1,32]}),l.jsx("meshBasicMaterial",{ref:u,color:r,transparent:!0,opacity:n,depthTest:!1,depthWrite:!1,side:ne,toneMapped:!1})]})})}function fr({groupWorldZ:e=1}){return l.jsxs(l.Fragment,{children:[l.jsx(Xe,{side:"left",pos:{x:6,y:.22,z:0},worldZOfGroup:e,color:"#e8e8e8",baseOpacity:.55}),l.jsx(Xe,{side:"right",pos:{x:5.8,y:.22,z:0},worldZOfGroup:e,color:"#ffffff",baseOpacity:1})]})}const pr="max(8vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",le=8,mr=1240,Se="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",we="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",ce="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace",vr=[{id:"intro",eyebrow:"Calgary-first. Built custom.",title:"Calgary web developer for lead-generating websites.",body:"Veloste is a Calgary web developer and design studio building custom websites, motion-led interfaces, and immersive 3D experiences for businesses across Canada and the United States."},{id:"services",eyebrow:"Strategy, design, code.",title:"Custom websites built to convert.",body:"For teams that need more than a theme: clean structure, conversion-focused UX, strong visual systems, and code your team can iterate with confidence."},{id:"work",eyebrow:"For teams with momentum.",title:"Built for teams that need clarity and momentum.",body:"Veloste works with Calgary small businesses and founder-led teams - local service businesses that need qualified leads, teams replacing dated websites that do not explain value clearly, and businesses launching new offers that need a conversion-ready web presence quickly."},{id:"team",eyebrow:"Clear scope. Fast iteration.",title:"Discovery through launch, with clear scope.",body:"Every project starts with discovery: goals, audience, constraints, and conversion path. From there we shape structure and art direction, build with responsive QA and performance tuning, then support launch and post-launch iteration. Calgary-first delivery, with support across Airdrie, Cochrane, Okotoks, and Chestermere."}],gr=[{title:"Brand-led website design and development",body:"Positioning, UX, visual systems, and implementation shaped around the offer."},{title:"Interaction and motion system design",body:"Motion that clarifies the experience instead of decorating around it."},{title:"Immersive 3D web experiences",body:"Real-time interfaces for teams that need a distinctive first impression."}],xr=["Custom builds","Conversion-focused UX","Motion-led interfaces"],br=["Local service businesses that need qualified leads.","Teams replacing dated sites that no longer explain their value.","Founders launching new offers that need a focused web presence quickly."],Sr=["Discovery","Structure","Art direction","Build and launch"];function wr({active:e}){const t=_.useRef(null),s=_.useRef(null),r=_.useRef(!1),[n,i]=_.useState(!1),[a,o]=_.useState(!1);_.useEffect(()=>{const c=window.matchMedia("(prefers-reduced-motion: reduce)");o(c.matches);const f=()=>o(c.matches);return c.addEventListener("change",f),()=>c.removeEventListener("change",f)},[]);const u=_.useCallback(()=>{const c=t.current;c&&i(c.scrollHeight-c.clientHeight>2)},[]);return p.useLayoutEffect(()=>{e&&u()},[e,u]),_.useEffect(()=>{u();let c=null;return typeof ResizeObserver<"u"&&(c=new ResizeObserver(u),t.current&&c.observe(t.current)),window.addEventListener("resize",u),()=>{c?.disconnect(),window.removeEventListener("resize",u)}},[u]),_.useEffect(()=>{const c=t.current;e&&!r.current&&c&&(c.scrollTo({top:0,behavior:"auto"}),u()),r.current=e},[e,u]),l.jsxs(l.Fragment,{children:[l.jsx("style",{children:`
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
          width: min(100%, ${mr}px);
          margin: 0 auto;
          display: grid;
          gap: clamp(96px, 18vh, 190px);
          padding-bottom: clamp(88px, 16vh, 170px);
          color: #fff;
        }
        .about-block {
          min-height: min(86vh, 940px);
          scroll-snap-align: start;
          display: grid;
          grid-template-columns: minmax(76px, 0.18fr) minmax(0, 1fr);
          gap: clamp(18px, 4vw, 68px);
          align-items: center;
        }
        .about-rail {
          align-self: stretch;
          display: block;
          padding: clamp(6px, 1vw, 12px) 0;
          border-left: 1px solid rgba(255, 255, 255, 0.2);
        }
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
          font-family: ${ce};
          font-size: clamp(10px, 0.9vw, 12px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.72);
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.85);
        }
        .about-title {
          margin: 0;
          font-family: ${Se};
          font-size: clamp(42px, 8.4vw, 118px);
          line-height: 0.88;
          letter-spacing: 0.01em;
          color: #fff;
          max-width: 11.5ch;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
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
          color: rgba(255, 255, 255, 0.9);
          max-width: 54ch;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-signals {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          border-top: 1px solid rgba(255, 255, 255, 0.22);
          border-bottom: 1px solid rgba(255, 255, 255, 0.22);
        }
        .about-signal {
          min-height: 72px;
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-left: 1px solid rgba(255, 255, 255, 0.16);
          font-family: ${ce};
          font-size: clamp(10px, 0.95vw, 12px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.84);
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.85);
        }
        .about-signal:first-child {
          border-left: 0;
        }
        .about-case-link {
          width: fit-content;
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          border: 1px solid rgba(255, 255, 255, 0.34);
          border-radius: 0;
          font-family: ${ce};
          font-size: clamp(10px, 0.92vw, 12px);
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
          background: rgba(255, 255, 255, 0.045);
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.85);
          transition:
            background-color 160ms ease,
            border-color 160ms ease;
        }
        .about-case-link:hover,
        .about-case-link:focus-visible {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.62);
          text-decoration: none;
        }
        .about-services {
          grid-column: 1 / -1;
          margin: clamp(10px, 1.4vw, 16px) 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          border-top: 1px solid rgba(255, 255, 255, 0.22);
        }
        .about-services li {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(240px, 0.7fr);
          gap: clamp(18px, 3vw, 44px);
          padding: clamp(18px, 2.4vw, 28px) 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .about-service-title {
          margin: 0;
          font-family: ${Se};
          font-size: clamp(28px, 4.7vw, 68px);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: rgba(255, 255, 255, 0.98);
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-service-body {
          margin: 0;
          align-self: center;
          font-family: ${we};
          font-size: clamp(14px, 1.24vw, 17px);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.78);
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.82);
        }
        .about-fit-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.22);
        }
        .about-fit-list li {
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          font-family: ${we};
          font-size: clamp(14px, 1.26vw, 18px);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.82);
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.82);
        }
        .about-process {
          margin: 0;
          padding: 0;
          list-style: none;
          display: block;
          border-top: 1px solid rgba(255, 255, 255, 0.22);
        }
        .about-process li {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: clamp(14px, 2vw, 24px);
          align-items: baseline;
          padding: clamp(12px, 1.8vw, 18px) 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
        }
        .about-process-num {
          font-family: ${ce};
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.48);
        }
        .about-process-name {
          font-family: ${Se};
          font-size: clamp(30px, 4vw, 58px);
          line-height: 0.9;
          color: rgba(255, 255, 255, 0.96);
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.85);
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
            border-top: 1px solid rgba(255, 255, 255, 0.22);
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
            border-top: 1px solid rgba(255, 255, 255, 0.14);
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
      `}),l.jsx("div",{style:{position:"relative",display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"transparent",color:"#fff",pointerEvents:e?"auto":"none",overflow:"hidden"},children:l.jsxs("div",{ref:t,className:"about-scroll",style:{flex:1,height:"100%",width:"100%",overflowY:e?"auto":"hidden",WebkitOverflowScrolling:e?"touch":"auto",overscrollBehavior:e?"contain":"auto",touchAction:e?"auto":"none",padding:pr},onWheel:c=>{if(!e)return;const f=t.current;if(!f)return;const{scrollTop:d,scrollHeight:m,clientHeight:v}=f,b=d<=le,S=d+v>=m-le;b&&c.deltaY<0||S&&c.deltaY>0||c.stopPropagation()},onTouchStart:c=>{!e||c.touches.length!==1||(s.current=c.touches[0].clientY)},onTouchEnd:()=>{s.current=null},onTouchMoveCapture:c=>{if(!e||!n||c.touches.length!==1)return;const f=c.touches[0].clientY,d=s.current;if(d===null)return;const m=d-f;s.current=f;const v=t.current;if(!v)return;const{scrollTop:b,scrollHeight:S,clientHeight:y}=v,h=b<=le,g=b+y>=S-le;h&&m<0||g&&m>0||c.stopPropagation()},onPointerDownCapture:c=>{e&&c.stopPropagation()},children:[l.jsx("div",{className:"about-shell",children:vr.map((c,f)=>l.jsxs("section",{className:`about-block about-block--${c.id} about-reveal`,style:{animationDelay:a?"0ms":`${f*70}ms`},"aria-label":c.title,children:[l.jsx("aside",{className:"about-rail","aria-hidden":!0}),l.jsxs("div",{className:"about-content",children:[l.jsxs("div",{className:"about-heading",children:[l.jsx("p",{className:"about-eyebrow",children:c.eyebrow}),l.jsx("h1",{className:"about-title",children:c.title})]}),l.jsxs("div",{className:"about-support",children:[l.jsx("p",{className:"about-body",children:c.body}),c.id==="intro"&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"about-signals","aria-label":"Veloste focus",children:xr.map(d=>l.jsx("span",{className:"about-signal",children:d},d))}),l.jsx("a",{className:"about-case-link",href:"/uptown-workroom/index.html",children:"View Uptown Workroom"})]}),c.id==="work"&&l.jsx("ul",{className:"about-fit-list","aria-label":"Who Veloste works with",children:br.map(d=>l.jsx("li",{children:d},d))}),c.id==="team"&&l.jsx("ol",{className:"about-process","aria-label":"Veloste process",children:Sr.map((d,m)=>l.jsxs("li",{children:[l.jsx("span",{className:"about-process-num",children:String(m+1).padStart(2,"0")}),l.jsx("span",{className:"about-process-name",children:d})]},d))})]}),c.id==="services"&&l.jsx("ul",{className:"about-services","aria-label":"Veloste services",children:gr.map(d=>l.jsxs("li",{children:[l.jsx("p",{className:"about-service-title",children:d.title}),l.jsx("p",{className:"about-service-body",children:d.body})]},d.title))})]})]},c.id))}),l.jsxs("nav",{className:"seo-links-hidden","aria-label":"SEO navigation links",children:[l.jsx("a",{href:"/web-developer-calgary/",children:"Calgary web developer services"}),l.jsx("a",{href:"/service-areas/calgary-region/",children:"Calgary-region coverage"}),l.jsx("a",{href:"mailto:contact@veloste.com",children:"Get a scoped quote"})]})]})})]})}const Tr="max(8vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",Er=1240,yr="'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif",se="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",Mr="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace",Ye="https://veloste-mailer.vercel.app".replace(/\/+$/,"");function Rr({active:e}){const[t,s]=_.useState(""),[r,n]=_.useState(""),[i,a]=_.useState(""),[o,u]=_.useState(!1),[c,f]=_.useState(!1),[d,m]=_.useState("");async function v(b){b.preventDefault(),u(!0),m("");try{if(!Ye)throw new Error("VITE_API_BASE_URL is not defined (and no dev fallback).");const S=await fetch(`${Ye}/api/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:r,message:i})});if(!S.ok){let y="Failed to send message";try{const h=await S.json();h?.error&&(y=h.error+(h?.hint?` ${h.hint}`:""))}catch{const h=await S.text().catch(()=>"");h&&(y=h)}throw new Error(y)}f(!0),s(""),n(""),a("")}catch(S){m(S instanceof Error?S.message:"Failed to send message. Please try again.")}finally{u(!1)}}return l.jsxs(l.Fragment,{children:[l.jsx("style",{children:`
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
          width: min(100%, ${Er}px);
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
        .contact-content {
          width: min(100%, 60rem);
          margin: 0 auto;
          padding: clamp(18px, 3vw, 30px);
          border-radius: 18px;
          background: rgba(0, 0, 0, 0.52);
          backdrop-filter: blur(8px) saturate(120%);
          -webkit-backdrop-filter: blur(8px) saturate(120%);
        }
        .contact-title {
          margin: 0;
          font-family: ${yr};
          font-size: clamp(42px, 10vw, 136px);
          line-height: 0.92;
          letter-spacing: 0.01em;
          color: rgba(255, 255, 255, 0.98);
          max-width: 12ch;
          text-shadow: 0 1px 14px rgba(0, 0, 0, 0.82);
        }
        .contact-body,
        .contact-meta {
          margin: 0;
          margin-top: clamp(14px, 2.2vw, 26px);
          font-family: ${se};
          font-size: clamp(16px, 1.8vw, 23px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.94);
          max-width: 58ch;
          text-shadow: 0 1px 14px rgba(0, 0, 0, 0.8);
        }
        .contact-meta {
          margin-top: clamp(10px, 1.4vw, 18px);
          font-size: clamp(15px, 1.5vw, 19px);
        }
        .contact-meta a {
          color: rgba(255, 255, 255, 0.98);
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
          font-family: ${Mr};
          font-size: clamp(11px, 1vw, 13px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.78);
        }
        .contact-field {
          box-sizing: border-box;
          width: 100%;
          padding: 12px 14px;
          font-size: 16px;
          line-height: 1.45;
          font-family: ${se};
          color: rgba(255, 255, 255, 0.98);
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-radius: 10px;
          outline: none;
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.7);
          transition: background-color 160ms ease;
        }
        .contact-field::placeholder {
          color: rgba(255, 255, 255, 0.66);
        }
        .contact-field:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
        }
        .contact-field:focus,
        .contact-field:focus-visible {
          background: rgba(255, 255, 255, 0.1);
        }
        .contact-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .contact-error {
          margin: 0;
          padding: 12px 0;
          font-family: ${se};
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.5;
          color: #ffb4a8;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .contact-submit {
          justify-self: start;
          margin-top: 8px;
          padding: 10px 16px;
          border: none;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.14);
          font-family: ${se};
          font-size: 14px;
          line-height: 1.2;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.98);
          cursor: pointer;
          text-shadow: none;
          transition: background-color 160ms ease, opacity 160ms ease;
        }
        .contact-submit:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.22);
          opacity: 1;
        }
        .contact-submit:disabled {
          opacity: 0.45;
          cursor: default;
        }
        .contact-submit:focus-visible {
          outline: none;
          background: rgba(255, 255, 255, 0.26);
        }
        .contact-success {
          margin: clamp(28px, 4vw, 48px) 0 0;
          max-width: 58ch;
          font-family: ${se};
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
      `}),l.jsx("div",{className:"contact-scroll",style:{display:"flex",width:"100%",height:"calc(var(--vh, 1vh) * 100)",background:"transparent",color:"#fff",pointerEvents:e?"auto":"none",overflowY:e?"auto":"hidden",WebkitOverflowScrolling:e?"touch":"auto",overscrollBehavior:e?"contain":"auto",touchAction:e?"auto":"none",padding:Tr,boxSizing:"border-box"},children:l.jsx("div",{className:"contact-shell",children:l.jsx("section",{className:"contact-block","aria-label":"05 Contact",children:l.jsxs("div",{className:"contact-content",children:[l.jsx("h1",{className:"contact-title",children:"Get a scoped quote."}),l.jsx("p",{className:"contact-body",children:"Share your business type, timeline, and budget range. We'll reply with a recommended scope and next steps."}),l.jsxs("p",{className:"contact-meta",children:["Calgary-based, serving Airdrie, Cochrane, Okotoks, and Chestermere. Email"," ",l.jsx("a",{href:"mailto:contact@veloste.com",children:"contact@veloste.com"})," or call ",l.jsx("a",{href:"tel:+18255214542",children:"(825) 521-4542"}),"."]}),c?l.jsx("p",{className:"contact-success",children:"Thanks — we'll get back to you shortly."}):l.jsxs("form",{className:"contact-form",onSubmit:v,noValidate:!0,children:[l.jsxs("div",{className:"contact-fields-row",children:[l.jsxs("div",{className:"contact-field-wrap",children:[l.jsx("label",{htmlFor:"contact-name",className:"contact-label",children:"Name"}),l.jsx("input",{id:"contact-name",className:"contact-field",type:"text",value:t,onChange:b=>s(b.target.value),required:!0,autoComplete:"name",placeholder:"Your name"})]}),l.jsxs("div",{className:"contact-field-wrap",children:[l.jsx("label",{htmlFor:"contact-email",className:"contact-label",children:"Email"}),l.jsx("input",{id:"contact-email",className:"contact-field",type:"email",value:r,onChange:b=>n(b.target.value),required:!0,autoComplete:"email",placeholder:"you@example.com"})]})]}),l.jsxs("div",{className:"contact-field-wrap",children:[l.jsx("label",{htmlFor:"contact-message",className:"contact-label",children:"Message"}),l.jsx("textarea",{id:"contact-message",className:"contact-field contact-textarea",required:!0,value:i,onChange:b=>a(b.target.value),placeholder:"Tell us about your project, timeline, and goals…",rows:5})]}),d&&l.jsx("p",{className:"contact-error",role:"alert","aria-live":"polite",children:d}),l.jsx("button",{type:"submit",className:"contact-submit",disabled:o,children:o?"Sending…":"Send message"})]})]})})})})]})}const Br=_.memo(wr),Cr=_.memo(Rr);function _r({leftInteractive:e,rightInteractive:t}){return l.jsxs("div",{className:"veloste-overlay","aria-hidden":!1,children:[l.jsxs("div",{className:"veloste-scroll-indicators","aria-hidden":!0,children:[l.jsxs("div",{className:"veloste-scroll-indicator veloste-scroll-indicator--left",children:[l.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:l.jsx("path",{d:"M11 4L6 9L11 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),l.jsx("span",{children:"About"})]}),l.jsxs("div",{className:"veloste-scroll-indicator veloste-scroll-indicator--right",children:[l.jsx("span",{children:"Contact"}),l.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:l.jsx("path",{d:"M7 4L12 9L7 14",stroke:"#fff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]}),l.jsx("div",{className:"veloste-pane veloste-pane--left",children:l.jsx(Br,{active:e})}),l.jsx("div",{className:"veloste-pane veloste-pane--right",children:l.jsx(Cr,{active:t,stacked:!0})})]})}function K({baseIntensity:e,...t}){const s=p.useRef(null),{sceneRefs:r}=W(),n=p.useRef(1);return V(()=>{const i=s.current;if(!i)return;const a=r.lightBoost.current;Math.abs(a-n.current)<1e-4||(n.current=a,i.intensity=e*a)}),l.jsx(xt,{ref:s,intensity:e,...t})}function ue({baseIntensity:e,position:t}){const s=p.useRef(null),{sceneRefs:r}=W(),n=p.useRef(1);return V(()=>{const i=r.lightBoost.current;Math.abs(i-n.current)<1e-4||(n.current=i,s.current&&(s.current.intensity=e*i))}),l.jsx("directionalLight",{ref:s,position:t,intensity:e,color:"#ffffff"})}function Ur({baseIntensity:e,position:t,distance:s}){const r=p.useRef(null),{sceneRefs:n}=W(),i=p.useRef(1);return V(()=>{const a=n.lightBoost.current;Math.abs(a-i.current)<1e-4||(i.current=a,r.current&&(r.current.intensity=e*a))}),l.jsx("pointLight",{ref:r,position:t,intensity:e,color:"#ffffff",distance:s,decay:2})}function Pr(){const{sceneRefs:e}=W(),t=p.useRef(null),s=p.useRef(null),r=p.useRef(1);return V(()=>{const n=e.lightBoost.current;Math.abs(n-r.current)<1e-4||(r.current=n,t.current&&(t.current.intensity=.008*n),s.current&&(s.current.intensity=.016*n))}),l.jsxs(l.Fragment,{children:[l.jsx("ambientLight",{ref:t,intensity:.008}),l.jsx("hemisphereLight",{ref:s,intensity:.016,color:"#ffffff",groundColor:"#000000"}),l.jsx(ue,{baseIntensity:10,position:[5.5,6.5,5.5]}),l.jsx(ue,{baseIntensity:6.5,position:[-7.5,2.8,-5.5]}),l.jsx(ue,{baseIntensity:4.2,position:[.8,.4,-9]}),l.jsx(ue,{baseIntensity:2.8,position:[7,1.5,-4.5]}),l.jsx(Ur,{baseIntensity:22,position:[-1.8,-5.8,3.2],distance:7}),l.jsxs(gt,{background:!1,blur:.55,frames:1,children:[l.jsx(K,{baseIntensity:28,form:"rect",color:"#ffffff",scale:[1.4,1.1,1],position:[2.4,3.2,3.6],rotation:[-.62,-.32,0]}),l.jsx(K,{baseIntensity:17,form:"rect",color:"#ffffff",scale:[1.5,.32,1],position:[1.2,.8,2.4],rotation:[-.12,-.18,0]}),l.jsx(K,{baseIntensity:22,form:"rect",color:"#ffffff",scale:[.42,7.5,1],position:[-2.1,.45,-3.6],rotation:[0,Math.PI,0]}),l.jsx(K,{baseIntensity:11,form:"rect",color:"#ffffff",scale:[.38,6,1],position:[2.3,-.15,-3.4],rotation:[0,Math.PI,0]}),l.jsx(K,{baseIntensity:18,form:"rect",color:"#ffffff",scale:[5.5,.38,1],position:[0,3.1,-3.2],rotation:[-.42,0,0]}),l.jsx(K,{baseIntensity:12,form:"rect",color:"#ffffff",scale:[4.5,.32,1],position:[0,-2.6,-3.3],rotation:[.38,0,0]}),l.jsx(K,{baseIntensity:7,form:"rect",color:"#ffffff",scale:[5,1.1,1],position:[.5,6.2,-1.2],rotation:[Math.PI/2.35,.12,0]})]})]})}const Ze=(e,t,s)=>{const r=B.clamp((s-e)/Math.max(1e-6,t-e),0,1);return r*r*(3-2*r)};function Dr(e,{deadZone:t=.15,easePower:s=1.5,curvePower:r=1.6}={}){const n=y=>B.clamp((y-t)/(1-t),0,1),i=Math.max(0,e),a=Math.max(0,-e),o=Math.pow(n(i),s),u=Math.pow(n(a),s),c=Math.pow(o,r),f=Math.pow(u,r),d=Ze(.62,.95,c),m=Ze(.62,.95,f),v=B.clamp(Math.pow(m,.88),0,1),b=B.clamp(Math.pow(d,.88),0,1),S=Math.max(v,b);return{leftOpacity:m,rightOpacity:d,aboutBlurAmount:v,contactBlurAmount:b,overlayBlurAmount:S,indicatorOpacity:1-Math.min(1,Math.abs(e)/t)}}const Qe=360,Ir=240,Ar=120,Nr=120,Te=2e3,Q=()=>typeof performance<"u"?performance.now():Date.now(),de=e=>Math.max(0,Math.min(1,e)),re=(e,t,s)=>{e.push(t),e.length>s&&e.shift()},Or=(e,t)=>{if(!e.length)return 0;const s=[...e].sort((n,i)=>n-i),r=Math.min(s.length-1,Math.floor((s.length-1)*t));return s[r]},C=(e,t=2)=>Number(e.toFixed(t)),Fr=()=>typeof window>"u"?!1:new URLSearchParams(window.location.search).get("debugScroll")==="1"?!0:window.localStorage.getItem("velosteDebugScroll")==="1";class Lr{enabled=Fr();frameTimesMs=[];frameTs=[];inputEvents=[];longTasks=[];thresholdEvents=[];pCurrent=0;pTarget=0;overlayBlur=0;leftOpacity=0;rightOpacity=0;indicatorOpacity=1;scrollCurveConfig=null;recordFrame({dtSeconds:t,pCurrent:s,pTarget:r}){if(!this.enabled)return;const n=Q(),i=t*1e3;re(this.frameTimesMs,i,Qe),re(this.frameTs,n,Qe),this.pCurrent=s,this.pTarget=r}recordDerived({overlayBlur:t,leftOpacity:s,rightOpacity:r,indicatorOpacity:n}){this.enabled&&(this.overlayBlur=de(t),this.leftOpacity=de(s),this.rightOpacity=de(r),this.indicatorOpacity=de(n))}recordInput(t){this.enabled&&re(this.inputEvents,t,Ir)}recordLongTask(t){this.enabled&&re(this.longTasks,{t:Q(),duration:Math.max(0,t)},Ar)}recordThreshold(t,s){this.enabled&&re(this.thresholdEvents,{t:Q(),name:t,active:s},Nr)}setCurveConfig(t){this.enabled&&(this.scrollCurveConfig=t)}recentFilter(t,s){const r=Q()-s;return t.filter(n=>n.t>=r)}getSnapshot(t=Te){if(!this.enabled)return{enabled:!1,fpsAvg:0,fpsP95:0,frameTimeAvgMs:0,frameTimeP95Ms:0,worstFrameMs:0,droppedPct:0,longTaskCount:0,longTaskMaxMs:0,wheelPerSec:0,touchPerSec:0,consumedInputPct:0,clampedInputPct:0,maxDeltaP:0,pCurrent:0,pTarget:0,overlayBlur:0,leftOpacity:0,rightOpacity:0,indicatorOpacity:1,sampleCount:0};const s=Q()-t,r=this.frameTimesMs.filter((h,g)=>this.frameTs[g]>=s),n=r.length,i=n>0?r.reduce((h,g)=>h+g,0)/n:0,a=Or(r,.95),o=r.length?Math.max(...r):0,u=r.filter(h=>h>20).length,c=this.recentFilter(this.inputEvents,t),f=c.filter(h=>h.mode==="wheel").length,d=c.filter(h=>h.mode==="touch").length,m=c.filter(h=>h.consumed).length,v=c.filter(h=>h.clamped).length,b=c.length?Math.max(...c.map(h=>Math.abs(h.deltaP))):0,S=this.recentFilter(this.longTasks,t),y=S.length?Math.max(...S.map(h=>h.duration)):0;return{enabled:!0,fpsAvg:C(i>0?1e3/i:0,1),fpsP95:C(a>0?1e3/a:0,1),frameTimeAvgMs:C(i,2),frameTimeP95Ms:C(a,2),worstFrameMs:C(o,2),droppedPct:C(n>0?u/n*100:0,1),longTaskCount:S.length,longTaskMaxMs:C(y,1),wheelPerSec:C(f*1e3/Math.max(1,t),1),touchPerSec:C(d*1e3/Math.max(1,t),1),consumedInputPct:C(c.length?m/c.length*100:0,1),clampedInputPct:C(c.length?v/c.length*100:0,1),maxDeltaP:C(b,4),pCurrent:C(this.pCurrent,4),pTarget:C(this.pTarget,4),overlayBlur:C(this.overlayBlur,3),leftOpacity:C(this.leftOpacity,3),rightOpacity:C(this.rightOpacity,3),indicatorOpacity:C(this.indicatorOpacity,3),sampleCount:n}}getSummaryLine(t=Te){const s=this.getSnapshot(t);return s.enabled?[`fps ${s.fpsAvg} (p95 ${s.fpsP95})`,`ft ${s.frameTimeAvgMs}ms (p95 ${s.frameTimeP95Ms}ms)`,`drop ${s.droppedPct}%`,`long ${s.longTaskCount}/${s.longTaskMaxMs}ms`,`wheel ${s.wheelPerSec}/s`,`max dP ${s.maxDeltaP}`,`p ${s.pCurrent} -> ${s.pTarget}`,`blur ${s.overlayBlur}`].join(" | "):"scroll-debug disabled"}buildReport(t=Te){return{snapshot:this.getSnapshot(t),recentThresholdEvents:this.recentFilter(this.thresholdEvents,t).map(s=>({ageMs:C(Q()-s.t,1),name:s.name,active:s.active})),curveConfig:this.scrollCurveConfig,generatedAtIso:new Date().toISOString()}}}const U=new Lr;typeof window<"u"&&U.enabled&&(window.velosteScrollDebugReport=()=>U.buildReport());const zr=.88,kr=.72,Hr=.88,Gr=.72,jr=.88,Vr=.025,Wr=16;function ht(e,t){return Math.round(e*t)/t}function he(e,t,s,r,n,i=a=>a.toFixed(3)){const a=ht(n,1/Vr);t[s]!==a&&(t[s]=a,e.style.setProperty(r,i(a)))}function $r({groupRef:e,maxYaw:t,deadZone:s=.15,easePower:r=1.5,curvePower:n=1.6}){const{gl:i}=Me(),{pRef:a,sceneRefs:o}=W(),u=p.useRef(!1),c=p.useRef(!1),f=p.useRef(!1),d=p.useRef(!1),m=p.useRef(!1),v=p.useRef({}),b=p.useRef(0),S=typeof window<"u"&&window.innerWidth<768?6:8;return p.useEffect(()=>()=>{i.setClearColor(0,0),i.setClearAlpha(0),document.documentElement.classList.remove("veloste-panel-open","veloste-panel-blurred"),document.documentElement.style.removeProperty("--veloste-about-blur"),document.documentElement.style.removeProperty("--veloste-about-open"),document.documentElement.style.removeProperty("--veloste-left-opacity"),document.documentElement.style.removeProperty("--veloste-right-opacity"),document.documentElement.style.removeProperty("--veloste-indicator-opacity")},[i]),V(()=>{const y=Dr(a.current,{deadZone:s,easePower:r,curvePower:n}),{leftOpacity:h,rightOpacity:g,overlayBlurAmount:x,indicatorOpacity:M}=y;U.setCurveConfig({deadZone:s,easePower:r,curvePower:n}),U.recordDerived({overlayBlur:x,leftOpacity:h,rightOpacity:g,indicatorOpacity:M}),e.current&&(e.current.rotation.y=a.current*t);const A=x<.02?0:ht(x,Wr);if(o.glow.current=A,o.lightBoost.current=1+A*.6,o.overlayBlur.current=A,b.current+=1,b.current%2===0){const D=document.documentElement,P=v.current;he(D,P,"open","--veloste-about-open",x),he(D,P,"leftOpacity","--veloste-left-opacity",h),he(D,P,"rightOpacity","--veloste-right-opacity",g),he(D,P,"indicatorOpacity","--veloste-indicator-opacity",M);const k=x>.02;k!==f.current&&(f.current=k,D.classList.toggle("veloste-panel-open",k),U.recordThreshold("panelOpen",k));const G=x>=jr;G!==c.current&&(c.current=G,D.classList.toggle("veloste-panel-blurred",G),U.recordThreshold("canvasBlurred",G),D.style.setProperty("--veloste-about-blur",G?`${S}px`:"0px"))}const F=x>.02;F!==u.current&&(u.current=F,U.recordThreshold("opaqueCanvas",F),F?(i.setClearColor(0,1),i.setClearAlpha(1)):(i.setClearColor(0,0),i.setClearAlpha(0)));const L=d.current?h>kr:h>zr;L!==d.current&&(d.current=L,U.recordThreshold("leftInteractive",L),window.dispatchEvent(new CustomEvent("veloste:leftInteractive",{detail:{active:L}})));const R=m.current?g>Gr:g>Hr;R!==m.current&&(m.current=R,U.recordThreshold("rightInteractive",R),window.dispatchEvent(new CustomEvent("veloste:rightInteractive",{detail:{active:R}})))}),null}function qr({smooth:e,children:t}){const s=p.useRef(0),r=p.useRef(0),n=p.useRef(0),i=p.useRef(1),a=p.useRef(0),o=p.useMemo(()=>({pRef:s,pTargetRef:r,smooth:e,sceneRefs:{glow:n,lightBoost:i,overlayBlur:a}}),[e]);return l.jsx(dt.Provider,{value:o,children:t})}function Kr({children:e}){const{pRef:t,pTargetRef:s,smooth:r}=W();return V((n,i)=>{const a=1-Math.pow(r,i*60);t.current=B.lerp(t.current,s.current,a),U.recordFrame({dtSeconds:i,pCurrent:t.current,pTarget:s.current})}),l.jsx(l.Fragment,{children:e})}function Xr({ticksToMax:e,notchSize:t,polarity:s,children:r}){const{pTargetRef:n}=W();return p.useEffect(()=>{const i=h=>B.clamp(h,-1,1),a=()=>n.current<=-.999999,o=()=>n.current>=.999999,u=h=>-(h/t)*s/e,c=h=>!(h>0&&o()||h<0&&a()),f=h=>{const g=h.deltaMode===1?16:h.deltaMode===2?window.innerHeight:1,x=h.deltaY*g,M=u(x),F=n.current+M,L=i(F),R=c(M);U.recordInput({t:performance.now(),mode:"wheel",deltaP:M,consumed:R,clamped:Math.abs(L-F)>1e-9}),R&&(h.preventDefault(),n.current=L)};let d=0,m=!1;const v=h=>{h.touches.length===1&&(m=!0,d=h.touches[0].clientY)},b=h=>{if(!m||h.touches.length!==1)return;const g=h.touches[0].clientY,x=d-g;d=g;const M=u(x),F=n.current+M,L=i(F),R=c(M);U.recordInput({t:performance.now(),mode:"touch",deltaP:M,consumed:R,clamped:Math.abs(L-F)>1e-9}),R&&(h.preventDefault(),n.current=L)},S=()=>{m=!1},y=h=>{const g=h.detail;if(!g||typeof g.p!="number")return;const x=i(g.p);U.recordInput({t:performance.now(),mode:"api",deltaP:g.p-n.current,consumed:!0,clamped:Math.abs(x-g.p)>1e-9}),n.current=x};return window.addEventListener("wheel",f,{passive:!1}),window.addEventListener("touchstart",v,{passive:!0}),window.addEventListener("touchmove",b,{passive:!1}),window.addEventListener("touchend",S,{passive:!0}),window.addEventListener("veloste:setProgress",y),()=>{window.removeEventListener("wheel",f),window.removeEventListener("touchstart",v),window.removeEventListener("touchmove",b),window.removeEventListener("touchend",S),window.removeEventListener("veloste:setProgress",y)}},[e,t,s,n]),l.jsx(l.Fragment,{children:r})}function Yr({children:e,ticksToMax:t=24,notchSize:s=120,polarity:r=1,smooth:n=.85}){return l.jsx(qr,{smooth:n,children:l.jsx(Xr,{ticksToMax:t,notchSize:s,polarity:r,children:l.jsx(Kr,{children:e})})})}const Ee=2e3,Zr={enabled:!1,fpsAvg:0,fpsP95:0,frameTimeAvgMs:0,frameTimeP95Ms:0,worstFrameMs:0,droppedPct:0,longTaskCount:0,longTaskMaxMs:0,wheelPerSec:0,touchPerSec:0,consumedInputPct:0,clampedInputPct:0,maxDeltaP:0,pCurrent:0,pTarget:0,overlayBlur:0,leftOpacity:0,rightOpacity:0,indicatorOpacity:1,sampleCount:0};function Qr(){const[e,t]=p.useState(Zr);return p.useEffect(()=>{if(!U.enabled)return;const s=window.setInterval(()=>{t(U.getSnapshot(Ee))},250),r=window.setInterval(()=>{console.info(`[scroll-debug] ${U.getSummaryLine(Ee)}`)},Ee);return()=>{window.clearInterval(s),window.clearInterval(r)}},[]),p.useEffect(()=>{if(!U.enabled||typeof PerformanceObserver>"u")return;const s=new PerformanceObserver(r=>{for(const n of r.getEntries())U.recordLongTask(n.duration)});try{s.observe({type:"longtask",buffered:!0})}catch{return}return()=>s.disconnect()},[]),U.enabled?l.jsx("aside",{"aria-live":"off",style:{position:"absolute",top:10,right:10,zIndex:30,pointerEvents:"none",userSelect:"text",background:"rgba(0, 0, 0, 0.65)",color:"#d8f1ff",border:"1px solid rgba(152, 220, 255, 0.35)",borderRadius:8,padding:"8px 10px",font:"11px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",minWidth:240,whiteSpace:"pre"},children:[`fps ${e.fpsAvg} | p95 ${e.fpsP95}`,`ft ${e.frameTimeAvgMs}ms | p95 ${e.frameTimeP95Ms}ms`,`drop ${e.droppedPct}% | worst ${e.worstFrameMs}ms`,`long ${e.longTaskCount} | max ${e.longTaskMaxMs}ms`,`wheel ${e.wheelPerSec}/s touch ${e.touchPerSec}/s`,`consume ${e.consumedInputPct}% clamp ${e.clampedInputPct}%`,`max dP ${e.maxDeltaP}`,`p ${e.pCurrent} -> ${e.pTarget}`,`L ${e.leftOpacity}  R ${e.rightOpacity}`,`blur ${e.overlayBlur}  ind ${e.indicatorOpacity}`].join(`
`)}):null}function Jr(){const[e,t]=p.useState(1.5);return p.useEffect(()=>{const s=()=>{const r=window.innerWidth;t(r<480?1.15:r<768?1.35:1.5)};return s(),window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]),e}const en=_.memo(function({groupRef:t,maxYaw:s,deadZone:r,easePower:n,curvePower:i,groupZ:a,maxDpr:o,toneMappingExposure:u}){return l.jsx(mt,{className:"logo-canvas",dpr:[1,Math.min(o,typeof window<"u"?window.devicePixelRatio:1)],gl:{alpha:!0,antialias:!0,powerPreference:"high-performance",toneMapping:At,toneMappingExposure:u},style:{background:"transparent",touchAction:"none"},camera:{position:[0,0,7],fov:80},children:l.jsx(p.Suspense,{fallback:null,children:l.jsxs(Yr,{ticksToMax:7,notchSize:48,polarity:1,smooth:.88,children:[l.jsx($r,{groupRef:t,maxYaw:s,deadZone:r,easePower:n,curvePower:i}),l.jsx(Pr,{}),l.jsxs("group",{ref:t,position:[0,0,a],children:[l.jsx(ur,{rotation:[0,Math.PI*1.5,0]}),l.jsx(cr,{rotation:[0,Math.PI*1.5,0]}),l.jsx(fr,{groupWorldZ:a})]}),l.jsxs(nr,{multisampling:o>1.25?4:0,children:[l.jsx(ar,{intensity:.36,luminanceThreshold:.72,luminanceSmoothing:.18,mipmapBlur:!0}),l.jsx(or,{offset:.32,darkness:.72})]})]})})})}),nn=()=>{const e=p.useRef(null),t=1,s=B.degToRad(40),r=Jr(),n=.15,i=1.5,a=1.6,o={whites:52,highlights:46,shadows:-76,blacks:-86},u=b=>B.clamp(b/100,-1,1),c=1+u(o.whites)*.22+u(o.highlights)*.2-Math.abs(u(o.shadows))*.06-Math.abs(u(o.blacks))*.05,[f,d]=p.useState(!1),[m,v]=p.useState(!1);return p.useEffect(()=>{const b=y=>{const h=y.detail.active;d(h)},S=y=>{const h=y.detail.active;v(h)};return window.addEventListener("veloste:leftInteractive",b),window.addEventListener("veloste:rightInteractive",S),()=>{window.removeEventListener("veloste:leftInteractive",b),window.removeEventListener("veloste:rightInteractive",S)}},[]),l.jsxs("div",{className:"logo-wrap",children:[l.jsx("div",{className:"bg-text",children:"VELOSTE"}),l.jsx("div",{className:"logo-about-plate","aria-hidden":!0}),l.jsx(en,{groupRef:e,maxYaw:s,deadZone:n,easePower:i,curvePower:a,groupZ:t,maxDpr:r,toneMappingExposure:c}),l.jsx(_r,{leftInteractive:f,rightInteractive:m}),l.jsx(Qr,{})]})};export{nn as default};
