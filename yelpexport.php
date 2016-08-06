<?php
$data = $_POST['exportdata'];

$json = json_decode( $data );

print_r( $data );
print_r( $json );
?>