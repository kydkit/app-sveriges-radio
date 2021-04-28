import { useRef } from 'react'
import CategoryNames from '../components/CategoryNames'; 
import CategoriesById from '../components/CategoriesById'; 
import styles from '../css/CategoriesPage.module.css'

const Categories = () => {
  const myRef = useRef(null)

  const executeScroll = () => myRef.current.scrollIntoView({behavior: "smooth"})
  
  return (
    <div className="categories">
      <h1 className={styles.header}>Categories</h1>
      <div onClick={executeScroll}><CategoryNames /></div>
      <div ref={myRef}><CategoriesById /></div>
    </div>
  );
}

export default Categories;