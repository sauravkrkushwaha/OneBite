import React, {} from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer'; // Import the useCart hook

export default function Cart() {
  const data = useCart()
  const dispatch = useDispatchCart();
  const totalPrice = data.reduce((total, food) => total + food.price, 0)

  // const [userEmail, setUserEmail] = useState('');

 

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    console.log("Data to be sent:", data); 

    // console.log(data,localStorage.getItem("userEmail"),new Date())
    try{
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data, 
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  } catch(error){
    console.log("Error during CheckOutlined",error)
  }
  }
  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5'>
        {data.length === 0 ? (
          <div className='text-center fs-3 bg-white p-3'>
            The Cart is Empty!
          </div>
        ) : (
          <div className='table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover bg-white'>
              <thead className='text-success fs-4'>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Option</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {data.map((food, index) => (
                <tr key={food.id}>
                  <th scope='row'>{index+1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button type='button' className='btn p-0'onClick={() => { dispatch({ type: "REMOVE", index: index }) }}  >
                      X
                    </button>
                  </td>
                </tr>
              ))} 
              </tbody>
              
            </table>
            <div>
              <h1 className='fs-2 bg-white'>
                Total Price: ${totalPrice}/-
              </h1>
            </div>
            <div>
              <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
