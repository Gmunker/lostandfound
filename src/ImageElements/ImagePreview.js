import React from 'react';

const ImagePreview = (props) => {

    let featured = props.imageProps.files[0] ? props.imageProps.files[0].preview : null

    let images = props.imageProps.files.map((image, i) => {
        if (i > 0) {
            return(
                <div key={i} className="imagePreview__container">
                    <img src={image.preview}/>
                    <footer className="imagePreview__container__footer">
                        <div onClick={() => {props.imageProps.makeFeatured(i)}}>Feature</div>
                        <div onClick={() => {props.imageProps.removeImage(i)}}>Remove</div>
                    </footer>
                </div>
            )
        }
    })

    return(
        <div>
            {
            featured ?
            <div className="featured">
                <img src={featured}/>
                <footer onClick={() => {props.imageProps.removeImage(0)}}>Remove</footer>
            </div> :
            null
            }
            <div className="imagePreview">
                {images}
            </div>
        </div>
    )
}

export default ImagePreview