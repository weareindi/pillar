<?php

/**
 * This is an example Twig Filter
 * Docs: https://twig.symfony.com/doc/3.x/advanced.html#creating-an-extension
 */

use Twig\Extension\AbstractExtension as TwigAbstractExtension;
use Twig\TwigFilter;

class ExampleFilter extends TwigExtension {
    /**
     * Prepare Filter
     */
    public function getFilters() {
        return array(
            new TwigFilter('exampleFilter', array($this, 'filter')),
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
