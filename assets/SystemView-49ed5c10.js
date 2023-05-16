import{g as N,m as he,M as Se,B as we,a as ee}from"./ModalForm-db2ed3e8.js";import{C as z,s as T,_ as qe,l as xe,f as s,h as Ve,m as ke,r as c,o as x,c as te,a as r,d as o,w as u,i as l,g as k,j as C,F as Ue,q as w,x as W,t as Ee,v as ae,A as oe,D as Ae,p as De,e as Ce,R as j}from"./index-2558a67d.js";const Ie=async()=>{try{const n=N(),p=z().idSelected,{data:f}=await T.get("/users",{headers:{token:n,farm:p}});return f}catch(n){return n}},Oe=async n=>{try{const i=N(),f=z().idSelected,{data:_}=await T.post("/users/register",{name:n.name,tpdocument:n.tpdocument,numdocument:n.numdocument,role:n.role,password:n.password},{headers:{token:i,farm:f}});return _}catch(i){return i}},Re=async n=>{try{const i=N(),f=z().idSelected,{data:_}=await T.put(`/users/inactive/${n}`,{},{headers:{token:i,farm:f}});return _}catch(i){return i}},Ne=async n=>{try{const i=N(),f=z().idSelected,{data:_}=await T.put(`/users/active/${n}`,{},{headers:{token:i,farm:f}});return _}catch(i){return i}};const G=n=>(De("data-v-d8fd42b1"),n=n(),Ce(),n),ze={class:"q-py-md table-container"},Te={class:"row"},Be=G(()=>r("h6",{class:"title q-my-lg"},"ACCESO AL SISTEMA",-1)),Me={class:"container-content"},Pe={class:"container-table q-mt-md q-pa-md",rounded:""},Fe={style:{padding:"0px",margin:"0px","min-width":"100px","max-width":"20px"}},Le={style:{padding:"0px",margin:"0px","min-width":"100px","max-width":"100px"}},je=G(()=>r("i",{class:"icon icon-check"},null,-1)),We={class:"modalSystem"},Ge={class:"q-my-md text-center"},$e={class:"row q-px-xl"},He={class:"col-12"},Qe={class:"row justify-between"},Xe=G(()=>r("span",{class:"text-required q-py-sm"},[W("Todos los campos con "),r("span",{class:"text-red"},"*"),W(" son obligatorios")],-1)),Je={class:"row justify-center q-mt-sm"},Ke={key:2,class:"spinner"},Ye={__name:"SystemView",setup(n){const i=xe(),p=he(),f=s(),_=s(""),U=s(!1),E=s(!1),B=s(!0),V=s([]),A=s([]);let M=s(""),P=s(""),F=s(""),D=s(""),g=s(""),b=s(""),y=s(""),h=s(""),S=s(""),d=s(""),q=s("active");const $=Ve(()=>!g.value||!b.value||!y.value||!h.value||!S.value?!0:E.value==!0),I=[e=>!!e||"Este campo es requerido"],H=s([{name:"id",label:"#",field:"id",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Nombre",label:"Nombre",field:"name",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Tipo",label:"Tipo",field:"tpdocument",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Documento",label:"Documento",field:"numdocument",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"role",label:"Rol",field:"role",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"status",label:"Estado",field:"status",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Acciones",label:"Acciones",field:"acciones",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"}]),le=e=>{g.value=e},se=e=>{b.value=e},ne=e=>{y.value=e},re=e=>{h.value=e},ue=e=>{S.value=e},ie=e=>{_.value="REGISTRAR ACCESO",ce(),B.value=!0,p.toggleModal()},ce=()=>{M.value="",P.value="",F.value="",D.value="",g.value="",b.value="",y.value="",h.value="",S.value=""},de=e=>{_.value="EDITAR TIPO DE PAGO",B.value=!1,f.value=e._id,M.value=e.name,P.value=e.tpdocument,F.value=e.numdocument,D.value=e.role,g.value=e.name,b.value=e.tpdocument,y.value=e.numdocument,h.value=e.role,p.toggleModal()};async function me(){U.value=!0,E.value=!0,console.log(S.value)}async function O(){V.value=[],A.value=[],U.value=!0;try{const e=await Ie();let a=1,R=1;e.forEach(v=>{v.status=v.status?"Inactivo":"Activo",v.status=="Activo"?(v.id=a++,V.value.push(v)):(v.id=R++,A.value.push(v))}),U.value=!1}catch{m("negative","Ocurrió un error al obtener los usuarios")}}async function ve(e){try{const a=await Re(e);m("positive","Usuario desactivado correctamente"),V.value=[],A.value=[],O()}catch{m("negative","Ocurrió un error al desactivar el usuario")}}async function pe(e){try{const a=await Ne(e);m("positive","Usuario activado correctamente"),V.value=[],A.value=[],O()}catch{m("negative","Ocurrió un error al activar el usuario")}}async function fe(){E.value=!0;try{const e=await Oe({name:g.value,tpdocument:b.value,numdocument:y.value,role:h.value,password:S.value});E.value=!1;let a=e.response.data.errors[0].msg;a==j.USEREXIST?m("negative","El usuario ya existe"):a==j.LENGTHPASSWORD?m("negative","La contraseña debe tener de 6 a 20 carácteres"):a==j.RULESPASSWORD?m("negative","La contraseña debe tener una letra mayúscula, una letra minúscula y un número"):(p.toggleModal(),V.value=[],m("positive","Usuario registrado correctamente"),O())}catch{m("negative","Ocurrió un error")}}function m(e,a){i.notify({type:e,message:a,position:"top"})}return ke(()=>{O()}),(e,a)=>{const R=c("q-separator"),v=c("q-tab"),_e=c("q-tabs"),Q=c("q-icon"),X=c("q-input"),L=c("q-btn"),J=c("q-btn-group"),K=c("q-table"),Y=c("q-tab-panel"),ge=c("q-tab-panels"),be=c("q-card"),ye=c("q-spinner-ios");return x(),te(Ue,null,[r("div",ze,[r("div",Te,[r("i",{class:"icon icon-backRoute q-pt-lg",onClick:a[0]||(a[0]=t=>e.$router.push("/home"))}),Be]),o(R,{class:"separator"}),r("div",Me,[o(we,{onOnClick:ie,label:"Crear nuevo usuario"}),r("div",Pe,[o(be,null,{default:u(()=>[o(_e,{modelValue:l(q),"onUpdate:modelValue":a[1]||(a[1]=t=>w(q)?q.value=t:q=t),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:u(()=>[o(v,{name:"active",label:"Activos"}),o(v,{name:"inactive",label:"Inactivos"})]),_:1},8,["modelValue"]),o(R),o(ge,{modelValue:l(q),"onUpdate:modelValue":a[4]||(a[4]=t=>w(q)?q.value=t:q=t),animated:""},{default:u(()=>[o(Y,{name:"active"},{default:u(()=>[o(K,{flat:"",bordered:"",title:"Usuarios","row-key":"name",rows:V.value,columns:H.value,filter:l(d),loading:U.value,"rows-per-page-options":[5,10,20]},{"top-right":u(()=>[o(X,{borderless:"",dense:"",debounce:"300",modelValue:l(d),"onUpdate:modelValue":a[2]||(a[2]=t=>w(d)?d.value=t:d=t),placeholder:"Buscar"},{append:u(()=>[o(Q,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":u(t=>[r("td",Fe,[o(J,{class:"full-width full-height",outline:"",square:""},{default:u(()=>[o(L,{icon:"edit_note","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:Z=>de(t.row)},null,8,["onClick"]),t.row.role=="ADMIN"?(x(),k(L,{key:0,icon:"highlight_off","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:Z=>ve(t.row._id)},null,8,["onClick"])):C("",!0)]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1}),o(Y,{name:"inactive"},{default:u(()=>[o(K,{flat:"",bordered:"",title:"Usuarios","row-key":"name",rows:A.value,columns:H.value,filter:l(d),loading:U.value,"rows-per-page-options":[5,10,20]},{"top-right":u(()=>[o(X,{borderless:"",dense:"",debounce:"300",modelValue:l(d),"onUpdate:modelValue":a[3]||(a[3]=t=>w(d)?d.value=t:d=t),placeholder:"Buscar"},{append:u(()=>[o(Q,{name:"search"})]),_:1},8,["modelValue"]),W("´ ")]),"body-cell-Acciones":u(t=>[r("td",Le,[o(J,{class:"full-width full-height",outline:"",square:""},{default:u(()=>[o(L,{"text-color":"blue-10",class:"col q-pa-none",onClick:Z=>pe(t.row._id)},{default:u(()=>[je]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1})])])]),l(p).modalIsOpen?(x(),k(Se,{key:0,class:"modal"},{default:u(()=>[r("div",We,[r("h6",Ge,Ee(_.value),1),r("div",$e,[r("div",He,[o(ae,{label:"Nombre",type:"text",required:!0,ruless:I,value:l(M),modelValue:l(g),"onUpdate:modelValue":a[5]||(a[5]=t=>w(g)?g.value=t:g=t),onOnWrite:le},null,8,["value","modelValue"]),r("div",Qe,[o(oe,{class:"q-pb-xs q-mb-md",type:"documents",label:"Tipo de documento",required:!0,ruless:I,value:l(P),modelValue:l(b),"onUpdate:modelValue":a[6]||(a[6]=t=>w(b)?b.value=t:b=t),onOnSelect:se},null,8,["value","modelValue"]),o(ae,{label:"Número documento",type:"number",required:!0,ruless:I,value:l(F),modelValue:l(y),"onUpdate:modelValue":a[7]||(a[7]=t=>w(y)?y.value=t:y=t),onOnWrite:ne},null,8,["value","modelValue"])]),l(D)!="SUPER"?(x(),k(oe,{key:0,class:"q-pb-xs q-mb-md",type:"roles",label:"Rol",required:!0,value:l(D),modelValue:l(h),"onUpdate:modelValue":a[8]||(a[8]=t=>w(h)?h.value=t:h=t),onOnSelect:re},null,8,["value","modelValue"])):C("",!0),l(D)!="SUPER"?(x(),k(Ae,{key:1,label:"Contraseña",required:!0,ruless:I,modelValue:l(S),"onUpdate:modelValue":a[9]||(a[9]=t=>w(S)?S.value=t:S=t),onOnPassword:ue},null,8,["modelValue"])):C("",!0),Xe,r("div",Je,[B.value?(x(),k(ee,{key:0,disable:l($),onOnClick:fe},null,8,["disable"])):(x(),k(ee,{key:1,disable:l($),onOnClick:me},null,8,["disable"]))]),E.value?(x(),te("div",Ke,[o(ye,{color:"primary",size:"2.5em"})])):C("",!0)])])])]),_:1})):C("",!0)],64)}}},tt=qe(Ye,[["__scopeId","data-v-d8fd42b1"]]);export{tt as default};
