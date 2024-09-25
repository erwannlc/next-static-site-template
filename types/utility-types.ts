import { CSSProperties } from "react";
import { ContentData } from "./content-types";

type DateString = string;

// Removes 'readonly' attributes from a Type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

// get async function return type
// type Return = Awaited<ReturnType<typeof asyncFunc>>

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
// // usage 
type OriginalType = {
  id: number;
  name: string;
} & {
  email: string;
};
// Without Prettify
type ExampleWithoutPrettify = OriginalType;
// The type might display as: { id: number; name: string; } & { email: string; }

// With Prettify
type ExampleWithPrettify = Prettify<OriginalType>;
// The type would display as: { id: number; name: string; email: string; }

type Modify<T, R> = Omit<T, keyof R> & R

type MakePropsRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
type MakePropsOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
// usage :
// type BlogArticle = MakePropsRequired<ContentData, "teaser" | "date" | "comments">

type PrettyMakePropsRequired<T, K extends keyof T> = Prettify<MakePropsRequired<T, K>>
type PrettyMakePropsOptional<T, K extends keyof T> = Prettify<MakePropsOptional<T, K>>

type RequiredOnly<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
type PrettyRequiredOnly<T> = Prettify<RequiredOnly<T>>

type MergeTypes<T1, T2> = {
  [P in keyof T1 | keyof T2]:
  | (P extends keyof T1 & keyof T2 ? T1[P] : P extends keyof T1 ? T1[P] | undefined : never)
  | (P extends keyof T2 & keyof T1 ? T2[P] : P extends keyof T2 ? T2[P] | undefined : never)
}

// Utility type to conditionally extend each key with className and styles, except for 'id'
type ExtendWithStyle<T> = {
  [K in keyof T]: K extends "id" ? T[K] : T[K] & { className: string; styles: CSSProperties };
};

// Define Elements type
type Elements = ExtendWithStyle<ContentData>;

type GenericFunction = (...args: any[]) => any
type GenericAsyncFunction = (...args: any[]) => Promise<any>
// <T>(...args: T[]) => any // <T>(arg: T) => any
type GenericFunctions = { [key: string]: GenericFunction }
// Define a generic type for an object with samed typed functions
type GenericFunctionObject<T, R> = {
  [key: string]: (arg: T) => R;
};

type UnionFromTuple<T extends readonly any[]> = T[number];

type ArrayOfObjectsFromTuple<
  T extends readonly any[],
  NewKey extends string,  // = recosId Default key name if not provided
  NewKeyValueType         // = string[] Default value type if not provided
> = {
  [K in keyof T]: {
    readonly id: T[K];
  } & { [P in NewKey]: NewKeyValueType }; // Dynamically adding new key and value type
} & { length: T["length"] }; // Ensuring length is correct


export type {
  Modify,
  Prettify,
  CreateMutable,
  DateString,
  MergeTypes,
  MakePropsRequired,
  MakePropsOptional,
  PrettyMakePropsRequired,
  PrettyMakePropsOptional,
  RequiredOnly,
  PrettyRequiredOnly,
  GenericFunction,
  GenericAsyncFunction,
  GenericFunctions,
  GenericFunctionObject,
  ArrayOfObjectsFromTuple,
  UnionFromTuple
};