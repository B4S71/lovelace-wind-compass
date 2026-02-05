/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:a,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:l,getPrototypeOf:d}=Object,u=globalThis,p=u.trustedTypes,m=p?p.emptyScript:"",g=u.reactiveElementPolyfillSupport,_=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!o(t,e),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&a(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...l(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[_("elementProperties")]=new Map,b[_("finalized")]=new Map,g?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,x=t=>t,w=$.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,k=`<${C}>`,T=document,P=()=>T.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,R="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,z=/>/g,H=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,X=T.createTreeWalker(T,129);function q(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=U;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(o.lastIndex=l,c=o.exec(i),null!==c);)l=o.lastIndex,o===U?"!--"===c[1]?o=N:void 0!==c[1]?o=z:void 0!==c[2]?(j.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=H):void 0!==c[3]&&(o=H):o===H?">"===c[0]?(o=r??U,h=-1):void 0===c[1]?h=-2:(h=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?H:'"'===c[3]?D:I):o===D||o===I?o=H:o===N||o===z?o=U:(o=H,r=void 0);const d=o===H&&t[e+1].startsWith("/>")?" ":"";n+=o===U?i+k:h>=0?(s.push(a),i.slice(0,h)+A+i.slice(h)+E+d):i+E+(-2===h?e:d)}return[q(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class F{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,h]=Y(t,e);if(this.el=F.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=h[n++],i=s.getAttribute(t).split(E),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?Q:"?"===o[1]?tt:"@"===o[1]?et:Z}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),X.nextNode(),a.push({type:2,index:++r});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===L)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=M(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);X.currentNode=s;let r=X.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new K(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=X.nextNode(),n++)}return X.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=F.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new F(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new K(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=G(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==L,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=G(this,s[i+o],e,o),a===L&&(a=this._$AH[o]),n||=!M(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Q extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class tt extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class et extends Z{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===L)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const st=$.litHtmlPolyfillSupport;st?.(F,K),($.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new K(e.insertBefore(P(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const ot=rt.litElementPolyfillSupport;ot?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");console.info("%c VACUUM-CARD %c 0.1.0 ","color: white; background: #673ab7; font-weight: 700;","color: #673ab7; background: white; font-weight: 700;");class at extends nt{constructor(){super(...arguments),this._tempTime=null,this._touchStartState=null,this._discoveredBatteryEntity=null,this._discoveredRoomEntity=null,this._deviceAreaName=null,this._discoveryAttempted=!1,this._swipeOffset=0,this._isSwiping=!1,this._swipeStartX=0,this._isTriggered=!1,this._isCompact=!1,this._isShort=!1,this._isTiny=!1,this._inputStartY=0,this._inputTargetString=null,this._isDragging=!1}static get properties(){return{hass:{attribute:!1},config:{state:!0},_tempTime:{state:!0},_discoveredBatteryEntity:{state:!0},_discoveredRoomEntity:{state:!0},_deviceAreaName:{state:!0},_swipeOffset:{state:!0},_isCompact:{state:!0},_isShort:{state:!0},_isTiny:{state:!0},_isTriggered:{state:!0}}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=e.contentRect.width,i=e.contentRect.height;this._isCompact=t<300,this._isShort=i<180,this._isTiny=i<100}}),this._resizeObserver.observe(this)}disconnectedCallback(){this._resizeObserver&&this._resizeObserver.disconnect(),super.disconnectedCallback()}static getStubConfig(){return{type:"custom:slick-vacuum-card",entity:"vacuum.robotic_vacuum_cleaner",start_button_entity:"input_button.start_vacuum_eg",automation_entity:"automation.bodenreinigung_erdgeschoss",schedule_time_entity:"input_datetime.staubsauger_start"}}static getConfigElement(){return document.createElement("slick-vacuum-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity)throw new Error("Entity is required");this.config&&this.config.entity!==t.entity&&(this._discoveredBatteryEntity=null,this._discoveredRoomEntity=null,this._deviceAreaName=null,this._discoveryAttempted=!1),this.config=t}shouldUpdate(t){return!(!this.config||!this.hass)}updated(t){var e;super.updated(t),this._discoveredBatteryEntity&&this._discoveredRoomEntity&&this._deviceAreaName||this._discoveryAttempted||!this.hass||!(null===(e=this.config)||void 0===e?void 0:e.entity)||(this._discoveryAttempted=!0,this._fetchRelatedEntities())}async _fetchRelatedEntities(){try{const t=await this.hass.callWS({type:"search/related",item_type:"entity",item_id:this.config.entity});if(!t||!t.device||0===t.device.length)return;const e=t.device[0];if(this.hass.devices&&this.hass.areas){const t=this.hass.devices[e];if(t&&t.area_id){const e=this.hass.areas[t.area_id];e&&e.name&&(this._deviceAreaName=e.name,console.debug("VacuumCard: Discovered device area",this._deviceAreaName))}}const i=await this.hass.callWS({type:"search/related",item_type:"device",item_id:e});if(!i||!i.entity)return;const s=i.entity;if(!this._discoveredBatteryEntity){const t=s.filter(t=>{const e=this.hass.states[t];return!!t.startsWith("sensor.")&&(!!e&&("battery"===e.attributes.device_class||!!t.includes("battery")))});if(t.length>0){const e=t.find(t=>"battery"===this.hass.states[t].attributes.device_class)||t[0];this._discoveredBatteryEntity=e,console.debug("VacuumCard: Discovered battery entity",e)}}if(!this._discoveredRoomEntity){const t=s.filter(t=>{const e=this.hass.states[t];if(!t.startsWith("sensor."))return!1;if(!e)return!1;const i=t.toLowerCase();return i.includes("room")||i.includes("raum")||i.includes("zone")||i.includes("aktueller_raum")});t.length>0&&(this._discoveredRoomEntity=t[0],console.debug("VacuumCard: Discovered room entity",this._discoveredRoomEntity))}}catch(t){console.warn("VacuumCard: Error discovering related entities",t)}}_getActionMode(){const t=this.hass.states[this.config.entity];return t?["cleaning","error","paused"].includes(t.state)?"return":"docked"===t.state?"start":"none":"none"}_checkAutomationButtonVisibility(){return!!this.config.automation_entity}_handleStartClean(t){t&&t.stopPropagation(),this.config.start_button_entity?this.hass.callService("input_button","press",{entity_id:this.config.start_button_entity}):this.hass.callService("vacuum","start",{entity_id:this.config.entity})}_handleReturnHome(t){t&&t.stopPropagation(),this.hass.callService("vacuum","return_to_base",{entity_id:this.config.entity})}_handleMoreInfo(t){if(t.composedPath().some(t=>t.classList&&t.classList.contains("actions")))return;const e=new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0});this.dispatchEvent(e)}_handleToggleAutomation(t){t&&t.stopPropagation(),this.config.automation_entity&&this.hass.callService("automation","toggle",{entity_id:this.config.automation_entity})}_getDateTimeParts(){if(!this.config.schedule_time_entity)return null;const t=this.hass.states[this.config.schedule_time_entity];if(!t)return null;let{hour:e,minute:i}=t.attributes;if(void 0===e||void 0===i){const s=t.state.split(":");if(!(s.length>=2))return null;e=parseInt(s[0]),i=parseInt(s[1])}return{hour:e,minute:i}}_onInputStart(t,e){if(0!==t.button&&1!==t.buttons)return;t.currentTarget.setPointerCapture(t.pointerId),this._isDragging=!0,this._inputStartY=t.clientY,this._inputTargetString=e;const i=this._getDateTimeParts();i&&(this._touchStartState=i,this._tempTime={...i})}_onInputMove(t){if(!(this._isDragging&&this._inputTargetString&&this._touchStartState&&this._tempTime))return;t.preventDefault();const e=t.clientY,i=this._inputStartY-e,s=Math.round(i/15);if(0!==s)if("hour"===this._inputTargetString){let t=(this._touchStartState.hour+s)%24;t<0&&(t+=24),this._tempTime={...this._tempTime,hour:t}}else{let t=(this._touchStartState.minute+s)%60;t<0&&(t+=60),this._tempTime={...this._tempTime,minute:t}}}_onInputEnd(t){if(!this._isDragging)return;this._isDragging=!1;if(t.currentTarget.releasePointerCapture(t.pointerId),!this._inputTargetString||!this._tempTime)return void this._cleanupInput();const{hour:e,minute:i}=this._tempTime,s=`${e.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}:00`;this.hass.callService("input_datetime","set_datetime",{entity_id:this.config.schedule_time_entity,time:s}),this._cleanupInput()}_cleanupInput(){this._inputTargetString=null,this._tempTime=null,this._touchStartState=null}_onSwipeStart(t){if(0!==t.button&&1!==t.buttons)return;t.currentTarget.setPointerCapture(t.pointerId),this._isSwiping=!0,this._swipeStartX=t.clientX,this._swipeOffset=0}_onSwipeMove(t){if(!this._isSwiping)return;const e=t.currentTarget,i=e.parentElement;if(!i)return;const s=t.clientX-this._swipeStartX,r=i.clientWidth-e.clientWidth-8,n=Math.max(0,Math.min(s,r));this._swipeOffset=n}_onSwipeEnd(t){if(!this._isSwiping)return;this._isSwiping=!1;const e=t.currentTarget;e.releasePointerCapture(t.pointerId);const i=e.parentElement;if(i){const t=i.clientWidth-e.clientWidth-8;if(this._swipeOffset>.9*t&&!this._isTriggered){const t=this._getActionMode();this._isTriggered=!0,"start"===t?this._handleStartClean():"return"===t&&this._handleReturnHome(),navigator.vibrate&&navigator.vibrate(50),setTimeout(()=>{this._isTriggered=!1,this._swipeOffset=0},4e3)}}this._isTriggered||(this._swipeOffset=0)}_getStatusIcon(t){switch(t){case"cleaning":default:return"mdi:robot-vacuum";case"docked":return"mdi:robot-vacuum-off";case"returning":return"mdi:home-import-outline";case"error":return"mdi:alert-circle";case"paused":return"mdi:pause-circle";case"idle":return"mdi:robot-vacuum-variant"}}_getStatusLabel(t){switch(t){case"cleaning":return"Cleaning";case"docked":return"Docked";case"returning":return"Returning";case"error":return"Error";case"paused":return"Paused";case"idle":return"Idle";default:return t}}render(){var t;if(!this.config||!this.hass)return B``;const e=this.hass.states[this.config.entity];if(!e)return B`<div>Vacuum not found</div>`;const i=e.state,s=e.attributes;let r=null;if(this._discoveredBatteryEntity){const t=this.hass.states[this._discoveredBatteryEntity];t&&!isNaN(parseFloat(t.state))&&(r=Math.round(parseFloat(t.state)))}if(null===r){const t=void 0!==s.battery_level?s.battery_level:s.battery;if(void 0!==t){const e=parseFloat(t);isNaN(e)||(r=Math.round(e))}}let n="mdi:battery-unknown";null!==r&&(n=r>=90?"mdi:battery":r>=70?"mdi:battery-80":r>=50?"mdi:battery-50":r>=30?"mdi:battery-40":"mdi:battery-20");const o=this._getStatusLabel(i);let a=null;if(this._discoveredRoomEntity){const t=this.hass.states[this._discoveredRoomEntity];t&&t.state&&"unknown"!==t.state&&"unavailable"!==t.state&&(a=t.state)}!a&&this._deviceAreaName&&(a=this._deviceAreaName);const c=s.friendly_name||this.config.entity,h=[s.cleaned_area?`${s.cleaned_area} m²`:null,s.cleaning_time?`${s.cleaning_time} min`:null].filter(Boolean).join(" • ");let l="--",d="--";if(this._tempTime)l=this._tempTime.hour.toString().padStart(2,"0"),d=this._tempTime.minute.toString().padStart(2,"0");else{const t=this._getDateTimeParts();t&&(l=t.hour.toString().padStart(2,"0"),d=t.minute.toString().padStart(2,"0"))}const u=this.config.automation_entity?null===(t=this.hass.states[this.config.automation_entity])||void 0===t?void 0:t.state:"off";let p="rgba(55, 71, 79, 0.25)";["cleaning","returning"].includes(i)?p="rgba(33, 150, 243, 0.25)":"error"===i&&(p="rgba(244, 67, 54, 0.25)");let m="rgba(158, 158, 158, 0.25)";null!==r&&(m=r>=80?"rgba(76, 175, 80, 0.25)":r>=40?"rgba(255, 193, 7, 0.25)":"rgba(244, 67, 54, 0.25)");const g=getComputedStyle(document.body).getPropertyValue("--ha-card-background")||"#fff",_=this._getActionMode();return B`
      <div class="vacuum-card-container ${this._isTiny?"tiny":this._isShort?"short":""}" 
           style="background: linear-gradient(to bottom, ${p} 0%, ${m} 100%), ${g};"
           @click=${this._handleMoreInfo}>
        <div class="header">
          <div class="icon-container state-${i}">
            <ha-icon icon="${this._getStatusIcon(i)}"></ha-icon>
          </div>
          <div class="info">
             <div class="status">${c}</div>
             ${this._isShort?B`
                 <!-- Short Mode: Condensed Info -->
                 <div class="room" style="font-size: 0.9rem; opacity: 0.8;">
                    ${o} 
                    ${null!==r?B` • ${r}%`:""}
                 </div>
             `:B`
                 <div class="room">${o} ${a?B`${a}`:""}</div>
                 <div class="battery">
                   ${null!==r?B`<ha-icon icon="${n}"></ha-icon> ${r}%`:""} 
                   ${!a&&s.fan_speed?`• ${s.fan_speed}`:""}
                 </div>
                 ${h?B`<div class="stats">${h}</div>`:""}
             `}
          </div>
        </div>

        <div class="actions">
          ${"none"===_||this._isTriggered?"":this._isCompact?B`
            <div class="action-btn ${"start"===_?"start-btn":"return-btn"}" 
                 @click=${"start"===_?this._handleStartClean:this._handleReturnHome}>
                <ha-icon icon="${"start"===_?"mdi:play":"mdi:home-import-outline"}"></ha-icon>
            </div>
          `:B`
            <div class="swipe-slider ${"return"===_?"return-mode":""}">
               <div class="slide-track" style="opacity: ${Math.max(0,1-this._swipeOffset/150)}">
                   ${"start"===_?"Slide to Start":"Slide to Return"}
               </div>
               <div class="slide-handle"
                    style="transform: translateX(${this._swipeOffset}px); opacity: ${Math.max(.1,1-this._swipeOffset/250)}"
                    @pointerdown=${this._onSwipeStart}
                    @pointermove=${this._onSwipeMove}
                    @pointerup=${this._onSwipeEnd}
                    @pointercancel=${this._onSwipeEnd}>
                  <ha-icon icon="${"mdi:arrow-right"}"></ha-icon>
               </div>
             </div>
          `}
          
          ${this._isTriggered?B`
             <div class="swipe-slider triggered">
                 <div class="dots-loader">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                 </div>
             </div>
          `:""}

          ${this.config.schedule_time_entity&&!this._isShort?B`
            <div class="time-picker">
              <div class="time-label">SCHEDULE</div>
              <div class="time-values">
                <div class="time-inputs">
                    <div class="time-column" 
                         @pointerdown=${t=>this._onInputStart(t,"hour")}
                         @pointermove=${t=>this._onInputMove(t)}
                         @pointerup=${t=>this._onInputEnd(t)}
                         @pointercancel=${t=>this._onInputEnd(t)}>
                      ${l}
                    </div>
                    <div class="time-sep">:</div>
                    <div class="time-column"
                         @pointerdown=${t=>this._onInputStart(t,"minute")}
                         @pointermove=${t=>this._onInputMove(t)}
                         @pointerup=${t=>this._onInputEnd(t)}
                         @pointercancel=${t=>this._onInputEnd(t)}>
                      ${d}
                    </div>
                </div>

                ${this._checkAutomationButtonVisibility()?B`
                    <div class="sparkle-btn ${"on"===u?"active":""}" 
                         @click=${this._handleToggleAutomation}>
                       <ha-icon icon="mdi:auto-fix"></ha-icon>
                    </div>
                 `:""}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `}}at.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)})`
    :host {
      display: block;
      height: 100%;
      /* Host acts as a container but visual styles move to inner div for gradient control */
    }

    .vacuum-card-container {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: var(--ha-card-box-shadow, 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12));
      border-radius: var(--ha-card-border-radius, 12px);
      color: var(--primary-text-color);
      padding: 16px;
      font-family: var(--paper-font-body1_-_font-family);
      display: flex;
      flex-direction: column;
      gap: 8px; /* Reduced from 16px */
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;
      justify-content: space-between;
      overflow: hidden; /* Ensure content doesn't bleed */
    }

    .vacuum-card-container.short {
        padding: 8px 12px;
        gap: 4px;
    }
    
    .vacuum-card-container.short .header {
        gap: 8px;
    }

    /* Tiny Mode (1-row) */
    .vacuum-card-container.tiny {
        flex-direction: row;
        align-items: center;
        padding: 0 12px;
        gap: 12px;
    }

    .vacuum-card-container.tiny .header {
        gap: 12px;
        margin: 0;
        min-height: 0;
        flex: 1;
    }

    .vacuum-card-container.tiny .icon-container {
        width: 32px;
        height: 32px;
    }
    
    .vacuum-card-container.tiny .icon-container ha-icon {
        --mdc-icon-size: 18px;
    }

    .vacuum-card-container.tiny .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .vacuum-card-container.tiny .status {
        font-size: 0.9rem;
        line-height: 1.1;
    }
    
    .vacuum-card-container.tiny .room {
        font-size: 0.75rem;
        line-height: 1.1;
        opacity: 0.8;
    }

    .vacuum-card-container.tiny .actions {
        /* Allow expansion for slider, but minimal for button */
        flex: 1 0 auto;
        display: flex;
        justify-content: flex-end;
        margin-left: 12px;
        min-width: 0;
    }

    .vacuum-card-container.tiny .swipe-slider {
        height: 36px;
        font-size: 0.9rem;
    }

    .vacuum-card-container.tiny .action-btn {
        width: 32px; /* Small circle button */
        height: 32px;
        margin: 0;
        padding: 0;
        border-radius: 50%;
        flex: 0 0 32px; /* Rigid width */
    }

    .vacuum-card-container.short .action-btn {
        height: 32px;
        min-height: 32px;
    }

    .vacuum-card-container.short .icon-container {
        width: 36px;
        height: 36px;
    }
    
    .vacuum-card-container.short .status {
        font-size: 1rem;
    }
    
    .actions {
        cursor: default;
        flex-shrink: 0; /* Prevent crushing actions */
    }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      min-height: 0;
      flex: 1;
    }

    .icon-container {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(var(--rgb-primary-text-color), 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--paper-item-icon-color, #44739e);
    }
    
    .icon-container ha-icon {
        --mdc-icon-size: 24px;
    }
    
    .icon-container.state-cleaning {
      background: rgba(var(--rgb-primary-color), 0.2);
      color: var(--primary-color);
      animation: pulse 2s infinite;
    }

    .icon-container.state-error {
      background: rgba(var(--error-color, #db4437), 0.2);
      color: var(--error-color, #db4437);
    }

    .info {
      flex: 1;
      min-width: 0; /* Crucial for text-overflow to work in flex child */
    }

    .status {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.4;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis;
    }

    .room {
      font-size: 1rem;
      font-weight: 500;
      opacity: 0.9;
      line-height: 1.2;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis;
    }

    .battery {
      font-size: 0.9rem;
      opacity: 0.7;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stats {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-top: 4px;
    }
    
    .battery ha-icon {
        --mdc-icon-size: 16px;
    }

    .actions {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between; /* Spread them out */
    }
    
    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(var(--rgb-primary-text-color), 0.05);
      border-radius: 12px; /* Match others */
      padding: 0 16px;
      cursor: pointer;
      height: 50px; /* Match slider */
      transition: background 0.2s;
      margin-right: 8px;
      flex: 1;
    }

    .start-btn {
       color: var(--primary-text-color);
       background: rgba(var(--rgb-primary-text-color), 0.05); /* Glassy Grey */
       backdrop-filter: blur(5px);
       border: 1px solid rgba(255,255,255,0.1);
       box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .start-btn:active {
       background: rgba(var(--rgb-primary-text-color), 0.1);
       box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
       transform: translateY(1px);
    }
    
    .return-btn {
       color: var(--primary-text-color);
       background: rgba(var(--rgb-primary-text-color), 0.05); /* Glassy Grey */
       backdrop-filter: blur(5px);
       border: 1px solid rgba(255,255,255,0.1);
       box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .return-btn:active {
       background: rgba(var(--rgb-primary-text-color), 0.1);
       box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
       transform: translateY(1px);
    }

    .swipe-slider {
        position: relative;
        height: 50px;
        background: rgba(0,0,0,0.1); 
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.15); /* Pressed in track */
        border-radius: 12px;
        overflow: hidden;
        flex: 1; 
        display: flex;
        align-items: center;
        backdrop-filter: blur(5px);
        margin-right: 8px; /* gap with time picker */
        transition: background 0.2s;
    }
    
    .swipe-slider.triggered {
        justify-content: center;
        opacity: 0.9;
    }
    
    .swipe-slider.return-mode {
        background: rgba(0,0,0,0.15); /* Slightly darker/visible for return */
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.15);
    }
    
    /* Ensure handle override is removed or neutral so it matches default glass style */
    .swipe-slider.return-mode .slide-handle {
        /* No specific override needed if we use the same glass style */
    }

    .slide-track {
        width: 100%;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 0.9rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        pointer-events: none;
        user-select: none;
        opacity: 0.8;
        padding-left: 42px; /* Offset for handle start pos */
        transition: opacity 0.1s;
    }

    .slide-handle {
        position: absolute;
        left: 4px;
        top: 4px;
        bottom: 4px;
        width: 42px;
        
        /* Glass Style */
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-text-color); 
        cursor: grab;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        touch-action: none; 
        z-index: 2;
    }
    
    .slide-handle:active {
        cursor: grabbing;
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    
    .dots-loader {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        height: 100%;
    }
    
    .dot {
        width: 8px;
        height: 8px;
        background: var(--primary-text-color);
        border-radius: 50%;
        opacity: 0;
        animation: rush-in-out 1.5s infinite ease-in-out;
    }
    
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes rush-in-out {
        0% {
            opacity: 0;
            transform: translateX(-15px) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
        60% {
             opacity: 1;
             transform: translateX(5px) scale(1); /* Wait/Slow move */
        }
        100% {
            opacity: 0;
            transform: translateX(20px) scale(0.5);
        }
    }

    .time-picker {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(var(--rgb-primary-text-color), 0.15);
      border-radius: 12px;
      padding: 4px 8px; 
      user-select: none;
      backdrop-filter: blur(4px);
      min-width: 90px;
      height: 50px; /* Match slider height */
      box-sizing: border-box;
      margin-left: auto;
    }

    .time-label {
        font-size: 0.6rem;
        text-transform: uppercase;
        opacity: 0.8;
        margin-bottom: 2px;
        letter-spacing: 0.5px;
    }

    .time-values {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px; 
    }
    
    .time-inputs {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        font-weight: 600;
        line-height: 1;
    }

    .time-column {
      padding: 0 1px;
      cursor: ns-resize;
      min-width: 20px;
      text-align: center;
      touch-action: none;
    }

    .time-sep {
      padding-bottom: 3px;
      opacity: 0.5;
    }
    
    .sparkle-btn {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: var(--disabled-text-color);
        cursor: pointer;
        opacity: 0.6;
        transition: all 0.2s;
        background: rgba(0,0,0,0.05);
    }
    
    .sparkle-btn.active {
        color: #FFD700; 
        opacity: 1;
        background: rgba(255, 215, 0, 0.15);
        box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
    }
    
    .sparkle-btn ha-icon {
        --mdc-icon-size: 16px;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(var(--rgb-primary-color), 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(var(--rgb-primary-color), 0); }
      100% { box-shadow: 0 0 0 0 rgba(var(--rgb-primary-color), 0); }
    }
  `;class ct extends nt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){this._config=t}_valueChanged(t){const e={...this._config,...t.detail.value},i=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){if(!this.hass||!this._config)return B``;return B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"entity",label:"Vacuum Entity",selector:{entity:{domain:"vacuum"}}},{name:"start_button_entity",label:"Start Button",selector:{entity:{domain:"input_button"}}},{name:"automation_entity",label:"Automation",selector:{entity:{domain:"automation"}}},{name:"schedule_time_entity",label:"Schedule Time",selector:{entity:{domain:"input_datetime"}}}]}
        .computeLabel=${t=>t.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}}customElements.define("slick-vacuum-card",at),customElements.define("slick-vacuum-card-editor",ct),window.customCards=window.customCards||[],window.customCards.push({type:"slick-vacuum-card",name:"Slick Vacuum Card",preview:!0,description:"A card for controlling a vacuum robot."});export{at as VacuumCard,ct as VacuumCardEditor};
//# sourceMappingURL=vacuum-card.js.map
