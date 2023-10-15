import {Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Favorites from './pages/favorites'
import Search from './pages/search'
import Book from './pages/book'
import Header from './components/header'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/book/:bookId" element={<Book />} />
      </Routes>
    </>
  );
}
