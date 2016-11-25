<!DOCTYPE html>
<html>
<head>
  <title>David Gaultiere</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="/images/favicon.ico">

  <script type="text/javascript" src="//use.typekit.net/bex1ayv.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

  <link href="/css/main.css" rel="stylesheet">
  <link href="/css/contact.css" rel="stylesheet">
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">

	<script type="text/javascript" src="/js/jquery-1.3.2.min.js"></script>
  <script type="text/javascript" src="/js/contact.js"></script>
</head>
<!-- Contact Form -->
	<?php include dirname(__FILE__)."/contact.php"; ?>
<!-- /Contact Form -->
<body id="home-page">

  <div id="headshot">David Gaultiere</div>

  <h1 id="my-name" class="text-content">David Gaultiere</h1>

  <div id="about" class="description text-content">
    <p>Self-starter and technology enthusiast. Passionate about creativity, culture, and innovation. Husband to the wonderful <a href="http://www.loveandelyse.com/" target="_blank" title="Love & Elyse">Brianne Elyse</a>, sometimes <a href="http://www.medium.com/@dgaultiere" title="Read my blog on Medium.com" target="_blank">writer</a>, and always learner. Currently serving as a Product Manager at <a href="http://www.appfolioinc.com/" target="_blank" title="Cloud-based software designed for specific industries">Appfolio</a>. Previously launched startups <a href="http://www.fastcompany.com/3029879/most-creative-people/can-the-lyft-of-moving-take-the-pain-out-of-one-of-lifes-most-hated-act" target="_blank" title="Using technology and crowd-sourcing to take the pain out of moving">NextMover</a>, Fonogram, and <a href="http://www.mizubatea.com/" target="_blank" title="All tea is not created equal">Mizuba Tea Co</a>.</p>
    <p>View <a href="/work" title="My Work">my work</a> or <a id="contact-button">get in touch</a>.</p>
  </div>

  <!-- <a class="tooltip"><span>Coming Soon</span>Something Cool</a> -->

  <div id="connect" class="text-content">
    <h3>Connect with me</h3>
    <div id="social">
      <a href="http://www.twitter.com/dgaultiere" title="Random thoughts and shares on biz and tech" target="_blank"><i class="fa fa-twitter"></i></a>
      <a href="http://www.linkedin.com/in/dgaultiere" title="Over-glorified professionalism" target="_blank"><i class="fa fa-linkedin"></i></a>
      <a href="http://www.medium.com/@dgaultiere" title="Sometimes I write" target="_blank"><i class="fa fa-medium"></i></a>
    </div>
  </div>

  <div id="ichthys" class="text-content">
		<a href="http://bible.com/59/eph.2.8.esv" target="_blank">[ Eph 2:8 ]</a>
	</div>

  <div id="contact">
		<div id="contact-form">
			<span id="x-mark" class="close">&times;</span>
			<h2>Contact Me</h2>
      <?php
      if (!empty($error_msg)) {
        echo '<p class="error">'. implode("<br />", $error_msg) . "</p>";
      }
      if ($result != NULL) {
        echo '<p class="success">'. $result . "</p>";
        echo '<button class="button close">Done</button>';
      } else {
      ?>
      <form action="?result=<?php if(!empty($error_msg)) { ?>error<?php }; if($result != NULL) { ?>success<?php }; ?>" method="post">
        <noscript>
          <input type="hidden" name="nojs" id="nojs">
        </noscript>
        <input type="text" name="name" id="name" placeholder="Name" value="<?php get_data("name"); ?>">
        <input type="text" name="email" id="email" placeholder="Email" value="<?php get_data("email"); ?>">
        <textarea name="comments" id="comments" rows="5" cols="20" placeholder="Message"><?php get_data("comments"); ?></textarea>
        <input type="submit" name="submit" id="submit" class="button" value="Send" <?php if (isset($disable) && $disable === true) echo ' disabled="disabled"'; ?>>
      </form>
      <?php }; ?>
		</div>
  </div>

	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-43088112-1', 'davidgaultiere.com');
	  ga('send', 'pageview');
	</script>

</body>
</html>
