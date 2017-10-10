import React, { Component } from 'react';
import '../style.css';

class Viewer extends Component {
  render() {
    return (
      <div className="viewer">
        <div className="viewer-scroller">
          <span className="viewer-arrow" onClick={this.props.goBack}>&#60;</span>
          <div className="viewer-img">
              <img src={this.props.images[this.props.viewerImg].fileName} alt={this.props.images[this.props.viewerImg].title} />
          </div>
          <span className="viewer-arrow" onClick={this.props.goForward}>&#62;</span>
        </div>
        <div className="viewer-counter">
            <span>Image {this.props.viewerImg + 1} of {this.props.images.length}</span>
        </div>
      </div>
    );
  }
}

export default Viewer;
