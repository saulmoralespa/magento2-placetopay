<?php


namespace Saulmoralespa\PlaceTopay\Logger;


class Logger extends \Monolog\Logger
{
    /**
     * Set logger name
     * @param $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }
}