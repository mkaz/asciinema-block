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
	supports: {
		align: true,
	},

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
		},
		cols: {
			type: 'number',
			source: 'attribute',
			attribute: 'cols',
			selector: 'asciinema-player',
			default: 80,
		},
		rows: {
			type: 'number',
			source: 'attribute',
			attribute: 'rows',
			selector: 'asciinema-player',
			default: 24,
		},
	},

	edit,
	save,
} );
