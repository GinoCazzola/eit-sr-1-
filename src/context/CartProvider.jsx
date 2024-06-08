import React, { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { editCart, getCart, postCart } from '../util/api';

function CartProvider({ children }) {
    const [idCart, setIdCart] = useState(null);
    const [productsCartList, setProductsCartList] = useState([]);

    useEffect(() => {
        const storedIdCart = localStorage.getItem("cartId");
        if (storedIdCart) {
            getCart(storedIdCart)
                .then(({ cart }) => {
                    if (cart.items) {
                        setProductsCartList(cart.items);
                        setIdCart(storedIdCart);
                    }
                })
                .catch(err => console.error(err));
        }
    }, []);

    const addProd = ({ _id, quantity }) => {
        const data = {
            quantity,
            product: _id
        };
        const prodFinded = productsCartList.find(prod => prod.product?._id === _id);

        if (prodFinded) {
            const newCart = productsCartList.map(
                prod => prod.product?._id === data.product ? data : prod
            );
            editCart(idCart, newCart)
                .then(({ cart }) => {
                    if (cart.items) {
                        setProductsCartList(cart.items);
                    }
                })
                .catch(err => console.error(err));
        } else {
            if (!idCart) {
                postCart([data])
                    .then(({ cart }) => {
                        localStorage.setItem("cartId", cart._id);
                        setIdCart(cart._id);
                        if (cart.items) {
                            setProductsCartList(cart.items);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                const newCart = [...productsCartList, data];
                editCart(idCart, newCart)
                    .then(({ cart }) => {
                        if (cart.items) {
                            setProductsCartList(cart.items);
                        }
                    })
                    .catch(err => console.error(err));
            }
        }
    };

    const removeProd = id => {
        const prodFinded = productsCartList.find(prod => prod.product?._id === id);
        if (idCart) {
            if (prodFinded?.quantity > 1) {
                const newCart = productsCartList.map(
                    prod => prod.product._id === id ? {
                        ...prod,
                        quantity: prod.quantity - 1
                    } : prod
                );
                editCart(idCart, newCart)
                    .then(({ cart }) => {
                        if (cart.items) {
                            setProductsCartList(cart.items);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                const newCart = productsCartList.filter(prod => prod.product?._id !== id);
                editCart(idCart, newCart)
                    .then(({ cart }) => {
                        if (cart.items) {
                            setProductsCartList(cart.items);
                        }
                    })
                    .catch(err => console.error(err));
            }
        }
    };

    const clearCart = () => {
        setIdCart(null);
        localStorage.removeItem("cartId");
        setProductsCartList([]);
    };

    return (
        <CartContext.Provider value={{
            productsCartList,
            addProd,
            removeProd,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
