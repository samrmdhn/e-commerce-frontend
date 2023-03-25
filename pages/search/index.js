import axios from "axios";import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import CurrencyInput from "react-currency-input-field";

export default function Search() {
  const router = useRouter();
  const { query } = router;

  //VALUE FOR INPUT
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  //MAPPING MATCHED SEARCH PRODUCT
  const [datas, setDatas] = useState([]);

  //DEFAULT VALUE
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [genders, setGenders] = useState([
    {
      value: "all",
      label: "All",
    },
    {
      value: "men",
      label: "Men",
    },
    {
      value: "women",
      label: "Women",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const handleCategory = (e) => {
    setCategory(e.target.value);

    query.category = e.target.value;

    if (e.target.value === category) delete query.category;

    router.push({
      query,
    });
  };

  const handleColor = (e) => {
    setColor(e.target.value);

    query.color = e.target.value;

    if (e.target.value === color) delete query.color;

    router.push({
      query,
    });
  };

  const handleGender = (e) => {
    setGender(e.target.value);

    query.gender = e.target.value;

    if (e.target.value === "all") delete query.gender;
    //  if (e.target.value === "all") delete query.gender;

    if (e.target.value === gender) delete query.gender;

    router.push({
      query,
    });
  };

  const handleSearch = async () => {
    try {
      setIsLoading((prevLoading) => (prevLoading = true));

      const res = await axios.get("http://localhost:3001/search", {
        params: query,
      });

      console.log(res.data.data);

      setDatas(res.data.data);

      setIsLoading((prevLoading) => (prevLoading = false));
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/products");
      setDatas(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getColors = async () => {
    try {
      const res = await axios.get("http://localhost:3001/colors");

      setColors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getColors();
  }, []);

  useEffect(() => {
    if (query.category !== "")
      setCategory((prevCategory) => (prevCategory = query.category));

    if (query.color !== "") setColor((prevColor) => (prevColor = query.color));

    if (!query.gender) {
      setGender((prevGender) => (prevGender = "all"));
    } else {
      setGender((prevGender) => (prevGender = query.gender));
    }

    if (query.price_min !== "" && query.price_max !== "")
      setPrice([query.price_min, query.price_max]);

    if (Object.keys(query).length !== 0) {
      handleSearch();
    } else {
      getProducts();
    }
  }, [query]);

  const [price, setPrice] = useState({ min: 0, max: 1000000 });

  const handlePriceMin = (value) => {
    setPrice((prevPrice) => ({ ...prevPrice, min: value }));

    query.price_min = value;

    if (value === undefined) delete query.price_min;

    if (value !== Number(0)) {
      router.push({
        query,
      });
    }
  };

  const handlePriceMax = (value) => {
    // value >= maximum ? (value = maximum) : value;

    setPrice((prevPrice) => ({ ...prevPrice, max: value }));

    query.price_max = value;

    if (value === undefined) delete query.price_max;

    if (value !== Number(0)) {
      router.push({
        query,
      });
    }
  };

  return (
    <div>
      <div>Search Page</div>
      <br />
      <div>Gender</div>
      {genders.map((g, index) => {
        return (
          <div>
            <label>
              <input
                onChange={handleGender}
                type="checkbox"
                value={g.value}
                checked={g.value === gender}
              />
              {g.label}
            </label>
          </div>
        );
      })}
      <br />
      <div>Categories</div>
      {categories.map((c, index) => {
        return (
          <div>
            <label>
              <input
                onChange={handleCategory}
                type="checkbox"
                value={c.name}
                checked={c.name === category}
              />
              {c.name}
            </label>
          </div>
        );
      })}
      <br />
      <div>Colors</div>
      {colors.map((c, index) => {
        return (
          <div>
            <label>
              <input
                onChange={handleColor}
                type="checkbox"
                value={c.name}
                checked={c.name === color}
              />
              {c.name}
            </label>
          </div>
        );
      })}
      <br />
      <div>Price</div>

      <br />

      <CurrencyInput
        prefix="Rp"
        intlConfig={{ locale: "id-ID", currency: "IDR" }}
        placeholder="Please enter a number"
        value={price.min}
        decimalsLimit={2}
        maxLength={7}
        onValueChange={(value) => handlePriceMin(value)}
      />

      <br />
      <CurrencyInput
        prefix="Rp"
        intlConfig={{ locale: "id-ID", currency: "IDR" }}
        placeholder="Please enter a number"
        value={price.max}
        decimalsLimit={2}
        maxLength={7}
        onValueChange={(value) => handlePriceMax(value)}
      />

      <br />
      <br />
      {!isLoading ? (
        <>
          {datas.map((data, index) => {
            return (
              <div>
                <div>{data.name}</div>
              </div>
            );
          })}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
