import{g as y,na as h,ra as I,ta as v}from"./chunk-37ZJ7F5R.js";import{Db as u,Eb as m,O as s,P as c,U as r,Ub as g,Za as l,_a as a,ba as o,bb as f,mb as p,ob as d}from"./chunk-UGKDFCWG.js";var D=["*"],$={root:"p-inputicon"},C=(()=>{class e extends I{name="inputicon";classes=$;static \u0275fac=(()=>{let i;return function(n){return(i||(i=o(e)))(n||e)}})();static \u0275prov=s({token:e,factory:e.\u0275fac})}return e})(),j=(()=>{class e extends v{styleClass;get hostClasses(){return this.styleClass}_componentStyle=r(C);static \u0275fac=(()=>{let i;return function(n){return(i||(i=o(e)))(n||e)}})();static \u0275cmp=l({type:e,selectors:[["p-inputicon"],["p-inputIcon"]],hostVars:4,hostBindings:function(t,n){t&2&&(d(n.hostClasses),p("p-inputicon",!0))},inputs:{styleClass:"styleClass"},features:[g([C]),f],ngContentSelectors:D,decls:1,vars:0,template:function(t,n){t&1&&(u(),m(0))},dependencies:[y,h],encapsulation:2,changeDetection:0})}return e})(),G=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=a({type:e});static \u0275inj=c({imports:[j,h,h]})}return e})();var B=["*"],z=({dt:e})=>`
.p-iconfield {
    position: relative;
    display: block;
}

.p-inputicon {
    position: absolute;
    top: 50%;
    margin-top: calc(-1 * (${e("icon.size")} / 2));
    color: ${e("iconfield.icon.color")};
    line-height: 1;
}

.p-iconfield .p-inputicon:first-child {
    inset-inline-start: ${e("form.field.padding.x")};
}

.p-iconfield .p-inputicon:last-child {
    inset-inline-end: ${e("form.field.padding.x")};
}

.p-iconfield .p-inputtext:not(:first-child) {
    padding-inline-start: calc((${e("form.field.padding.x")} * 2) + ${e("icon.size")});
}

.p-iconfield .p-inputtext:not(:last-child) {
    padding-inline-end: calc((${e("form.field.padding.x")} * 2) + ${e("icon.size")});
}

.p-iconfield:has(.p-inputfield-sm) .p-inputicon {
    font-size: ${e("form.field.sm.font.size")};
    width: ${e("form.field.sm.font.size")};
    height: ${e("form.field.sm.font.size")};
    margin-top: calc(-1 * (${e("form.field.sm.font.size")} / 2));
}

.p-iconfield:has(.p-inputfield-lg) .p-inputicon {
    font-size: ${e("form.field.lg.font.size")};
    width: ${e("form.field.lg.font.size")};
    height: ${e("form.field.lg.font.size")};
    margin-top: calc(-1 * (${e("form.field.lg.font.size")} / 2));
}
`,x={root:"p-iconfield"},F=(()=>{class e extends I{name="iconfield";theme=z;classes=x;static \u0275fac=(()=>{let i;return function(n){return(i||(i=o(e)))(n||e)}})();static \u0275prov=s({token:e,factory:e.\u0275fac})}return e})();var P=(()=>{class e extends v{iconPosition="left";get _styleClass(){return this.styleClass}styleClass;_componentStyle=r(F);static \u0275fac=(()=>{let i;return function(n){return(i||(i=o(e)))(n||e)}})();static \u0275cmp=l({type:e,selectors:[["p-iconfield"],["p-iconField"],["p-icon-field"]],hostAttrs:[1,"p-iconfield"],hostVars:6,hostBindings:function(t,n){t&2&&(d(n._styleClass),p("p-iconfield-left",n.iconPosition==="left")("p-iconfield-right",n.iconPosition==="right"))},inputs:{iconPosition:"iconPosition",styleClass:"styleClass"},features:[g([F]),f],ngContentSelectors:B,decls:1,vars:0,template:function(t,n){t&1&&(u(),m(0))},dependencies:[y],encapsulation:2,changeDetection:0})}return e})(),ie=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=a({type:e});static \u0275inj=c({imports:[P]})}return e})();export{j as a,G as b,P as c,ie as d};
