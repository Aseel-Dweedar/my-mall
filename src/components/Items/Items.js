import React from 'react'
import './items.css'
import Item from './Item/Item'

function Items(props) {
  return (
    <div className='items-container' >
        {
            props.items && props.items.map(item => <Item item={item} onDeleteItem={props.onDeleteItem} /> )
        }
    </div>
  )
}

export default Items