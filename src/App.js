import React, { Component } from 'react';
import logo from './logo.png';
import axios from 'axios'
import {Card, Image,Grid, Divider  } from 'semantic-ui-react'
import './App.css';

const URL = 'https://api.mercadolibre.com/sites/MCO/search?q='

class App extends Component {
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
    .catch(function(error){
      alert(error);
    });

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>API MercadoLibre FrankCastrillon</h2>
          <input type="text" placeholder="Search" onChange={this.textChanged} value={this.state.inputText}/>
        </div>
        <br/>
        <div>
        <Grid columns={3} relaxed>
          <Card.Group>
            <Items items={this.state.items}/>
          </Card.Group>
        </Grid>
      </div>
      </div>
    );
  }
}

const Items = ({ items }) => {
  return(
    <Grid.Column>
      <Card>
        <Card.Content>
            {items.map(item =>
                <Item
                    title={item.title}
                    img = {item.thumbnail}
                    price ={item.price}
                />
            )}
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

const Item = ({ title, img, price }) => (
  <div>
    <Image floated='right' size='mini' src={img}/>
    <Card.Header>
      <strong class="strong">
          ${price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
      </strong>
    </Card.Header>
    <Card.Description>
      {title}
    </Card.Description>
    </div>
);

export { App, Item,Items };
