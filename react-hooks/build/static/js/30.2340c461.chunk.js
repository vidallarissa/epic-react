/*! For license information please see 30.2340c461.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-hooks"]=this["webpackJsonpreact-hooks"]||[]).push([[30],{183:function(e,t,r){"use strict";e.exports=r(184)},184:function(e,t,r){"use strict";r(53);var n=r(1),o=60103;if(t.Fragment=60107,"function"===typeof Symbol&&Symbol.for){var a=Symbol.for;o=a("react.element"),t.Fragment=a("react.fragment")}var c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,s={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,r){var n,a={},u=null,l=null;for(n in void 0!==r&&(u=""+r),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(l=t.ref),t)i.call(t,n)&&!s.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:o,type:e,key:u,ref:l,props:a,_owner:c.current}}t.jsx=u,t.jsxs=u},213:function(e,t,r){"use strict";r.r(t);var n=r(6),o=r(1),a=r(183);function c(e){var t=e.initialName,r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=o.useState((function(){var r;return null!==(r=window.localStorage.getItem(e))&&void 0!==r?r:t})),a=Object(n.a)(r,2),c=a[0],i=a[1];return o.useEffect((function(){window.localStorage.setItem(e,c)}),[e,c]),[c,i]}("name",void 0===t?"":t),c=Object(n.a)(r,2),i=c[0],s=c[1];return Object(a.jsxs)("div",{children:[Object(a.jsxs)("form",{children:[Object(a.jsx)("label",{htmlFor:"name",children:"Name: "}),Object(a.jsx)("input",{value:i,onChange:function(e){s(e.target.value)},id:"name"})]}),i?Object(a.jsxs)("strong",{children:["Hello ",i]}):"Please type your name"]})}t.default=function(){return Object(a.jsx)(c,{})}}}]);
//# sourceMappingURL=30.2340c461.chunk.js.map