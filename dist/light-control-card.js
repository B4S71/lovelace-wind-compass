/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,_=g?g.emptyScript:"",$=u.reactiveElementPolyfillSupport,f=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,$?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,S=t=>t,E=A.trustedTypes,w=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,U=document,k=()=>U.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,L=/>/g,D=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,j=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,Y=U.createTreeWalker(U,129);function X(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let a,h,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,h=r.exec(i),null!==h);)l=r.lastIndex,r===T?"!--"===h[1]?r=N:void 0!==h[1]?r=L:void 0!==h[2]?(I.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=D):void 0!==h[3]&&(r=D):r===D?">"===h[0]?(r=n??T,c=-1):void 0===h[1]?c=-2:(c=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?D:'"'===h[3]?j:z):r===j||r===z?r=D:r===N||r===L?r=T:(r=D,n=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===T?i+M:c>=0?(s.push(a),i.slice(0,c)+x+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[X(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,c]=F(t,e);if(this.el=K.createElement(h,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(x)){const e=c[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),Y.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);Y.currentNode=s;let n=Y.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new G(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=Y.nextNode(),o++)}return Y.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new G(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=J(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=J(this,s[i+r],e,r),a===q&&(a=this._$AH[r]),o||=!O(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??V)===q)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(K,G),(A.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new G(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");console.info("%c SLICK-LIGHT-CONTROL-CARD %c 0.1.0 ","color: white; background: #FFC107; font-weight: 700;","color: #FFC107; background: white; font-weight: 700;");class ht extends rt{constructor(){super(...arguments),this._interacting=!1,this._pointerStartTime=0,this._pointerStartX=0,this._pointerStartY=0}static get properties(){return{hass:{attribute:!1},config:{state:!0},_interacting:{state:!0}}}static getConfigElement(){return document.createElement("slick-light-control-card-editor")}static getStubConfig(){return{type:"custom:slick-light-control-card",entity:"light.example_light",name:"Living Room",covers:[]}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity (light)");this.config=t}shouldUpdate(t){if(t.has("config"))return!0;const e=t.get("hass");if(!e)return!0;if(e.states[this.config.entity]!==this.hass.states[this.config.entity])return!0;if(this.config.covers)for(const t of this.config.covers)if(e.states[t]!==this.hass.states[t])return!0;return!1}_toggleLight(t){t&&t.stopPropagation(),this.hass.callService("light","toggle",{entity_id:this.config.entity})}_controlCover(t,e){this.hass.callService("cover",e,{entity_id:t})}_handlePointerDown(t){var e,i,s;const n=t.composedPath();for(const t of n)if((null===(e=t.classList)||void 0===e?void 0:e.contains("control-btn"))||"HA-SWITCH"===t.tagName||(null===(i=t.classList)||void 0===i?void 0:i.contains("icon-container")))return;this._interacting=!0,this._pointerStartTime=Date.now(),this._pointerStartX=t.clientX,this._pointerStartY=t.clientY;const o=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelector("ha-card");o&&o.setPointerCapture(t.pointerId)}_handlePointerUp(t){var e;if(!this._interacting)return;this._interacting=!1;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("ha-card");if(i){i.releasePointerCapture(t.pointerId);const e=Date.now()-this._pointerStartTime,s=Math.sqrt(Math.pow(t.clientX-this._pointerStartX,2)+Math.pow(t.clientY-this._pointerStartY,2));e<250&&s<10?this._toggleLight():this._applyLightState(t,i)}}_handlePointerMove(t){}_applyLightState(t,e){const i=e.getBoundingClientRect(),s=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),n=Math.max(0,Math.min(1,(t.clientY-i.top)/i.height)),o=this.hass.states[this.config.entity];if(!o)return;const r=Math.round(100*(1-n)),a=o.attributes.min_mireds||153,h=o.attributes.max_mireds||500,c=Math.round(a+s*(h-a)),l={entity_id:this.config.entity,brightness_pct:Math.max(1,r)};o.attributes.min_mireds&&(l.color_temp=c),this.hass.callService("light","turn_on",l)}render(){const t=this.hass.states[this.config.entity];if(!t)return B`<ha-card class="not-found">Entity not found: ${this.config.entity}</ha-card>`;const e="on"===t.state,i=t.attributes.brightness?Math.round(t.attributes.brightness/255*100):0,s=t.attributes.min_mireds||153,n=t.attributes.max_mireds||500,o=t.attributes.color_temp||Math.round((s+n)/2),r=this.config.covers||[];let a="background: linear-gradient(135deg, #2c3e50 0%, #000000 100%);";if(this._interacting)a="background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), linear-gradient(to right, rgb(166, 209, 255) 0%, rgb(255, 160, 0) 100%);";else if(e){const e=(o-s)/(n-s);if(t.attributes.rgb_color){const[e,i,s]=t.attributes.rgb_color;a=`background: linear-gradient(135deg, rgba(${e},${i},${s},0.8) 0%, rgba(${e},${i},${s},0.4) 100%);`}else{const t=200+55*e,i=220-20*e,s=255-105*e;a=`background: linear-gradient(135deg, rgb(${t},${i},${s}) 0%, rgb(${Math.round(.6*t)},${Math.round(.6*i)},${Math.round(.6*s)}) 100%);`}}return B`
      <ha-card 
        style="${a}"
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
        @pointermove=${this._handlePointerMove}
      >
        <div class="content" style="opacity: ${this._interacting?"0":"1"}; pointer-events: ${this._interacting?"none":"auto"}">
            <!-- HEADER -->
            <div class="header">
                <div class="icon-container" @click=${this._toggleLight}>
                    <ha-icon icon="${t.attributes.icon||(e?"mdi:lightbulb-on":"mdi:lightbulb")}"></ha-icon>
                </div>
                <div class="info">
                    <span class="name">${this.config.name||t.attributes.friendly_name}</span>
                    <span class="state">${e?`${i}%`:"Off"}</span>
                </div>
                 <ha-switch
                    .checked=${e}
                    @click=${t=>t.stopPropagation()}
                    @change=${this._toggleLight}
                ></ha-switch>
            </div>

            <!-- COVERS -->
            ${r.length>0?B`
                <div class="covers-section">
                    ${r.map(t=>this._renderCover(t))}
                </div>
            `:""}
        </div>
      </ha-card>
    `}_renderCover(t){const e=this.hass.states[t];return e?B`
        <div class="cover-row">
            <div class="cover-info">
                <ha-icon icon="${e.attributes.icon||"mdi:window-shutter"}"></ha-icon>
                <span>${e.attributes.friendly_name}</span>
            </div>
            <div class="cover-controls">
                <div class="control-btn" @click=${()=>this._controlCover(t,"open_cover")}>
                    <ha-icon icon="mdi:arrow-up"></ha-icon>
                </div>
                <div class="control-btn" @click=${()=>this._controlCover(t,"stop_cover")}>
                    <ha-icon icon="mdi:stop"></ha-icon>
                </div>
                <div class="control-btn" @click=${()=>this._controlCover(t,"close_cover")}>
                    <ha-icon icon="mdi:arrow-down"></ha-icon>
                </div>
            </div>
        </div>
      `:B``}static get styles(){return o`
      :host {

        display: block;
      }
      ha-card {
        color: white;
        overflow: hidden;
        transition: background 0.1s linear;
        padding: 16px;
        touch-action: none;
        user-select: none;
        position: relative;
        cursor: grab;
      }
      ha-card:active {
        cursor: grabbing;
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        transition: opacity 0.2s ease-in-out;
      }
      
      /* HEADER */
      .header {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .icon-container {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s;
      }
      .icon-container:hover {
          background: rgba(255,255,255,0.3);
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .name {
        font-weight: 600;
        font-size: 1.1rem;
      }
      .state {
        opacity: 0.8;
        font-size: 0.9rem;
      }


      /* COVERS */
      .covers-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 16px;
      }
      .cover-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0,0,0,0.15);
        padding: 8px 12px;
        border-radius: 8px;
      }
      .cover-info {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        font-weight: 500;
      }
      .cover-controls {
        display: flex;
        gap: 8px;
      }
      .control-btn {
        width: 32px;
        height: 32px;
        background: rgba(255,255,255,0.15);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s;
      }
      .control-btn:hover {
        background: rgba(255,255,255,0.3);
      }
      .control-btn ha-icon {
        --mdc-icon-size: 20px;
      }
    `}}customElements.define("slick-light-control-card",ht),window.customCards=window.customCards||[],window.customCards.push({type:"slick-light-control-card",name:"Slick Light Control",description:"A card to control lights (brightness, color temp) and associated covers.",preview:!0});export{ht as LightControlCard};
//# sourceMappingURL=light-control-card.js.map
