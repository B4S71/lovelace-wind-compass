/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,$=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[$("elementProperties")]=new Map,b[$("finalized")]=new Map,m?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=t=>t,E=A.trustedTypes,x=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,U=document,k=()=>U.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,T="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,j=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,D=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,V=U.createTreeWalker(U,129);function G(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<i;e++){const i=t[e];let a,h,l=-1,c=0;for(;c<i.length&&(o.lastIndex=c,h=o.exec(i),null!==h);)c=o.lastIndex,o===H?"!--"===h[1]?o=R:void 0!==h[1]?o=z:void 0!==h[2]?(D.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=j):void 0!==h[3]&&(o=j):o===j?">"===h[0]?(o=n??H,l=-1):void 0===h[1]?l=-2:(l=o.lastIndex-h[2].length,a=h[1],o=void 0===h[3]?j:'"'===h[3]?L:I):o===L||o===I?o=j:o===R||o===z?o=H:(o=j,n=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";r+=o===H?i+M:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[h,l]=J(t,e);if(this.el=K.createElement(h,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=O(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);V.currentNode=s;let n=V.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=V.nextNode(),r++)}return V.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Z(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Z(this,s[i+o],e,o),a===B&&(a=this._$AH[o]),r||=!O(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends Y{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===B)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(K,X),(A.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");console.info("%c SIMPLE-CLIMATE-CARD %c 0.2.0 ","color: white; background: #ff9800; font-weight: 700;","color: #ff9800; background: white; font-weight: 700;");class ht extends ot{static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static getConfigElement(){return document.createElement("slick-simple-climate-card-editor")}static getStubConfig(){return{type:"custom:slick-simple-climate-card",entity:"",name:"Climate"}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(this.config={name:"Climate",...t},this.config.name&&"string"!=typeof this.config.name)throw new Error("name must be a string");if(this.config.sensors&&"object"!=typeof this.config.sensors)throw new Error("sensors must be an object")}_interpolateColor(t,e,i){const s=t=>{const e=t.replace("#","");return parseInt(e,16)},n=s(t)>>16&255,r=s(t)>>8&255,o=255&s(t),a=s(e)>>16&255,h=s(e)>>8&255,l=255&s(e);return`rgb(${Math.round(n+(a-n)*i)}, ${Math.round(r+(h-r)*i)}, ${Math.round(o+(l-o)*i)})`}_getGradient(t,e,i,s){const n=t.attributes.hvac_action||t.state,r="#607d8b",o="#455a64",a="#ff9800",h="#4caf50",l="#2196f3";if(isNaN(e))return`linear-gradient(180deg, ${r}, ${o})`;if("heating"===n){if(e<i){const t=i-e,s=t/3>=1?1:t/3;let n=0;s>.4&&(n=(s-.4)/.6);return`linear-gradient(180deg, ${this._interpolateColor(r,a,n)} 0%, ${90-70*s}%, ${this._interpolateColor(a,"#e65100",s)} 100%)`}return`linear-gradient(180deg, ${h}, 80%, ${a})`}if("cooling"===n){if(e>s){const t=e-s,i=t/3>=1?1:t/3,n=this._interpolateColor(l,"#0d47a1",i);let o=0;i>.4&&(o=(i-.4)/.6);return`linear-gradient(180deg, ${l} 0%, ${10+70*i}%, ${this._interpolateColor(r,n,o)} 100%)`}return`linear-gradient(180deg, ${l}, 20%, ${h})`}return"idle"===n?`linear-gradient(180deg, ${h} 0%, #81c784 100%)`:(t.state,`linear-gradient(180deg, ${r} 0%, ${o} 100%)`)}render(){var t,e,i;if(!this.config)return q``;if(!this.hass)return q`<ha-card style="padding:16px;">Loading...</ha-card>`;const s=this.config.entity;let n=this.hass.states[s];n||(n={entity_id:s,state:"unavailable",attributes:{friendly_name:this.config.name||s}});let r=n.attributes.current_temperature;if((null===(t=this.config.sensors)||void 0===t?void 0:t.temp)&&this.hass.states[this.config.sensors.temp]){const t=this.hass.states[this.config.sensors.temp];isNaN(parseFloat(t.state))||(r=parseFloat(t.state))}let o=n.attributes.target_temp_low,a=n.attributes.target_temp_high;const h=n.attributes.temperature;void 0===o&&void 0!==h&&(o=h),void 0===a&&void 0!==h&&(a=h),void 0===o&&(o=20),void 0===a&&(a=24),(null===(e=this.config.sensors)||void 0===e?void 0:e.target_low)&&this.hass.states[this.config.sensors.target_low]&&(o=parseFloat(this.hass.states[this.config.sensors.target_low].state)),(null===(i=this.config.sensors)||void 0===i?void 0:i.target_high)&&this.hass.states[this.config.sensors.target_high]&&(a=parseFloat(this.hass.states[this.config.sensors.target_high].state));const l=this._getGradient(n,r,o,a),c=this.config.name||n.attributes.friendly_name||"Climate",d=n.attributes.hvac_action?this.hass.localize(`state_attributes.climate.hvac_action.${n.attributes.hvac_action}`):this.hass.localize(`component.climate.state._.${n.state}`)||n.state;let p="mdi:thermostat";const u=n.attributes.hvac_action||n.state;return"heating"===u?p="mdi:fire":"cooling"===u?p="mdi:snowflake":"idle"===u?p="mdi:check-circle-outline":"off"===u&&(p="mdi:power-off"),q`
      <ha-card @click="${this._openMoreInfo}">
        <div class="bg-layer" style="background: ${l};"></div>
        
        <div class="container">
          <div class="header">
             <div class="temp-big">
                ${void 0!==r?q`${r}<span class="unit">°</span>`:"--"}
             </div>
             <div class="header-right">
                <ha-icon icon="${p}" class="main-icon"></ha-icon>
                <div class="state-label">${d}</div>
             </div>
          </div>

          <div class="spacer"></div>

          <div class="footer-row">
             <div class="footer-info">
               <div class="name">${c}</div>
             </div>
             <div class="targets">
                ${this._renderTargets(n,o,a)}
             </div>
          </div>
        </div>
      </ha-card>
    `}_renderTargets(t,e,i){var s;return"off"===t.state?q`<div class="target-chip">OFF</div>`:void 0!==e&&void 0!==i&&e!==i?q`
            <div class="target-group">
               <div class="target-label">Min</div>
               <div class="target-val">${e}°</div>
            </div>
            <div class="divider"></div>
            <div class="target-group">
               <div class="target-label">Max</div>
               <div class="target-val">${i}°</div>
            </div>
         `:q`
        <div class="target-group">
           <div class="target-label">Target</div>
           <div class="target-val">${null!==(s=null!=e?e:i)&&void 0!==s?s:"--"}°</div>
        </div>
     `}_openMoreInfo(){if(this.config.entity){const t=new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0});this.dispatchEvent(t)}}static get styles(){return r`
      :host {
        display: block;
        height: 100%;
      }
      ha-card {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
        cursor: pointer;
        color: white;
        container-type: inline-size; /* Enable container query units (cqi) */
      }
      .bg-layer {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 0;
        transition: background 0.5s ease;
      }
      .container {
        position: relative;
        z-index: 1;
        padding: clamp(8px, 3%, 16px);
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 0;
        overflow: hidden;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex: 0 0 auto;
        min-height: 0;
      }
      
      .temp-big {
        font-size: clamp(1.8rem, 8cqi, 3.5rem);
        font-weight: 200;
        line-height: 1;
        text-shadow: 0 1px 4px rgba(0,0,0,0.3);
        white-space: nowrap;
      }
      .temp-big .unit {
        font-size: clamp(1rem, 4cqi, 2rem);
        vertical-align: top;
        opacity: 0.8;
      }
      
      .header-right {
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex: 0 0 auto;
      }
      .main-icon {
        --mdc-icon-size: clamp(20px, 6cqi, 32px);
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        margin-bottom: 4px;
      }
      .state-label {
        font-size: clamp(0.65rem, 2.5cqi, 0.9rem);
        font-weight: 500;
        opacity: 0.9;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      }

      .spacer {
        flex: 1;
        min-height: 0;
      }

      .footer-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex: 0 0 auto;
        min-height: 0;
      }
      
      .name {
        font-size: clamp(0.75rem, 3cqi, 1rem);
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        opacity: 0.9;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .targets {
        display: flex;
        align-items: center;
        background: rgba(0,0,0,0.2);
        border-radius: 20px;
        padding: 4px clamp(6px, 2%, 12px);
        backdrop-filter: blur(4px);
        flex: 0 0 auto;
      }
      .target-group {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .target-label {
        font-size: 0.65rem;
        text-transform: uppercase;
        opacity: 0.7;
      }
      .target-val {
        font-size: 1.1rem;
        font-weight: 600;
      }
      .divider {
        width: 1px;
        height: 24px;
        background: rgba(255,255,255,0.3);
        margin: 0 10px;
      }
      .target-chip {
        font-weight: 600;
        font-size: 0.9rem;
      }
    `}}customElements.get("slick-simple-climate-card")||customElements.define("slick-simple-climate-card",ht);class lt extends ot{static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config=t}_valueChanged(t){const e={...this._config,...t.detail.value},i=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){if(!this.hass||!this._config)return q``;return q`
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${[{name:"entity",label:"Entity",selector:{entity:{domain:"climate"}}},{name:"name",label:"Name",selector:{text:{}}}]}
          .computeLabel=${t=>t.label}
          @value-changed=${this._valueChanged}
        ></ha-form>
      `}}customElements.get("slick-simple-climate-card-editor")||customElements.define("slick-simple-climate-card-editor",lt),window.customCards=window.customCards||[],window.customCards.push({type:"slick-simple-climate-card",name:"Slick Simple Climate",preview:!0,description:"A clean climate card with dynamic gradients."});export{ht as SimpleClimateCard};
//# sourceMappingURL=simple-climate-card.js.map
