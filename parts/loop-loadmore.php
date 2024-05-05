<?php
    $category = (isset($args['category_name'])) ? $args['category_name'] : '';
    var_dump($category);
?>
<section class="section-content">
    <div class="container">
        <?php
        $args = [
            'post_type'      => 'post',
            'post_status'    => 'publish',
            'posts_per_page' => 3,
            'orderby'        => 'date',
            'order'          => 'DESC',
            'paged'          => 1,
        ];

        if($category != '' && $category != 'all') {
            $args['category_name'] = $category;
        }
        $publications = new WP_Query($args);
        ?>

        <div class="laschf-sort">
            <select name="sort" id="sorting-post" aria-label="Sorting">
                <option value="date-desc" selected >Date (Newest - Oldest)</option>
                <option value="date-asc">Date (Oldest - Newest)</option>
                <option value="title-asc">Title (A - Z)</option>
                <option value="title-desc">Title (Z - A)</option>
            </select>
        </div>

        <?php if($publications->have_posts()): ?>
        <div class="loop__row loop__row-js" data-type="<?php echo 'post' ?>" data-category="<?php echo $category ?>" data-ppage="3">
            <?php
            while ($publications->have_posts()): $publications->the_post();
                get_template_part('templates/blog-post');
            endwhile;
            ?>
            <?php else: ?>
                <div class="nothing-content"><?php _e( 'Sorry, nothing to display.', THEME_NAME ); ?></div>
            <?php endif; ?>
        </div>
        <?php wp_reset_postdata(); ?>

        <?php if( 1 < $publications->max_num_pages ) { ?>
            <div class="btn__wrapper">
                <button id="load-more-js" type="button" class="load-more-js btn-primary">Load more</button>
            </div>
        <?php } ?>
    </div>
</section>
