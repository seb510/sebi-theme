<section class="news-content loop-load-pagination">
	<div class="container">
        <form method="GET">
            <select name="orderby" id="orderby" aria-label="Sorting">
                <option value="date">Newest to Oldest</option>
                <option value="title">Alphabetical</option>
            </select>
            <button type="submit">Apply</button>
        </form>

        <div class="loop__row">
            <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                <?php get_template_part('templates/blog-post'); ?>
            <?php endwhile; ?>

            <?php else: ?>
                <div class="nothing-content"><?php _e( 'Sorry, nothing to display.', THEME_NAME ); ?></div>
            <?php endif; ?>
		</div>
        <?php get_template_part('parts/pagination') ?>
	</div>
</section>

