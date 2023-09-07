import React from "react";
import Items from "./Items";
import { useEffect, useState } from "react";
import DarkVariantExample from "./DarkVariantExample";
function Body() {
  
  const [foodCat, setfoodCat] = useState([])
  const [foodItem, setfoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json();
    setfoodItem(response[0])
    setfoodCat(response[1])
  }
  useEffect(() => {
    loadData()
  }, [])

  
  const [search, setSearch] = useState('')
  return (
    <div >
      <div className='m-3' style={{ objectFit: "contain", height: "auto" }}>
        <DarkVariantExample search={search} setSearch={setSearch} />
      </div>
      <div>
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row m-3" key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Items foodItem = {filterItems}
                          options={filterItems.options[0]} ></Items>
                      </div>
                    ))
                ) : (
                  <div>No such Data found</div>
                )}
              </div>
            )
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );

}
export default Body;

