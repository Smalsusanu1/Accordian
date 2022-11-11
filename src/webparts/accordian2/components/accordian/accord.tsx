
// import Accordian from "./accordian";
// import * as React from "react";

// const explorerData = {
//   name: "root",
//   children: [
//     {
//       name: "public",
//       children: [
//         {
//           name: "public_nested",
//           children: [
//             {
//               name: "index.html"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       name: "components",
//       children: [
//         {
//           name: "app.js"
//         },
//         {
//           name: "Accordian.js"
//         }
//       ]
//     },
//     {
//       name: "package.json"
//     }
//   ]
// };







// export default function App() {
//   // console.log(explorerData);

//   const[data, setData] = React.useState([]);


//   React.useEffect(()=>{
//       const fetchData=()=>{
        
//           var getRequest = new XMLHttpRequest();
//           getRequest.open('GET', "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/lists/getbyid('b318ba84-e21d-4876-8851-88b94b9dc300')/items?$select=Id,Title,Item_x0020_Cover,isDeleted,IsActive,UserGroup/Id,UserGroup/Title,ItemType,SortOrder,Suffix,AssingedToUserId,AssingedToUser/Title,AssingedToUser/EMail,AssingedToUser/Name,AssingedToUser/Id&$expand=UserGroup,AssingedToUser&$orderby=SortOrder asc,Title asc&$filter=IsActive eq 1", true);
//           getRequest.setRequestHeader("Accept", "application/json");
        
//           getRequest.onreadystatechange = function () {
        
//             if (getRequest.readyState === 4 && getRequest.status === 200) {
//               var result = JSON.parse(getRequest.responseText);
//               var resnext = result.value;
//                console.log(resnext)
//                setData(resnext);
//               //  setData(result),
//                 }
//             else if (getRequest.readyState === 4 && getRequest.status !== 200) {
//               console.log('Error Occurred !');
              
//             }
//           };
//           getRequest.send();
//         }
//         fetchData();
//       },
      
//       []);









//   return (
//     <div className="App">
//       <h1 className="header"> Accordian</h1>
//       <Accordian explorer={data} />
    
      
//     </div>
//   );
// }
