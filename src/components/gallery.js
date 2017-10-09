import React, { Component } from 'react';
import '../style.css';

class Gallery extends Component {
  render() {
    let images = this.props.images.map((image, index) => {
        return (
            <img src={image.fileName} alt={image.title} className="Gallery-img" onClick={this.props.handleClick} key={index}/>
        )
    })
    return (
      //TODO: USE FLEXBOX AND STYLE
      //TODO: MAKE IMAGE AT THE TOP SHOW HIGHLIGHTED AT THE BOTTOM
      //TODO: DISPLAY IMAGE NUMBER (E.G. 2 OUT OF 4)
      //TODO: AUTOMATICALLY DECIDE THE IMAGES BASED ON THE FOLDER
      <div className="Gallery">
          {images}
      </div>
    );
  }
}

export default Gallery;
