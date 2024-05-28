<section class="contact-us">
    <div class="container">
        <?php $nonce = wp_create_nonce( 'send-message' ); ?>
        <form id="contact-form">
            <input type="hidden" name="security" value="<?php echo $nonce; ?>">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <div class="form-group">
                <button type="submit">Send Message</button>
            </div>
            <div class="form-message"></div>
        </form>
    </div>
</section>
