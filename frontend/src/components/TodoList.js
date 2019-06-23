import React, { Component } from 'react'
import {connect } from 'react-redux';
import axios from 'axios';
import {getData,addData,deleteData} from '../actions';
import '../App.css';

class TodoList extends Component {
  state = {
    input:'',
    data: [],
    deleteItem: '',
  }
  componentDidMount() {
     axios.get(`http://localhost:5000/api/getData`)
     .then(res => {
      // console.log(res.data)  
       const data = res.data;
       this.setState({ data });
       return data
     }).then(   
       data=> this.props.getDataFromDb(data)  
     )
  }
  onInputChange(event) {
    this.setState({
      input:event.target.value
    })
  }

  onSubmit(event){
    event.preventDefault()  

    axios({
        method: 'post',
        url: 'http://localhost:5000/api/addData',
        data: {
          item: this.state.input
        }
      })
      .then(res => {
        console.log('client side add data receive res?',res) //这里的response是从'/api/getData'来的，返回的是全部的数据，而不是增加的那一条
        const data = res.data;
        return data
      }).then(
        data=> this.props.addDataToDb(data) 
        // console.log('get back data from server side:',data) 
      )
    
    this.setState({
      input:''
    })

  }

  onDelete(event){
    event.preventDefault() 
    this.setState({ deleteItem: event.target.innerText})

    let item=event.target.innerText
    // alert(event.target.getAttribute("key"))
    console.log('client side delete data:',item) 
   
    axios.delete('http://localhost:5000/api/deleteData/',{
      params:{
        data: item
      }
    })
	  // .then(res => console.log('client side:success delete data from db',res));
    .then(res => {
      const data = res.data;
      return data
    }).then(
      data=>this.props.deleteDataFromDb(data)
    )
  }

  render() {

    return (
      <div>
      <div className="todo-table">
           <form onSubmit={this.onSubmit.bind(this)}>
                    <input 
                      type='text' 
                      name='item' 
                      placeholder='Add new item...' 
                      value={this.state.input}
                      onChange={this.onInputChange.bind(this)} 
                      required />
                    <button type= 'submit'>Add Item</button>
            </form>
         
      </div>
   
   <div>
   <ul >
       { this.props.data.map( each => 
         <li key={each.id} name={each.id} onClick={this.onDelete.bind(this)}>{each.item}</li>)
       }
     </ul>
</div>
</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data:state
    } 
}
const mapDispatchToProps = (dispatch) =>{
  return {
    getDataFromDb:(data)=>{   
       dispatch(getData(data))
          
    },
    addDataToDb:(data)=>{
      dispatch(addData(data))
    },
    deleteDataFromDb:(data)=>{
      dispatch(deleteData(data))
    }
  }
} 

export default connect(mapStateToProps,mapDispatchToProps)(TodoList) ;

