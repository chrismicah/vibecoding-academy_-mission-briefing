
export interface Step {
  id: number;
  path: string;
  title: string;
  description: string;
  command: string;
}

export enum MissionPath {
  HOME = '/',
  STEP1 = '/step-1-tools',
  STEP2 = '/step-2-install',
  STEP3 = '/step-3-ide',
  STEP4 = '/step-4-inspiration',
  STEP5 = '/step-5-architect',
  STEP6 = '/step-6-initialize',
  STEP7 = '/step-7-build',
  STEP8 = '/step-8-git',
  STEP9 = '/step-9-deploy',
  STEP10 = '/step-10-mastery',
  STEP11 = '/step-11-refinement'
}
