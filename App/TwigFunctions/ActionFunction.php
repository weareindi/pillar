<?php

use Twig\Extension\AbstractExtension as TwigAbstractExtension;
use Twig\TwigFunction;

class ActionFunction extends TwigAbstractExtension {
    /**
     * Prepare Function
     */
    public function getFunctions() {
        return array(
            new TwigFunction('action', array($this, 'func')),
        );
    }

    /**
     * The Function For Your Custom Filter
     * @return [function]
     */
    public function func($action) {}
}
