import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import { Icon, Card, Image, Label, Container } from 'semantic-ui-react'
import './App.css';

const URL = 'https://api.mercadolibre.com/sites/MCO/search?q='

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>API MercadoLibre</h2>
        </div>
        <br/>
      </div>
    );
  }
}

class NASA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
      items: []
    }
    this.textChanged = this.textChanged.bind(this)
  }

  textChanged(event){
    var self = this;
    var text = event.target.value
    this.setState({inputText: text})
    axios.get(URL+text).then(function(response){
      self.setState({items: response.data.results})
    })
    .catch(function(error){});

  }

  render(){
    return(
      <div>
        <input type="text" placeholder="Search" onChange={this.textChanged} value={this.state.inputText}/>
        <Container ClassName="container">
          <Items items={this.state.items}/>
        </Container>
      </div>
      
    );
  }
}

const Items = ({ items }) => {
  return(
      <Card.Group stackable>
          {items.map(item =>
              <Item
                  title={item.title}
                  img = {item.thumbnail}
                  price = {item.price}
              />
          )}
      </Card.Group>
  )
}

const Item = ({ title, img, price }) => (
  
<div class="ui card">
  <img class="ui image" src={img}/>
  <div class="content">
    <div class="description">{title}</div>
  </div>
  <div class="extra content">
    <a>
<i aria-hidden="true" class="user icon"></i><strong>${price}</strong></a>
  </div>
</div>
);

export { App, NASA, Item,Items };
