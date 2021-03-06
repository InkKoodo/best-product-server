import * as ddb from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event) {
  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const result = await ddb.call('get', params);

    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: 'Item not found.' });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
