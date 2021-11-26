import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const ManageAllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        const url = `https://afternoon-inlet-87445.herokuapp.com/orders`
        fetch(url).then(res => res.json()).then(data => setOrders(data))
    },[]);

    const handleDelete = id =>{
        const url = `https://afternoon-inlet-87445.herokuapp.com/orders/${id}`;
        fetch(url, {
            method: 'delete'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                window.confirm('Are you sure Delete is Item')
                const remaining = orders.filter(order =>  order._id !== id);
                setOrders(remaining);
                
            }
           
        } )

    }


    return (
        <>
           <Container>
            <h2>Manage All Orders : {orders.length} </h2>

            <Table striped bordered hover>
  <thead>
    <tr>
     
      <th>Image</th>
      <th>Owner Name</th>
      <th>Product Name</th>
      <th>Email</th>
      <th>Price</th>
      <th>Wating</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
      {
          orders.map(order => <tr 
          key={order._id}
          > 
       
      <td><img width="100px" height="50px" src={order.image} alt="" /></td>
      <td>{order.ownerName}</td>
      <td>{order.productName}</td>
      <td>{order.email}</td>
      <td>{order.productPrice}$</td>
      <td><button style={{backgroundColor:"green" , border:"none", padding:'5px 10px', color:"white", borderRadius:"5px"}}>Wating</button></td>
      <td><button style={{backgroundColor:"red" , border:"none", padding:'5px 10px', color:"white", borderRadius:"5px"}} onClick={()=> handleDelete(order._id)}>Delete</button></td>
          </tr>)
      }
  </tbody>
</Table>
        </Container> 
        </>
    );
};

export default ManageAllOrders;