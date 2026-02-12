
export interface Step {
  id: number;
  path: string;
  title: string;
  description: string;
  command: string;
}

export enum MissionPath {
  HOME = '/',
  STEP1 = '/step-1-planning',
  STEP2 = '/step-2-content',
  STEP3 = '/step-3-design',
  STEP4 = '/step-4-build',
  STEP5 = '/step-5-advanced',
  STEP6 = '/step-6-host',
  STEP7 = '/step-7-optimize',
  STEP8 = '/step-8-iterate'
}
