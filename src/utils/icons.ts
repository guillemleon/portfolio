import { SVGProps } from 'react';
import { ReactComponent as ArrowDown } from '@/assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUpRight } from '@/assets/icons/arrow-up-right.svg';
import { ReactComponent as ArrowLeft } from '@/assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@/assets/icons/arrow-right.svg';
import { ReactComponent as ChevronDown } from '@/assets/icons/chevron-down.svg';
import { ReactComponent as Dot } from '@/assets/icons/dot.svg';
import { ReactComponent as Download } from '@/assets/icons/download.svg';
import { ReactComponent as External } from '@/assets/icons/external.svg';
import { ReactComponent as Linkedin } from '@/assets/icons/linkedin.svg';
import { ReactComponent as Mail } from '@/assets/icons/mail.svg';
import { ReactComponent as Phone } from '@/assets/icons/phone.svg';

type IconNames =
    | 'arrowDown'
    | 'arrowLeft'
    | 'arrowRight'
    | 'arrowUpRight'
    | 'chevronDown'
    | 'dot'
    | 'download'
    | 'external'
    | 'linkedin'
    | 'mail'
    | 'phone';

const ICONS: Record<IconNames, React.FC<SVGProps<SVGSVGElement>>> = {
    arrowDown: ArrowDown,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUpRight: ArrowUpRight,
    chevronDown: ChevronDown,
    dot: Dot,
    download: Download,
    external: External,
    linkedin: Linkedin,
    mail: Mail,
    phone: Phone,
}

export default ICONS;