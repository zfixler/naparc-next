import React, { useState } from 'react';
//Styled components
import { TooltipContainer, Message } from './styled/Tooltip.styled';
//Icon
import { Info } from './icons';

function Tooltip({ denom }) {
	const [showTip, setShowTip] = useState(false);

	function getText(d) {
		switch (d) {
			case 'OPC':
				return 'Orthodox Presbyterian Church';
			case 'HRC':
				return 'Heritage Reformed Congregations';
			case 'PRC':
				return 'Presbyterian Reformed Church';
			case 'RPCNA':
				return 'Reformed Presbyterian Church in North America';
			case 'ARP':
				return 'Associate Reformed Presbyterian Church';
			case 'URCNA':
				return 'United Reformed Churches in North America';
			case 'PCA':
				return 'Presbyterian Church in America';
			case 'FRCNA':
				return 'Free Reformed Churches of North America';
			case 'RCUS':
				return 'The Reformed Church in the United States';
			default:
				break;
		}
	}

	return (
		<TooltipContainer
			onMouseEnter={() => setShowTip(true)}
			onMouseLeave={() => setShowTip(false)}>
			{showTip && <Message>{getText(denom)}</Message>}
			<Info height="15" width="15" color="var(--gray)" />
		</TooltipContainer>
	);
}

export default Tooltip;
