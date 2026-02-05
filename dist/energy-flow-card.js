/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,g=globalThis,u=g.trustedTypes,f=u?u.emptyScript:"",_=g.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??$)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[m("elementProperties")]=new Map,v[m("finalized")]=new Map,_?.({ReactiveElement:v}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+H,M=`<${C}>`,k=document,P=()=>k.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,R=/>/g,V=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),W=new WeakMap,q=k.createTreeWalker(k,129);function Z(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=z;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===z?"!--"===l[1]?o=T:void 0!==l[1]?o=R:void 0!==l[2]?(I.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=V):void 0!==l[3]&&(o=V):o===V?">"===l[0]?(o=n??z,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?V:'"'===l[3]?B:N):o===B||o===N?o=V:o===T||o===R?o=z:(o=V,n=void 0);const d=o===V&&t[e+1].startsWith("/>")?" ":"";r+=o===z?i+M:h>=0?(s.push(a),i.slice(0,h)+S+i.slice(h)+H+d):i+H+(-2===h?e:d)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,h]=F(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=h[r++],i=s.getAttribute(t).split(H),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:X}),s.removeAttribute(t)}else t.startsWith(H)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(H),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),q.nextNode(),a.push({type:2,index:++n});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(H,t+1));)a.push({type:7,index:n}),t+=H.length-1}n++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===D)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=L(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=K(t,n._$AS(t,e.values),n,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=q.nextNode(),r++)}return q.currentNode=k,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),L(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=K(this,t,e,0),r=!L(t)||t!==this._$AH&&t!==D,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=K(this,s[i+o],e,o),a===D&&(a=this._$AH[o]),r||=!L(a)||a!==this._$AH[o],a===G?t=G:t!==G&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??G)===D)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(J,Q),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");class lt extends ot{constructor(){super(...arguments),this._cachedGradients=["",""],this._activeIndex=0,this._displayedGradient=null,this._width=0,this._height=0}static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static getConfigElement(){return document.createElement("slick-energy-flow-card-editor")}static getStubConfig(){return{type:"custom:slick-energy-flow-card",title:"Energiefluss",solar_entity:"",grid_import_entity:"",grid_export_entity:"",battery_entity:"",battery_soc_entity:"",home_entity:""}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={title:"Energiefluss",inverted_grid:!1,inverted_battery:!1,...t};if(e.inverted_grid&&"boolean"!=typeof e.inverted_grid)throw new Error("inverted_grid must be a boolean");if(e.inverted_battery&&"boolean"!=typeof e.inverted_battery)throw new Error("inverted_battery must be a boolean");this.config=e}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=e.contentRect;this._width=t.width,this._height=t.height,this.requestUpdate()}}),this._resizeObserver.observe(this)}disconnectedCallback(){this._resizeObserver&&this._resizeObserver.disconnect(),super.disconnectedCallback()}_getState(t){if(!this.hass||!t||!this.hass.states[t])return 0;const e=parseFloat(this.hass.states[t].state);return isNaN(e)?0:e}_formatPower(t){const e=Math.abs(t);return e>=1e3?`${(e/1e3).toFixed(1)} kW`:`${Math.round(e)} W`}render(){if(!this.config)return j``;const t=this.hass,e=t?this._getState(this.config.solar_entity):0;let i=0;if(this.config.grid_entity)i=t?this._getState(this.config.grid_entity):0,this.config.inverted_grid&&(i=-i);else{i=this._getState(this.config.grid_import_entity)-this._getState(this.config.grid_export_entity)}let s=this._getState(this.config.battery_entity);const n=this._getState(this.config.battery_soc_entity),r=this.config.autarky_entity?this._getState(this.config.autarky_entity):null,o=this.config.self_consumption_entity?this._getState(this.config.self_consumption_entity):null;this.config.inverted_battery&&(s=-s);let a=0;a=this.config.home_entity?this._getState(this.config.home_entity):e+i+s,a=Math.abs(a);const l=i<-10,h=i>10,c=!!this.config.battery_entity&&""!==this.config.battery_entity||!!this.config.battery_soc_entity&&""!==this.config.battery_soc_entity,d=s<-10,p=s>10;let g,u;g=e<=50?"#102027":e<1e3?"#e65100":e<2500?"#f57c00":e<5e3?"#ffa000":"#ffc107",u=a>e?"#455a64":"#1976d2";e>50&&i>=0&&i<=(d||n>=99?150:50)&&(u="#2196f3");const f=`linear-gradient(180deg, ${g} 0%, ${u} 100%)`;if(f!==this._displayedGradient){const t=(this._activeIndex+1)%2;this._cachedGradients[t]=f,this._activeIndex=t,this._displayedGradient=f}const _=j`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3.55,19L2,14H9.17L12,19H3.55M19.55,14L22,19H14.83L12,14H19.55M11.5,6L8.5,11H15.5L12.5,6H11.5M10.83,4L7,11H3L8,4H10.83M13.17,4H16L21,11H17L13.17,4Z"/></svg>`;const m=j`<svg viewBox="0 0 24 24"><path fill="currentColor" d="${"M8 2L6 5V8H7L6 10H4L3 12H1V14H6L7 16H8V22H10V16H11L12 14H17V12H16L15 10H13L12 8H13V5L11 2H8M11 14H8L7 12H12L11 14M11 10H8L7 8H12L11 10Z"}"/></svg>`,y=j`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>`,$=this._height>0&&(this._height<120||this._width<200),b=this._height>0&&!$&&this._height<210;let v="M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4Z";d?v="M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4M12 9L16 13H13V18H11V13H8L12 9Z":p&&(v="M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4M12 18L8 14H11V9H13V14H16L12 18Z");const x=j`<svg viewBox="0 0 24 24"><path fill="currentColor" d="${v}"/></svg>`;return j`
      <ha-card class="${$?"tiny":""} ${b?"small":""}">
        <div class="bg-layer" style="background: ${this._cachedGradients[0]}; opacity: ${0===this._activeIndex?1:0}"></div>
        <div class="bg-layer" style="background: ${this._cachedGradients[1]}; opacity: ${1===this._activeIndex?1:0}"></div>
        
        <!-- Tiny Mode Battery Indicator (Top Right) -->
        ${$&&c?j`
            <div class="status-badge" style="position: absolute; top: 6px; right: 8px; z-index: 2; display: flex; align-items: center; gap: 4px;">
                <span style="color: ${n<20?"#ff3b30":"inherit"}; display: flex; width: 14px;">${x}</span>
                <span>${Math.round(n)}%</span>
            </div>
        `:""}

        <div class="content">
          ${$?"":j`
              <div class="header">
                <span class="title">${this.config.title}</span>
                <div class="badges">
                     ${null!==r?j`<span class="status-badge" title="Autarkie"><span class="badge-label">AUT</span> ${Math.round(r)}%</span>`:""}
                     ${null!==o?j`<span class="status-badge" title="Eigenverbrauch"><span class="badge-label">EIG</span> ${Math.round(o)}%</span>`:""}
                     <span class="status-badge">${l?"Export":h?"Import":"Balance"}</span>
                     
                     <!-- Small Mode Battery Badge (Inline) -->
                     ${b&&c?j`
                        <span class="status-badge" style="display: inline-flex; align-items: center; gap: 4px; padding-left: 6px;">
                            <span style="color: ${n<20?"#ff3b30":"inherit"}; display: flex; width: 14px;">${x}</span>
                            ${Math.round(n)}%
                        </span>
                     `:""}
                </div>
              </div>
          `}

          <div class="main-stats">
            <!-- SOLAR (Left) -->
            <div class="stat-block solar ${e>10?"active":""}">
              <div class="icon-circle solar-icon">${_}</div>
              <div class="stat-value">${this._formatPower(e)}</div>
              ${$?"":j`<div class="stat-label">Solar</div>`}
            </div>

            <!-- HOME (Center) -->
            <div class="stat-block home">
              <div class="icon-circle home-icon">${y}</div>
              <div class="stat-value big">${this._formatPower(a)}</div>
              ${$?"":j`<div class="stat-label">Haus</div>`}
            </div>

            <!-- GRID (Right) -->
            <div class="stat-block grid ${Math.abs(i)>10?"active":""}">
              <div class="icon-circle grid-icon">${m}</div>
              <div class="stat-value">${this._formatPower(Math.abs(i))}</div>
              ${$?"":j`<span class="stat-label">${i>0?"Bezug":"Einsp."}</span>`}
            </div>
          </div>

          <!-- BATTERY (Bottom - Only Large Mode) -->
          ${!c||$||b?"":j`
            <div class="battery-section">
                <div class="batt-info">
                   <span class="batt-icon" style="color: ${n<20?"#ff3b30":"inherit"}">${x}</span>
                   <span class="batt-pct">${Math.round(n)}%</span>
                   <span class="batt-power">${Math.abs(s)>0?this._formatPower(s):"Standby"}</span>
                   <span class="batt-state">${d?"Laden":p?"Entladen":""}</span>
                </div>
                <div class="batt-bar-bg">
                    <div class="batt-bar-fill" style="width: ${n}%; background-color: ${n<20?"#ff3b30":"white"}"></div>
                </div>
            </div>
          `}

        </div>
      </ha-card>
    `}static get styles(){return r`
      :host {
        display: block;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        isolation: isolate;
      }
      ha-card {
        height: 100%;
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
        border: none;
        color: white;
        overflow: hidden;
        position: relative;
        background: black; /* Fallback */
      }
      
      .bg-layer {
          position: absolute;
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%;
          transition: opacity 2s ease;
          z-index: 0;
      }
      
      .content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
      }
      
      /* Header */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .title {
        font-size: 1.1rem;
        font-weight: 600;
        opacity: 0.9;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      }
      .status-badge {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        padding: 2px 8px;
        background: rgba(255,255,255,0.2);
        border-radius: 12px;
        backdrop-filter: blur(4px);
      }

      /* Main Stats Row */
      .main-stats {
        display: flex;
        justify-content: space-between;
        align-items: flex-end; /* Align bottom to keep hierarchy */
        flex-grow: 1;
        margin-bottom: 16px;
      }

      .stat-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        opacity: 0.7;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .stat-block.active, .stat-block.home {
        opacity: 1;
      }
      .stat-block.home {
        flex: 1.5; /* Home is wider */
        transform: translateY(-10px); /* Lift up slightly */
      }

      .icon-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .icon-circle svg {
        width: 20px;
        height: 20px;
      }
      
      .home-icon {
        width: 48px;
        height: 48px;
        background: rgba(255,255,255,0.25);
      }
      .home-icon svg { width: 28px; height: 28px; }

      .stat-value {
        font-size: 1.1rem;
        font-weight: 600;
        line-height: 1.1;
        text-shadow: 0 1px 3px rgba(0,0,0,0.3);
      }
      .stat-value.big {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 2px;
        letter-spacing: -0.5px;
      }
      
      .stat-label {
        font-size: 0.8rem;
        font-weight: 500;
        opacity: 0.8;
        margin-top: 4px;
      }

      /* Battery Section */
      .battery-section {
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
        padding: 10px 12px;
        margin-top: auto;
      }
      .batt-info {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
        font-size: 0.9rem;
        font-weight: 600;
      }
      .batt-icon svg { width: 16px; height: 16px; opacity: 0.8; }
      .batt-power {
        margin-left: auto;
        font-weight: 400;
        opacity: 0.8;
        font-size: 0.85rem;
      }
      .batt-state {
        font-size: 0.75rem;
        opacity: 0.6;
        text-transform: uppercase;
        font-weight: 700;
      }

      .batt-bar-bg {
        width: 100%;
        height: 6px;
        background: rgba(255,255,255,0.1);
        border-radius: 3px;
        overflow: hidden;
      }
      .batt-bar-fill {
        height: 100%;
        background-color: white;
        border-radius: 3px;
        transition: width 0.5s ease;
      }

      /* Tiny Mode */
      ha-card.tiny .content {
        padding: 4px;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      
      ha-card.tiny .main-stats {
        margin: 0;
        width: 100%;
        display: flex; 
        align-items: center;
        justify-content: space-evenly;
        flex-direction: row;
        gap: 4px;
      }
      
      ha-card.tiny .stat-block {
          flex: 0 1 auto;
          margin: 0;
          opacity: 0.9;
          transform: none;
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      
      /* Specific override for Tiny Home to not be special */
      ha-card.tiny .stat-block.home {
        transform: none;
        flex: 0 1 auto;
      }

      ha-card.tiny .icon-circle {
        width: 22px; height: 22px;
        margin-bottom: 2px;
        background: rgba(255,255,255,0.1);
      }
      ha-card.tiny .icon-circle svg { width: 14px; height: 14px; }
      
      ha-card.tiny .stat-value {
        font-size: 0.85rem; 
        font-weight: 600;
        line-height: 1;
      }
      ha-card.tiny .stat-value.big {
        font-size: 0.9rem;
        margin: 0;
      }

      /* Small Mode */
      ha-card.small .content { 
        padding: 8px 12px; 
      }
      ha-card.small .header { margin-bottom: 4px; }
      ha-card.small .title { font-size: 0.95rem; }
      
      ha-card.small .main-stats {
        justify-content: space-between;
        align-items: center; /* Vertically align all */
        margin-bottom: 0;
        flex-grow: 1;
      }
      
      ha-card.small .stat-block {
         transform: none !important;
         opacity: 0.9;
         display: flex;
         flex-direction: column;
         align-items: center;
      }
      
      ha-card.small .stat-block.home {
         flex: 1;
         transform: none; /* Flatten hierarchy */
      }
      
      /* Equalize icons in Small Mode */
      ha-card.small .icon-circle { width: 32px; height: 32px; margin-bottom: 4px; }
      ha-card.small .home-icon { width: 32px; height: 32px; } 
      ha-card.small .icon-circle svg { width: 18px; height: 18px; }
      
      ha-card.small .stat-value { font-size: 1rem; }
      ha-card.small .stat-value.big { font-size: 1.1rem; margin-bottom: 0; }
      ha-card.small .stat-label { font-size: 0.75rem; margin-top: 2px; }
    `}}customElements.get("slick-energy-flow-card")||(customElements.define("slick-energy-flow-card",lt),console.info("%c slick-energy-flow-card Registered","color: green; font-weight: bold;"));class ht extends ot{static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config=t}_valueChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,...t.detail.value}},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return j``;return j`<ha-form .hass=${this.hass} .data=${this._config} .schema=${[{name:"title",label:"Titel",selector:{text:{}}},{name:"solar_entity",label:"Solar Leistung",selector:{entity:{domain:"sensor"}}},{name:"grid_entity",label:"Netz Leistung",selector:{entity:{domain:"sensor"}}},{name:"battery_entity",label:"Batterie Leistung (Opt)",selector:{entity:{domain:"sensor"}}},{name:"battery_soc_entity",label:"Batterie Stand % (Opt)",selector:{entity:{domain:"sensor"}}},{name:"home_entity",label:"Haus Verbrauch (Opt)",selector:{entity:{domain:"sensor"}}},{name:"inverted_grid",label:"Invertiere Grid (+ ist Export)",selector:{boolean:{}}},{name:"inverted_battery",label:"Invertiere Batt (+ ist Laden)",selector:{boolean:{}}}]} .computeLabel=${t=>t.label} @value-changed=${this._valueChanged}></ha-form>`}}customElements.get("slick-energy-flow-card-editor")||customElements.define("slick-energy-flow-card-editor",ht),window.customCards=window.customCards||[],window.customCards.push({type:"slick-energy-flow-card",name:"Slick Energy Flow",preview:!0,description:"Modern energy flow visualization."});export{lt as EnergyFlowCard,ht as EnergyFlowCardEditor};
//# sourceMappingURL=energy-flow-card.js.map
