import filminLogo from '@/assets/companies/filmin.png';
import caixabankLogo from '@/assets/companies/caixabank.png';
import keolisLogo from '@/assets/companies/keolis.png';
import extiaLogo from '@/assets/companies/extia.png';
import flykubeLogo from '@/assets/companies/flykube.png';

const colors = [
    { name: 'green', value: '#4BD86A' },
    { name: 'violet', value: '#A78BFF' },
    { name: 'azure', value: '#4FA6FF' },
    { name: 'cyan', value: '#3ED9DA' },
    { name: 'amber', value: '#F0B040' },
    { name: 'rose', value: '#FF7EA0' },
    { name: 'lime', value: '#A6E22E' },
    { name: 'teal', value: '#2FC7A8' },
    { name: 'indigo', value: '#7C8CFF' },
    { name: 'magenta', value: '#E86FE0' },
    { name: 'coral', value: '#FF7A59' },
    { name: 'gold', value: '#D8C27A' },
    { name: 'ice', value: '#9FD6E8' },
]

const links = [
    { path: '/', label: 'home' },
    { path: '/about', label: 'about' },
    { path: '/work', label: 'work' },
    { path: '/contact', label: 'contact' },
];

const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'ca', label: 'Catalan' },
]

const logos = [
    { id: 'filmin', logo: filminLogo, },
    { id: 'caixabank', logo: caixabankLogo },
    { id: 'keolis', logo: keolisLogo },
    { id: 'extia', logo: extiaLogo },
    { id: 'flykube', logo: flykubeLogo },
]

export { colors, links, languages, logos }