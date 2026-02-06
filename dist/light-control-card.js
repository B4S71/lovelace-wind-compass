/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,g=_?_.emptyScript:"",f=u.reactiveElementPolyfillSupport,v=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??$)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,x=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,O=`<${P}>`,R=document,T=()=>R.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,k="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,U=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,z=/"/g,V=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,G=R.createTreeWalker(R,129);function Z(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===N?"!--"===l[1]?n=D:void 0!==l[1]?n=H:void 0!==l[2]?(V.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=U):void 0!==l[3]&&(n=U):n===U?">"===l[0]?(n=o??N,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?U:'"'===l[3]?z:L):n===z||n===L?n=U:n===D||n===H?n=N:(n=U,o=void 0);const d=n===U&&t[e+1].startsWith("/>")?" ":"";r+=n===N?i+O:c>=0?(s.push(a),i.slice(0,c)+w+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,c]=X(t,e);if(this.el=Y.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(w)){const e=c[r++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),G.nextNode(),a.push({type:2,index:++o});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){if(e===j)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=M(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=F(t,o._$AS(t,e.values),o,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new J(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=G.nextNode(),r++)}return G.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),M(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Y(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new J(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=F(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==j,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=F(this,s[i+n],e,n),a===j&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends Q{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??B)===j)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(Y,J),(A.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new J(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");class lt extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){this._config=t}_valueChanged(t){const e={...this._config,...t.detail.value},i=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){if(!this.hass||!this._config)return W``;return W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"entity",label:"Light Entity",selector:{entity:{domain:"light"}}},{name:"name",label:"Name (Optional)",selector:{text:{}}},{name:"covers",label:"Covers",selector:{entity:{domain:"cover",multiple:!0}}},{name:"layout",label:"Layout Mode",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (Responsive)"},{value:"compact",label:"Compact"},{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}]}}}]}
        .computeLabel=${t=>t.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}}customElements.get("slick-light-control-card-editor")||customElements.define("slick-light-control-card-editor",lt);console.info("%c SLICK-LIGHT-CONTROL-CARD %c 0.2.0 ","color: white; background: #FFC107; font-weight: 700;","color: #FFC107; background: white; font-weight: 700;");class ct extends nt{constructor(){super(...arguments),this._computed={mode:"vertical",showCovers:!1,visibleCovers:0,supports2D:!1},this._interacting=!1,this._resizeObserver=null,this._cursorPos={x:0,y:0},this._activeSlider=null,this._pointerStartX=0,this._pointerStartY=0,this._longPressTimer=null,this._clickTimer=null,this._pendingPointerId=null,this._handleTouchMove=t=>{(this._interacting||this._activeSlider)&&t.cancelable&&t.preventDefault()},this._lastClick=0}static get properties(){return{hass:{attribute:!1},config:{state:!0},_interacting:{state:!0},_cursorPos:{state:!0},_computed:{state:!0}}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const{width:t,height:i}=e.contentRect;this._updateLayout(t,i)}}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null)}firstUpdated(t){var e;super.firstUpdated(t);const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("ha-card");i&&i.addEventListener("touchmove",this._handleTouchMove,{passive:!1})}_updateLayout(t,e){var i,s;const o=ct.SIZES,r=((null===(i=this.config)||void 0===i?void 0:i.covers)||[]).length;if((null===(s=this.config)||void 0===s?void 0:s.layout)&&"auto"!==this.config.layout){const t={compact:"compact",small:"vertical",medium:"horizontal",large:"vertical"}[this.config.layout]||"vertical";return void(this._computed={mode:t,showCovers:"compact"!==t&&r>0,visibleCovers:"compact"===t?0:r,supports2D:"compact"!==t})}const n=t-2*o.PAD_H,a=e-2*o.PAD_V,l=o.ICON;if(a<l)return void(this._computed={mode:"compact",showCovers:!1,visibleCovers:0,supports2D:!1});const c=a-l-o.CONTENT_GAP-o.COVER_SECTION_PAD,h=c>=o.COVER_ROW_H?Math.floor((c+o.COVER_GAP)/(o.COVER_ROW_H+o.COVER_GAP)):0,d=n-o.COVER_ICON_W,p=n-(o.ICON+o.HEADER_GAP+o.HEADER_MIN_W)-12-o.COVER_ICON_W,u=a,_=p>=o.SLIDER_MIN_W&&u>=o.COVER_ROW_H?Math.floor((u+o.COVER_GAP)/(o.COVER_ROW_H+o.COVER_GAP)):0;if(0===r)return void(this._computed={mode:"vertical",showCovers:!1,visibleCovers:0,supports2D:a>=l+40});const g=Math.min(r,h),f=Math.min(r,_);if(0===g&&0===f)return void(this._computed={mode:"vertical",showCovers:!1,visibleCovers:0,supports2D:a>=l+40});let v,m;g>=f&&d>=o.SLIDER_MIN_W?(v="vertical",m=g):f>g||p>d?(v="horizontal",m=f):(v="vertical",m=g),this._computed={mode:v,showCovers:m>0,visibleCovers:m,supports2D:"vertical"!==v||a>=l+40}}static getConfigElement(){return document.createElement("slick-light-control-card-editor")}static getStubConfig(){return{type:"custom:slick-light-control-card",entity:"light.example_light",name:"Living Room",covers:[]}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity (light)");this.config=t}shouldUpdate(t){if(t.has("config"))return!0;const e=t.get("hass");if(!e)return!0;if(e.states[this.config.entity]!==this.hass.states[this.config.entity])return!0;if(this.config.covers)for(const t of this.config.covers)if(e.states[t]!==this.hass.states[t])return!0;return!1}_toggleLight(t){t&&t.stopPropagation(),this.hass.callService("light","toggle",{entity_id:this.config.entity})}_handlePointerDown(t){var e,i,s;const o=t.composedPath();for(const t of o)if((null===(e=t.classList)||void 0===e?void 0:e.contains("control-btn"))||(null===(i=t.classList)||void 0===i?void 0:i.contains("icon-container"))||(null===(s=t.classList)||void 0===s?void 0:s.contains("slider-control")))return;const r=Date.now();if(r-this._lastClick<300&&(this._clickTimer&&(clearTimeout(this._clickTimer),this._clickTimer=null),"compact"===this._computed.mode&&this.config.covers&&this.config.covers.length>0))return this._openMoreInfo(this.config.covers[0]),this._longPressTimer&&clearTimeout(this._longPressTimer),void(this._pendingPointerId=null);this._lastClick=r,this._pointerStartX=t.clientX,this._pointerStartY=t.clientY,this._pendingPointerId=t.pointerId,this._longPressTimer=window.setTimeout(()=>{this._startInteraction()},500)}_openMoreInfo(t){const e=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_startInteraction(){var t;if(this._longPressTimer=null,!this._computed.supports2D)return this._openMoreInfo(this.config.entity),void(this._pendingPointerId=null);const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("ha-card");if(e){const t=e.getBoundingClientRect();this._cursorPos={x:this._pointerStartX-t.left,y:this._pointerStartY-t.top}}if(this._interacting=!0,navigator.vibrate&&navigator.vibrate(50),e&&null!==this._pendingPointerId)try{e.setPointerCapture(this._pendingPointerId)}catch(t){}}_handlePointerUp(t){var e;if(this._activeSlider){const{entityId:e,type:i,currentVal:s}=this._activeSlider;this._activeSlider=null;const o=t.target;if(o&&o.releasePointerCapture)try{o.releasePointerCapture(t.pointerId)}catch(t){}return"position"===i?this.hass.callService("cover","set_cover_position",{entity_id:e,position:s}):this.hass.callService("cover","set_cover_tilt_position",{entity_id:e,tilt_position:s}),void this.requestUpdate()}if(this._longPressTimer)return clearTimeout(this._longPressTimer),this._longPressTimer=null,"pointerup"===t.type&&(this._clickTimer&&clearTimeout(this._clickTimer),this._clickTimer=window.setTimeout(()=>{this._toggleLight(),this._clickTimer=null},250)),void(this._pendingPointerId=null);if(!this._interacting)return;this._interacting=!1,this._pendingPointerId=null;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("ha-card");if(i){if(i.releasePointerCapture)try{i.releasePointerCapture(t.pointerId)}catch(t){}"pointerup"===t.type&&this._applyLightState(t,i)}}_handlePointerMove(t){var e;if(this._activeSlider)return void this._handleSliderMove(t);if(this._longPressTimer){return void(Math.sqrt(Math.pow(t.clientX-this._pointerStartX,2)+Math.pow(t.clientY-this._pointerStartY,2))>5&&(clearTimeout(this._longPressTimer),this._longPressTimer=null,this._pendingPointerId=null))}if(!this._interacting)return;t.preventDefault(),t.stopPropagation();const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("ha-card");if(i){const e=i.getBoundingClientRect();this._cursorPos={x:t.clientX-e.left,y:t.clientY-e.top}}}_handleSliderDown(t,e,i,s){t.stopPropagation();const o=t.currentTarget;this._activeSlider={entityId:e,type:i,startX:t.clientX,startVal:s,currentVal:s},o.setPointerCapture(t.pointerId)}_handleSliderMove(t){if(!this._activeSlider)return;const e=t.target.closest(".slider-control");e&&this._processSliderMove(t,e)}_processSliderMove(t,e){const i=e.getBoundingClientRect(),{startX:s,startVal:o}=this._activeSlider,r=(t.clientX-s)/i.width*100;let n=Math.max(0,Math.min(100,Math.round(o+r)));n<5&&(n=0),n>95&&(n=100),this._activeSlider.currentVal=n,this.requestUpdate()}_applyLightState(t,e){const i=e.getBoundingClientRect(),s=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),o=Math.max(0,Math.min(1,(t.clientY-i.top)/i.height)),r=this.hass.states[this.config.entity];if(!r)return;let n=Math.round(100*(1-o));n>90&&(n=100),n<15&&(n=0);const a=r.attributes.min_mireds||153,l=r.attributes.max_mireds||500,c=Math.round(a+s*(l-a));if(0===n)return void this.hass.callService("light","turn_off",{entity_id:this.config.entity});const h={entity_id:this.config.entity,brightness_pct:n};r.attributes.min_mireds&&(h.color_temp=c),this.hass.callService("light","turn_on",h)}render(){const t=this.hass.states[this.config.entity];if(!t)return W`<ha-card class="not-found">Entity not found: ${this.config.entity}</ha-card>`;const e="on"===t.state,i=t.attributes.brightness?Math.round(t.attributes.brightness/255*100):0,s=t.attributes.min_mireds||153,o=t.attributes.max_mireds||500,r=t.attributes.color_temp||Math.round((s+o)/2),n=this.config.covers||[];let a="background: linear-gradient(135deg, #2c3e50 0%, #000000 100%);";if(this._interacting)a="background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), linear-gradient(to right, rgb(166, 209, 255) 0%, rgb(255, 160, 0) 100%);";else if(e){const e=(r-s)/(o-s);if(t.attributes.rgb_color){const[e,i,s]=t.attributes.rgb_color;a=`background: linear-gradient(135deg, rgba(${e},${i},${s},0.8) 0%, rgba(${e},${i},${s},0.4) 100%);`}else{const t=200+55*e,i=220-20*e,s=255-105*e;a=`background: linear-gradient(135deg, rgb(${t},${i},${s}) 0%, rgb(${Math.round(.6*t)},${Math.round(.6*i)},${Math.round(.6*s)}) 100%);`}}const{mode:l,showCovers:c,visibleCovers:h}=this._computed;return W`
      <ha-card 
        class="mode-${l}"
        style="${a}"
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
        @pointermove=${this._handlePointerMove}
      >
        <div class="layout mode-${l}">
            <div class="content" style="opacity: ${this._interacting?"0":"1"}; transition: opacity 0.15s">
                <!-- HEADER (always visible) -->
                <div class="header">
                    <div class="icon-container" @click=${this._toggleLight}>
                        <ha-icon icon="${t.attributes.icon||(e?"mdi:lightbulb-on":"mdi:lightbulb")}"></ha-icon>
                    </div>
                    <div class="info">
                        <span class="name">${this.config.name||t.attributes.friendly_name}</span>
                        <span class="state">${e?`${i}%`:"Off"}</span>
                    </div>
                </div>

                <!-- COVERS (shown only if computed layout says they fit) -->
                ${c?W`
                    <div class="covers-section" @pointerdown=${t=>t.stopPropagation()}>
                        ${n.slice(0,h).map(t=>this._renderCover(t))}
                    </div>
                `:""}
            </div>
        </div>

        <!-- 2D INTERACTION CURSOR -->
        <div class="cursor" 
             style="
                opacity: ${this._interacting?"1":"0"};
                transform: translate(${this._cursorPos.x-20}px, ${this._cursorPos.y-20}px);
             "
        ></div>
      </ha-card>
    `}_renderCover(t){const e=this.hass.states[t];if(!e)return W``;const i=!(128&~e.attributes.supported_features);let s="number"==typeof e.attributes.current_position?e.attributes.current_position:0,o="number"==typeof e.attributes.current_tilt_position?e.attributes.current_tilt_position:0;this._activeSlider&&this._activeSlider.entityId===t&&("position"===this._activeSlider.type?s=this._activeSlider.currentVal:"tilt"===this._activeSlider.type&&(o=this._activeSlider.currentVal));return W`
        <div class="cover-row" @contextmenu=${e=>{this._computed.supports2D||(e.preventDefault(),this._openMoreInfo(t))}}>
            <div class="cover-info">
                <ha-icon icon="${e.attributes.icon||"mdi:window-shutter"}"></ha-icon>
            </div>
            <div class="cover-sliders">
                <!-- Position Slider -->
                <div class="slider-control" 
                     @pointerdown=${e=>this._handleSliderDown(e,t,"position",s)}
                >
                     <div class="slider-fill" style="width: calc((100% - 50px) * ${s/100} + 46px)"></div>
                     <div class="slider-handle" style="left: calc((100% - 42px - 8px) * ${s/100} + 4px)"></div>
                     <div class="slider-label">${s}%</div>
                </div>

                <!-- Tilt Slider -->
                ${i?W`
                <div class="slider-control" 
                     @pointerdown=${e=>this._handleSliderDown(e,t,"tilt",o)}
                >
                     <div class="slider-fill" style="width: calc((100% - 50px) * ${o/100} + 46px)"></div>
                     <div class="slider-handle" style="left: calc((100% - 42px - 8px) * ${o/100} + 4px)"></div>
                     <div class="slider-label">Tilt: ${o}%</div>
                </div>
                `:""}
            </div>
        </div>
      `}static get styles(){return r`
      /* ═══════════════════════════════════════════
         BASE
         ═══════════════════════════════════════════ */
      :host {
        display: block;
        height: 100%;
      }

      ha-card {
        color: white;
        overflow: hidden;
        transition: background 0.1s linear;
        border: none;
        user-select: none;
        position: relative;
        cursor: grab;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: 100%;
      }
      ha-card:active { cursor: grabbing; }
      ha-card.mode-compact { cursor: pointer; }

      /* ═══════════════════════════════════════════
         LAYOUT CONTAINER
         Two modes: vertical (column) or horizontal (row)
         ═══════════════════════════════════════════ */
      .layout {
        padding: 5px 10px; /* SIZES.PAD_V / SIZES.PAD_H */
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }
      .layout.mode-horizontal {
        flex-direction: row;
        align-items: stretch;
        gap: 12px;
      }

      /* ═══════════════════════════════════════════
         CONTENT WRAPPER
         ═══════════════════════════════════════════ */
      .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 8px; /* SIZES.CONTENT_GAP */
        pointer-events: none;
        flex: 1;
        min-height: 0;
        text-shadow: 0 1px 3px rgba(0,0,0,0.6);
      }

      /* Vertical with covers: push covers to bottom */
      .mode-vertical .content {
        justify-content: space-between;
      }
      /* Vertical without covers: pack at top */
      .mode-compact .content {
        justify-content: flex-start;
      }

      /* Horizontal: side-by-side */
      .mode-horizontal .content {
        flex-direction: row;
        gap: 12px;
        justify-content: flex-start;
        align-items: stretch;
      }

      .content > * {
        pointer-events: auto;
      }

      /* ═══════════════════════════════════════════
         HEADER
         ═══════════════════════════════════════════ */
      .header {
        display: flex;
        align-items: center;
        gap: 12px; /* SIZES.HEADER_GAP */
        flex: 0 0 auto;
        text-shadow: 0 1px 3px rgba(0,0,0,0.6);
      }
      .mode-horizontal .header {
        align-self: flex-start; /* Pin to top in horizontal */
        min-width: 120px; /* SIZES.HEADER_MIN_W */
        width: auto;
      }

      .icon-container {
        flex: 0 0 40px; /* SIZES.ICON — never shrink, never grow */
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s;
      }
      .icon-container:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0; /* Allow text truncation */
      }
      .name {
        font-weight: 600;
        font-size: 1.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .state {
        opacity: 0.8;
        font-size: 0.9rem;
      }

      /* ═══════════════════════════════════════════
         COVERS SECTION
         ═══════════════════════════════════════════ */
      .covers-section {
        display: flex;
        flex-direction: column;
        gap: 8px; /* SIZES.COVER_GAP */
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px; /* SIZES.COVER_SECTION_PAD / 2 each side */
        margin: 0 -10px -5px; /* Bleed to edges */
      }

      /* Horizontal mode: covers float on the right side */
      .mode-horizontal .covers-section {
        border-top: none;
        margin: 0;
        background: none;
        backdrop-filter: none;
        padding: 0;
        flex: 1;
        align-self: flex-end; /* Pin to bottom */
        justify-content: flex-end;
      }

      .cover-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .cover-info {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        flex: 0 0 32px;
      }
      .cover-sliders {
        flex: 1;
        display: flex;
        flex-direction: row;
        gap: 8px;
        min-width: 0;
      }

      /* ═══════════════════════════════════════════
         SLIDERS
         ═══════════════════════════════════════════ */
      .slider-control {
        position: relative;
        height: 42px; /* SIZES.COVER_ROW_H */
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.3);
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        touch-action: none;
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
        min-width: 80px;
      }
      .slider-control:active {
        cursor: grabbing;
      }
      .slider-fill {
        position: absolute;
        top: 0; left: 0; bottom: 0;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0.25) calc(100% - 34px),
          rgba(255, 255, 255, 0) 100%
        );
        border-radius: 12px 0 0 12px;
        pointer-events: none;
      }
      .slider-handle {
        position: absolute;
        top: 4px;
        bottom: 4px;
        width: 34px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        pointer-events: none;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .slider-label {
        position: absolute;
        left: 0; right: 0;
        text-align: center;
        font-size: 0.75rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        pointer-events: none;
        z-index: 3;
        text-shadow: 0 1px 2px black;
        white-space: nowrap;
        overflow: hidden;
      }

      /* ═══════════════════════════════════════════
         2D CURSOR
         ═══════════════════════════════════════════ */
      .cursor {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.8);
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        pointer-events: none;
        transition: opacity 0.2s;
        will-change: transform;
        z-index: 10;
      }
    `}}ct.SIZES={ICON:40,HEADER_GAP:12,HEADER_MIN_W:120,COVER_ROW_H:42,COVER_ICON_W:40,COVER_GAP:8,COVER_SECTION_PAD:24,CONTENT_GAP:8,PAD_H:10,PAD_V:5,SLIDER_MIN_W:100},customElements.get("slick-light-control-card")||customElements.define("slick-light-control-card",ct),window.customCards=window.customCards||[],window.customCards.push({type:"slick-light-control-card",name:"Slick Light Control",description:"A card to control lights (brightness, color temp) and associated covers.",preview:!0});export{ct as LightControlCard};
//# sourceMappingURL=light-control-card.js.map
