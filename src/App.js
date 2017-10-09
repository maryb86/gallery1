import React, { Component } from 'react';
//import logo from './img/logo.svg';
import Viewer from "./components/viewer";
import Gallery from "./components/gallery"
import batman from './img/batman.jpg';
import drummer from './img/drummer.jpg';
import duck from './img/duck.jpg';
import polarbear from './img/polarbear.jpg';
import turtle from './img/turtle.jpg';
import './style.css';

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
          viewerImg: 0,
          images: [
            {fileName: batman, title: "Batman"},
            {fileName: drummer, title: "Drummer"},
            {fileName: duck, title: "Duck"},
            {fileName: polarbear, title: "Polar Bear"},
            {fileName: turtle, title: "Turtle"}
          ]
      }
      this.swapViewerImg = this.swapViewerImg.bind(this);
      this.goBack = this.goBack.bind(this);
      this.goForward = this.goForward.bind(this);
      this.findImg = this.findImg.bind(this);
  }

  findImg(e) {
      function lookForImg(element) {
          return e.target.src.includes(element.fileName);
      }
      const imageIndex = this.state.images.findIndex(lookForImg);
      return imageIndex;
  }

  swapViewerImg(e) {
      const image = this.findImg(e)
      this.setState({
          viewerImg: image
      })
  }

  goBack(e) {
      const prevImg = this.state.viewerImg - 1
      if (prevImg >= 0){
          this.setState({
              viewerImg: prevImg
          })
      } else {
          this.setState({
              viewerImg: this.state.images.length - 1
          })
      }
  }

  goForward(e) {
      const nextImg = this.state.viewerImg + 1
      if (nextImg <= this.state.images.length - 1 ){
          this.setState({
              viewerImg: nextImg
          })
      } else {
          this.setState({
              viewerImg: 0
          })
      }
   }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Mary's collection of homemade toys</h1>
          <Viewer
              viewerImg={this.state.images[this.state.viewerImg]}
              goBack={this.goBack}
              goForward={this.goForward}
          />
        </header>
        <Gallery
              handleClick={this.swapViewerImg}
              images={this.state.images}
        />
      </div>
    );
  }
}

export default App;
