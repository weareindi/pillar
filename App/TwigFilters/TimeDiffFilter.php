<?php

/**
 * This is an example Twig Filter
 * Docs: https://twig.symfony.com/doc/3.x/advanced.html#creating-an-extension
 */

use Twig\Extension\AbstractExtension as TwigExtension;
use Twig\TwigFilter;

class TimeDiffFilter extends TwigExtension {
    /**
     * Prepare Filter
     */
    public function getFilters() {
        return array(
            new TwigFilter('timediff', array($this, 'filter')),
        );
    }

    /**
     * The Function For Your Custom Filter
     * @return [function]
     */
    public function filter($timestamp) {
        return self::time_elapsed_string($timestamp);
    }

    /**
     * Undocumented function
     *
     * @param [type] $datetime
     * @param boolean $full
     * @return void
     */
    public function time_elapsed_string($timestamp, $full = false) {
        $now = new DateTime;
        $ago = new DateTime('@' . floor($timestamp / 1000)); // bullhorn timestamps are stored in milliseconds, php works in seconds

        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full) $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }
}
