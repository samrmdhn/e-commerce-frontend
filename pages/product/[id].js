import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  const res = await axios.get(
    `http://localhost:3001/product/${context.query.id}`
  );

  console.log(res.data.data);
  return {
    props: {
      data: res.data.data,
    },
  };
}

export default function Home(props) {
  const router = useRouter();
  const { data } = props;

  const [datas, setDatas] = useState(data);

  const [selectedColors, setSelectedColors] = useState(data.colors[0]);
  const [order, setOrder] = useState({
    productId: data._id,
    name: "",
    colorId: "",
    color: data.colors[0].name,
    size: "",
    quantity: 1,
  });

  const getStock = (name) => {
    if (order.color === name) return;

    const stock = datas.colors.find((color) => {
      return color.name === name;
    });

    setSelectedColors(stock);

    // if (stock.name === name) console.log("Sama");

    setOrder({
      ...order,
      size: "",
      colorId: stock._id,
      color: stock.name,
      quantity: 1,
    });
  };

  const handleIncrement = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      quantity: prevOrder.quantity < 10 ? prevOrder.quantity++ : 10,
    }));
  };

  const handleDecrement = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      quantity: prevOrder.quantity > 1 ? prevOrder.quantity-- : 1,
    }));
  };

  const handleSubmit = () => {
    console.log(order);
  };

  return (
    <>
      <main>
        <section>
          <div>{datas?.name}</div>
          {Object.keys(selectedColors.stocksId[0].photos).map((key) => {
            return (
              <>
                <img
                  height="250"
                  width="auto"
                  src={selectedColors.stocksId[0].photos[key]}
                />
              </>
            );
          })}
          <div>{datas?.description}</div>
          <div>{datas?.categoryId?.name}</div>
          <div>
            {datas.colors?.map((color, index) => {
              return (
                <>
                  <button
                    onClick={() => getStock(color.name)}
                    style={{ marginLeft: 20 }}
                  >
                    {color.name === order.color ? (
                      <>
                        <b>{color.name}</b>
                      </>
                    ) : (
                      <>{color.name}</>
                    )}
                  </button>
                </>
              );
            })}
          </div>

          <div>Stocks</div>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {Object.keys(selectedColors.stocksId[0].sizes).map((key) => {
              return (
                <>
                  {selectedColors.stocksId[0].sizes[key] === 0 ? (
                    <>
                      <button
                        style={{
                          width: "50px",
                          height: "25px",
                          background: "#2e2e2e",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {key}
                      </button>
                    </>
                  ) : (
                    <>
                      {order.size === key ? (
                        <>
                          <button
                            onClick={() => setOrder({ ...order, size: key })}
                            style={{
                              width: "50px",
                              height: "25px",
                              background: "white",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <b>{key}</b>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setOrder({ ...order, size: key })}
                            style={{
                              width: "50px",
                              height: "25px",
                              background: "white",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {key}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              );
            })}
            {order.size === "" && <>Choose size</>}
          </div>
        </section>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div>
            <button style={{ padding: "3px 15px" }} onClick={handleDecrement}>
              -
            </button>
          </div>
          <div>{order.quantity}</div>
          <div>
            <button style={{ padding: "3px 15px" }} onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <div>{order.color}</div>
          <div>{order.size}</div>
          <div>{order.quantity}</div>
        </div>

        <button style={{ marginTop: "10px" }} onClick={handleSubmit}>
          Submit
        </button>

        <div>{selectedColors.name}</div>
      </main>
    </>
  );
}
