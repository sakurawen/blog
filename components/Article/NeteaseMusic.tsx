import React from 'react';

const NeteaseMuisc: React.FC<{ aid: string; type: number }> = ({
	aid,
	type,
}) => {
	return (
		<iframe
			frameBorder='no'
			marginWidth={0}
			marginHeight={0}
      className="my-4"
			width='100%'
			height='86'
			src={`//music.163.com/outchain/player?type=${type}&id=${aid}&auto=0&height=66`}
		></iframe>
	);
};

export default NeteaseMuisc;
