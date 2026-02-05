/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:r,defineProperty:a,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:c,getPrototypeOf:d}=Object,p=globalThis,u=p.trustedTypes,f=u?u.emptyScript:"",_=p.reactiveElementPolyfillSupport,g=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!r(t,e),y={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&a(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);n?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...c(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:m).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=i;const o=n.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const o=this.constructor;if(!1===i&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??$)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,_?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v=globalThis,A=t=>t,w=v.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,P=`<${C}>`,z=document,N=()=>z.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,M=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),I=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,V=z.createTreeWalker(z,129);function q(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const G=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=k;for(let e=0;e<s;e++){const s=t[e];let a,h,l=-1,c=0;for(;c<s.length&&(r.lastIndex=c,h=r.exec(s),null!==h);)c=r.lastIndex,r===k?"!--"===h[1]?r=H:void 0!==h[1]?r=R:void 0!==h[2]?(j.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=M):void 0!==h[3]&&(r=M):r===M?">"===h[0]?(r=n??k,l=-1):void 0===h[1]?l=-2:(l=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?M:'"'===h[3]?L:D):r===L||r===D?r=M:r===H||r===R?r=k:(r=M,n=void 0);const d=r===M&&t[e+1].startsWith("/>")?" ":"";o+=r===k?s+P:l>=0?(i.push(a),s.slice(0,l)+E+s.slice(l)+S+d):s+S+(-2===l?e:d)}return[q(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,l]=G(t,e);if(this.el=Z.createElement(h,s),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=l[o++],s=i.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:s,ctor:"."===r[1]?Y:"?"===r[1]?tt:"@"===r[1]?et:Q}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],N()),V.nextNode(),a.push({type:2,index:++n});i.append(t[e],N())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const s=z.createElement("template");return s.innerHTML=t,s}}function J(t,e,s=t,i){if(e===I)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const o=O(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,i)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??z).importNode(e,!0);V.currentNode=i;let n=V.nextNode(),o=0,r=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=s[++r]}o!==a?.index&&(n=V.nextNode(),o++)}return V.currentNode=z,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(q(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new K(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new X(this.O(N()),this.O(N()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=J(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=J(this,i[s+r],e,r),a===I&&(a=this._$AH[r]),o||=!O(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Y extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class et extends Q{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??W)===I)return;const s=this._$AH,i=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const it=v.litHtmlPolyfillSupport;it?.(Z,X),(v.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new X(e.insertBefore(N(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const rt=nt.litElementPolyfillSupport;rt?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");console.info("%c PROTECT-SENSOR-CARD %c 0.1.0 ","color: white; background: #00acc1; font-weight: 700;","color: #00acc1; background: white; font-weight: 700;");class at extends ot{static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static getConfigElement(){return document.createElement("slick-protect-sensor-editor")}static getStubConfig(t){return{type:"custom:slick-protect-sensor-card",sensors:[{binary_entity:"binary_sensor.example_window",temp_entity:"sensor.example_temp",type:"window"}],size:100,layout:"wrap"}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={size:100,layout:"wrap",sensors:[],...t};if(e.sensors&&!Array.isArray(e.sensors)&&"object"==typeof e.sensors){const t=Object.keys(e.sensors).map(t=>e.sensors[t]),s=t.filter(t=>t&&(t.binary_entity||t.device_id||t.type));if(s.length>0)e.sensors=s;else{const t=e.sensors;t.binary_entity||t.device_id?e.sensors=[t]:e.sensors=[]}}if(e.size&&"number"!=typeof e.size)throw new Error("size must be a number");if(e.layout&&!["wrap","horizontal"].includes(e.layout))throw new Error("layout must be wrap or horizontal");this.config=e}_getTempColor(t,e){const s=null!=e?e:21;return t<s-1?"#4fc3f7":t>s+1?"#ffb74d":"#81c784"}render(){if(!this.config||!this.hass)return B``;const{sensors:t,size:e,layout:s,main_climate_entity:i}=this.config,n="horizontal"===s,o=`\n      width: ${e}px;\n      height: ${e}px;\n      font-size: ${e/100}em;\n    `;let r;if(i&&this.hass.states[i]){const t=this.hass.states[i],e=parseFloat(t.attributes.temperature);if(isNaN(e)){const e=parseFloat(t.attributes.target_temp_low),s=parseFloat(t.attributes.target_temp_high);isNaN(e)||isNaN(s)||(r=(e+s)/2)}else r=e}const a=Array.isArray(t)?t:[];return B`
      <div class="sensor-container ${n?"horizontal":""}">
        ${a.map(t=>this._renderSensor(t,o,r))}
      </div>
    `}_renderSensor(t,e,s){let i,n=null,o=t.name;if(t.device_id&&(!t.binary_entity||t.temp_entity),t.binary_entity&&(n=this.hass.states[t.binary_entity]),!n)return t.device_id?B`
                <div class="sensor-card closed" style="${e}">
                    <ha-icon icon="mdi:check-network-outline"></ha-icon>
                    <div class="name">Dev: ${t.device_id.substr(0,4)}</div>
                </div>
            `:B`
            <div class="sensor-card error" style="${e}">
                <ha-icon icon="mdi:alert-circle"></ha-icon>
            </div>
        `;const r="on"===n.state;if(o=o||n.attributes.friendly_name||t.binary_entity,t.temp_entity&&this.hass.states[t.temp_entity]){const e=parseFloat(this.hass.states[t.temp_entity].state);isNaN(e)||(i=e)}const a=void 0!==i?this._getTempColor(i,s):"#2c2c2c",h=(t.lights||[]).some(t=>{const e=this.hass.states[t];return e&&"on"===e.state});return B`
        <div class="sensor-card ${r?"open":"closed"} ${t.type||"wall"}" style="${e}; --temp-color: ${a}">
            
            <!-- Light Gradient Effect -->
            ${h?B`<div class="light-gradient"></div>`:""}

            <!-- Content (Name • Temp) -->
            <div class="temp-indicator">
                ${o||""}
                ${o&&void 0!==i?" • ":""}
                ${void 0!==i?i.toFixed(1)+"°":""}
            </div>
        </div>
    `}}at.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(i,t,s)})`
    :host {
      display: inline-flex;
      vertical-align: top;
    }
    .sensor-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: flex-start;
    }
    .sensor-container.horizontal {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 4px; 
      scrollbar-width: none; 
    }
    .sensor-container.horizontal::-webkit-scrollbar { 
      display: none; 
    }
    
    .sensor-card {
      position: relative;
      /* width & height set by inline style */
      flex-shrink: 0;
      border-radius: var(--ha-card-border-radius, 12px);
      
      /* New Background Logic: Flat color to avoid corner glows */
      background: color-mix(in srgb, var(--temp-color), #141414 85%);
      
      overflow: hidden;
      /* Outer shadow + Inner shining border */
      box-shadow: var(--ha-card-box-shadow, 0 4px 8px rgba(0,0,0,0.3)), 
                  inset 0 0 0 1px rgba(255,255,255,0.1), 
                  inset 0 0 12px 2px rgba(255,255,255,0.2);
                  
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: none;
    }
    
    /* Content sits ON TOP of glass? No, behind to get blurred? 
       "blur all if.. closed". So text must be BEHIND glass.
       But if text is behind glass, it's hard to read.
       Let's put content at Z-index 0 (behind glass) but make it white/contrasty.
    */
    .content {
        position: relative;
        z-index: 0; 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding-bottom: 20px; 
        color: white;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }
    
    .temp-indicator {
        position: absolute;
        bottom: 6px;
        right: 8px;
        z-index: 2;
        font-size: 13px;
        font-weight: 500;
        color: rgba(255,255,255,0.95);
        text-shadow: 0 1px 2px rgba(0,0,0,0.6);
        text-align: right;
        max-width: 85%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Dynamic icon sizing based on font-size from parent style */
    


    /* Light Gradient Effect */
    .light-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0; /* Behind glass (z=1) */
        /* Radial gradient from TOP CENTER outwards */
        background: radial-gradient(
            circle at 50% 0%, 
            rgba(255, 230, 160, 0.7) 0%, 
            rgba(255, 230, 160, 0.2) 60%, 
            transparent 80%
        );
        pointer-events: none;
        transition: opacity 0.5s ease;
    }

    /* Dynamic icon sizing based on font-size from parent style */
    
    /* Allow icon to be "CLEAR" when glass moves away */
    /* When glass moves left, right side is exposed.
       We should position content so it gets exposed?
       Center content is still half-covered.
       Maybe we shift content to the right when open?
    */
    
    .sensor-card.open .content {
        /* subtle shift to exposed area? */
        transform: translateX(10%);
        transition: transform 0.6s ease;
    }
    
    /* Dynamic icon sizing based on font-size from parent style */
    .sensor-card[style*="font-size: 0.5"] .lights-container ha-icon { --mdc-icon-size: 16px; }
    .sensor-card[style*="font-size: 1"] .lights-container ha-icon { --mdc-icon-size: 24px; }
    .sensor-card[style*="font-size: 1.5"] .lights-container ha-icon { --mdc-icon-size: 32px; }

    .name {
      font-size: 12px;
      text-align: center;
      padding: 0 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      opacity: 0.9;
      font-weight: 500;
    }

    .sensor-card.error {
        background: #ef5350;
    }
        color: #ef5350;
    }
  `;customElements.define("slick-protect-sensor-card",at),customElements.define("slick-protect-sensor-editor",class extends ot{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){this._config=t}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.detail.value;this._config={...this._config,...e},this._fireConfigChanged()}_fireConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}_sensorChanged(t,e){if(!this._config||!this._config.sensors)return;const s=[...this._config.sensors||[]],i=e.detail.value;s[t]=i,this._config={...this._config,sensors:s},this._fireConfigChanged()}_addSensor(){const t=[...this._config.sensors||[],{type:"window"}];this._config={...this._config,sensors:t},this._fireConfigChanged()}_removeSensor(t){const e=[...this._config.sensors||[]];e.splice(t,1),this._config={...this._config,sensors:e},this._fireConfigChanged()}render(){if(!this.hass||!this._config)return B``;const t=[{name:"binary_entity",label:"Contact (Binary) Sensor",selector:{entity:{domain:"binary_sensor"}}},{name:"temp_entity",label:"Temperature Sensor",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"lights",label:"Lights Behind Glass",selector:{entity:{domain:"light",multiple:!0}}},{name:"name",label:"Override Name",selector:{text:{}}},{name:"type",label:"Type",selector:{select:{options:[{value:"window",label:"Window"},{value:"door",label:"Door"},{value:"wall",label:"Wall"}]}}}],e=Array.isArray(this._config.sensors)?this._config.sensors:[];return B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"main_climate_entity",label:"Main Climate Entity",selector:{entity:{domain:"climate"}}},{name:"size",label:"Card Size (px)",selector:{number:{min:50,max:200,mode:"slider"}}},{name:"layout",label:"Layout",selector:{select:{mode:"dropdown",options:[{value:"wrap",label:"Wrap"},{value:"horizontal",label:"Horizontal"}]}}}]}
        .computeLabel=${t=>t.label}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="sensors-list">
          <h3>Sensors</h3>
          ${e.map((e,s)=>B`
            <div class="sensor-editor-item" style="border: 1px solid var(--divider-color); padding: 10px; margin-bottom: 10px; border-radius: 4px;">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: bold;">Sensor ${s+1}</span>
                  <div>
                    <ha-icon-button icon="mdi:delete" @click=${()=>this._removeSensor(s)} style="color: var(--error-color);"></ha-icon-button>
                  </div>
               </div>
               <ha-form
                    .hass=${this.hass}
                    .data=${e}
                    .schema=${t}
                    .computeLabel=${t=>t.label}
                    @value-changed=${t=>this._sensorChanged(s,t)}
                ></ha-form>
            </div>
          `)}
          
          <button @click=${this._addSensor} style="background: var(--primary-color); color: var(--text-primary-color); border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
             + Add Sensor
          </button>
      </div>
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"slick-protect-sensor-card",name:"Slick Protect Sensor",preview:!0,description:"Display Unifi Protect sensors with temp and state."});export{at as ProtectSensorCard};
//# sourceMappingURL=protect-sensor-card.js.map
