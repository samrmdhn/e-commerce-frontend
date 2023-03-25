import { useState, useEffect } from "react";
import axios from "axios";

export default function D_Color() {
  const [colors, setColors] = useState([]);
  const [name, setName] = useState("");

  const getDatas = async () => {
    const res = await axios.get("http://localhost:3001/color");
    console.log(res.data.data);
    setColors(res.data.data);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/color", {
        name: name,
      });
      console.log(res);
      setColors((prevColors) => [...prevColors, res.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Color</div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Color name..." onChange={handleName} />
        <button type="submit">Save</button>
      </form>
      {colors.map((color, index) => {
        return (
          <div>
            <h3>
              {color.name}
              <span style={{ marginLeft: "10px" }}>
                ({color.productId.length})
              </span>
            </h3>
          </div>
        );
      })}
    </div>
  );
}
