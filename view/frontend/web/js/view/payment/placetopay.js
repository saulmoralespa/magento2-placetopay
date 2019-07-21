define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: 'placetopay',
                component: 'Saulmoralespa_PlaceToPay/js/view/payment/method-renderer/placetopay'
            }
        );
        /** Add view logic here if needed */
        return Component.extend({});
    }
);