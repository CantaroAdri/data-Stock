
import { usePostCategoriaMutation } from '../service/shopService';



const CarritoScreen = ({ cartItems }) => {
  const [postCategoria, { isLoading, isSuccess, isError }] = usePostCategoriaMutation();

  const handleConfirmOrder = async () => {
    const orderData = {
      items: cartItems,
      totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
    
    };

    const handleConfirmOrder = async () => {
  if (cartItems.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  const orderData = {
    items: cartItems,
    totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toISOString(),
  };

    try {
      const response = await postCategoria(orderData).unwrap();
      console.log('Orden creada exitosamente:', response);
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  return (
    <div>
      <button onClick={handleConfirmOrder} disabled={isLoading}>
        {isLoading ? 'Procesando...' : 'Confirmar Pedido'}
      </button>
      {isSuccess && <p>Pedido confirmado con éxito.</p>}
      {isError && <p>Ocurrió un error al confirmar el pedido.</p>}
    </div>
  );
}};

export default CarritoScreen;