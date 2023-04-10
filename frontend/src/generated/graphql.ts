export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
}

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { user?: { id?: string | null, userName?: string | null, firstName?: string | null, introduction?: string | null, interests?: string | null, city?: string | null, country?: string | null, lastName?: string | null, photoUrl?: string | null, dateOfBirth: any, age: number, images?: Array<{ url?: string | null, isMain: boolean } | null> | null } | null };

export type UpdateUserMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  dateOfBirth: Scalars['DateTime'];
  introduction?: InputMaybe<Scalars['String']>;
  interests?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { updateUser?: { firstName?: string | null, lastName?: string | null, dateOfBirth: any, introduction?: string | null, interests?: string | null, city?: string | null, country?: string | null } | null };

export type LoginMutationVariables = Exact<{
  userName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type LoginMutation = { login?: { accessToken?: string | null, refreshToken?: string | null } | null };

export type LogoutMutationVariables = Exact<{
  refreshToken?: InputMaybe<Scalars['String']>;
}>;


export type LogoutMutation = { logout?: { message?: string | null } | null };

export type RefreshMutationVariables = Exact<{
  refreshToken?: InputMaybe<Scalars['String']>;
}>;


export type RefreshMutation = { refresh?: { accessToken?: string | null, refreshToken?: string | null } | null };

export type RegistrationMutationVariables = Exact<{
  userName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type RegistrationMutation = { registration?: { message?: string | null } | null };
