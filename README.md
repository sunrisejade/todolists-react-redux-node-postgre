
## GET Request

### Client Side

Step 1：client向（http://localhost:5000/api/getData）地址发送get请求

Step 3： client收到response对象后，将其中的数据res.data 通过action(getData)传递给reducer

Step 4： reducer收到action(getData)后便会更新store的state,state更新会触发页面自动更新

```
 componentDidMount() {
     axios.get(`http://localhost:5000/api/getData`)
     .then(res => {
      console.log(res.data)  
       const data = res.data;
       this.setState({ data });
       return data
     }).then(   
       data=> this.props.getDataFromDb(data)
     )
  }

 
```
Here the **res.data** look like this:

```
6) [{…}, {…}, {…}, {…}, {…}, {…}]
0: {id: 100, item: "ddd"}
1: {id: 101, item: "dfd"}
2: {id: 102, item: "dddd"}
3: {id: 106, item: "ffffffff"}
4: {id: 107, item: "ddddddffffffff"}
5: {id: 108, item: "ddddd"}
length: 6
__proto__: Array(0)
```


### Server Side

Step 2： server收到请求后，在PostgreSQL数据库中选取需要的数据，通过 res.json 方法返回给 client
```
app.get('/api/getData', (req, res) => {

        client
            .query("select * from todos")
            .then(result => res.json(result.rows))
            <!-- .then(result=>console.log('server respond data to client',result)) -->
            .catch(err => console.error(err));
    });
```
When Data output from database:
here result look like this among them rows are the data we will pass to client
we can use res.send() and res.json() to respond client with data
```
{
  command: 'SELECT',
  rowCount: 6,
  oid: null,
  rows: [
    { id: 100, item: 'ddd' },
    { id: 101, item: 'dfd' },
    { id: 102, item: 'dddd' },
    { id: 106, item: 'ffffffff' },
    { id: 107, item: 'ddddddffffffff' },
    { id: 108, item: 'ddddd' }
  ],
  fields: [
    Field {
      name: 'id',
      tableID: 16395,
      columnID: 1,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: 'text'
    },
    Field {
      name: 'item',
      tableID: 16395,
      columnID: 3,
      dataTypeID: 25,
      dataTypeSize: -1,
      dataTypeModifier: -1,
      format: 'text'
    }
  ],
  _parsers: [ [Function: parseInteger], [Function: noParse] ],
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false
}
```

## Post Request

### Client Side

Step 1： client向（http://localhost:5000/api/addData）地址发送post请求

Step 3： client收到从'/api/getData'返回来的全部数据，而不是增加的那一条，通过action(addData)传递给reducer

Step 4： reducer收到action(addData)后便会更新store的state
```

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
        console.log('client side add data receive res?',res) 
        const data = res.data;
        return data
      }).then(
        data=> this.props.addDataToDb(data) 
        // console.log('get back data from server side:',data) 
      )
    
    this.setState({
      input:''
    })
    // window.location.reload()
  }
```

### Server Side

Step 2： server收到请求后，将数据增加到PostgreSQL数据库，重定向到"/api/addData"，因为只有select语句会返回数据，而post的数据库语句只负责插入数据，什么结果也不返回

```
  app.post("/api/addData", (req,res) => {
        console.log('Server side Add data success:', req.body)
        client
            .query(
                "insert into todos (item) values ($1)",
                [req.body.item]
            )
            .then(res.redirect("/api/getData"))
            <!-- .then(res.sendStatus(200)) --> // 当重定向以后不能再发送状态 Cannot set headers after they are sent to the client
            .catch(err => console.error(err));    
        });
```

## DELETE Request

### Client Side

Step 1： client 向（http://localhost:5000//api/deleteData）地址发送delete请求
Step 3： client收到后通过action(deleteData)传递给reducer
Step 4： reducer收到deleteData后便会更新store的state

```
  onDelete(event){
    event.preventDefault()

    this.setState({ deleteItem: event.target.innerText})

    let item=event.target.innerText
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

```
### Server Side

Step 2： server收到请求后，通过node-pg操作PostgreSQL数据库进行删除，删除成功后返回删除的那一条数据给client

```
   app.delete("/api/deleteData", (req,res) => {
        console.log('Server side Delete data success :',req.query.data)

        client
            .query(
                "delete from todos where item = $1", 
                [req.query.data]
            ).then(res.json(req.query.data))
            .catch(err => console.error(err));      
    });
```



