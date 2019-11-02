/**
 * Asciinema Block
 * A block for playing Asciinema video
 * Uses Asciinema Player from
 * https://github.com/asciinema/asciinema-player
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

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
		fontsize: {
			type: 'string',
			source: 'attribute',
			attribute: 'font-size',
			selector: 'asciinema-player',
			default: 'medium',
		}
	},

	edit,
	save,
} );
