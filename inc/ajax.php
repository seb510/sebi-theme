<?php

function get_ajax_posts() {
    $ppp = isset($_POST['ppp']) ? (int) $_POST['ppp'] : 3;
    $paged = isset($_POST['paged']) ? (int) $_POST['paged'] : 1;
    $post_type = isset($_POST['post_type']) ? sanitize_text_field($_POST['post_type']) : 'post';
    $orderby = isset($_POST['sortby']) ? sanitize_text_field($_POST['sortby']) : 'date';
    $order = isset($_POST['sort']) ? sanitize_text_field($_POST['sort']) : 'DESC';
    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';
    $author = isset($_POST['author']) ? (int) $_POST['author'] : '';
    $search = isset($_POST['search']) ? sanitize_text_field($_POST['search']) : '';

    $args = [
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => $ppp,
        'orderby' => $orderby,
        'order' => $order,
        'paged' => $paged,
    ];

    // Combine conditional logic for category and search using ternary operator
    $args = array_merge($args, [
        'category_name' => $category !== '' && $category !== 'all' ? $category : null,
        's' => $search !== '' ? $search : null,
    ]);

    // Use author query var only if $author is set
    if ($author) {
        $args['author'] = $author;
    }

    $ajaxposts = new WP_Query($args);

    $response = '';
    $max_pages = $ajaxposts->max_num_pages;

    if ($ajaxposts->have_posts()) {
        ob_start();
        while ($ajaxposts->have_posts()) : $ajaxposts->the_post();
            $response .= get_template_part('templates/blog-post');
        endwhile;
        $output = ob_get_contents();
        ob_end_clean();
    } else {
        $response .= '<div class="template-post template-post-empty">
                        <p>
                            Nothing found. Try again
                        </p>
                    </div>';
        $output = $response;
    }

    $result = compact('max_pages', 'output'); // Use compact() for concise array creation

    wp_send_json_success($result); // Use wp_send_json_success for cleaner response
    exit;
}

add_action('wp_ajax_get_ajax_posts', 'get_ajax_posts');
add_action('wp_ajax_nopriv_get_ajax_posts', 'get_ajax_posts');
add_action('wp_ajax_get_ajax_posts', 'get_ajax_posts');
add_action('wp_ajax_nopriv_get_ajax_posts', 'get_ajax_posts');
