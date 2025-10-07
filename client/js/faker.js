'use strict';

import { faker } from '@faker-js/faker';

// Make faker globally available
window.faker = faker;
window.FK = {
    /**
     * Fakes the form inputs with random data
     * @param {jQuery<HTMLElement>} $form - jQuery object of the form to be filled
     */
    fakeForm: function ($form) {
        $form.find('input, select, textarea').each(function () {
            const $el = $(this);
            const nameAttr = ($el.attr('name') || '').toLowerCase();
            const typeAttr = $el.attr('type') || '';

            if (typeAttr === 'file') {
                return; // Ignore file inputs
            }

            if ($el.is('select')) {
                const options = $el.find('option');
                const randomIndex = Math.floor(Math.random() * options.length);
                $el.val(options.eq(randomIndex).val());
                return;
            }

            if ($el.is('textarea')) {
                $el.val(faker.lorem.paragraph());
            } else if (nameAttr.includes('name')) {
                $el.val(faker.person.fullName());
            } else if (nameAttr.includes('email')) {
                $el.val(faker.internet.email());
            } else if (nameAttr.includes('phone')) {
                $el.val(faker.phone.number({ style: 'international' }).replace(/^\+/, ''));
            } else if (nameAttr.includes('address')) {
                $el.val(faker.location.streetAddress());
            } else if (nameAttr.includes('city')) {
                $el.val(faker.location.city());
            } else {
                $el.val(faker.lorem.text().substring(0, 50));
            }
        });
    }
};