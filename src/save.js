/**
 * WordPress dependencies
 */
 import { RichText, useBlockProps } from "@wordpress/block-editor";
 
 const Save = ({ attributes }) => {
     return (
	<figure { ...useBlockProps.save() }>
		<asciinema-player
			src={ attributes.url }
			font-size={ attributes.fontsize }
			cols={ attributes.cols }
			rows={ attributes.rows }
             ></asciinema-player>
		{ ! RichText.isEmpty( attributes.caption ) && 
		    <RichText.Content tagName="figcaption" value={ attributes.caption } />
        }
	</figure>
     );
 };
 
 export default Save;
 