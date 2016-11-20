<?php
// OPTIONS - PLEASE CONFIGURE THESE BEFORE USE!

$yourEmail = "dgaultiere@gmail.com"; // the email address you wish to receive these mails through
$yourWebsite = "DavidGaultiere.com"; // the name of your website
$thanksPage = ''; // URL to 'thanks for sending mail' page; leave empty to keep message on the same page
$maxPoints = 4; // max points a person can hit before it refuses to submit - recommend 4
$requiredFields = "name,email,comments"; // names of the fields you'd like to be required as a minimum, separate each field with a comma


// DO NOT EDIT BELOW HERE
$error_msg = array();
$result = null;

$requiredFields = explode(",", $requiredFields);

function clean($data) {
	$data = trim(stripslashes(strip_tags($data)));
	return $data;
}
function isBot() {
	$bots = array("Indy", "Blaiz", "Java", "libwww-perl", "Python", "OutfoxBot", "User-Agent", "PycURL", "AlphaServer", "T8Abot", "Syntryx", "WinHttp", "WebBandit", "nicebot", "Teoma", "alexa", "froogle", "inktomi", "looksmart", "URL_Spider_SQL", "Firefly", "NationalDirectory", "Ask Jeeves", "TECNOSEEK", "InfoSeek", "WebFindBot", "girafabot", "crawler", "www.galaxy.com", "Googlebot", "Scooter", "Slurp", "appie", "FAST", "WebBug", "Spade", "ZyBorg", "rabaz");

	foreach ($bots as $bot)
		if (stripos($_SERVER['HTTP_USER_AGENT'], $bot) !== false)
			return true;

	if (empty($_SERVER['HTTP_USER_AGENT']) || $_SERVER['HTTP_USER_AGENT'] == " ")
		return true;

	return false;
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	if (isBot() !== false)
		$error_msg[] = "No bots please! UA reported as: ".$_SERVER['HTTP_USER_AGENT'];

	// lets check a few things - not enough to trigger an error on their own, but worth assigning a spam score..
	// score quickly adds up therefore allowing genuine users with 'accidental' score through but cutting out real spam :)
	$points = (int)0;

	$badwords = array("adult", "beastial", "bestial", "blowjob", "clit", "cum", "cunilingus", "cunillingus", "cunnilingus", "cunt", "ejaculate", "fag", "felatio", "fellatio", "fuck", "fuk", "fuks", "gangbang", "gangbanged", "gangbangs", "hotsex", "hardcode", "jism", "jiz", "orgasim", "orgasims", "orgasm", "orgasms", "phonesex", "phuk", "phuq", "pussies", "pussy", "spunk", "xxx", "viagra", "phentermine", "tramadol", "adipex", "advai", "alprazolam", "ambien", "ambian", "amoxicillin", "antivert", "blackjack", "backgammon", "texas", "holdem", "poker", "carisoprodol", "ciara", "ciprofloxacin", "debt", "dating", "porn", "link=", "voyeur", "content-type", "bcc:", "cc:", "document.cookie", "onclick", "onload", "javascript");

	foreach ($badwords as $word)
		if (
			strpos(strtolower($_POST['comments']), $word) !== false ||
			strpos(strtolower($_POST['name']), $word) !== false
		)
			$points += 2;

	if (strpos($_POST['comments'], "http://") !== false || strpos($_POST['comments'], "www.") !== false)
		$points += 2;
	if (isset($_POST['nojs']))
		$points += 1;
	if (preg_match("/(<.*>)/i", $_POST['comments']))
		$points += 2;
	if (strlen($_POST['name']) < 3)
		$points += 1;
	if (strlen($_POST['comments']) < 15 || strlen($_POST['comments'] > 1500))
		$points += 2;
	if (preg_match("/[bcdfghjklmnpqrstvwxyz]{7,}/i", $_POST['comments']))
		$points += 1;
	// end score assignments

	foreach($requiredFields as $field) {
		trim($_POST[$field]);

		if (!isset($_POST[$field]) || empty($_POST[$field]) && array_pop($error_msg) != "Please fill in all the required fields and submit again.\r\n")
			$error_msg[] = "Please fill in all the required fields and submit again.";
	}

	if (!empty($_POST['name']) && !preg_match("/^[a-zA-Z-'\s]*$/", stripslashes($_POST['name'])))
		$error_msg[] = "The name field must not contain special characters.\r\n";
	if (!empty($_POST['email']) && !preg_match('/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+' . '(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/i', strtolower($_POST['email'])))
		$error_msg[] = "That is not a valid email address.\r\n";
	if (!empty($_POST['url']) && !preg_match('/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i', $_POST['url']))
		$error_msg[] = "Invalid website url.\r\n";

	if ($error_msg == NULL && $points <= $maxPoints) {
		$subject = "Automatic Form Email";

		$message = "You received this email message through your website: \n\n";
		foreach ($_POST as $key => $val) {
			if (is_array($val)) {
				foreach ($val as $subval) {
					$message .= ucwords($key) . ": " . clean($subval) . "\r\n";
				}
			} else {
				$message .= ucwords($key) . ": " . clean($val) . "\r\n";
			}
		}
		$message .= "\r\n";
		$message .= 'IP: '.$_SERVER['REMOTE_ADDR']."\r\n";
		$message .= 'Browser: '.$_SERVER['HTTP_USER_AGENT']."\r\n";
		$message .= 'Points: '.$points;

		if (strstr($_SERVER['SERVER_SOFTWARE'], "Win")) {
			$headers   = "From: $yourEmail\n";
			$headers  .= "Reply-To: {$_POST['email']}";
		} else {
			$headers   = "From: $yourWebsite <$yourEmail>\n";
			$headers  .= "Reply-To: {$_POST['email']}";
		}

		if (mail($yourEmail,$subject,$message,$headers)) {
			if (!empty($thanksPage)) {
				header("Location: $thanksPage");
				exit;
			} else {
				$result = 'Your email was successfully sent.';
				$disable = true;
			}
		} else {
			$error_msg[] = 'Your email could not be sent this time. ['.$points.']';
		}
	} else {
		if (empty($error_msg))
			$error_msg[] = 'Your email looks too much like spam, and could not be sent this time. ['.$points.']';
	}
}
function get_data($var) {
	if (isset($_POST[$var]))
		echo htmlspecialchars($_POST[$var]);
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>David Gaultiere</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico">

    <script type="text/javascript" src="//use.typekit.net/bex1ayv.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

    <link href="/main.css" rel="stylesheet">
    <link href="/jquery-popup.css" rel="stylesheet">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="/jquery-popup.js"></script>
</head>

<body id="home-page">

    <div id="headshot">David Gaultiere</div>

    <h1 id="name">David Gaultiere</h1>

    <div id="about" class="description">
        <p>Self-starter and technology enthusiast. Passionate about creativity, culture, and innovation. Husband to the wonderful <a href="http://www.loveandelyse.com/" target="_blank" title="Love & Elyse">Brianne Elyse</a>, sometimes <a href="http://www.medium.com/@dgaultiere" title="Read my blog on Medium.com" target="_blank">writer</a>, and always learner. Currently serving as a Product Manager at <a href="http://www.appfolioinc.com/" target="_blank" title="Cloud-based software designed for specific industries">Appfolio</a>. Previously launched startups <a href="http://www.fastcompany.com/3029879/most-creative-people/can-the-lyft-of-moving-take-the-pain-out-of-one-of-lifes-most-hated-act" target="_blank" title="Using technology and crowd-sourcing to take the pain out of moving">NextMover</a>, Fonogram, and <a href="http://www.mizubatea.com/" target="_blank" title="All tea is not created equal">Mizuba Tea Co</a>.</p>
        <p>View <a href="/work" title="My Work">my work</a> or <a href="#" id="onclick">get in touch</a>.</p>
    </div>

    <!-- <a class="tooltip"><span>Coming Soon</span>Stacky</a> -->

    <div id="connect">
        <h3>Connect with me</h3>
        <div id="social">
            <a href="http://www.twitter.com/dgaultiere" title="Random thoughts and shares on biz and tech" target="_blank"><i class="fa fa-twitter"></i></a>
            <a href="http://www.linkedin.com/in/dgaultiere" title="Over-glorified professionalism" target="_blank"><i class="fa fa-linkedin"></i></a>
            <a href="http://www.medium.com/@dgaultiere" title="Sometimes I write" target="_blank"><i class="fa fa-medium"></i></a>
        </div>
    </div>

    <a href="http://bible.com/59/eph.2.8.esv" target="_blank" id="ichthys">[ Eph 2:8 ]</a>

    <div id="contact-form">
      <?php
      if (!empty($error_msg)) {
        echo '<p class="error">ERROR: '. implode("<br />", $error_msg) . "</p>";
      }
      if ($result != NULL) {
        echo '<p class="success">'. $result . "</p>";
      }
      ?>
      <form action="<?php echo basename(__FILE__); ?>" method="post">
        <noscript>
          <input type="hidden" name="nojs" id="nojs">
        </noscript>
        <input type="text" name="name" id="name" placeholder="Name" value="<?php get_data("name"); ?>">
        <input type="text" name="email" id="email" placeholder="Email" value="<?php get_data("email"); ?>">
        <textarea name="comments" id="comments" rows="5" cols="20" placeholder="Message"><?php get_data("comments"); ?></textarea>
        <input type="submit" name="submit" id="submit" value="Send" <?php if (isset($disable) && $disable === true) echo ' disabled="disabled"'; ?>>
      </form>
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
