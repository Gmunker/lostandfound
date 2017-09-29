<?php

// $data = file_get_contents("php://input");
// $postData = json_decode($data);

// print_r($postData);

$fh = fopen("images/test.txt", 'w') or die("Failed to create file");
$text = <<<_END
Line 1
Line 2
Line 3

_END;

fwrite($fh, $text) or die("Could not write to file");
fclose($fh);

// echo "File written";
?>