import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

class Gallery extends Component {
  render() {
    let images = this.props.images.map((image, index) => {
        const url = image.title.toLowerCase().replace(/\s+/g, '');
        return (
            //TODO: How to properly set key for each instance of Link (diff to img?)
            <Link to={url} key={index}>
                <img src={image.fileName}
                     alt={image.title}
                     className={`gallery-img ${image.selected ? "selected" : ""}`}
                     onClick={this.props.handleClick}
                     key={index}
                />
            </Link>
        )
    })
    return (
      <div className="gallery">
          {images}
      </div>
    );
  }
}

export default Gallery;
