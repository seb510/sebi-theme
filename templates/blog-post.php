<article class="template-post template-post-<?php echo get_the_ID() ?>">
    <a href="<?php the_permalink(); ?>" class="thumbnail">
        <img src="<?php the_post_thumbnail_url('medium'); ?>" alt="<?php the_title();?>" loading="lazy" width="320" height="240">
    </a>
    <h2 class="title"><a href="<?php the_permalink(); ?>"><?php the_title();?></a></h2>
    <div class="description"><?php the_excerpt(); ?></div>
    <time datetime="<?php the_time('Y-m-j'); ?>"><?php the_time('F j, Y'); ?></time>
    <span class="category"><?php the_category(); ?></span>
</article>