import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import update from 'immutability-helper';
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
      //TODO: AUTOMATICALLY DECIDE THE IMAGES BASED ON THE FOLDER
      this.state = {
          viewerImg: 0,
          images: [
            {fileName: batman, title: "Batman", selected: true},
            {fileName: drummer, title: "Drummer"},
            {fileName: duck, title: "Duck"},
            {fileName: polarbear, title: "Polar Bear"},
            {fileName: turtle, title: "Turtle"}
          ]
      }
      this.swapViewerImg = this.swapViewerImg.bind(this);
      this.goBack = this.goBack.bind(this);
      this.goForward = this.goForward.bind(this);
      this.viewerWrapper = this.viewerWrapper.bind(this);
  }

  findImgByFileName(fileName) {
      function lookForImg(element) {
          return element.fileName.includes(fileName);
      }
      const imageIndex = this.state.images.findIndex(lookForImg);
      if (imageIndex !== -1){
          return imageIndex
      } else {
          return 0;
      }
  }

  swapViewerImg(imageInfo) {
      //TODO: how to make imageinfo required object?
      const previousImage = this.state.viewerImg;
      let chosenImage = this.state.viewerImg;
      if (typeof imageInfo === "number"){
          //number = swapViewerImg was passed the index to swap to
          chosenImage = imageInfo;
      } else if (typeof imageInfo === "string"){
          //string = swapViewerImg was passed the filename, so convert to index
          chosenImage = this.findImgByFileName(imageInfo);
      }
      if (this.state.viewerImg !== chosenImage) {
          const images = update(this.state.images, {
              [chosenImage]: {selected: {$set: true}}
          });
          delete images[previousImage].selected;
          this.setState({
              viewerImg: chosenImage,
              images: images
          });
      }
  }

  goBack() {
      const prevImg = this.state.viewerImg - 1;
      if (prevImg >= 0){
          return prevImg;
      } else {
          return this.state.images.length - 1;
      }
  }

  goForward() {
      const nextImg = this.state.viewerImg + 1
      if (nextImg <= this.state.images.length - 1 ){
          return nextImg;
      } else {
          return 0;
      }
  }

  viewerWrapper(props) {
      //TODO: TEST OUT DIFFERENT URLS THAT ARE INVALID
      // E.G. URIError: Failed to decode param when url invalid
      //TODO: FIX ERROR IN CONSOLE
      if (props.match.params.image) {
          this.swapViewerImg(props.match.params.image);
      }

      return (
          <div>
            <Viewer
                viewerImg={this.state.viewerImg}
                images={this.state.images}
                goBack={this.goBack}
                goForward={this.goForward}
            />
          </div>
      );
  }

  render() {
    const firstTitle = this.state.images[0].title.toLowerCase().replace(/\s+/g, '');
    return (
      <div className="App">
        <header className="app-header">
          <h1 className="app-title">Mary's collection of homemade toys</h1>
            <Route
                path="/:image"
                render={this.viewerWrapper}
            />
            <Route
                exact
                path="/"
                render={() => (<Redirect to={firstTitle} />)}
            />
        </header>
        <Gallery
              images={this.state.images}
        />
      </div>
    );
  }
}

export default App;
