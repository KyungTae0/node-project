import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/**
 * @alias 문자열의 첫 글자를 대문자로 변환
 * @param {string} str - 입력 문자열
 * @returns {string}
 */
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @alias tsconfig.json 경로
 */
const getTsConfigPath = () => path.join(process.cwd(), 'tsconfig.json');

/**
 * @alias tsconfig.json의 별칭 업데이트
 */
const updateTsConfig = (dddName: string) => {
  const tsconfigPath = getTsConfigPath();
  if (!fs.existsSync(tsconfigPath)) {
    throw Error('tsconfig.json 파일을 찾을 수 없습니다.');
  }

  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

  const aliasKey = `@${dddName}/*`;
  const aliasValue = `domains/${dddName}/*`;

  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};

  if (tsconfig.compilerOptions.paths[aliasKey]) {
    Logger.warn(`tsconfig.json에 이미 경로 별칭이 존재합니다: ${aliasKey}`);
    return;
  }

  tsconfig.compilerOptions.paths[aliasKey] = [aliasValue];
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  Logger.log(`tsconfig.json에 경로 별칭 추가: ${aliasKey} -> ${aliasValue}`);
};

/**
 * @alias DDD 구조 생성 함수
 */
const createDDDStructure = (dddName: string, includeEntity: boolean) => {
  const baseDir = path.join(process.cwd(), 'src', 'domains', dddName);
  try {
    // domain 이름이 없을 경우 에러 처리
    if (!dddName) {
      // 원치 않는 domain의 삭제가 일어날 수 있으므로 throw로 처리하지 않음
      Logger.error(
        `Domain 명을 입력해주세요. ex) npm run nest:ddd domain-name`,
      );
      process.exit(1);
    }

    const folders = {
      application: [],
      domain: ['entities', 'repositories'],
      infrastructure: ['persistence'],
      presentation: ['dtos', 'external-dtos'],
      shared: [],
    };

    // 루트 폴더 생성
    if (fs.existsSync(baseDir)) {
      // 원치 않는 domain의 삭제가 일어날 수 있으므로 throw로 처리하지 않음
      Logger.error(`[${baseDir}] 폴더가 이미 존재합니다.`);
      process.exit(1);
    }
    fs.mkdirSync(baseDir, { recursive: true });

    // 서브 디렉토리 및 파일 생성
    for (const [folder, subfolders] of Object.entries(folders)) {
      const folderPath = path.join(baseDir, folder);
      fs.mkdirSync(folderPath);

      subfolders.forEach((subfolder) => {
        const subfolderPath = path.join(folderPath, subfolder);
        fs.mkdirSync(subfolderPath);
      });
    }

    // presentation/dtos 파일 생성
    const dtosPath = path.join(baseDir, 'presentation', 'dtos');
    fs.writeFileSync(
      path.join(dtosPath, `${dddName}-input.dto.ts`),
      `export class ${capitalize(dddName)}Input {}`,
    );
    fs.writeFileSync(
      path.join(dtosPath, `${dddName}-output.dto.ts`),
      `import { CoreOutput } from '@common/dtos/core.dto';\nexport class ${capitalize(dddName)}Output extends CoreOutput {}`,
    );

    // presentation/external-dtos 파일 생성
    const externalDtosPath = path.join(
      baseDir,
      'presentation',
      'external-dtos',
    );
    fs.writeFileSync(
      path.join(externalDtosPath, `${dddName}-response.dto.ts`),
      `export class ${capitalize(dddName)}Response {}`,
    );

    // presentation/controller 파일 생성
    const controllerFilePath = path.join(
      baseDir,
      'presentation',
      `${dddName}.controller.ts`,
    );
    fs.writeFileSync(
      controllerFilePath,
      `import { Controller, Get } from '@nestjs/common';\nimport { ${capitalize(
        dddName,
      )}Service } from '@${dddName}/application/${dddName}.service';\n\n@Controller('${dddName.toLowerCase()}')\nexport class ${capitalize(
        dddName,
      )}Controller {\n  constructor(private readonly ${dddName}Service: ${capitalize(
        dddName,
      )}Service) {}\n\n  @Get()\n  async test() {\n    return await this.${dddName}Service.test();\n  }\n}`,
    );

    // application/service 파일 생성
    const serviceFilePath = path.join(
      baseDir,
      'application',
      `${dddName}.service.ts`,
    );
    fs.writeFileSync(
      serviceFilePath,
      `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ${capitalize(
        dddName,
      )}Service {\n  async test() {\n    return '${dddName.toLowerCase()}';\n  }\n}`,
    );

    // entitiy 생성 여부에 따라 파일 생성
    if (includeEntity) {
      // domain/repositories 파일 생성
      const repositoryFilePath = path.join(
        baseDir,
        'domain',
        'repositories',
        `${dddName}.repository.ts`,
      );
      fs.writeFileSync(
        repositoryFilePath,
        `import { BaseRepository } from '@common/repositories/base.repository';\nimport { ${capitalize(
          dddName,
        )}Entity } from '@${dddName}/domain/entities/${dddName}.entity';\n\nexport interface ${capitalize(
          dddName,
        )}Repository extends BaseRepository<${capitalize(dddName)}Entity> {}`,
      );

      // domain/entities 파일 생성
      const entityFilePath = path.join(
        baseDir,
        'domain',
        'entities',
        `${dddName}.entity.ts`,
      );
      fs.writeFileSync(
        entityFilePath,
        `export class ${capitalize(dddName)}Entity {}`,
      );

      // infrastructure/persistence 파일 생성
      const infraRepoFilePath = path.join(
        baseDir,
        'infrastructure',
        'persistence',
        `${dddName}.repository.impl.ts`,
      );
      fs.writeFileSync(
        infraRepoFilePath,
        `import { Injectable } from '@nestjs/common';
        import { Repository } from 'typeorm';
        import { ${capitalize(dddName)}Entity } from '@${dddName}/domain/entities/${dddName}.entity';
        import { ${capitalize(dddName)}Repository } from '@${dddName}/domain/repositories/${dddName}.repository';
        
        @Injectable()
        export class ${capitalize(dddName)}RepositoryImpl implements ${capitalize(dddName)}Repository { }`,
      );
    }

    // module 파일 생성
    const moduleFilePath = path.join(baseDir, `${dddName}.module.ts`);
    let moduleContent = `
  import { Module } from '@nestjs/common';
  import { ${capitalize(dddName)}Service } from './application/${dddName}.service';
  import { ${capitalize(dddName)}Controller } from './presentation/${dddName}.controller';`;

    // entitiy 생성 여부에 따라 entity import 추가
    includeEntity
      ? (moduleContent += `
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ${capitalize(dddName)}Entity } from '@${dddName}/domain/entities/${dddName}.entity';`)
      : '';

    moduleContent += `
  @Module({`;

    // entitiy 생성 여부에 따라 entity import 추가
    moduleContent += includeEntity
      ? `
    imports: [TypeOrmModule.forFeature([${capitalize(dddName)}Entity])],`
      : 'imports: [ ],';

    moduleContent += `
    controllers: [${capitalize(dddName)}Controller],
    providers: [${capitalize(dddName)}Service],
  })
  export class ${capitalize(dddName)}Module {}
  `.trim();
    fs.writeFileSync(moduleFilePath, moduleContent);

    Logger.log(`[${baseDir}] domain 폴더 생성 완료`);

    // entitiy 생성 여부에 따라 추가 orm-config 설정
    if (includeEntity) {
      updateORMConfig(dddName);
    }

    // app.module.ts에 자동 추가
    // const relativeModulePath = `@${dddName}/${dddName}.module`;
    updateAppModule(dddName);
    // tsconfig.json에 경로 별칭 추가
    updateTsConfig(dddName);

    Logger.log(`${dddName} 도메인이 생성 완료되었습니다.`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    Logger.error(`domain 추가 실패: ${errorMessage}`);

    // domain 생성 중 에러 발생 시 폴더 채로 삭제
    if (fs.existsSync(baseDir)) {
      fs.rmdirSync(baseDir, { recursive: true });
    }
    process.exit(1);
  }
};

/**
 * @alias app.module 수정
 */
const updateAppModule = (dddName: string) => {
  const moduleName = `${capitalize(dddName)}Module`;
  const appModulePath = path.join(process.cwd(), 'src', 'app.module.ts');

  if (!fs.existsSync(appModulePath)) {
    throw new Error('app.module.ts 파일을 찾을 수 없습니다.');
  }

  let content = fs.readFileSync(appModulePath, 'utf-8');
  const importStatement = `import { ${moduleName} } from '@${dddName}/${dddName}.module';\n`;

  // 이미 import 했는지 확인
  if (content.includes(importStatement)) {
    Logger.log(`${moduleName} 모듈은 이미 import 되어 있습니다.`);
    return;
  }

  // import 구문 가장 위에 추가
  content = importStatement + content;

  // @Module({ imports: [...] }) 배열 수정
  const importsArrayRegex = /imports\s*:\s*\[(.*?)\]/s;
  const match = importsArrayRegex.exec(content);

  if (!match) {
    throw new Error('app.module.ts 파일에서 imports 배열을 찾을 수 없습니다.');
  }

  const existingImports = match[1].trim();

  const updatedImports = existingImports
    ? `${existingImports},\n    ${moduleName}` // 새로운 모듈을 추가할 때 적절한 줄바꿈을 추가
    : `${moduleName}`;

  const updatedContent = content.replace(
    importsArrayRegex,
    `imports: [\n    ${updatedImports}\n  ]`, // 올바른 배열 포맷에 맞게 수정
  );

  fs.writeFileSync(appModulePath, updatedContent);
  Logger.log('app.module.ts 업데이트 완료');
};

/**
 * @alias wakeup-orm-config에 Entity 추가
 */
const updateORMConfig = (dddName: string) => {
  const entityToAdd = `${capitalize(dddName)}Entity`;
  const configFilePath = path.join(
    process.cwd(),
    'src',
    'config',
    'typeorm.config.ts',
  );

  // wakeup-orm-config.ts 파일 읽기
  let fileContent: string;
  try {
    fileContent = fs.readFileSync(configFilePath, 'utf8');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    throw Error(`[${configFilePath}] 파일 읽기 실패: ${errorMessage}`);
  }

  // 정규식을 이용하여 entities 배열 마지막에 추가
  const entitiesArrayRegex = /(entities\s*:\s*\[)([\s\S]*?)(\])/m;
  const match = fileContent.match(entitiesArrayRegex);
  if (match) {
    const [fullMatch, startPart, insidePart, endPart] = match;

    if (!insidePart.includes(entityToAdd)) {
      // import 구문 추가
      const preImport = `import { ${capitalize(dddName)}Entity } from '@${dddName}/domain/entities/${dddName}.entity';\r\n`;

      // entities 배열 내부 업데이트
      const updatedEntities = `${startPart}\n    ${insidePart.trim()}${insidePart.trim() ? ',' : ''}\n    ${entityToAdd}\n${endPart}`;

      // 최종 파일 컨텐츠 갱신
      fileContent = `${preImport}${fileContent.replace(fullMatch, updatedEntities)}`;

      fs.writeFileSync(configFilePath, fileContent);
    } else {
      Logger.log(`${entityToAdd} Entity는 이미 추가되었습니다.`);
    }
  } else {
    throw new Error('[typeorm.config.ts] entities 배열을 찾을 수 없습니다.');
  }
};

// 명령 실행
const dddName = process.argv[2];
// 'no-entity'가 있으면 엔티티 생성 안 함
const includeEntity = !(
  process.argv.length >= 4 && process.argv[3].includes('no-entity')
);
createDDDStructure(dddName, includeEntity);
