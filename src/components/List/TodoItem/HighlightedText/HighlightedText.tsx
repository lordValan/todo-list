import { setSearchHighlighted } from '../../../../utils';

import './HighlightedText.css';

interface Props {
    text: string;
    highlighted?: string;
}

const HighlightedText: React.FC<Props> = ({ text, highlighted = '' }) => {
    return (
        <span
            className='highlighted-text'
            dangerouslySetInnerHTML={{ __html: setSearchHighlighted(highlighted, text) }}
        />
    );
}

export default HighlightedText;
