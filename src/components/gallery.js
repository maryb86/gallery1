import React, { Component } from 'react';
import '../style.css';

class Gallery extends Component {
  render() {
    let images = this.props.images.map((image, index) => {
        return (
            <img src={image.fileName}
                 alt={image.title}
                 className={`gallery-img ${image.selected ? "selected" : ""}`}
                 onClick={this.props.handleClick}
                 key={index}
            />
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
