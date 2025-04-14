import React, { useEffect, useState } from 'react'
import Data from '../../shared/Data'

function ItemList() {
    const [items, setItems]=useState([]);
    useEffect(()=>{
        setItems(Data.ItemList)
    },[])
  return (
    <div className='row row-cols-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-7 mt-4'>
      {items.map((item)=>(
        <div key={item.id} style={{cursor: 'pointer'}} className='d-flex flex-column align-items-center'>
            <img src={item.image} width={45} height={45}></img>
            <h6 className='
            text-center'>{item.name}</h6>
        </div>
      ))}
    </div>
  )
}

export default ItemList
