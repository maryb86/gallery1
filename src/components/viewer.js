import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

class Viewer extends Component {

  render() {
    const prevImg = this.props.images[this.props.goBack()].title.toLowerCase().replace(/\s+/g, '');
    const nextImg = this.props.images[this.props.goForward()].title.toLowerCase().replace(/\s+/g, '');
    return (
      <div className="viewer">
        <div className="viewer-scroller">
          <Link to={prevImg}>
            <span className="viewer-arrow">&#60;</span>
          </Link>
          <div className="viewer-img">
              <img src={this.props.images[this.props.viewerImg].fileName} alt={this.props.images[this.props.viewerImg].title} />
          </div>
          <Link to={nextImg}>
            <span className="viewer-arrow">&#62;</span>
          </Link>
        </div>
        <div className="viewer-counter">
            <span>Image {this.props.viewerImg + 1} of {this.props.images.length}</span>
        </div>
      </div>
    );
  }
}

export default Viewer;
