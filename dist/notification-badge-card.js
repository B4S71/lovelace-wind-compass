/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:r,defineProperty:a,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:c,getPrototypeOf:d}=Object,p=globalThis,u=p.trustedTypes,$=u?u.emptyScript:"",f=p.reactiveElementPolyfillSupport,g=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},m=(t,e)=>!r(t,e),y={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:m};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&a(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);n?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...c(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const o=n.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const o=this.constructor;if(!1===i&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??m)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,f?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,v=t=>t,E=A.trustedTypes,w=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,P=`<${C}>`,U=document,T=()=>U.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,D=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,q=U.createTreeWalker(U,129);function F(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<s;e++){const s=t[e];let a,h,l=-1,c=0;for(;c<s.length&&(r.lastIndex=c,h=r.exec(s),null!==h);)c=r.lastIndex,r===N?"!--"===h[1]?r=H:void 0!==h[1]?r=R:void 0!==h[2]?(j.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=D):void 0!==h[3]&&(r=D):r===D?">"===h[0]?(r=n??N,l=-1):void 0===h[1]?l=-2:(l=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?D:'"'===h[3]?L:z):r===L||r===z?r=D:r===H||r===R?r=N:(r=D,n=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===N?s+P:l>=0?(i.push(a),s.slice(0,l)+x+s.slice(l)+S+d):s+S+(-2===l?e:d)}return[F(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,l]=Y(t,e);if(this.el=J.createElement(h,s),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=q.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(x)){const e=l[o++],s=i.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:s,ctor:"."===r[1]?X:"?"===r[1]?tt:"@"===r[1]?et:Q}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],T()),q.nextNode(),a.push({type:2,index:++n});i.append(t[e],T())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function K(t,e,s=t,i){if(e===B)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const o=k(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=K(t,n._$AS(t,e.values),n,i)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);q.currentNode=i;let n=q.nextNode(),o=0,r=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new G(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=s[++r]}o!==a?.index&&(n=q.nextNode(),o++)}return q.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),k(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Z(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new G(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=v(t).nextSibling;v(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=K(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=K(this,i[s+r],e,r),a===B&&(a=this._$AH[r]),o||=!k(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class et extends Q{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??W)===B)return;const s=this._$AH,i=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const it=A.litHtmlPolyfillSupport;it?.(J,G),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new G(e.insertBefore(T(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const rt=nt.litElementPolyfillSupport;rt?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");console.info("%c NOTIFICATION-BADGE-CARD %c 0.1.0 ","color: white; background: #e91e63; font-weight: 700;","color: #e91e63; background: white; font-weight: 700;");class at extends ot{static get properties(){return{hass:{attribute:!1},config:{state:!0}}}static getConfigElement(){return document.createElement("slick-notification-badge-card-editor")}static getStubConfig(){return{type:"custom:slick-notification-badge-card",calendars:[],entities:[]}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=t}_getDaysUntil(t){const e=new Date,s=new Date(t),i=new Date(e.getFullYear(),e.getMonth(),e.getDate()),n=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime()-i.getTime();return Math.ceil(n/864e5)}_handleEntityTap(t){this.hass.callService("homeassistant","turn_off",{entity_id:t})}_handleCalendarTap(t){const e=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){if(!this.config||!this.hass)return I``;const t=[],e=[];this.config.calendars&&this.config.calendars.forEach(e=>{var s;const i=this.hass.states[e.entity];if(!i)return;const n=i.attributes.start_time;if(!n)return;const o=this._getDaysUntil(n),r=null!==(s=e.days)&&void 0!==s?s:7;if(o>=0&&o<=r){const s=(i.attributes.message||"").toLowerCase();let n=e.color||"var(--primary-color)";if(e.rules)for(const t of e.rules)if(s.includes(t.pattern.toLowerCase())){n=t.color;break}t.push({type:"calendar",entity:e.entity,icon:e.icon||"mdi:calendar",label:0===o?"":o.toString(),color:n,active:!0,title:i.attributes.message,entityPicture:null})}}),this.config.entities&&this.config.entities.forEach(t=>{const s=this.hass.states[t.entity];if(s&&("on"===s.state||"active"===s.state||"home"===s.state)){const i=!!s.attributes.entity_picture;e.push({type:"entity",entity:t.entity,icon:t.icon||s.attributes.icon||"mdi:alert-circle",label:"",color:t.color||"#ff9800",active:!0,title:s.attributes.friendly_name,entityPicture:i?s.attributes.entity_picture:null})}});const s=[...e,...t];return 0===s.length?I``:I`
      <div class="badge-container">
        ${s.map(t=>I`
            <div class="badge ${t.type}" 
                 style="background: ${t.color}; border-color: ${t.color}"
                 title="${t.title} (${t.entity})"
                 @click=${()=>"entity"===t.type?this._handleEntityTap(t.entity):this._handleCalendarTap(t.entity)}>
               
               ${t.entityPicture?I`
                   <div class="badge-icon-img" style="background-image: url('${t.entityPicture}')"></div>
               `:I`
                   <ha-icon icon="${t.icon}" style="color: white; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));"></ha-icon>
               `}

               ${t.label?I`<div class="badge-label">${t.label}</div>`:""}
            </div>
        `)}
      </div>
    `}}at.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(i,t,s)})`
    :host {
      display: block;
    }
    
    .badge-container {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        justify-content: flex-end; /* Align right */
        margin-left: 12px;
        margin-bottom: 12px;
        padding-bottom: 4px; /* Extra shadow space */
    }
    
    .badge {
        position: relative;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        /* Default fallback */
        background: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: transform 0.2s, opacity 0.2s;
        border: 1px solid transparent;
        box-sizing: border-box;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }
    
    /* Make entities feel more solid/pronounced */
    .badge.entity {
        z-index: 2;
        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }
    
    /* Make calendars slightly translucent */
    .badge.calendar {
       opacity: 0.85; 
    }
    
    .badge:active {
        transform: scale(0.95);
    }
    
    .badge:hover {
        filter: brightness(1.1);
    }
    
    .badge-icon-img {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
    }
    
    .badge-label {
        position: absolute;
        top: 2px;
        right: 2px;
        background: white;
        color: #333;
        font-size: 0.7rem;
        font-weight: 900;
        min-width: 16px;
        height: 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        z-index: 5;
    }
    
    ha-icon {
        --mdc-icon-size: 24px;
    }
  `;class ht extends ot{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){this._config=t}_valueChanged(t){const e={...this._config,...t.detail.value},s=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){if(!this.hass||!this._config)return I``;return I`
      <div style="padding: 16px;">
        <p><strong>Note:</strong> This card is best configured via YAML for multiple lists.</p>
        <ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${[{name:"calendars",label:"Calendars",selector:{object:{schema:[{name:"entity",label:"Entity",selector:{entity:{domain:"calendar"}}},{name:"icon",label:"Icon",selector:{icon:{}}},{name:"days",label:"Days Lookahead",selector:{number:{min:1,max:365}}}]}}},{name:"entities",label:"Entities",selector:{object:{schema:[{name:"entity",label:"Entity",selector:{entity:{}}},{name:"icon",label:"Icon Override",selector:{icon:{}}},{name:"color",label:"Color (Active)",selector:{text:{}}}]}}}]}
            .computeLabel=${t=>t.label}
            @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}}customElements.define("slick-notification-badge-card",at),customElements.define("slick-notification-badge-card-editor",ht),window.customBadges=window.customBadges||[],window.customBadges.push({type:"slick-notification-badge-card",name:"Slick Notification Badge Card",preview:!0,description:"Displays badges for calendar events and active entities."});export{at as NotificationBadgeCard,ht as NotificationBadgeCardEditor};
//# sourceMappingURL=notification-badge-card.js.map
