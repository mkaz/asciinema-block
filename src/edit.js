/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

const edit = ( { attributes, setAttributes, className, isSelected } ) => {
	return (
		<>
			<InspectorControls>
				<PanelBody title="Display Settings">
					<SelectControl
						label="Font Size"
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
					<RangeControl
						label="Number of Columns"
						help="Set to same number in recording to avoid resize"
						value={ attributes.cols }
						onChange={ ( val ) => {
							setAttributes( { cols: val } );
						} }
					/>
					<RangeControl
						label="Number of Rows"
						help="Set to same number in recording to avoid resize"
						value={ attributes.rows }
						onChange={ ( val ) => {
							setAttributes( { rows: val } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<figure className={ className }>
				{ attributes.video ?
					<asciinema-player
						src={ attributes.video }
						font-size={ attributes.fontsize } /> :
					<MediaPlaceholder
						onSelect={ ( el ) => setAttributes( { video: el.url } ) }
						allowedTypes={ [ 'text' ] }
						labels={ { title: 'Asciinema Recording' } }
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
