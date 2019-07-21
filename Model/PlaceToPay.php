<?php


namespace Saulmoralespa\PlaceTopay\Model;

use \Magento\Payment\Model\Method\AbstractMethod;


class PlaceToPay extends AbstractMethod
{
    const CODE = 'placetopay';

    protected $_code = self::CODE;


}