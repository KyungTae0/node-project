// import * as AWS from 'aws-sdk';

export default async function (): Promise<ConfigServiceType> {
  // let awsSecret: any;
  // let dbUser: string;
  // let dbPassword: string;

  // if (process.env.SECRET_ENV) {
  //   // AWS 환경일 경우 환경변수의 AWS KEY 사용
  //   awsSecret = JSON.parse(process.env.SECRET_ENV);
  //   dbUser = '---';
  //   dbPassword = awsSecret.EMP_DB_PROD_PASSWORD;
  // } else {
  //.ecs/task.json의 동작 환경이 아니라면(prod,stag이 아니라 dev라면)
  // 개인 PC 환경일 경우 AWS CLI 를 통한 SecretManager 에서 AWS KEY 사용
  // const awsOption: any = {
  //   region: 'ap-northeast-2',
  // };
  // const client = new AWS.SecretsManager(awsOption);
  // const secret = await client
  //   .getSecretValue({ SecretId: '---' })
  //   .promise();
  // awsSecret = JSON.parse(secret.SecretString);
  // dbUser = process.env.PLAYAPI_DB_USERNAME;
  // dbPassword = process.env.PLAYAPI_DB_PASSWORD;
  // }

  return {};
}

export class ConfigServiceType {}
