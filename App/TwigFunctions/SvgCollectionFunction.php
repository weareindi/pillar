<?php

use Twig\Extension\AbstractExtension as TwigAbstractExtension;
use Twig\TwigFunction;
use Twig\Error\Error as TwigError;

class SvgCollectionFunction extends TwigAbstractExtension {

    private $path = '';
    private static $cache = null;
    private static $registry = [];

    public function __construct(string $path) {
        if (!is_dir($path)) {
            throw new TwigError('SvgCollection: Path could not be found');
        }
        $this->path = trim($path, '/');
    }

    public function getFunctions() {
        return array(
            new TwigFunction('svgcollection', array($this, 'getCollection')),
            new TwigFunction('svgsprite', array($this, 'generateSprite')),
            new TwigFunction('registersvg', array($this, 'registerSvg')),
        );
    }

    public function getCollection() {
        if (self::$cache !== null) {
            return self::$cache;
        }

        $items = [];
        $di = new \RecursiveDirectoryIterator($this->path, \RecursiveDirectoryIterator::SKIP_DOTS);
        $ii = new \RecursiveIteratorIterator($di, \RecursiveIteratorIterator::SELF_FIRST);

        foreach ($ii as $file) {
            if ($file->getExtension() !== 'svg') {
                continue;
            }

            $filename = basename($file->getFilename(), ".svg");
            $filename_parts = explode('--', $filename);

            if (count($filename_parts) <= 1) {
                continue;
            }

            $svg_type = $filename_parts[0];
            $svg_name = null;
            $svg_dimensions = [];

            if (count($filename_parts) === 2) {
                $svg_dimensions = explode('x', $filename_parts[1]);
            } elseif (count($filename_parts) === 3) {
                $svg_name = $filename_parts[1];
                $svg_dimensions = explode('x', $filename_parts[2]);
            }

            if (count($svg_dimensions) < 2) {
                continue;
            }

            $key = $svg_type . ($svg_name ? '--' . $svg_name : '');
            $viewbox = sprintf('0 0 %s %s', $svg_dimensions[0], $svg_dimensions[1]);

            $items[$key] = [
                'id' => 'svg-' . $key,
                'src' => $this->path . '/' . $file->getFilename(),
                'width' => (float)$svg_dimensions[0],
                'height' => (float)$svg_dimensions[1],
                'impheight' => (( (float)$svg_dimensions[1] / (float)$svg_dimensions[0] ) * 100) . '%',
                'offset' => [
                    'y' => -(100 / (float)$svg_dimensions[1]) . '%',
                    'x' => -(100 / (float)$svg_dimensions[0]) . '%'
                ],
                'viewbox' => $viewbox
            ];
        }

        asort($items);
        self::$cache = $items;
        return $items;
    }

    public function registerSvg($key, $original = false) {
        $registryKey = $original ? $key . '--original' : $key;
        self::$registry[$registryKey] = [
            'key' => $key,
            'original' => (bool)$original
        ];
    }

    public function generateSprite($prepopulate = null) {
        if (is_array($prepopulate)) {
            foreach ($prepopulate as $key) {
                $this->registerSvg($key);
            }
        }

        $items = $this->getCollection();
        $symbols = [];

        foreach (self::$registry as $regKey => $config) {
            $key = $config['key'];
            $isOriginal = $config['original'];

            if (!isset($items[$key])) {
                continue;
            }

            $data = $items[$key];
            $content = file_get_contents($data['src']);

            $content = preg_replace('/<svg[^>]*>/', '', $content);
            $content = preg_replace('/<\/svg>/', '', $content);

            if (!$isOriginal) {
                $content = preg_replace('/fill="[^"]*"/', 'fill="currentColor"', $content);
                $content = preg_replace('/stroke="[^"]*"/', 'stroke="currentColor"', $content);
            }

            $symbolId = $isOriginal ? $data['id'] . '--original' : $data['id'];

            $symbols[] = '<symbol id="' . $symbolId . '" viewBox="' . $data['viewbox'] . '" preserveAspectRatio="none">' . $content . '</symbol>';
        }

        if (empty($symbols)) {
            return '';
        }

        return '<svg xmlns="http://www.w3.org/2000/svg" style="display:none;">' . implode('', $symbols) . '</svg>';
    }
}