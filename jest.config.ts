import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
  preset: 'jest-expo',
  maxWorkers: 3,
  modulePathIgnorePatterns: ['crons'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    ...tsJestTransformCfg,
    '^.+\\.jsx?$': 'babel-jest',
  },
};

export default config;
