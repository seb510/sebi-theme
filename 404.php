<?php get_header(); ?>
    <main>
        <section class="layout-content not-found">
            <div class="container">
                <div class="not-found__row">
                    <h2 class="head"><?php _e( 'Page not found', THEME_NAME ); ?></h2>
                    <a href="<?php echo home_url(); ?>" class="global-btn"><?php _e( 'Return Home', THEME_NAME  ); ?></a>
                </div>
            </div>
        </section>
    </main>
<?php get_footer(); ?>