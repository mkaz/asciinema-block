<?php
/**
 * Plugin Name:     Asciinema Block
 * Plugin URI:      https://github.com/mkaz/asciinema-block
 * Description:     Adds an asciinema block to playback recordings
 * Version:         0.1.0
 * Author:          Marcus Kazmierczak
 * Author URI:      https://mkaz.blog/
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     asciinema-block
 *
 * @package         asciinema-block
 */

add_action( 'init', function() {
	$dir = __DIR__;
	$asset_file = include( "$dir/build/index.asset.php");

	wp_register_script(
		'mkaz-asciinema-block-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_script(
		'mkaz-asciinema-block-client-script',
		plugins_url( 'assets/asciinema-player.js', __FILE__ ),
		array(), // dependencies
		'2.6.1',
		true // in footer
	);

	// wp_register_style(
	// 	'mkaz-asciinema-block-style',
	// 	plugins_url( 'style.css', __FILE__ ),
	// 	array(), // dependencies
	// 	$asset_file['version']
	// );

	wp_register_style(
		'mkaz-asciinema-block-client-style',
		plugins_url( 'assets/asciinema-player.css', __FILE__ ),
		array(), // dependencies,
		'2.6.1'
	);

	register_block_type( 'mkaz/asciinema-block', array(
		'editor_script'   => 'mkaz-asciinema-block-script',
		// 'style'           => 'mkaz-asciinema-block-style',
		'render_callback' => function( $attribs, $content ) {
			wp_enqueue_script( 'mkaz-asciinema-block-client-script' );
			wp_enqueue_style( 'mkaz-asciinema-block-client-style' );
			return $content;
		},
	) );

} );

add_filter( 'upload_mimes', function ( $mimes = array() ) {
	$mimes['cast'] = 'application/json';
	return $mimes;
} );

add_filter( 'wp_check_filetype_and_ext', function( $types, $file, $filename ) {
	if ( strpos( $filename, '.cast' ) ) {
        $types['ext'] = 'cast';
        $types['type'] = 'application/json';
    }
    return $types;
}, 10, 3 );
