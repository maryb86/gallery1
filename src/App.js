import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
      this.findImg = this.findImg.bind(this);
      this.MyViewer = this.MyViewer.bind(this);
  }

  //TODO: CAN THESE TWO BE COMBINED?
  findImg(e) {
      function lookForImg(element) {
          return e.target.src.includes(element.fileName);
      }
      const imageIndex = this.state.images.findIndex(lookForImg);
      return imageIndex;
  }

  findImgByFileName(fileName) {
      function lookForImg(element) {
          return element.fileName.includes(fileName);
      }
      const imageIndex = this.state.images.findIndex(lookForImg);
      return imageIndex;
  }

  //TODO: LOSE THE DUPLICATION OF SWAPVIEWERIMG
  swapViewerImg(e, imageInfo) {
      const previousImage = this.state.viewerImg;
      let chosenImage = "";
      //TODO: CREATE LOCAL VAR FOR IMAGEINFO PROPERTIES FOR BETTER READING
      if (imageInfo && (imageInfo.imageIndex || imageInfo.imageIndex === 0)) {
          chosenImage = imageInfo.imageIndex;
      } else {
          if (imageInfo && imageInfo.fileName) {
              chosenImage = this.findImgByFileName(imageInfo.fileName);
          } else {
              chosenImage = this.findImg(e);
          }
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

  swapViewerImgByUrl(imageInfo) {
      const previousImage = this.state.viewerImg;
      let chosenImage = this.state.viewerImg;
      if (imageInfo && imageInfo.fileName) {
          chosenImage = this.findImgByFileName(imageInfo.fileName);
      };
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

  goBack(e) {
      const prevImg = this.state.viewerImg - 1;
      if (prevImg >= 0){
          this.swapViewerImg(e, {
              imageIndex: prevImg
          });
      } else {
          this.swapViewerImg(e, {
              imageIndex: this.state.images.length - 1
          });
      }
  }

  goForward(e) {
      const nextImg = this.state.viewerImg + 1
      if (nextImg <= this.state.images.length - 1 ){
          this.swapViewerImg(e, {
              imageIndex: nextImg
          });
      } else {
          this.swapViewerImg(e, {
              imageIndex: 0
          });
      }
  }

  //TODO: RENAME THIS TO SOMETHING BETTER
  MyViewer(props) {
      let viewerImgName = "";
      //TODO: P0 - FIX BUG! DEFAULT NOT SHOWING WHEN NO IMAGE PROVIDED IN URL
      //TODO: P1 - FIX BUG! CHANGE URL WHEN IMAGE CLICKED - SEE ERROR IN CONSOLE
      //TODO: TEST OUT DIFFERENT URLS THAT ARE INVALID
      if (props.match.params.image) {
          this.swapViewerImgByUrl({
              fileName: props.match.params.image
          });
      }

      return (
          <div>
            <Viewer
                viewerImg={this.state.viewerImg}
                images={this.state.images}
                goBack={this.goBack}
                goForward={this.goForward}
                //{...props}
            />
          </div>
      );
  }

  render() {
    return (
      <div className="App">
        <header className="app-header">
          <h1 className="app-title">Mary's collection of homemade toys</h1>
          <Route
              path="/:image"
              render={this.MyViewer}
          />
          <Route
              exact
              path="/"
              render={() => (<Redirect to={`/${this.state.images[0].fileName}`}/>)}
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
