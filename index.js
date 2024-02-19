import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import data from "./data";
import {nanoid} from "nanoid"
import Item from "./item";


function Main(){
  let[items,setitems]=React.useState([])
  let[search,setsearch]=React.useState('')

  function handleChange(e){
    setsearch(e.target.value)
  }

  function addItem(){
    let newItem={
      name:search,
      quantity:1,
      completed:false,
      id:nanoid(),
    }
    setitems([...items,newItem])
    setsearch("")
  } 

  function handleToggle(id,completed){
    setitems(current=>{
      return current.map(item=>{
        if(item.id===id){
          return{...item,completed}
        }
        return item
      })
    })
  }


  function incQuantity(index){
    let newItem=[...items]
    newItem[index].quantity++;
    setitems(newItem)
  }

  function deincQuantity(index,id){
    let newItem=[...items]
    newItem[index].quantity--;
    setitems(newItem)
    if(newItem[index].quantity===0){
      setitems(prev=>{
        return prev.filter(t=>t.id !== id)
      })
    }

  }
  

  

  return (
    <div className="container">
      <div className="search-item">
        <div>
          <input onChange={handleChange} type="text" placeholder="Add an item" />
        </div>

        <div>
          <button onClick={addItem} >+</button>
        </div>
      </div>

      <div className="items-list">
        {
          items.map((item, index)=>(
            <div>
        <div className="item">
          <div className="left">
            <input type="checkbox" checked={item.completed} onChange={e=>handleToggle(item.id,e.target.checked)} />
            <p style={item.completed ? {color:"grey",textDecoration:"line-through"}:{color:"black"}}>{item.name}</p>
          </div>

          <div className="right">
            <button onClick={()=>incQuantity(index)} >+</button>
            <span>{item.quantity}</span>
            <button onClick={()=>deincQuantity(index,item.id)} >-</button>
            
          </div>
          
           
        </div>
        <hr />
      </div>
          ))
        }
      </div>
    </div>
    

  )
}


ReactDOM.render(<Main />, document.getElementById("root"));