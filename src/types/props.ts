import {
  UseFormMethods,
  FieldValues,
  FieldValuesFromControl,
  FieldName,
  ValidationRules,
  Control,
  OnChangeEvent,
} from './form';
import { Assign } from './utils';
import * as React from 'react';

export type FormProviderProps<
  TFieldValues extends FieldValues = FieldValues
> = {
  children: React.ReactNode;
} & UseFormMethods<TFieldValues>;

type AsProps<TAs> = TAs extends undefined
  ? {}
  : TAs extends React.ReactElement
  ? Record<string, any>
  : TAs extends React.ComponentType<infer P>
  ? P
  : TAs extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[TAs]
  : never;

export type ControllerProps<
  TAs extends
    | React.ReactElement
    | React.ComponentType<any>
    | 'input'
    | 'select'
    | 'textarea',
  TFieldName extends FieldName<FieldValuesFromControl<TControl>>,
  TControl extends Control = Control
> = Assign<
  {
    name: TFieldName;
    as?: TAs;
    rules?: ValidationRules;
    onFocus?: () => void;
    defaultValue?: unknown;
    control?: TControl;
    render?: (data: {
      onChange: (
        ...event: [
          OnChangeEvent<FieldValuesFromControl<TControl>[TFieldName]>,
          ...unknown[]
        ]
      ) => void;
      onBlur: () => void;
      value: FieldValuesFromControl<TControl>[TFieldName];
    }) => React.ReactElement;
  },
  AsProps<TAs>
>;
