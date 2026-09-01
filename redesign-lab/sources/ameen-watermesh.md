# ameen-abdullah.dev WaterMesh — source capture [Bob, 2026-06-15]

**Retrieved by:** Bob (water agent). The web-agent audit could READ but not paste this (chat data-leak filter
blocks pasting dense minified JS). Bob downloaded the bundle directly and extracted the class — no filter issue.

- **URL:** https://ameen-abdullah.dev/assets/index-DAPlJ0Hw.js  (content-hashed; may change on redeploy)
- **Bundle length:** 1,641,198 chars. **Class start offset:** 1,453,675 (`class JK extends Tr`), `isWaterMesh` at 1,453,743.
- **Method:** Invoke-WebRequest -> Get-Content -Raw -> LastIndexOf('class', idx('isWaterMesh')) -> Substring.

## VERBATIM (the WaterMesh class, minified, untouched)
```js
class JK extends Tr{constructor(e,t){const r=new eU;super(e,r),this.isWaterMesh=!0,this.resolution=t.resolution!==void 0?t.resolution:.5,this.waterNormals=Il(t.waterNormals),this.alpha=Et(t.alpha!==void 0?t.alpha:1),this.size=Et(t.size!==void 0?t.size:1),this.timeFactor=Et(t.speed!==void 0?t.speed:1),this.sunColor=Et(new je(t.sunColor!==void 0?t.sunColor:16777215)),this.sunDirection=Et(t.sunDirection!==void 0?t.sunDirection:new oe(.70707,.70707,0)),this.waterColor=Et(new je(t.waterColor!==void 0?t.waterColor:8355711)),this.distortionScale=Et(t.distortionScale!==void 0?t.distortionScale:20);const i=bn(([g])=>{const m=Nn.mul(this.timeFactor),A=Cv(pa(g,103),kr(pa(m,17),pa(m,29))).toVar(),_=pa(g,107).sub(kr(pa(m,-19),pa(m,31))).toVar(),v=Cv(pa(g,kr(8907,9803)),kr(pa(m,101),pa(m,97))).toVar(),y=Ep(pa(g,kr(1091,1027)),kr(pa(m,109),pa(m,-113))).toVar(),x=this.waterNormals.sample(A),b=this.waterNormals.sample(_),E=this.waterNormals.sample(v),S=this.waterNormals.sample(y);return x.add(b).add(E).add(S).mul(.5).sub(1)}),s=i(Am.xz.mul(this.size)),a=KS(s.xzy.mul(1.5,1,1.5)),o=y7.sub(Am),l=KS(o),c=KS(I7(this.sunDirection.negate(),a)),u=xh(0,ai(l,c)),h=qO(u,100).mul(this.sunColor).mul(2),d=xh(ai(this.sunDirection,a),0).mul(this.sunColor).mul(.5),p=qS(o),f=a.xz.mul(nt(.001).add(nt(1).div(p))).mul(this.distortionScale);r.transparent=!0,r.opacityNode=this.alpha,r.receivedShadowPositionNode=Am.add(f),r.setupOutgoingLight=()=>E7.rgb,r.colorNode=bn(()=>{const g=B7();g.uvNode=g.uvNode.add(f),g.resolution=this.resolution,this.add(g.target);const m=xh(ai(l,a),0),A=nt(.3),_=Ml(qO(nt(1).sub(m),5),nt(1).sub(A)).add(A),v=xh(0,ai(a,l)).mul(this.waterColor);return fa(this.sunColor.mul(d).mul(.3).add(v),g.rgb.mul(h).add(g.rgb.mul(.9)).add(qr(.1)),_)})()}}
```

## De-minified reading (Bob)
It is a **TSL (Three.js Shading Language) NodeMaterial** water, NOT a classic WebGL ShaderMaterial.
- `eU` = a NodeMaterial; `B7()` = the TSL **`reflector()`** node (`g.uvNode`, `g.resolution`, `g.target`, `this.add(g.target)` = the planar-reflection render target).
- `bn(...)` = TSL `Fn`; `pa`=mul, `kr`=add, `Cv/Ep`=vec2 builders, `.sample()` = texture node sample, `Nn`=time, `Am`=positionWorld, `KS`=normalize, `ai`=dot, `qO`=pow, `xh`=max, `fa`=mix.
- **The technique is literally the stock three.js `Water` example (`examples/jsm/objects/Water.js`) re-expressed in TSL:** `getNoise` = FOUR `waterNormals` samples at 4 scaled+scrolling UVs, averaged (`x+b+E+S)*0.5-1`) -> distorted normal `a`; sun **specular** `pow(dot,100)*sunColor`; **diffuse** `waterColor`; **fresnel** mix `pow(1-dot,5)`; reflection UV offset `f = normal.xz * (0.001 + 1/dist) * distortionScale`. Same uniform names (waterColor/sunColor/sunDirection/distortionScale) confirm the lineage.

## Verdict for the water rework
- **CANNOT port verbatim** into Rod's `MirroredSurface` — that's classic WebGL `ShaderMaterial` + manual mirror-camera; this is TSL node material (needs WebGPU/NodeMaterial path). Different paradigm.
- **USABLE technique (the "change the noise" Rod wants):** replace the single scrolling-DUDV sample in `mirroredSurface.js` with the **4-sample averaged normal-map distortion** from three.js `Water.getNoise` (True source: three.js examples, MIT; ameen = confirming real-world usage). Smoother, more organic than one DUDV scroll, and it drops into the existing ShaderMaterial as plain GLSL.
- This capture = reference/True source for the noise change; ameen NodeMaterial itself is not copied.
