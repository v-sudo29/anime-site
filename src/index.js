import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import TopAnime from './pages/TopAnime';
import Search from './pages/Search';
import AnimeDetail from './components/AnimeDetail';
import Layout from './components/Layout';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='search' element={<Search/>}/>
          <Route path='top-anime' element={<TopAnime/>} />
          <Route path='top-anime/:id' element={<AnimeDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);