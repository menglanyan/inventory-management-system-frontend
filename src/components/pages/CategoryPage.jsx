import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import ApiService from "../../service/ApiService";


const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Fetch the categories from the backend
  useEffect(() => {

    // Fetch all categories
    const getCategories = async () => {
      try {
        
        const resp = await ApiService.getAllCategories();
        if (resp.statusCode === 200) {
          setCategories(resp.categories);
        }

      } catch (error) {
        showMessage(error.response?.data?.message || "Caegories Not Found: " + error);
      }
    };

    getCategories();

  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  const addCategory = async () => {

    if (!categoryName) {
      showMessage("Category name cannot be empty");
      return;
    }

    try {
      
      await ApiService.createCategory({name: categoryName});
      showMessage("Category Added Successfully");
      // Clear input
      setCategoryName("");
      // Reload the page
      window.location.reload();

    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to add category: " + error);
    }
  };

  const editCategory = async () => {

    try {

      await ApiService.updateCategory(editingCategoryId, {name: categoryName});
      showMessage("Category Updated Successfully");
      setIsEditing(false);
      // Clear input
      setCategoryName("");
      // Reload the page
      window.location.reload();

    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to edit category: " + error);
    }
  };

  const handleEditCategory = (category) => {
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {

      try {
        await ApiService.deleteCategory(categoryId);
        showMessage("Category Deleted Successfully");
        // Reload the page
        window.location.reload();
      } catch (error) {
        showMessage(error.response?.data?.message || "Failed to delete category: " + error);
      }

    }
  };

  return (
    <Layout>

      {message && <div className="message">{message}</div>}

      <div className="category-page">

        <div className="category-header">
          <h1>Categories</h1>
          <div className="add-cat">
            <input type="text" placeholder="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />

            {!isEditing ? (
              <button onClick={addCategory}>Add Category</button>
            ) : (
              <button onClick={editCategory}>Edit Category</button>
            )}

          </div>
        </div>

        {categories && (
          <ul className="category-list">
            {categories.map((category) => (
              <li className="category-item" key={category.id}>
                
                <span>{category.name}</span>

                <div className="category-actions">
                  <button onClick={() => handleEditCategory(category)}>Edit</button>
                  <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                </div>
              </li>
            ))}

          </ul>
        )}

      </div>

    </Layout>
  );

};

export default CategoryPage;