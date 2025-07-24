import { MESSAGES } from "./messages.js";

export const ERROR_MAP = {
    CategoryNotFound: {
        statusCode: 400,
        clientMessage: MESSAGES.CATEGORY_NOT_FOUND,
    },
    NoCategoryFound: {
        statusCode: 404,
        clientMessage: MESSAGES.NO_CATEGORY_FOUND,
    },
    SubcategoryNotFound: {
        statusCode: 400,
        clientMessage: MESSAGES.SUBCATEGORY_NOT_FOUND,
    },
    NoSubcategoryFound: {
        statusCode: 404,
        clientMessage: MESSAGES.NO_SUBCATEGORY_FOUND,
    },
    ProjectNotFound: {
        statusCode: 400,
        clientMessage: MESSAGES.PROJECT_NOT_FOUND,
    },
    TagsNotFound: {
        statusCode: 400,
        clientMessage: MESSAGES.TAGS_NOT_FOUND,
    },
    UserNotFound: {
        statusCode: 400,
        clientMessage: MESSAGES.USER_NOT_FOUND,
    },
    TaskNotFound: {
        statusCode: 400,
        clientMessage: MESSAGES.TASK_NOT_FOUND,
    },
    NoTaskFound: {
        statusCode: 404,
        clientMessage: MESSAGES.NO_TASK_FOUND,
    }
}