export type ServiceResponse<T = any> = {
	code: number;
	data: T;
	msg: string;
};


/**
 * 文章
 */
export type Posts = {
	id: number;
	uid: number;
	group_id: number;
	tag_id: number;
	article_key: string;
	node_key: string;
	title: string;
	content: string;
	create_time: Date|string;
	update_time?: Date;
	delete_time?: Date;
	deleted: number;
};

export type Node = {
	id: number;
	u_account: string;
	name: string;
	node_key: string;
};

/**
 * 用户
 */
export type User = {
	id: number;
	username: string;
	account: string;
	create_time: Date;
	role: number;
	group_id: number;
};

export type ArticleSaveResp = {
	u_account: string;
	title: string;
	content: string;
	article_key: string;
	tag: string;
	create_time: Date;
};

export type Pageable = {
	rules: {
		[key: string]: any;
	};
	conditions: {
		[key: string]: any;
	};
	page: {
		size: number;
		number: number;
		order_by: string;
	};
};

export type Page<T = any> = {
	rows: T;
	total: number;
	count: number;
};

export type STSToken = {
	Credentials: {
		AccessKeyId: string;
		AccessKeySecret: string;
		SecurityToken: string;
	};
};
