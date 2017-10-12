import React from 'react';

const Gallery = (props) => {
    let images
    if (props.animalProps.images) {
        images = props.animalProps.images.map((url, i) => {
            if (i > 0) {
                return(
                    <div className="gallery__container">
                        <img className="gallery__container__thumbnail" src={url} key={i}/>
                    </div>
                )
            }
        })
    }

    return(
        <div className="gallery">
            {images}
        </div>
    )
}

export default Gallery