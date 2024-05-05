<?php

function get_ajax_posts() {
    $ppp = (isset($_POST["ppp"])) ? $_POST["ppp"] : 3;
    $paged = (isset($_POST['paged'])) ? $_POST['paged'] : 1;
    $post_type = (isset($_POST['post_type'])) ? $_POST['post_type'] : 'post';
    $orderby = (isset($_POST['sortby'])) ? $_POST['sortby'] : 'date';
    $order = (isset($_POST['sort'])) ? $_POST['sort'] : 'DESC';
    $category = (isset($_POST['category'])) ? $_POST['category'] : '';
    $author = (isset($_POST['author'])) ? $_POST['author'] : '';

    $ajaxposts = new WP_Query([
        'post_type'      => $post_type,
        'post_status'    => 'publish',
        'posts_per_page' => $ppp,
        'orderby'        => $orderby,
        'order'          => $order,
        'paged'          => $paged,
    ]);

    if($category) {
        $ajaxposts['category'] = $category;
    }

    if($author) {
        $ajaxposts['author'] = $author;
    }


    $response = '';
    $max_pages = $ajaxposts->max_num_pages;

    if($ajaxposts->have_posts()) {
        ob_start();
        while($ajaxposts->have_posts()) : $ajaxposts->the_post();
            $response .= get_template_part('templates/blog-post');
        endwhile;
        $output = ob_get_contents();
        ob_end_clean();
    } else {
        $response = '';
    }

    $result = [
        'max' => $max_pages,
        'html' => $output,
    ];

    echo json_encode($result);
    exit;
}
add_action('wp_ajax_get_ajax_posts', 'get_ajax_posts');
add_action('wp_ajax_nopriv_get_ajax_posts', 'get_ajax_posts');