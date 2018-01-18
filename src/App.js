import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const request = require("request");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {uid: '', pwd: '', authorization: '', test: ''};
  }

  handleChange = (event) => {
    console.log('handleChange')
    switch (event.target.name) {
      case 'uid': this.setState( {uid: event.target.value} )       
        break
      case 'pwd': this.setState( {pwd: event.target.value} )       
        break
      default: break
    }
  }

  tokenRemove = (event) => {
    this.setState( {authorization: ''})
  }

  testRequest = (event) => {
    event.preventDefault()
    console.log('testRequest')
    request(
      { 
        method: 'GET',
        url: 'https://service.eu.apiconnect.ibmcloud.com/gws/apigateway/api/a2291165c0c1f408c2ce3e40b61198bdbd973199c84bcb7fef223b6eaae1de8a/cc3037f1-6133-419d-85a8-b43cb599449e/test',
        headers: { 
          'accept': 'application/json', 
          'content-type': 'application/json',
          'authorization': this.state.authorization
      }, 
        json: true 
      }, 
      (error, response, body) => {
        if (error) {
          this.setState( { test: error.message })
        } else {
          this.setState( { test: body.message || JSON.parse(body.body).error_description })
        }
    })
  }

  tokenRequest = (event) => {
    event.preventDefault()
    console.log('tokenRequest')
    request(
      { 
        method: 'POST',
        url: 'https://service.eu.apiconnect.ibmcloud.com/gws/apigateway/api/a2291165c0c1f408c2ce3e40b61198bdbd973199c84bcb7fef223b6eaae1de8a/api/token',
        headers: { accept: 'application/json', 'content-type': 'application/json' }, 
        body: { uid: this.state.uid, pwd: this.state.pwd },
        json: true 
      }, 
      (error, response, body) => {
        if (error) {
          this.setState( { authorization: error.message })
        } else {
          this.setState( { authorization: JSON.parse(body.body).access_token || JSON.parse(body.body).error_description })
        }
    })
  }
  
  render(props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.tokenRequest}>
          <label>Käyttäjätunnus</label>
          <input name="uid" type="text" value={this.state.uid} onChange={this.handleChange}/>
          <br/>
          <label>salasana</label>
          <input name="pwd" type="password" value={this.state.pwd} onChange={this.handleChange}/>
          <br/>
          <input type="submit" value="login"/>
          <input type="button" onClick={this.testRequest} value="test"/>
          <input type="button" onClick={this.tokenRemove} value="logout"/>
        </form>
        <label>authorization:
          <br/>{ this.state.authorization }<br/>
        </label>
        <label>test result:
          <br/>{ this.state.test }<br/>
        </label>
      </div>
    );
  }
}

export default App;