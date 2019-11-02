/**
 * Asciinema Block
 * A block for playing Asciinema video
 * Uses Asciinema Player from
 * https://github.com/asciinema/asciinema-player
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import {
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';

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
		caption: {
			type: 'string',
			source: 'text',
			selector: 'figcaption',
		},
	},

	edit: ( { attributes, setAttributes, className, isSelected } ) => {
		return (
			<figure className={ className }>
				{ attributes.video 
					? <asciinema-player src={ attributes.video } />
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
		);
	},

	save: ( { attributes, className } ) => {
		return (
			<figure className={ className }>
				{ attributes.video && 
					<asciinema-player src={ attributes.video } />
				}
				{ ! RichText.isEmpty( attributes.caption ) && 
					<RichText.Content tagName="figcaption" value={ attributes.caption } />
				}
			</figure>
		);
	}
});
