<?php
//Використовуйте функцію register_block_type для реєстрації блоку в WordPress.
function register_image_text_block() {
    // Реєструємо JavaScript для блоку
    wp_register_script(
        'image-text-block-script',
        get_template_directory_uri() . '/blocks/block-img-text/image-text-block.js',
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(get_template_directory() . '/blocks/block-img-text/image-text-block.js')
    );

    // Реєструємо CSS для блоку
    wp_register_style(
        'image-text-block-style-editor',
        get_template_directory_uri() . '/blocks/block-img-text/image-text-block.css',
        array(),
        filemtime(get_template_directory() . '/blocks/block-img-text/image-text-block.css'
        ));

    wp_register_style(
        'image-text-block-style',
        get_template_directory_uri() . '/blocks/block-img-text/image-text-block.css',
        array(),
        filemtime(get_template_directory() . '/blocks/block-img-text/image-text-block.css'
        ));

    // Реєструємо блок
    register_block_type('custom/image-text-block', array(
        'editor_script' => 'image-text-block-script',
        'editor_style' => 'image-text-block-style-editor',
        'style' => 'image-text-block-style',
        'render_callback' => 'render_image_text_block',
        'attributes' => array(
            'imageURL' => array('type' => 'string', 'default' => ''),
            'text' => array('type' => 'string', 'default' => 'Ваш текст'),
            'textColor' => array('type' => 'string', 'default' => '#000000'),
        ),
    ));
}
add_action('init', 'register_image_text_block');

// Callback для відображення на фронтенді
function render_image_text_block($attributes) {
    $imageURL = esc_url($attributes['imageURL']);
    $text = esc_html($attributes['text']);
    $textColor = esc_attr($attributes['textColor']);

    return sprintf(
        '<div class="image-text-block">
                <div class="image-text-block-image"><img src="%s" alt="Картинка" loading="lazy"></div>
            <p style="color: %s;">%s</p>
        </div>',
        $imageURL,
        $textColor,
        $text
    );
}

// Modern Custom Gutenberg block
function register_modern_card_block() {
    // Реєструємо JavaScript
    wp_register_script(
        'modern-card-block-script',
        get_template_directory_uri() . '/blocks/block-modern-card/modern-card-block.js',
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(get_template_directory() . '/blocks/block-modern-card/modern-card-block.js')
    );

    // Реєструємо стилі
    wp_register_style(
        'modern-card-block-editor-style',
        get_template_directory_uri() . '/blocks/block-modern-card/modern-card-editor.css',
        array('wp-edit-blocks'),
        filemtime(get_template_directory() . '/blocks/block-modern-card/modern-card-editor.css')
    );

    wp_register_style(
        'modern-card-block-style',
        get_template_directory_uri() . '/blocks/block-modern-card/modern-card-block.css',
        array(),
        filemtime(get_template_directory() . '/blocks/block-modern-card/modern-card-block.css'
        ));

    // Реєструємо блок
    register_block_type('custom/modern-card-block', array(
        'editor_script' => 'modern-card-block-script',
        'editor_style' => 'modern-card-block-style-editor',
        'style' => 'modern-card-block-style',
        'render_callback' => 'render_modern_card_block',
        'attributes' => array(
            'backgroundImage' => array('type' => 'string', 'default' => ''),
            'title' => array('type' => 'string', 'default' => 'Заголовок'),
            'subtitle' => array('type' => 'string', 'default' => 'Підзаголовок'),
            'buttonText' => array('type' => 'string', 'default' => 'Дізнатися більше'),
            'buttonURL' => array('type' => 'string', 'default' => '#'),
            'buttonColor' => array('type' => 'string', 'default' => '#ffffff'),
            'textColor' => array('type' => 'string', 'default' => '#000000'),
        ),
    ));
}
add_action('init', 'register_modern_card_block');

function render_modern_card_block($attributes) {
    $backgroundImage = esc_url($attributes['backgroundImage']);
    $title = esc_html($attributes['title']);
    $subtitle = esc_html($attributes['subtitle']);
    $buttonText = esc_html($attributes['buttonText']);
    $buttonColor = esc_attr($attributes['buttonColor']);
    $buttonURL = esc_url($attributes['buttonURL']);
    $textColor = esc_attr($attributes['textColor']);

    return sprintf(
        '<div class="modern-card" style="background-image: url(%s);">
            <div class="modern-card-content" style="color: %s;">
                <h2>%s</h2>
                <p>%s</p>
                 <a href="%s" style="background-color: %s;" target="_blank">%s</a>
            </div>
        </div>',
        $backgroundImage,
        $textColor,
        $title,
        $subtitle,
        $buttonURL,
        $buttonColor,
        $buttonText
    );
}

// Реєстрація стилів для редактора
function enqueue_block_editor_assets() {
    wp_enqueue_style(
        'modern-card-block-editor-style',
        get_template_directory_uri() . '/blocks/block-modern-card/modern-card-editor.css',
        array('wp-edit-blocks'),
        filemtime(get_template_directory() . '/blocks/block-modern-card/modern-card-editor.css')
    );
}
add_action('enqueue_block_editor_assets', 'enqueue_block_editor_assets');

