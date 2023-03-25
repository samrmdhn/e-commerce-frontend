import { useState, useEffect } from "react";
import axios from "axios";

export default function D_Category() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const getDatas = async () => {
    const res = await axios.get("http://localhost:3001/categories");
    console.log(res.data.data);
    setCategories(res.data.data);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const handleCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3001/category", {
      name: categoryName,
    });

    console.log(res);

    setCategories((prevCategories) => [...prevCategories, res.data.data]);
  };

  return (
    <div>
      <div>Dashboard Category</div>

      <form onSubmit={handleSubmit}>
        <input type="text" textholder="Name" onChange={handleCategoryName} />
        <button type="submit">Submit</button>
      </form>

      {categories.map((category, index) => {
        return (
          <div>
            <h3>
              {category.name}
              <span style={{ marginLeft: "10px" }}>
                ({category.products.length})
              </span>
            </h3>
          </div>
        );
      })}
    </div>
  );
}
