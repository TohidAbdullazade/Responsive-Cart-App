import React, { useEffect, useState } from "react";
import { Typography, Input, List, Card, Image } from "antd";
import { GET_ALL_CARTS } from "../api/Card_API";

const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState([]);

  const showCart = () => {
    setLoading(true);
    GET_ALL_CARTS(search).then((res) => {
      console.log(res);
      setData(res.products);
      setLoading(false);
      console.log(search);
    });
  };

  useEffect(() => {
    showCart();
  }, [search]);

  return (
    <>
      <div className="search-area px-4 py-5">
        <Typography.Title level={4} className="text-center pt-2">
          Product's Gallary
        </Typography.Title>
        <Input.Search
          className="flex m-auto " placeholder="Search..."
          style={{ maxWidth: 500 }}
          onSearch={(value) => {
            setSearch(value);
          }}
        ></Input.Search>
      </div>
      <div className="img-list  ">
        <List
          dataSource={data}
          loading={loading}
          grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
          renderItem={(item) => {
            return (
              <>
                <Card hoverable key={item.id} className=" m-5" style={{height:300}}>
                  <Image
                    src={item.thumbnail}
                    preview={{ visible: false }}
                    onClick={() => {
                      setPreview(item.images);
                    }}
                    className="object-cover"
                  ></Image>
                </Card>
              </>
            );
          }}
        ></List>
        {preview.length > 0 ? (
          <Image.PreviewGroup
            preview={{
              visible: preview.length,
              onVisibleChange: (img) => (!img ? setPreview([]) : null),
            }}
          >
            {preview.map((img, i) => {
              return <Image src={img} key={i}></Image>;
            })}
          </Image.PreviewGroup>
        ) : null}
      </div>
    </>
  );
};

export default Search;
