import{o as t,c as e,w as a,g as i,t as s,B as n,m as l,s as r,q as o}from"./index-BwW5oSo7.js";import{_ as u}from"./apis.-Vii-PU-.js";const d=u({name:"UniTag",emits:["click"],props:{type:{type:String,default:"default"},size:{type:String,default:"normal"},text:{type:String,default:""},disabled:{type:[Boolean,String],default:!1},inverted:{type:[Boolean,String],default:!1},circle:{type:[Boolean,String],default:!1},mark:{type:[Boolean,String],default:!1},customStyle:{type:String,default:""}},computed:{classes(){const{type:t,disabled:e,inverted:a,circle:i,mark:s,size:n,isTrue:l}=this;return["uni-tag--"+t,"uni-tag--"+n,l(e)?"uni-tag--disabled":"",l(a)?"uni-tag--"+t+"--inverted":"",l(i)?"uni-tag--circle":"",l(s)?"uni-tag--mark":"",l(a)?"uni-tag--inverted uni-tag-text--"+t:"","small"===n?"uni-tag-text--small":""].join(" ")}},methods:{isTrue:t=>!0===t||"true"===t,onClick(){this.isTrue(this.disabled)||this.$emit("click")}}},[["render",function(u,d,c,g,m,p){const y=o;return c.text?(t(),e(y,{key:0,class:n(["uni-tag",p.classes]),style:l(c.customStyle),onClick:p.onClick},{default:a((()=>[i(s(c.text),1)])),_:1},8,["class","style","onClick"])):r("",!0)}],["__scopeId","data-v-9f3c5d16"]]);export{d as _};