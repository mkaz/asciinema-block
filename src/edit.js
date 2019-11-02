/**
 * WordPress dependencies
 */
import {
    InspectorControls,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';

import {
    SelectControl
} from '@wordpress/components';

const edit = ( { attributes, setAttributes, className, isSelected } ) => {
    return (
        <>
            <InspectorControls>
                <SelectControl
						value={ attributes.fontsize }
						options={ [
							{ label: 'Small', value: 'small' },
                            { label: 'Medium', value: 'medium' },
                            { label: 'Large', value: 'large' },
						] }
						onChange={ ( val ) => {
							setAttributes( { fontsize: val } );
						} }
					/>
            </InspectorControls>
            <figure className={ className }>
                { attributes.video 
                    ? <asciinema-player 
                        src={ attributes.video }
                        font-size={ attributes.fontsize } />
                    : <MediaPlaceholder
                        onSelect = { ( el ) => setAttributes( { video: el.url } ) }
                        allowedTypes = {[ 'text' ]}
                        labels ={ {title: 'Asciinema Recording'} }
                    />
                }
                { ( ! RichText.isEmpty( attributes.caption ) || isSelected ) && (
                    <RichText
                        tagName="figcaption"
                        placeholder="Write caption…"
                        value={ attributes.caption }
                        onChange={ ( value ) => setAttributes( { caption: value } ) }
                        inlineToolbar
                    />
                ) }
            </figure>
        </>
    );
};

export default edit;
