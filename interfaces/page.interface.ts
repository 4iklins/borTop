export enum LevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export interface Advantage {
	title: string;
	description: string;
	_id: string;
}

export interface HhData {
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
	updatedAt: Date;
	_id: string;
}

export interface Blog {
	h1: string;
	metaTitle: string;
	metaDescription: string;
	views: number;
	_id: string;
}

export interface Sravnikus {
	metaTitle: string;
	metaDescription: string;
	qas: Qas[];
	_id: string;
}

export interface Learningclub {
	metaTitle: string;
	metaDescription: string;
	qas: Qas[];
	_id: string;
}

export interface Qas {
	question: string,
	answer: string
}

export interface PageModel {
	_id: string;
	tags: string[];
	secondCategory: string;
	alias: string;
	title: string;
	category: string;
	seoText: string;
	tagsTitle: string;
	metaTitle: string;
	metaDescription: string;
	firstCategory: LevelCategory;
	advantages: Advantage[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	hh: HhData;
	qas: Qas[];
	addresses: string[];
	categoryOn: string;
	blog: Blog;
	sravnikus: Sravnikus;
	learningclub: Learningclub;
}