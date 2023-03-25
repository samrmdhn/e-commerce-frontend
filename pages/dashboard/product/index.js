import { useState, useEffect } from "react";
import axios from "axios";

export default function D_Product() {
  const [selectedSale, setSelectedSale] = useState(Number(0));

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    price: "",
    gender: "men",
    description: "",
    collectionId: "",
    isSale: {
      sale: false,
      number_of_sale: 0,
    },
    colors: [
      {
        colorId: "",
        stocks: {
          sizes: {
            S: "",
            M: "",
            L: "",
            XL: "",
            XXL: "",
          },
          photos: {
            front: "",
            back: "",
            sides_1: "",
            sides_2: "",
            detail: "",
          },
        },
      },
    ],
  });

  const [categories, setCategories] = useState([]);

  const [colors, setColors] = useState([]);

  const [collections, setCollections] = useState([]);

  const addColors = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: [
        ...prevProduct.colors,
        {
          colorId: colors[0]._id,
          stocks: {
            sizes: {
              S: "",
              M: "",
              L: "",
              XL: "",
              XXL: "",
            },
            photos: {
              front: "",
              back: "",
              sides_1: "",
              sides_2: "",
              detail: "",
            },
          },
        },
      ],
    }));
  };

  const handleProductSale = (e) => {
    console.log(e.target.value);
    if (e.target.value === "0") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        isSale: {
          number_of_sale: 0,
          sale: false,
        },
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        isSale: {
          ...prevProduct.isSale,
          sale: true,
        },
      }));
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/categories");
      const datas = await res.json();

      setProduct((prevProduct) => ({
        ...prevProduct,
        categoryId: datas.data[0]._id,
      }));

      setCategories(datas.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getColors = async () => {
    try {
      const res = await axios
        .get("http://localhost:3001/color")
        .then((response) => response.data.data);

      setColors(res);

      setProduct((prevproduct) => ({
        ...prevproduct,
        colors: [{ ...prevproduct.colors[0], colorId: res[0]._id }],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getCollections = async () => {
    try {
      const res = await axios.get("http://localhost:3001/collection");
      setCollections(res.data.data);
      console.log(res);
      setProduct((prevProduct) => ({
        ...prevProduct,
        collectionId: res.data.data[0]._id,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getColors();
    getCollections();
  }, []);

  const handleDeleteColor = (index) => {
    const filteredProduct = product.colors.filter((p, i) => {
      return i !== index;
    });

    setProduct((prevProduct) => ({ ...prevProduct, colors: filteredProduct }));
  };

  const handleColorStocks = (e, index, key) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.map((color, i) => {
        if (i === index) {
          return {
            ...color,
            stocks: {
              ...color.stocks,
              sizes: {
                ...color.stocks.sizes,
                [key]: e.target.value,
              },
            },
          };
        } else {
          return color;
        }
      }),
    }));
  };

  const handlePhotosStocks = (e, index, key) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.map((color, i) => {
        if (i === index) {
          return {
            ...color,
            stocks: {
              ...color.stocks,
              photos: {
                ...color.stocks.photos,
                [key]: e.target.value,
              },
            },
          };
        } else {
          return color;
        }
      }),
    }));
  };

  const handleProductName = (e) => {
    setProduct((prevProduct) => ({ ...prevProduct, name: e.target.value }));
  };

  const handleProductCategory = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: e.target.value,
    }));
  };

  const handleProductDesc = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: e.target.value,
    }));
  };

  const handleProductGender = (e) => {
    setProduct((prevProduct) => ({ ...prevProduct, gender: e.target.value }));
  };

  const handleSaleNumber = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      isSale: {
        ...prevProduct.isSale,
        number_of_sale: e.target.value,
      },
    }));
  };

  const handleProductPrice = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: Number(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(product);

    try {
      const res = await axios
        .post("http://localhost:3001/products", product)
        .then((response) => console.log(response));
    } catch (error) {
      console.log(error);
    }
  };

  const handleColor = (e, index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.map((color, i) => {
        if (i === index) {
          return { ...color, colorId: e.target.value };
        } else {
          return color;
        }
      }),
    }));
  };

  const handleCollection = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      collectionId: e.target.value,
    }));
  };

  return (
    <div>
      <h3>Dashboard Product</h3>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="product_name">Name</label> <div />
          <input
            id="product_name"
            placeholder="Name..."
            onChange={handleProductName}
            value={product.name}
          />
        </div>
        <br />
        <div>
          <label>Collection</label> <div />
          <select onChange={handleCollection}>
            {collections.map((collection, index) => {
              return (
                <>
                  <option label={collection.name} value={collection._id} />
                </>
              );
            })}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="product_type">Category</label> <div />
          <select onChange={handleProductCategory}>
            {categories.map((c) => {
              return (
                <>
                  <option value={c._id} label={c.name} />
                </>
              );
            })}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="product_price">Price</label> <div />
          <input
            id="product_price"
            placeholder="50000000"
            onChange={handleProductPrice}
          />
        </div>
        <br />
        <div>
          <label htmlFor="product_desc">Description</label> <div />
          <textarea
            id="product_desc"
            placeholder="Lorem ipsum dolar siamet..."
            onChange={handleProductDesc}
          />
        </div>
        <br />
        <div>
          <label htmlFor="product_type">Gender</label> <div />
          <select onChange={handleProductGender}>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="product_type">Sale</label> <div />
          <select onChange={handleProductSale}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <br />
        {product.isSale.sale === true && (
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <input placeholder="Number of sale" onChange={handleSaleNumber} />
            </div>
            <div>%</div>
          </div>
        )}
        <br />
        <label>Colors (Stocks)</label> <div />
        <div style={{ marginLeft: "40px" }}>
          {product.colors?.map((color, index) => {
            return (
              <>
                <div style={{ marginTop: index === 0 ? "20px" : "10px" }}>
                  <span style={{ marginRight: "10px" }}>
                    Colour {index + 1}
                  </span>
                  {product.colors.length !== 1 && (
                    <>
                      <button
                        style={{ background: "red" }}
                        onClick={() => handleDeleteColor(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
                <br />

                <select onChange={(e) => handleColor(e, index)}>
                  {colors.map((color) => {
                    return (
                      <>
                        <option label={color.name} value={color._id} />
                      </>
                    );
                  })}
                </select>
                <div />
                <br />
                <label>Stocks</label>
                <br />
                <div style={{ display: "flex", gap: "10px" }}>
                  {Object.keys(product.colors[index].stocks.sizes).map(
                    (key) => {
                      return (
                        <div>
                          <input
                            id="product_color"
                            onChange={(e) => handleColorStocks(e, index, key)}
                            value={product.colors[index].stocks.sizes[key]}
                            placeholder={key}
                            type="number"
                            style={{ width: "50px" }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <br />
                <label> Photos (URL)</label>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "290px",
                  }}
                >
                  {Object.keys(color.stocks.photos).map((key) => {
                    return (
                      <>
                        <input
                          placeholder={key}
                          value={product.colors[index].stocks.photos[key]}
                          onChange={(e) => handlePhotosStocks(e, index, key)}
                        />
                        <br />
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
          <button type="button" onClick={addColors}>
            Add Color
          </button>
        </div>
        <button type="submit" style={{ marginTop: "30px" }}>
          Save
        </button>
      </form>
    </div>
  );
}
