<?php

use Twig\Extension\AbstractExtension as TwigAbstractExtension;
use Twig\TwigFunction;

class FnFunction extends TwigAbstractExtension {
    /**
     * Prepare Function
     */
    public function getFunctions() {
        return array(
            new TwigFunction('fn', array($this, 'func')),
            new TwigFunction('function', array($this, 'func')),
        );
    }

    /**
     * The Function For Your Custom Filter
     * @return [function]
     */
    public function func($action) {}
}
