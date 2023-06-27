import{_ as fe,f as _e,y as me,g as n,z as be,h as H,A as ge,C as qe,r as c,o as V,c as J,a as i,d as e,w as l,i as r,q as D,M as ye,l as K,F as he,S as we,j as q,m as k,t as Ee,k as B,B as X,p as Ve,e as ke,T as Se,U as xe,V as Ie,W as Oe}from"./index-f354315f.js";import{B as Ce}from"./ButtonAdd-9b531d6c.js";const U=S=>(Ve("data-v-19334689"),S=S(),ke(),S),Ae={class:"q-py-sm table-container"},ze={class:"row"},Me=U(()=>i("h6",{class:"title q-my-lg"},"EPS",-1)),Ne={class:"container-content"},De={class:"container-table q-mt-md q-pa-md",rounded:""},Be={class:"accions-td"},Ue={class:"accions-td"},Re=U(()=>i("i",{class:"icon icon-check"},null,-1)),Pe={class:"modal-eps"},Fe={class:"q-my-md text-center"},Te={class:"row q-px-xl"},We={class:"col-12"},je=U(()=>i("span",{class:"text-required q-pb-sm"},[k("Todos los campos con "),i("span",{class:"text-red"},"*"),k(" son obligatorios")],-1)),Ge={class:"row justify-center"},Le={key:0,class:"spinner"},Qe={__name:"Eps",setup(S){const Y=_e(),w=me(),I=n(""),u=n(!1),O=n(!0),g=n([]),E=n([]),R=n(),Z=be(),m=n(!1),P=H(()=>d.value==""?!0:m.value==!0),$=[a=>!!a||"Este campo es requerido"];let v=n(""),b=n("active"),d=n(""),p=n(""),f=n(""),C=n(""),A=n(""),z=n("");const F=n([{name:"id",label:"#",field:"id",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"name",label:"Nombre",field:"name",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"description",label:"Descripción",field:"description",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"observation",label:"Observación",field:"observation",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Acciones",label:"Acciones",field:"acciones",align:"center",sortable:!0,headerStyle:"font-size: var(--font-medium); font-weight: bold;",style:"font-size: var(--font-medium);"}]),ee=a=>{d.value=a},ae=a=>{p.value=a},te=a=>{f.value=a},oe=()=>{I.value="REGISTRAR EPS",le(),O.value=!0,w.toggleModal()},le=()=>{C.value="",A.value="",z.value="",d.value="",p.value="",f.value=""},se=a=>{I.value="EDITAR EPS",O.value=!1,R.value=a._id,C.value=a.name,A.value=a.description,z.value=a.observation,d.value=a.name,p.value=a.description,f.value=a.observation,w.toggleModal()},_=(a,o)=>{Y.notify({type:a,message:o,position:"top"})},y=async()=>{g.value=[],E.value=[],u.value=!0;try{const{eps:a}=await we(h.value);let o=1,x=1;a.forEach(s=>{s.status=s.status?"Inactivo":"Activo",s.status=="Activo"?(s.id=o++,g.value.push(s)):(s.id=x++,E.value.push(s)),s.description=s.description.trim()==""?"No registra":s.description,s.observation=s.observation.trim()==""?"No registra":s.observation}),u.value=!1}catch{u.value=!1,_("negative","Ocurrió un error")}};async function ne(){m.value=!0;try{const a=await Se({name:d.value,description:p.value,observation:f.value},h.value);m.value=!1,_("positive","Eps registrada correctamente"),w.toggleModal(),g.value=[],y()}catch{m.value=!1,_("negative","Ocurrió un error, por favor verifique los datos")}}async function ie(){m.value=!0;try{const a=await xe({id:R.value,name:d.value,description:p.value,observation:f.value},h.value);m.value=!1,_("positive","Eps actualizada correctamente"),w.toggleModal(),g.value=[],y()}catch{m.value=!1,_("negative","Ocurrió un error, por favor verifique los datos")}d.value="",p.value="",f.value=""}async function re(a){u.value=!0;try{const o=await Ie(a,h.value);_("positive","Eps activada correctamente"),u.value=!1,g.value=[],E.value=[],y()}catch{u.value=!1,_("negative","Ocurrió un error")}}async function ce(a){u.value=!1;try{const o=await Oe(a,h.value);u.value=!1,_("positive","Eps desactivada correctamente"),g.value=[],E.value=[],y()}catch{u.value=!1,_("negative","Ocurrió un error")}}const h=H(()=>Z.idSelected);return ge(h,()=>{y()}),qe(()=>{y()}),(a,o)=>{const x=c("q-separator"),s=c("q-tab"),ue=c("q-tabs"),T=c("q-icon"),W=c("q-input"),M=c("q-tooltip"),N=c("q-btn"),j=c("q-btn-group"),G=c("q-table"),L=c("q-tab-panel"),de=c("q-tab-panels"),ve=c("q-card"),pe=c("q-spinner-ios");return V(),J(he,null,[i("div",Ae,[i("div",ze,[i("i",{class:"icon icon-backRoute q-pt-lg",onClick:o[0]||(o[0]=t=>a.$router.back())}),Me]),e(x,{class:"separator"}),i("div",Ne,[e(Ce,{onOnClick:oe,label:"Crear nueva EPS"}),i("div",De,[e(ve,null,{default:l(()=>[e(ue,{modelValue:r(b),"onUpdate:modelValue":o[1]||(o[1]=t=>q(b)?b.value=t:b=t),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:l(()=>[e(s,{name:"active",label:"Activos"}),e(s,{name:"inactive",label:"Inactivos"})]),_:1},8,["modelValue"]),e(x),e(de,{modelValue:r(b),"onUpdate:modelValue":o[4]||(o[4]=t=>q(b)?b.value=t:b=t),animated:""},{default:l(()=>[e(L,{name:"active"},{default:l(()=>[e(G,{flat:"",bordered:"",title:"EPS","row-key":"name",rows:g.value,columns:F.value,filter:r(v),loading:u.value,"rows-per-page-options":[5,10,20]},{"top-right":l(()=>[e(W,{borderless:"",dense:"",debounce:"300",modelValue:r(v),"onUpdate:modelValue":o[2]||(o[2]=t=>q(v)?v.value=t:v=t),placeholder:"Search"},{append:l(()=>[e(T,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":l(t=>[i("td",Be,[e(j,{class:"full-width full-height",outline:"",square:""},{default:l(()=>[e(N,{icon:"edit_note","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:Q=>se(t.row)},{default:l(()=>[e(M,{class:"bg-indigo",offset:[10,10]},{default:l(()=>[k(" Editar ")]),_:1})]),_:2},1032,["onClick"]),e(N,{icon:"highlight_off","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:Q=>ce(t.row._id)},{default:l(()=>[e(M,{class:"bg-indigo",offset:[10,10]},{default:l(()=>[k(" Desactivar ")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1}),e(L,{name:"inactive"},{default:l(()=>[e(G,{flat:"",bordered:"",title:"EPS","row-key":"name",rows:E.value,columns:F.value,filter:r(v),loading:u.value,"rows-per-page-options":[5,10,20]},{"top-right":l(()=>[e(W,{borderless:"",dense:"",debounce:"300",modelValue:r(v),"onUpdate:modelValue":o[3]||(o[3]=t=>q(v)?v.value=t:v=t),placeholder:"Search"},{append:l(()=>[e(T,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":l(t=>[i("td",Ue,[e(j,{class:"full-width full-height",outline:"",square:""},{default:l(()=>[e(N,{"text-color":"blue-10",class:"col q-pa-none",onClick:Q=>re(t.row._id)},{default:l(()=>[Re,e(M,{class:"bg-indigo",offset:[10,10]},{default:l(()=>[k(" Activar ")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1})])])]),r(w).modalIsOpen?(V(),D(ye,{key:0,class:"modal"},{default:l(()=>[i("div",Pe,[i("h6",Fe,Ee(I.value),1),i("div",Te,[i("div",We,[e(B,{label:"Nombre",required:!0,type:"text",ruless:$,value:r(C),modelValue:r(d),"onUpdate:modelValue":o[5]||(o[5]=t=>q(d)?d.value=t:d=t),onOnWrite:ee},null,8,["value","modelValue"]),e(B,{class:"q-mb-md",label:"Descripción",type:"text",required:!1,value:r(A),modelValue:r(p),"onUpdate:modelValue":o[6]||(o[6]=t=>q(p)?p.value=t:p=t),onOnWrite:ae},null,8,["value","modelValue"]),e(B,{class:"q-pb-xs",label:"Observación",type:"text",required:!1,value:r(z),modelValue:r(f),"onUpdate:modelValue":o[7]||(o[7]=t=>q(f)?f.value=t:f=t),onOnWrite:te},null,8,["value","modelValue"]),je,i("div",Ge,[O.value?(V(),D(X,{key:0,disable:r(P),onOnClick:ne},null,8,["disable"])):(V(),D(X,{key:1,disable:r(P),onOnClick:ie},null,8,["disable"]))]),m.value?(V(),J("div",Le,[e(pe,{color:"primary",size:"2.5em"})])):K("",!0)])])])]),_:1})):K("",!0)],64)}}},Ke=fe(Qe,[["__scopeId","data-v-19334689"]]);export{Ke as default};
