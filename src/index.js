/**
 * Asciinema Block
 * A block for playing Asciinema video
 * Uses Asciinema Player from
 * https://github.com/asciinema/asciinema-player
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { __ } from "@wordpress/i18n";

import Edit from './edit';
import Save from './save';
import icon from './icon';

registerBlockType( 'mkaz/asciinema-block', {
	apiVersion: 2,
	title: __("Asciinema Block", "asciinema-block"),
	description: __(
		"A block to display asciinema recordings.",
		"asciinema-block"
	),
	icon,
	category: 'widgets',
	supports: {
		align: true,
	},

	attributes: {
		url: {
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
			type: 'string',
			source: 'attribute',
			attribute: 'cols',
			selector: 'asciinema-player',
			default: 80,
		},
		rows: {
			type: 'string',
			source: 'attribute',
			attribute: 'rows',
			selector: 'asciinema-player',
			default: 24,
		},
	},

	edit: Edit,
	save: Save,
} );
