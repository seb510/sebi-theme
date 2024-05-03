<?php
function register_styles()
{
    wp_enqueue_style('styles-normalize', CSS_PATH . '/normalize.min.css', array(), true);
    wp_enqueue_style('styles-theme', CSS_PATH . '/theme.css', array(), true);
}

add_action('wp_enqueue_scripts', 'register_styles');