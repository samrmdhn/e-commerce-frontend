import { useState, useEffect } from "react";
import axios from "axios";

export default function D_Collection() {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");
  const [values, setValues] = useState({ value1: 0, value2: 0 });

  const getDatas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/collections");
      setCollections(res.data.data);
    } catch (error) {
      console.log(error);
    }
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
      const res = await axios.post("http://localhost:3001/collection", {
        name,
      });
      setCollections((prevCollection) => [...prevCollection, res.data.data]);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Collection</div>

      <form onSubmit={handleSubmit}>
        <input onChange={handleName} placeholder="Collection name..." />
        <button>Save</button>
      </form>

      {collections.map((collection, index) => {
        return (
          <div key={index}>
            <div>
              {collection.name} <span>({collection.productId?.length})</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
