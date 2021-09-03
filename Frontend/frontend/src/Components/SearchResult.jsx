import React, { Component } from 'react'
import axios from 'axios';
import { Card, Col,  Form,  Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default class SearchResult extends Component {

    constructor(props){
        super(props)

        this.onChangeSearchKey = this.onChangeSearchKey.bind(this);

        this.state = {
            Parts:[],
            searchKey:"",
            sortByNameParts: [],
            isSorted: false
        }
    }

    sortByName() {

        var sortedParts = this.state.Parts.sort(function(a,b) {
            return a.name.localeCompare(b.name)
        });

        this.setState({
            sortByNameParts: sortedParts,
            isSorted: true
        })
        console.log(sortedParts);
    }

    componentDidMount(){
        axios
            .get("http://localhost:8080/api/parts/viewParts/?searchKey="+this.props.match.params.searchKey)
            .then((res) => {
                this.setState({Parts:res.data});
            })
            .catch((err) =>{
                console.log(err);
            });
    }

    deletePart(id){
        console.log("Deleting part " + id);

        axios
            .delete("http://localhost:8080/api/parts/deletePart/" + id)
            .then((res) => {
                console.log(res);
                alert("Part is deleted");
                window.location.href= '';
            });

        

    }

    onChangeSearchKey(e){
        this.setState({
            searchKey : e.target.value
        })
    }

    
    

    render() {
        return (
            <div style = {{align : 'center'}}>
                <h1 style={{fontWeight:'bold', marginTop:'2rem'}}>Search Results for '{this.props.match.params.searchKey}'</h1>
                <div style = {{alignItems: 'center'}}>
                    <Form>
                    Search : <Form.Control type = "text" value = {this.state.searchKey} onChange = {this.onChangeSearchKey}></Form.Control>
                    <Button type = "submit"><a href={`/search/${this.state.searchKey}`} replace = "true">Search</a></Button>
                    </Form>

                    <Button onClick={() => this.sortByName()}>Sort By Name</Button>

                    <Link to = "/addPart" style={{textDecoration :'none', color:'black'}}>Add Part</Link>
                </div>

                
                <br/><br/>
                <div>
                    <Row xs = {10} md={2} lg={4} className ="g-4" style = {{display : 'flex', flexWrap:'wrap', alignItems: 'center', justifyContent:'space-around'}}>
                    {!this.state.isSorted ?
                        (this.state.Parts.map(
                            Part => 
                                <Col key={Part.id}>
                                    <Card style = {{ width: '18rem', height:'25rem', padding : "1rem", margin:"1rem", borderRadius: 15, backgroundColor: "orange"}}>
                                        <Card.Body>
                                            <Card.Title style={{fontWeight:'bold', fontSize:'30px'}}>{Part.name}</Card.Title>
                                            <Card.Text>{Part.desc}</Card.Text>
                                            <Card.Text>Shelf No. {Part.shelfNo}</Card.Text>
                                            <Card.Text>Rs. {Part.price}</Card.Text>
                                            <Card.Text>
                                                <Link to ={"/updatePart/"+Part.id}><img style =  {{height: '3rem', width:'3rem', marginTop:'2rem'}} src = "https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" alt="editIcon"/></Link>
                                                <img style ={{height : '3rem', width:'3rem', marginLeft:"1rem", marginTop:'2rem'}} src="https://www.pngall.com/wp-content/uploads/6/Delete-Button-PNG-HD-Image.png" alt = "deleteIcon" onClick={() => {this.deletePart(Part.id)}}/>
                                                
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    
                                </Col>
                                
                        )) :  (this.state.sortByNameParts.map(
                            Part => 
                                <Col key={Part.id}>
                                    <Card style = {{ width: '18rem', height:'25rem', padding : "1rem", margin:"1rem", borderRadius: 15, backgroundColor: "orange"}}>
                                        <Card.Body>
                                            <Card.Title style={{fontWeight:'bold', fontSize:'30px'}}>{Part.name}</Card.Title>
                                            <Card.Text>{Part.desc}</Card.Text>
                                            <Card.Text>Shelf No. {Part.shelfNo}</Card.Text>
                                            <Card.Text>Rs. {Part.price}</Card.Text>
                                            <Card.Text>
                                                <Link to ={"/updatePart/"+Part.id}><img style =  {{height: '3rem', width:'3rem', marginTop:'2rem'}} src = "https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" alt="editIcon"/></Link>
                                                <img style ={{height : '3rem', width:'3rem', marginLeft:"1rem", marginTop:'2rem'}} src="https://www.pngall.com/wp-content/uploads/6/Delete-Button-PNG-HD-Image.png" alt = "deleteIcon" onClick={() => {this.deletePart(Part.id)}}/>
                                                
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                        ))
            }
                    
                    </Row>
                </div>
            </div>
        )
    }
}