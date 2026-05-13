<?php
/**
 * Airbnb iCal Proxy — fetches Airbnb calendar server-side to bypass browser CORS.
 *
 * REQUIREMENT: php.ini must have allow_url_fopen = On (default on most shared hosts).
 *
 * Deploy this file to the same root as the Angular dist folder on Hostico.
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/calendar; charset=utf-8');
header('Cache-Control: max-age=3600');

$url = isset($_GET['url']) ? $_GET['url'] : '';

// Security: only proxy Airbnb iCal URLs — prevents open-proxy abuse
if (!$url || strpos($url, 'https://www.airbnb.com/calendar/ical/') !== 0) {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}

$ctx = stream_context_create([
    'http' => [
        'timeout' => 10,
        'method'  => 'GET',
        'header'  => "User-Agent: ViiLaMunte-CalendarProxy/1.0\r\n",
    ]
]);

$data = @file_get_contents($url, false, $ctx);
if ($data === false) {
    http_response_code(502);
    echo 'Could not fetch calendar data from Airbnb.';
    exit;
}

echo $data;
