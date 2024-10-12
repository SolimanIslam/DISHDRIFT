import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  }

  const statusHandle = async (event, orderId) => {
    const { value } = event.target;
    try {
      const response = await axios.post(url + '/api/order/status', {
        orderId,
        status: value
      });

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => (
                  index === order.items.length - 1
                    ? item.name + ' x ' + item.quantity
                    : item.name + ' x ' + item.quantity + ', '
                ))}
              </p>

              {order.address ? (
                <>
                  <p className="order-item-name">
                    {order.address.firstName + ' ' + order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipCode}
                    </p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </>
              ) : (
                <p className="order-item-name">Address information not available</p>
              )}
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => { statusHandle(event, order._id) }} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Food Delivery">Out For Food Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
