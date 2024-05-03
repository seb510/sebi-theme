<?php
function register_scripts()
{
    wp_enqueue_script('scripts-app', JS_PATH . '/app.js', array(), true, true);
}

add_action('wp_enqueue_scripts', 'register_scripts');