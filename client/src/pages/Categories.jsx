import CategoryNames from '../components/CategoryNames'; 
import CategoriesById from '../components/CategoriesById'; 

const Categories = () => {
  return (
    <div className="categories">
      <h1>Categories</h1>
      <div><CategoryNames /></div>
      <div><CategoriesById /></div>
    </div>
  );
}
 
export default Categories;