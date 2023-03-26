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

export interface AppRoleEntityFilterInput {
  and?: InputMaybe<Array<AppRoleEntityFilterInput>>;
  concurrencyStamp?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  normalizedName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AppRoleEntityFilterInput>>;
  userRoles?: InputMaybe<ListFilterInputTypeOfAppUserRoleEntityFilterInput>;
}

export interface AppUserEntityFilterInput {
  accessFailedCount?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<AppUserEntityFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  concurrencyStamp?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  created?: InputMaybe<DateTimeOperationFilterInput>;
  dateOfBirth?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  emailConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  gender?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  images?: InputMaybe<ListFilterInputTypeOfImageEntityFilterInput>;
  interests?: InputMaybe<StringOperationFilterInput>;
  introduction?: InputMaybe<StringOperationFilterInput>;
  knownAs?: InputMaybe<StringOperationFilterInput>;
  lastActive?: InputMaybe<DateTimeOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  lockoutEnabled?: InputMaybe<BooleanOperationFilterInput>;
  lockoutEnd?: InputMaybe<DateTimeOperationFilterInput>;
  messagesRecevied?: InputMaybe<ListFilterInputTypeOfMessageEntityFilterInput>;
  messagesSent?: InputMaybe<ListFilterInputTypeOfMessageEntityFilterInput>;
  normalizedEmail?: InputMaybe<StringOperationFilterInput>;
  normalizedUserName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AppUserEntityFilterInput>>;
  passwordHash?: InputMaybe<StringOperationFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  phoneNumberConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  refreshToken?: InputMaybe<StringOperationFilterInput>;
  securityStamp?: InputMaybe<StringOperationFilterInput>;
  twoFactorEnabled?: InputMaybe<BooleanOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
  userRoles?: InputMaybe<ListFilterInputTypeOfAppUserRoleEntityFilterInput>;
}

export interface AppUserEntitySortInput {
  accessFailedCount?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  concurrencyStamp?: InputMaybe<SortEnumType>;
  country?: InputMaybe<SortEnumType>;
  created?: InputMaybe<SortEnumType>;
  dateOfBirth?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  emailConfirmed?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  gender?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  interests?: InputMaybe<SortEnumType>;
  introduction?: InputMaybe<SortEnumType>;
  knownAs?: InputMaybe<SortEnumType>;
  lastActive?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  lockoutEnabled?: InputMaybe<SortEnumType>;
  lockoutEnd?: InputMaybe<SortEnumType>;
  normalizedEmail?: InputMaybe<SortEnumType>;
  normalizedUserName?: InputMaybe<SortEnumType>;
  passwordHash?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  phoneNumberConfirmed?: InputMaybe<SortEnumType>;
  refreshToken?: InputMaybe<SortEnumType>;
  securityStamp?: InputMaybe<SortEnumType>;
  twoFactorEnabled?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
}

export interface AppUserRoleEntityFilterInput {
  and?: InputMaybe<Array<AppUserRoleEntityFilterInput>>;
  or?: InputMaybe<Array<AppUserRoleEntityFilterInput>>;
  role?: InputMaybe<AppRoleEntityFilterInput>;
  roleId?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<AppUserEntityFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
}

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export interface BooleanOperationFilterInput {
  eq?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
}

export interface DateTimeOperationFilterInput {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
}

export interface ImageEntityFilterInput {
  and?: InputMaybe<Array<ImageEntityFilterInput>>;
  appUser?: InputMaybe<AppUserEntityFilterInput>;
  appUserId?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  isMain?: InputMaybe<BooleanOperationFilterInput>;
  likes?: InputMaybe<ListFilterInputTypeOfImageLikeEntityFilterInput>;
  or?: InputMaybe<Array<ImageEntityFilterInput>>;
  url?: InputMaybe<StringOperationFilterInput>;
}

export interface ImageLikeEntityFilterInput {
  and?: InputMaybe<Array<ImageLikeEntityFilterInput>>;
  image?: InputMaybe<ImageEntityFilterInput>;
  likedImageId?: InputMaybe<StringOperationFilterInput>;
  likedUserId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ImageLikeEntityFilterInput>>;
}

export interface IntOperationFilterInput {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
}

export interface ListFilterInputTypeOfAppUserRoleEntityFilterInput {
  all?: InputMaybe<AppUserRoleEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AppUserRoleEntityFilterInput>;
  some?: InputMaybe<AppUserRoleEntityFilterInput>;
}

export interface ListFilterInputTypeOfImageEntityFilterInput {
  all?: InputMaybe<ImageEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ImageEntityFilterInput>;
  some?: InputMaybe<ImageEntityFilterInput>;
}

export interface ListFilterInputTypeOfImageLikeEntityFilterInput {
  all?: InputMaybe<ImageLikeEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ImageLikeEntityFilterInput>;
  some?: InputMaybe<ImageLikeEntityFilterInput>;
}

export interface ListFilterInputTypeOfMessageEntityFilterInput {
  all?: InputMaybe<MessageEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<MessageEntityFilterInput>;
  some?: InputMaybe<MessageEntityFilterInput>;
}

export interface MessageEntityFilterInput {
  and?: InputMaybe<Array<MessageEntityFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  dateRead?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  messageSent?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<MessageEntityFilterInput>>;
  recipient?: InputMaybe<AppUserEntityFilterInput>;
  recipientDeleted?: InputMaybe<BooleanOperationFilterInput>;
  recipientId?: InputMaybe<StringOperationFilterInput>;
  recipientUserName?: InputMaybe<StringOperationFilterInput>;
  sender?: InputMaybe<AppUserEntityFilterInput>;
  senderDeleted?: InputMaybe<BooleanOperationFilterInput>;
  senderId?: InputMaybe<StringOperationFilterInput>;
  senderUserName?: InputMaybe<StringOperationFilterInput>;
}

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export interface StringOperationFilterInput {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
}

export interface UserParamsInput {
  currentUsername?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
}

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
