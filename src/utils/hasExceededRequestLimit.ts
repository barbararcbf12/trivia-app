// 5 is the code for rate limit according to the API docs https://opentdb.com/api_config.php
export const hasExceededRequestLimit = (code?: number) => code === 5;
