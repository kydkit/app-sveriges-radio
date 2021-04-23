import { useContext } from 'react'; 
import { RadioContext } from '../contexts/RadioProvider';
import styles from '../css/AllCategories.module.css'

const CategoryNames = (props) => {
  const { categories, getProgramsForCategory } = useContext(RadioContext); 

  const handleClick = (id) => {
    // console.log((id));
    getProgramsForCategory(id); 
  }

  const renderCategories = () => {
    return categories.map((category) => (
      <div className={styles.card} key={category.id} onClick={() => handleClick(category.id)}>
      <span>{category.name}</span>
      </div>
    ))
  }
  
  return (
    <div className={styles.allcategories}>
      { categories && renderCategories()}
    </div>
  )

}

export default CategoryNames; 