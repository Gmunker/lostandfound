import React from 'react';

const Gallery = (props) => {
    
    window.addEventListener("orientationchange", function() {
        if (document.getElementById("container")) {
            let container = document.getElementById('container')
            let width = document.documentElement.clientWidth
            let height = document.documentElement.clientHeight
            if (width < height) {
                container.setAttribute("class", "container landscape")
            } else {
                container.setAttribute("class", "container portrait")
            }
        }
    });

    let expandImage = (url) => {
        let container = document.createElement('div')
        let image = document.createElement('img')
        
        image.setAttribute("src", url)
        image.setAttribute("id", "largeImg") 

        container.setAttribute("id", "container")
        container.appendChild(image)
        let element = document.getElementById("gallery")
        let body = document.getElementById("body")
        body.setAttribute("class", "noScroll")
        element.appendChild(container)

        image.addEventListener("click", function(){
            body.removeAttribute("class")
            container.parentNode.removeChild(container)   
        })

        let width = document.documentElement.clientWidth
        let height = document.documentElement.clientHeight
        if (width > height) {
            container.setAttribute("class", "container landscape")
        } else {
            container.setAttribute("class", "container portrait")
        }
    }

    let closeImage = () => {
        console.log("I ran")
        let container = document.getElementById("container")
        container.parentNode.removeChild(container)
    }

    let images
    if (props.animalProps.images) {
        images = props.animalProps.images.map((url, i) => {
            if (i > 0) {
                return(
                    <div className="gallery__container" onClick={() => {expandImage(url)}}>
                        <img className="gallery__container__thumbnail" src={url} key={i}/>
                    </div>
                )
            }
        })
    }

    return(
        <div className="gallery" id="gallery">
            {images ? images : null}
        </div>
    )
}

export default Gallery