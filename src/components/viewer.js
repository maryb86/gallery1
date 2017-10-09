import React, { Component } from 'react';
import '../style.css';

class Viewer extends Component {
  render() {
    console.log("VIEWER PROPS: ", this.props)
    return (
      <div className="App">
        <span className="arrow" onClick={this.props.goBack}>&#60;</span>
        <img src={this.props.viewerImg.fileName} alt={this.props.viewerImg.title} className="Viewer-img" />
        <span className="arrow" onClick={this.props.goForward}>&#62;</span>
      </div>
    );
  }
}

export default Viewer;
