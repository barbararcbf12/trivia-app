// 5 is the code for rate limit according to the API docs https://opentdb.com/api_config.php
const EXCEEDED_REQUEST_LIMIT = 5;

export const hasExceededRequestLimit = (code?: number) => code === EXCEEDED_REQUEST_LIMIT;
