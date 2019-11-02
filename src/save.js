/**
 * WordPress dependencies
 */
import {
	RichText,
} from '@wordpress/block-editor';
	
const save = ( { attributes, className } ) => {
    return (
        <figure className={ className }>
            { attributes.video && 
                <asciinema-player
                    src={ attributes.video }
                    font-size={ attributes.fontsize } />
            }
            { ! RichText.isEmpty( attributes.caption ) && 
                <RichText.Content tagName="figcaption" value={ attributes.caption } />
            }
        </figure>
    );
};

export default save;