import routes from "./routes";
import crud from "./crud";
import getCurrentCookie from "../utils/cookieHelper";

const getAllArticles = async (page, onSuccess, onFailure) => {
    await crud.get(
		routes.GET_ALL_ARTICLES(page),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure,
	);
};

const getArticlesCount = async (onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ALL_ARTICLES_COUNT,
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure,
	);
};

const getAllArticlesByCurrentUser = async (page, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ALL_ARTICLES_BY_CURRENT_USER(page), 
		{
			"Content-Type": "application/json",
			Authorization: getCurrentCookie(),
		},
		onSuccess,
		onFailure,
	);
};

const getArticlesCountByCurrentUser = async (onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ALL_ARTICLES_COUNT_BY_CURRENT_USER,
		{
			"Content-Type": "application/json",
			Authorization: getCurrentCookie(),
		},
		onSuccess,
		onFailure,
	);
};

const getArticleById = async (id, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ARTICLE_BY_ID(id), 
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure,
	);
};

const createArticle = async (body, onSuccess, onFailure) => {
	await crud.formInput(
		routes.CREATE_ARTICLE,
		"POST",
		{
			"Content-Type": "application/json",
			Authorization: getCurrentCookie(),
		},
		body,
		onSuccess,
		onFailure,
	);
};

const editArticle = async (id, body, onSuccess, onFailure) => {
	await crud.formInput(
		routes.EDIT_ARTICLE_BY_ID(id),
		"PUT",
		{
			"Content-Type": "application/json",
			Authorization: getCurrentCookie(),
		},
		body,
		onSuccess,
		onFailure,
	);
};

const deleteArticle = async (id, onSuccess, onFailure) => {
	await crud.remove(routes.DELETE_ARTICLE_BY_ID(id), onSuccess, onFailure);
};

const articlesService = {
    getAllArticles,
	getArticlesCount,
	getAllArticlesByCurrentUser,
	getArticlesCountByCurrentUser,
	getArticleById,
	createArticle,
	editArticle,
	deleteArticle,
};

export default articlesService;