<?php

use Twig\Extension\AbstractExtension as TwigAbstractExtension;
use Twig\TwigFunction;
use Twig\Error\Error as TwigError;

class TranslationFunction extends TwigAbstractExtension {

    private $path = '';

    public function __construct() {
    }

    /**
     * Prepare Function
     */
    public function getFunctions() {
        return array(
            new TwigFunction('__', array($this, 'func')),
        );
    }

    /**
     * The Function For Your Custom Filter
     * @return [function]
     */
    public function func(string $string) {
        return $string;
    }
}
