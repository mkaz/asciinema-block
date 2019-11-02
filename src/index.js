/**
 * Asciinema Block
 * A block for playing Asciinema video
 * Uses Asciinema Player from
 * https://github.com/asciinema/asciinema-player
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { MediaPlaceholder } from '@wordpress/editor';

registerBlockType( 'mkaz/asciinema-block', {
	title: 'Asciinema Block',
	icon: 'format-video',
	category: 'widgets',

	attributes: {
		video: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'asciinema-player',
		},
	},

	edit: ( { attributes, setAttributes, className } ) => {
		return (
			<>
				{ !attributes.video && <MediaPlaceholder
					onSelect = { ( el ) => setAttributes( { video: el.url } ) }
					allowedTypes = {[ 'text' ]}
					labels ={ {title: 'Asciinema Recording'} }
				/> }
				{ attributes.video && 
					<asciinema-player src={ attributes.video } />
				}
			</>
		);
	},

	save: ( { attributes } ) => {
		return (
			<>
				{ attributes.video && 
					<asciinema-player src={ attributes.video } />
				}
			</>
		);
	}
});
