/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * Wind Compass Card
 * @version 0.1.0
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
console.info('%c WindCompassCard Loaded: TS_APPLE_FINAL ', 'color: white; background: #000000; font-weight: bold;');
class WindCompassCard extends HTMLElement {
    constructor() {
        super();
        // Configuration State
        this._bucketSize = 5;
        this._bucketCount = 72;
        this._warnMultiplier = 0.9;
        // Data State
        this._historyData = [];
        this._lastHistoryFetch = 0;
        // Sensor Values
        this._avgDeg = 0; // Standard 0 um Fehler zu vermeiden
        this._instDeg = 0; // Standard 0
        this._currentUnit = '';
        this._maxSpeed = 30;
        this._currentGust = 0;
        // Limits
        this._limitRaffstore = 0;
        this._limitRollo = 0;
        this.attachShadow({ mode: 'open' });
    }
    static getConfigElement() {
        return document.createElement('slick-wind-compass-editor');
    }
    static getStubConfig() {
        return {
            type: 'custom:slick-wind-compass-card',
            direction_entity: '',
            speed_entity: '',
            max_speed: 60
        };
    }
    set hass(hass) {
        this._hass = hass;
        this._updateCard();
    }
    setConfig(config) {
        if (!config)
            throw new Error("Invalid configuration");
        const newConfig = {
            bucket_size: 5,
            warn_multiplier: 0.9,
            max_speed: 30,
            simple_mode: false,
            ...config
        };
        if (newConfig.bucket_size && typeof newConfig.bucket_size !== 'number')
            throw new Error("bucket_size must be a number");
        if (newConfig.max_speed && typeof newConfig.max_speed !== 'number')
            throw new Error("max_speed must be a number");
        this.config = newConfig;
        if (this.config.simple_mode) {
            this.classList.add('simple-mode');
        }
        else {
            this.classList.remove('simple-mode');
        }
        this._recalcBuckets();
    }
    _recalcBuckets() {
        let reqBucketSize = this.config.bucket_size !== undefined ? Number(this.config.bucket_size) : 5;
        if (isNaN(reqBucketSize) || reqBucketSize < 1)
            reqBucketSize = 5;
        if (reqBucketSize > 90)
            reqBucketSize = 90;
        while (360 % reqBucketSize !== 0) {
            reqBucketSize++;
        }
        if (this._bucketSize !== reqBucketSize) {
            this._bucketSize = reqBucketSize;
            this._bucketCount = Math.floor(360 / this._bucketSize);
            this._historyData = new Array(this._bucketCount).fill(null).map(() => ({ duration: 0, totalSpeed: 0 }));
            this._lastHistoryFetch = 0;
        }
    }
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        // Ensure render is called if content is missing
        if (this.shadowRoot && (!this.shadowRoot.innerHTML || this.shadowRoot.innerHTML.trim() === '')) {
            this._render();
        }
        if (this.shadowRoot) {
            this.content = this.shadowRoot.querySelector('.container');
            if (this.content) {
                this._resizeObserver = new ResizeObserver(() => {
                    this._updateDimensions();
                    this._updateVisuals();
                });
                this._resizeObserver.observe(this.content);
            }
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this._resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    _render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-weight: 200;
          background: var(--ha-card-background, var(--card-background-color, white));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
          overflow: hidden;
          box-sizing: border-box;
          position: relative;
          isolation: isolate;
        }
        
        ha-card {
          display: none;
        }

        .container {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* --- COMPASS AREA --- */
        .compass-container {
          position: relative;
          width: 100%;
          height: 90px;
          background: transparent;
          border-radius: 12px;
          
          /* Apple Fade-Out Effect Left/Right */
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          
          touch-action: pan-y;
          isolation: isolate; 
          z-index: 0;
        }

        .compass-tape {
          position: absolute;
          top: 0;
          left: 50%; /* Zentriert */
          height: 100%;
          display: flex;
          align-items: center;
          /* Smooth Animation für das Band */
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          will-change: transform;
          z-index: 1;
        }

        /* Historien-Balken */
        .hist-bar {
          position: absolute;
          bottom: 0;
          border-radius: 4px;
          pointer-events: none;
          transform: none; 
          border: none;
          box-sizing: border-box; 
          background: none; 
          transition: height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          overflow: hidden;
          opacity: 0.9;
        }

        .hist-fill {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        .compass-tick {
          position: absolute;
          top: 42px; /* Adjusted to sit below labels */
          width: 1px;
          border-radius: 0.5px;
          background: var(--primary-text-color);
          opacity: 0.2;
          z-index: 2;
        }

        .compass-label {
          position: absolute;
          top: 12px;
          transform: translateX(-50%);
          color: var(--primary-text-color);
          font-weight: 300;
          font-size: 18px;
          letter-spacing: 0.5px;
          z-index: 3;
          line-height: 1;
        }

        /* FLOATING MARKER (Modern Arrow) */
        .compass-marker {
          position: absolute;
          left: 50%; 
          top: 0px; 
          width: 2px;
          height: 12px;
          background: var(--error-color, #ff3b30);
          border-radius: 1px;
          
          transform: translateX(-50%); 
          z-index: 20; 
          filter: drop-shadow(0 0 4px rgba(255, 59, 48, 0.4));
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          will-change: transform;
        }
        
        /* Arrowhead */
        .compass-marker::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0; 
          height: 0; 
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid var(--error-color, #ff3b30);
        }

        /* CENTER DOT - Zeigt Durchschnitt (Mitte des Fensters) */
        .compass-center-dot {
           position: absolute;
           left: 50%;
           bottom: 0;
           width: 2px; 
           height: 12px; 
           background: var(--primary-text-color);
           border-radius: 2px;
           transform: translateX(-50%);
           opacity: 0.3;
           z-index: 4;
        }

        /* --- SPEED BAR AREA --- */
        .speed-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .speed-bar-bg {
          position: relative;
          width: 100%;
          height: 12px;
          background: var(--secondary-background-color, rgba(0,0,0,0.05));
          border-radius: 6px;
          overflow: visible; 
          isolation: isolate;
        }

        .speed-bar-gust {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          background: var(--accent-color, var(--primary-color, #2196F3));
          opacity: 0.2;
          width: 0%;
          transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          z-index: 1;
          border-radius: 6px;
        }

        .speed-bar-fill {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          background: var(--accent-color, var(--primary-color, #2196F3));
          width: 0%;
          transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          box-shadow: 0 0 10px var(--accent-color, transparent); 
          z-index: 2;
          border-radius: 6px;
        }

        .limit-marker {
          position: absolute;
          top: -2px; 
          bottom: -2px; 
          width: 2px;
          background-color: var(--primary-text-color);
          z-index: 10;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          border-radius: 1px;
          display: none; 
          pointer-events: none;
          opacity: 0.8;
        }

        .speed-text {
          display: flex;
          justify-content: flex-end;
          align-items: baseline;
          gap: 4px;
          color: var(--primary-text-color);
          text-shadow: var(--text-shadow, none);
        }

        .speed-text .value {
          font-size: 3.5rem;
          font-weight: 200;
          letter-spacing: -1px;
          line-height: 1;
        }

        .speed-text .unit {
          font-size: 1.25rem;
          color: var(--secondary-text-color);
          font-weight: 300;
        }

        .speed-text .gust-info {
          margin-left: 8px;
          font-size: 13px;
          color: var(--secondary-text-color);
          opacity: 0.8;
        }

        /* --- SIMPLE MODE --- */
        :host(.simple-mode) {
          /* Restore card background and shadow to match other cards */
          overflow: hidden; 
        }

        :host(.simple-mode) .container {
           padding: 0;
           height: 120px; /* Increased to separate text and compass */
           position: relative;
        }

        :host(.simple-mode) .compass-container {
           height: 60px; /* Thinner */
           margin-top: 60px; /* Pushed down to clear speed text */
           -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
           mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        :host(.simple-mode) .compass-tick {
           top: 42px; /* Pushed down */
        }
        
        :host(.simple-mode) .compass-label {
           top: 20px; /* Pushed down to clear marker */
           font-size: 16px;
        }

        :host(.simple-mode) .compass-marker {
           top: 0px; /* At the top edge of compass container */
        }

        :host(.simple-mode) .speed-container {
           position: absolute;
           top: 16px;
           left: 16px;
           width: auto;
           height: auto;
           display: block;
           z-index: 10;
        }
        
        :host(.simple-mode) .speed-bar-bg {
           display: none;
        }

        :host(.simple-mode) .speed-text {
           display: flex;
           flex-direction: row;
           align-items: baseline;
           justify-content: flex-start;
           color: var(--primary-text-color);
           text-shadow: 0 1px 4px rgba(0,0,0,0.5); /* Always shadow for readability over possible map/picture */
        }

        :host(.simple-mode) .speed-text .value {
           font-size: 2.5rem; /* Smaller than full mode */
        }
        
        :host(.simple-mode) .speed-text .gust-info {
           margin-left: 6px;
           font-size: 14px;
           opacity: 0.9;
        }

        /* ALERT MODE (Red Background) */
        :host(.simple-mode.alert-state) {
           background: linear-gradient(135deg, rgba(255,59,48,0.8), rgba(200,30,30,0.9)) !important;
           border-radius: var(--ha-card-border-radius, 12px);
           box-shadow: 0 4px 20px rgba(255, 59, 48, 0.4);
        }
        
        :host(.simple-mode.alert-state) .speed-text,
        :host(.simple-mode.alert-state) .compass-label {
           color: white !important;
        }
        
        :host(.simple-mode.alert-state) .compass-tick {
           background: white !important;
           opacity: 0.4;
        }
      </style>

      <div class="container">
        <div class="compass-container" id="container">
          <div class="compass-center-dot"></div>
          <div class="compass-marker" id="marker"></div>
          <div class="compass-tape" id="tape"></div>
        </div>

        <div class="speed-container">
          <div class="speed-bar-bg">
            <div class="speed-bar-gust" id="gust-bar"></div>
            <div class="speed-bar-fill" id="speed-bar"></div>
            <div class="limit-marker" id="limit-raffstore" title="Raffstore Limit"></div>
            <div class="limit-marker" id="limit-rollo" title="Rollo Limit"></div>
          </div>
          <div class="speed-text" id="speed-text">--</div>
        </div>
      </div>
    `;
    }
    _updateCard() {
        if (!this.config)
            return;
        // Entities
        const dirEntity = this.config.direction_entity; // AVG (Tape)
        // Fallback: Wenn keine Instant-Entity da ist, nimm auch Avg (Marker bleibt dann mittig)
        const instantDirEntity = this.config.instant_direction_entity || dirEntity;
        const speedEntity = this.config.speed_entity;
        const entityGust = this.config.gust_entity;
        const entityLimitRaff = this.config.raffstore_limit_entity;
        const entityLimitRollo = this.config.rollo_limit_entity;
        // Config
        this._maxSpeed = this.config.max_speed || 30;
        this._warnMultiplier = this.config.warn_multiplier !== undefined ? Number(this.config.warn_multiplier) : 0.9;
        this._recalcBuckets();
        // Use dummy values if hass is not ready yet
        const hass = this._hass;
        // States
        const dirState = hass === null || hass === void 0 ? void 0 : hass.states[dirEntity];
        const instDirState = hass === null || hass === void 0 ? void 0 : hass.states[instantDirEntity];
        const speedState = hass === null || hass === void 0 ? void 0 : hass.states[speedEntity];
        const gustState = entityGust && hass ? hass.states[entityGust] : null;
        // 1. DURCHSCHNITT (Bewegt das Band)
        if (dirState && !isNaN(parseFloat(dirState.state))) {
            this._avgDeg = parseFloat(dirState.state);
        }
        // 2. IST-WERT (Bewegt den Marker)
        if (instDirState && !isNaN(parseFloat(instDirState.state))) {
            this._instDeg = parseFloat(instDirState.state);
        }
        else {
            this._instDeg = this._avgDeg; // Fallback
        }
        // Speed Data
        if (speedState && !isNaN(parseFloat(speedState.state))) {
            this._currentSpeed = parseFloat(speedState.state);
            this._currentUnit = speedState.attributes.unit_of_measurement || 'km/h';
        }
        else {
            this._currentSpeed = 0;
            this._currentUnit = 'km/h';
        }
        if (gustState && !isNaN(parseFloat(gustState.state))) {
            this._currentGust = parseFloat(gustState.state);
        }
        else {
            this._currentGust = 0;
        }
        // Limits
        this._limitRaffstore = 0;
        this._limitRollo = 0;
        if (hass && entityLimitRaff && hass.states[entityLimitRaff]) {
            this._limitRaffstore = parseFloat(hass.states[entityLimitRaff].state) || 0;
        }
        if (hass && entityLimitRollo && hass.states[entityLimitRollo]) {
            this._limitRollo = parseFloat(hass.states[entityLimitRollo].state) || 0;
        }
        // History alle 5 min
        const now = Date.now();
        if (now - this._lastHistoryFetch > 300000 && hass) {
            this._lastHistoryFetch = now;
            this._fetchHistory(dirEntity, speedEntity);
        }
        this._updateVisuals();
    }
    async _fetchHistory(dirEntity, speedEntity) {
        if (!this._hass)
            return;
        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);
        try {
            const entities = [dirEntity, speedEntity].join(',');
            const history = await this._hass.callApi('GET', `history/period/${startTime.toISOString()}?filter_entity_id=${entities}&end_time=${endTime.toISOString()}&minimal_response`);
            if (history && history.length === 2) {
                const dirHist = history.find((arr) => arr.length > 0 && arr[0].entity_id === dirEntity);
                const speedHist = history.find((arr) => arr.length > 0 && arr[0].entity_id === speedEntity);
                if (dirHist && speedHist) {
                    this._processHistoryData(dirHist, speedHist);
                }
            }
        }
        catch (e) {
            console.error('WindCompass: History fetch failed', e);
        }
    }
    _processHistoryData(dirData, speedData) {
        const buckets = new Array(this._bucketCount)
            .fill(null)
            .map(() => ({ duration: 0, totalSpeed: 0 }));
        let speedIdx = 0;
        for (let i = 0; i < dirData.length - 1; i++) {
            const deg = parseFloat(dirData[i].state);
            if (isNaN(deg))
                continue;
            const startTs = new Date(dirData[i].last_changed).getTime();
            const endTs = new Date(dirData[i + 1].last_changed).getTime();
            const durationMin = (endTs - startTs) / 1000 / 60;
            while (speedIdx < speedData.length - 1 &&
                new Date(speedData[speedIdx + 1].last_changed).getTime() <= startTs) {
                speedIdx++;
            }
            const speedVal = parseFloat(speedData[speedIdx].state) || 0;
            const bucketIndex = Math.floor(((deg % 360) / 360) * this._bucketCount);
            if (bucketIndex >= 0 && bucketIndex < this._bucketCount) {
                buckets[bucketIndex].duration += durationMin;
                buckets[bucketIndex].totalSpeed += speedVal * durationMin;
            }
        }
        this._historyData = buckets;
        this._updateDimensions();
        this._updateVisuals();
    }
    _updateDimensions() {
        if (!this.shadowRoot)
            return;
        const container = this.shadowRoot.querySelector('#container');
        if (!container)
            return;
        const width = container.offsetWidth;
        if (width === 0)
            return;
        this._pxPerDeg = width / 360;
        this._buildTape();
    }
    _buildTape() {
        if (!this.shadowRoot || !this._pxPerDeg)
            return;
        const tape = this.shadowRoot.querySelector('#tape');
        if (!tape)
            return;
        tape.innerHTML = '';
        // Referenzwerte (Max Speed / Max Dauer)
        let maxDur = 0;
        let maxBucketAvgSpeed = 0;
        this._historyData.forEach(b => {
            if (b.duration > 0) {
                if (b.duration > maxDur)
                    maxDur = b.duration;
                const avg = b.totalSpeed / b.duration;
                if (avg > maxBucketAvgSpeed)
                    maxBucketAvgSpeed = avg;
            }
        });
        if (maxDur === 0)
            maxDur = 1;
        if (maxBucketAvgSpeed === 0)
            maxBucketAvgSpeed = 1;
        // Warn-Schwelle (Rot)
        const limits = [this._limitRaffstore, this._limitRollo].filter(l => l > 0);
        const minLimit = limits.length > 0 ? Math.min(...limits) : null;
        const alertThreshold = minLimit ? (minLimit * this._warnMultiplier) : null;
        const slotWidth = this._bucketSize * this._pxPerDeg;
        const barWidth = Math.max(1, slotWidth - 2);
        const offset = 1;
        for (let i = -180; i <= 540; i += this._bucketSize) {
            const pxPos = i * this._pxPerDeg;
            const normalizedDeg = ((i % 360) + 360) % 360;
            const bucketIndex = Math.floor(normalizedDeg / this._bucketSize);
            // --- HISTOGRAMM ---
            if (bucketIndex >= 0 && bucketIndex < this._bucketCount) {
                const data = this._historyData[bucketIndex];
                if (data && data.duration > 0) {
                    const avgSpeed = data.totalSpeed / data.duration;
                    // Kritisch?
                    const isCritical = alertThreshold !== null && avgSpeed >= alertThreshold;
                    const colorNormal = 'var(--accent-color, var(--primary-color))';
                    const colorCritical = 'var(--error-color, #ff3b30)';
                    const usedColor = isCritical ? colorCritical : colorNormal;
                    const bar = document.createElement('div');
                    bar.className = 'hist-bar';
                    // Höhe = Geschwindigkeit (Intensität)
                    const heightPct = (avgSpeed / maxBucketAvgSpeed) * 100;
                    bar.style.height = `${heightPct * 0.6}%`;
                    bar.style.left = `${pxPos + offset}px`;
                    bar.style.width = `${barWidth}px`;
                    // Removed borderTopColor - handled by background now
                    const fill = document.createElement('div');
                    fill.className = 'hist-fill';
                    // Flat design: Solid color instead of gradient
                    fill.style.background = usedColor;
                    if (isCritical) {
                        fill.style.opacity = '1.0';
                    }
                    else {
                        // Opacity = Duration (Frequency)
                        // We keep the opacity logic to visualize frequency weight, 
                        // but the bar itself is a flat color block now.
                        const freqRatio = data.duration / maxDur;
                        fill.style.opacity = (0.4 + (freqRatio * 0.6)).toString();
                    }
                    bar.appendChild(fill);
                    tape.appendChild(bar);
                }
            }
            // --- TICKS & LABELS ---
            let drawTick = false;
            const tick = document.createElement('div');
            tick.className = 'compass-tick';
            tick.style.left = `${pxPos}px`;
            if (normalizedDeg % 90 === 0) {
                // Major: Label Only
                const label = document.createElement('div');
                label.className = 'compass-label';
                const directions = { 0: 'N', 90: 'O', 180: 'S', 270: 'W' };
                label.textContent = directions[normalizedDeg] || '';
                label.style.left = `${pxPos}px`;
                tape.appendChild(label);
                // No tick for major directions in minimalistic mode
                drawTick = false;
            }
            else if (normalizedDeg % 45 === 0) {
                // Middle: Medium Tick
                tick.style.height = '10px';
                tick.style.opacity = '0.4';
                drawTick = true;
            }
            else if (normalizedDeg % 15 === 0) {
                // Minor: Small Tick
                tick.style.height = '6px';
                tick.style.opacity = '0.2';
                drawTick = true;
            }
            if (drawTick)
                tape.appendChild(tick);
        }
    }
    _interpolateColor(c1, c2, factor) {
        const hex = (c) => {
            const h = c.replace('#', '');
            return parseInt(h.length === 3 ? h.split('').map(x => x + x).join('') : h, 16);
        };
        const r1 = (hex(c1) >> 16) & 255;
        const g1 = (hex(c1) >> 8) & 255;
        const b1 = (hex(c1)) & 255;
        const r2 = (hex(c2) >> 16) & 255;
        const g2 = (hex(c2) >> 8) & 255;
        const b2 = (hex(c2)) & 255;
        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }
    _updateVisuals() {
        var _a, _b;
        if (!this.shadowRoot || this._avgDeg === undefined || !this._pxPerDeg)
            return;
        if (!this.config)
            return;
        // 1. BAND POSITION (Basis: Durchschnitt)
        const tape = this.shadowRoot.querySelector('#tape');
        if (tape) {
            tape.style.transform = `translateX(-${this._avgDeg * this._pxPerDeg}px)`;
        }
        // 2. MARKER POSITION (Basis: Ist-Wert relativ zum Durchschnitt)
        // Wenn instDeg vorhanden, berechne Differenz. Sonst bleibt Marker in der Mitte (diff=0).
        const marker = this.shadowRoot.querySelector('#marker');
        if (marker && this._instDeg !== undefined) {
            const diff = ((this._instDeg - this._avgDeg + 540) % 360) - 180;
            marker.style.transform = `translateX(calc(-50% + ${diff * this._pxPerDeg}px))`;
        }
        // 3. SPEED BARS
        const speedBar = this.shadowRoot.querySelector('#speed-bar');
        const gustBar = this.shadowRoot.querySelector('#gust-bar');
        const speedText = this.shadowRoot.querySelector('#speed-text');
        const limitRaff = this.shadowRoot.querySelector('#limit-raffstore');
        const limitRollo = this.shadowRoot.querySelector('#limit-rollo');
        if (this._currentSpeed !== undefined) {
            // --- LOGIG FOR SIMPLE MODE ---
            if (this.config.simple_mode) {
                const limits = [this._limitRaffstore, this._limitRollo].filter(l => l > 0);
                const minLimit = limits.length > 0 ? Math.min(...limits) : null;
                if (minLimit && this._currentSpeed >= minLimit) {
                    this.classList.add('alert-state');
                }
                else {
                    this.classList.remove('alert-state');
                }
                // Allow standard logic to run for gradient background
                // Special text for simple mode
                if (speedText) {
                    let html = `
                <span class="value">${Math.round(this._currentSpeed || 0)}</span>
                <span class="unit">${this._currentUnit}</span>
             `;
                    if (this._currentGust > 0) {
                        html += `<span class="gust-info">(${Math.round(this._currentGust)})</span>`;
                    }
                    speedText.innerHTML = html;
                }
                // Fall through to standard visual update (skipping bar updates which are hidden anyway)
            }
            // --- STANDARD MODE & SHARED GRADIENT ---
            let pct = (this._currentSpeed / this._maxSpeed) * 100;
            if (pct > 100)
                pct = 100;
            if (!this.config.simple_mode && speedBar) {
                speedBar.style.width = `${pct}%`;
            }
            // Check for Dark Mode Preference from HA Theme
            const isDarkMode = ((_b = (_a = this._hass) === null || _a === void 0 ? void 0 : _a.themes) === null || _b === void 0 ? void 0 : _b.darkMode) === true;
            // Dynamic Background Gradient
            // Low: Bright Creme-Grey (#ffffff -> #e0e0e0)
            // High: Dark Grey-Blue (#546e7a -> #263238)
            const intensity = pct / 100;
            // Define Gradient Colors (Lighter at bottom for modern "uplight" look)
            let cStartLow, cEndLow;
            if (isDarkMode) {
                // Dark Mode
                cStartLow = '#1c1c1e'; // Dark top
                cEndLow = '#3a3a3c'; // Lighter bottom
            }
            else {
                // Light Mode
                cStartLow = '#e0e0e0'; // Grey top
                cEndLow = '#ffffff'; // White bottom
            }
            // High Wind Colors (Blue-Grey)
            const cStartHigh = '#37474f'; // Darker Blue-Grey top
            const cEndHigh = '#607d8b'; // Lighter Blue-Grey bottom
            const startColor = this._interpolateColor(cStartLow, cStartHigh, intensity);
            const endColor = this._interpolateColor(cEndLow, cEndHigh, intensity);
            // Update host background
            this.style.background = `linear-gradient(180deg, ${startColor} 0%, ${endColor} 100%)`;
            // Adjust text and UI colors for contrast
            // In Dark Mode, we almost always want white text unless intensity pushes us to something very bright (unlikely here)
            if (isDarkMode || intensity > 0.5) {
                // Dark Background -> Light Elements
                this.style.color = 'white';
                this.style.setProperty('--primary-text-color', 'white');
                this.style.setProperty('--secondary-text-color', 'rgba(255,255,255,0.7)');
                this.style.setProperty('--secondary-background-color', 'rgba(255,255,255,0.15)');
                this.style.setProperty('--ha-card-box-shadow', 'none');
                this.style.setProperty('--text-shadow', '0 1px 4px rgba(0,0,0,0.5)');
            }
            else {
                // Light Mode + Low Intensity -> Dark Elements
                this.style.color = '#212121';
                this.style.setProperty('--primary-text-color', '#212121');
                this.style.setProperty('--secondary-text-color', '#757575');
                this.style.setProperty('--secondary-background-color', 'rgba(0,0,0,0.1)');
                this.style.removeProperty('--text-shadow');
            }
            // If alert state is active (Red), it overrides this anyway via !important in CSS
            let pctGust = (this._currentGust / this._maxSpeed) * 100;
            if (pctGust > 100)
                pctGust = 100;
            if (gustBar)
                gustBar.style.width = `${pctGust}%`;
            // Only update text here if not simple mode (because simple mode has different format)
            if (!this.config.simple_mode && speedText) {
                let html = `
                <span class="value">${Math.round(this._currentSpeed || 0)}</span>
                <span class="unit">${this._currentUnit}</span>
            `;
                if (this._currentGust > 0) {
                    html += `<span class="gust-info">(Max ${Math.round(this._currentGust)})</span>`;
                }
                speedText.innerHTML = html;
            }
            if (limitRaff) {
                if (this._limitRaffstore > 0) {
                    let p = (this._limitRaffstore / this._maxSpeed) * 100;
                    if (p > 100)
                        p = 100;
                    limitRaff.style.left = `${p}%`;
                    limitRaff.style.display = 'block';
                }
                else {
                    limitRaff.style.display = 'none';
                }
            }
            if (limitRollo) {
                if (this._limitRollo > 0) {
                    let p = (this._limitRollo / this._maxSpeed) * 100;
                    if (p > 100)
                        p = 100;
                    limitRollo.style.left = `${p}%`;
                    limitRollo.style.display = 'block';
                }
                else {
                    limitRollo.style.display = 'none';
                }
            }
        }
    }
    getCardSize() {
        return 3;
    }
}
try {
    if (!customElements.get('slick-wind-compass-card')) {
        customElements.define('slick-wind-compass-card', WindCompassCard);
        console.info("%c slick-wind-compass-card Registered", "color: green; font-weight: bold;");
    }
}
catch (e) {
    console.error("Failed to register slick-wind-compass-card", e);
}
class WindCompassEditor extends i {
    static get properties() {
        return {
            hass: {},
            _config: {},
        };
    }
    setConfig(config) {
        this._config = config;
    }
    _valueChanged(ev) {
        if (!this._config || !this.hass)
            return;
        const newConfig = {
            ...this._config,
            ...ev.detail.value,
        };
        // Fire event to update card preview
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
    render() {
        if (!this.hass || !this._config)
            return b ``;
        // Schema for Home Assistant Form
        const schema = [
            { name: "direction_entity", label: "Direction Entity", selector: { entity: { domain: "sensor" } } },
            { name: "speed_entity", label: "Speed Entity", selector: { entity: { domain: "sensor" } } },
            { name: "gust_entity", label: "Gust Entity (Optional)", selector: { entity: { domain: "sensor" } } },
            { name: "instant_direction_entity", label: "Instant Dir (opt)", selector: { entity: { domain: "sensor" } } },
            { name: "max_speed", label: "Max Speed", selector: { number: { mode: "box", min: 0 } } },
            { name: "simple_mode", label: "Simple Mode", selector: { boolean: {} } },
            { name: "raffstore_limit_entity", label: "Raffstore Limit (opt)", selector: { entity: { domain: "sensor" } } },
            { name: "rollo_limit_entity", label: "Rollo Limit (opt)", selector: { entity: { domain: "sensor" } } }
        ];
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${(s) => s.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
}
if (!customElements.get('slick-wind-compass-editor')) {
    customElements.define('slick-wind-compass-editor', WindCompassEditor);
}
// Register as custom card
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'slick-wind-compass-card',
    name: 'Slick Wind Compass',
    preview: true,
    description: 'Apple-style wind direction compass with speed indicator'
});

/**
 * Mini Weather Card
 * @version 0.1.0
 */
const CARD_VERSION$2 = "0.1.0";
console.info(`%c MINI-WEATHER-CARD %c ${CARD_VERSION$2} `, 'color: white; background: #2980b9; font-weight: 700;', 'color: #2980b9; background: white; font-weight: 700;');
// ----------------------------------------------------------------------
// CATMULL-ROM SPLINE LOGIK
// ----------------------------------------------------------------------
function catmullRom2bezier(x, k) {
    const n = x.length - 1;
    if (n < 1)
        return [];
    const result = [];
    const x1 = x[0], y1 = x[1];
    result.push([x1, y1]);
    for (let i = 0; i < n - 1; i++) {
        const p0 = i === 0 ? [x[0], x[1]] : [x[(i - 1) * 2], x[(i - 1) * 2 + 1]];
        const p1 = [x[i * 2], x[i * 2 + 1]];
        const p2 = [x[(i + 1) * 2], x[(i + 1) * 2 + 1]];
        const p3 = i + 2 > n ? p2 : [x[(i + 2) * 2], x[(i + 2) * 2 + 1]];
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6 * k;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6 * k;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6 * k;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6 * k;
        result.push([cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]]);
    }
    return result;
}
function generateSmoothPath(points) {
    if (points.length < 2)
        return "";
    const flatPoints = points.reduce((acc, p) => [...acc, p[0], p[1]], []);
    const curves = catmullRom2bezier(flatPoints, 1);
    if (curves.length === 0)
        return "";
    let d = `M ${curves[0][0]},${curves[0][1]} `;
    for (let i = 1; i < curves.length; i++) {
        const c = curves[i];
        d += `C ${c[0]},${c[1]} ${c[2]},${c[3]} ${c[4]},${c[5]} `;
    }
    return d;
}
function getTimeOfDayFromSun(elevation, rising) {
    // Nacht: Sonne tief unter Horizont
    if (elevation < -18)
        return 'night';
    // Dämmerungsphasen
    if (elevation >= -18 && elevation < -6) {
        return rising ? 'early-dawn' : 'late-dusk';
    }
    if (elevation >= -6 && elevation < 0) {
        return rising ? 'late-dawn' : 'early-dusk';
    }
    // Tag: Sonne über Horizont
    if (elevation >= 0 && elevation < 15) {
        return rising ? 'morning' : 'late-afternoon';
    }
    if (elevation >= 15 && elevation < 35) {
        return rising ? 'morning' : 'early-afternoon';
    }
    if (elevation >= 35) {
        return 'noon';
    }
    return 'noon';
}
function isBadWeather(condition) {
    const badConditions = ['rainy', 'pouring', 'lightning', 'snowy', 'hail', 'fog'];
    return badConditions.includes(condition);
}
function getGradients(timeOfDay, isBad) {
    const gradients = {
        // SCHÖNWETTER
        'night-good': {
            bright: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            dark: 'linear-gradient(180deg, #000000 0%, #0a1929 50%, #1a2f42 100%)'
        },
        'early-dawn-good': {
            bright: 'linear-gradient(180deg, #2c3e50 0%, #3a5169 50%, #526c87 100%)',
            dark: 'linear-gradient(180deg, #1a1f2e 0%, #2b3a4d 50%, #3d5167 100%)'
        },
        'late-dawn-good': {
            bright: 'linear-gradient(180deg, #f3904f 0%, #f7b267 50%, #ffd89b 100%)',
            dark: 'linear-gradient(180deg, #d76d47 0%, #e89a5f 50%, #f5c98c 100%)'
        },
        'morning-good': {
            bright: 'linear-gradient(180deg, #56ccf2 0%, #87ceeb 50%, #a8daff 100%)',
            dark: 'linear-gradient(180deg, #3ba5d1 0%, #6bb8e0 50%, #8dc9f2 100%)'
        },
        'noon-good': {
            bright: 'linear-gradient(180deg, #1e88e5 0%, #42a5f5 50%, #64b5f6 100%)',
            dark: 'linear-gradient(180deg, #1565c0 0%, #1e88e5 50%, #42a5f5 100%)'
        },
        'early-afternoon-good': {
            bright: 'linear-gradient(180deg, #42a5f5 0%, #64b5f6 50%, #90caf9 100%)',
            dark: 'linear-gradient(180deg, #2196f3 0%, #42a5f5 50%, #64b5f6 100%)'
        },
        'late-afternoon-good': {
            bright: 'linear-gradient(180deg, #ff9a56 0%, #ffb07c 50%, #ffcda3 100%)',
            dark: 'linear-gradient(180deg, #f57c42 0%, #ff9656 50%, #ffb486 100%)'
        },
        'early-dusk-good': {
            bright: 'linear-gradient(180deg, #fa709a 0%, #fc8ba8 50%, #ffa7bd 100%)',
            dark: 'linear-gradient(180deg, #e85285 0%, #f56a94 50%, #fc8ba8 100%)'
        },
        'late-dusk-good': {
            bright: 'linear-gradient(180deg, #434343 0%, #5a5a5a 50%, #717171 100%)',
            dark: 'linear-gradient(180deg, #1a1a1a 0%, #2f2f2f 50%, #454545 100%)'
        },
        // SCHLECHTWETTER
        'night-bad': {
            bright: 'linear-gradient(180deg, #263238 0%, #37474f 50%, #455a64 100%)',
            dark: 'linear-gradient(180deg, #0d1117 0%, #1a1f2e 50%, #263238 100%)'
        },
        'early-dawn-bad': {
            bright: 'linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)',
            dark: 'linear-gradient(180deg, #2c3e50 0%, #34495e 50%, #455a64 100%)'
        },
        'late-dawn-bad': {
            bright: 'linear-gradient(180deg, #78909c 0%, #90a4ae 50%, #b0bec5 100%)',
            dark: 'linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)'
        },
        'morning-bad': {
            bright: 'linear-gradient(180deg, #607d8b 0%, #78909c 50%, #90a4ae 100%)',
            dark: 'linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)'
        },
        'noon-bad': {
            bright: 'linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)',
            dark: 'linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)'
        },
        'early-afternoon-bad': {
            bright: 'linear-gradient(180deg, #607d8b 0%, #78909c 50%, #90a4ae 100%)',
            dark: 'linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)'
        },
        'late-afternoon-bad': {
            bright: 'linear-gradient(180deg, #78909c 0%, #8d9da6 50%, #a3b1ba 100%)',
            dark: 'linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)'
        },
        'early-dusk-bad': {
            bright: 'linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)',
            dark: 'linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)'
        },
        'late-dusk-bad': {
            bright: 'linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)',
            dark: 'linear-gradient(180deg, #1c2329 0%, #263238 50%, #37474f 100%)'
        }
    };
    const key = `${timeOfDay}-${isBad ? 'bad' : 'good'}`;
    return gradients[key] || gradients['noon-good'];
}
// ----------------------------------------------------------------------
// HAUPT KARTE
// ----------------------------------------------------------------------
class MiniWeatherCard extends i {
    static get properties() {
        return {
            hass: { attribute: false },
            config: { state: true },
            _forecast: { state: true },
            _historyData: { state: true },
            _cardWidth: { state: true },
            _cardHeight: { state: true }
        };
    }
    static getConfigElement() { return document.createElement("slick-minimal-weather-card-editor"); }
    static getStubConfig(hass) {
        let entity = "";
        if (hass && hass.states) {
            const weatherEntities = Object.keys(hass.states).filter(id => id.startsWith("weather."));
            if (weatherEntities.length > 0)
                entity = weatherEntities[0];
        }
        return {
            type: 'custom:slick-minimal-weather-card',
            entity: entity,
            title: "Wetter",
            mode: "daily",
            sampling_size: 50,
            history_hours: 24
        };
    }
    constructor() {
        super();
        this._forecast = null;
        this._historyData = [];
        this._cardHeight = 200;
        this._cardWidth = 300;
        this._forecast = null;
        this._historyData = [];
        this._cardHeight = 200;
        this._cardWidth = 300;
        this._resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this._cardWidth = entry.contentRect.width;
                this._cardHeight = entry.contentRect.height;
                this.requestUpdate();
            }
        });
    }
    connectedCallback() {
        super.connectedCallback();
        this._resizeObserver.observe(this);
        if (this.hass && this.config) {
            this._subscribeForecast();
            this._updateHistory();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._resizeObserver.disconnect();
        this._unsubscribeForecast();
    }
    setConfig(config) {
        if (!config)
            throw new Error("Invalid configuration");
        const newConfig = {
            title: "Wetter",
            mode: "daily",
            temp_sensor: undefined,
            history_entity: undefined,
            sun_entity: "sun.sun",
            sampling_size: 50,
            history_hours: 24,
            ...config
        };
        if (newConfig.mode && !['daily', 'hourly'].includes(newConfig.mode)) {
            throw new Error(`Invalid mode: ${newConfig.mode}. Expected 'daily' or 'hourly'.`);
        }
        this.config = newConfig;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has('config') || changedProps.has('hass')) {
            if (!this._unsub && this.config.entity)
                this._subscribeForecast();
            if (this._historyTimeout)
                clearTimeout(this._historyTimeout);
            this._historyTimeout = window.setTimeout(() => this._updateHistory(), 10000);
        }
    }
    async _subscribeForecast() {
        var _a;
        this._unsubscribeForecast();
        if (!this.hass || !this.config || !this.config.entity || !this.hass.connection)
            return;
        const entityId = this.config.entity;
        const stateObj = this.hass.states[entityId];
        if (!stateObj)
            return;
        if (this.config.mode === 'daily' && ((_a = stateObj.attributes.forecast) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            this._forecast = stateObj.attributes.forecast;
            return;
        }
        try {
            this._unsub = await this.hass.connection.subscribeMessage((event) => { if (event && event.forecast) {
                this._forecast = event.forecast;
                this.requestUpdate();
            } }, { type: "weather/subscribe_forecast", forecast_type: this.config.mode || 'daily', entity_id: entityId });
        }
        catch (err) {
            console.error("MiniWeatherCard: Subscription failed", err);
        }
    }
    _unsubscribeForecast() {
        if (this._unsub) {
            this._unsub();
            this._unsub = undefined;
        }
    }
    async _updateHistory() {
        if (!this.hass || !this.config.history_entity) {
            this._historyData = [];
            return;
        }
        const entityId = this.config.history_entity;
        const hoursBack = parseInt(String(this.config.history_hours)) || 24;
        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - hoursBack * 60 * 60 * 1000);
        const startStr = encodeURIComponent(startTime.toISOString());
        const endStr = encodeURIComponent(endTime.toISOString());
        const entityStr = encodeURIComponent(entityId);
        try {
            const history = await this.hass.callApi("GET", `history/period/${startStr}?filter_entity_id=${entityStr}&end_time=${endStr}&minimal_response`);
            if (history && history.length > 0 && history[0].length > 0) {
                const rawData = history[0]
                    .map((pt) => ({ time: new Date(pt.last_changed).getTime(), state: parseFloat(pt.state) }))
                    .filter((pt) => !isNaN(pt.state));
                const targetPoints = this.config.sampling_size || 50;
                if (rawData.length > targetPoints) {
                    const step = Math.ceil(rawData.length / targetPoints);
                    this._historyData = rawData.filter((_, i) => i % step === 0);
                }
                else {
                    this._historyData = rawData;
                }
            }
            else {
                this._historyData = [];
            }
        }
        catch (err) {
            this._historyData = [];
        }
    }
    _calculatePathPoints() {
        const data = this._historyData;
        if (!data || data.length < 2 || this._cardWidth === 0 || this._cardHeight === 0)
            return null;
        const marginY = 20;
        const width = this._cardWidth;
        const height = this._cardHeight;
        const graphHeight = height - (marginY * 2);
        let minVal = data[0].state;
        let maxVal = data[0].state;
        const minTime = data[0].time;
        const maxTime = data[data.length - 1].time;
        data.forEach(pt => {
            if (pt.state < minVal)
                minVal = pt.state;
            if (pt.state > maxVal)
                maxVal = pt.state;
        });
        if (maxVal === minVal) {
            maxVal += 0.5;
            minVal -= 0.5;
        }
        const valRange = maxVal - minVal;
        const timeRange = maxTime - minTime;
        if (timeRange <= 0)
            return null;
        const points = data.map(pt => {
            const x = ((pt.time - minTime) / timeRange) * width;
            const yNormalized = (pt.state - minVal) / valRange;
            const y = height - marginY - (yNormalized * graphHeight);
            return [x, y];
        });
        const linePath = generateSmoothPath(points);
        if (!linePath)
            return null;
        return {
            line: linePath,
            area: linePath + ` L ${width},${height} L 0,${height} Z`
        };
    }
    render() {
        var _a, _b, _c, _d;
        if (!this.config)
            return b ``;
        if (!this.hass)
            return b ``;
        const stateObj = this.config.entity ? this.hass.states[this.config.entity] : undefined;
        let currentTemp = (_b = (_a = stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes) === null || _a === void 0 ? void 0 : _a.temperature) !== null && _b !== void 0 ? _b : '--';
        if (this.config.temp_sensor) {
            const sensorState = this.hass.states[this.config.temp_sensor];
            if (sensorState && !isNaN(parseFloat(sensorState.state)))
                currentTemp = sensorState.state;
        }
        const FIXED_HEIGHT = 162;
        const ROW_HEIGHT = 32;
        let maxRows = Math.floor((this._cardHeight - FIXED_HEIGHT) / ROW_HEIGHT);
        if (maxRows < 0)
            maxRows = 0;
        const showForecast = this._cardHeight > 140;
        const forecast = this._forecast ? this._forecast.slice(0, maxRows) : [];
        const isHourly = this.config.mode === 'hourly';
        let headerLabel = b `&nbsp;`;
        const fullForecast = this._forecast || [];
        if (fullForecast.length > 0) {
            const today = fullForecast[0];
            const h = (_c = today.temperature) !== null && _c !== void 0 ? _c : today.temp_max;
            const l = (_d = today.templow) !== null && _d !== void 0 ? _d : today.temp_min;
            const hVal = h !== undefined ? Math.round(h) : '--';
            const lVal = l !== undefined ? Math.round(l) : '--';
            if (isHourly)
                headerLabel = b `${hVal}°`;
            else
                headerLabel = lVal === '--' ? b `H:${hVal}°` : b `H:${hVal}° L:${lVal}°`;
        }
        const pathData = this._calculatePathPoints();
        const clipPathStyle = pathData ? `path('${pathData.area}')` : 'none';
        const gradients = this._getCurrentGradients();
        return b `
      <ha-card @click="${this._openMoreInfo}" style="cursor: pointer;">
        <div class="bg-container">
            <div class="bg-layer bright" style="background: ${gradients.bright};"></div>
            <div class="bg-layer dark" style="background: ${gradients.dark}; clip-path: ${clipPathStyle}; -webkit-clip-path: ${clipPathStyle};"></div>
            
            ${this.config.history_entity && pathData ? b `
                <svg class="history-svg" viewBox="0 0 ${this._cardWidth} ${this._cardHeight}" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineFade" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:white; stop-opacity:0.0;" />
                            <stop offset="20%" style="stop-color:white; stop-opacity:0.1;" />
                            <stop offset="100%" style="stop-color:white; stop-opacity:0.8;" />
                        </linearGradient>
                    </defs>
                    
                    <path d="${pathData.line}" fill="none" stroke="url(#lineFade)" stroke-width="1.2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                </svg>
            ` : ''}
        </div>

        <div class="container content-layer">
            <div class="header">
                <div class="temp-big">${currentTemp !== undefined ? Math.round(Number(currentTemp)) + "°" : "--"}</div>
                <div class="header-right">
                    <ha-icon icon="${this._getIcon(stateObj ? stateObj.state : '')}" class="main-icon"></ha-icon>
                    <div class="hl-label">${headerLabel}</div>
                </div>
            </div>

            ${showForecast ? b `
                <div class="forecast-list">
                    ${forecast.map((day) => this._renderRow(day))}
                    ${fullForecast.length === 0 ? b `<div class="loading">Lade...</div>` : ''}
                </div>
            ` : b `<div style="flex:1;"></div>`} 

            <div class="footer">${this.config.title}</div>
        </div>
      </ha-card>
    `;
    }
    _renderRow(day) {
        var _a, _b;
        const date = new Date(day.datetime);
        const isHourly = this.config.mode === 'hourly';
        const label = isHourly ? date.toLocaleTimeString(this.hass.language, { hour: '2-digit', minute: '2-digit' }) : date.toLocaleDateString(this.hass.language, { weekday: 'short' });
        const temp = (_a = day.temperature) !== null && _a !== void 0 ? _a : day.temp_max;
        const low = (_b = day.templow) !== null && _b !== void 0 ? _b : day.temp_min;
        if (isHourly && temp !== undefined)
            return b `<div class="row hourly"><div class="day-name">${label}</div><div class="icon-small"><ha-icon icon="${this._getIcon(day.condition)}"></ha-icon></div><div class="temp-single">${Math.round(temp)}°</div></div>`;
        else if (low !== undefined && temp !== undefined)
            return b `<div class="row"><div class="day-name">${label}</div><div class="icon-small"><ha-icon icon="${this._getIcon(day.condition)}"></ha-icon></div><div class="bars"><span class="val-low">${Math.round(low)}°</span><div class="bar-track"><div class="bar-fill"></div></div><span class="val-high">${Math.round(temp)}°</span></div></div>`;
        return b ``;
    }
    _getIcon(condition) {
        const map = { 'sunny': 'mdi:weather-sunny', 'clear-night': 'mdi:weather-night', 'partlycloudy': 'mdi:weather-partly-cloudy', 'cloudy': 'mdi:cloud', 'rainy': 'mdi:weather-rainy', 'pouring': 'mdi:weather-pouring', 'fog': 'mdi:weather-fog', 'hail': 'mdi:weather-hail', 'snowy': 'mdi:weather-snowy', 'lightning': 'mdi:weather-lightning' };
        return map[condition] || 'mdi:weather-cloudy';
    }
    _openMoreInfo() {
        if (this.config.entity) {
            this.dispatchEvent(new CustomEvent('hass-more-info', {
                composed: true,
                detail: { entityId: this.config.entity }
            }));
        }
    }
    _getCurrentGradients() {
        if (!this.hass || !this.config || !this.config.entity) {
            return { bright: 'linear-gradient(180deg, #2c3e50 0%, #151a1e 100%)', dark: 'linear-gradient(180deg, #243342 0%, #0a0a0a 100%)' };
        }
        const stateObj = this.hass.states[this.config.entity];
        if (!stateObj) {
            return { bright: 'linear-gradient(180deg, #2c3e50 0%, #151a1e 100%)', dark: 'linear-gradient(180deg, #243342 0%, #0a0a0a 100%)' };
        }
        const sunEntityId = this.config.sun_entity || 'sun.sun';
        const sunEntity = this.hass.states[sunEntityId];
        let timeOfDay = 'noon';
        if (sunEntity && sunEntity.attributes) {
            const elevation = sunEntity.attributes.elevation || 0;
            const rising = sunEntity.attributes.rising || false;
            timeOfDay = getTimeOfDayFromSun(elevation, rising);
        }
        const condition = stateObj.state;
        const isBad = isBadWeather(condition);
        return getGradients(timeOfDay, isBad);
    }
    static get styles() {
        return i$3 `
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
    `;
    }
}
if (!customElements.get("slick-minimal-weather-card")) {
    customElements.define("slick-minimal-weather-card", MiniWeatherCard);
    console.info("%c slick-minimal-weather-card Registered", "color: green; font-weight: bold;");
}
class MiniWeatherCardEditor extends i {
    static get properties() { return { hass: {}, _config: {} }; }
    setConfig(config) { this._config = config; }
    _valueChanged(ev) { const newConfig = ev.detail.value; const event = new CustomEvent("config-changed", { detail: { config: newConfig }, bubbles: true, composed: true, }); this.dispatchEvent(event); }
    render() {
        if (!this.hass || !this._config)
            return b ``;
        const schema = [
            { name: "entity", label: "Wetter Entität", selector: { entity: { domain: "weather" } } },
            { name: "title", label: "Titel", selector: { text: {} } },
            { name: "temp_sensor", label: "Temp. Override (Sensor)", selector: { entity: { domain: "sensor" } } },
            { name: "history_entity", label: "Verlauf (Hintergrund)", selector: { entity: { domain: "sensor" } } },
            { name: "sun_entity", label: "Sonnen-Sensor", selector: { entity: { domain: "sun" } } },
            {
                name: "history_hours",
                label: "Verlauf Zeitraum",
                selector: {
                    select: {
                        options: [
                            { value: "1", label: "1 Stunde" },
                            { value: "6", label: "6 Stunden" },
                            { value: "12", label: "12 Stunden" },
                            { value: "24", label: "24 Stunden" },
                            { value: "48", label: "2 Tage" },
                            { value: "72", label: "3 Tage" },
                            { value: "168", label: "7 Tage" }
                        ]
                    }
                }
            },
            { name: "sampling_size", label: "Glättung (Punkte)", selector: { number: { min: 5, max: 200, mode: "slider" } } },
            { name: "mode", label: "Modus", selector: { select: { options: [{ value: "daily", label: "Täglich" }, { value: "hourly", label: "Stündlich" }] } } }
        ];
        return b `<ha-form .hass=${this.hass} .data=${this._config} .schema=${schema} .computeLabel=${(s) => s.label} @value-changed=${this._valueChanged}></ha-form>`;
    }
}
if (!customElements.get("slick-minimal-weather-card-editor")) {
    customElements.define("slick-minimal-weather-card-editor", MiniWeatherCardEditor);
}
window.customCards = window.customCards || [];
window.customCards.push({
    type: "slick-minimal-weather-card",
    name: "Slick Minimal Weather",
    preview: true,
    description: "Minimalist weather card with history and forecasting."
});

/**
 * Squircle Clock Card
 * @version 0.1.0
 */
// --- KONFIGURATIONSSCHEMA ---
const CARD_SCHEMA = [
    {
        name: "display_mode",
        label: "Anzeigemodus",
        selector: {
            select: {
                mode: "dropdown",
                options: [
                    { value: "analog", label: "Analog (Klassisch)" },
                    { value: "digital", label: "Digital (Hybrid)" }
                ]
            }
        }
    },
    {
        name: "font_style",
        label: "Schriftart",
        selector: {
            select: {
                mode: "dropdown",
                options: [
                    { value: "standard", label: "Standard (Apple Bold)" },
                    { value: "thin", label: "Modern & Dünn (iOS)" },
                    { value: "retro", label: "Retro Bahnhof (DIN-Style)" }
                ]
            }
        }
    }
];
class SquircleClockCard extends HTMLElement {
    constructor() {
        super(...arguments);
        this._ticks = [];
        this._lastMin = -1;
        this._lastSecond = -1;
    }
    static getConfigElement() {
        return document.createElement("slick-squircle-clock-editor");
    }
    static getStubConfig() {
        return {
            type: "custom:slick-squircle-clock-card",
            display_mode: "digital",
            font_style: "standard"
        };
    }
    set hass(hass) { this._hass = hass; }
    setConfig(config) {
        if (!config)
            throw new Error("Invalid configuration");
        const newConfig = {
            display_mode: 'digital',
            font_style: 'standard', // Apple Bold
            ...config
        };
        // Validation
        if (newConfig.display_mode && !['analog', 'digital'].includes(newConfig.display_mode)) {
            throw new Error(`Invalid display_mode: ${newConfig.display_mode}`);
        }
        if (newConfig.font_style && !['standard', 'thin', 'retro'].includes(newConfig.font_style)) {
            throw new Error(`Invalid font_style: ${newConfig.font_style}`);
        }
        this.config = newConfig;
        if (this.shadowRoot) {
            this._render();
            this._drawContent();
        }
    }
    getLayoutOptions() {
        return {
            grid_rows: 2,
            grid_columns: 2,
            grid_min_rows: 1,
            grid_min_columns: 1,
        };
    }
    // --- CONNECTED/DISCONNECTED (Old Style + Fix) ---
    connectedCallback() {
        if (!this.shadowRoot)
            this.attachShadow({ mode: 'open' });
        this._render();
        this._drawContent();
        this._startClock();
        this._resizeObserver = new ResizeObserver(() => this._drawContent());
        this._resizeObserver.observe(this);
    }
    disconnectedCallback() {
        var _a;
        this._stopClock();
        (_a = this._resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    _startClock() {
        if (this._timer)
            cancelAnimationFrame(this._timer);
        const update = () => {
            var _a, _b, _c;
            const now = new Date();
            let displayTime = now;
            // Zeitzonen-Logik
            let timezone = (_a = this.config) === null || _a === void 0 ? void 0 : _a.timezone;
            // Prüfe ob timezone_entity gesetzt ist und hole Zeitzone daraus
            if (((_b = this.config) === null || _b === void 0 ? void 0 : _b.timezone_entity) && this._hass) {
                const entity = this._hass.states[this.config.timezone_entity];
                if (entity && entity.state) {
                    timezone = entity.state;
                }
            }
            if (timezone) {
                try {
                    const tzString = now.toLocaleString('en-US', { timeZone: timezone });
                    displayTime = new Date(tzString);
                    displayTime.setMilliseconds(now.getMilliseconds());
                }
                catch (e) {
                    // Fallback falls Zeitzone ungültig
                    displayTime = now;
                }
            }
            if (((_c = this.config) === null || _c === void 0 ? void 0 : _c.display_mode) === 'digital') {
                this._updateDigital(displayTime);
            }
            else {
                this._updateAnalog(displayTime);
            }
            this._timer = requestAnimationFrame(update);
        };
        this._timer = requestAnimationFrame(update);
    }
    _stopClock() { if (this._timer)
        cancelAnimationFrame(this._timer); }
    // --- MATHEMATIK ---
    _getPointOnRoundedRect(angleDeg, w, h, radius, inset) {
        const angleRad = (angleDeg - 90) * (Math.PI / 180);
        const xCenter = w / 2;
        const yCenter = h / 2;
        const width = Math.max(0, w - 2 * inset);
        const height = Math.max(0, h - 2 * inset);
        const r = Math.max(0, radius - inset);
        const halfW = width / 2;
        const halfH = height / 2;
        const absCos = Math.abs(Math.cos(angleRad));
        const absSin = Math.abs(Math.sin(angleRad));
        let x, y;
        if (halfW * absSin <= halfH * absCos) {
            x = halfW * Math.sign(Math.cos(angleRad));
            y = halfW * Math.tan(angleRad) * Math.sign(Math.cos(angleRad));
        }
        else {
            x = halfH / Math.tan(angleRad) * Math.sign(Math.sin(angleRad));
            y = halfH * Math.sign(Math.sin(angleRad));
        }
        const innerW = Math.max(0, halfW - r);
        const innerH = Math.max(0, halfH - r);
        if (Math.abs(x) > innerW && Math.abs(y) > innerH) {
            const dx = Math.abs(x) - innerW;
            const dy = Math.abs(y) - innerH;
            const dist = Math.sqrt(dx * dx + dy * dy);
            x = (innerW + (dx / dist) * r) * Math.sign(x);
            y = (innerH + (dy / dist) * r) * Math.sign(y);
        }
        return { x: xCenter + x, y: yCenter + y };
    }
    // --- CSS FÜR SCHRIFTARTEN ---
    _getFontStyle() {
        var _a;
        const style = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.font_style) || 'standard';
        switch (style) {
            case 'thin':
                return `
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                font-weight: 200;
              `;
            case 'retro':
                return `
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-weight: 700;
                letter-spacing: 0.5px;
              `;
            case 'standard':
            default:
                return `
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                font-weight: 600;
              `;
        }
    }
    // --- RENDERING ---
    _render() {
        var _a;
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block; width: 100%; height: 100%;
          background: var(--ha-card-background, var(--card-background-color, white));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
          overflow: hidden;
          box-sizing: border-box;
          position: relative;
        }
        svg { width: 100%; height: 100%; display: block; position: absolute; top: 0; left: 0; }
        
        /* Analog Styles */
        text.analog-num {
          ${this._getFontStyle()}
          fill: var(--primary-text-color); 
          text-anchor: middle; dominant-baseline: middle;
        }
        #hour-hand, #minute-hand { stroke: var(--primary-text-color); stroke-width: 6; stroke-linecap: round; }
        #second-hand { stroke: #ff9500; stroke-width: 2.5; stroke-linecap: round; }
        #center-dot { fill: #ff9500; stroke: var(--primary-text-color); stroke-width: 1.5; }

        /* Digital Styles */
        .digital-container {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            text-align: center; 
            color: var(--primary-text-color); pointer-events: none;
            ${this._getFontStyle()}
        }
        .time-big { font-size: 1em; line-height: 1; font-variant-numeric: tabular-nums; }
        .date-small { 
            font-weight: 500; 
            opacity: 0.6; 
            margin-top: 4px; 
            text-transform: uppercase; 
            font-weight: ${((_a = this.config) === null || _a === void 0 ? void 0 : _a.font_style) === 'thin' ? '400' : 'bold'};
        }
        
        /* Aktiver Sekunden-Tick (Digital) */
        .active-tick { 
            stroke: #ff9500 !important; 
            stroke-opacity: 1 !important; 
            stroke-width: 3px !important; 
        }
      </style>
      <div id="content"></div>
    `;
    }
    _drawContent() {
        var _a;
        if (!this.shadowRoot)
            return;
        const container = this.shadowRoot.getElementById('content');
        if (!container)
            return;
        const rect = this.getBoundingClientRect();
        const w = rect.width || 300;
        const h = rect.height || 300;
        const minDim = Math.min(w, h);
        const style = window.getComputedStyle(this);
        let rVal = parseFloat(style.borderTopLeftRadius);
        if (style.borderTopLeftRadius && style.borderTopLeftRadius.includes('%')) {
            rVal = (minDim * parseFloat(style.borderTopLeftRadius)) / 100;
        }
        const radius = rVal || (minDim * 0.22);
        const mode = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.display_mode) || 'analog';
        if (mode === 'analog') {
            this._drawAnalog(container, w, h, radius, minDim);
        }
        else {
            this._drawDigital(container, w, h, radius, minDim);
        }
    }
    _drawAnalog(container, w, h, radius, minDim) {
        var _a, _b, _c, _d, _e;
        let ticks = '';
        for (let i = 0; i < 60; i++) {
            const isHour = i % 5 === 0;
            const angle = i * 6;
            const p2 = this._getPointOnRoundedRect(angle, w, h, radius, 5);
            const p1 = this._getPointOnRoundedRect(angle, w, h, radius, isHour ? 20 : 12);
            const color = isHour ? 'var(--primary-text-color)' : 'var(--secondary-text-color)';
            // Bei Retro dicke Striche, bei Thin dünne
            let sw = isHour ? 3 : 1.5;
            if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.font_style) === 'retro' && isHour)
                sw = 4.5;
            if (((_b = this.config) === null || _b === void 0 ? void 0 : _b.font_style) === 'retro' && !isHour)
                sw = 2;
            ticks += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" />`;
        }
        const nPos = {
            12: this._getPointOnRoundedRect(0, w, h, radius, minDim * 0.25),
            3: this._getPointOnRoundedRect(90, w, h, radius, minDim * 0.25),
            6: this._getPointOnRoundedRect(180, w, h, radius, minDim * 0.25),
            9: this._getPointOnRoundedRect(270, w, h, radius, minDim * 0.25)
        };
        container.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}">
        ${ticks}
        <text class="analog-num" style="font-size: ${Math.max(12, minDim / 10)}px" x="${nPos[12].x}" y="${nPos[12].y}">12</text>
        <text class="analog-num" style="font-size: ${Math.max(12, minDim / 10)}px" x="${nPos[3].x}" y="${nPos[3].y}">3</text>
        <text class="analog-num" style="font-size: ${Math.max(12, minDim / 10)}px" x="${nPos[6].x}" y="${nPos[6].y}">6</text>
        <text class="analog-num" style="font-size: ${Math.max(12, minDim / 10)}px" x="${nPos[9].x}" y="${nPos[9].y}">9</text>
        <line id="hour-hand" x1="${w / 2}" y1="${h / 2}" x2="${w / 2}" y2="${h / 2 - minDim / 4}" />
        <line id="minute-hand" x1="${w / 2}" y1="${h / 2}" x2="${w / 2}" y2="${h / 2 - minDim / 2.8}" />
        <line id="second-hand" x1="${w / 2}" y1="${h / 2 + 15}" x2="${w / 2}" y2="${h / 2 - minDim / 2.4}" />
        <circle id="center-dot" cx="${w / 2}" cy="${h / 2}" r="3.5" />
      </svg>
    `;
        this.hourHand = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('#hour-hand');
        this.minuteHand = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('#minute-hand');
        this.secondHand = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('#second-hand');
        this._center = { x: w / 2, y: h / 2 };
    }
    _drawDigital(container, w, h, radius, minDim) {
        var _a, _b, _c, _d;
        let ticks = '';
        for (let i = 0; i < 60; i++) {
            const angle = i * 6;
            const p2 = this._getPointOnRoundedRect(angle, w, h, radius, 6);
            const p1 = this._getPointOnRoundedRect(angle, w, h, radius, 14);
            ticks += `<line id="tick-${i}" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" 
                stroke="var(--secondary-text-color)" 
                stroke-opacity="0.4" 
                stroke-width="1.5" 
                stroke-linecap="round" />`;
        }
        container.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}">${ticks}</svg>
      <div class="digital-container">
        <div class="time-big" id="time-display" style="font-size: ${minDim * 0.25}px">--:--</div>
        <div class="date-small" id="date-display" style="font-size: ${minDim * 0.08}px">--</div>
      </div>
    `;
        this._timeDisplay = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#time-display');
        this._dateDisplay = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('#date-display');
        this._ticks = [];
        for (let i = 0; i < 60; i++)
            this._ticks.push(((_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(`#tick-${i}`)) || null);
        this._lastMin = -1;
        this._lastSecond = -1;
        const now = new Date();
        // Falls Zeitzone konfiguriert ist, direkt anwenden für Initial-Render
        if ((_d = this.config) === null || _d === void 0 ? void 0 : _d.timezone) {
            try {
                const tzString = now.toLocaleString('en-US', { timeZone: this.config.timezone });
                const tzTime = new Date(tzString);
                this._updateDigital(tzTime, true);
            }
            catch (e) {
                this._updateDigital(now, true);
            }
        }
        else {
            this._updateDigital(now, true);
        }
    }
    _updateAnalog(time) {
        var _a, _b;
        if (!this.hourHand)
            return;
        const s = time.getSeconds() + time.getMilliseconds() / 1000;
        const m = time.getMinutes() + s / 60;
        const h = (time.getHours() % 12) + m / 60;
        const { x, y } = this._center || { x: 0, y: 0 };
        (_a = this.secondHand) === null || _a === void 0 ? void 0 : _a.setAttribute('transform', `rotate(${s * 6} ${x} ${y})`);
        (_b = this.minuteHand) === null || _b === void 0 ? void 0 : _b.setAttribute('transform', `rotate(${m * 6} ${x} ${y})`);
        this.hourHand.setAttribute('transform', `rotate(${h * 30} ${x} ${y})`);
    }
    _updateDigital(time, force = false) {
        var _a, _b, _c;
        if (!this._timeDisplay)
            return;
        const seconds = time.getSeconds();
        if (force || this._lastMin !== time.getMinutes()) {
            const hours = String(time.getHours()).padStart(2, '0');
            const minutes = String(time.getMinutes()).padStart(2, '0');
            this._timeDisplay.textContent = `${hours}:${minutes}`;
            const options = { weekday: 'short', day: 'numeric' };
            const localeOptions = { ...options };
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.timezone)
                localeOptions.timeZone = this.config.timezone;
            if (this._dateDisplay) {
                this._dateDisplay.textContent = new Date().toLocaleDateString('de-DE', localeOptions);
            }
            this._lastMin = time.getMinutes();
        }
        if (force || this._lastSecond !== seconds) {
            if (this._lastSecond !== -1 && this._ticks[this._lastSecond]) {
                (_b = this._ticks[this._lastSecond]) === null || _b === void 0 ? void 0 : _b.classList.remove('active-tick');
            }
            if (this._ticks[seconds]) {
                (_c = this._ticks[seconds]) === null || _c === void 0 ? void 0 : _c.classList.add('active-tick');
            }
            this._lastSecond = seconds;
        }
    }
}
// --- EDITOR (LIT) ---
class SquircleClockEditor extends i {
    static get properties() {
        return {
            hass: { attribute: false },
            _config: { state: true },
        };
    }
    setConfig(config) {
        this._config = config;
    }
    _valueChanged(ev) {
        if (!this._config || !this.hass)
            return;
        const newConfig = { ...this._config, ...ev.detail.value };
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        if (!this.hass || !this._config)
            return b ``;
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${CARD_SCHEMA}
        .computeLabel=${(s) => s.label || s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
}
if (!customElements.get('slick-squircle-clock-card')) {
    customElements.define('slick-squircle-clock-card', SquircleClockCard);
    console.info("%c slick-squircle-clock-card Registered", "color: green; font-weight: bold;");
}
if (!customElements.get('slick-squircle-clock-editor')) {
    customElements.define('slick-squircle-clock-editor', SquircleClockEditor);
}
window.customCards = window.customCards || [];
window.customCards.push({
    type: "slick-squircle-clock-card",
    name: "Slick Squircle Clock",
    preview: true,
    description: "A customizable clock card with analog and digital modes."
});

/**
 * Simple Climate Card
 * @version 0.1.0
 */
const CARD_VERSION$1 = "0.1.0";
console.info(`%c SIMPLE-CLIMATE-CARD %c ${CARD_VERSION$1} `, 'color: white; background: #ff9800; font-weight: 700;', 'color: #ff9800; background: white; font-weight: 700;');
class SimpleClimateCard extends i {
    static get properties() {
        return {
            hass: { attribute: false },
            config: { state: true },
        };
    }
    static getConfigElement() {
        return document.createElement("slick-simple-climate-card-editor");
    }
    static getStubConfig() {
        return {
            type: "custom:slick-simple-climate-card",
            entity: "",
            name: "Climate",
        };
    }
    setConfig(config) {
        if (!config)
            throw new Error("Invalid configuration");
        this.config = { name: "Climate", ...config };
        if (this.config.name && typeof this.config.name !== 'string')
            throw new Error("name must be a string");
        if (this.config.sensors && typeof this.config.sensors !== 'object')
            throw new Error("sensors must be an object");
    }
    _interpolateColor(c1, c2, factor) {
        const hex = (c) => {
            const h = c.replace('#', '');
            return parseInt(h, 16);
        };
        const r1 = (hex(c1) >> 16) & 255;
        const g1 = (hex(c1) >> 8) & 255;
        const b1 = (hex(c1)) & 255;
        const r2 = (hex(c2) >> 16) & 255;
        const g2 = (hex(c2) >> 8) & 255;
        const b2 = (hex(c2)) & 255;
        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }
    _getGradient(stateObj, currentTemp, targetLow, targetHigh) {
        const hvacAction = stateObj.attributes.hvac_action || stateObj.state;
        // Common colors
        const cGrey = '#607d8b';
        const cDarkGrey = '#455a64';
        const cOrange = '#ff9800';
        const cOrangeDark = '#e65100'; // Darker orange for full heat depth
        const cGreen = '#4caf50';
        const cBlue = '#2196f3';
        const cBlueDark = '#0d47a1'; // Darker blue for full cool depth
        // Safety check
        if (isNaN(currentTemp))
            return `linear-gradient(180deg, ${cGrey}, ${cDarkGrey})`;
        // Difference required for full color intensity
        const maxDelta = 3;
        // heating, but below target temperature: bottom orange, top grey
        if (hvacAction === 'heating') {
            // If we only have single target, targetLow is the target
            if (currentTemp < targetLow) {
                const delta = targetLow - currentTemp;
                const intensity = delta / maxDelta >= 1 ? 1 : delta / maxDelta;
                // INTERPOLATE TOP COLOR: Grey -> Orange
                // Ensures no "Grey Bar" at the top when intensity is high (near 3deg).
                // Modulate from Grey to Orange starting at 40% intensity to keep contrast for small deltas.
                let topFactor = 0;
                if (intensity > 0.4) {
                    topFactor = (intensity - 0.4) / 0.6; // 0..1
                }
                const topColor = this._interpolateColor(cGrey, cOrange, topFactor);
                // INTERPOLATE BOTTOM COLOR: Orange -> OrangeDark
                // Adds depth at high intensity so it's not flat
                const bottomColor = this._interpolateColor(cOrange, cOrangeDark, intensity);
                // HINT POSITION: Controls the "weight" of the gradient.
                // Intensity 0 (0deg) -> 90% (Transition happens at bottom, mostly Top Color/Grey)
                // Intensity 1 (3deg) -> 20% (Transition happens at top, mostly Bottom Color/Orange)
                const hint = 90 - (intensity * 70);
                return `linear-gradient(180deg, ${topColor} 0%, ${hint}%, ${bottomColor} 100%)`;
            }
            // heating, but already >= target OR in range
            // Just a pleasant green-orange mix
            return `linear-gradient(180deg, ${cGreen}, 80%, ${cOrange})`;
        }
        // cooling
        if (hvacAction === 'cooling') {
            // cooling, but over target temperature: top blue, bottom grey
            if (currentTemp > targetHigh) {
                const delta = currentTemp - targetHigh;
                const intensity = delta / maxDelta >= 1 ? 1 : delta / maxDelta;
                // INTERPOLATE TARGET BLUE: Blue -> BlueDark
                // As intensity rises, the "Blue" end becomes darker for depth.
                const targetBlue = this._interpolateColor(cBlue, cBlueDark, intensity);
                // INTERPOLATE BOTTOM COLOR: Grey -> TargetBlue
                // Ensures no "Grey Bar" at the bottom when intensity is high.
                let botFactor = 0;
                if (intensity > 0.4) {
                    botFactor = (intensity - 0.4) / 0.6;
                }
                const botColor = this._interpolateColor(cGrey, targetBlue, botFactor);
                // HINT POSITION:
                // Intensity 0 (0deg) -> 10% (Transition happens at top, mostly Bottom Color/Grey)
                // Intensity 1 (3deg) -> 80% (Transition happens at bottom, mostly Top Color/Blue)
                const hint = 10 + (intensity * 70);
                return `linear-gradient(180deg, ${cBlue} 0%, ${hint}%, ${botColor} 100%)`;
            }
            // cooling, and already <= target
            return `linear-gradient(180deg, ${cBlue}, 20%, ${cGreen})`;
        }
        // idle
        if (hvacAction === 'idle') {
            // idle, and in optimal temperature range: greenish gradient
            return `linear-gradient(180deg, ${cGreen} 0%, ${'#81c784'} 100%)`;
        }
        // off
        if (stateObj.state === 'off') {
            return `linear-gradient(180deg, ${cGrey} 0%, ${cDarkGrey} 100%)`;
        }
        // Fallback (maybe fan_only or dry) - Neutral
        return `linear-gradient(180deg, ${cGrey} 0%, ${cDarkGrey} 100%)`;
    }
    render() {
        var _a, _b, _c;
        // If config is missing, we can't do anything
        if (!this.config)
            return b ``;
        // If hass is missing, we render a placeholder explicitly or return
        // But typically user wants to see the card structure.
        if (!this.hass) {
            return b `<ha-card style="padding:16px;">Loading...</ha-card>`;
        }
        const entityId = this.config.entity;
        let stateObj = this.hass.states[entityId];
        if (!stateObj) {
            stateObj = {
                entity_id: entityId,
                state: 'unavailable',
                attributes: { friendly_name: this.config.name || entityId },
            };
        }
        // 1. Determine Temperatures
        let currentTemp = stateObj.attributes.current_temperature;
        // Config override
        if (((_a = this.config.sensors) === null || _a === void 0 ? void 0 : _a.temp) && this.hass.states[this.config.sensors.temp]) {
            const s = this.hass.states[this.config.sensors.temp];
            if (!isNaN(parseFloat(s.state)))
                currentTemp = parseFloat(s.state);
        }
        // Targets
        // Try to find High/Low. If single point 'temperature', assign to both or logic depends on mode?
        // If mode is 'heat', target is low. If mode is 'cool', target is high.
        // If 'heat_cool', we have both.
        let targetLow = stateObj.attributes.target_temp_low;
        let targetHigh = stateObj.attributes.target_temp_high;
        const singleTarget = stateObj.attributes.temperature;
        if (targetLow === undefined && singleTarget !== undefined)
            targetLow = singleTarget;
        if (targetHigh === undefined && singleTarget !== undefined)
            targetHigh = singleTarget;
        // Defaults if completely missing
        if (targetLow === undefined)
            targetLow = 20;
        if (targetHigh === undefined)
            targetHigh = 24;
        // Sensor overrides
        if (((_b = this.config.sensors) === null || _b === void 0 ? void 0 : _b.target_low) && this.hass.states[this.config.sensors.target_low]) {
            targetLow = parseFloat(this.hass.states[this.config.sensors.target_low].state);
        }
        if (((_c = this.config.sensors) === null || _c === void 0 ? void 0 : _c.target_high) && this.hass.states[this.config.sensors.target_high]) {
            targetHigh = parseFloat(this.hass.states[this.config.sensors.target_high].state);
        }
        const gradient = this._getGradient(stateObj, currentTemp, targetLow, targetHigh);
        // Labels
        const name = this.config.name || stateObj.attributes.friendly_name || 'Climate';
        const stateLabel = stateObj.attributes.hvac_action
            ? this.hass.localize(`state_attributes.climate.hvac_action.${stateObj.attributes.hvac_action}`)
            : this.hass.localize(`component.climate.state._.${stateObj.state}`) || stateObj.state;
        // Main Icon Logic
        let icon = 'mdi:thermostat';
        const action = stateObj.attributes.hvac_action || stateObj.state;
        if (action === 'heating')
            icon = 'mdi:fire';
        else if (action === 'cooling')
            icon = 'mdi:snowflake';
        else if (action === 'idle')
            icon = 'mdi:check-circle-outline';
        else if (action === 'off')
            icon = 'mdi:power-off';
        return b `
      <ha-card @click="${this._openMoreInfo}">
        <div class="bg-layer" style="background: ${gradient};"></div>
        
        <div class="container">
          <div class="header">
             <div class="temp-big">
                ${currentTemp !== undefined ? b `${currentTemp}<span class="unit">°</span>` : '--'}
             </div>
             <div class="header-right">
                <ha-icon icon="${icon}" class="main-icon"></ha-icon>
                <div class="state-label">${stateLabel}</div>
             </div>
          </div>

          <div class="spacer"></div>

          <div class="footer-row">
             <div class="footer-info">
               <div class="name">${name}</div>
             </div>
             <div class="targets">
                ${this._renderTargets(stateObj, targetLow, targetHigh)}
             </div>
          </div>
        </div>
      </ha-card>
    `;
    }
    _renderTargets(stateObj, low, high) {
        var _a;
        const mode = stateObj.state;
        // If off, show nothing or just "Off"
        if (mode === 'off')
            return b `<div class="target-chip">OFF</div>`;
        // heat_cool -> show both
        // heat -> show low
        // cool -> show high
        // But hvac_modes might allow more.
        // Simplification: If we have distinct low/high, show range. If same, show one.
        if (low !== undefined && high !== undefined && low !== high) {
            return b `
            <div class="target-group">
               <div class="target-label">Min</div>
               <div class="target-val">${low}°</div>
            </div>
            <div class="divider"></div>
            <div class="target-group">
               <div class="target-label">Max</div>
               <div class="target-val">${high}°</div>
            </div>
         `;
        }
        // Single target
        return b `
        <div class="target-group">
           <div class="target-label">Target</div>
           <div class="target-val">${(_a = low !== null && low !== void 0 ? low : high) !== null && _a !== void 0 ? _a : '--'}°</div>
        </div>
     `;
    }
    _openMoreInfo() {
        if (this.config.entity) {
            const event = new CustomEvent("hass-more-info", {
                detail: { entityId: this.config.entity },
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(event);
        }
    }
    static get styles() {
        return i$3 `
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
    `;
    }
}
// Register Custom Element
if (!customElements.get("slick-simple-climate-card")) {
    customElements.define("slick-simple-climate-card", SimpleClimateCard);
    console.info("%c slick-simple-climate-card Registered", "color: green; font-weight: bold;");
}
class SimpleClimateCardEditor extends i {
    static get properties() { return { hass: {}, _config: {} }; }
    setConfig(config) { this._config = config; }
    _valueChanged(ev) {
        const newConfig = { ...this._config, ...ev.detail.value };
        const event = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    render() {
        // Minimal editor
        if (!this.hass || !this._config)
            return b ``;
        const schema = [
            { name: "entity", label: "Entity", selector: { entity: { domain: "climate" } } },
            { name: "name", label: "Name", selector: { text: {} } }
        ];
        return b `
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${schema}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>
      `;
    }
}
if (!customElements.get("slick-simple-climate-card-editor")) {
    customElements.define("slick-simple-climate-card-editor", SimpleClimateCardEditor);
}
// Register
window.customCards = window.customCards || [];
window.customCards.push({
    type: "slick-simple-climate-card",
    name: "Slick Simple Climate",
    preview: true,
    description: "A clean climate card with dynamic gradients."
});

/**
 * Energy Flow Card
 * @version 0.1.0
 */
class EnergyFlowCard extends i {
    constructor() {
        super(...arguments);
        // --- STATE ---
        this._cachedGradients = ['', ''];
        this._activeIndex = 0;
        this._displayedGradient = null;
    }
    static get properties() {
        return {
            hass: { attribute: false },
            config: { state: true },
        };
    }
    static getConfigElement() {
        return document.createElement("slick-energy-flow-card-editor");
    }
    static getStubConfig() {
        return {
            type: "custom:slick-energy-flow-card",
            title: "Energiefluss",
            solar_entity: "",
            grid_import_entity: "",
            grid_export_entity: "",
            battery_entity: "",
            battery_soc_entity: "",
            home_entity: ""
        };
    }
    setConfig(config) {
        if (!config)
            throw new Error("Invalid configuration");
        const newConfig = {
            title: "Energiefluss",
            inverted_grid: false,
            inverted_battery: false,
            ...config
        };
        // Type validation
        if (newConfig.inverted_grid && typeof newConfig.inverted_grid !== 'boolean')
            throw new Error("inverted_grid must be a boolean");
        if (newConfig.inverted_battery && typeof newConfig.inverted_battery !== 'boolean')
            throw new Error("inverted_battery must be a boolean");
        this.config = newConfig;
    }
    // --- HELPER ---
    _getState(entity) {
        if (!this.hass || !entity || !this.hass.states[entity])
            return 0;
        const val = parseFloat(this.hass.states[entity].state);
        return isNaN(val) ? 0 : val;
    }
    _formatPower(watts) {
        const w = Math.abs(watts);
        if (w >= 1000)
            return `${(w / 1000).toFixed(1)} kW`;
        return `${Math.round(w)} W`;
    }
    render() {
        if (!this.config)
            return b ``;
        // Allow render if hass is missing, just to show structure (values will be 0)
        // --- FETCH DATA ---
        const _hass = this.hass; // Use local ref to avoid repeated check issues if type allows or just use directly
        const solar = _hass ? this._getState(this.config.solar_entity) : 0;
        // Grid Logic: Combined or Split
        let grid = 0;
        if (this.config.grid_entity) {
            grid = _hass ? this._getState(this.config.grid_entity) : 0;
            if (this.config.inverted_grid)
                grid = -grid;
        }
        else {
            // SolarNet Logic: 
            // Import is usually positive counter. Export is usually positive counter.
            // We want Net Grid Flow: Import (Pos) - Export (Pos).
            // Result: + = Import, - = Export.
            const imp = this._getState(this.config.grid_import_entity);
            const exp = this._getState(this.config.grid_export_entity);
            grid = imp - exp;
        }
        let battery = this._getState(this.config.battery_entity);
        const soc = this._getState(this.config.battery_soc_entity);
        // Optional Stats
        const autarky = this.config.autarky_entity ? this._getState(this.config.autarky_entity) : null;
        const selfCons = this.config.self_consumption_entity ? this._getState(this.config.self_consumption_entity) : null;
        if (this.config.inverted_battery)
            battery = -battery; // Standard: Positiv = Entladen, Negativ = Laden
        let home = 0;
        if (this.config.home_entity) {
            home = this._getState(this.config.home_entity);
        }
        else {
            // Calc Home
            // Basic Formula: Solar + Grid (Net) + Battery (Discharging positive)
            // Example: Solar 5000 + Grid -2000 (Exporting) + Battery 0 = 3000 Home
            // Example: Solar 0 + Grid 500 (Importing) + Battery 0 = 500 Home
            home = solar + grid + battery;
        }
        // Handle negative home sensor (User provided -615W for Load sometimes)
        home = Math.abs(home);
        // --- VISUAL LOGIC ---
        const isExporting = grid < -10; // 10W Tolerance
        const isImporting = grid > 10;
        const hasBattery = (!!this.config.battery_entity && this.config.battery_entity !== '') || (!!this.config.battery_soc_entity && this.config.battery_soc_entity !== '');
        const isCharging = battery < -10;
        const isDischarging = battery > 10;
        // Determine Background
        let topColor, bottomColor;
        // Top Color: PV Srength (Dynamic Orange)
        // Scale: 50W (Dark) -> 4000W (Bright)
        // Dark Orange: #bf360c (Deep Orange 900)
        // Bright Orange: #ffd600 (Yellow 700 / Amber A400)
        if (solar <= 50) {
            topColor = '#102027'; // Night
        }
        else {
            // Interpolate or stepped
            if (solar < 1000)
                topColor = '#e65100'; // Dark Orange
            else if (solar < 2500)
                topColor = '#f57c00'; // Medium Orange
            else if (solar < 5000)
                topColor = '#ffa000'; // Amber
            else
                topColor = '#ffc107'; // Bright Amber/Yellow
        }
        // Bottom Color: Consumption vs Production
        // If Home Consumption > Solar Production (Deficit) -> Grey
        // If Home Consumption < Solar Production (Surplus) -> Green
        if (home > solar) {
            bottomColor = '#455a64'; // Grey
        }
        else {
            bottomColor = '#2e7d32'; // Green
        }
        // Balanced State Override: "Everything is just an orange gradient"
        // Active if Solar is producing AND Net Grid Consumption is low.
        // Standard Tolerance: 0-50W.
        // Extended Tolerance (Full Batt/Charging): 0-150W.
        const isFullOrCharging = isCharging || soc >= 99;
        const gridTolerance = isFullOrCharging ? 150 : 50;
        if (solar > 50 && grid >= 0 && grid <= gridTolerance) {
            // Gradient: Bottom slightly brighter than top
            if (solar < 1000)
                bottomColor = '#f57c00'; // Dark Orange -> Medium
            else if (solar < 2500)
                bottomColor = '#ffa000'; // Medium -> Amber
            else if (solar < 5000)
                bottomColor = '#ffc107'; // Amber -> Bright
            else
                bottomColor = '#ffe082'; // Bright -> Pale Yellow
        }
        // Gradient: Lighter at bottom (180deg)
        const gradient = `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`;
        if (gradient !== this._displayedGradient) {
            const nextIndex = (this._activeIndex + 1) % 2;
            this._cachedGradients[nextIndex] = gradient;
            this._activeIndex = nextIndex;
            this._displayedGradient = gradient;
        }
        // Icons
        const iconSolar = b `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,7L10,11H14L12,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,5L16,13H13V19L9,11H12V5Z"/></svg>`; // Sun
        const iconGrid = b `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10.59,4.25L10,5.41L7.17,10.6C6.5,11.75 7.17,13.25 8.5,13.25H11V19L11.59,17.84L14.41,12.6C15.08,11.45 14.41,10 13.08,10H10.59V4.25Z"/></svg>`; // Bolt
        const iconHome = b `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>`; // Home
        // Battery Icon Logic
        let iconBattPath = "M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4Z"; // Default Battery
        if (isCharging) {
            // mdi-battery-arrow-down
            iconBattPath = "M18.3,10.74L16.89,9.33L12,14.22V6H10V14.22L5.11,9.33L3.7,10.74L11,18.04L18.3,10.74M16.67,4H15V2H9V4H7.33C6.6,4 6,4.6 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z"; // Approximation or actual path
            // Checking commonly available paths for battery-arrow-down... 
            // Using a composite path to ensure it looks right.
            // M17 14L12 19L7 14H10V4H14V14H17M16.6 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.7 22 7.3 22H16.6C17.3 22 18 21.4 18 20.6V5.3C18 4.6 17.4 4 16.6 4
            iconBattPath = "M12.92 15.61L12.92 10.46L14.96 10.46L11.5 6L8.04 10.46L10.08 10.46L10.08 15.61L12.92 15.61M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4Z"; // actually this is just a guess.
            // Let's use the actual mdi-battery-charging (lightning) or mdi-arrow-down
            // User asked for ARROW DOWN
            // Path for Arrow Down: M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z
            // I will just put an arrow next to the battery or overlay.
            // Let's stick to the generic one for now but distinct.
            // I will use `mdi-battery-charging` (Flash) as it's standard unless I find the path.
            // Correct path for mdi-battery-arrow-down:
            iconBattPath = "M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4M12 18L8 14H11V9H13V14H16L12 18Z";
        }
        else if (isDischarging) {
            // mdi-battery-arrow-up
            iconBattPath = "M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4M12 9L16 13H13V18H11V13H8L12 9Z";
        }
        const iconBatt = b `<svg viewBox="0 0 24 24"><path fill="currentColor" d="${iconBattPath}"/></svg>`;
        return b `
      <ha-card>
        <div class="bg-layer" style="background: ${this._cachedGradients[0]}; opacity: ${this._activeIndex === 0 ? 1 : 0}"></div>
        <div class="bg-layer" style="background: ${this._cachedGradients[1]}; opacity: ${this._activeIndex === 1 ? 1 : 0}"></div>
        <div class="content">
          <div class="header">
            <span class="title">${this.config.title}</span>
            <div class="badges">
                 ${autarky !== null ? b `<span class="status-badge" title="Autarkie"><span class="badge-label">AUT</span> ${Math.round(autarky)}%</span>` : ''}
                 ${selfCons !== null ? b `<span class="status-badge" title="Eigenverbrauch"><span class="badge-label">EIG</span> ${Math.round(selfCons)}%</span>` : ''}
                 <span class="status-badge">${isExporting ? 'Export' : isImporting ? 'Import' : 'Balance'}</span>
            </div>
          </div>

          <div class="main-stats">
            <!-- SOLAR (Left) -->
            <div class="stat-block solar ${solar > 10 ? 'active' : ''}">
              <div class="icon-circle solar-icon">${iconSolar}</div>
              <div class="stat-value">${this._formatPower(solar)}</div>
              <div class="stat-label">Solar</div>
            </div>

            <!-- HOME (Center Big) -->
            <div class="stat-block home">
              <div class="icon-circle home-icon">${iconHome}</div>
              <div class="stat-value big">${this._formatPower(home)}</div>
              <div class="stat-label">Haus</div>
            </div>

            <!-- GRID (Right) -->
            <div class="stat-block grid ${Math.abs(grid) > 10 ? 'active' : ''}">
              <div class="icon-circle grid-icon">${iconGrid}</div>
              <div class="stat-value">${this._formatPower(Math.abs(grid))}</div>
              <span class="stat-label">${grid > 0 ? 'Bezug' : 'Einspeisung'}</span>
            </div>
          </div>

          <!-- BATTERY (Bottom) -->
          ${hasBattery ? b `
            <div class="battery-section">
                <div class="batt-info">
                   <span class="batt-icon" style="color: ${soc < 20 ? '#ff3b30' : 'inherit'}">${iconBatt}</span>
                   <span class="batt-pct">${Math.round(soc)}%</span>
                   <span class="batt-power">${Math.abs(battery) > 0 ? this._formatPower(battery) : 'Standby'}</span>
                   <span class="batt-state">${isCharging ? 'Laden' : isDischarging ? 'Entladen' : ''}</span>
                </div>
                <div class="batt-bar-bg">
                    <div class="batt-bar-fill" style="width: ${soc}%; background-color: ${soc < 20 ? '#ff3b30' : 'white'}"></div>
                </div>
            </div>
          ` : ''}

        </div>
      </ha-card>
    `;
    }
    static get styles() {
        return i$3 `
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
    `;
    }
}
if (!customElements.get("slick-energy-flow-card")) {
    customElements.define("slick-energy-flow-card", EnergyFlowCard);
    console.info("%c slick-energy-flow-card Registered", "color: green; font-weight: bold;");
}
// Editor Class
class EnergyFlowCardEditor extends i {
    static get properties() {
        return {
            hass: {},
            _config: {},
        };
    }
    setConfig(config) { this._config = config; }
    _valueChanged(ev) {
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this._config, ...ev.detail.value } }, bubbles: true, composed: true }));
    }
    render() {
        if (!this.hass || !this._config)
            return b ``;
        const schema = [
            { name: "title", label: "Titel", selector: { text: {} } },
            { name: "solar_entity", label: "Solar Leistung", selector: { entity: { domain: "sensor" } } },
            { name: "grid_entity", label: "Netz Leistung", selector: { entity: { domain: "sensor" } } },
            { name: "battery_entity", label: "Batterie Leistung (Opt)", selector: { entity: { domain: "sensor" } } },
            { name: "battery_soc_entity", label: "Batterie Stand % (Opt)", selector: { entity: { domain: "sensor" } } },
            { name: "home_entity", label: "Haus Verbrauch (Opt)", selector: { entity: { domain: "sensor" } } },
            { name: "inverted_grid", label: "Invertiere Grid (+ ist Export)", selector: { boolean: {} } },
            { name: "inverted_battery", label: "Invertiere Batt (+ ist Laden)", selector: { boolean: {} } }
        ];
        return b `<ha-form .hass=${this.hass} .data=${this._config} .schema=${schema} .computeLabel=${(s) => s.label} @value-changed=${this._valueChanged}></ha-form>`;
    }
}
if (!customElements.get("slick-energy-flow-card-editor")) {
    customElements.define("slick-energy-flow-card-editor", EnergyFlowCardEditor);
}
window.customCards = window.customCards || [];
window.customCards.push({
    type: "slick-energy-flow-card",
    name: "Slick Energy Flow",
    preview: true,
    description: "Modern energy flow visualization."
});

/**
 * Person Card
 * @version 0.1.0
 */
const CARD_VERSION = "0.1.0";
console.info(`%c PERSON-CARD %c ${CARD_VERSION} `, 'color: white; background: #9c27b0; font-weight: 700;', 'color: #9c27b0; background: white; font-weight: 700;');
class PersonCard extends i {
    static get properties() {
        return {
            hass: { attribute: false },
            config: { state: true },
        };
    }
    static getConfigElement() {
        return document.createElement("slick-person-card-editor");
    }
    static getStubConfig(hass) {
        // Collect all person entities
        let people = [];
        if (hass && hass.states) {
            people = Object.keys(hass.states).filter(eid => eid.startsWith('person.'));
        }
        return {
            type: "custom:slick-person-card",
            people: people,
            size: 100,
            layout: "wrap"
        };
    }
    constructor() {
        super();
        // Debug logging for instantiation
        console.info("DEBUG: PersonCard constructor called!");
    }
    getCardSize() {
        if (!this.config || !this.config.people)
            return 1;
        return Math.ceil(this.config.people.length / 4);
    }
    setConfig(config) {
        if (!config)
            throw new Error("Invalid configuration");
        // Treat config as immutable: create a copy
        const newConfig = {
            size: 100,
            layout: "wrap",
            ...config
        };
        // Migrate 'entity' to 'people' for badge/single compatibility
        if (newConfig.entity && (!newConfig.people || newConfig.people.length === 0)) {
            newConfig.people = [newConfig.entity];
        }
        // Validation
        if (newConfig.size && typeof newConfig.size !== 'number')
            throw new Error("size must be a number");
        if (newConfig.layout && !['wrap', 'horizontal'].includes(newConfig.layout))
            throw new Error("layout must be wrap or horizontal");
        this.config = newConfig;
    }
    _formatDuration(lastChanged) {
        const start = new Date(lastChanged).getTime();
        const now = Date.now();
        const diff = Math.floor((now - start) / 1000); // seconds
        if (diff < 60)
            return `${diff}s`;
        const minutes = Math.floor(diff / 60);
        if (minutes < 60)
            return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24)
            return `${hours}h`;
        const days = Math.floor(hours / 24);
        return `${days}d`;
    }
    render() {
        if (!this.config) {
            return b ``;
        }
        // If hass missing, render empty container to avoid crash but show something if inspected
        if (!this.hass) {
            return b `<ha-card style="padding: 10px;">Loading persons...</ha-card>`;
        }
        const size = this.config.size || 100;
        const isHorizontal = this.config.layout === 'horizontal';
        const showInfo = size >= 50;
        // Ensure people list exists
        const people = this.config.people || [];
        const cardStyle = `
      width: ${size}px;
      height: ${size}px;
      font-size: ${size / 100}em;
    `;
        return b `
      <div class="person-container ${isHorizontal ? 'horizontal' : ''}">
        ${people.map(personId => {
            const entity = this.hass.states[personId];
            if (!entity)
                return b `
            <div class="person-card away" style="${cardStyle}; display: flex; align-items: center; justify-content: center; background-color: #555;">
               <span style="font-size: 0.5em; text-align: center; color: white;">?</span>
            </div>
          `;
            const isHome = entity.state === 'home';
            const entityPicture = entity.attributes.entity_picture;
            const location = entity.state;
            const duration = this._formatDuration(entity.last_changed);
            return b `
            <div class="person-card ${isHome ? 'home' : 'away'}" 
                 style="background-image: url('${entityPicture}'); ${cardStyle}">
              ${showInfo ? b `
              <div class="info">
                <span class="location">${location}</span>
                <span class="duration">${duration}</span>
              </div>` : b ``}
            </div>
          `;
        })}
      </div>
    `;
    }
}
PersonCard.styles = i$3 `
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
  `;
// Debug logging and Robust Registration
console.info("DEBUG: Loading PersonCard module.");
// Explicit global scope access
const registry = window.customElements;
const existingClass = registry.get('slick-person-card');
try {
    if (!existingClass) {
        registry.define('slick-person-card', PersonCard);
        console.info("%c slick-person-card Registered Successfully", "color: green; font-weight: bold;");
    }
    else {
        console.info("slick-person-card already registered.");
    }
}
catch (e) {
    console.error("CRITICAL FAILURE: Failed to register slick-person-card", e);
}
// Global debug helper
window.SlickPersonCard = PersonCard;
class PersonCardEditor extends i {
    static get properties() {
        return {
            hass: { attribute: false },
            _config: { state: true },
        };
    }
    setConfig(config) {
        // Normalize config for editor
        const newConfig = { ...config };
        if (newConfig.entity && (!newConfig.people || newConfig.people.length === 0)) {
            newConfig.people = [newConfig.entity];
        }
        this._config = newConfig;
    }
    _valueChanged(ev) {
        if (!this._config || !this.hass) {
            return;
        }
        const value = ev.detail.value;
        this._config = value;
        const event = new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    render() {
        if (!this.hass || !this._config) {
            return b ``;
        }
        const schema = [
            {
                name: "people",
                label: "People",
                selector: {
                    entity: {
                        domain: ["person", "device_tracker"],
                        multiple: true
                    }
                }
            },
            {
                name: "size",
                label: "Card Size (px)",
                selector: {
                    number: {
                        min: 50,
                        max: 200,
                        mode: "slider"
                    }
                }
            },
            {
                name: "layout",
                label: "Layout",
                selector: {
                    select: {
                        mode: "dropdown",
                        options: [
                            { value: "wrap", label: "Wrap (Grid)" },
                            { value: "horizontal", label: "Horizontal Scroll (Chips)" }
                        ]
                    }
                }
            }
        ];
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${(s) => s.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
}
if (!customElements.get("slick-person-card-editor")) {
    customElements.define("slick-person-card-editor", PersonCardEditor);
}
window.customCards = window.customCards || [];
window.customCards.push({
    type: "slick-person-card",
    name: "Slick Person",
    preview: true,
    description: "A squircle person card with status overlay."
});

/**
 * Lovelace Slick Screen Cards
 * @version 0.1.0
 */
// Import and register all Slick Screen Cards
console.info('%c Lovelace Slick Screen Cards Loaded (v0.1.1) ', 'color: white; background: #607d8b; font-weight: bold;');
//# sourceMappingURL=slick-screen-cards.js.map
