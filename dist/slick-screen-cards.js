/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,g=globalThis,u=g.trustedTypes,f=u?u.emptyScript:"",m=g.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!r(t,e),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??_)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,m?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,$=t=>t,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+E,M=`<${A}>`,z=document,R=()=>z.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,D="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,O=/>/g,N=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,U=/"/g,F=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),j=new WeakMap,G=z.createTreeWalker(z,129);function W(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",a=P;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===P?"!--"===l[1]?a=T:void 0!==l[1]?a=O:void 0!==l[2]?(F.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=N):void 0!==l[3]&&(a=N):a===N?">"===l[0]?(a=n??P,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?N:'"'===l[3]?U:I):a===U||a===I?a=N:a===T||a===O?a=P:(a=N,n=void 0);const h=a===N&&t[e+1].startsWith("/>")?" ":"";o+=a===P?i+M:d>=0?(s.push(r),i.slice(0,d)+C+i.slice(d)+E+h):i+E+(-2===d?e:h)}return[W(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const a=t.length-1,r=this.parts,[l,d]=Z(t,e);if(this.el=X.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=d[o++],i=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),G.nextNode(),r.push({type:2,index:++n});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===A)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=H(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=K(t,n._$AS(t,e.values),n,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);G.currentNode=s;let n=G.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new Y(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new st(n,this,t)),this._$AV.push(e),r=i[++a]}o!==r?.index&&(n=G.nextNode(),o++)}return G.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),H(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new X(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Y(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=K(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=K(this,s[i+a],e,a),r===B&&(r=this._$AH[a]),o||=!H(r)||r!==this._$AH[a],r===q?t=q:t!==q&&(t+=(r??"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??q)===B)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(X,Y),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Y(e.insertBefore(R(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const rt=ot.litElementPolyfillSupport;rt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2"),console.info("%c WindCompassCard Loaded: TS_APPLE_FINAL ","color: white; background: #000000; font-weight: bold;");class lt extends HTMLElement{constructor(){super(),this._bucketSize=5,this._bucketCount=72,this._warnMultiplier=.9,this._historyData=[],this._lastHistoryFetch=0,this._avgDeg=0,this._instDeg=0,this._currentUnit="",this._maxSpeed=30,this._currentGust=0,this._limitRaffstore=0,this._limitRollo=0,this.attachShadow({mode:"open"})}static getConfigElement(){return document.createElement("slick-wind-compass-editor")}static getStubConfig(){return{type:"custom:slick-wind-compass-card",direction_entity:"",speed_entity:"",max_speed:60}}set hass(t){this._hass=t,this._updateCard()}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={bucket_size:5,warn_multiplier:.9,max_speed:30,simple_mode:!1,...t};if(e.bucket_size&&"number"!=typeof e.bucket_size)throw new Error("bucket_size must be a number");if(e.max_speed&&"number"!=typeof e.max_speed)throw new Error("max_speed must be a number");this.config=e,this.config.simple_mode?this.classList.add("simple-mode"):this.classList.remove("simple-mode"),this._recalcBuckets()}_recalcBuckets(){let t=void 0!==this.config.bucket_size?Number(this.config.bucket_size):5;for((isNaN(t)||t<1)&&(t=5),t>90&&(t=90);360%t!=0;)t++;this._bucketSize!==t&&(this._bucketSize=t,this._bucketCount=Math.floor(360/this._bucketSize),this._historyData=new Array(this._bucketCount).fill(null).map(()=>({duration:0,totalSpeed:0})),this._lastHistoryFetch=0)}connectedCallback(){this.shadowRoot||this.attachShadow({mode:"open"}),!this.shadowRoot||this.shadowRoot.innerHTML&&""!==this.shadowRoot.innerHTML.trim()||this._render(),this.shadowRoot&&(this.content=this.shadowRoot.querySelector(".container"),this.content&&(this._resizeObserver=new ResizeObserver(()=>{this._updateDimensions(),this._updateVisuals()}),this._resizeObserver.observe(this.content)))}disconnectedCallback(){var t;null===(t=this._resizeObserver)||void 0===t||t.disconnect()}_render(){this.shadowRoot&&(this.shadowRoot.innerHTML='\n      <style>\n        :host {\n          display: block;\n          width: 100%;\n          height: 100%;\n          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\n          font-weight: 200;\n          background: var(--ha-card-background, var(--card-background-color, white));\n          border-radius: var(--ha-card-border-radius, 12px);\n          box-shadow: var(--ha-card-box-shadow, none);\n          overflow: hidden;\n          box-sizing: border-box;\n          position: relative;\n          isolation: isolate;\n        }\n        \n        ha-card {\n          display: none;\n        }\n\n        .container {\n          padding: 20px;\n          display: flex;\n          flex-direction: column;\n          gap: 20px;\n        }\n\n        /* --- COMPASS AREA --- */\n        .compass-container {\n          position: relative;\n          width: 100%;\n          height: 90px;\n          background: transparent;\n          border-radius: 12px;\n          \n          /* Apple Fade-Out Effect Left/Right */\n          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);\n          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);\n          \n          touch-action: pan-y;\n          isolation: isolate; \n          z-index: 0;\n        }\n\n        .compass-tape {\n          position: absolute;\n          top: 0;\n          left: 50%; /* Zentriert */\n          height: 100%;\n          display: flex;\n          align-items: center;\n          /* Smooth Animation für das Band */\n          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);\n          will-change: transform;\n          z-index: 1;\n        }\n\n        /* Historien-Balken */\n        .hist-bar {\n          position: absolute;\n          bottom: 0;\n          border-radius: 4px;\n          pointer-events: none;\n          transform: none; \n          border: none;\n          box-sizing: border-box; \n          background: none; \n          transition: height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.0);\n          overflow: hidden;\n          opacity: 0.9;\n        }\n\n        .hist-fill {\n          position: absolute;\n          top: 0; left: 0; right: 0; bottom: 0;\n          transition: opacity 0.3s ease, background 0.3s ease;\n        }\n\n        .compass-tick {\n          position: absolute;\n          top: 42px; /* Adjusted to sit below labels */\n          width: 1px;\n          border-radius: 0.5px;\n          background: var(--primary-text-color);\n          opacity: 0.2;\n          z-index: 2;\n        }\n\n        .compass-label {\n          position: absolute;\n          top: 12px;\n          transform: translateX(-50%);\n          color: var(--primary-text-color);\n          font-weight: 300;\n          font-size: 18px;\n          letter-spacing: 0.5px;\n          z-index: 3;\n          line-height: 1;\n        }\n\n        /* FLOATING MARKER (Modern Arrow) */\n        .compass-marker {\n          position: absolute;\n          left: 50%; \n          top: 0px; \n          width: 2px;\n          height: 12px;\n          background: var(--error-color, #ff3b30);\n          border-radius: 1px;\n          \n          transform: translateX(-50%); \n          z-index: 20; \n          filter: drop-shadow(0 0 4px rgba(255, 59, 48, 0.4));\n          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);\n          will-change: transform;\n        }\n        \n        /* Arrowhead */\n        .compass-marker::after {\n          content: \'\';\n          position: absolute;\n          bottom: -5px;\n          left: 50%;\n          transform: translateX(-50%);\n          width: 0; \n          height: 0; \n          border-left: 5px solid transparent;\n          border-right: 5px solid transparent;\n          border-top: 6px solid var(--error-color, #ff3b30);\n        }\n\n        /* CENTER DOT - Zeigt Durchschnitt (Mitte des Fensters) */\n        .compass-center-dot {\n           position: absolute;\n           left: 50%;\n           bottom: 0;\n           width: 2px; \n           height: 12px; \n           background: var(--primary-text-color);\n           border-radius: 2px;\n           transform: translateX(-50%);\n           opacity: 0.3;\n           z-index: 4;\n        }\n\n        /* --- SPEED BAR AREA --- */\n        .speed-container {\n          display: flex;\n          flex-direction: column;\n          gap: 8px;\n        }\n\n        .speed-bar-bg {\n          position: relative;\n          width: 100%;\n          height: 12px;\n          background: var(--secondary-background-color, rgba(0,0,0,0.05));\n          border-radius: 6px;\n          overflow: visible; \n          isolation: isolate;\n        }\n\n        .speed-bar-gust {\n          position: absolute;\n          top: 0; left: 0; bottom: 0;\n          background: var(--accent-color, var(--primary-color, #2196F3));\n          opacity: 0.2;\n          width: 0%;\n          transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);\n          z-index: 1;\n          border-radius: 6px;\n        }\n\n        .speed-bar-fill {\n          position: absolute;\n          top: 0; left: 0; bottom: 0;\n          background: var(--accent-color, var(--primary-color, #2196F3));\n          width: 0%;\n          transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);\n          box-shadow: 0 0 10px var(--accent-color, transparent); \n          z-index: 2;\n          border-radius: 6px;\n        }\n\n        .limit-marker {\n          position: absolute;\n          top: -2px; \n          bottom: -2px; \n          width: 2px;\n          background-color: var(--primary-text-color);\n          z-index: 10;\n          box-shadow: 0 1px 3px rgba(0,0,0,0.3);\n          border-radius: 1px;\n          display: none; \n          pointer-events: none;\n          opacity: 0.8;\n        }\n\n        .speed-text {\n          display: flex;\n          justify-content: flex-end;\n          align-items: baseline;\n          gap: 4px;\n          color: var(--primary-text-color);\n          text-shadow: var(--text-shadow, none);\n        }\n\n        .speed-text .value {\n          font-size: 3.5rem;\n          font-weight: 200;\n          letter-spacing: -1px;\n          line-height: 1;\n        }\n\n        .speed-text .unit {\n          font-size: 1.25rem;\n          color: var(--secondary-text-color);\n          font-weight: 300;\n        }\n\n        .speed-text .gust-info {\n          margin-left: 8px;\n          font-size: 13px;\n          color: var(--secondary-text-color);\n          opacity: 0.8;\n        }\n\n        /* --- SIMPLE MODE --- */\n        :host(.simple-mode) {\n          /* Restore card background and shadow to match other cards */\n          overflow: hidden; \n        }\n\n        :host(.simple-mode) .container {\n           padding: 0;\n           height: 120px; /* Increased to separate text and compass */\n           position: relative;\n        }\n\n        :host(.simple-mode) .compass-container {\n           height: 60px; /* Thinner */\n           margin-top: 60px; /* Pushed down to clear speed text */\n           -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);\n           mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);\n        }\n\n        :host(.simple-mode) .compass-tick {\n           top: 42px; /* Pushed down */\n        }\n        \n        :host(.simple-mode) .compass-label {\n           top: 20px; /* Pushed down to clear marker */\n           font-size: 16px;\n        }\n\n        :host(.simple-mode) .compass-marker {\n           top: 0px; /* At the top edge of compass container */\n        }\n\n        :host(.simple-mode) .speed-container {\n           position: absolute;\n           top: 16px;\n           left: 16px;\n           width: auto;\n           height: auto;\n           display: block;\n           z-index: 10;\n        }\n        \n        :host(.simple-mode) .speed-bar-bg {\n           display: none;\n        }\n\n        :host(.simple-mode) .speed-text {\n           display: flex;\n           flex-direction: row;\n           align-items: baseline;\n           justify-content: flex-start;\n           color: var(--primary-text-color);\n           text-shadow: 0 1px 4px rgba(0,0,0,0.5); /* Always shadow for readability over possible map/picture */\n        }\n\n        :host(.simple-mode) .speed-text .value {\n           font-size: 2.5rem; /* Smaller than full mode */\n        }\n        \n        :host(.simple-mode) .speed-text .gust-info {\n           margin-left: 6px;\n           font-size: 14px;\n           opacity: 0.9;\n        }\n\n        /* ALERT MODE (Red Background) */\n        :host(.simple-mode.alert-state) {\n           background: linear-gradient(135deg, rgba(255,59,48,0.8), rgba(200,30,30,0.9)) !important;\n           border-radius: var(--ha-card-border-radius, 12px);\n           box-shadow: 0 4px 20px rgba(255, 59, 48, 0.4);\n        }\n        \n        :host(.simple-mode.alert-state) .speed-text,\n        :host(.simple-mode.alert-state) .compass-label {\n           color: white !important;\n        }\n        \n        :host(.simple-mode.alert-state) .compass-tick {\n           background: white !important;\n           opacity: 0.4;\n        }\n      </style>\n\n      <div class="container">\n        <div class="compass-container" id="container">\n          <div class="compass-center-dot"></div>\n          <div class="compass-marker" id="marker"></div>\n          <div class="compass-tape" id="tape"></div>\n        </div>\n\n        <div class="speed-container">\n          <div class="speed-bar-bg">\n            <div class="speed-bar-gust" id="gust-bar"></div>\n            <div class="speed-bar-fill" id="speed-bar"></div>\n            <div class="limit-marker" id="limit-raffstore" title="Raffstore Limit"></div>\n            <div class="limit-marker" id="limit-rollo" title="Rollo Limit"></div>\n          </div>\n          <div class="speed-text" id="speed-text">--</div>\n        </div>\n      </div>\n    ')}_updateCard(){if(!this.config)return;const t=this.config.direction_entity,e=this.config.instant_direction_entity||t,i=this.config.speed_entity,s=this.config.gust_entity,n=this.config.raffstore_limit_entity,o=this.config.rollo_limit_entity;this._maxSpeed=this.config.max_speed||30,this._warnMultiplier=void 0!==this.config.warn_multiplier?Number(this.config.warn_multiplier):.9,this._recalcBuckets();const a=this._hass,r=null==a?void 0:a.states[t],l=null==a?void 0:a.states[e],d=null==a?void 0:a.states[i],c=s&&a?a.states[s]:null;r&&!isNaN(parseFloat(r.state))&&(this._avgDeg=parseFloat(r.state)),l&&!isNaN(parseFloat(l.state))?this._instDeg=parseFloat(l.state):this._instDeg=this._avgDeg,d&&!isNaN(parseFloat(d.state))?(this._currentSpeed=parseFloat(d.state),this._currentUnit=d.attributes.unit_of_measurement||"km/h"):(this._currentSpeed=0,this._currentUnit="km/h"),c&&!isNaN(parseFloat(c.state))?this._currentGust=parseFloat(c.state):this._currentGust=0,this._limitRaffstore=0,this._limitRollo=0,a&&n&&a.states[n]&&(this._limitRaffstore=parseFloat(a.states[n].state)||0),a&&o&&a.states[o]&&(this._limitRollo=parseFloat(a.states[o].state)||0);const h=Date.now();h-this._lastHistoryFetch>3e5&&a&&(this._lastHistoryFetch=h,this._fetchHistory(t,i)),this._updateVisuals()}async _fetchHistory(t,e){if(!this._hass)return;const i=new Date,s=new Date(i.getTime()-864e5);try{const n=[t,e].join(","),o=await this._hass.callApi("GET",`history/period/${s.toISOString()}?filter_entity_id=${n}&end_time=${i.toISOString()}&minimal_response`);if(o&&2===o.length){const i=o.find(e=>e.length>0&&e[0].entity_id===t),s=o.find(t=>t.length>0&&t[0].entity_id===e);i&&s&&this._processHistoryData(i,s)}}catch(t){console.error("WindCompass: History fetch failed",t)}}_processHistoryData(t,e){const i=new Array(this._bucketCount).fill(null).map(()=>({duration:0,totalSpeed:0}));let s=0;for(let n=0;n<t.length-1;n++){const o=parseFloat(t[n].state);if(isNaN(o))continue;const a=new Date(t[n].last_changed).getTime(),r=(new Date(t[n+1].last_changed).getTime()-a)/1e3/60;for(;s<e.length-1&&new Date(e[s+1].last_changed).getTime()<=a;)s++;const l=parseFloat(e[s].state)||0,d=Math.floor(o%360/360*this._bucketCount);d>=0&&d<this._bucketCount&&(i[d].duration+=r,i[d].totalSpeed+=l*r)}this._historyData=i,this._updateDimensions(),this._updateVisuals()}_updateDimensions(){if(!this.shadowRoot)return;const t=this.shadowRoot.querySelector("#container");if(!t)return;const e=t.offsetWidth;0!==e&&(this._pxPerDeg=e/360,this._buildTape())}_buildTape(){if(!this.shadowRoot||!this._pxPerDeg)return;const t=this.shadowRoot.querySelector("#tape");if(!t)return;t.innerHTML="";let e=0,i=0;this._historyData.forEach(t=>{if(t.duration>0){t.duration>e&&(e=t.duration);const s=t.totalSpeed/t.duration;s>i&&(i=s)}}),0===e&&(e=1),0===i&&(i=1);const s=[this._limitRaffstore,this._limitRollo].filter(t=>t>0),n=s.length>0?Math.min(...s):null,o=n?n*this._warnMultiplier:null,a=this._bucketSize*this._pxPerDeg,r=Math.max(1,a-2);for(let s=-180;s<=540;s+=this._bucketSize){const n=s*this._pxPerDeg,a=(s%360+360)%360,l=Math.floor(a/this._bucketSize);if(l>=0&&l<this._bucketCount){const s=this._historyData[l];if(s&&s.duration>0){const a=s.totalSpeed/s.duration,l=null!==o&&a>=o,d=l?"var(--error-color, #ff3b30)":"var(--accent-color, var(--primary-color))",c=document.createElement("div");c.className="hist-bar";const h=a/i*100;c.style.height=.6*h+"%",c.style.left=`${n+1}px`,c.style.width=`${r}px`;const p=document.createElement("div");if(p.className="hist-fill",p.style.background=d,l)p.style.opacity="1.0";else{const t=s.duration/e;p.style.opacity=(.4+.6*t).toString()}c.appendChild(p),t.appendChild(c)}}let d=!1;const c=document.createElement("div");if(c.className="compass-tick",c.style.left=`${n}px`,a%90==0){const e=document.createElement("div");e.className="compass-label";const i={0:"N",90:"O",180:"S",270:"W"};e.textContent=i[a]||"",e.style.left=`${n}px`,t.appendChild(e),d=!1}else a%45==0?(c.style.height="10px",c.style.opacity="0.4",d=!0):a%15==0&&(c.style.height="6px",c.style.opacity="0.2",d=!0);d&&t.appendChild(c)}}_interpolateColor(t,e,i){const s=t=>{const e=t.replace("#","");return parseInt(3===e.length?e.split("").map(t=>t+t).join(""):e,16)},n=s(t)>>16&255,o=s(t)>>8&255,a=255&s(t),r=s(e)>>16&255,l=s(e)>>8&255,d=255&s(e);return`rgb(${Math.round(n+(r-n)*i)}, ${Math.round(o+(l-o)*i)}, ${Math.round(a+(d-a)*i)})`}_updateVisuals(){var t,e;if(!this.shadowRoot||void 0===this._avgDeg||!this._pxPerDeg)return;if(!this.config)return;const i=this.shadowRoot.querySelector("#tape");i&&(i.style.transform=`translateX(-${this._avgDeg*this._pxPerDeg}px)`);const s=this.shadowRoot.querySelector("#marker");if(s&&void 0!==this._instDeg){const t=(this._instDeg-this._avgDeg+540)%360-180;s.style.transform=`translateX(calc(-50% + ${t*this._pxPerDeg}px))`}const n=this.shadowRoot.querySelector("#speed-bar"),o=this.shadowRoot.querySelector("#gust-bar"),a=this.shadowRoot.querySelector("#speed-text"),r=this.shadowRoot.querySelector("#limit-raffstore"),l=this.shadowRoot.querySelector("#limit-rollo");if(void 0!==this._currentSpeed){if(this.config.simple_mode){const t=[this._limitRaffstore,this._limitRollo].filter(t=>t>0),e=t.length>0?Math.min(...t):null;if(e&&this._currentSpeed>=e?this.classList.add("alert-state"):this.classList.remove("alert-state"),a){let t=`\n                <span class="value">${Math.round(this._currentSpeed||0)}</span>\n                <span class="unit">${this._currentUnit}</span>\n             `;this._currentGust>0&&(t+=`<span class="gust-info">(${Math.round(this._currentGust)})</span>`),a.innerHTML=t}}let i=this._currentSpeed/this._maxSpeed*100;i>100&&(i=100),!this.config.simple_mode&&n&&(n.style.width=`${i}%`);const s=!0===(null===(e=null===(t=this._hass)||void 0===t?void 0:t.themes)||void 0===e?void 0:e.darkMode),d=i/100;let c,h;s?(c="#1c1c1e",h="#3a3a3c"):(c="#e0e0e0",h="#ffffff");const p="#37474f",g="#607d8b",u=this._interpolateColor(c,p,d),f=this._interpolateColor(h,g,d);this.style.background=`linear-gradient(180deg, ${u} 0%, ${f} 100%)`,s||d>.5?(this.style.color="white",this.style.setProperty("--primary-text-color","white"),this.style.setProperty("--secondary-text-color","rgba(255,255,255,0.7)"),this.style.setProperty("--secondary-background-color","rgba(255,255,255,0.15)"),this.style.setProperty("--ha-card-box-shadow","none"),this.style.setProperty("--text-shadow","0 1px 4px rgba(0,0,0,0.5)")):(this.style.color="#212121",this.style.setProperty("--primary-text-color","#212121"),this.style.setProperty("--secondary-text-color","#757575"),this.style.setProperty("--secondary-background-color","rgba(0,0,0,0.1)"),this.style.removeProperty("--text-shadow"));let m=this._currentGust/this._maxSpeed*100;if(m>100&&(m=100),o&&(o.style.width=`${m}%`),!this.config.simple_mode&&a){let t=`\n                <span class="value">${Math.round(this._currentSpeed||0)}</span>\n                <span class="unit">${this._currentUnit}</span>\n            `;this._currentGust>0&&(t+=`<span class="gust-info">(Max ${Math.round(this._currentGust)})</span>`),a.innerHTML=t}if(r)if(this._limitRaffstore>0){let t=this._limitRaffstore/this._maxSpeed*100;t>100&&(t=100),r.style.left=`${t}%`,r.style.display="block"}else r.style.display="none";if(l)if(this._limitRollo>0){let t=this._limitRollo/this._maxSpeed*100;t>100&&(t=100),l.style.left=`${t}%`,l.style.display="block"}else l.style.display="none"}}getCardSize(){return 3}}try{customElements.get("slick-wind-compass-card")||(customElements.define("slick-wind-compass-card",lt),console.info("%c slick-wind-compass-card Registered","color: green; font-weight: bold;"))}catch(S){console.error("Failed to register slick-wind-compass-card",S)}class dt extends at{static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config=t}_valueChanged(t){if(!this._config||!this.hass)return;const e={...this._config,...t.detail.value},i=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){if(!this.hass||!this._config)return V``;return V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"direction_entity",label:"Direction Entity",selector:{entity:{domain:"sensor"}}},{name:"speed_entity",label:"Speed Entity",selector:{entity:{domain:"sensor"}}},{name:"gust_entity",label:"Gust Entity (Optional)",selector:{entity:{domain:"sensor"}}},{name:"instant_direction_entity",label:"Instant Dir (opt)",selector:{entity:{domain:"sensor"}}},{name:"max_speed",label:"Max Speed",selector:{number:{mode:"box",min:0}}},{name:"simple_mode",label:"Simple Mode",selector:{boolean:{}}},{name:"raffstore_limit_entity",label:"Raffstore Limit (opt)",selector:{entity:{domain:"sensor"}}},{name:"rollo_limit_entity",label:"Rollo Limit (opt)",selector:{entity:{domain:"sensor"}}}]}
        .computeLabel=${t=>t.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}}customElements.get("slick-wind-compass-editor")||customElements.define("slick-wind-compass-editor",dt),window.customCards=window.customCards||[],window.customCards.push({type:"slick-wind-compass-card",name:"Slick Wind Compass",preview:!0,description:"Apple-style wind direction compass with speed indicator"});console.info("%c MINI-WEATHER-CARD %c 0.1.0 ","color: white; background: #2980b9; font-weight: 700;","color: #2980b9; background: white; font-weight: 700;");class ct extends at{static get properties(){return{hass:{attribute:!1},config:{state:!0},_forecast:{state:!0},_historyData:{state:!0},_cardWidth:{state:!0},_cardHeight:{state:!0}}}static getConfigElement(){return document.createElement("slick-minimal-weather-card-editor")}static getStubConfig(t){let e="";if(t&&t.states){const i=Object.keys(t.states).filter(t=>t.startsWith("weather."));i.length>0&&(e=i[0])}return{type:"custom:slick-minimal-weather-card",entity:e,title:"Wetter",mode:"daily",sampling_size:50,history_hours:24}}constructor(){super(),this._forecast=null,this._historyData=[],this._cardHeight=200,this._cardWidth=300,this._forecast=null,this._historyData=[],this._cardHeight=200,this._cardWidth=300,this._resizeObserver=new ResizeObserver(t=>{for(const e of t)this._cardWidth=e.contentRect.width,this._cardHeight=e.contentRect.height,this.requestUpdate()})}connectedCallback(){super.connectedCallback(),this._resizeObserver.observe(this),this.hass&&this.config&&(this._subscribeForecast(),this._updateHistory())}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver.disconnect(),this._unsubscribeForecast()}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={title:"Wetter",mode:"daily",temp_sensor:void 0,history_entity:void 0,sun_entity:"sun.sun",sampling_size:50,history_hours:24,...t};if(e.mode&&!["daily","hourly"].includes(e.mode))throw new Error(`Invalid mode: ${e.mode}. Expected 'daily' or 'hourly'.`);this.config=e}updated(t){super.updated(t),(t.has("config")||t.has("hass"))&&(!this._unsub&&this.config.entity&&this._subscribeForecast(),this._historyTimeout&&clearTimeout(this._historyTimeout),this._historyTimeout=window.setTimeout(()=>this._updateHistory(),1e4))}async _subscribeForecast(){var t;if(this._unsubscribeForecast(),!(this.hass&&this.config&&this.config.entity&&this.hass.connection))return;const e=this.config.entity,i=this.hass.states[e];if(i)if("daily"===this.config.mode&&(null===(t=i.attributes.forecast)||void 0===t?void 0:t.length)>0)this._forecast=i.attributes.forecast;else try{this._unsub=await this.hass.connection.subscribeMessage(t=>{t&&t.forecast&&(this._forecast=t.forecast,this.requestUpdate())},{type:"weather/subscribe_forecast",forecast_type:this.config.mode||"daily",entity_id:e})}catch(t){console.error("MiniWeatherCard: Subscription failed",t)}}_unsubscribeForecast(){this._unsub&&(this._unsub(),this._unsub=void 0)}async _updateHistory(){if(!this.hass||!this.config.history_entity)return void(this._historyData=[]);const t=this.config.history_entity,e=parseInt(String(this.config.history_hours))||24,i=new Date,s=new Date(i.getTime()-60*e*60*1e3),n=encodeURIComponent(s.toISOString()),o=encodeURIComponent(i.toISOString()),a=encodeURIComponent(t);try{const t=await this.hass.callApi("GET",`history/period/${n}?filter_entity_id=${a}&end_time=${o}&minimal_response`);if(t&&t.length>0&&t[0].length>0){const e=t[0].map(t=>({time:new Date(t.last_changed).getTime(),state:parseFloat(t.state)})).filter(t=>!isNaN(t.state)),i=this.config.sampling_size||50;if(e.length>i){const t=Math.ceil(e.length/i);this._historyData=e.filter((e,i)=>i%t===0)}else this._historyData=e}else this._historyData=[]}catch(t){this._historyData=[]}}_calculatePathPoints(){const t=this._historyData;if(!t||t.length<2||0===this._cardWidth||0===this._cardHeight)return null;const e=this._cardWidth,i=this._cardHeight,s=i-40;let n=t[0].state,o=t[0].state;const a=t[0].time,r=t[t.length-1].time;t.forEach(t=>{t.state<n&&(n=t.state),t.state>o&&(o=t.state)}),o===n&&(o+=.5,n-=.5);const l=o-n,d=r-a;if(d<=0)return null;const c=t.map(t=>{const o=(t.time-a)/d*e,r=(t.state-n)/l;return[o,i-20-r*s]}),h=function(t){if(t.length<2)return"";const e=t.reduce((t,e)=>[...t,e[0],e[1]],[]),i=function(t,e){const i=t.length-1;if(i<1)return[];const s=[],n=t[0],o=t[1];s.push([n,o]);for(let n=0;n<i-1;n++){const o=0===n?[t[0],t[1]]:[t[2*(n-1)],t[2*(n-1)+1]],a=[t[2*n],t[2*n+1]],r=[t[2*(n+1)],t[2*(n+1)+1]],l=n+2>i?r:[t[2*(n+2)],t[2*(n+2)+1]],d=a[0]+(r[0]-o[0])/6*e,c=a[1]+(r[1]-o[1])/6*e,h=r[0]-(l[0]-a[0])/6*e,p=r[1]-(l[1]-a[1])/6*e;s.push([d,c,h,p,r[0],r[1]])}return s}(e,1);if(0===i.length)return"";let s=`M ${i[0][0]},${i[0][1]} `;for(let t=1;t<i.length;t++){const e=i[t];s+=`C ${e[0]},${e[1]} ${e[2]},${e[3]} ${e[4]},${e[5]} `}return s}(c);return h?{line:h,area:h+` L ${e},${i} L 0,${i} Z`}:null}render(){var t,e,i,s;if(!this.config)return V``;if(!this.hass)return V``;const n=this.config.entity?this.hass.states[this.config.entity]:void 0;let o=null!==(e=null===(t=null==n?void 0:n.attributes)||void 0===t?void 0:t.temperature)&&void 0!==e?e:"--";if(this.config.temp_sensor){const t=this.hass.states[this.config.temp_sensor];t&&!isNaN(parseFloat(t.state))&&(o=t.state)}let a=Math.floor((this._cardHeight-162)/32);a<0&&(a=0);const r=this._cardHeight>140,l=this._forecast?this._forecast.slice(0,a):[],d="hourly"===this.config.mode;let c=V`&nbsp;`;const h=this._forecast||[];if(h.length>0){const t=h[0],e=null!==(i=t.temperature)&&void 0!==i?i:t.temp_max,n=null!==(s=t.templow)&&void 0!==s?s:t.temp_min,o=void 0!==e?Math.round(e):"--",a=void 0!==n?Math.round(n):"--";c=d?V`${o}°`:"--"===a?V`H:${o}°`:V`H:${o}° L:${a}°`}const p=this._calculatePathPoints(),g=p?`path('${p.area}')`:"none",u=this._getCurrentGradients();return V`
      <ha-card @click="${this._openMoreInfo}" style="cursor: pointer;">
        <div class="bg-container">
            <div class="bg-layer bright" style="background: ${u.bright};"></div>
            <div class="bg-layer dark" style="background: ${u.dark}; clip-path: ${g}; -webkit-clip-path: ${g};"></div>
            
            ${this.config.history_entity&&p?V`
                <svg class="history-svg" viewBox="0 0 ${this._cardWidth} ${this._cardHeight}" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineFade" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:white; stop-opacity:0.0;" />
                            <stop offset="20%" style="stop-color:white; stop-opacity:0.1;" />
                            <stop offset="100%" style="stop-color:white; stop-opacity:0.8;" />
                        </linearGradient>
                    </defs>
                    
                    <path d="${p.line}" fill="none" stroke="url(#lineFade)" stroke-width="1.2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                </svg>
            `:""}
        </div>

        <div class="container content-layer">
            <div class="header">
                <div class="temp-big">${void 0!==o?Math.round(Number(o))+"°":"--"}</div>
                <div class="header-right">
                    <ha-icon icon="${this._getIcon(n?n.state:"")}" class="main-icon"></ha-icon>
                    <div class="hl-label">${c}</div>
                </div>
            </div>

            ${r?V`
                <div class="forecast-list">
                    ${l.map(t=>this._renderRow(t))}
                    ${0===h.length?V`<div class="loading">Lade...</div>`:""}
                </div>
            `:V`<div style="flex:1;"></div>`} 

            <div class="footer">${this.config.title}</div>
        </div>
      </ha-card>
    `}_renderRow(t){var e,i;const s=new Date(t.datetime),n="hourly"===this.config.mode,o=n?s.toLocaleTimeString(this.hass.language,{hour:"2-digit",minute:"2-digit"}):s.toLocaleDateString(this.hass.language,{weekday:"short"}),a=null!==(e=t.temperature)&&void 0!==e?e:t.temp_max,r=null!==(i=t.templow)&&void 0!==i?i:t.temp_min;return n&&void 0!==a?V`<div class="row hourly"><div class="day-name">${o}</div><div class="icon-small"><ha-icon icon="${this._getIcon(t.condition)}"></ha-icon></div><div class="temp-single">${Math.round(a)}°</div></div>`:void 0!==r&&void 0!==a?V`<div class="row"><div class="day-name">${o}</div><div class="icon-small"><ha-icon icon="${this._getIcon(t.condition)}"></ha-icon></div><div class="bars"><span class="val-low">${Math.round(r)}°</span><div class="bar-track"><div class="bar-fill"></div></div><span class="val-high">${Math.round(a)}°</span></div></div>`:V``}_getIcon(t){return{sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",partlycloudy:"mdi:weather-partly-cloudy",cloudy:"mdi:cloud",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",fog:"mdi:weather-fog",hail:"mdi:weather-hail",snowy:"mdi:weather-snowy",lightning:"mdi:weather-lightning"}[t]||"mdi:weather-cloudy"}_openMoreInfo(){this.config.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{composed:!0,detail:{entityId:this.config.entity}}))}_getCurrentGradients(){if(!this.hass||!this.config||!this.config.entity)return{bright:"linear-gradient(180deg, #2c3e50 0%, #151a1e 100%)",dark:"linear-gradient(180deg, #243342 0%, #0a0a0a 100%)"};const t=this.hass.states[this.config.entity];if(!t)return{bright:"linear-gradient(180deg, #2c3e50 0%, #151a1e 100%)",dark:"linear-gradient(180deg, #243342 0%, #0a0a0a 100%)"};const e=this.config.sun_entity||"sun.sun",i=this.hass.states[e];let s="noon";if(i&&i.attributes){s=function(t,e){return t<-18?"night":t>=-18&&t<-6?e?"early-dawn":"late-dusk":t>=-6&&t<0?e?"late-dawn":"early-dusk":t>=0&&t<15?e?"morning":"late-afternoon":t>=15&&t<35?e?"morning":"early-afternoon":"noon"}(i.attributes.elevation||0,i.attributes.rising||!1)}const n=function(t){return["rainy","pouring","lightning","snowy","hail","fog"].includes(t)}(t.state);return function(t,e){const i={"night-good":{bright:"linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",dark:"linear-gradient(180deg, #000000 0%, #0a1929 50%, #1a2f42 100%)"},"early-dawn-good":{bright:"linear-gradient(180deg, #2c3e50 0%, #3a5169 50%, #526c87 100%)",dark:"linear-gradient(180deg, #1a1f2e 0%, #2b3a4d 50%, #3d5167 100%)"},"late-dawn-good":{bright:"linear-gradient(180deg, #f3904f 0%, #f7b267 50%, #ffd89b 100%)",dark:"linear-gradient(180deg, #d76d47 0%, #e89a5f 50%, #f5c98c 100%)"},"morning-good":{bright:"linear-gradient(180deg, #56ccf2 0%, #87ceeb 50%, #a8daff 100%)",dark:"linear-gradient(180deg, #3ba5d1 0%, #6bb8e0 50%, #8dc9f2 100%)"},"noon-good":{bright:"linear-gradient(180deg, #1e88e5 0%, #42a5f5 50%, #64b5f6 100%)",dark:"linear-gradient(180deg, #1565c0 0%, #1e88e5 50%, #42a5f5 100%)"},"early-afternoon-good":{bright:"linear-gradient(180deg, #42a5f5 0%, #64b5f6 50%, #90caf9 100%)",dark:"linear-gradient(180deg, #2196f3 0%, #42a5f5 50%, #64b5f6 100%)"},"late-afternoon-good":{bright:"linear-gradient(180deg, #ff9a56 0%, #ffb07c 50%, #ffcda3 100%)",dark:"linear-gradient(180deg, #f57c42 0%, #ff9656 50%, #ffb486 100%)"},"early-dusk-good":{bright:"linear-gradient(180deg, #fa709a 0%, #fc8ba8 50%, #ffa7bd 100%)",dark:"linear-gradient(180deg, #e85285 0%, #f56a94 50%, #fc8ba8 100%)"},"late-dusk-good":{bright:"linear-gradient(180deg, #434343 0%, #5a5a5a 50%, #717171 100%)",dark:"linear-gradient(180deg, #1a1a1a 0%, #2f2f2f 50%, #454545 100%)"},"night-bad":{bright:"linear-gradient(180deg, #263238 0%, #37474f 50%, #455a64 100%)",dark:"linear-gradient(180deg, #0d1117 0%, #1a1f2e 50%, #263238 100%)"},"early-dawn-bad":{bright:"linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)",dark:"linear-gradient(180deg, #2c3e50 0%, #34495e 50%, #455a64 100%)"},"late-dawn-bad":{bright:"linear-gradient(180deg, #78909c 0%, #90a4ae 50%, #b0bec5 100%)",dark:"linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)"},"morning-bad":{bright:"linear-gradient(180deg, #607d8b 0%, #78909c 50%, #90a4ae 100%)",dark:"linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)"},"noon-bad":{bright:"linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)",dark:"linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)"},"early-afternoon-bad":{bright:"linear-gradient(180deg, #607d8b 0%, #78909c 50%, #90a4ae 100%)",dark:"linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)"},"late-afternoon-bad":{bright:"linear-gradient(180deg, #78909c 0%, #8d9da6 50%, #a3b1ba 100%)",dark:"linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)"},"early-dusk-bad":{bright:"linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)",dark:"linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)"},"late-dusk-bad":{bright:"linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)",dark:"linear-gradient(180deg, #1c2329 0%, #263238 50%, #37474f 100%)"}};return i[`${t}-${e?"bad":"good"}`]||i["noon-good"]}(s,n)}static get styles(){return o`
      :host { display: block; height: 100%; isolation: isolate; }
      ha-card {
        background: transparent; color: white;
        border-radius: var(--ha-card-border-radius, 12px);
        height: 100%; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column;
        box-shadow: var(--ha-card-box-shadow, none); position: relative;
      }
      .bg-container { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0; overflow: hidden; border-radius: var(--ha-card-border-radius, 12px); }
      .bg-layer { position: absolute; top: 0; left: 0; right: 0; bottom: 0; transition: background 1s ease; }
      .bg-layer.bright { z-index: 1; }
      .bg-layer.dark { z-index: 2; }
      .history-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none; }
      .content-layer { position: relative; z-index: 4; }
      .container { padding: 16px; height: 100%; display: flex; flex-direction: column; box-sizing: border-box; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; flex: 0 0 auto; margin-bottom: 10px; }
      .temp-big { font-size: 3.5rem; font-weight: 200; line-height: 1; text-shadow: 0 1px 5px rgba(0,0,0,0.5); }
      .header-right { display: flex; flex-direction: column; align-items: flex-end; text-shadow: 0 1px 5px rgba(0,0,0,0.5); }
      .main-icon { --mdc-icon-size: 32px; margin-bottom: 4px; filter: drop-shadow(0 1px 5px rgba(0,0,0,0.5)); }
      .hl-label { font-size: 0.9rem; font-weight: 500; opacity: 0.9; }
      .forecast-list { display: flex; flex-direction: column; gap: 0; flex: 1 1 auto; overflow: hidden; justify-content: flex-start; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }
      .row { display: grid; grid-template-columns: 50px 30px 1fr; align-items: center; font-size: 0.95rem; height: 32px; }
      .day-name { font-weight: 600; opacity: 0.9; }
      .icon-small { text-align: center; }
      .icon-small ha-icon { --mdc-icon-size: 20px; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.8)); }
      .bars { display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
      .val-low { opacity: 0.6; width: 25px; text-align: right; }
      .val-high { font-weight: 600; width: 25px; text-align: right; }
      .bar-track { flex-grow: 1; height: 5px; background: rgba(255,255,255,0.15); border-radius: 3px; position: relative; min-width: 50px; max-width: 100px; overflow: hidden; box-shadow: inset 0 1px 2px rgba(0,0,0,0.2); }
      .bar-fill { position: absolute; left: 0; top: 0; bottom: 0; right: 0; background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); opacity: 0.8; }
      .hourly .temp-single { text-align: right; font-weight: 600; padding-right: 5px; }
      .footer { margin-top: auto; padding-top: 10px; text-align: center; font-size: 0.7rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; flex: 0 0 auto; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
      .loading { text-align: center; font-size: 0.8rem; opacity: 0.5; padding: 10px; }
    `}}customElements.get("slick-minimal-weather-card")||(customElements.define("slick-minimal-weather-card",ct),console.info("%c slick-minimal-weather-card Registered","color: green; font-weight: bold;"));class ht extends at{static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config=t}_valueChanged(t){const e=t.detail.value,i=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){if(!this.hass||!this._config)return V``;return V`<ha-form .hass=${this.hass} .data=${this._config} .schema=${[{name:"entity",label:"Wetter Entität",selector:{entity:{domain:"weather"}}},{name:"title",label:"Titel",selector:{text:{}}},{name:"temp_sensor",label:"Temp. Override (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"history_entity",label:"Verlauf (Hintergrund)",selector:{entity:{domain:"sensor"}}},{name:"sun_entity",label:"Sonnen-Sensor",selector:{entity:{domain:"sun"}}},{name:"history_hours",label:"Verlauf Zeitraum",selector:{select:{options:[{value:"1",label:"1 Stunde"},{value:"6",label:"6 Stunden"},{value:"12",label:"12 Stunden"},{value:"24",label:"24 Stunden"},{value:"48",label:"2 Tage"},{value:"72",label:"3 Tage"},{value:"168",label:"7 Tage"}]}}},{name:"sampling_size",label:"Glättung (Punkte)",selector:{number:{min:5,max:200,mode:"slider"}}},{name:"mode",label:"Modus",selector:{select:{options:[{value:"daily",label:"Täglich"},{value:"hourly",label:"Stündlich"}]}}}]} .computeLabel=${t=>t.label} @value-changed=${this._valueChanged}></ha-form>`}}customElements.get("slick-minimal-weather-card-editor")||customElements.define("slick-minimal-weather-card-editor",ht),window.customCards=window.customCards||[],window.customCards.push({type:"slick-minimal-weather-card",name:"Slick Minimal Weather",preview:!0,description:"Minimalist weather card with history and forecasting."});const pt=[{name:"display_mode",label:"Anzeigemodus",selector:{select:{mode:"dropdown",options:[{value:"analog",label:"Analog (Klassisch)"},{value:"digital",label:"Digital (Hybrid)"}]}}},{name:"font_style",label:"Schriftart",selector:{select:{mode:"dropdown",options:[{value:"standard",label:"Standard (Apple Bold)"},{value:"thin",label:"Modern & Dünn (iOS)"},{value:"retro",label:"Retro Bahnhof (DIN-Style)"}]}}}];class gt extends HTMLElement{constructor(){super(...arguments),this._ticks=[],this._lastMin=-1,this._lastSecond=-1}static getConfigElement(){return document.createElement("slick-squircle-clock-editor")}static getStubConfig(){return{type:"custom:slick-squircle-clock-card",display_mode:"digital",font_style:"standard"}}set hass(t){this._hass=t}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={display_mode:"digital",font_style:"standard",...t};if(e.display_mode&&!["analog","digital"].includes(e.display_mode))throw new Error(`Invalid display_mode: ${e.display_mode}`);if(e.font_style&&!["standard","thin","retro"].includes(e.font_style))throw new Error(`Invalid font_style: ${e.font_style}`);this.config=e,this.shadowRoot&&(this._render(),this._drawContent())}getLayoutOptions(){return{grid_rows:2,grid_columns:2,grid_min_rows:1,grid_min_columns:1}}connectedCallback(){this.shadowRoot||this.attachShadow({mode:"open"}),this._render(),this._drawContent(),this._startClock(),this._resizeObserver=new ResizeObserver(()=>this._drawContent()),this._resizeObserver.observe(this)}disconnectedCallback(){var t;this._stopClock(),null===(t=this._resizeObserver)||void 0===t||t.disconnect()}_startClock(){this._timer&&cancelAnimationFrame(this._timer);const t=()=>{var e,i,s;const n=new Date;let o=n,a=null===(e=this.config)||void 0===e?void 0:e.timezone;if((null===(i=this.config)||void 0===i?void 0:i.timezone_entity)&&this._hass){const t=this._hass.states[this.config.timezone_entity];t&&t.state&&(a=t.state)}if(a)try{const t=n.toLocaleString("en-US",{timeZone:a});o=new Date(t),o.setMilliseconds(n.getMilliseconds())}catch(t){o=n}"digital"===(null===(s=this.config)||void 0===s?void 0:s.display_mode)?this._updateDigital(o):this._updateAnalog(o),this._timer=requestAnimationFrame(t)};this._timer=requestAnimationFrame(t)}_stopClock(){this._timer&&cancelAnimationFrame(this._timer)}_getPointOnRoundedRect(t,e,i,s,n){const o=(t-90)*(Math.PI/180),a=e/2,r=i/2,l=Math.max(0,e-2*n),d=Math.max(0,i-2*n),c=Math.max(0,s-n),h=l/2,p=d/2,g=Math.abs(Math.cos(o));let u,f;h*Math.abs(Math.sin(o))<=p*g?(u=h*Math.sign(Math.cos(o)),f=h*Math.tan(o)*Math.sign(Math.cos(o))):(u=p/Math.tan(o)*Math.sign(Math.sin(o)),f=p*Math.sign(Math.sin(o)));const m=Math.max(0,h-c),b=Math.max(0,p-c);if(Math.abs(u)>m&&Math.abs(f)>b){const t=Math.abs(u)-m,e=Math.abs(f)-b,i=Math.sqrt(t*t+e*e);u=(m+t/i*c)*Math.sign(u),f=(b+e/i*c)*Math.sign(f)}return{x:a+u,y:r+f}}_getFontStyle(){var t;switch((null===(t=this.config)||void 0===t?void 0:t.font_style)||"standard"){case"thin":return'\n                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\n                font-weight: 200;\n              ';case"retro":return'\n                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n                font-weight: 700;\n                letter-spacing: 0.5px;\n              ';default:return'\n                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\n                font-weight: 600;\n              '}}_render(){var t;this.shadowRoot&&(this.shadowRoot.innerHTML=`\n      <style>\n        :host {\n          display: block; width: 100%; height: 100%;\n          background: var(--ha-card-background, var(--card-background-color, white));\n          border-radius: var(--ha-card-border-radius, 12px);\n          box-shadow: var(--ha-card-box-shadow, none);\n          overflow: hidden;\n          box-sizing: border-box;\n          position: relative;\n        }\n        svg { width: 100%; height: 100%; display: block; position: absolute; top: 0; left: 0; }\n        \n        /* Analog Styles */\n        text.analog-num {\n          ${this._getFontStyle()}\n          fill: var(--primary-text-color); \n          text-anchor: middle; dominant-baseline: middle;\n        }\n        #hour-hand, #minute-hand { stroke: var(--primary-text-color); stroke-width: 6; stroke-linecap: round; }\n        #second-hand { stroke: #ff9500; stroke-width: 2.5; stroke-linecap: round; }\n        #center-dot { fill: #ff9500; stroke: var(--primary-text-color); stroke-width: 1.5; }\n\n        /* Digital Styles */\n        .digital-container {\n            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\n            text-align: center; \n            color: var(--primary-text-color); pointer-events: none;\n            ${this._getFontStyle()}\n        }\n        .time-big { font-size: 1em; line-height: 1; font-variant-numeric: tabular-nums; }\n        .date-small { \n            font-weight: 500; \n            opacity: 0.6; \n            margin-top: 4px; \n            text-transform: uppercase; \n            font-weight: ${"thin"===(null===(t=this.config)||void 0===t?void 0:t.font_style)?"400":"bold"};\n        }\n        \n        /* Aktiver Sekunden-Tick (Digital) */\n        .active-tick { \n            stroke: #ff9500 !important; \n            stroke-opacity: 1 !important; \n            stroke-width: 3px !important; \n        }\n      </style>\n      <div id="content"></div>\n    `)}_drawContent(){var t;if(!this.shadowRoot)return;const e=this.shadowRoot.getElementById("content");if(!e)return;const i=this.getBoundingClientRect(),s=i.width||300,n=i.height||300,o=Math.min(s,n),a=window.getComputedStyle(this);let r=parseFloat(a.borderTopLeftRadius);a.borderTopLeftRadius&&a.borderTopLeftRadius.includes("%")&&(r=o*parseFloat(a.borderTopLeftRadius)/100);const l=r||.22*o;"analog"===((null===(t=this.config)||void 0===t?void 0:t.display_mode)||"analog")?this._drawAnalog(e,s,n,l,o):this._drawDigital(e,s,n,l,o)}_drawAnalog(t,e,i,s,n){var o,a,r,l,d;let c="";for(let t=0;t<60;t++){const n=t%5==0,r=6*t,l=this._getPointOnRoundedRect(r,e,i,s,5),d=this._getPointOnRoundedRect(r,e,i,s,n?20:12),h=n?"var(--primary-text-color)":"var(--secondary-text-color)";let p=n?3:1.5;"retro"===(null===(o=this.config)||void 0===o?void 0:o.font_style)&&n&&(p=4.5),"retro"!==(null===(a=this.config)||void 0===a?void 0:a.font_style)||n||(p=2),c+=`<line x1="${d.x}" y1="${d.y}" x2="${l.x}" y2="${l.y}" stroke="${h}" stroke-width="${p}" stroke-linecap="round" />`}const h=this._getPointOnRoundedRect(0,e,i,s,.25*n),p=this._getPointOnRoundedRect(90,e,i,s,.25*n),g=this._getPointOnRoundedRect(180,e,i,s,.25*n),u=this._getPointOnRoundedRect(270,e,i,s,.25*n);t.innerHTML=`\n      <svg viewBox="0 0 ${e} ${i}">\n        ${c}\n        <text class="analog-num" style="font-size: ${Math.max(12,n/10)}px" x="${h.x}" y="${h.y}">12</text>\n        <text class="analog-num" style="font-size: ${Math.max(12,n/10)}px" x="${p.x}" y="${p.y}">3</text>\n        <text class="analog-num" style="font-size: ${Math.max(12,n/10)}px" x="${g.x}" y="${g.y}">6</text>\n        <text class="analog-num" style="font-size: ${Math.max(12,n/10)}px" x="${u.x}" y="${u.y}">9</text>\n        <line id="hour-hand" x1="${e/2}" y1="${i/2}" x2="${e/2}" y2="${i/2-n/4}" />\n        <line id="minute-hand" x1="${e/2}" y1="${i/2}" x2="${e/2}" y2="${i/2-n/2.8}" />\n        <line id="second-hand" x1="${e/2}" y1="${i/2+15}" x2="${e/2}" y2="${i/2-n/2.4}" />\n        <circle id="center-dot" cx="${e/2}" cy="${i/2}" r="3.5" />\n      </svg>\n    `,this.hourHand=null===(r=this.shadowRoot)||void 0===r?void 0:r.querySelector("#hour-hand"),this.minuteHand=null===(l=this.shadowRoot)||void 0===l?void 0:l.querySelector("#minute-hand"),this.secondHand=null===(d=this.shadowRoot)||void 0===d?void 0:d.querySelector("#second-hand"),this._center={x:e/2,y:i/2}}_drawDigital(t,e,i,s,n){var o,a,r,l;let d="";for(let t=0;t<60;t++){const n=6*t,o=this._getPointOnRoundedRect(n,e,i,s,6),a=this._getPointOnRoundedRect(n,e,i,s,14);d+=`<line id="tick-${t}" x1="${a.x}" y1="${a.y}" x2="${o.x}" y2="${o.y}" \n                stroke="var(--secondary-text-color)" \n                stroke-opacity="0.4" \n                stroke-width="1.5" \n                stroke-linecap="round" />`}t.innerHTML=`\n      <svg viewBox="0 0 ${e} ${i}">${d}</svg>\n      <div class="digital-container">\n        <div class="time-big" id="time-display" style="font-size: ${.25*n}px">--:--</div>\n        <div class="date-small" id="date-display" style="font-size: ${.08*n}px">--</div>\n      </div>\n    `,this._timeDisplay=null===(o=this.shadowRoot)||void 0===o?void 0:o.querySelector("#time-display"),this._dateDisplay=null===(a=this.shadowRoot)||void 0===a?void 0:a.querySelector("#date-display"),this._ticks=[];for(let t=0;t<60;t++)this._ticks.push((null===(r=this.shadowRoot)||void 0===r?void 0:r.querySelector(`#tick-${t}`))||null);this._lastMin=-1,this._lastSecond=-1;const c=new Date;if(null===(l=this.config)||void 0===l?void 0:l.timezone)try{const t=c.toLocaleString("en-US",{timeZone:this.config.timezone}),e=new Date(t);this._updateDigital(e,!0)}catch(t){this._updateDigital(c,!0)}else this._updateDigital(c,!0)}_updateAnalog(t){var e,i;if(!this.hourHand)return;const s=t.getSeconds()+t.getMilliseconds()/1e3,n=t.getMinutes()+s/60,o=t.getHours()%12+n/60,{x:a,y:r}=this._center||{x:0,y:0};null===(e=this.secondHand)||void 0===e||e.setAttribute("transform",`rotate(${6*s} ${a} ${r})`),null===(i=this.minuteHand)||void 0===i||i.setAttribute("transform",`rotate(${6*n} ${a} ${r})`),this.hourHand.setAttribute("transform",`rotate(${30*o} ${a} ${r})`)}_updateDigital(t,e=!1){var i,s,n;if(!this._timeDisplay)return;const o=t.getSeconds();if(e||this._lastMin!==t.getMinutes()){const e=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");this._timeDisplay.textContent=`${e}:${s}`;const n={...{weekday:"short",day:"numeric"}};(null===(i=this.config)||void 0===i?void 0:i.timezone)&&(n.timeZone=this.config.timezone),this._dateDisplay&&(this._dateDisplay.textContent=(new Date).toLocaleDateString("de-DE",n)),this._lastMin=t.getMinutes()}(e||this._lastSecond!==o)&&(-1!==this._lastSecond&&this._ticks[this._lastSecond]&&(null===(s=this._ticks[this._lastSecond])||void 0===s||s.classList.remove("active-tick")),this._ticks[o]&&(null===(n=this._ticks[o])||void 0===n||n.classList.add("active-tick")),this._lastSecond=o)}}class ut extends at{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){this._config=t}_valueChanged(t){if(!this._config||!this.hass)return;const e={...this._config,...t.detail.value};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${pt}
        .computeLabel=${t=>t.label||t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V``}}customElements.get("slick-squircle-clock-card")||(customElements.define("slick-squircle-clock-card",gt),console.info("%c slick-squircle-clock-card Registered","color: green; font-weight: bold;")),customElements.get("slick-squircle-clock-editor")||customElements.define("slick-squircle-clock-editor",ut),window.customCards=window.customCards||[],window.customCards.push({type:"slick-squircle-clock-card",name:"Slick Squircle Clock",preview:!0,description:"A customizable clock card with analog and digital modes."});console.info("%c SIMPLE-CLIMATE-CARD %c 0.1.0 ","color: white; background: #ff9800; font-weight: 700;","color: #ff9800; background: white; font-weight: 700;");class ft extends at{static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static getConfigElement(){return document.createElement("slick-simple-climate-card-editor")}static getStubConfig(){return{type:"custom:slick-simple-climate-card",entity:"",name:"Climate"}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(this.config={name:"Climate",...t},this.config.name&&"string"!=typeof this.config.name)throw new Error("name must be a string");if(this.config.sensors&&"object"!=typeof this.config.sensors)throw new Error("sensors must be an object")}_interpolateColor(t,e,i){const s=t=>{const e=t.replace("#","");return parseInt(e,16)},n=s(t)>>16&255,o=s(t)>>8&255,a=255&s(t),r=s(e)>>16&255,l=s(e)>>8&255,d=255&s(e);return`rgb(${Math.round(n+(r-n)*i)}, ${Math.round(o+(l-o)*i)}, ${Math.round(a+(d-a)*i)})`}_getGradient(t,e,i,s){const n=t.attributes.hvac_action||t.state,o="#607d8b",a="#455a64",r="#ff9800",l="#4caf50",d="#2196f3";if(isNaN(e))return`linear-gradient(180deg, ${o}, ${a})`;if("heating"===n){if(e<i){const t=i-e,s=t/3>=1?1:t/3;let n=0;s>.4&&(n=(s-.4)/.6);return`linear-gradient(180deg, ${this._interpolateColor(o,r,n)} 0%, ${90-70*s}%, ${this._interpolateColor(r,"#e65100",s)} 100%)`}return`linear-gradient(180deg, ${l}, 80%, ${r})`}if("cooling"===n){if(e>s){const t=e-s,i=t/3>=1?1:t/3,n=this._interpolateColor(d,"#0d47a1",i);let a=0;i>.4&&(a=(i-.4)/.6);return`linear-gradient(180deg, ${d} 0%, ${10+70*i}%, ${this._interpolateColor(o,n,a)} 100%)`}return`linear-gradient(180deg, ${d}, 20%, ${l})`}return"idle"===n?`linear-gradient(180deg, ${l} 0%, #81c784 100%)`:(t.state,`linear-gradient(180deg, ${o} 0%, ${a} 100%)`)}render(){var t,e,i;if(!this.config)return V``;if(!this.hass)return V`<ha-card style="padding:16px;">Loading...</ha-card>`;const s=this.config.entity;let n=this.hass.states[s];n||(n={entity_id:s,state:"unavailable",attributes:{friendly_name:this.config.name||s}});let o=n.attributes.current_temperature;if((null===(t=this.config.sensors)||void 0===t?void 0:t.temp)&&this.hass.states[this.config.sensors.temp]){const t=this.hass.states[this.config.sensors.temp];isNaN(parseFloat(t.state))||(o=parseFloat(t.state))}let a=n.attributes.target_temp_low,r=n.attributes.target_temp_high;const l=n.attributes.temperature;void 0===a&&void 0!==l&&(a=l),void 0===r&&void 0!==l&&(r=l),void 0===a&&(a=20),void 0===r&&(r=24),(null===(e=this.config.sensors)||void 0===e?void 0:e.target_low)&&this.hass.states[this.config.sensors.target_low]&&(a=parseFloat(this.hass.states[this.config.sensors.target_low].state)),(null===(i=this.config.sensors)||void 0===i?void 0:i.target_high)&&this.hass.states[this.config.sensors.target_high]&&(r=parseFloat(this.hass.states[this.config.sensors.target_high].state));const d=this._getGradient(n,o,a,r),c=this.config.name||n.attributes.friendly_name||"Climate",h=n.attributes.hvac_action?this.hass.localize(`state_attributes.climate.hvac_action.${n.attributes.hvac_action}`):this.hass.localize(`component.climate.state._.${n.state}`)||n.state;let p="mdi:thermostat";const g=n.attributes.hvac_action||n.state;return"heating"===g?p="mdi:fire":"cooling"===g?p="mdi:snowflake":"idle"===g?p="mdi:check-circle-outline":"off"===g&&(p="mdi:power-off"),V`
      <ha-card @click="${this._openMoreInfo}">
        <div class="bg-layer" style="background: ${d};"></div>
        
        <div class="container">
          <div class="header">
             <div class="temp-big">
                ${void 0!==o?V`${o}<span class="unit">°</span>`:"--"}
             </div>
             <div class="header-right">
                <ha-icon icon="${p}" class="main-icon"></ha-icon>
                <div class="state-label">${h}</div>
             </div>
          </div>

          <div class="spacer"></div>

          <div class="footer-row">
             <div class="footer-info">
               <div class="name">${c}</div>
             </div>
             <div class="targets">
                ${this._renderTargets(n,a,r)}
             </div>
          </div>
        </div>
      </ha-card>
    `}_renderTargets(t,e,i){var s;return"off"===t.state?V`<div class="target-chip">OFF</div>`:void 0!==e&&void 0!==i&&e!==i?V`
            <div class="target-group">
               <div class="target-label">Min</div>
               <div class="target-val">${e}°</div>
            </div>
            <div class="divider"></div>
            <div class="target-group">
               <div class="target-label">Max</div>
               <div class="target-val">${i}°</div>
            </div>
         `:V`
        <div class="target-group">
           <div class="target-label">Target</div>
           <div class="target-val">${null!==(s=null!=e?e:i)&&void 0!==s?s:"--"}°</div>
        </div>
     `}_openMoreInfo(){if(this.config.entity){const t=new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0});this.dispatchEvent(t)}}static get styles(){return o`
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
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between; /* Header at top, Targets at bottom */
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      
      .temp-big {
        font-size: 3.5rem;
        font-weight: 200;
        line-height: 1;
        text-shadow: 0 1px 4px rgba(0,0,0,0.3);
      }
      .temp-big .unit {
        font-size: 2rem;
        vertical-align: top;
        opacity: 0.8;
      }
      
      .header-right {
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .main-icon {
        --mdc-icon-size: 32px;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        margin-bottom: 4px;
      }
      .state-label {
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0.9;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      }

      .spacer {
        flex: 1;
      }

      .footer-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      
      .name {
        font-size: 1rem;
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        opacity: 0.9;
      }

      .targets {
        display: flex;
        align-items: center;
        background: rgba(0,0,0,0.2);
        border-radius: 20px;
        padding: 4px 12px;
        backdrop-filter: blur(4px);
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
    `}}customElements.get("slick-simple-climate-card")||(customElements.define("slick-simple-climate-card",ft),console.info("%c slick-simple-climate-card Registered","color: green; font-weight: bold;"));class mt extends at{static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config=t}_valueChanged(t){const e={...this._config,...t.detail.value},i=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){if(!this.hass||!this._config)return V``;return V`
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${[{name:"entity",label:"Entity",selector:{entity:{domain:"climate"}}},{name:"name",label:"Name",selector:{text:{}}}]}
          .computeLabel=${t=>t.label}
          @value-changed=${this._valueChanged}
        ></ha-form>
      `}}customElements.get("slick-simple-climate-card-editor")||customElements.define("slick-simple-climate-card-editor",mt),window.customCards=window.customCards||[],window.customCards.push({type:"slick-simple-climate-card",name:"Slick Simple Climate",preview:!0,description:"A clean climate card with dynamic gradients."});class bt extends at{constructor(){super(...arguments),this._cachedGradients=["",""],this._activeIndex=0,this._displayedGradient=null}static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static getConfigElement(){return document.createElement("slick-energy-flow-card-editor")}static getStubConfig(){return{type:"custom:slick-energy-flow-card",title:"Energiefluss",solar_entity:"",grid_import_entity:"",grid_export_entity:"",battery_entity:"",battery_soc_entity:"",home_entity:""}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={title:"Energiefluss",inverted_grid:!1,inverted_battery:!1,...t};if(e.inverted_grid&&"boolean"!=typeof e.inverted_grid)throw new Error("inverted_grid must be a boolean");if(e.inverted_battery&&"boolean"!=typeof e.inverted_battery)throw new Error("inverted_battery must be a boolean");this.config=e}_getState(t){if(!this.hass||!t||!this.hass.states[t])return 0;const e=parseFloat(this.hass.states[t].state);return isNaN(e)?0:e}_formatPower(t){const e=Math.abs(t);return e>=1e3?`${(e/1e3).toFixed(1)} kW`:`${Math.round(e)} W`}render(){if(!this.config)return V``;const t=this.hass,e=t?this._getState(this.config.solar_entity):0;let i=0;if(this.config.grid_entity)i=t?this._getState(this.config.grid_entity):0,this.config.inverted_grid&&(i=-i);else{i=this._getState(this.config.grid_import_entity)-this._getState(this.config.grid_export_entity)}let s=this._getState(this.config.battery_entity);const n=this._getState(this.config.battery_soc_entity),o=this.config.autarky_entity?this._getState(this.config.autarky_entity):null,a=this.config.self_consumption_entity?this._getState(this.config.self_consumption_entity):null;this.config.inverted_battery&&(s=-s);let r=0;r=this.config.home_entity?this._getState(this.config.home_entity):e+i+s,r=Math.abs(r);const l=i<-10,d=i>10,c=!!this.config.battery_entity&&""!==this.config.battery_entity||!!this.config.battery_soc_entity&&""!==this.config.battery_soc_entity,h=s<-10,p=s>10;let g,u;g=e<=50?"#102027":e<1e3?"#e65100":e<2500?"#f57c00":e<5e3?"#ffa000":"#ffc107",u=r>e?"#455a64":"#2e7d32";e>50&&i>=0&&i<=(h||n>=99?150:50)&&(u=e<1e3?"#f57c00":e<2500?"#ffa000":e<5e3?"#ffc107":"#ffe082");const f=`linear-gradient(180deg, ${g} 0%, ${u} 100%)`;if(f!==this._displayedGradient){const t=(this._activeIndex+1)%2;this._cachedGradients[t]=f,this._activeIndex=t,this._displayedGradient=f}const m=V`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,7L10,11H14L12,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,5L16,13H13V19L9,11H12V5Z"/></svg>`,b=V`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10.59,4.25L10,5.41L7.17,10.6C6.5,11.75 7.17,13.25 8.5,13.25H11V19L11.59,17.84L14.41,12.6C15.08,11.45 14.41,10 13.08,10H10.59V4.25Z"/></svg>`,y=V`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>`;let _="M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4Z";h?(_="M18.3,10.74L16.89,9.33L12,14.22V6H10V14.22L5.11,9.33L3.7,10.74L11,18.04L18.3,10.74M16.67,4H15V2H9V4H7.33C6.6,4 6,4.6 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z",_="M12.92 15.61L12.92 10.46L14.96 10.46L11.5 6L8.04 10.46L10.08 10.46L10.08 15.61L12.92 15.61M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4Z",_="M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4M12 18L8 14H11V9H13V14H16L12 18Z"):p&&(_="M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4M12 9L16 13H13V18H11V13H8L12 9Z");const v=V`<svg viewBox="0 0 24 24"><path fill="currentColor" d="${_}"/></svg>`;return V`
      <ha-card>
        <div class="bg-layer" style="background: ${this._cachedGradients[0]}; opacity: ${0===this._activeIndex?1:0}"></div>
        <div class="bg-layer" style="background: ${this._cachedGradients[1]}; opacity: ${1===this._activeIndex?1:0}"></div>
        <div class="content">
          <div class="header">
            <span class="title">${this.config.title}</span>
            <div class="badges">
                 ${null!==o?V`<span class="status-badge" title="Autarkie"><span class="badge-label">AUT</span> ${Math.round(o)}%</span>`:""}
                 ${null!==a?V`<span class="status-badge" title="Eigenverbrauch"><span class="badge-label">EIG</span> ${Math.round(a)}%</span>`:""}
                 <span class="status-badge">${l?"Export":d?"Import":"Balance"}</span>
            </div>
          </div>

          <div class="main-stats">
            <!-- SOLAR (Left) -->
            <div class="stat-block solar ${e>10?"active":""}">
              <div class="icon-circle solar-icon">${m}</div>
              <div class="stat-value">${this._formatPower(e)}</div>
              <div class="stat-label">Solar</div>
            </div>

            <!-- HOME (Center Big) -->
            <div class="stat-block home">
              <div class="icon-circle home-icon">${y}</div>
              <div class="stat-value big">${this._formatPower(r)}</div>
              <div class="stat-label">Haus</div>
            </div>

            <!-- GRID (Right) -->
            <div class="stat-block grid ${Math.abs(i)>10?"active":""}">
              <div class="icon-circle grid-icon">${b}</div>
              <div class="stat-value">${this._formatPower(Math.abs(i))}</div>
              <span class="stat-label">${i>0?"Bezug":"Einspeisung"}</span>
            </div>
          </div>

          <!-- BATTERY (Bottom) -->
          ${c?V`
            <div class="battery-section">
                <div class="batt-info">
                   <span class="batt-icon" style="color: ${n<20?"#ff3b30":"inherit"}">${v}</span>
                   <span class="batt-pct">${Math.round(n)}%</span>
                   <span class="batt-power">${Math.abs(s)>0?this._formatPower(s):"Standby"}</span>
                   <span class="batt-state">${h?"Laden":p?"Entladen":""}</span>
                </div>
                <div class="batt-bar-bg">
                    <div class="batt-bar-fill" style="width: ${n}%; background-color: ${n<20?"#ff3b30":"white"}"></div>
                </div>
            </div>
          `:""}

        </div>
      </ha-card>
    `}static get styles(){return o`
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
    `}}customElements.get("slick-energy-flow-card")||(customElements.define("slick-energy-flow-card",bt),console.info("%c slick-energy-flow-card Registered","color: green; font-weight: bold;"));class yt extends at{static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config=t}_valueChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,...t.detail.value}},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return V``;return V`<ha-form .hass=${this.hass} .data=${this._config} .schema=${[{name:"title",label:"Titel",selector:{text:{}}},{name:"solar_entity",label:"Solar Leistung",selector:{entity:{domain:"sensor"}}},{name:"grid_entity",label:"Netz Leistung",selector:{entity:{domain:"sensor"}}},{name:"battery_entity",label:"Batterie Leistung (Opt)",selector:{entity:{domain:"sensor"}}},{name:"battery_soc_entity",label:"Batterie Stand % (Opt)",selector:{entity:{domain:"sensor"}}},{name:"home_entity",label:"Haus Verbrauch (Opt)",selector:{entity:{domain:"sensor"}}},{name:"inverted_grid",label:"Invertiere Grid (+ ist Export)",selector:{boolean:{}}},{name:"inverted_battery",label:"Invertiere Batt (+ ist Laden)",selector:{boolean:{}}}]} .computeLabel=${t=>t.label} @value-changed=${this._valueChanged}></ha-form>`}}customElements.get("slick-energy-flow-card-editor")||customElements.define("slick-energy-flow-card-editor",yt),window.customCards=window.customCards||[],window.customCards.push({type:"slick-energy-flow-card",name:"Slick Energy Flow",preview:!0,description:"Modern energy flow visualization."});console.info("%c PERSON-CARD %c 0.1.0 ","color: white; background: #9c27b0; font-weight: 700;","color: #9c27b0; background: white; font-weight: 700;");class _t extends at{static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static getConfigElement(){return document.createElement("slick-person-card-editor")}static getStubConfig(t){let e=[];return t&&t.states&&(e=Object.keys(t.states).filter(t=>t.startsWith("person."))),{type:"custom:slick-person-card",people:e,size:100,layout:"wrap"}}constructor(){super(),console.info("DEBUG: PersonCard constructor called!")}getCardSize(){return this.config&&this.config.people?Math.ceil(this.config.people.length/4):1}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={size:100,layout:"wrap",...t};if(!e.entity||e.people&&0!==e.people.length||(e.people=[e.entity]),e.size&&"number"!=typeof e.size)throw new Error("size must be a number");if(e.layout&&!["wrap","horizontal"].includes(e.layout))throw new Error("layout must be wrap or horizontal");this.config=e}_formatDuration(t){const e=new Date(t).getTime(),i=Date.now(),s=Math.floor((i-e)/1e3);if(s<60)return`${s}s`;const n=Math.floor(s/60);if(n<60)return`${n}m`;const o=Math.floor(n/60);if(o<24)return`${o}h`;return`${Math.floor(o/24)}d`}render(){if(!this.config)return V``;if(!this.hass)return V`<ha-card style="padding: 10px;">Loading persons...</ha-card>`;const t=this.config.size||100,e="horizontal"===this.config.layout,i=t>=50,s=this.config.people||[],n=`\n      width: ${t}px;\n      height: ${t}px;\n      font-size: ${t/100}em;\n    `;return V`
      <div class="person-container ${e?"horizontal":""}">
        ${s.map(t=>{const e=this.hass.states[t];if(!e)return V`
            <div class="person-card away" style="${n}; display: flex; align-items: center; justify-content: center; background-color: #555;">
               <span style="font-size: 0.5em; text-align: center; color: white;">?</span>
            </div>
          `;const s="home"===e.state,o=e.attributes.entity_picture,a=e.state,r=this._formatDuration(e.last_changed);return V`
            <div class="person-card ${s?"home":"away"}" 
                 style="background-image: url('${o}'); ${n}">
              ${i?V`
              <div class="info">
                <span class="location">${a}</span>
                <span class="duration">${r}</span>
              </div>`:V``}
            </div>
          `})}
      </div>
    `}}_t.styles=o`
    :host {
      display: inline-flex;
      vertical-align: top;
    }
    .person-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: flex-start;
    }
    .person-container.horizontal {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 4px; /* Space for scrollbar if visible */
      scrollbar-width: none; /* Hide scrollbar Firefox */
    }
    .person-container.horizontal::-webkit-scrollbar { 
      display: none; /* Hide scrollbar Chrome/Safari/Webkit */
    }
    
    .person-card {
      position: relative;
      /* width & height set by inline style */
      flex-shrink: 0;
      border-radius: var(--ha-card-border-radius, 12px);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--secondary-background-color);
      overflow: hidden;
      box-shadow: var(--ha-card-box-shadow, none);
      transition: filter 0.3s ease;
    }
    .person-card.away {
      filter: grayscale(100%);
    }
    .person-card.home {
      filter: grayscale(0%);
    }
    
    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 4px;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.4);
      color: white;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(2px);
    }

    .location {
      font-size: 0.8em;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      text-transform: capitalize;
    }

    .duration {
      font-size: 0.7em;
      opacity: 0.9;
    }
  `,console.info("DEBUG: Loading PersonCard module.");const vt=window.customElements,wt=vt.get("slick-person-card");try{wt?console.info("slick-person-card already registered."):(vt.define("slick-person-card",_t),console.info("%c slick-person-card Registered Successfully","color: green; font-weight: bold;"))}catch(S){console.error("CRITICAL FAILURE: Failed to register slick-person-card",S)}window.SlickPersonCard=_t;class xt extends at{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){const e={...t};!e.entity||e.people&&0!==e.people.length||(e.people=[e.entity]),this._config=e}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.detail.value;this._config=e;const i=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){if(!this.hass||!this._config)return V``;return V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"people",label:"People",selector:{entity:{domain:["person","device_tracker"],multiple:!0}}},{name:"size",label:"Card Size (px)",selector:{number:{min:50,max:200,mode:"slider"}}},{name:"layout",label:"Layout",selector:{select:{mode:"dropdown",options:[{value:"wrap",label:"Wrap (Grid)"},{value:"horizontal",label:"Horizontal Scroll (Chips)"}]}}}]}
        .computeLabel=${t=>t.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}}customElements.get("slick-person-card-editor")||customElements.define("slick-person-card-editor",xt),window.customCards=window.customCards||[],window.customCards.push({type:"slick-person-card",name:"Slick Person",preview:!0,description:"A squircle person card with status overlay."}),console.info("%c Lovelace Slick Screen Cards Loaded (v0.1.1) ","color: white; background: #607d8b; font-weight: bold;");
//# sourceMappingURL=slick-screen-cards.js.map
