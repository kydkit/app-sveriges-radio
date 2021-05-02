import { useContext } from 'react';
import { RadioContext } from '../contexts/RadioProvider';
import styles from '../css/CategoryName.module.css'

const CategoryNames = (props) => {
  const { categories, getProgramsForCategory } = useContext(RadioContext);

  const handleClick = (id) => {
    getProgramsForCategory(id);
  }

  const renderCategories = () => {
    return categories.map((category) => (
      <div className={styles.card} key={category.id} onClick={() => handleClick(category.id)}>
        <p className={styles.name}>{category.name}</p>
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