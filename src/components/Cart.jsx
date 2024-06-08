import { useContext, useState } from "react";
import { faClose, faDollar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

import Button from "./Button";
import Modal from "./Modal";
import CartItem from "./CartItem";

function Cart() {
    const { productsCartList } = useContext(CartContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const totalPrice = productsCartList.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <>
            <div className="cart__container">
                <Button
                    icon={faShoppingCart}
                    className="cart__navbar-button"
                    action={() => setOpen(!open)}
                    disabled={!productsCartList.length}
                />
                {productsCartList.length ? (
                    <div className="cart__badge">
                        <span>
                            {productsCartList.reduce(
                                (acc, item) => acc + item.quantity,
                                0
                            )}
                        </span>
                    </div>
                ) : undefined}
            </div>
            <Modal show={open} onClose={() => setOpen(false)}>
                <>
                    <div className="modal__header">
                        <Button
                            icon={faClose}
                            className="modal__close"
                            action={() => setOpen(!open)}
                        />
                    </div>
                    {productsCartList.map(
                        (data) =>
                            data && (
                                <CartItem
                                    key={data.product._id}
                                    {...data}
                                />
                            )
                    )}
                    <div className="modal__footer">
                        <p>Total: ${totalPrice.toFixed(2)}</p>
                        <Button
                            icon={faDollar}
                            className="modal__btn-buy"
                            label="Comprar"
                            action={() => {
                                navigate("/checkout");
                                setOpen(!open);
                            }}
                        />
                    </div>
                </>
            </Modal>
        </>
    );
}

export default Cart;
