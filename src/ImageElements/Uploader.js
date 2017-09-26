import React, { Component } from 'react';
import DropZone from 'react-dropzone';

const ImageUploader = (props) => {

    let imageProps = props.imageProps
    return(
        <div className={imageProps.showImageUploader ? "uploadContainer__imageUploader active" : "uploadContainer__imageUploader"}>
            <DropZone className="uploadContainer__imageUploader__dropzone" onDrop={imageProps.onDrop}>
                <div className="uploadContainer__imageUploader__dropzone__graphic">
                    Try dropping some files here, or click to select files to upload.
                </div>
            </DropZone>
        </div>
    )
}

export default ImageUploader