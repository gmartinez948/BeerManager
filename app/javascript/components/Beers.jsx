import { Table, message, Popconfirm } from "antd";
import { React, useEffect, useState } from "react";
import AddBeerModal from "./AddBeerModal";

const Beers = () => {
    const columns = [
        {
          title: "Brand",
          dataIndex: "brand",
          key: "brand",
        },
        {
          title: "Style",
          dataIndex: "style",
          key: "style",
        },
        {
          title: "Country",
          dataIndex: "country",
          key: "country",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "",
          key: "action",
          render: (_text, record) => (
            <Popconfirm title="Are you sure to delete this beer?" onConfirm={() => deleteBeer(record.id)} okText="Yes" cancelText="No">
              <a href="#" type="danger">
                Delete{" "}
              </a>
            </Popconfirm>
          ),
        },
      ];

      const [beers, setBeers] = useState([]);

      useEffect(() => {
          loadBeers();
      }, [beers])

      const loadBeers = () => {
        const url = "api/v1/beers/index";
        fetch(url)
          .then((data) => {
            if (data.ok) {
              return data.json();
            }
            throw new Error("Network error.");
          })
          .then((data) => {
            data.forEach((beer) => {
              const newEl = {
                key: beer.id,
                id: beer.id,
                brand: beer.brand,
                style: beer.style,
                country: beer.country,
                quantity: beer.quantity,
              };
    
              setBeers((prevState) => ({
                beers: [...prevState.beers, newEl],
              }));
            });
          })
          .catch((err) => message.error("Error: " + err));
      };

      const reloadBeers = () => {
          setBeers([]);
          loadBeers();
      };

      const deleteBeer = (id) => {
          const url = `api/v1/beers/${id}`;

          fetch(url, {
            method: "delete",
          })
            .then((data) => {
              if (data.ok) {
                reloadBeers();
                return data.json();
              }
              throw new Error("Network error.");
            })
            .catch((err) => message.error("Error: " + err));
      };

      return (
        <>
          <Table className="table-striped-rows" dataSource={beers} columns={columns} pagination={{ pageSize: 5 }} />
          <AddBeerModal reloadBeers={reloadBeers} />
        </>
      );
}

export default Beers;