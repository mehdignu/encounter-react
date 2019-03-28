import React, {Component} from 'react'
import {Helmet} from "react-helmet";

class FacebookShare extends Component {

    render() {
        let {description, parameter, id, imageURL, badgeImageURL} = this.props;

        description = 'boo';
        imageURL = '';
        parameter = '';
        imageURL = '';


        return (
            <div className="row social-media-logos">
                <Helmet>
                    <title>Page Title</title>
                    <meta property="og:url" content={`http://www.sample.com${parameter ? parameter : ''}`}/>
                    <meta property="og:description" content={description}/>
                    <meta property="og:image" content={imageURL !== '' ? `${imageURL}` : badgeImageURL}/>
                    <meta property="fb:app_id" content="sample_id"/>
                </Helmet>

                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=www.sample.com">
                    <div className="facebook"></div>
                </a>
                <a target="_blank"
                   href={`http://pinterest.com/pin/create/button/?url=http://www.sample.com${parameter ? parameter : ''}&media=${imageURL}&description=${description}`}>
                    <div className="pinterest"></div>
                </a>
                <a target="_blank"
                   href={`https://twitter.com/intent/tweet?text=${description}&url=http://www.sample.com${parameter ? parameter : ''}`}>
                    <div className="twitter"></div>
                </a>
            </div>
        )
    }
}
//https://stackoverflow.com/questions/53991920/facebook-not-recognizing-some-gatsby-react-helmet-meta-tags-on-netlify
export default FacebookShare
