<?php

use Twig\Extension\AbstractExtension as TwigAbstractExtension;
use Twig\TwigFunction;
use Twig\Error\Error as TwigError;

class SvgCollectionFunction extends TwigAbstractExtension {

    private $path = '';

    public function __construct(string $path) {
        if (!is_dir($path)) {
            throw new TwigError('SvgCollection: Path could not be found');
        }

        $this->path = trim($path, '/');
    }

    /**
     * Prepare Function
     */
    public function getFunctions() {
        return array(
            new TwigFunction('svgcollection', array($this, 'func')),
        );
    }

    /**
     * The Function For Your Custom Filter
     * @return [function]
     */
    public function func() {

        // preapre items
        $items = [];

        // Loop over source files
        $di = new \RecursiveDirectoryIterator($this->path, \RecursiveDirectoryIterator::SKIP_DOTS);
        $ii = new \RecursiveIteratorIterator($di, \RecursiveIteratorIterator::SELF_FIRST);
        foreach($ii as $file) {
            if ($file->getExtension() !== 'svg') {
                continue;
            }

            // convert filename to parts, split at '--'
            $filename_parts = explode('--', $file->getFilename());

            // if not enough parts,
            if (count($filename_parts) <= 1) {
                continue;
            }

            // if full array, assume color in position 2. If not white - skip
            if (count($filename_parts) === 4 && $filename_parts[2] !== 'white') {
                continue;
            }

            // get svg type
            $svg_type = $filename_parts[0];

            // get svg name
            $svg_name = $filename_parts[1];

            // add item to
            $items[$svg_type . '--' . $svg_name] = $this->path . '/' . $file->getFilename();
        }

        // sort by name
        asort($items);

        // return
        return $items;
    }
}
