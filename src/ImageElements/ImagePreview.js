import React from 'react';

const ImagePreview = (props) => {

    let featured = null
    let previews = null

    console.log(props.animalProps)

    if (props.animalProps.images !== undefined) {
        
        let images = props.animalProps.images
        
        featured = images.length > 0 ? images[0] : null 
        
        previews = images.map((image, i) => {
            if (i > 0) {
                return(
                    <div key={i} className="imagePreview__container">
                        <img src={typeof(image) !== 'string' ? image.preview : image}/>
                        <footer className="imagePreview__container__footer">
                            <div onClick={() => {props.imageProps.makeFeatured(i)}}>Feature</div>
                            <div onClick={() => {props.imageProps.removeImage(i)}}>Remove</div>
                        </footer>
                    </div>
                )
            }
        })
    }

    return(
        <div>
            {
            featured !== null ?
            <div className="featured">
                <img src={typeof(featured) !== 'string' ? featured.preview : featured}/>
                <footer onClick={() => {props.imageProps.removeImage(0)}}>Remove</footer>
            </div>
            : null
            }
            <div className="imagePreview">
                {
                previews !== null ?
                previews :
                null
                }
            </div>
        </div>
    )
}

export default ImagePreview
