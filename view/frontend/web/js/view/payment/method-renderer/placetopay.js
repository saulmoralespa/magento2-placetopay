define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Magento_Checkout/js/action/place-order',
        'Magento_Checkout/js/action/select-payment-method',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Magento_Checkout/js/model/error-processor',
        'Magento_Checkout/js/model/full-screen-loader',
        'mage/url'
    ],
    function (
        $,
        Component,
        placeOrderAction,
        selectPaymentMethodAction,
        customer,
        checkoutData,
        additionalValidators,
        errorProcessor,
        fullScreenLoader,
        url
    ) {
        'use strict';

        return Component.extend({
            redirectAfterPlaceOrder: false,
            defaults: {
                template: 'Saulmoralespa_PlaceToPay/payment/placetopay'
            },

            placeOrder: function (data, event) {
                if (event)
                    event.preventDefault();
                var self = this,
                    placeOrder,
                    emailValidationResult = customer.isLoggedIn(),
                    loginFormSelector = 'form[data-role=email-with-possible-login]';
                if (!customer.isLoggedIn()) {
                    $(loginFormSelector).validation();
                    emailValidationResult = Boolean($(loginFormSelector + ' input[name=username]').valid());
                }
                if (emailValidationResult && this.validate()) {
                    this.isPlaceOrderActionAllowed(false);
                    placeOrder = placeOrderAction(this.getData(), false, this.messageContainer);

                    $.when(placeOrder).done(function () {
                        self.isPlaceOrderActionAllowed(true);
                    }).done(this.afterPlaceOrder.bind(this));
                    return true;
                }
                return false;
            },

            selectPaymentMethod: function() {
                selectPaymentMethodAction(this.getData());
                checkoutData.setSelectedPaymentMethod(this.item.method);
                return true;
            },

            afterPlaceOrder: function() {
                $.post(url.build('placetopay/payment/data'), 'json')
                    .done( data => {
                        window.location = data.url;
                    }).fail( response => {
                    errorProcessor.process(response, this.messageContainer);
                }).always( () => {
                    fullScreenLoader.stopLoader();
                });
            },

            getLogoUrl: function() {
                return window.checkoutConfig.payment.placetopay.logoUrl;
            }

        });
    }
);