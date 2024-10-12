import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error('Error Fetching Data')
    }
  }

  const removeFood = async (foodId) => {
    try {
        // Use DELETE method and pass foodId as a query parameter
        const response = await axios.delete(`${url}/api/food/remove`, {
            data: { id: foodId }
        });

        // Re-fetch the updated food list
        await fetchList();

        // Show success or error messages based on the response
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error('Error Removing Food');
        }
    } catch (error) {
        console.error("Error removing food:", error);
        toast.error('Internal Server Error');
    }
};


  useEffect(() => {
    fetchList();
  }, [])


  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => {
          return (
            <div key={item._id} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="food" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
