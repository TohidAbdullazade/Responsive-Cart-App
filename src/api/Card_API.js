export const GET_ALL_CARTS = async (search) => {
  let res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
  let data = await res.json();
  return data;

};
