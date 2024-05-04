<?php get_header(); ?>
    <main class="main front-page">
        <section class="page-head">
            <div class="container">
                <div class="news-content">
                    <div class="content-head">
                        <h1 class="line-head"><?php _e( '', THEME_NAME ); single_cat_title(); ?></h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="section-content">
            <div class="container">
                <?php
                $publications = new WP_Query([
                    'post_type'      => 'post',
                    'post_status'    => 'publish',
                    'posts_per_page' => 3,
                    'orderby'        => 'date',
                    'order'          => 'DESC',
                    'paged'          => 1,
                ]);
                ?>

                <?php if($publications->have_posts()): ?>
                <div class="loop__row loop__row-js">
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
                        <button id="load-more-js" type="button" class="load-more-js btn-primary" data-cat="" data-ppage="3">Load more</button>
                    </div>
                    <?php } ?>

            </div>
        </section>
    </main>
<?php get_footer(); ?>