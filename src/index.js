import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import AnimeList from './pages/AnimeList/AnimeList';
import AnimeDetail from './components/AnimeDetail';
import News from './pages/News/News';
import Layout from './components/Layout';
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='anime-list' element={<AnimeList/>} />
          <Route path='anime/:id' element={<AnimeDetail/>}/>
          <Route path='news' element={<News/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode> 
);