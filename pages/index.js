import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Box, Grid, Typography } from "@mui/material";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
  const [selectedThumbnail, setSelectedThumbnail] = useState({});

  const getDatas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/products");

      // console.log(res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCollections = async () => {
    try {
      const res = await axios.get("http://localhost:3001/collection");
      setCollections(res.data.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDatas();
    getCollections();
  }, []);

  const handleSelectedCollection = (name) => {
    const selected = collections.find((collection) => {
      return collection.name === name;
    });

    if (selectedCollection.name === name) {
      setSelectedCollection({});
    } else {
      setSelectedCollection(selected);
    }
  };

  const handlePhotoThumbnail = (productName) => {
    const selected = products.find((product, index) => {
      return product.name === productName;
    });

    console.log(selected);

    setSelectedThumbnail(selected);
  };

  return (
    <>
      <h1>Product</h1>

      <section>
        <Grid container spacing={2}>
          <Grid item md="7">
            <Box
              sx={{
                border: "1px solid #dbdbdb",
                borderRadius: "10px",
                height: "100%",
                padding: 1,
                /* backgroundImage: "url(/Untitled-2.jpg)", */
                backgroundSize: "auto",
                backgroundPosition: "center",
              }}
            >
              <Box sx={{ color: "white", padding: 2 }}>
                <h1>VEARST VULTRA DRIPZ 22/23</h1>
                <p>lormermekmrke</p>
              </Box>
            </Box>
          </Grid>

          <Grid item md="5">
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item md="12">
                <Box
                  sx={{
                    padding: 1,
                    border: "1px solid #dbdbdb",
                    borderRadius: "10px",
                    height: "40vh",
                    backgroundColor: "white",
                  }}
                >
                  <Box sx={{ padding: 2 }}>weklfkwlefklwe</Box>
                </Box>
              </Grid>

              <Grid item md="6">
                <Box
                  sx={{
                    backgroundColor: "#4b4bff",
                    opacity: "0.8",
                    backgroundImage:
                      "radial-gradient(circle at center center, #000000, #4b4bff), repeating-radial-gradient(circle at center center, #000000, #000000, 14px, transparent 28px, transparent 14px)",
                    backgroundBlendMode: "multiply",
                    padding: 1,
                    border: "1px solid #dbdbdb",
                    borderRadius: "10px",
                    height: "15vh",
                    minHeight: "100%",
                    backgroundColor: "#0B3D77",
                  }}
                >
                  <Box sx={{ padding: 2 }}>
                    <Box sx={{ marginBottom: 2 }}>
                      <span
                        style={{
                          border: "1px solid grey",
                          padding: "5px 10px",
                          fontSize: "8px",
                          borderRadius: "20px",
                          backgroundColor: "white",
                        }}
                      >
                        LATEST COLLECTION
                      </span>
                    </Box>
                    <Typography sx={{ fontWeight: "bolder", color: "white" }}>
                      VEARST VULTURA 22/23
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item md="6">
                <Box
                  sx={{
                    padding: 1,
                    border: "1px solid #dbdbdb",
                    borderRadius: "10px",
                    height: "100%",
                    backgroundColor: "white",
                  }}
                >
                  efef
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>

      <h1 style={{ marginTop: "30px" }}>COLLECTIONS</h1>

      {collections.map((collection, index) => {
        return (
          <div
            style={{ marginBottom: "10px" }}
            onClick={() => handleSelectedCollection(collection.name)}
          >
            {collection.name !== selectedCollection.name && (
              <>
                <div>{collection.name}</div>
              </>
            )}

            {collection.name === selectedCollection.name && (
              <>
                <Grid container>
                  <Grid item md="2">
                    <Typography>{collection.name}</Typography>
                  </Grid>

                  <Grid item md="4">
                    <div>
                      {index === 0 && (
                        <div style={{ marginBottom: "10px" }}>
                          <img
                            src="https://cdn.cnn.com/cnnnext/dam/assets/210723002556-05-skate-culture-japan-full-169.jpg"
                            style={{ width: "350px", height: "auto" }}
                          />
                        </div>
                      )}
                      <div>{selectedCollection.description}</div>
                    </div>
                  </Grid>

                  <Grid item md="6">
                    <button
                      onClick={() => handleSelectedCollection(collection.name)}
                    >
                      Select
                    </button>
                  </Grid>
                </Grid>
              </>
            )}

            <hr />
          </div>
        );
      })}

      <h3>Vearst Vultura 203</h3>

      <Grid container spacing={2} alignItems="stretch" direction="row">
        {products.map((product, index) => {
          return (
            <>
              <Grid item md="3">
                <Link
                  href={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  <Box>
                    <div
                      onMouseLeave={() => setSelectedThumbnail({})}
                      onMouseEnter={() => handlePhotoThumbnail(product.name)}
                    >
                      <img
                        src={
                          selectedThumbnail.name === product.name
                            ? product.colors[0].stocksId[0].photos["back"]
                            : product.colors[0].stocksId[0].photos["front"]
                        }
                        style={{
                          height: "auto",
                          width: "100%",
                        }}
                      />
                    </div>

                    <div style={{ fontWeight: "bolder" }}>{product.name}</div>

                    <div>{product.category}</div>
                    <div>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                    </div>
                    <div>Available colors: </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {product.colors.map((color, index) => {
                        return (
                          <>
                            <div>{color.name} </div>
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                border: "1px solid white",
                                backgroundColor: color.name,
                              }}
                            ></div>{" "}
                          </>
                        );
                      })}
                    </div>
                  </Box>
                </Link>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}
