import{L as s}from"./ListModules-7b9e6353.js";import{u as m,h as l,f as r,r as p,o as e,c as u,i as a,g as o,j as t,F as b,k as d}from"./index-2558a67d.js";const E={__name:"MaintenanceView",setup(_){m();const n=l(()=>d().name),c=r([{label:"Tipo pagos",icon:"icon icon-type-money",name:"maintenance-pays"},{label:"Tipo labores",icon:"icon icon-type-labors",name:"maintenance-labors"},{label:"Tipo gastos",icon:"icon icon-cost",name:"maintenance-spents"},{label:"Unidades de medida",icon:"icon icon-search",name:"maintenance-units-measurement"},{label:"EPS",icon:"icon icon-eps",name:"maintenance-eps"},{label:"Lotes",icon:"icon icon-lots",name:"maintenance-lots"},{label:"Etapas",icon:"icon icon-tages",name:"maintenance-stages"},{label:"Finca",icon:"icon icon-create-estate",name:"maintenance-farm"},{label:"Personas",icon:"icon icon-persons",name:"maintenance-people"}]);return(f,g)=>{const i=p("RouterView");return e(),u(b,null,[a(n)=="maintenance"?(e(),o(s,{key:0,title:"MANTENIMIENTO",items:c.value},null,8,["items"])):t("",!0),a(n)!="maintenance"?(e(),o(i,{key:1})):t("",!0)],64)}}};export{E as default};
