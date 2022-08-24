// import { useEffect, useState } from "react";
// import { List, Table } from "react-virtualized";
// import Page from "../Utils/Pagination";
// const Home = () => {
//   const [names, setNames] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [postPerPage, setPostPerPage] = useState(5);
//   const [currentPosts, setCurrentPosts] = useState([]);
//   useEffect(() => {
//     const tempNames = [...Array(20).keys()].map((key, index) => {
//       return {
//         id: index,
//         title: "razorpay" + index,
//       };
//     });
//     setNames(tempNames);
//     setCurrentPosts(tempNames.slice(0, postPerPage));
//   }, []);
//   const changePageNumber = (change) => {
//     setPageNumber((prevPage) => prevPage + change);
//   };
//   const nextPage = () => {
//     changePageNumber(1);
//     console.log(pageNumber);
//     const indexOfLastPost = (pageNumber + 1) * postPerPage;
//     const indexOfFirstPost = indexOfLastPost - postPerPage;
//     setCurrentPosts(names.slice(indexOfFirstPost, indexOfLastPost));
//   };
//   const prevPage = () => {
//     changePageNumber(-1);
//     const indexOfLastPost = (pageNumber - 1) * postPerPage;
//     const indexOfFirstPost = indexOfLastPost - postPerPage;
//     setCurrentPosts(names.slice(indexOfFirstPost, indexOfLastPost));
//   };

//   return (
//     <div>
//       {/* Pagination */}
//       {pageNumber < names.length / postPerPage && (
//         <button type="button" onClick={nextPage}>
//           Next
//         </button>
//       )}
//       {pageNumber > 1 && (
//         <button type="button" onClick={prevPage}>
//           prev
//         </button>
//       )}
//       <Page names={currentPosts} />

//       {/* list virtualized */}
//       <List
//         width={600}
//         height={500}
//         rowHeight={100}
//         rowCount={names.length}
//         rowRenderer={({ key, index, style, parent }) => {
//           const name = names[index];
//           return (
//             <div key={key} style={style}>
//               <h2>{name.title}</h2>
//             </div>
//           );
//         }}
//       ></List>
//       {/* <ul>
//         {names.map((name) => {
//           return (
//             <li key={name.id}>
//               <h1>{name.title}</h1>
//             </li>
//           );
//         })}
//       </ul> */}
//     </div>
//   );
// };

// export default Home;
