import React, { useEffect, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Items(props) {
  
  const data = useCart()
  let dispatch = useDispatchCart()

  let options = props.options;
  let priceOptions = Object.keys(options)

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const handleAddToCart = async () => {
    const finalPrice = qty * parseInt(options[size]);
    const itemToAdd = {
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    };
  
    const existingItemWithSameIdAndSize = data.find(
      item => item.id === itemToAdd.id && item.size === itemToAdd.size
    );
  
    if (existingItemWithSameIdAndSize) {
      // If an item with the same id and size exists, update it
      dispatch({
        type: "UPDATE",
        id: itemToAdd.id,
        qty: qty,
        price: finalPrice,
      });
      console.log("Updated Cart:", [...data]);
    } else {
      // If there is no item with the same id and size, add a new item
      dispatch({ type: "ADD", ...itemToAdd });
      console.log("Added New Item to Cart:", [...data, itemToAdd]);
    }
  };
  

  useEffect(() => {
    setSize(priceOptions[0]);
  }, []); 

  const finalPrice = qty * parseInt(options[size]);

  return(
    <div className="m-3">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" style={{ width: "100%", height: "200px", objectFit: "cover" }} src={props.foodItem.img} />
        <Card.Body>
          <Card.Title>{props.foodItem.name}</Card.Title>
          <Card.Text>
            {props.foodItem.description}
          </Card.Text>
          <div className='container w-100'>
            <select className=' h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(10), (e, i) => {
                return (<option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>
            <div className='d-inline h-100 fs-5'>
              ${finalPrice}/-
            </div>
            <hr />
            <div className='h-100 fs-5'>
              <Button className='text-white bg-success' onClick={handleAddToCart}>Add to cart</Button>
            </div>
          </div>
        </Card.Body>
        </Card>
    </div>
  );
}

export default Items;