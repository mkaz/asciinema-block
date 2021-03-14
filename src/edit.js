/**
 * WordPress dependencies
 */
import { getBlobByURL, isBlobURL, revokeBlobURL } from "@wordpress/blob";
import {
	InspectorControls,
	MediaPlaceholder,
	RichText,
	store as blockEditorStore,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	withNotices
} from "@wordpress/components";
import { store as coreStore } from "@wordpress/core-data";
import { useEffect, useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import icon from "./icon";

const edit = ({
	attributes,
	isSelected,
	noticeOperations,
	noticeUI,
	setAttributes,
}) => {
	const { caption, cols, id, rows, url } = attributes;
	const [hasError, setHasError] = useState(false);
	const { media, mediaUpload } = useSelect(
		(select) => ({
			media:
				id === undefined ? undefined : select(coreStore).getMedia(id),

			mediaUpload: select(blockEditorStore).getSettings().mediaUpload,
		}),
		[id]
	);

	useEffect(() => {
		// Upload a file drag-and-dropped into the editor
		if (isBlobURL(url)) {
			const file = getBlobByURL(url);

			mediaUpload({
				filesList: [file],
				onFileChange: ([newMedia]) => onSelectFile(newMedia),
				onError: (message) => {
					setHasError(true);
					noticeOperations.createErrorNotice(message);
				},
			});

			revokeBlobURL(url);
		}
	}, []);

	function onSelectFile(newMedia) {
		if (newMedia && newMedia.url) {
			setHasError(false);
			setAttributes({
				url: newMedia.url,
				id: newMedia.id,
			});
		}
	}

	function onUploadError(message) {
		setHasError(true);
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	}


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
			{ ( !url || hasError ) ?
				<div { ...useBlockProps() }>
					<MediaPlaceholder
						icon={ icon }
						labels={ {
							title: __("Asciinema Recording"),
							instructions: __("Upload an asciinema cast file."),
						} }
						onSelect={ onSelectFile }
						notices={ noticeUI }
						onError={ onUploadError }
						accept="*.cast"
					/>
				</div>
				:
				<div { ...useBlockProps() }>
					<Placeholder
						icon={ icon }
						instructions={ __("Cast file to be displayed") }
						label={ __("Asciinema Recording") }
					>
						<div className="asciinema-block-placeholder-url">{ url }</div>
					</Placeholder>
				</div>
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
		</>
	);
};

export default withNotices( edit );
