<?php

/**
 * This is an example Twig Filter
 * Docs: https://twig.symfony.com/doc/2.x/advanced.html#creating-an-extension
 */

class ExampleFilter extends Twig_Extension {
    /**
     * Prepare Filter
     */
    public function getFilters() {
        return array(
            new Twig_Filter('exampleFilter', array($this, 'filter')),
        );
    }

    /**
     * The Function For Your Custom Filter
     * @return [function]
     */
    public function filter($string) {
        return $string . ' World';
    }
}
