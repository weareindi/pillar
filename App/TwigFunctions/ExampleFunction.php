<?php

/**
 * This is an example Twig Function
 * Docs: https://twig.symfony.com/doc/2.x/advanced.html#creating-an-extension
 */

class ExampleFunction extends Twig_Extension {
    /**
     * Prepare Function
     */
    public function getFunctions() {
        return array(
            new Twig_Function('exampleFunction', array($this, 'func')),
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
