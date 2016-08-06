<?php
require "simplehtmldom_1_5/simple_html_dom.php";

//$loc = "http://www.yelp.com/biz/new-jersey-motor-vehicle-commission-newark?sort_by=date_desc";

$loc = formatLocString( $_GET["yelpURL"] );

$reviewObjs = Array();
$pageLinks = Array();

function doLog ( $str ) {
	$fh = fopen("log.txt", "a+");
	fwrite( $fh, $str ."\n");
	fclose( $fh );	
}

function formatLocString ( $str ) {
	if ( $str ) {
		list( $url, $query ) = explode( "?", $str );
		
		parse_str( $query, $arr );

		$arr["sort_by"] = "date_desc";

		if ( !$arr["start"] ) {
			$arr["start"] = 0;
		}

		if ( isset( $_GET["start"] ) ) {
			$arr["start"] = $_GET["start"];
		}

		return $url ."?". http_build_query( $arr );
	}

	return null;
}

function get_data( $url ) {
	$options = array(
        CURLOPT_RETURNTRANSFER => true,     // return web page
        CURLOPT_HEADER         => false,    // don't return headers
        CURLOPT_FOLLOWLOCATION => true,     // follow redirects
        CURLOPT_ENCODING       => "",       // handle all encodings
        CURLOPT_USERAGENT      => "spider", // who am i
        CURLOPT_AUTOREFERER    => true,     // set referer on redirect
        CURLOPT_CONNECTTIMEOUT => 30,      // timeout on connect
        CURLOPT_TIMEOUT        => 30,      // timeout on response
        CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects

    );

    $ch      = curl_init($url);
    curl_setopt_array( $ch, $options );
    $content = curl_exec( $ch );
    $err     = curl_errno( $ch );
    $errmsg  = curl_error( $ch );
    $header  = curl_getinfo( $ch,CURLINFO_EFFECTIVE_URL );
    curl_close( $ch );

    $header['errno']   = $err;
    $header['errmsg']  = $errmsg;

    //change errmsg here to errno
    if ($errmsg) {
        echo "CURL:".$errmsg."<BR>";
    }
    return $content;
}

function getPageRatings( $page ) {
	global $reviewObjs;
	global $pageLinks;

	$ratings = Array();
	$dates = Array();
	$reviews = Array();

	// Create DOM from URL or file
	// $html = file_get_html( $page );
	$html = new simple_html_dom();

	// Load HTML from a string
	$html->load( get_data( $page ) );

	// Get all the star ratings
	foreach($html->find('.review-wrapper meta[itemprop=ratingValue]') as $element) {
		$ratings[] = $element->content;
	}

	// Get all the dates
	foreach($html->find('.review-wrapper meta[itemprop=datePublished]') as $element) {
		$dates[] = $element->content;
	}

	foreach($html->find('.review-wrapper p[itemprop=description]') as $element) {
		$reviews[] = $element->plaintext;
	}

	foreach($html->find('.pagination-links .available-number') as $element) {
		$link = $element->href;

		if ( array_search( $link, $pageLinks ) == false ) {
			$pageLinks[] = $link;
		}
	}

	for ( $i = 0; $i < count( $ratings ); $i++ ) {
		$r = new stdClass();
		$r->rating = $ratings[ $i ];
		$r->date = $dates[ $i ];
		$r->review = str_replace( '"', '"', $reviews[ $i ] );

		$reviewObjs[] = $r;
	}
}

if ( $loc ) {
	$start = 0;
	$starts = Array();
	getPageRatings( $loc );

	for ( $i = 0; $i < count( $pageLinks ); $i++ ) {
		$parts = parse_url( $pageLinks[$i] );
		parse_str( $parts["query"], $arr );
		$starts[] = intval($arr["amp;start"]);
	}

	$parts = parse_url( $loc );
	parse_str( $parts["query"], $arr );
	$start = intval($arr["amp;start"]);

	header("Content-type: application/json");

	$returnObj = new stdClass();
	$returnObj->reviews = $reviewObjs;
	$returnObj->pages = $pageLinks;
	$returnObj->start = $start;
	$returnObj->starts = $starts;
	$returnObj->loc = $loc;

	echo json_encode( $returnObj );
}

?>