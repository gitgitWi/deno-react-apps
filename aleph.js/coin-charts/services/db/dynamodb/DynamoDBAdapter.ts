import {
  DynamoDBClient,
  BatchWriteItemCommand,
  AttributeValue,
} from '@aws-sdk/client-dynamodb';

import { AWS } from '@/constants/mod.ts';
import { DBClientAdapter } from '@/services/db/DBClientAdapter.ts';

import { TableNames } from './constants.ts';

/**
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html
 * @see https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GettingStarted.html
 */
export class DynamoDBAdapter extends DBClientAdapter {
  private client!: DynamoDBClient;

  constructor() {
    super();
    this.connectDB();
  }

  connectDB() {
    this.client = new DynamoDBClient({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: AWS.accessKeyId,
        secretAccessKey: AWS.secretAccessKey,
      },
    });
  }

  insert<T>(insertItem: T): T {
    console.log(insertItem);
    return insertItem;
  }

  /**
   * @see https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/ServiceQuotas.html#limits-api
   * - batch는 한번에 25개까지만 가능
   */
  insertMany<T extends Record<string, AttributeValue>>(
    tableName: TableNames,
    items: T[],
  ) {
    try {
      const result = this.client.send(
        new BatchWriteItemCommand({
          RequestItems: {
            [tableName]: items.map((item) => ({
              PutRequest: {
                Item: item,
              },
            })),
          },
        }),
      );
      console.log('DynamoDBAdapter$$insertMany$$result\n', result);
      return result;
    } catch (error) {
      console.error(`DynamoDBAdapter$$insertMany$$ERROR\n`, error);
      return undefined;
    }
  }

  // getOne<T>(...args: any[]): T {
  //   return;
  // }

  // getMany<T>(...args: any[]): T[] {
  //   return;
  // }

  // update<T>(...args: any[]): T {
  //   return;
  // }

  // delete(...args: any[]): unknown {
  //   return;
  // }
}

export const dynamoDbAdapter = new DynamoDBAdapter();
