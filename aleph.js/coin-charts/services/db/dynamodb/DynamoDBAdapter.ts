import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';

import { DBClientAdapter } from '@/services/db/DBClientAdapter.ts';
import { TableNames } from './constants.ts';

/**
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html
 */
export class DynamoDBAdapter extends DBClientAdapter {
  constructor() {
    super();
  }
}
