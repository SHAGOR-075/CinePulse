// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
// import { ThemeProvider } from './contexts/ThemeContext'
// import Layout from './components/Layout/Layout'
// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDetail from './pages/MovieDetail'
// import Search from './pages/Search'
// import NotFound from './pages/NotFound'

// function App() {
//   return (
//     <ThemeProvider>
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-colors duration-300">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/movies" element={<Movies />} />
//             <Route path="/movies/:id" element={<MovieDetail />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </Layout>
//         <Toaster 
//           position="top-right"
//           toastOptions={{
//             duration: 4000,
//             style: {
//               background: 'rgba(255, 255, 255, 0.1)',
//               backdropFilter: 'blur(20px)',
//               color: 'white',
//               border: '1px solid rgba(255, 255, 255, 0.2)',
//               borderRadius: '16px',
//               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//             },
//           }}
//         />
//       </div>
//     </ThemeProvider>
//   )
// }

// export default App


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-colors duration-300 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
