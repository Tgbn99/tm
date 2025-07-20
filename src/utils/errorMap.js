import { MESSAGES } from "./messages";

export const ERROR_MAP = {
    CategoryNotFound: {
        statusCode: 400,
        clientMessage: MESSAGES.CATEGORY_NOT_FOUND,
    },
    SubcategoryNotFound: {
        statusCode: 400,
        clientMessage: MESSAGES.SUBCATEGORY_NOT_FOUND,
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
    }
}