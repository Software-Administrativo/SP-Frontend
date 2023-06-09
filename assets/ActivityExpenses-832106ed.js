import{l as C,s as S,_ as _e,m as ye,q as ge,g as i,v as be,f as X,x as he,y as xe,r as d,o as V,c as Y,a as r,d as e,w as n,h as c,i as R,M as qe,j as Z,F as we,z as w,A as I,t as Ae,B as U,C as ee,p as ke,e as Ee}from"./index-32fd2e15.js";import{B as Ve}from"./ButtonAdd-37f41b44.js";const Ie=async l=>{try{const u=C(),{data:s}=await S.get("/costs/activityexpenses",{headers:{token:u,farm:l}});return s}catch(u){return u}},Ce=async(l,u)=>{try{const s=C(),{data:v}=await S.post("/costs/activityexpenses/register",{name:l.name,description:l.description,worth:l.worth},{headers:{token:s,farm:u}});return v}catch(s){return s}},Se=async(l,u)=>{try{const s=C(),{data:v}=await S.put(`/costs/activityexpenses/update/${l.id}`,{name:l.name,description:l.description,worth:l.worth},{headers:{token:s,farm:u}});return v}catch(s){return s}},De=async(l,u)=>{try{const s=C(),{data:v}=await S.put(`/costs/activityexpenses/inactivate/${l}`,{},{headers:{token:s,farm:u}});return v}catch(s){return s}},Oe=async(l,u)=>{try{const s=C(),{data:v}=await S.put(`/costs/activityexpenses/activate/${l}`,{},{headers:{token:s,farm:u}});return v}catch(s){return s}};const F=l=>(ke("data-v-a1c3a33d"),l=l(),Ee(),l),ze={class:"q-py-sm table-container"},Ge={class:"row"},Be=F(()=>r("h6",{class:"title q-my-lg"},"Gastos de Actividades",-1)),Ne={class:"container-content"},Te={class:"container-table q-mt-md q-pa-md",rounded:""},Me={class:"accions-td"},Re={class:"accions-td"},Ue=F(()=>r("i",{class:"icon icon-check"},null,-1)),Fe={class:"modal-activity"},We={class:"q-my-md text-center"},je={class:"row q-px-xl"},$e={class:"col-12"},Le=F(()=>r("span",{class:"text-required q-pb-sm"},[I("Todos los campos con "),r("span",{class:"text-red"},"*"),I(" son obligatorios")],-1)),Qe={class:"row justify-center"},He={key:0,class:"spinner"},Je={__name:"ActivityExpenses",setup(l){const u=ye(),s=ge(),v=i(""),p=i(!1),O=i(!0),q=i([]),E=i([]),W=i(),te=be(),h=i(!1),j=X(()=>f.value==""||_.value==""||m.value==""?!0:h.value==!0),z=[t=>!!t||"Este campo es requerido"];let y=i(""),x=i("active"),f=i(""),m=i(""),_=i(""),G=i(""),B=i(""),N=i("");const $=i([{name:"id",label:"#",field:"id",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"name",label:"Nombre",field:"name",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"description",label:"Descripción",field:"description",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"worth",label:"Valor",field:"worth",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Acciones",label:"Acciones",field:"acciones",align:"center",sortable:!0,headerStyle:"font-size: var(--font-medium); font-weight: bold;",style:"font-size: var(--font-medium);"}]),ae=t=>{f.value=t},oe=t=>{m.value=t},se=t=>{_.value=t},ne=()=>{v.value="REGISTRAR GASTO DE ACITIVIDAD",le(),O.value=!0,s.toggleModal()},le=()=>{G.value="",B.value="",N.value="",f.value="",m.value="",_.value=""},ie=t=>{v.value="EDITAR GASTO DE ACTIVIDAD",O.value=!1,W.value=t._id,G.value=t.name,B.value=t.description,N.value=t.worth,f.value=t.name,m.value=t.description,_.value=t.worth,s.toggleModal()},b=(t,o)=>{u.notify({type:t,message:o,position:"top"})},A=async()=>{q.value=[],E.value=[],p.value=!0;try{const{activityexpenses:t}=await Ie(k.value);let o=1,D=1;t.forEach(g=>{g.status=g.status?"Inactivo":"Activo",g.status=="Activo"?(g.id=o++,q.value.push(g)):(g.id=D++,E.value.push(g))}),p.value=!1}catch{p.value=!1,b("negative","Ocurrió un error")}};async function re(){h.value=!0;try{const t=await Ce({name:f.value,description:m.value,worth:_.value},k.value);h.value=!1,b("positive","Gasto de actividad registrado correctamente"),s.toggleModal(),q.value=[],A()}catch{h.value=!1,b("negative","Ocurrió un error, por favor verifique los datos")}}async function ce(){h.value=!0;try{const t=await Se({id:W.value,name:f.value,description:m.value,worth:_.value},k.value);h.value=!1,b("positive","Gasto de actividad actualizado correctamente"),s.toggleModal(),q.value=[],A()}catch{h.value=!1,b("negative","Ocurrió un error, por favor verifique los datos")}f.value="",m.value="",_.value=""}async function ue(t){p.value=!0;try{const o=await Oe(t,k.value);b("positive","Gasto de actividad activado correctamente"),p.value=!1,q.value=[],E.value=[],A()}catch{p.value=!1,b("negative","Ocurrió un error")}}async function de(t){p.value=!1;try{const o=await De(t,k.value);p.value=!1,b("positive","Gasto de actividad desactivado correctamente"),q.value=[],E.value=[],A()}catch{p.value=!1,b("negative","Ocurrió un error")}}const k=X(()=>te.idSelected);return he(k,()=>{A()}),xe(()=>{A()}),(t,o)=>{const D=d("q-separator"),g=d("q-tab"),ve=d("q-tabs"),L=d("q-icon"),Q=d("q-input"),T=d("q-tooltip"),M=d("q-btn"),H=d("q-btn-group"),J=d("q-table"),K=d("q-tab-panel"),pe=d("q-tab-panels"),fe=d("q-card"),me=d("q-spinner-ios");return V(),Y(we,null,[r("div",ze,[r("div",Ge,[r("i",{class:"icon icon-backRoute q-pt-lg",onClick:o[0]||(o[0]=a=>t.$router.back())}),Be]),e(D,{class:"separator"}),r("div",Ne,[e(Ve,{onOnClick:ne,label:"Crear nuevo gasto de actividad"}),r("div",Te,[e(fe,null,{default:n(()=>[e(ve,{modelValue:c(x),"onUpdate:modelValue":o[1]||(o[1]=a=>w(x)?x.value=a:x=a),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:n(()=>[e(g,{name:"active",label:"Activos"}),e(g,{name:"inactive",label:"Inactivos"})]),_:1},8,["modelValue"]),e(D),e(pe,{modelValue:c(x),"onUpdate:modelValue":o[4]||(o[4]=a=>w(x)?x.value=a:x=a),animated:""},{default:n(()=>[e(K,{name:"active"},{default:n(()=>[e(J,{flat:"",bordered:"",title:"Gastos de Actividades","row-key":"name",rows:q.value,columns:$.value,filter:c(y),loading:p.value,"rows-per-page-options":[5,10,20]},{"top-right":n(()=>[e(Q,{borderless:"",dense:"",debounce:"300",modelValue:c(y),"onUpdate:modelValue":o[2]||(o[2]=a=>w(y)?y.value=a:y=a),placeholder:"Search"},{append:n(()=>[e(L,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":n(a=>[r("td",Me,[e(H,{class:"full-width full-height",outline:"",square:""},{default:n(()=>[e(M,{icon:"edit_note","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:P=>ie(a.row)},{default:n(()=>[e(T,{class:"bg-indigo",offset:[10,10]},{default:n(()=>[I(" Editar ")]),_:1})]),_:2},1032,["onClick"]),e(M,{icon:"highlight_off","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:P=>de(a.row._id)},{default:n(()=>[e(T,{class:"bg-indigo",offset:[10,10]},{default:n(()=>[I(" Desactivar ")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1}),e(K,{name:"inactive"},{default:n(()=>[e(J,{flat:"",bordered:"",title:"Gastos de Actividades","row-key":"name",rows:E.value,columns:$.value,filter:c(y),loading:p.value,"rows-per-page-options":[5,10,20]},{"top-right":n(()=>[e(Q,{borderless:"",dense:"",debounce:"300",modelValue:c(y),"onUpdate:modelValue":o[3]||(o[3]=a=>w(y)?y.value=a:y=a),placeholder:"Search"},{append:n(()=>[e(L,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":n(a=>[r("td",Re,[e(H,{class:"full-width full-height",outline:"",square:""},{default:n(()=>[e(M,{"text-color":"blue-10",class:"col q-pa-none",onClick:P=>ue(a.row._id)},{default:n(()=>[Ue,e(T,{class:"bg-indigo",offset:[10,10]},{default:n(()=>[I(" Activar ")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1})])])]),c(s).modalIsOpen?(V(),R(qe,{key:0,class:"modal"},{default:n(()=>[r("div",Fe,[r("h6",We,Ae(v.value),1),r("div",je,[r("div",$e,[e(U,{label:"Nombre",required:!0,type:"text",ruless:z,value:c(G),modelValue:c(f),"onUpdate:modelValue":o[5]||(o[5]=a=>w(f)?f.value=a:f=a),onOnWrite:ae},null,8,["value","modelValue"]),e(U,{class:"q-mb-md",label:"Descripción",required:!0,type:"text",ruless:z,value:c(B),modelValue:c(m),"onUpdate:modelValue":o[6]||(o[6]=a=>w(m)?m.value=a:m=a),onOnWrite:oe},null,8,["value","modelValue"]),e(U,{class:"q-pb-xs",label:"Valor",required:!0,type:"text",ruless:z,value:c(N),modelValue:c(_),"onUpdate:modelValue":o[7]||(o[7]=a=>w(_)?_.value=a:_=a),onOnWrite:se},null,8,["value","modelValue"]),Le,r("div",Qe,[O.value?(V(),R(ee,{key:0,disable:c(j),onOnClick:re},null,8,["disable"])):(V(),R(ee,{key:1,disable:c(j),onOnClick:ce},null,8,["disable"]))]),h.value?(V(),Y("div",He,[e(me,{color:"primary",size:"2.5em"})])):Z("",!0)])])])]),_:1})):Z("",!0)],64)}}},Xe=_e(Je,[["__scopeId","data-v-a1c3a33d"]]);export{Xe as default};
