<?php
function register_custom_block_assets() {
    // Реєстрація JavaScript
    wp_register_script(
        'custom-blocks',
        get_template_directory_uri() . '/src/blocks/custom-block.bundle.js',
        ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components'],
        filemtime(get_template_directory() . '/src/blocks/custom-block.bundle.js')
    );

    // Реєстрація стилів для редактора та фронтенду
    wp_register_style(
        'custom-blocks-style',
        get_template_directory_uri() . '/src/blocks/custom-block-style.css',
        [],
        filemtime(get_template_directory() . '/src/blocks/custom-block-style.css')
    );

    register_block_type('custom/advanced-block', [
        'editor_script' => 'custom-blocks',
        'style' => 'custom-blocks-style',
    ]);

    wp_register_script(
        'modern-blocks',
        get_template_directory_uri() . '/src/blocks/modern-block.bundle.js',
        ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components'],
        filemtime(get_template_directory() . '/src/blocks/modern-block.bundle.js')
    );

    register_block_type('custom/modern-block', [
        'editor_script' => 'modern-blocks',
        'style' => 'custom-blocks-style',
    ]);

}
add_action('init', 'register_custom_block_assets');
