<?php

class TwigGlobalContextData {
    private array $site;

    function __construct() {
        $this->site = [
            'link' => '#',
            'admin_url' => '/',
            'version' => ''
        ];
    }
}
