// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useStorageFarm = defineStore(
//   "useStorageFarm",
//   () => {
//     const farms = ref([]);
//     const idFarmselected = ref();

//     const addStorageFarms = (value) => {
//       farms.value = value;
//     };

//     const setFarm = (data) => {
//       const farm = farms.value
//       const farmsExist = farm.forEach((item) => {
//         if(item.name = data){
//           idFarmselected.value = item._id;
//         }
//       });
//     }

//     const deleteStorageFarms = () => {
//       farms.value = [];
//       idFarmselected.value = "";
//     };

//     return { farms, idFarmselected, addStorageFarms, deleteStorageFarms, setFarm };
//   }, {
//   persist: true
// }
// );