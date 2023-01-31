import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
  //get products
  const productsData = await fetch("products.json");
  const products = await productsData.json();

  //get cart
  console.log(products);
  const savedCart = getStoredCart();
  const initialCart = [];
  //   console.log("savedCart = ", savedCart);
  for (const id in savedCart) {
    const addedProduct = products.find((product) => product.id === id);
    // console.log(id, addedProduct);
    if (addedProduct) {
      const quantity = savedCart[id];
      addedProduct.quantity = quantity;
      initialCart.push(addedProduct);
    }
  }

  return { initialCart: initialCart };
};
