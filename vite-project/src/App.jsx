import React, { useEffect, useState } from 'react';
import axios from 'axios';

// const App = () => {
//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     axios.get('https://api.mudoapi.tech/menus')
//       .then(response => {
//         setMenus(response.data.data.Data);
//       })
//       .catch(error => {
//         console.error('Error fetching the menus', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Menu List</h1>
//       <ul>
//         {menus.map((menu) => (
//           <li key={menu.id} style={{ listStyleType: 'none', marginBottom: '20px' }}>
//             <img src={menu.imageUrl} alt={menu.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//             <div>
//               <h2>{menu.name}</h2>
//               <p>{menu.priceFormatted}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

function App() {
  const [menus, setMenus] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
  });

  const getMenuList = () => {
    axios
      .get(`https://api.mudoapi.tech/menus?perPage=5&page=${pagination.currentPage}`)
      .then((response) => {
        console.log(response);
        setMenus(response.data.data.Data);

        const paginationData = {
          total: response.data.data.total,
          perPage: response.data.data.perPage,
          currentPage: response.data.data.currentPage,
          nextPage: response.data.data.nextPage,
        };
        setPagination(paginationData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMenuList();
  }, [pagination.currentPage]);

  const handleNext = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: prevPagination.currentPage + 1,
    }));
  };
  const handleBack = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: prevPagination.currentPage - 1,
    }));
  };

  return (
    <>
      {menus.map((item, index) => (
        <div key={index}>
          <h1>{item.name}</h1>
          <p>{item.priceFormatted}</p>
        </div>
      ))}
      <div>
        <button onClick={handleBack} disabled={pagination.currentPage === 1}>
          Back
        </button>
        <p>{pagination.currentPage}</p>
        <button onClick={handleNext} disabled={!pagination.nextPage}>
          Next
        </button>
      </div>
    </>
  );
}
export default App;

