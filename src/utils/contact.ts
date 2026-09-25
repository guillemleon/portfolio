interface Contact {
    email: string;
    linkedin: string;
    phone: string;
    location: string;
}

import { site } from './site';

export const contact: Contact = {
    email: 'guillem.leonf@gmail.com',
    // Left empty on purpose: a channel only renders once it has a real value.
    linkedin: site.linkedin,
    phone: '',
    location: 'Barcelona, Spain',
};

export type ContactChannel = {
    id: 'email' | 'linkedin' | 'phone';
    value: string;
    href: string;
};

export const contactChannels = (): ContactChannel[] => {
    const channels: ContactChannel[] = [
        { id: 'email', value: contact.email, href: `mailto:${contact.email}` },
    ];

    if (contact.linkedin) {
        channels.push({
            id: 'linkedin',
            value: contact.linkedin.replace(/^https?:\/\//, ''),
            href: contact.linkedin,
        });
    }

    if (contact.phone) {
        channels.push({
            id: 'phone',
            value: contact.phone,
            href: `tel:${contact.phone.replace(/\s/g, '')}`,
        });
    }

    return channels;
};
