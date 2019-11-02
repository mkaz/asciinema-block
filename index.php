<?php
/**
 * Plugin Name:  Asciinema Block
 * Plugin URI:   https://github.com/mkaz/asciinema-block
 * Description:  A plugin that adds the Asciinema Player as a Block.
 * Version:      0.1.0
 * Author:       Marcus Kazmierczak
 * Author URI:   https://mkaz.blog/
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  asciinema-block
 *
 * @package Asciinema_Block
 */

/**
 * Enqueue assets for editor portion
 */
add_action( 'enqueue_block_editor_assets', function() {
	// Files.
	$block_path = 'build/index.js';
	$block_css = 'editor-style.css';

	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	// Block.
	wp_enqueue_script(
		'mkaz-asciinema-block-js',
		plugins_url( $block_path, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	// Editor CSS.
	wp_enqueue_style(
		'mkaz-asciinema-block-css',
		plugins_url( $block_css, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $block_css )
	);
} );

/**
 * Enqueue assets for viewing Asciinema
 */
add_action( 'enqueue_block_assets', function() {
	// Files.
	$jsfile = '/assets/asciinema-player.js';
	$cssfile = '/assets/asciinema-player.css';

	// Enqueue Juxtapose style.
	wp_enqueue_style(
		'mkaz-asciinema-css',
		plugins_url( $cssfile, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $cssfile )
	);

	// Enqueue Juxtapose JS.
	wp_enqueue_script(
		'mkaz-asciinema-js',
		plugins_url( $jsfile, __FILE__ ),
		[ 'wp-dom-ready' ],
		filemtime( plugin_dir_path( __FILE__ ) . $jsfile ),
		true // In footer.
	);
} );

add_filter( 'upload_mimes', function( $mime_types ) {
	$mime_types['cast'] = 'text/plain';     // Adding .cast extension	
	return $mime_types;
}, 1, 1 );

add_filter( 'wp_check_filetype_and_ext', function( $types, $file, $filename ) {
	if ( strpos( $filename, '.cast' ) ) {
        $types['ext'] = 'cast';
        $types['type'] = 'text/plain';
    }
    return $types;
}, 10, 3 );