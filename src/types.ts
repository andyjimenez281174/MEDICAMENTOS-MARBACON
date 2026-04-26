/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum View {
  SPLASH = 'splash',
  AGENDA = 'agenda',
  ADD = 'add',
  ALERT = 'alert',
  PATIENTS = 'patients'
}

export interface Patient {
  id: string;
  name: string;
  avatar: string;
  color: string;
  relation: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dose: string;
  startTime: string;
  frequencyHours: number;
  durationDays: number;
  daysOfWeek: number[]; // 0 for Sunday, 1 for Monday, etc.
  isPermanent: boolean;
  type: 'pill' | 'injection' | 'syrup';
  alertTheme: 'fire' | 'party' | 'nature' | 'robot';
}

export const PATIENTS: Patient[] = [];

export const INITIAL_MEDS: Medication[] = [];
