<?php


namespace Saulmoralespa\PlaceToPay\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class ConfigObserver implements ObserverInterface
{

    protected $_scopeConfig;

    protected $_helperData;

    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Saulmoralespa\PlaceToPay\Helper\Data $helperData
    )
    {
        $this->_scopeConfig = $scopeConfig;
        $this->_helperData = $helperData;
    }

    /**
     * @param Observer $observer
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function execute(Observer $observer)
    {
        $this->validateNoEmptyFields();
    }

    /**
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function validateNoEmptyFields()
    {
        if ($this->_helperData->getActive() && (
            !$this->_helperData->getTrankey() ||
            !$this->_helperData->getLogin() ||
            !$this->_helperData->getUrlEndPoint()))
            throw new \Magento\Framework\Exception\LocalizedException(__('placetopay: requires the fields are not empty'));
    }
}