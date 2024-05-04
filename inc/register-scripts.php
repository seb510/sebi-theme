<?php
function register_scripts()
{
    wp_enqueue_script('scripts-app', JS_PATH . '/app.js', array( 'jquery' ), '3.2.0', true );

    wp_localize_script( 'scripts-app', 'my_ajax_object',
        array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
}

add_action('wp_enqueue_scripts', 'register_scripts');
