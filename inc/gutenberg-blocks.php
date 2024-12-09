<?php
// Modern Custom Gutenberg block
function register_custom_blocks() {
    // Modern Card Block
    wp_register_script(
        'modern-card-script',
        get_template_directory_uri() . '/blocks/modern-card/build/modern-card.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( get_template_directory() . '/blocks/modern-card/build/modern-card.js' )
    );

    wp_register_style(
        'modern-card-style',
        get_template_directory_uri() . '/blocks/modern-card/style.css',
        array(),
        filemtime( get_template_directory() . '/blocks/modern-card/style.css' )
    );

    wp_register_style(
        'modern-card-editor-style',
        get_template_directory_uri() . '/blocks/modern-card/editor.css',
        array( 'wp-edit-blocks' ),
        filemtime( get_template_directory() . '/blocks/modern-card/editor.css' )
    );

    register_block_type( 'custom/modern-card', array(
        'editor_script' => 'modern-card-script',
        'style'         => 'modern-card-style',
        'editor_style'  => 'modern-card-editor-style',
    ) );

    // Product Card Block
    wp_register_script(
        'product-card-script',
        get_template_directory_uri() . '/blocks/product-card/build/product-card.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( get_template_directory() . '/blocks/product-card/build/product-card.js' )
    );

    wp_register_style(
        'product-card-style',
        get_template_directory_uri() . '/blocks/product-card/build/style.css',
        array(),
        filemtime( get_template_directory() . '/blocks/product-card/build/style.css' )
    );

    wp_register_style(
        'product-card-editor-style',
        get_template_directory_uri() . '/blocks/product-card/build/editor.css',
        array( 'wp-edit-blocks' ),
        filemtime( get_template_directory() . '/blocks/product-card/build/editor.css' )
    );

    register_block_type( 'custom/product-card', array(
        'editor_script' => 'product-card-script',
        'style'         => 'product-card-style',
        'editor_style'  => 'product-card-editor-style',
    ) );
}
add_action( 'init', 'register_custom_blocks' );




