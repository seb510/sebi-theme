<?php
/**
 * Register ACF Option Page
 */
function register_acf_options_pages()
{
    if (!function_exists('acf_add_options_page'))
        return;

    $option_page = acf_add_options_page(array(
        'page_title' => __('Theme General Settings', THEME_NAME),
        'menu_title' => __('Theme Settings', THEME_NAME),
        'menu_slug' => 'theme-general-settings',
    ));
}

add_action('acf/init', 'register_acf_options_pages');