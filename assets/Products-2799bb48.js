import{l as I,s as C,_ as ye,q as he,g as u,v as qe,f as Z,m as ke,x as we,y as Pe,r as v,o as O,c as ee,a as d,d as a,w as s,h as i,i as j,M as Ve,j as te,F as xe,G as Oe,z as q,A as S,t as Se,B as W,E as Ie,C as ae,p as Ce,e as Re,R as oe}from"./index-32fd2e15.js";import{B as Ae}from"./ButtonAdd-37f41b44.js";const Ee=async l=>{try{const c=I(),{data:n}=await C.get("/inventory/product",{headers:{token:c,farm:l}});return n}catch(c){return c}},ze=async(l,c)=>{try{const n=I(),{data:r}=await C.post("/inventory/product/register",{name:l.name,category:l.category,mark:l.mark,amount:l.amount,description:l.description},{headers:{token:n,farm:c}});return r}catch(n){return n}},De=async(l,c)=>{try{const n=I(),{data:r}=await C.put(`/inventory/product/update/${l.id}`,{name:l.name,category:l.category,brand:l.brand,amount:l.amount,description:l.description},{headers:{token:n,farm:c}});return r}catch(n){return n}},Ne=async(l,c)=>{try{const n=I(),{data:r}=await C.put(`/inventory/product/inactivate/${l}`,{},{headers:{token:n,farm:c}});return r}catch(n){return n}},Be=async(l,c)=>{try{const n=I(),{data:r}=await C.put(`/inventory/product/activate/${l}`,{},{headers:{token:n,farm:c}});return r}catch(n){return n}};const $=l=>(Ce("data-v-6f5a5505"),l=l(),Re(),l),Ue={class:"q-py-md table-container"},Me={class:"row"},Te=$(()=>d("h6",{class:"title q-my-lg"},"PRODUCTOS",-1)),Fe={class:"container-content"},je={class:"container-table q-mt-md q-pa-md",rounded:""},We={class:"accions-td"},$e={class:"accions-td"},Ge=$(()=>d("i",{class:"icon icon-check"},null,-1)),Le={class:"modal-products"},Qe={class:"q-my-md text-center"},He={class:"row q-px-xl"},Je={class:"col-12"},Ke=$(()=>d("span",{class:"text-required q-pb-sm"},[S("Todos los campos con "),d("span",{class:"text-red"},"*"),S(" son obligatorios")],-1)),Xe={class:"row justify-center"},Ye={key:0,class:"spinner"},Ze={__name:"Products",setup(l){const c=he(),n=u(""),r=u(!1),D=u(!0),k=u([]),V=u([]),G=u(),le=qe(),w=u(!1),L=Z(()=>!f.value||!b.value||!_.value||!g.value?!0:w.value==!0),R=[e=>!!e||"Este campo es requerido"];let m=u(""),f=u(""),_=u(""),g=u(""),b=u(""),N=u(""),B=u(""),U=u(""),M=u(""),h=u("active");const ne=ke(),Q=u([{name:"id",label:"#",field:"id",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"name",label:"Nombre",field:"name",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"mark",label:"Marca",field:"mark",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"amount",label:"Cantidad",field:"amount",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"description",label:"Descripción",field:"description",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Acciones",label:"Acciones",field:"acciones",align:"center",sortable:!0,headerStyle:"font-size: var(--font-medium); font-weight: bold;",style:"font-size: var(--font-medium);"}]),se=e=>{f.value=e},re=e=>{_.value=e},ue=e=>{b.value=e},ce=e=>{g.value=e},ie=()=>{n.value="REGISTRAR PRODUCTOS",N.value="",B.value="",U.value="",M.value="",D.value=!0,c.toggleModal(),f.value="",b.value="",_.value="",g.value=""},de=e=>{n.value="EDITAR PRODUCTOS",D.value=!1,G.value=e._id,N.value=e.name,B.value=e.mark,U.value=e.amount,M.value=e.description,f.value=e.name,b.value=e.description,_.value=e.brand,g.value=e.amount,c.toggleModal()},y=(e,o)=>{ne.notify({type:e,message:o,position:"top"})},x=async()=>{k.value=[],V.value=[],r.value=!0;try{const{product:e}=await Ee(P.value),{mark:o}=await Oe(P.value);let A=1,E=1;e.forEach(p=>{p.status=p.status?"Inactivo":"Activo",p.mark=o.find(z=>z._id==p.mark).name,p.status=="Activo"?(p.id=A++,k.value.push(p)):(p.id=E++,V.value.push(p))}),r.value=!1}catch{r.value=!1,y("negative","Ocurrió un error")}};async function ve(){w.value=!0,(await ze({name:f.value,mark:_.value,amount:g.value,description:b.value==""?"No registra":b.value},P.value)).msg!=oe.ERROROPERATION?(w.value=!1,y("positive","Producto registrado correctamente"),c.toggleModal(),k.value=[],x()):(w.value=!1,y("negative","Ocurrió un error"))}async function pe(){w.value=!0;const e=await De({id:G.value,name:f.value,brand:_.value,amount:g.value},P.value);w.value=!1,e.msg!=oe.ERROROPERATION?(y("positive","Producto actualizado correctamente"),c.toggleModal(),k.value=[],x()):y("negative","Ocurrió un error")}async function me(e){r.value=!0;try{const o=await Be(e,P.value);r.value=!1,y("positive","Producto activado correctamente"),k.value=[],V.value=[],x()}catch{r.value=!1,y("negative","Ocurrió un error")}}async function fe(e){r.value=!0;try{const o=await Ne(e,P.value);r.value=!1,y("positive","Producto desactivado correctamente"),k.value=[],V.value=[],x()}catch{r.value=!1,y("negative","Ocurrió un error")}}const P=Z(()=>le.idSelected);return we(P,()=>{getDataUsers()}),Pe(()=>{x()}),(e,o)=>{const A=v("q-separator"),E=v("q-tab"),p=v("q-tabs"),z=v("q-icon"),H=v("q-input"),T=v("q-tooltip"),F=v("q-btn"),J=v("q-btn-group"),K=v("q-table"),X=v("q-tab-panel"),_e=v("q-tab-panels"),ge=v("q-card"),be=v("q-spinner-ios");return O(),ee(xe,null,[d("div",Ue,[d("div",Me,[d("i",{class:"icon icon-backRoute q-pt-lg",onClick:o[0]||(o[0]=t=>e.$router.back())}),Te]),a(A,{class:"separator"}),d("div",Fe,[a(Ae,{onOnClick:ie,label:"Crear nuevo producto"}),d("div",je,[a(ge,null,{default:s(()=>[a(p,{modelValue:i(h),"onUpdate:modelValue":o[1]||(o[1]=t=>q(h)?h.value=t:h=t),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:s(()=>[a(E,{name:"active",label:"Activos"}),a(E,{name:"inactive",label:"Inactivos"})]),_:1},8,["modelValue"]),a(A),a(_e,{modelValue:i(h),"onUpdate:modelValue":o[4]||(o[4]=t=>q(h)?h.value=t:h=t),animated:""},{default:s(()=>[a(X,{name:"active"},{default:s(()=>[a(K,{flat:"",bordered:"",title:"Productos","row-key":"name",rows:k.value,columns:Q.value,filter:i(m),loading:r.value,"rows-per-page-options":[5,10,20]},{"top-right":s(()=>[a(H,{borderless:"",dense:"",debounce:"300",modelValue:i(m),"onUpdate:modelValue":o[2]||(o[2]=t=>q(m)?m.value=t:m=t),placeholder:"Search"},{append:s(()=>[a(z,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":s(t=>[d("td",We,[a(J,{class:"full-width full-height",outline:"",square:""},{default:s(()=>[a(F,{icon:"edit_note","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:Y=>de(t.row)},{default:s(()=>[a(T,{class:"bg-indigo",offset:[10,10]},{default:s(()=>[S(" Editar ")]),_:1})]),_:2},1032,["onClick"]),a(F,{icon:"highlight_off","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:Y=>fe(t.row._id)},{default:s(()=>[a(T,{class:"bg-indigo",offset:[10,10]},{default:s(()=>[S(" Desactivar ")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1}),a(X,{name:"inactive"},{default:s(()=>[a(K,{flat:"",bordered:"",title:"Productos","row-key":"name",rows:V.value,columns:Q.value,filter:i(m),loading:r.value,"rows-per-page-options":[5,10,20]},{"top-right":s(()=>[a(H,{borderless:"",dense:"",debounce:"300",modelValue:i(m),"onUpdate:modelValue":o[3]||(o[3]=t=>q(m)?m.value=t:m=t),placeholder:"Search"},{append:s(()=>[a(z,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":s(t=>[d("td",$e,[a(J,{class:"full-width full-height",outline:"",square:""},{default:s(()=>[a(F,{"text-color":"blue-10",class:"col q-pa-none",onClick:Y=>me(t.row._id)},{default:s(()=>[Ge,a(T,{class:"bg-indigo",offset:[10,10]},{default:s(()=>[S(" Activar ")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1})])])]),i(c).modalIsOpen?(O(),j(Ve,{key:0,class:"modal"},{default:s(()=>[d("div",Le,[d("h6",Qe,Se(n.value),1),d("div",He,[d("div",Je,[a(W,{label:"Nombre",required:!0,type:"text",ruless:R,value:i(N),modelValue:i(f),"onUpdate:modelValue":o[5]||(o[5]=t=>q(f)?f.value=t:f=t),onOnWrite:se},null,8,["value","modelValue"]),a(Ie,{class:"q-pb-lg",label:"Marca",required:!0,type:"mark",ruless:R,value:i(B),modelValue:i(_),"onUpdate:modelValue":o[6]||(o[6]=t=>q(_)?_.value=t:_=t),onOnSelect:re},null,8,["value","modelValue"]),a(W,{class:"q-pb-xs",label:"Cantidad",required:!0,type:"text",ruless:R,value:i(U),modelValue:i(g),"onUpdate:modelValue":o[7]||(o[7]=t=>q(g)?g.value=t:g=t),onOnWrite:ce},null,8,["value","modelValue"]),a(W,{label:"Descripción",required:!0,ruless:R,type:"text",value:i(M),modelValue:i(b),"onUpdate:modelValue":o[8]||(o[8]=t=>q(b)?b.value=t:b=t),onOnWrite:ue},null,8,["value","modelValue"]),Ke,d("div",Xe,[D.value?(O(),j(ae,{key:0,disable:i(L),onOnClick:ve},null,8,["disable"])):(O(),j(ae,{key:1,disable:i(L),onOnClick:pe},null,8,["disable"]))]),w.value?(O(),ee("div",Ye,[a(be,{color:"primary",size:"2.5em"})])):te("",!0)])])])]),_:1})):te("",!0)],64)}}},at=ye(Ze,[["__scopeId","data-v-6f5a5505"]]);export{at as default};
