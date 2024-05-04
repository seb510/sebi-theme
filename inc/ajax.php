<?php

function post_load_more() {
    $ppp = (isset($_POST["ppp"])) ? $_POST["ppp"] : 3;
    $paged = (isset($_POST['paged'])) ? $_POST['paged'] : 1;
    $category = (isset($_POST['category'])) ? $_POST['category'] : '';

    $ajaxposts = new WP_Query([
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'posts_per_page' => $ppp,
        'orderby'        => 'date',
        'order'          => 'DESC',
        'paged'          => $paged,
    ]);

    if($category) {
        $ajaxposts['category'] = $category;
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
add_action('wp_ajax_post_load_more', 'post_load_more');
add_action('wp_ajax_nopriv_post_load_more', 'post_load_more');