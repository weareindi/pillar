<?php

/**
 * This is an example Twig Function
 * Docs: https://twig.symfony.com/doc/3.x/advanced.html#creating-an-extension
 */

use Twig\Extension\AbstractExtension as TwigAbstractExtension;
use Twig\TwigFunction;

class ExampleFunction extends TwigExtension {
    /**
     * Prepare Function
     */
    public function getFunctions() {
        return array(
            new TwigFunction('exampleFunction', array($this, 'func')),
        );
    }

    /**
     * The Function For Your Custom Filter
     * @return [function]
     */
    public function func() {
        return 'Test Function Output';
    }
}
