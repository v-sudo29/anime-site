import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Switch} from 'react-router-dom'
import Home from './pages/Home/Home';
import AnimeList from './pages/AnimeList/AnimeList';
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';
import News from './pages/News/News';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import Layout from './components/Layout';
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Switch>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='anime-list' element={<AnimeList/>} />
            <Route path='anime/:id' element={<AnimeDetail/>} />
            <Route path='news' element={<News/>} />
            <Route path='character/:id' element={<CharacterDetail/>} />
          </Route>
        </Switch>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode> 
);