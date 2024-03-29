import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import AnimeList from './pages/AnimeList/AnimeList';
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';
import News from './pages/News/News';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import Layout from './layout/Layout';
import './styles/global.css'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>} />
              <Route path='anime' element={<AnimeList/>} />
              <Route path='anime/:id' element={<AnimeDetail/>} />
              <Route path='news' element={<News/>} />
              <Route path='character/:id' element={<CharacterDetail/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}