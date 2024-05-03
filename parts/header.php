<body <?php body_class(); ?>>
    <div class="wrapper">
        <header class="header">
           <div class="container">
              <div class="header__wrap">
                  <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
                      <img src="<?php echo IMG_PATH; ?>/logo.png" alt="Site Logo" width="50px" height="50px" loading="lazy">
                  </a>
                  <div class="menu-container">
                      <?php wp_nav_menu( array( 'header-menu' => 'header-menu' ) ); ?>
                  </div>
              </div>
           </div>
        </header>