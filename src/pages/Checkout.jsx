import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

function Checkout() {
    const { productsCartList, clearCart } = useContext(CartContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const totalPrice = productsCartList.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleCheckout = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
            clearCart(); // Limpia el carrito después del pago
        }, 2000); // Simula un retraso en el procesamiento del pago
    };

    if (paymentSuccess) {
        return (
            <div>
                <h1>Pago exitoso</h1>
                <p>Gracias por su compra.</p>
            </div>
        );
    }

    return (
        <div>
            {productsCartList.map(
                data => (
                    <CartItem
                        key={data.product._id}
                        {...data}
                        edit={false}
                    />
                )
            )}
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? 'Procesando...' : 'Proceder al Pago'}
            </button>
        </div>
    );
}

export default Checkout;
