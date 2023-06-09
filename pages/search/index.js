import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import CurrencyInput from "react-currency-input-field";
import qs from "qs";
import assert from "assert";

export default function Search() {
  const router = useRouter();
  const { query } = router;

  //VALUE FOR INPUT
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [collection, setCollection] = useState("");

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
  const [collections, setCollections] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const handleCategory = (e) => {
    if (e.target.value === "All") {
      setCategory(["All"]);

      delete query["category[]"];

      let params = {};

      if (color.length > 0 && !color.includes("All")) {
        params.color = color;
      }

      if (query.gender) {
        params.gender = query.gender;
      }

      if (query.collection) {
        params.collection = query.collection.replace(/\s+/g, "+");
      }

      if (query.price_min) {
        params.price_min = query.price_min;
      }

      if (query.price_max) {
        params.price_max = query.price_max;
      }

      const serializedParams = qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });

      router.push({
        pathname: "/search",
        search: `${serializedParams}`,
      });
    } else if (category.includes(e.target.value)) {
      const filtered = category.filter((c) => {
        return c !== e.target.value;
      });

      setCategory(filtered);

      let params = {};

      params.category = filtered;

      if (color.length > 0 && !color.includes("All")) {
        params.color = color;
      }

      if (query.gender) {
        params.gender = query.gender;
      }

      if (query.collection) {
        params.collection = query.collection.replace(/\s+/g, "+");
      }

      if (query.price_min) {
        params.price_min = query.price_min;
      }

      if (query.price_max) {
        params.price_max = query.price_max;
      }

      const serializedParams = qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });

      if (filtered.length === 0) {
        router.push({
          pathname: "/search",
          search: `${serializedParams}`,
        });
      } else {
        router.push({
          pathname: "/search",
          search: `?${serializedParams}`,
        });
      }
    } else {
      const filtered = category.filter((c) => {
        return c !== "All";
      });

      setCategory(filtered);

      setCategory((prevCategory) => [...prevCategory, e.target.value]);

      //  const params = [...filter, e.target.value];

      let params = {};

      params.category = [...filtered, e.target.value];

      if (color.length > 0 && !color.includes("All")) {
        params.color = color;
      }

      if (query.gender) {
        params.gender = query.gender;
      }

      if (query.collection) {
        params.collection = query.collection.replace(/\s+/g, "+");
      }

      if (query.price_min) {
        params.price_min = query.price_min;
      }

      if (query.price_max) {
        params.price_max = query.price_max;
      }

      const serializedParams = qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });

      router.push({
        pathname: "/search",
        search: `?${serializedParams}`,
      });
    }

    // if (e.target.value === category) delete query.category;
  };

  const handleGender = (e) => {
    setGender(e.target.value);

    query.gender = e.target.value;

    if (e.target.value === "all") delete query.gender;

    if (e.target.value === gender) delete query.gender;

    let params = {};

    if (category.length > 0 && !category.includes("All")) {
      params.category = category;
    }

    if (color.length > 0 && !color.includes("All")) {
      params.color = color;
    }

    if (query.gender) {
      params.gender = query.gender;
    }

    if (query.collection) {
      params.collection = query.collection.replace(/\s+/g, "+");
    }

    if (query.price_min) {
      params.price_min = query.price_min;
    }

    if (query.price_max) {
      params.price_max = query.price_max;
    }

    const serializedParams = qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
    });

    router.push({
      pathname: "/search",
      search: serializedParams ? `?${serializedParams}` : "",
    });
  };

  const handleColor = (e) => {
    if (e.target.value === "All") {
      //Set to default

      setColor(["All"]);

      delete query["color[]"];

      let params = {};

      if (category.length > 0 && !category.includes("All")) {
        params.category = category;
      }

      if (query.gender) {
        params.gender = query.gender;
      }

      if (query.collection) {
        params.collection = query.collection.replace(/\s+/g, "+");
      }

      if (query.price_min) {
        params.price_min = query.price_min;
      }

      if (query.price_max) {
        params.price_max = query.price_max;
      }

      const serializedParams = qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });

      router.push({
        pathname: "/search",
        search: `${serializedParams}`,
      });
    } else if (color.includes(e.target.value)) {
      //Unselected

      const filtered = color.filter((c) => {
        return c !== e.target.value;
      });

      setColor(filtered);

      let params = {};

      params.color = filtered;

      if (category.length > 0 && !category.includes("All")) {
        params.category = category;
      }

      if (query.gender) {
        params.gender = query.gender;
      }

      if (query.collection) {
        params.collection = query.collection.replace(/\s+/g, "+");
      }

      if (query.price_min) {
        params.price_min = query.price_min;
      }

      if (query.price_max) {
        params.price_max = query.price_max;
      }

      const serializedParams = qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });

      if (filtered.length === 0) {
        router.push({
          pathname: "/search",
          search: `${serializedParams}`,
        });
      } else {
        router.push({
          pathname: "/search",
          search: `?${serializedParams}`,
        });
      }
    } else {
      //Select New

      const filtered = color.filter((c) => {
        return c !== "All";
      });

      setColor(filtered);

      setColor((prevColor) => [...prevColor, e.target.value]);

      //    const params = [...filter, e.target.value];

      let params = {};

      params.color = [...filtered, e.target.value];

      if (category.length > 0 && !category.includes("All")) {
        params.category = category;
      }

      if (query.gender) {
        params.gender = query.gender;
      }

      if (query.collection) {
        params.collection = query.collection.replace(/\s+/g, "+");
      }

      if (query.price_min) {
        params.price_min = query.price_min;
      }

      if (query.price_max) {
        params.price_max = query.price_max;
      }

      const serializedParams = qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });

      router.push({
        pathname: "/search",
        search: `?${serializedParams}`,
      });
    }
  };

  const handleCollection = (e) => {
    setCollection(e.target.value);

    query.collection = e.target.value.replace(/\s+/g, "+");

    //query.collection = e.target.value;

    if (e.target.value === "All") delete query.collection;

    if (e.target.value === collection) delete query.collection;

    let params = {};

    if (category.length > 0 && !category.includes("All")) {
      params.category = category;
    }

    if (color.length > 0 && !color.includes("All")) {
      params.color = color;
    }

    if (query.gender) {
      params.gender = query.gender;
    }

    if (query.collection) {
      params.collection = query.collection.replace(/\s+/g, "+");
    }

    if (query.price_min) {
      params.price_min = query.price_min;
    }

    if (query.price_max) {
      params.price_max = query.price_max;
    }

    const serializedParams = qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
    });

    router.push({
      pathname: "/search",
      search: serializedParams ? `?${serializedParams}` : "",
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
      const addAll = [{ value: "all", name: "All" }, ...res.data.data];
      setCategories(addAll);
    } catch (error) {
      console.log(error);
    }
  };

  const getColors = async () => {
    try {
      const res = await axios.get("http://localhost:3001/colors");
      const addAll = [{ value: "all", name: "All" }, ...res.data.data];
      setColors(addAll);
    } catch (error) {
      console.log(error);
    }
  };

  const getCollections = async () => {
    try {
      const res = await axios.get("http://localhost:3001/collections");
      const addAll = [{ name: "All" }, ...res.data.data];
      setCollections(addAll);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getColors();
    getCollections();
  }, []);

  useEffect(() => {
    //  console.log(query["category[]"]);

    if (!query["category[]"]) {
      setCategory(["All"]);
    } else if (typeof query["category[]"] === "string") {
      setCategory([query["category[]"]]);
    } else {
      setCategory(query["category[]"]);
    }

    if (!query["color[]"]) {
      setColor(["All"]);
    } else if (typeof query["color[]"] === "string") {
      setColor([query["color[]"]]);
    } else {
      setColor(query["color[]"]);
    }

    if (!query.gender) {
      setGender((prevGender) => (prevGender = "all"));
    } else {
      setGender((prevGender) => (prevGender = query.gender));
    }

    if (!query.collection) {
      setCollection("All");
    } else {
      const decoded = decodeURIComponent(query.collection.replace(/\+/g, " "));
      setCollection(decoded);
    }

    if (query.price_min !== "" || undefined || 0) {
      setPrice((prevPrice) => ({ ...prevPrice, min: query.price_min }));
    } else {
      setPrice((prevPrice) => ({ ...prevPrice, min: 0 }));
    }

    if (query.price_max !== "" || undefined || 0) {
      setPrice((prevPrice) => ({ ...prevPrice, max: query.price_max }));
    } else {
      setPrice((prevPrice) => ({ ...prevPrice, max: 0 }));
    }

    if (Object.keys(query).length !== 0) {
      handleSearch();
    } else {
      getProducts();
    }
  }, [query]);

  const [price, setPrice] = useState({ min: 0, max: 0 });

  const handlePriceMin = (value) => {
    setPrice((prevPrice) => ({ ...prevPrice, min: value }));

    //query.price_min = value;

    if (value === undefined) delete query.price_min;

    let params = {};

    params.price_min = value;

    if (category.length > 0 && !category.includes("All")) {
      params.category = category;
    }

    if (color.length > 0 && !color.includes("All")) {
      params.color = color;
    }

    if (query.gender) {
      params.gender = query.gender;
    }

    if (query.collection) {
      params.collection = query.collection.replace(/\s+/g, "+");
    }

    if (query.price_max) {
      params.price_max = query.price_max;
    }

    const serializedParams = qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
    });

    router.push({
      pathname: "/search",
      search: serializedParams ? `?${serializedParams}` : "",
    });
  };

  const handlePriceMax = (value) => {
    // value >= maximum ? (value = maximum) : value;

    setPrice((prevPrice) => ({ ...prevPrice, max: value }));

    if (value === undefined) delete query.price_max;

    let params = {};

    params.price_max = value;

    if (category.length > 0 && !category.includes("All")) {
      params.category = category;
    }

    if (color.length > 0 && !color.includes("All")) {
      params.color = color;
    }

    if (query.gender) {
      params.gender = query.gender;
    }

    if (query.collection) {
      params.collection = query.collection.replace(/\s+/g, "+");
    }

    if (query.price_min) {
      params.price_min = query.price_min;
    }

    const serializedParams = qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
    });

    router.push({
      pathname: "/search",
      search: serializedParams ? `?${serializedParams}` : "",
    });
  };

  return (
    <div>
      <div>Search Page</div>

      <br />
      <div>Collections</div>
      {collections.map((c, index) => {
        return (
          <div>
            <label>
              <input
                type="checkbox"
                value={c.name}
                onChange={handleCollection}
                checked={c.name === collection}
              />

              {c.name}
            </label>
          </div>
        );
      })}

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
                checked={
                  c.name ===
                  category.find((ctr) => {
                    return c.name === ctr;
                  })
                }
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
                checked={
                  c.name ===
                  color.find((clr) => {
                    return c.name === clr;
                  })
                }
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
