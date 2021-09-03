import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";

export default class UpdatePart extends Component {

    constructor(props){
        super(props);

        this.onChangePartName = this.onChangePartName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeShelfNo = this.onChangeShelfNo.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);

        this.handleRadio = this.handleRadio.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name : "",
            desc : "",
            shelfNo : "",
            price : "",
            availability: ""
        }

    }

    componentDidMount(){
        axios
            .get("http://localhost:8080/api/parts/viewParts/"+ this.props.match.params.id)
            .then((res)=>{
                var shelfNum = res.data.shelfNo;

                console.log(shelfNum);
                
                this.setState({
                    name:res.data.name,
                    desc:res.data.desc,
                    price:res.data.price,
                    shelfNo: shelfNum,
                    availability:res.data.availability
                });
            })
            .catch((err)=> console.log(err));
    }

    handleRadio(e){
        this.setState({
            availability:e.target.value
        });
    }

    onChangePartName(e){
        this.setState({
            name : e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            desc : e.target.value
        });
    }

    onChangeShelfNo(e){
        const num = parseInt(e.target.value);
        this.setState({
            shelfNo: num
        });
    }

    onChangePrice(e){
        this.setState({
            price : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const updatedPart = {
            name : this.state.name,
            desc : this.state.desc,
            price : this.state.price,
            shelfNo : this.state.shelfNo,
            availability : this.state.availability
        }
        axios.put("http://localhost:8080/api/parts/updatePart/" + this.props.match.params.id, updatedPart).then((res) => {
          console.log(res.data);
          alert("Part Updated Successfully");
          window.location.href ='/';
        });

        this.setState({
            name:"",
            desc:"",
            shelfNo:"",
            price:"",
            availability:""
        })

    }

    render() {
        return (
            <div>
                <br/>
                <h1 style={{color:"#0e7794", marginTop:'2rem', fontWeight:'bold'}}>Update Part details</h1>
                <br/>
                <div className="card col-md-6 offset-md-3 offset-md-3" style={{padding : '1rem', borderRadius:15}}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group className = "mb-3" controlId = "formBasicName">
                        <Form.Label>Name of Part</Form.Label>
                        <br/>
                        <Form.Control type = "text"
                            placeholder = "Enter the name of the part" onChange = {this.onChangePartName} value = {this.state.name} required/>
                    </Form.Group>
                    <br/>
                    <Form.Group className = "mb-3" controlId = "formBasicdescription">
                        <Form.Label>Description</Form.Label><br/>
                        <Form.Control as = "textarea" 
                            rows = {4} onChange = {this.onChangeDescription} value = {this.state.desc}/>
                    </Form.Group>
                    <br/>
                    <Form.Group className = "mb-3" controlId = "formBasicShelfNo">
                        <Form.Label>Shelf Number</Form.Label><br/>
                        <Form.Control as = "select" onChange = {this.onChangeShelfNo} value = {this.state.shelfNo}>
                            <option>Select shelf Number</option>
                            <option value = '1'>Shelf No. 01</option>
                            <option value = '2'>Shelf No. 02</option>
                            <option value = '3'>Shelf No. 03</option>
                            <option value = '4'>Shelf No. 04</option>
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Group className = "mb-3" controlId = "formBasicPrice">
                        <Form.Label>Price</Form.Label><br/>
                        <Form.Control type = "text" placeholder = "Enter the price" onChange = {this.onChangePrice} value = {this.state.price} required/>
                    </Form.Group>
                    <br/>
                    
                    <Form.Group className = "mb-3" controlId = "formBasicAvailability">
                        <Form.Label>Availability</Form.Label>
                        <br/><br/>
                        <Form.Text>Available</Form.Text>
                        <Form.Check type = "radio" value = "true" name = "availability" checked ={this.state.availability === 'true'} onChange = {this.handleRadio}/>
                        <br/>
                        <Form.Text>Not Available</Form.Text>
                        <Form.Check type = "radio" value = "false" name = "availability" checked = {this.state.availability === 'false'} onChange = {this.handleRadio}/>
                        
                    </Form.Group>
                    <br/>

                    <Button style = {{backgroundColor:"#053b4b", color:"white", borderRadius:15}} variant = "primary" type = "submit">Update</Button>
                    
                </Form>
                </div>
                
            </div>
        )
    }
}
