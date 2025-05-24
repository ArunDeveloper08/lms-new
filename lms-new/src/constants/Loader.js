// import React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';

// const Loader = ({data}) => {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <CircularProgress />
//     </div>
//   );
// };

// export default Loader;


import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({ data }) => {

  if (data === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src="https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png"
    className='h-[450px] '
    />
     
      </div>
    );
  }

 
  if (data !== null && data.isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

 
  
};

export default Loader;
