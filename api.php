<?php

$request_method = $_SERVER['REQUEST_METHOD'];

// Redirect
if ($request_method === 'GET' && $_GET["url"]) {
    $serialized_urls = file_get_contents("url_list");
    $url_list = unserialize($serialized_urls);

    // Check if the URL requested has already been POSTed
    if (isset($url_list[$_GET['url']])) {
        $url_to_redirect_to = $url_list[$_GET['url']];

        // Permanent 301 redirection
        // @TODO: Add check to make sure URL is valid
        header( "Location: https://".$url_to_redirect_to, TRUE, 301 );
        exit();
    } else {
        echo "URL does not exist.";
    }

    // Create shortend url and store
} elseif ($request_method === 'POST' && $_POST['url']) {
    $serialized_urls = file_get_contents("url_list");
    $url_list = unserialize($serialized_urls);

    // Hash/encode URL, and store in url_list file
    $converted_url = base_convert(time() + rand(0, 10), 10, 36);
    $url_list[$converted_url] = $_POST['url'];
    file_put_contents("url_list", serialize($url_list));
    // return json with shortend url
    $json_result = ['short_url' => $converted_url, 'url' => $_POST['url']];

    header('Content-type: application/json');
    echo json_encode($json_result);
}

