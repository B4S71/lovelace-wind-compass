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

export { EnergyFlowCard, EnergyFlowCardEditor };
//# sourceMappingURL=energy-flow-card.js.map
