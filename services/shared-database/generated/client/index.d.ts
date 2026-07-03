
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DonVi
 * 
 */
export type DonVi = $Result.DefaultSelection<Prisma.$DonViPayload>
/**
 * Model NguoiDung
 * 
 */
export type NguoiDung = $Result.DefaultSelection<Prisma.$NguoiDungPayload>
/**
 * Model QuyChe
 * 
 */
export type QuyChe = $Result.DefaultSelection<Prisma.$QuyChePayload>
/**
 * Model TieuChi
 * 
 */
export type TieuChi = $Result.DefaultSelection<Prisma.$TieuChiPayload>
/**
 * Model HoatDong
 * 
 */
export type HoatDong = $Result.DefaultSelection<Prisma.$HoatDongPayload>
/**
 * Model DiemDanh
 * 
 */
export type DiemDanh = $Result.DefaultSelection<Prisma.$DiemDanhPayload>
/**
 * Model MinhChung
 * 
 */
export type MinhChung = $Result.DefaultSelection<Prisma.$MinhChungPayload>
/**
 * Model HoSo
 * 
 */
export type HoSo = $Result.DefaultSelection<Prisma.$HoSoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CapDo: {
  TW: 'TW',
  TINH: 'TINH',
  TRUONG: 'TRUONG',
  KHOA_CLB: 'KHOA_CLB'
};

export type CapDo = (typeof CapDo)[keyof typeof CapDo]


export const VaiTro: {
  SINH_VIEN: 'SINH_VIEN',
  CB_TRUONG: 'CB_TRUONG',
  CB_TINH: 'CB_TINH',
  CB_TW: 'CB_TW',
  LCH_CLB: 'LCH_CLB',
  ADMIN: 'ADMIN'
};

export type VaiTro = (typeof VaiTro)[keyof typeof VaiTro]


export const TrangThaiTK: {
  ACTIVE: 'ACTIVE',
  LOCKED: 'LOCKED'
};

export type TrangThaiTK = (typeof TrangThaiTK)[keyof typeof TrangThaiTK]


export const TrangThaiHoSo: {
  DANG_TAO: 'DANG_TAO',
  DA_NOP: 'DA_NOP',
  CHO_DUYET_TRUONG: 'CHO_DUYET_TRUONG',
  DAT_TRUONG: 'DAT_TRUONG',
  CHO_DUYET_TINH: 'CHO_DUYET_TINH',
  DAT_TINH: 'DAT_TINH',
  CHO_DUYET_TW: 'CHO_DUYET_TW',
  DAT_SV5T: 'DAT_SV5T',
  BI_TU_CHOI: 'BI_TU_CHOI'
};

export type TrangThaiHoSo = (typeof TrangThaiHoSo)[keyof typeof TrangThaiHoSo]

}

export type CapDo = $Enums.CapDo

export const CapDo: typeof $Enums.CapDo

export type VaiTro = $Enums.VaiTro

export const VaiTro: typeof $Enums.VaiTro

export type TrangThaiTK = $Enums.TrangThaiTK

export const TrangThaiTK: typeof $Enums.TrangThaiTK

export type TrangThaiHoSo = $Enums.TrangThaiHoSo

export const TrangThaiHoSo: typeof $Enums.TrangThaiHoSo

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DonVis
 * const donVis = await prisma.donVi.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more DonVis
   * const donVis = await prisma.donVi.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.donVi`: Exposes CRUD operations for the **DonVi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DonVis
    * const donVis = await prisma.donVi.findMany()
    * ```
    */
  get donVi(): Prisma.DonViDelegate<ExtArgs>;

  /**
   * `prisma.nguoiDung`: Exposes CRUD operations for the **NguoiDung** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NguoiDungs
    * const nguoiDungs = await prisma.nguoiDung.findMany()
    * ```
    */
  get nguoiDung(): Prisma.NguoiDungDelegate<ExtArgs>;

  /**
   * `prisma.quyChe`: Exposes CRUD operations for the **QuyChe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuyChes
    * const quyChes = await prisma.quyChe.findMany()
    * ```
    */
  get quyChe(): Prisma.QuyCheDelegate<ExtArgs>;

  /**
   * `prisma.tieuChi`: Exposes CRUD operations for the **TieuChi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TieuChis
    * const tieuChis = await prisma.tieuChi.findMany()
    * ```
    */
  get tieuChi(): Prisma.TieuChiDelegate<ExtArgs>;

  /**
   * `prisma.hoatDong`: Exposes CRUD operations for the **HoatDong** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HoatDongs
    * const hoatDongs = await prisma.hoatDong.findMany()
    * ```
    */
  get hoatDong(): Prisma.HoatDongDelegate<ExtArgs>;

  /**
   * `prisma.diemDanh`: Exposes CRUD operations for the **DiemDanh** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiemDanhs
    * const diemDanhs = await prisma.diemDanh.findMany()
    * ```
    */
  get diemDanh(): Prisma.DiemDanhDelegate<ExtArgs>;

  /**
   * `prisma.minhChung`: Exposes CRUD operations for the **MinhChung** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MinhChungs
    * const minhChungs = await prisma.minhChung.findMany()
    * ```
    */
  get minhChung(): Prisma.MinhChungDelegate<ExtArgs>;

  /**
   * `prisma.hoSo`: Exposes CRUD operations for the **HoSo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HoSos
    * const hoSos = await prisma.hoSo.findMany()
    * ```
    */
  get hoSo(): Prisma.HoSoDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    DonVi: 'DonVi',
    NguoiDung: 'NguoiDung',
    QuyChe: 'QuyChe',
    TieuChi: 'TieuChi',
    HoatDong: 'HoatDong',
    DiemDanh: 'DiemDanh',
    MinhChung: 'MinhChung',
    HoSo: 'HoSo'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "donVi" | "nguoiDung" | "quyChe" | "tieuChi" | "hoatDong" | "diemDanh" | "minhChung" | "hoSo"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DonVi: {
        payload: Prisma.$DonViPayload<ExtArgs>
        fields: Prisma.DonViFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DonViFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DonViFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload>
          }
          findFirst: {
            args: Prisma.DonViFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DonViFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload>
          }
          findMany: {
            args: Prisma.DonViFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload>[]
          }
          create: {
            args: Prisma.DonViCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload>
          }
          createMany: {
            args: Prisma.DonViCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DonViCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload>[]
          }
          delete: {
            args: Prisma.DonViDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload>
          }
          update: {
            args: Prisma.DonViUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload>
          }
          deleteMany: {
            args: Prisma.DonViDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DonViUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DonViUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonViPayload>
          }
          aggregate: {
            args: Prisma.DonViAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDonVi>
          }
          groupBy: {
            args: Prisma.DonViGroupByArgs<ExtArgs>
            result: $Utils.Optional<DonViGroupByOutputType>[]
          }
          count: {
            args: Prisma.DonViCountArgs<ExtArgs>
            result: $Utils.Optional<DonViCountAggregateOutputType> | number
          }
        }
      }
      NguoiDung: {
        payload: Prisma.$NguoiDungPayload<ExtArgs>
        fields: Prisma.NguoiDungFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NguoiDungFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NguoiDungFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload>
          }
          findFirst: {
            args: Prisma.NguoiDungFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NguoiDungFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload>
          }
          findMany: {
            args: Prisma.NguoiDungFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload>[]
          }
          create: {
            args: Prisma.NguoiDungCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload>
          }
          createMany: {
            args: Prisma.NguoiDungCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NguoiDungCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload>[]
          }
          delete: {
            args: Prisma.NguoiDungDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload>
          }
          update: {
            args: Prisma.NguoiDungUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload>
          }
          deleteMany: {
            args: Prisma.NguoiDungDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NguoiDungUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NguoiDungUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NguoiDungPayload>
          }
          aggregate: {
            args: Prisma.NguoiDungAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNguoiDung>
          }
          groupBy: {
            args: Prisma.NguoiDungGroupByArgs<ExtArgs>
            result: $Utils.Optional<NguoiDungGroupByOutputType>[]
          }
          count: {
            args: Prisma.NguoiDungCountArgs<ExtArgs>
            result: $Utils.Optional<NguoiDungCountAggregateOutputType> | number
          }
        }
      }
      QuyChe: {
        payload: Prisma.$QuyChePayload<ExtArgs>
        fields: Prisma.QuyCheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuyCheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuyCheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload>
          }
          findFirst: {
            args: Prisma.QuyCheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuyCheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload>
          }
          findMany: {
            args: Prisma.QuyCheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload>[]
          }
          create: {
            args: Prisma.QuyCheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload>
          }
          createMany: {
            args: Prisma.QuyCheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuyCheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload>[]
          }
          delete: {
            args: Prisma.QuyCheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload>
          }
          update: {
            args: Prisma.QuyCheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload>
          }
          deleteMany: {
            args: Prisma.QuyCheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuyCheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuyCheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuyChePayload>
          }
          aggregate: {
            args: Prisma.QuyCheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuyChe>
          }
          groupBy: {
            args: Prisma.QuyCheGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuyCheGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuyCheCountArgs<ExtArgs>
            result: $Utils.Optional<QuyCheCountAggregateOutputType> | number
          }
        }
      }
      TieuChi: {
        payload: Prisma.$TieuChiPayload<ExtArgs>
        fields: Prisma.TieuChiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TieuChiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TieuChiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload>
          }
          findFirst: {
            args: Prisma.TieuChiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TieuChiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload>
          }
          findMany: {
            args: Prisma.TieuChiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload>[]
          }
          create: {
            args: Prisma.TieuChiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload>
          }
          createMany: {
            args: Prisma.TieuChiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TieuChiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload>[]
          }
          delete: {
            args: Prisma.TieuChiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload>
          }
          update: {
            args: Prisma.TieuChiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload>
          }
          deleteMany: {
            args: Prisma.TieuChiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TieuChiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TieuChiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TieuChiPayload>
          }
          aggregate: {
            args: Prisma.TieuChiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTieuChi>
          }
          groupBy: {
            args: Prisma.TieuChiGroupByArgs<ExtArgs>
            result: $Utils.Optional<TieuChiGroupByOutputType>[]
          }
          count: {
            args: Prisma.TieuChiCountArgs<ExtArgs>
            result: $Utils.Optional<TieuChiCountAggregateOutputType> | number
          }
        }
      }
      HoatDong: {
        payload: Prisma.$HoatDongPayload<ExtArgs>
        fields: Prisma.HoatDongFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoatDongFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoatDongFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload>
          }
          findFirst: {
            args: Prisma.HoatDongFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoatDongFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload>
          }
          findMany: {
            args: Prisma.HoatDongFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload>[]
          }
          create: {
            args: Prisma.HoatDongCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload>
          }
          createMany: {
            args: Prisma.HoatDongCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HoatDongCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload>[]
          }
          delete: {
            args: Prisma.HoatDongDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload>
          }
          update: {
            args: Prisma.HoatDongUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload>
          }
          deleteMany: {
            args: Prisma.HoatDongDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoatDongUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HoatDongUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoatDongPayload>
          }
          aggregate: {
            args: Prisma.HoatDongAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHoatDong>
          }
          groupBy: {
            args: Prisma.HoatDongGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoatDongGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoatDongCountArgs<ExtArgs>
            result: $Utils.Optional<HoatDongCountAggregateOutputType> | number
          }
        }
      }
      DiemDanh: {
        payload: Prisma.$DiemDanhPayload<ExtArgs>
        fields: Prisma.DiemDanhFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiemDanhFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiemDanhFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload>
          }
          findFirst: {
            args: Prisma.DiemDanhFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiemDanhFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload>
          }
          findMany: {
            args: Prisma.DiemDanhFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload>[]
          }
          create: {
            args: Prisma.DiemDanhCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload>
          }
          createMany: {
            args: Prisma.DiemDanhCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiemDanhCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload>[]
          }
          delete: {
            args: Prisma.DiemDanhDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload>
          }
          update: {
            args: Prisma.DiemDanhUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload>
          }
          deleteMany: {
            args: Prisma.DiemDanhDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiemDanhUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DiemDanhUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiemDanhPayload>
          }
          aggregate: {
            args: Prisma.DiemDanhAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiemDanh>
          }
          groupBy: {
            args: Prisma.DiemDanhGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiemDanhGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiemDanhCountArgs<ExtArgs>
            result: $Utils.Optional<DiemDanhCountAggregateOutputType> | number
          }
        }
      }
      MinhChung: {
        payload: Prisma.$MinhChungPayload<ExtArgs>
        fields: Prisma.MinhChungFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MinhChungFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MinhChungFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload>
          }
          findFirst: {
            args: Prisma.MinhChungFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MinhChungFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload>
          }
          findMany: {
            args: Prisma.MinhChungFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload>[]
          }
          create: {
            args: Prisma.MinhChungCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload>
          }
          createMany: {
            args: Prisma.MinhChungCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MinhChungCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload>[]
          }
          delete: {
            args: Prisma.MinhChungDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload>
          }
          update: {
            args: Prisma.MinhChungUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload>
          }
          deleteMany: {
            args: Prisma.MinhChungDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MinhChungUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MinhChungUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinhChungPayload>
          }
          aggregate: {
            args: Prisma.MinhChungAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMinhChung>
          }
          groupBy: {
            args: Prisma.MinhChungGroupByArgs<ExtArgs>
            result: $Utils.Optional<MinhChungGroupByOutputType>[]
          }
          count: {
            args: Prisma.MinhChungCountArgs<ExtArgs>
            result: $Utils.Optional<MinhChungCountAggregateOutputType> | number
          }
        }
      }
      HoSo: {
        payload: Prisma.$HoSoPayload<ExtArgs>
        fields: Prisma.HoSoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoSoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoSoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload>
          }
          findFirst: {
            args: Prisma.HoSoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoSoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload>
          }
          findMany: {
            args: Prisma.HoSoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload>[]
          }
          create: {
            args: Prisma.HoSoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload>
          }
          createMany: {
            args: Prisma.HoSoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HoSoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload>[]
          }
          delete: {
            args: Prisma.HoSoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload>
          }
          update: {
            args: Prisma.HoSoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload>
          }
          deleteMany: {
            args: Prisma.HoSoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoSoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HoSoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoSoPayload>
          }
          aggregate: {
            args: Prisma.HoSoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHoSo>
          }
          groupBy: {
            args: Prisma.HoSoGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoSoGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoSoCountArgs<ExtArgs>
            result: $Utils.Optional<HoSoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DonViCountOutputType
   */

  export type DonViCountOutputType = {
    children: number
    nguoi_dungs: number
    quy_ches: number
    hoat_dongs: number
  }

  export type DonViCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | DonViCountOutputTypeCountChildrenArgs
    nguoi_dungs?: boolean | DonViCountOutputTypeCountNguoi_dungsArgs
    quy_ches?: boolean | DonViCountOutputTypeCountQuy_chesArgs
    hoat_dongs?: boolean | DonViCountOutputTypeCountHoat_dongsArgs
  }

  // Custom InputTypes
  /**
   * DonViCountOutputType without action
   */
  export type DonViCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonViCountOutputType
     */
    select?: DonViCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DonViCountOutputType without action
   */
  export type DonViCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonViWhereInput
  }

  /**
   * DonViCountOutputType without action
   */
  export type DonViCountOutputTypeCountNguoi_dungsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NguoiDungWhereInput
  }

  /**
   * DonViCountOutputType without action
   */
  export type DonViCountOutputTypeCountQuy_chesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuyCheWhereInput
  }

  /**
   * DonViCountOutputType without action
   */
  export type DonViCountOutputTypeCountHoat_dongsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoatDongWhereInput
  }


  /**
   * Count Type NguoiDungCountOutputType
   */

  export type NguoiDungCountOutputType = {
    diem_danhs: number
    minh_chungs: number
    ho_sos: number
    hoat_dong_duyets: number
  }

  export type NguoiDungCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    diem_danhs?: boolean | NguoiDungCountOutputTypeCountDiem_danhsArgs
    minh_chungs?: boolean | NguoiDungCountOutputTypeCountMinh_chungsArgs
    ho_sos?: boolean | NguoiDungCountOutputTypeCountHo_sosArgs
    hoat_dong_duyets?: boolean | NguoiDungCountOutputTypeCountHoat_dong_duyetsArgs
  }

  // Custom InputTypes
  /**
   * NguoiDungCountOutputType without action
   */
  export type NguoiDungCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDungCountOutputType
     */
    select?: NguoiDungCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NguoiDungCountOutputType without action
   */
  export type NguoiDungCountOutputTypeCountDiem_danhsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiemDanhWhereInput
  }

  /**
   * NguoiDungCountOutputType without action
   */
  export type NguoiDungCountOutputTypeCountMinh_chungsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MinhChungWhereInput
  }

  /**
   * NguoiDungCountOutputType without action
   */
  export type NguoiDungCountOutputTypeCountHo_sosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoSoWhereInput
  }

  /**
   * NguoiDungCountOutputType without action
   */
  export type NguoiDungCountOutputTypeCountHoat_dong_duyetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoatDongWhereInput
  }


  /**
   * Count Type QuyCheCountOutputType
   */

  export type QuyCheCountOutputType = {
    tieu_chis: number
    ho_sos: number
  }

  export type QuyCheCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tieu_chis?: boolean | QuyCheCountOutputTypeCountTieu_chisArgs
    ho_sos?: boolean | QuyCheCountOutputTypeCountHo_sosArgs
  }

  // Custom InputTypes
  /**
   * QuyCheCountOutputType without action
   */
  export type QuyCheCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyCheCountOutputType
     */
    select?: QuyCheCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuyCheCountOutputType without action
   */
  export type QuyCheCountOutputTypeCountTieu_chisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TieuChiWhereInput
  }

  /**
   * QuyCheCountOutputType without action
   */
  export type QuyCheCountOutputTypeCountHo_sosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoSoWhereInput
  }


  /**
   * Count Type TieuChiCountOutputType
   */

  export type TieuChiCountOutputType = {
    hoat_dongs: number
    minh_chungs: number
  }

  export type TieuChiCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hoat_dongs?: boolean | TieuChiCountOutputTypeCountHoat_dongsArgs
    minh_chungs?: boolean | TieuChiCountOutputTypeCountMinh_chungsArgs
  }

  // Custom InputTypes
  /**
   * TieuChiCountOutputType without action
   */
  export type TieuChiCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChiCountOutputType
     */
    select?: TieuChiCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TieuChiCountOutputType without action
   */
  export type TieuChiCountOutputTypeCountHoat_dongsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoatDongWhereInput
  }

  /**
   * TieuChiCountOutputType without action
   */
  export type TieuChiCountOutputTypeCountMinh_chungsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MinhChungWhereInput
  }


  /**
   * Count Type HoatDongCountOutputType
   */

  export type HoatDongCountOutputType = {
    tieu_chis: number
    diem_danhs: number
  }

  export type HoatDongCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tieu_chis?: boolean | HoatDongCountOutputTypeCountTieu_chisArgs
    diem_danhs?: boolean | HoatDongCountOutputTypeCountDiem_danhsArgs
  }

  // Custom InputTypes
  /**
   * HoatDongCountOutputType without action
   */
  export type HoatDongCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDongCountOutputType
     */
    select?: HoatDongCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HoatDongCountOutputType without action
   */
  export type HoatDongCountOutputTypeCountTieu_chisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TieuChiWhereInput
  }

  /**
   * HoatDongCountOutputType without action
   */
  export type HoatDongCountOutputTypeCountDiem_danhsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiemDanhWhereInput
  }


  /**
   * Count Type MinhChungCountOutputType
   */

  export type MinhChungCountOutputType = {
    ho_sos: number
  }

  export type MinhChungCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ho_sos?: boolean | MinhChungCountOutputTypeCountHo_sosArgs
  }

  // Custom InputTypes
  /**
   * MinhChungCountOutputType without action
   */
  export type MinhChungCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChungCountOutputType
     */
    select?: MinhChungCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MinhChungCountOutputType without action
   */
  export type MinhChungCountOutputTypeCountHo_sosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoSoWhereInput
  }


  /**
   * Count Type HoSoCountOutputType
   */

  export type HoSoCountOutputType = {
    minh_chungs: number
  }

  export type HoSoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    minh_chungs?: boolean | HoSoCountOutputTypeCountMinh_chungsArgs
  }

  // Custom InputTypes
  /**
   * HoSoCountOutputType without action
   */
  export type HoSoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSoCountOutputType
     */
    select?: HoSoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HoSoCountOutputType without action
   */
  export type HoSoCountOutputTypeCountMinh_chungsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MinhChungWhereInput
  }


  /**
   * Models
   */

  /**
   * Model DonVi
   */

  export type AggregateDonVi = {
    _count: DonViCountAggregateOutputType | null
    _min: DonViMinAggregateOutputType | null
    _max: DonViMaxAggregateOutputType | null
  }

  export type DonViMinAggregateOutputType = {
    id: string | null
    ten_don_vi: string | null
    cap_do: $Enums.CapDo | null
    parent_id: string | null
    trang_thai: boolean | null
    created_at: Date | null
  }

  export type DonViMaxAggregateOutputType = {
    id: string | null
    ten_don_vi: string | null
    cap_do: $Enums.CapDo | null
    parent_id: string | null
    trang_thai: boolean | null
    created_at: Date | null
  }

  export type DonViCountAggregateOutputType = {
    id: number
    ten_don_vi: number
    cap_do: number
    parent_id: number
    trang_thai: number
    created_at: number
    _all: number
  }


  export type DonViMinAggregateInputType = {
    id?: true
    ten_don_vi?: true
    cap_do?: true
    parent_id?: true
    trang_thai?: true
    created_at?: true
  }

  export type DonViMaxAggregateInputType = {
    id?: true
    ten_don_vi?: true
    cap_do?: true
    parent_id?: true
    trang_thai?: true
    created_at?: true
  }

  export type DonViCountAggregateInputType = {
    id?: true
    ten_don_vi?: true
    cap_do?: true
    parent_id?: true
    trang_thai?: true
    created_at?: true
    _all?: true
  }

  export type DonViAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DonVi to aggregate.
     */
    where?: DonViWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonVis to fetch.
     */
    orderBy?: DonViOrderByWithRelationInput | DonViOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DonViWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonVis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonVis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DonVis
    **/
    _count?: true | DonViCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DonViMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DonViMaxAggregateInputType
  }

  export type GetDonViAggregateType<T extends DonViAggregateArgs> = {
        [P in keyof T & keyof AggregateDonVi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDonVi[P]>
      : GetScalarType<T[P], AggregateDonVi[P]>
  }




  export type DonViGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonViWhereInput
    orderBy?: DonViOrderByWithAggregationInput | DonViOrderByWithAggregationInput[]
    by: DonViScalarFieldEnum[] | DonViScalarFieldEnum
    having?: DonViScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DonViCountAggregateInputType | true
    _min?: DonViMinAggregateInputType
    _max?: DonViMaxAggregateInputType
  }

  export type DonViGroupByOutputType = {
    id: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    parent_id: string | null
    trang_thai: boolean
    created_at: Date
    _count: DonViCountAggregateOutputType | null
    _min: DonViMinAggregateOutputType | null
    _max: DonViMaxAggregateOutputType | null
  }

  type GetDonViGroupByPayload<T extends DonViGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DonViGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DonViGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DonViGroupByOutputType[P]>
            : GetScalarType<T[P], DonViGroupByOutputType[P]>
        }
      >
    >


  export type DonViSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ten_don_vi?: boolean
    cap_do?: boolean
    parent_id?: boolean
    trang_thai?: boolean
    created_at?: boolean
    parent?: boolean | DonVi$parentArgs<ExtArgs>
    children?: boolean | DonVi$childrenArgs<ExtArgs>
    nguoi_dungs?: boolean | DonVi$nguoi_dungsArgs<ExtArgs>
    quy_ches?: boolean | DonVi$quy_chesArgs<ExtArgs>
    hoat_dongs?: boolean | DonVi$hoat_dongsArgs<ExtArgs>
    _count?: boolean | DonViCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donVi"]>

  export type DonViSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ten_don_vi?: boolean
    cap_do?: boolean
    parent_id?: boolean
    trang_thai?: boolean
    created_at?: boolean
    parent?: boolean | DonVi$parentArgs<ExtArgs>
  }, ExtArgs["result"]["donVi"]>

  export type DonViSelectScalar = {
    id?: boolean
    ten_don_vi?: boolean
    cap_do?: boolean
    parent_id?: boolean
    trang_thai?: boolean
    created_at?: boolean
  }

  export type DonViInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | DonVi$parentArgs<ExtArgs>
    children?: boolean | DonVi$childrenArgs<ExtArgs>
    nguoi_dungs?: boolean | DonVi$nguoi_dungsArgs<ExtArgs>
    quy_ches?: boolean | DonVi$quy_chesArgs<ExtArgs>
    hoat_dongs?: boolean | DonVi$hoat_dongsArgs<ExtArgs>
    _count?: boolean | DonViCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DonViIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | DonVi$parentArgs<ExtArgs>
  }

  export type $DonViPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DonVi"
    objects: {
      parent: Prisma.$DonViPayload<ExtArgs> | null
      children: Prisma.$DonViPayload<ExtArgs>[]
      nguoi_dungs: Prisma.$NguoiDungPayload<ExtArgs>[]
      quy_ches: Prisma.$QuyChePayload<ExtArgs>[]
      hoat_dongs: Prisma.$HoatDongPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ten_don_vi: string
      cap_do: $Enums.CapDo
      parent_id: string | null
      trang_thai: boolean
      created_at: Date
    }, ExtArgs["result"]["donVi"]>
    composites: {}
  }

  type DonViGetPayload<S extends boolean | null | undefined | DonViDefaultArgs> = $Result.GetResult<Prisma.$DonViPayload, S>

  type DonViCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DonViFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DonViCountAggregateInputType | true
    }

  export interface DonViDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DonVi'], meta: { name: 'DonVi' } }
    /**
     * Find zero or one DonVi that matches the filter.
     * @param {DonViFindUniqueArgs} args - Arguments to find a DonVi
     * @example
     * // Get one DonVi
     * const donVi = await prisma.donVi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonViFindUniqueArgs>(args: SelectSubset<T, DonViFindUniqueArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DonVi that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DonViFindUniqueOrThrowArgs} args - Arguments to find a DonVi
     * @example
     * // Get one DonVi
     * const donVi = await prisma.donVi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonViFindUniqueOrThrowArgs>(args: SelectSubset<T, DonViFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DonVi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonViFindFirstArgs} args - Arguments to find a DonVi
     * @example
     * // Get one DonVi
     * const donVi = await prisma.donVi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonViFindFirstArgs>(args?: SelectSubset<T, DonViFindFirstArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DonVi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonViFindFirstOrThrowArgs} args - Arguments to find a DonVi
     * @example
     * // Get one DonVi
     * const donVi = await prisma.donVi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonViFindFirstOrThrowArgs>(args?: SelectSubset<T, DonViFindFirstOrThrowArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DonVis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonViFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DonVis
     * const donVis = await prisma.donVi.findMany()
     * 
     * // Get first 10 DonVis
     * const donVis = await prisma.donVi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const donViWithIdOnly = await prisma.donVi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DonViFindManyArgs>(args?: SelectSubset<T, DonViFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DonVi.
     * @param {DonViCreateArgs} args - Arguments to create a DonVi.
     * @example
     * // Create one DonVi
     * const DonVi = await prisma.donVi.create({
     *   data: {
     *     // ... data to create a DonVi
     *   }
     * })
     * 
     */
    create<T extends DonViCreateArgs>(args: SelectSubset<T, DonViCreateArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DonVis.
     * @param {DonViCreateManyArgs} args - Arguments to create many DonVis.
     * @example
     * // Create many DonVis
     * const donVi = await prisma.donVi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DonViCreateManyArgs>(args?: SelectSubset<T, DonViCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DonVis and returns the data saved in the database.
     * @param {DonViCreateManyAndReturnArgs} args - Arguments to create many DonVis.
     * @example
     * // Create many DonVis
     * const donVi = await prisma.donVi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DonVis and only return the `id`
     * const donViWithIdOnly = await prisma.donVi.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DonViCreateManyAndReturnArgs>(args?: SelectSubset<T, DonViCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DonVi.
     * @param {DonViDeleteArgs} args - Arguments to delete one DonVi.
     * @example
     * // Delete one DonVi
     * const DonVi = await prisma.donVi.delete({
     *   where: {
     *     // ... filter to delete one DonVi
     *   }
     * })
     * 
     */
    delete<T extends DonViDeleteArgs>(args: SelectSubset<T, DonViDeleteArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DonVi.
     * @param {DonViUpdateArgs} args - Arguments to update one DonVi.
     * @example
     * // Update one DonVi
     * const donVi = await prisma.donVi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DonViUpdateArgs>(args: SelectSubset<T, DonViUpdateArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DonVis.
     * @param {DonViDeleteManyArgs} args - Arguments to filter DonVis to delete.
     * @example
     * // Delete a few DonVis
     * const { count } = await prisma.donVi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DonViDeleteManyArgs>(args?: SelectSubset<T, DonViDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DonVis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonViUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DonVis
     * const donVi = await prisma.donVi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DonViUpdateManyArgs>(args: SelectSubset<T, DonViUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DonVi.
     * @param {DonViUpsertArgs} args - Arguments to update or create a DonVi.
     * @example
     * // Update or create a DonVi
     * const donVi = await prisma.donVi.upsert({
     *   create: {
     *     // ... data to create a DonVi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DonVi we want to update
     *   }
     * })
     */
    upsert<T extends DonViUpsertArgs>(args: SelectSubset<T, DonViUpsertArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DonVis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonViCountArgs} args - Arguments to filter DonVis to count.
     * @example
     * // Count the number of DonVis
     * const count = await prisma.donVi.count({
     *   where: {
     *     // ... the filter for the DonVis we want to count
     *   }
     * })
    **/
    count<T extends DonViCountArgs>(
      args?: Subset<T, DonViCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DonViCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DonVi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonViAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DonViAggregateArgs>(args: Subset<T, DonViAggregateArgs>): Prisma.PrismaPromise<GetDonViAggregateType<T>>

    /**
     * Group by DonVi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonViGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DonViGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DonViGroupByArgs['orderBy'] }
        : { orderBy?: DonViGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DonViGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonViGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DonVi model
   */
  readonly fields: DonViFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DonVi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DonViClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends DonVi$parentArgs<ExtArgs> = {}>(args?: Subset<T, DonVi$parentArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    children<T extends DonVi$childrenArgs<ExtArgs> = {}>(args?: Subset<T, DonVi$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findMany"> | Null>
    nguoi_dungs<T extends DonVi$nguoi_dungsArgs<ExtArgs> = {}>(args?: Subset<T, DonVi$nguoi_dungsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findMany"> | Null>
    quy_ches<T extends DonVi$quy_chesArgs<ExtArgs> = {}>(args?: Subset<T, DonVi$quy_chesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "findMany"> | Null>
    hoat_dongs<T extends DonVi$hoat_dongsArgs<ExtArgs> = {}>(args?: Subset<T, DonVi$hoat_dongsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DonVi model
   */ 
  interface DonViFieldRefs {
    readonly id: FieldRef<"DonVi", 'String'>
    readonly ten_don_vi: FieldRef<"DonVi", 'String'>
    readonly cap_do: FieldRef<"DonVi", 'CapDo'>
    readonly parent_id: FieldRef<"DonVi", 'String'>
    readonly trang_thai: FieldRef<"DonVi", 'Boolean'>
    readonly created_at: FieldRef<"DonVi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DonVi findUnique
   */
  export type DonViFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * Filter, which DonVi to fetch.
     */
    where: DonViWhereUniqueInput
  }

  /**
   * DonVi findUniqueOrThrow
   */
  export type DonViFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * Filter, which DonVi to fetch.
     */
    where: DonViWhereUniqueInput
  }

  /**
   * DonVi findFirst
   */
  export type DonViFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * Filter, which DonVi to fetch.
     */
    where?: DonViWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonVis to fetch.
     */
    orderBy?: DonViOrderByWithRelationInput | DonViOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DonVis.
     */
    cursor?: DonViWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonVis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonVis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DonVis.
     */
    distinct?: DonViScalarFieldEnum | DonViScalarFieldEnum[]
  }

  /**
   * DonVi findFirstOrThrow
   */
  export type DonViFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * Filter, which DonVi to fetch.
     */
    where?: DonViWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonVis to fetch.
     */
    orderBy?: DonViOrderByWithRelationInput | DonViOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DonVis.
     */
    cursor?: DonViWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonVis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonVis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DonVis.
     */
    distinct?: DonViScalarFieldEnum | DonViScalarFieldEnum[]
  }

  /**
   * DonVi findMany
   */
  export type DonViFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * Filter, which DonVis to fetch.
     */
    where?: DonViWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonVis to fetch.
     */
    orderBy?: DonViOrderByWithRelationInput | DonViOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DonVis.
     */
    cursor?: DonViWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonVis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonVis.
     */
    skip?: number
    distinct?: DonViScalarFieldEnum | DonViScalarFieldEnum[]
  }

  /**
   * DonVi create
   */
  export type DonViCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * The data needed to create a DonVi.
     */
    data: XOR<DonViCreateInput, DonViUncheckedCreateInput>
  }

  /**
   * DonVi createMany
   */
  export type DonViCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DonVis.
     */
    data: DonViCreateManyInput | DonViCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DonVi createManyAndReturn
   */
  export type DonViCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DonVis.
     */
    data: DonViCreateManyInput | DonViCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DonVi update
   */
  export type DonViUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * The data needed to update a DonVi.
     */
    data: XOR<DonViUpdateInput, DonViUncheckedUpdateInput>
    /**
     * Choose, which DonVi to update.
     */
    where: DonViWhereUniqueInput
  }

  /**
   * DonVi updateMany
   */
  export type DonViUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DonVis.
     */
    data: XOR<DonViUpdateManyMutationInput, DonViUncheckedUpdateManyInput>
    /**
     * Filter which DonVis to update
     */
    where?: DonViWhereInput
  }

  /**
   * DonVi upsert
   */
  export type DonViUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * The filter to search for the DonVi to update in case it exists.
     */
    where: DonViWhereUniqueInput
    /**
     * In case the DonVi found by the `where` argument doesn't exist, create a new DonVi with this data.
     */
    create: XOR<DonViCreateInput, DonViUncheckedCreateInput>
    /**
     * In case the DonVi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DonViUpdateInput, DonViUncheckedUpdateInput>
  }

  /**
   * DonVi delete
   */
  export type DonViDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    /**
     * Filter which DonVi to delete.
     */
    where: DonViWhereUniqueInput
  }

  /**
   * DonVi deleteMany
   */
  export type DonViDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DonVis to delete
     */
    where?: DonViWhereInput
  }

  /**
   * DonVi.parent
   */
  export type DonVi$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    where?: DonViWhereInput
  }

  /**
   * DonVi.children
   */
  export type DonVi$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    where?: DonViWhereInput
    orderBy?: DonViOrderByWithRelationInput | DonViOrderByWithRelationInput[]
    cursor?: DonViWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonViScalarFieldEnum | DonViScalarFieldEnum[]
  }

  /**
   * DonVi.nguoi_dungs
   */
  export type DonVi$nguoi_dungsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    where?: NguoiDungWhereInput
    orderBy?: NguoiDungOrderByWithRelationInput | NguoiDungOrderByWithRelationInput[]
    cursor?: NguoiDungWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NguoiDungScalarFieldEnum | NguoiDungScalarFieldEnum[]
  }

  /**
   * DonVi.quy_ches
   */
  export type DonVi$quy_chesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    where?: QuyCheWhereInput
    orderBy?: QuyCheOrderByWithRelationInput | QuyCheOrderByWithRelationInput[]
    cursor?: QuyCheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuyCheScalarFieldEnum | QuyCheScalarFieldEnum[]
  }

  /**
   * DonVi.hoat_dongs
   */
  export type DonVi$hoat_dongsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    where?: HoatDongWhereInput
    orderBy?: HoatDongOrderByWithRelationInput | HoatDongOrderByWithRelationInput[]
    cursor?: HoatDongWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoatDongScalarFieldEnum | HoatDongScalarFieldEnum[]
  }

  /**
   * DonVi without action
   */
  export type DonViDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
  }


  /**
   * Model NguoiDung
   */

  export type AggregateNguoiDung = {
    _count: NguoiDungCountAggregateOutputType | null
    _min: NguoiDungMinAggregateOutputType | null
    _max: NguoiDungMaxAggregateOutputType | null
  }

  export type NguoiDungMinAggregateOutputType = {
    id: string | null
    don_vi_id: string | null
    email: string | null
    msv: string | null
    mat_khau: string | null
    ho_ten: string | null
    vai_tro: $Enums.VaiTro | null
    cccd: string | null
    trang_thai: $Enums.TrangThaiTK | null
    so_dien_thoai: string | null
    reset_otp: string | null
    reset_otp_expires: Date | null
    created_at: Date | null
  }

  export type NguoiDungMaxAggregateOutputType = {
    id: string | null
    don_vi_id: string | null
    email: string | null
    msv: string | null
    mat_khau: string | null
    ho_ten: string | null
    vai_tro: $Enums.VaiTro | null
    cccd: string | null
    trang_thai: $Enums.TrangThaiTK | null
    so_dien_thoai: string | null
    reset_otp: string | null
    reset_otp_expires: Date | null
    created_at: Date | null
  }

  export type NguoiDungCountAggregateOutputType = {
    id: number
    don_vi_id: number
    email: number
    msv: number
    mat_khau: number
    ho_ten: number
    vai_tro: number
    cccd: number
    trang_thai: number
    so_dien_thoai: number
    reset_otp: number
    reset_otp_expires: number
    created_at: number
    _all: number
  }


  export type NguoiDungMinAggregateInputType = {
    id?: true
    don_vi_id?: true
    email?: true
    msv?: true
    mat_khau?: true
    ho_ten?: true
    vai_tro?: true
    cccd?: true
    trang_thai?: true
    so_dien_thoai?: true
    reset_otp?: true
    reset_otp_expires?: true
    created_at?: true
  }

  export type NguoiDungMaxAggregateInputType = {
    id?: true
    don_vi_id?: true
    email?: true
    msv?: true
    mat_khau?: true
    ho_ten?: true
    vai_tro?: true
    cccd?: true
    trang_thai?: true
    so_dien_thoai?: true
    reset_otp?: true
    reset_otp_expires?: true
    created_at?: true
  }

  export type NguoiDungCountAggregateInputType = {
    id?: true
    don_vi_id?: true
    email?: true
    msv?: true
    mat_khau?: true
    ho_ten?: true
    vai_tro?: true
    cccd?: true
    trang_thai?: true
    so_dien_thoai?: true
    reset_otp?: true
    reset_otp_expires?: true
    created_at?: true
    _all?: true
  }

  export type NguoiDungAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NguoiDung to aggregate.
     */
    where?: NguoiDungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NguoiDungs to fetch.
     */
    orderBy?: NguoiDungOrderByWithRelationInput | NguoiDungOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NguoiDungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NguoiDungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NguoiDungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NguoiDungs
    **/
    _count?: true | NguoiDungCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NguoiDungMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NguoiDungMaxAggregateInputType
  }

  export type GetNguoiDungAggregateType<T extends NguoiDungAggregateArgs> = {
        [P in keyof T & keyof AggregateNguoiDung]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNguoiDung[P]>
      : GetScalarType<T[P], AggregateNguoiDung[P]>
  }




  export type NguoiDungGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NguoiDungWhereInput
    orderBy?: NguoiDungOrderByWithAggregationInput | NguoiDungOrderByWithAggregationInput[]
    by: NguoiDungScalarFieldEnum[] | NguoiDungScalarFieldEnum
    having?: NguoiDungScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NguoiDungCountAggregateInputType | true
    _min?: NguoiDungMinAggregateInputType
    _max?: NguoiDungMaxAggregateInputType
  }

  export type NguoiDungGroupByOutputType = {
    id: string
    don_vi_id: string | null
    email: string
    msv: string | null
    mat_khau: string
    ho_ten: string
    vai_tro: $Enums.VaiTro
    cccd: string | null
    trang_thai: $Enums.TrangThaiTK
    so_dien_thoai: string | null
    reset_otp: string | null
    reset_otp_expires: Date | null
    created_at: Date
    _count: NguoiDungCountAggregateOutputType | null
    _min: NguoiDungMinAggregateOutputType | null
    _max: NguoiDungMaxAggregateOutputType | null
  }

  type GetNguoiDungGroupByPayload<T extends NguoiDungGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NguoiDungGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NguoiDungGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NguoiDungGroupByOutputType[P]>
            : GetScalarType<T[P], NguoiDungGroupByOutputType[P]>
        }
      >
    >


  export type NguoiDungSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    don_vi_id?: boolean
    email?: boolean
    msv?: boolean
    mat_khau?: boolean
    ho_ten?: boolean
    vai_tro?: boolean
    cccd?: boolean
    trang_thai?: boolean
    so_dien_thoai?: boolean
    reset_otp?: boolean
    reset_otp_expires?: boolean
    created_at?: boolean
    don_vi?: boolean | NguoiDung$don_viArgs<ExtArgs>
    diem_danhs?: boolean | NguoiDung$diem_danhsArgs<ExtArgs>
    minh_chungs?: boolean | NguoiDung$minh_chungsArgs<ExtArgs>
    ho_sos?: boolean | NguoiDung$ho_sosArgs<ExtArgs>
    hoat_dong_duyets?: boolean | NguoiDung$hoat_dong_duyetsArgs<ExtArgs>
    _count?: boolean | NguoiDungCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nguoiDung"]>

  export type NguoiDungSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    don_vi_id?: boolean
    email?: boolean
    msv?: boolean
    mat_khau?: boolean
    ho_ten?: boolean
    vai_tro?: boolean
    cccd?: boolean
    trang_thai?: boolean
    so_dien_thoai?: boolean
    reset_otp?: boolean
    reset_otp_expires?: boolean
    created_at?: boolean
    don_vi?: boolean | NguoiDung$don_viArgs<ExtArgs>
  }, ExtArgs["result"]["nguoiDung"]>

  export type NguoiDungSelectScalar = {
    id?: boolean
    don_vi_id?: boolean
    email?: boolean
    msv?: boolean
    mat_khau?: boolean
    ho_ten?: boolean
    vai_tro?: boolean
    cccd?: boolean
    trang_thai?: boolean
    so_dien_thoai?: boolean
    reset_otp?: boolean
    reset_otp_expires?: boolean
    created_at?: boolean
  }

  export type NguoiDungInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    don_vi?: boolean | NguoiDung$don_viArgs<ExtArgs>
    diem_danhs?: boolean | NguoiDung$diem_danhsArgs<ExtArgs>
    minh_chungs?: boolean | NguoiDung$minh_chungsArgs<ExtArgs>
    ho_sos?: boolean | NguoiDung$ho_sosArgs<ExtArgs>
    hoat_dong_duyets?: boolean | NguoiDung$hoat_dong_duyetsArgs<ExtArgs>
    _count?: boolean | NguoiDungCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NguoiDungIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    don_vi?: boolean | NguoiDung$don_viArgs<ExtArgs>
  }

  export type $NguoiDungPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NguoiDung"
    objects: {
      don_vi: Prisma.$DonViPayload<ExtArgs> | null
      diem_danhs: Prisma.$DiemDanhPayload<ExtArgs>[]
      minh_chungs: Prisma.$MinhChungPayload<ExtArgs>[]
      ho_sos: Prisma.$HoSoPayload<ExtArgs>[]
      hoat_dong_duyets: Prisma.$HoatDongPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      don_vi_id: string | null
      email: string
      msv: string | null
      mat_khau: string
      ho_ten: string
      vai_tro: $Enums.VaiTro
      cccd: string | null
      trang_thai: $Enums.TrangThaiTK
      so_dien_thoai: string | null
      reset_otp: string | null
      reset_otp_expires: Date | null
      created_at: Date
    }, ExtArgs["result"]["nguoiDung"]>
    composites: {}
  }

  type NguoiDungGetPayload<S extends boolean | null | undefined | NguoiDungDefaultArgs> = $Result.GetResult<Prisma.$NguoiDungPayload, S>

  type NguoiDungCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NguoiDungFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NguoiDungCountAggregateInputType | true
    }

  export interface NguoiDungDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NguoiDung'], meta: { name: 'NguoiDung' } }
    /**
     * Find zero or one NguoiDung that matches the filter.
     * @param {NguoiDungFindUniqueArgs} args - Arguments to find a NguoiDung
     * @example
     * // Get one NguoiDung
     * const nguoiDung = await prisma.nguoiDung.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NguoiDungFindUniqueArgs>(args: SelectSubset<T, NguoiDungFindUniqueArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NguoiDung that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NguoiDungFindUniqueOrThrowArgs} args - Arguments to find a NguoiDung
     * @example
     * // Get one NguoiDung
     * const nguoiDung = await prisma.nguoiDung.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NguoiDungFindUniqueOrThrowArgs>(args: SelectSubset<T, NguoiDungFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NguoiDung that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NguoiDungFindFirstArgs} args - Arguments to find a NguoiDung
     * @example
     * // Get one NguoiDung
     * const nguoiDung = await prisma.nguoiDung.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NguoiDungFindFirstArgs>(args?: SelectSubset<T, NguoiDungFindFirstArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NguoiDung that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NguoiDungFindFirstOrThrowArgs} args - Arguments to find a NguoiDung
     * @example
     * // Get one NguoiDung
     * const nguoiDung = await prisma.nguoiDung.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NguoiDungFindFirstOrThrowArgs>(args?: SelectSubset<T, NguoiDungFindFirstOrThrowArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NguoiDungs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NguoiDungFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NguoiDungs
     * const nguoiDungs = await prisma.nguoiDung.findMany()
     * 
     * // Get first 10 NguoiDungs
     * const nguoiDungs = await prisma.nguoiDung.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nguoiDungWithIdOnly = await prisma.nguoiDung.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NguoiDungFindManyArgs>(args?: SelectSubset<T, NguoiDungFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NguoiDung.
     * @param {NguoiDungCreateArgs} args - Arguments to create a NguoiDung.
     * @example
     * // Create one NguoiDung
     * const NguoiDung = await prisma.nguoiDung.create({
     *   data: {
     *     // ... data to create a NguoiDung
     *   }
     * })
     * 
     */
    create<T extends NguoiDungCreateArgs>(args: SelectSubset<T, NguoiDungCreateArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NguoiDungs.
     * @param {NguoiDungCreateManyArgs} args - Arguments to create many NguoiDungs.
     * @example
     * // Create many NguoiDungs
     * const nguoiDung = await prisma.nguoiDung.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NguoiDungCreateManyArgs>(args?: SelectSubset<T, NguoiDungCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NguoiDungs and returns the data saved in the database.
     * @param {NguoiDungCreateManyAndReturnArgs} args - Arguments to create many NguoiDungs.
     * @example
     * // Create many NguoiDungs
     * const nguoiDung = await prisma.nguoiDung.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NguoiDungs and only return the `id`
     * const nguoiDungWithIdOnly = await prisma.nguoiDung.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NguoiDungCreateManyAndReturnArgs>(args?: SelectSubset<T, NguoiDungCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a NguoiDung.
     * @param {NguoiDungDeleteArgs} args - Arguments to delete one NguoiDung.
     * @example
     * // Delete one NguoiDung
     * const NguoiDung = await prisma.nguoiDung.delete({
     *   where: {
     *     // ... filter to delete one NguoiDung
     *   }
     * })
     * 
     */
    delete<T extends NguoiDungDeleteArgs>(args: SelectSubset<T, NguoiDungDeleteArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NguoiDung.
     * @param {NguoiDungUpdateArgs} args - Arguments to update one NguoiDung.
     * @example
     * // Update one NguoiDung
     * const nguoiDung = await prisma.nguoiDung.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NguoiDungUpdateArgs>(args: SelectSubset<T, NguoiDungUpdateArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NguoiDungs.
     * @param {NguoiDungDeleteManyArgs} args - Arguments to filter NguoiDungs to delete.
     * @example
     * // Delete a few NguoiDungs
     * const { count } = await prisma.nguoiDung.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NguoiDungDeleteManyArgs>(args?: SelectSubset<T, NguoiDungDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NguoiDungs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NguoiDungUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NguoiDungs
     * const nguoiDung = await prisma.nguoiDung.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NguoiDungUpdateManyArgs>(args: SelectSubset<T, NguoiDungUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NguoiDung.
     * @param {NguoiDungUpsertArgs} args - Arguments to update or create a NguoiDung.
     * @example
     * // Update or create a NguoiDung
     * const nguoiDung = await prisma.nguoiDung.upsert({
     *   create: {
     *     // ... data to create a NguoiDung
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NguoiDung we want to update
     *   }
     * })
     */
    upsert<T extends NguoiDungUpsertArgs>(args: SelectSubset<T, NguoiDungUpsertArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NguoiDungs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NguoiDungCountArgs} args - Arguments to filter NguoiDungs to count.
     * @example
     * // Count the number of NguoiDungs
     * const count = await prisma.nguoiDung.count({
     *   where: {
     *     // ... the filter for the NguoiDungs we want to count
     *   }
     * })
    **/
    count<T extends NguoiDungCountArgs>(
      args?: Subset<T, NguoiDungCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NguoiDungCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NguoiDung.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NguoiDungAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NguoiDungAggregateArgs>(args: Subset<T, NguoiDungAggregateArgs>): Prisma.PrismaPromise<GetNguoiDungAggregateType<T>>

    /**
     * Group by NguoiDung.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NguoiDungGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NguoiDungGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NguoiDungGroupByArgs['orderBy'] }
        : { orderBy?: NguoiDungGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NguoiDungGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNguoiDungGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NguoiDung model
   */
  readonly fields: NguoiDungFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NguoiDung.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NguoiDungClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    don_vi<T extends NguoiDung$don_viArgs<ExtArgs> = {}>(args?: Subset<T, NguoiDung$don_viArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    diem_danhs<T extends NguoiDung$diem_danhsArgs<ExtArgs> = {}>(args?: Subset<T, NguoiDung$diem_danhsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "findMany"> | Null>
    minh_chungs<T extends NguoiDung$minh_chungsArgs<ExtArgs> = {}>(args?: Subset<T, NguoiDung$minh_chungsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "findMany"> | Null>
    ho_sos<T extends NguoiDung$ho_sosArgs<ExtArgs> = {}>(args?: Subset<T, NguoiDung$ho_sosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "findMany"> | Null>
    hoat_dong_duyets<T extends NguoiDung$hoat_dong_duyetsArgs<ExtArgs> = {}>(args?: Subset<T, NguoiDung$hoat_dong_duyetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NguoiDung model
   */ 
  interface NguoiDungFieldRefs {
    readonly id: FieldRef<"NguoiDung", 'String'>
    readonly don_vi_id: FieldRef<"NguoiDung", 'String'>
    readonly email: FieldRef<"NguoiDung", 'String'>
    readonly msv: FieldRef<"NguoiDung", 'String'>
    readonly mat_khau: FieldRef<"NguoiDung", 'String'>
    readonly ho_ten: FieldRef<"NguoiDung", 'String'>
    readonly vai_tro: FieldRef<"NguoiDung", 'VaiTro'>
    readonly cccd: FieldRef<"NguoiDung", 'String'>
    readonly trang_thai: FieldRef<"NguoiDung", 'TrangThaiTK'>
    readonly so_dien_thoai: FieldRef<"NguoiDung", 'String'>
    readonly reset_otp: FieldRef<"NguoiDung", 'String'>
    readonly reset_otp_expires: FieldRef<"NguoiDung", 'DateTime'>
    readonly created_at: FieldRef<"NguoiDung", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NguoiDung findUnique
   */
  export type NguoiDungFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * Filter, which NguoiDung to fetch.
     */
    where: NguoiDungWhereUniqueInput
  }

  /**
   * NguoiDung findUniqueOrThrow
   */
  export type NguoiDungFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * Filter, which NguoiDung to fetch.
     */
    where: NguoiDungWhereUniqueInput
  }

  /**
   * NguoiDung findFirst
   */
  export type NguoiDungFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * Filter, which NguoiDung to fetch.
     */
    where?: NguoiDungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NguoiDungs to fetch.
     */
    orderBy?: NguoiDungOrderByWithRelationInput | NguoiDungOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NguoiDungs.
     */
    cursor?: NguoiDungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NguoiDungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NguoiDungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NguoiDungs.
     */
    distinct?: NguoiDungScalarFieldEnum | NguoiDungScalarFieldEnum[]
  }

  /**
   * NguoiDung findFirstOrThrow
   */
  export type NguoiDungFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * Filter, which NguoiDung to fetch.
     */
    where?: NguoiDungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NguoiDungs to fetch.
     */
    orderBy?: NguoiDungOrderByWithRelationInput | NguoiDungOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NguoiDungs.
     */
    cursor?: NguoiDungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NguoiDungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NguoiDungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NguoiDungs.
     */
    distinct?: NguoiDungScalarFieldEnum | NguoiDungScalarFieldEnum[]
  }

  /**
   * NguoiDung findMany
   */
  export type NguoiDungFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * Filter, which NguoiDungs to fetch.
     */
    where?: NguoiDungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NguoiDungs to fetch.
     */
    orderBy?: NguoiDungOrderByWithRelationInput | NguoiDungOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NguoiDungs.
     */
    cursor?: NguoiDungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NguoiDungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NguoiDungs.
     */
    skip?: number
    distinct?: NguoiDungScalarFieldEnum | NguoiDungScalarFieldEnum[]
  }

  /**
   * NguoiDung create
   */
  export type NguoiDungCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * The data needed to create a NguoiDung.
     */
    data: XOR<NguoiDungCreateInput, NguoiDungUncheckedCreateInput>
  }

  /**
   * NguoiDung createMany
   */
  export type NguoiDungCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NguoiDungs.
     */
    data: NguoiDungCreateManyInput | NguoiDungCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NguoiDung createManyAndReturn
   */
  export type NguoiDungCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many NguoiDungs.
     */
    data: NguoiDungCreateManyInput | NguoiDungCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NguoiDung update
   */
  export type NguoiDungUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * The data needed to update a NguoiDung.
     */
    data: XOR<NguoiDungUpdateInput, NguoiDungUncheckedUpdateInput>
    /**
     * Choose, which NguoiDung to update.
     */
    where: NguoiDungWhereUniqueInput
  }

  /**
   * NguoiDung updateMany
   */
  export type NguoiDungUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NguoiDungs.
     */
    data: XOR<NguoiDungUpdateManyMutationInput, NguoiDungUncheckedUpdateManyInput>
    /**
     * Filter which NguoiDungs to update
     */
    where?: NguoiDungWhereInput
  }

  /**
   * NguoiDung upsert
   */
  export type NguoiDungUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * The filter to search for the NguoiDung to update in case it exists.
     */
    where: NguoiDungWhereUniqueInput
    /**
     * In case the NguoiDung found by the `where` argument doesn't exist, create a new NguoiDung with this data.
     */
    create: XOR<NguoiDungCreateInput, NguoiDungUncheckedCreateInput>
    /**
     * In case the NguoiDung was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NguoiDungUpdateInput, NguoiDungUncheckedUpdateInput>
  }

  /**
   * NguoiDung delete
   */
  export type NguoiDungDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    /**
     * Filter which NguoiDung to delete.
     */
    where: NguoiDungWhereUniqueInput
  }

  /**
   * NguoiDung deleteMany
   */
  export type NguoiDungDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NguoiDungs to delete
     */
    where?: NguoiDungWhereInput
  }

  /**
   * NguoiDung.don_vi
   */
  export type NguoiDung$don_viArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonVi
     */
    select?: DonViSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonViInclude<ExtArgs> | null
    where?: DonViWhereInput
  }

  /**
   * NguoiDung.diem_danhs
   */
  export type NguoiDung$diem_danhsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    where?: DiemDanhWhereInput
    orderBy?: DiemDanhOrderByWithRelationInput | DiemDanhOrderByWithRelationInput[]
    cursor?: DiemDanhWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiemDanhScalarFieldEnum | DiemDanhScalarFieldEnum[]
  }

  /**
   * NguoiDung.minh_chungs
   */
  export type NguoiDung$minh_chungsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    where?: MinhChungWhereInput
    orderBy?: MinhChungOrderByWithRelationInput | MinhChungOrderByWithRelationInput[]
    cursor?: MinhChungWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MinhChungScalarFieldEnum | MinhChungScalarFieldEnum[]
  }

  /**
   * NguoiDung.ho_sos
   */
  export type NguoiDung$ho_sosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    where?: HoSoWhereInput
    orderBy?: HoSoOrderByWithRelationInput | HoSoOrderByWithRelationInput[]
    cursor?: HoSoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoSoScalarFieldEnum | HoSoScalarFieldEnum[]
  }

  /**
   * NguoiDung.hoat_dong_duyets
   */
  export type NguoiDung$hoat_dong_duyetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    where?: HoatDongWhereInput
    orderBy?: HoatDongOrderByWithRelationInput | HoatDongOrderByWithRelationInput[]
    cursor?: HoatDongWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoatDongScalarFieldEnum | HoatDongScalarFieldEnum[]
  }

  /**
   * NguoiDung without action
   */
  export type NguoiDungDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
  }


  /**
   * Model QuyChe
   */

  export type AggregateQuyChe = {
    _count: QuyCheCountAggregateOutputType | null
    _avg: QuyCheAvgAggregateOutputType | null
    _sum: QuyCheSumAggregateOutputType | null
    _min: QuyCheMinAggregateOutputType | null
    _max: QuyCheMaxAggregateOutputType | null
  }

  export type QuyCheAvgAggregateOutputType = {
    so_tieu_chi_dat: number | null
  }

  export type QuyCheSumAggregateOutputType = {
    so_tieu_chi_dat: number | null
  }

  export type QuyCheMinAggregateOutputType = {
    id: string | null
    don_vi_id: string | null
    nam_hoc: string | null
    ngay_mo_cong: Date | null
    ngay_dong_cong: Date | null
    so_tieu_chi_dat: number | null
    created_at: Date | null
  }

  export type QuyCheMaxAggregateOutputType = {
    id: string | null
    don_vi_id: string | null
    nam_hoc: string | null
    ngay_mo_cong: Date | null
    ngay_dong_cong: Date | null
    so_tieu_chi_dat: number | null
    created_at: Date | null
  }

  export type QuyCheCountAggregateOutputType = {
    id: number
    don_vi_id: number
    nam_hoc: number
    ngay_mo_cong: number
    ngay_dong_cong: number
    so_tieu_chi_dat: number
    created_at: number
    _all: number
  }


  export type QuyCheAvgAggregateInputType = {
    so_tieu_chi_dat?: true
  }

  export type QuyCheSumAggregateInputType = {
    so_tieu_chi_dat?: true
  }

  export type QuyCheMinAggregateInputType = {
    id?: true
    don_vi_id?: true
    nam_hoc?: true
    ngay_mo_cong?: true
    ngay_dong_cong?: true
    so_tieu_chi_dat?: true
    created_at?: true
  }

  export type QuyCheMaxAggregateInputType = {
    id?: true
    don_vi_id?: true
    nam_hoc?: true
    ngay_mo_cong?: true
    ngay_dong_cong?: true
    so_tieu_chi_dat?: true
    created_at?: true
  }

  export type QuyCheCountAggregateInputType = {
    id?: true
    don_vi_id?: true
    nam_hoc?: true
    ngay_mo_cong?: true
    ngay_dong_cong?: true
    so_tieu_chi_dat?: true
    created_at?: true
    _all?: true
  }

  export type QuyCheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuyChe to aggregate.
     */
    where?: QuyCheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuyChes to fetch.
     */
    orderBy?: QuyCheOrderByWithRelationInput | QuyCheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuyCheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuyChes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuyChes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuyChes
    **/
    _count?: true | QuyCheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuyCheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuyCheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuyCheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuyCheMaxAggregateInputType
  }

  export type GetQuyCheAggregateType<T extends QuyCheAggregateArgs> = {
        [P in keyof T & keyof AggregateQuyChe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuyChe[P]>
      : GetScalarType<T[P], AggregateQuyChe[P]>
  }




  export type QuyCheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuyCheWhereInput
    orderBy?: QuyCheOrderByWithAggregationInput | QuyCheOrderByWithAggregationInput[]
    by: QuyCheScalarFieldEnum[] | QuyCheScalarFieldEnum
    having?: QuyCheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuyCheCountAggregateInputType | true
    _avg?: QuyCheAvgAggregateInputType
    _sum?: QuyCheSumAggregateInputType
    _min?: QuyCheMinAggregateInputType
    _max?: QuyCheMaxAggregateInputType
  }

  export type QuyCheGroupByOutputType = {
    id: string
    don_vi_id: string
    nam_hoc: string
    ngay_mo_cong: Date
    ngay_dong_cong: Date
    so_tieu_chi_dat: number
    created_at: Date
    _count: QuyCheCountAggregateOutputType | null
    _avg: QuyCheAvgAggregateOutputType | null
    _sum: QuyCheSumAggregateOutputType | null
    _min: QuyCheMinAggregateOutputType | null
    _max: QuyCheMaxAggregateOutputType | null
  }

  type GetQuyCheGroupByPayload<T extends QuyCheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuyCheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuyCheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuyCheGroupByOutputType[P]>
            : GetScalarType<T[P], QuyCheGroupByOutputType[P]>
        }
      >
    >


  export type QuyCheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    don_vi_id?: boolean
    nam_hoc?: boolean
    ngay_mo_cong?: boolean
    ngay_dong_cong?: boolean
    so_tieu_chi_dat?: boolean
    created_at?: boolean
    don_vi?: boolean | DonViDefaultArgs<ExtArgs>
    tieu_chis?: boolean | QuyChe$tieu_chisArgs<ExtArgs>
    ho_sos?: boolean | QuyChe$ho_sosArgs<ExtArgs>
    _count?: boolean | QuyCheCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quyChe"]>

  export type QuyCheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    don_vi_id?: boolean
    nam_hoc?: boolean
    ngay_mo_cong?: boolean
    ngay_dong_cong?: boolean
    so_tieu_chi_dat?: boolean
    created_at?: boolean
    don_vi?: boolean | DonViDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quyChe"]>

  export type QuyCheSelectScalar = {
    id?: boolean
    don_vi_id?: boolean
    nam_hoc?: boolean
    ngay_mo_cong?: boolean
    ngay_dong_cong?: boolean
    so_tieu_chi_dat?: boolean
    created_at?: boolean
  }

  export type QuyCheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    don_vi?: boolean | DonViDefaultArgs<ExtArgs>
    tieu_chis?: boolean | QuyChe$tieu_chisArgs<ExtArgs>
    ho_sos?: boolean | QuyChe$ho_sosArgs<ExtArgs>
    _count?: boolean | QuyCheCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuyCheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    don_vi?: boolean | DonViDefaultArgs<ExtArgs>
  }

  export type $QuyChePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuyChe"
    objects: {
      don_vi: Prisma.$DonViPayload<ExtArgs>
      tieu_chis: Prisma.$TieuChiPayload<ExtArgs>[]
      ho_sos: Prisma.$HoSoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      don_vi_id: string
      nam_hoc: string
      ngay_mo_cong: Date
      ngay_dong_cong: Date
      so_tieu_chi_dat: number
      created_at: Date
    }, ExtArgs["result"]["quyChe"]>
    composites: {}
  }

  type QuyCheGetPayload<S extends boolean | null | undefined | QuyCheDefaultArgs> = $Result.GetResult<Prisma.$QuyChePayload, S>

  type QuyCheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuyCheFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuyCheCountAggregateInputType | true
    }

  export interface QuyCheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuyChe'], meta: { name: 'QuyChe' } }
    /**
     * Find zero or one QuyChe that matches the filter.
     * @param {QuyCheFindUniqueArgs} args - Arguments to find a QuyChe
     * @example
     * // Get one QuyChe
     * const quyChe = await prisma.quyChe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuyCheFindUniqueArgs>(args: SelectSubset<T, QuyCheFindUniqueArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QuyChe that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuyCheFindUniqueOrThrowArgs} args - Arguments to find a QuyChe
     * @example
     * // Get one QuyChe
     * const quyChe = await prisma.quyChe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuyCheFindUniqueOrThrowArgs>(args: SelectSubset<T, QuyCheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QuyChe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuyCheFindFirstArgs} args - Arguments to find a QuyChe
     * @example
     * // Get one QuyChe
     * const quyChe = await prisma.quyChe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuyCheFindFirstArgs>(args?: SelectSubset<T, QuyCheFindFirstArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QuyChe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuyCheFindFirstOrThrowArgs} args - Arguments to find a QuyChe
     * @example
     * // Get one QuyChe
     * const quyChe = await prisma.quyChe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuyCheFindFirstOrThrowArgs>(args?: SelectSubset<T, QuyCheFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QuyChes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuyCheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuyChes
     * const quyChes = await prisma.quyChe.findMany()
     * 
     * // Get first 10 QuyChes
     * const quyChes = await prisma.quyChe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quyCheWithIdOnly = await prisma.quyChe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuyCheFindManyArgs>(args?: SelectSubset<T, QuyCheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QuyChe.
     * @param {QuyCheCreateArgs} args - Arguments to create a QuyChe.
     * @example
     * // Create one QuyChe
     * const QuyChe = await prisma.quyChe.create({
     *   data: {
     *     // ... data to create a QuyChe
     *   }
     * })
     * 
     */
    create<T extends QuyCheCreateArgs>(args: SelectSubset<T, QuyCheCreateArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QuyChes.
     * @param {QuyCheCreateManyArgs} args - Arguments to create many QuyChes.
     * @example
     * // Create many QuyChes
     * const quyChe = await prisma.quyChe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuyCheCreateManyArgs>(args?: SelectSubset<T, QuyCheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuyChes and returns the data saved in the database.
     * @param {QuyCheCreateManyAndReturnArgs} args - Arguments to create many QuyChes.
     * @example
     * // Create many QuyChes
     * const quyChe = await prisma.quyChe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuyChes and only return the `id`
     * const quyCheWithIdOnly = await prisma.quyChe.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuyCheCreateManyAndReturnArgs>(args?: SelectSubset<T, QuyCheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QuyChe.
     * @param {QuyCheDeleteArgs} args - Arguments to delete one QuyChe.
     * @example
     * // Delete one QuyChe
     * const QuyChe = await prisma.quyChe.delete({
     *   where: {
     *     // ... filter to delete one QuyChe
     *   }
     * })
     * 
     */
    delete<T extends QuyCheDeleteArgs>(args: SelectSubset<T, QuyCheDeleteArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QuyChe.
     * @param {QuyCheUpdateArgs} args - Arguments to update one QuyChe.
     * @example
     * // Update one QuyChe
     * const quyChe = await prisma.quyChe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuyCheUpdateArgs>(args: SelectSubset<T, QuyCheUpdateArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QuyChes.
     * @param {QuyCheDeleteManyArgs} args - Arguments to filter QuyChes to delete.
     * @example
     * // Delete a few QuyChes
     * const { count } = await prisma.quyChe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuyCheDeleteManyArgs>(args?: SelectSubset<T, QuyCheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuyChes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuyCheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuyChes
     * const quyChe = await prisma.quyChe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuyCheUpdateManyArgs>(args: SelectSubset<T, QuyCheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuyChe.
     * @param {QuyCheUpsertArgs} args - Arguments to update or create a QuyChe.
     * @example
     * // Update or create a QuyChe
     * const quyChe = await prisma.quyChe.upsert({
     *   create: {
     *     // ... data to create a QuyChe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuyChe we want to update
     *   }
     * })
     */
    upsert<T extends QuyCheUpsertArgs>(args: SelectSubset<T, QuyCheUpsertArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QuyChes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuyCheCountArgs} args - Arguments to filter QuyChes to count.
     * @example
     * // Count the number of QuyChes
     * const count = await prisma.quyChe.count({
     *   where: {
     *     // ... the filter for the QuyChes we want to count
     *   }
     * })
    **/
    count<T extends QuyCheCountArgs>(
      args?: Subset<T, QuyCheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuyCheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuyChe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuyCheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuyCheAggregateArgs>(args: Subset<T, QuyCheAggregateArgs>): Prisma.PrismaPromise<GetQuyCheAggregateType<T>>

    /**
     * Group by QuyChe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuyCheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuyCheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuyCheGroupByArgs['orderBy'] }
        : { orderBy?: QuyCheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuyCheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuyCheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuyChe model
   */
  readonly fields: QuyCheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuyChe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuyCheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    don_vi<T extends DonViDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DonViDefaultArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tieu_chis<T extends QuyChe$tieu_chisArgs<ExtArgs> = {}>(args?: Subset<T, QuyChe$tieu_chisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "findMany"> | Null>
    ho_sos<T extends QuyChe$ho_sosArgs<ExtArgs> = {}>(args?: Subset<T, QuyChe$ho_sosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuyChe model
   */ 
  interface QuyCheFieldRefs {
    readonly id: FieldRef<"QuyChe", 'String'>
    readonly don_vi_id: FieldRef<"QuyChe", 'String'>
    readonly nam_hoc: FieldRef<"QuyChe", 'String'>
    readonly ngay_mo_cong: FieldRef<"QuyChe", 'DateTime'>
    readonly ngay_dong_cong: FieldRef<"QuyChe", 'DateTime'>
    readonly so_tieu_chi_dat: FieldRef<"QuyChe", 'Int'>
    readonly created_at: FieldRef<"QuyChe", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuyChe findUnique
   */
  export type QuyCheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * Filter, which QuyChe to fetch.
     */
    where: QuyCheWhereUniqueInput
  }

  /**
   * QuyChe findUniqueOrThrow
   */
  export type QuyCheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * Filter, which QuyChe to fetch.
     */
    where: QuyCheWhereUniqueInput
  }

  /**
   * QuyChe findFirst
   */
  export type QuyCheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * Filter, which QuyChe to fetch.
     */
    where?: QuyCheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuyChes to fetch.
     */
    orderBy?: QuyCheOrderByWithRelationInput | QuyCheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuyChes.
     */
    cursor?: QuyCheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuyChes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuyChes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuyChes.
     */
    distinct?: QuyCheScalarFieldEnum | QuyCheScalarFieldEnum[]
  }

  /**
   * QuyChe findFirstOrThrow
   */
  export type QuyCheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * Filter, which QuyChe to fetch.
     */
    where?: QuyCheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuyChes to fetch.
     */
    orderBy?: QuyCheOrderByWithRelationInput | QuyCheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuyChes.
     */
    cursor?: QuyCheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuyChes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuyChes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuyChes.
     */
    distinct?: QuyCheScalarFieldEnum | QuyCheScalarFieldEnum[]
  }

  /**
   * QuyChe findMany
   */
  export type QuyCheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * Filter, which QuyChes to fetch.
     */
    where?: QuyCheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuyChes to fetch.
     */
    orderBy?: QuyCheOrderByWithRelationInput | QuyCheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuyChes.
     */
    cursor?: QuyCheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuyChes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuyChes.
     */
    skip?: number
    distinct?: QuyCheScalarFieldEnum | QuyCheScalarFieldEnum[]
  }

  /**
   * QuyChe create
   */
  export type QuyCheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * The data needed to create a QuyChe.
     */
    data: XOR<QuyCheCreateInput, QuyCheUncheckedCreateInput>
  }

  /**
   * QuyChe createMany
   */
  export type QuyCheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuyChes.
     */
    data: QuyCheCreateManyInput | QuyCheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuyChe createManyAndReturn
   */
  export type QuyCheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QuyChes.
     */
    data: QuyCheCreateManyInput | QuyCheCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuyChe update
   */
  export type QuyCheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * The data needed to update a QuyChe.
     */
    data: XOR<QuyCheUpdateInput, QuyCheUncheckedUpdateInput>
    /**
     * Choose, which QuyChe to update.
     */
    where: QuyCheWhereUniqueInput
  }

  /**
   * QuyChe updateMany
   */
  export type QuyCheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuyChes.
     */
    data: XOR<QuyCheUpdateManyMutationInput, QuyCheUncheckedUpdateManyInput>
    /**
     * Filter which QuyChes to update
     */
    where?: QuyCheWhereInput
  }

  /**
   * QuyChe upsert
   */
  export type QuyCheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * The filter to search for the QuyChe to update in case it exists.
     */
    where: QuyCheWhereUniqueInput
    /**
     * In case the QuyChe found by the `where` argument doesn't exist, create a new QuyChe with this data.
     */
    create: XOR<QuyCheCreateInput, QuyCheUncheckedCreateInput>
    /**
     * In case the QuyChe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuyCheUpdateInput, QuyCheUncheckedUpdateInput>
  }

  /**
   * QuyChe delete
   */
  export type QuyCheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
    /**
     * Filter which QuyChe to delete.
     */
    where: QuyCheWhereUniqueInput
  }

  /**
   * QuyChe deleteMany
   */
  export type QuyCheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuyChes to delete
     */
    where?: QuyCheWhereInput
  }

  /**
   * QuyChe.tieu_chis
   */
  export type QuyChe$tieu_chisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    where?: TieuChiWhereInput
    orderBy?: TieuChiOrderByWithRelationInput | TieuChiOrderByWithRelationInput[]
    cursor?: TieuChiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TieuChiScalarFieldEnum | TieuChiScalarFieldEnum[]
  }

  /**
   * QuyChe.ho_sos
   */
  export type QuyChe$ho_sosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    where?: HoSoWhereInput
    orderBy?: HoSoOrderByWithRelationInput | HoSoOrderByWithRelationInput[]
    cursor?: HoSoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoSoScalarFieldEnum | HoSoScalarFieldEnum[]
  }

  /**
   * QuyChe without action
   */
  export type QuyCheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuyChe
     */
    select?: QuyCheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuyCheInclude<ExtArgs> | null
  }


  /**
   * Model TieuChi
   */

  export type AggregateTieuChi = {
    _count: TieuChiCountAggregateOutputType | null
    _avg: TieuChiAvgAggregateOutputType | null
    _sum: TieuChiSumAggregateOutputType | null
    _min: TieuChiMinAggregateOutputType | null
    _max: TieuChiMaxAggregateOutputType | null
  }

  export type TieuChiAvgAggregateOutputType = {
    thu_tu: number | null
    so_luong_yeu_cau: number | null
  }

  export type TieuChiSumAggregateOutputType = {
    thu_tu: number | null
    so_luong_yeu_cau: number | null
  }

  export type TieuChiMinAggregateOutputType = {
    id: string | null
    quy_che_id: string | null
    ten_tieu_chi: string | null
    mo_ta: string | null
    thu_tu: number | null
    so_luong_yeu_cau: number | null
  }

  export type TieuChiMaxAggregateOutputType = {
    id: string | null
    quy_che_id: string | null
    ten_tieu_chi: string | null
    mo_ta: string | null
    thu_tu: number | null
    so_luong_yeu_cau: number | null
  }

  export type TieuChiCountAggregateOutputType = {
    id: number
    quy_che_id: number
    ten_tieu_chi: number
    mo_ta: number
    thu_tu: number
    so_luong_yeu_cau: number
    _all: number
  }


  export type TieuChiAvgAggregateInputType = {
    thu_tu?: true
    so_luong_yeu_cau?: true
  }

  export type TieuChiSumAggregateInputType = {
    thu_tu?: true
    so_luong_yeu_cau?: true
  }

  export type TieuChiMinAggregateInputType = {
    id?: true
    quy_che_id?: true
    ten_tieu_chi?: true
    mo_ta?: true
    thu_tu?: true
    so_luong_yeu_cau?: true
  }

  export type TieuChiMaxAggregateInputType = {
    id?: true
    quy_che_id?: true
    ten_tieu_chi?: true
    mo_ta?: true
    thu_tu?: true
    so_luong_yeu_cau?: true
  }

  export type TieuChiCountAggregateInputType = {
    id?: true
    quy_che_id?: true
    ten_tieu_chi?: true
    mo_ta?: true
    thu_tu?: true
    so_luong_yeu_cau?: true
    _all?: true
  }

  export type TieuChiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TieuChi to aggregate.
     */
    where?: TieuChiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TieuChis to fetch.
     */
    orderBy?: TieuChiOrderByWithRelationInput | TieuChiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TieuChiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TieuChis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TieuChis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TieuChis
    **/
    _count?: true | TieuChiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TieuChiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TieuChiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TieuChiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TieuChiMaxAggregateInputType
  }

  export type GetTieuChiAggregateType<T extends TieuChiAggregateArgs> = {
        [P in keyof T & keyof AggregateTieuChi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTieuChi[P]>
      : GetScalarType<T[P], AggregateTieuChi[P]>
  }




  export type TieuChiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TieuChiWhereInput
    orderBy?: TieuChiOrderByWithAggregationInput | TieuChiOrderByWithAggregationInput[]
    by: TieuChiScalarFieldEnum[] | TieuChiScalarFieldEnum
    having?: TieuChiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TieuChiCountAggregateInputType | true
    _avg?: TieuChiAvgAggregateInputType
    _sum?: TieuChiSumAggregateInputType
    _min?: TieuChiMinAggregateInputType
    _max?: TieuChiMaxAggregateInputType
  }

  export type TieuChiGroupByOutputType = {
    id: string
    quy_che_id: string
    ten_tieu_chi: string
    mo_ta: string | null
    thu_tu: number | null
    so_luong_yeu_cau: number
    _count: TieuChiCountAggregateOutputType | null
    _avg: TieuChiAvgAggregateOutputType | null
    _sum: TieuChiSumAggregateOutputType | null
    _min: TieuChiMinAggregateOutputType | null
    _max: TieuChiMaxAggregateOutputType | null
  }

  type GetTieuChiGroupByPayload<T extends TieuChiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TieuChiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TieuChiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TieuChiGroupByOutputType[P]>
            : GetScalarType<T[P], TieuChiGroupByOutputType[P]>
        }
      >
    >


  export type TieuChiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quy_che_id?: boolean
    ten_tieu_chi?: boolean
    mo_ta?: boolean
    thu_tu?: boolean
    so_luong_yeu_cau?: boolean
    quy_che?: boolean | QuyCheDefaultArgs<ExtArgs>
    hoat_dongs?: boolean | TieuChi$hoat_dongsArgs<ExtArgs>
    minh_chungs?: boolean | TieuChi$minh_chungsArgs<ExtArgs>
    _count?: boolean | TieuChiCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tieuChi"]>

  export type TieuChiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quy_che_id?: boolean
    ten_tieu_chi?: boolean
    mo_ta?: boolean
    thu_tu?: boolean
    so_luong_yeu_cau?: boolean
    quy_che?: boolean | QuyCheDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tieuChi"]>

  export type TieuChiSelectScalar = {
    id?: boolean
    quy_che_id?: boolean
    ten_tieu_chi?: boolean
    mo_ta?: boolean
    thu_tu?: boolean
    so_luong_yeu_cau?: boolean
  }

  export type TieuChiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quy_che?: boolean | QuyCheDefaultArgs<ExtArgs>
    hoat_dongs?: boolean | TieuChi$hoat_dongsArgs<ExtArgs>
    minh_chungs?: boolean | TieuChi$minh_chungsArgs<ExtArgs>
    _count?: boolean | TieuChiCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TieuChiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quy_che?: boolean | QuyCheDefaultArgs<ExtArgs>
  }

  export type $TieuChiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TieuChi"
    objects: {
      quy_che: Prisma.$QuyChePayload<ExtArgs>
      hoat_dongs: Prisma.$HoatDongPayload<ExtArgs>[]
      minh_chungs: Prisma.$MinhChungPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quy_che_id: string
      ten_tieu_chi: string
      mo_ta: string | null
      thu_tu: number | null
      so_luong_yeu_cau: number
    }, ExtArgs["result"]["tieuChi"]>
    composites: {}
  }

  type TieuChiGetPayload<S extends boolean | null | undefined | TieuChiDefaultArgs> = $Result.GetResult<Prisma.$TieuChiPayload, S>

  type TieuChiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TieuChiFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TieuChiCountAggregateInputType | true
    }

  export interface TieuChiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TieuChi'], meta: { name: 'TieuChi' } }
    /**
     * Find zero or one TieuChi that matches the filter.
     * @param {TieuChiFindUniqueArgs} args - Arguments to find a TieuChi
     * @example
     * // Get one TieuChi
     * const tieuChi = await prisma.tieuChi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TieuChiFindUniqueArgs>(args: SelectSubset<T, TieuChiFindUniqueArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TieuChi that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TieuChiFindUniqueOrThrowArgs} args - Arguments to find a TieuChi
     * @example
     * // Get one TieuChi
     * const tieuChi = await prisma.tieuChi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TieuChiFindUniqueOrThrowArgs>(args: SelectSubset<T, TieuChiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TieuChi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TieuChiFindFirstArgs} args - Arguments to find a TieuChi
     * @example
     * // Get one TieuChi
     * const tieuChi = await prisma.tieuChi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TieuChiFindFirstArgs>(args?: SelectSubset<T, TieuChiFindFirstArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TieuChi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TieuChiFindFirstOrThrowArgs} args - Arguments to find a TieuChi
     * @example
     * // Get one TieuChi
     * const tieuChi = await prisma.tieuChi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TieuChiFindFirstOrThrowArgs>(args?: SelectSubset<T, TieuChiFindFirstOrThrowArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TieuChis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TieuChiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TieuChis
     * const tieuChis = await prisma.tieuChi.findMany()
     * 
     * // Get first 10 TieuChis
     * const tieuChis = await prisma.tieuChi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tieuChiWithIdOnly = await prisma.tieuChi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TieuChiFindManyArgs>(args?: SelectSubset<T, TieuChiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TieuChi.
     * @param {TieuChiCreateArgs} args - Arguments to create a TieuChi.
     * @example
     * // Create one TieuChi
     * const TieuChi = await prisma.tieuChi.create({
     *   data: {
     *     // ... data to create a TieuChi
     *   }
     * })
     * 
     */
    create<T extends TieuChiCreateArgs>(args: SelectSubset<T, TieuChiCreateArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TieuChis.
     * @param {TieuChiCreateManyArgs} args - Arguments to create many TieuChis.
     * @example
     * // Create many TieuChis
     * const tieuChi = await prisma.tieuChi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TieuChiCreateManyArgs>(args?: SelectSubset<T, TieuChiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TieuChis and returns the data saved in the database.
     * @param {TieuChiCreateManyAndReturnArgs} args - Arguments to create many TieuChis.
     * @example
     * // Create many TieuChis
     * const tieuChi = await prisma.tieuChi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TieuChis and only return the `id`
     * const tieuChiWithIdOnly = await prisma.tieuChi.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TieuChiCreateManyAndReturnArgs>(args?: SelectSubset<T, TieuChiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TieuChi.
     * @param {TieuChiDeleteArgs} args - Arguments to delete one TieuChi.
     * @example
     * // Delete one TieuChi
     * const TieuChi = await prisma.tieuChi.delete({
     *   where: {
     *     // ... filter to delete one TieuChi
     *   }
     * })
     * 
     */
    delete<T extends TieuChiDeleteArgs>(args: SelectSubset<T, TieuChiDeleteArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TieuChi.
     * @param {TieuChiUpdateArgs} args - Arguments to update one TieuChi.
     * @example
     * // Update one TieuChi
     * const tieuChi = await prisma.tieuChi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TieuChiUpdateArgs>(args: SelectSubset<T, TieuChiUpdateArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TieuChis.
     * @param {TieuChiDeleteManyArgs} args - Arguments to filter TieuChis to delete.
     * @example
     * // Delete a few TieuChis
     * const { count } = await prisma.tieuChi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TieuChiDeleteManyArgs>(args?: SelectSubset<T, TieuChiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TieuChis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TieuChiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TieuChis
     * const tieuChi = await prisma.tieuChi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TieuChiUpdateManyArgs>(args: SelectSubset<T, TieuChiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TieuChi.
     * @param {TieuChiUpsertArgs} args - Arguments to update or create a TieuChi.
     * @example
     * // Update or create a TieuChi
     * const tieuChi = await prisma.tieuChi.upsert({
     *   create: {
     *     // ... data to create a TieuChi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TieuChi we want to update
     *   }
     * })
     */
    upsert<T extends TieuChiUpsertArgs>(args: SelectSubset<T, TieuChiUpsertArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TieuChis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TieuChiCountArgs} args - Arguments to filter TieuChis to count.
     * @example
     * // Count the number of TieuChis
     * const count = await prisma.tieuChi.count({
     *   where: {
     *     // ... the filter for the TieuChis we want to count
     *   }
     * })
    **/
    count<T extends TieuChiCountArgs>(
      args?: Subset<T, TieuChiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TieuChiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TieuChi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TieuChiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TieuChiAggregateArgs>(args: Subset<T, TieuChiAggregateArgs>): Prisma.PrismaPromise<GetTieuChiAggregateType<T>>

    /**
     * Group by TieuChi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TieuChiGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TieuChiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TieuChiGroupByArgs['orderBy'] }
        : { orderBy?: TieuChiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TieuChiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTieuChiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TieuChi model
   */
  readonly fields: TieuChiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TieuChi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TieuChiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quy_che<T extends QuyCheDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuyCheDefaultArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    hoat_dongs<T extends TieuChi$hoat_dongsArgs<ExtArgs> = {}>(args?: Subset<T, TieuChi$hoat_dongsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findMany"> | Null>
    minh_chungs<T extends TieuChi$minh_chungsArgs<ExtArgs> = {}>(args?: Subset<T, TieuChi$minh_chungsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TieuChi model
   */ 
  interface TieuChiFieldRefs {
    readonly id: FieldRef<"TieuChi", 'String'>
    readonly quy_che_id: FieldRef<"TieuChi", 'String'>
    readonly ten_tieu_chi: FieldRef<"TieuChi", 'String'>
    readonly mo_ta: FieldRef<"TieuChi", 'String'>
    readonly thu_tu: FieldRef<"TieuChi", 'Int'>
    readonly so_luong_yeu_cau: FieldRef<"TieuChi", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TieuChi findUnique
   */
  export type TieuChiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * Filter, which TieuChi to fetch.
     */
    where: TieuChiWhereUniqueInput
  }

  /**
   * TieuChi findUniqueOrThrow
   */
  export type TieuChiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * Filter, which TieuChi to fetch.
     */
    where: TieuChiWhereUniqueInput
  }

  /**
   * TieuChi findFirst
   */
  export type TieuChiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * Filter, which TieuChi to fetch.
     */
    where?: TieuChiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TieuChis to fetch.
     */
    orderBy?: TieuChiOrderByWithRelationInput | TieuChiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TieuChis.
     */
    cursor?: TieuChiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TieuChis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TieuChis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TieuChis.
     */
    distinct?: TieuChiScalarFieldEnum | TieuChiScalarFieldEnum[]
  }

  /**
   * TieuChi findFirstOrThrow
   */
  export type TieuChiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * Filter, which TieuChi to fetch.
     */
    where?: TieuChiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TieuChis to fetch.
     */
    orderBy?: TieuChiOrderByWithRelationInput | TieuChiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TieuChis.
     */
    cursor?: TieuChiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TieuChis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TieuChis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TieuChis.
     */
    distinct?: TieuChiScalarFieldEnum | TieuChiScalarFieldEnum[]
  }

  /**
   * TieuChi findMany
   */
  export type TieuChiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * Filter, which TieuChis to fetch.
     */
    where?: TieuChiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TieuChis to fetch.
     */
    orderBy?: TieuChiOrderByWithRelationInput | TieuChiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TieuChis.
     */
    cursor?: TieuChiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TieuChis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TieuChis.
     */
    skip?: number
    distinct?: TieuChiScalarFieldEnum | TieuChiScalarFieldEnum[]
  }

  /**
   * TieuChi create
   */
  export type TieuChiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * The data needed to create a TieuChi.
     */
    data: XOR<TieuChiCreateInput, TieuChiUncheckedCreateInput>
  }

  /**
   * TieuChi createMany
   */
  export type TieuChiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TieuChis.
     */
    data: TieuChiCreateManyInput | TieuChiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TieuChi createManyAndReturn
   */
  export type TieuChiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TieuChis.
     */
    data: TieuChiCreateManyInput | TieuChiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TieuChi update
   */
  export type TieuChiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * The data needed to update a TieuChi.
     */
    data: XOR<TieuChiUpdateInput, TieuChiUncheckedUpdateInput>
    /**
     * Choose, which TieuChi to update.
     */
    where: TieuChiWhereUniqueInput
  }

  /**
   * TieuChi updateMany
   */
  export type TieuChiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TieuChis.
     */
    data: XOR<TieuChiUpdateManyMutationInput, TieuChiUncheckedUpdateManyInput>
    /**
     * Filter which TieuChis to update
     */
    where?: TieuChiWhereInput
  }

  /**
   * TieuChi upsert
   */
  export type TieuChiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * The filter to search for the TieuChi to update in case it exists.
     */
    where: TieuChiWhereUniqueInput
    /**
     * In case the TieuChi found by the `where` argument doesn't exist, create a new TieuChi with this data.
     */
    create: XOR<TieuChiCreateInput, TieuChiUncheckedCreateInput>
    /**
     * In case the TieuChi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TieuChiUpdateInput, TieuChiUncheckedUpdateInput>
  }

  /**
   * TieuChi delete
   */
  export type TieuChiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    /**
     * Filter which TieuChi to delete.
     */
    where: TieuChiWhereUniqueInput
  }

  /**
   * TieuChi deleteMany
   */
  export type TieuChiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TieuChis to delete
     */
    where?: TieuChiWhereInput
  }

  /**
   * TieuChi.hoat_dongs
   */
  export type TieuChi$hoat_dongsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    where?: HoatDongWhereInput
    orderBy?: HoatDongOrderByWithRelationInput | HoatDongOrderByWithRelationInput[]
    cursor?: HoatDongWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoatDongScalarFieldEnum | HoatDongScalarFieldEnum[]
  }

  /**
   * TieuChi.minh_chungs
   */
  export type TieuChi$minh_chungsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    where?: MinhChungWhereInput
    orderBy?: MinhChungOrderByWithRelationInput | MinhChungOrderByWithRelationInput[]
    cursor?: MinhChungWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MinhChungScalarFieldEnum | MinhChungScalarFieldEnum[]
  }

  /**
   * TieuChi without action
   */
  export type TieuChiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
  }


  /**
   * Model HoatDong
   */

  export type AggregateHoatDong = {
    _count: HoatDongCountAggregateOutputType | null
    _min: HoatDongMinAggregateOutputType | null
    _max: HoatDongMaxAggregateOutputType | null
  }

  export type HoatDongMinAggregateOutputType = {
    id: string | null
    ten_hoat_dong: string | null
    don_vi_tc_id: string | null
    thoi_gian_bat_dau: Date | null
    thoi_gian_ket_thuc: Date | null
    dia_diem: string | null
    hinh_thuc_dd: string | null
    trang_thai: string | null
    nguoi_duyet_id: string | null
    ly_do_tu_choi: string | null
    created_at: Date | null
  }

  export type HoatDongMaxAggregateOutputType = {
    id: string | null
    ten_hoat_dong: string | null
    don_vi_tc_id: string | null
    thoi_gian_bat_dau: Date | null
    thoi_gian_ket_thuc: Date | null
    dia_diem: string | null
    hinh_thuc_dd: string | null
    trang_thai: string | null
    nguoi_duyet_id: string | null
    ly_do_tu_choi: string | null
    created_at: Date | null
  }

  export type HoatDongCountAggregateOutputType = {
    id: number
    ten_hoat_dong: number
    don_vi_tc_id: number
    thoi_gian_bat_dau: number
    thoi_gian_ket_thuc: number
    dia_diem: number
    hinh_thuc_dd: number
    trang_thai: number
    nguoi_duyet_id: number
    ly_do_tu_choi: number
    created_at: number
    _all: number
  }


  export type HoatDongMinAggregateInputType = {
    id?: true
    ten_hoat_dong?: true
    don_vi_tc_id?: true
    thoi_gian_bat_dau?: true
    thoi_gian_ket_thuc?: true
    dia_diem?: true
    hinh_thuc_dd?: true
    trang_thai?: true
    nguoi_duyet_id?: true
    ly_do_tu_choi?: true
    created_at?: true
  }

  export type HoatDongMaxAggregateInputType = {
    id?: true
    ten_hoat_dong?: true
    don_vi_tc_id?: true
    thoi_gian_bat_dau?: true
    thoi_gian_ket_thuc?: true
    dia_diem?: true
    hinh_thuc_dd?: true
    trang_thai?: true
    nguoi_duyet_id?: true
    ly_do_tu_choi?: true
    created_at?: true
  }

  export type HoatDongCountAggregateInputType = {
    id?: true
    ten_hoat_dong?: true
    don_vi_tc_id?: true
    thoi_gian_bat_dau?: true
    thoi_gian_ket_thuc?: true
    dia_diem?: true
    hinh_thuc_dd?: true
    trang_thai?: true
    nguoi_duyet_id?: true
    ly_do_tu_choi?: true
    created_at?: true
    _all?: true
  }

  export type HoatDongAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HoatDong to aggregate.
     */
    where?: HoatDongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoatDongs to fetch.
     */
    orderBy?: HoatDongOrderByWithRelationInput | HoatDongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoatDongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoatDongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoatDongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HoatDongs
    **/
    _count?: true | HoatDongCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoatDongMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoatDongMaxAggregateInputType
  }

  export type GetHoatDongAggregateType<T extends HoatDongAggregateArgs> = {
        [P in keyof T & keyof AggregateHoatDong]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHoatDong[P]>
      : GetScalarType<T[P], AggregateHoatDong[P]>
  }




  export type HoatDongGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoatDongWhereInput
    orderBy?: HoatDongOrderByWithAggregationInput | HoatDongOrderByWithAggregationInput[]
    by: HoatDongScalarFieldEnum[] | HoatDongScalarFieldEnum
    having?: HoatDongScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoatDongCountAggregateInputType | true
    _min?: HoatDongMinAggregateInputType
    _max?: HoatDongMaxAggregateInputType
  }

  export type HoatDongGroupByOutputType = {
    id: string
    ten_hoat_dong: string
    don_vi_tc_id: string
    thoi_gian_bat_dau: Date
    thoi_gian_ket_thuc: Date
    dia_diem: string | null
    hinh_thuc_dd: string
    trang_thai: string
    nguoi_duyet_id: string | null
    ly_do_tu_choi: string | null
    created_at: Date
    _count: HoatDongCountAggregateOutputType | null
    _min: HoatDongMinAggregateOutputType | null
    _max: HoatDongMaxAggregateOutputType | null
  }

  type GetHoatDongGroupByPayload<T extends HoatDongGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoatDongGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoatDongGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoatDongGroupByOutputType[P]>
            : GetScalarType<T[P], HoatDongGroupByOutputType[P]>
        }
      >
    >


  export type HoatDongSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ten_hoat_dong?: boolean
    don_vi_tc_id?: boolean
    thoi_gian_bat_dau?: boolean
    thoi_gian_ket_thuc?: boolean
    dia_diem?: boolean
    hinh_thuc_dd?: boolean
    trang_thai?: boolean
    nguoi_duyet_id?: boolean
    ly_do_tu_choi?: boolean
    created_at?: boolean
    don_vi_tc?: boolean | DonViDefaultArgs<ExtArgs>
    nguoi_duyet?: boolean | HoatDong$nguoi_duyetArgs<ExtArgs>
    tieu_chis?: boolean | HoatDong$tieu_chisArgs<ExtArgs>
    diem_danhs?: boolean | HoatDong$diem_danhsArgs<ExtArgs>
    _count?: boolean | HoatDongCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hoatDong"]>

  export type HoatDongSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ten_hoat_dong?: boolean
    don_vi_tc_id?: boolean
    thoi_gian_bat_dau?: boolean
    thoi_gian_ket_thuc?: boolean
    dia_diem?: boolean
    hinh_thuc_dd?: boolean
    trang_thai?: boolean
    nguoi_duyet_id?: boolean
    ly_do_tu_choi?: boolean
    created_at?: boolean
    don_vi_tc?: boolean | DonViDefaultArgs<ExtArgs>
    nguoi_duyet?: boolean | HoatDong$nguoi_duyetArgs<ExtArgs>
  }, ExtArgs["result"]["hoatDong"]>

  export type HoatDongSelectScalar = {
    id?: boolean
    ten_hoat_dong?: boolean
    don_vi_tc_id?: boolean
    thoi_gian_bat_dau?: boolean
    thoi_gian_ket_thuc?: boolean
    dia_diem?: boolean
    hinh_thuc_dd?: boolean
    trang_thai?: boolean
    nguoi_duyet_id?: boolean
    ly_do_tu_choi?: boolean
    created_at?: boolean
  }

  export type HoatDongInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    don_vi_tc?: boolean | DonViDefaultArgs<ExtArgs>
    nguoi_duyet?: boolean | HoatDong$nguoi_duyetArgs<ExtArgs>
    tieu_chis?: boolean | HoatDong$tieu_chisArgs<ExtArgs>
    diem_danhs?: boolean | HoatDong$diem_danhsArgs<ExtArgs>
    _count?: boolean | HoatDongCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HoatDongIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    don_vi_tc?: boolean | DonViDefaultArgs<ExtArgs>
    nguoi_duyet?: boolean | HoatDong$nguoi_duyetArgs<ExtArgs>
  }

  export type $HoatDongPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HoatDong"
    objects: {
      don_vi_tc: Prisma.$DonViPayload<ExtArgs>
      nguoi_duyet: Prisma.$NguoiDungPayload<ExtArgs> | null
      tieu_chis: Prisma.$TieuChiPayload<ExtArgs>[]
      diem_danhs: Prisma.$DiemDanhPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ten_hoat_dong: string
      don_vi_tc_id: string
      thoi_gian_bat_dau: Date
      thoi_gian_ket_thuc: Date
      dia_diem: string | null
      hinh_thuc_dd: string
      trang_thai: string
      nguoi_duyet_id: string | null
      ly_do_tu_choi: string | null
      created_at: Date
    }, ExtArgs["result"]["hoatDong"]>
    composites: {}
  }

  type HoatDongGetPayload<S extends boolean | null | undefined | HoatDongDefaultArgs> = $Result.GetResult<Prisma.$HoatDongPayload, S>

  type HoatDongCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HoatDongFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HoatDongCountAggregateInputType | true
    }

  export interface HoatDongDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HoatDong'], meta: { name: 'HoatDong' } }
    /**
     * Find zero or one HoatDong that matches the filter.
     * @param {HoatDongFindUniqueArgs} args - Arguments to find a HoatDong
     * @example
     * // Get one HoatDong
     * const hoatDong = await prisma.hoatDong.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoatDongFindUniqueArgs>(args: SelectSubset<T, HoatDongFindUniqueArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HoatDong that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HoatDongFindUniqueOrThrowArgs} args - Arguments to find a HoatDong
     * @example
     * // Get one HoatDong
     * const hoatDong = await prisma.hoatDong.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoatDongFindUniqueOrThrowArgs>(args: SelectSubset<T, HoatDongFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HoatDong that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoatDongFindFirstArgs} args - Arguments to find a HoatDong
     * @example
     * // Get one HoatDong
     * const hoatDong = await prisma.hoatDong.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoatDongFindFirstArgs>(args?: SelectSubset<T, HoatDongFindFirstArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HoatDong that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoatDongFindFirstOrThrowArgs} args - Arguments to find a HoatDong
     * @example
     * // Get one HoatDong
     * const hoatDong = await prisma.hoatDong.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoatDongFindFirstOrThrowArgs>(args?: SelectSubset<T, HoatDongFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HoatDongs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoatDongFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HoatDongs
     * const hoatDongs = await prisma.hoatDong.findMany()
     * 
     * // Get first 10 HoatDongs
     * const hoatDongs = await prisma.hoatDong.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hoatDongWithIdOnly = await prisma.hoatDong.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HoatDongFindManyArgs>(args?: SelectSubset<T, HoatDongFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HoatDong.
     * @param {HoatDongCreateArgs} args - Arguments to create a HoatDong.
     * @example
     * // Create one HoatDong
     * const HoatDong = await prisma.hoatDong.create({
     *   data: {
     *     // ... data to create a HoatDong
     *   }
     * })
     * 
     */
    create<T extends HoatDongCreateArgs>(args: SelectSubset<T, HoatDongCreateArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HoatDongs.
     * @param {HoatDongCreateManyArgs} args - Arguments to create many HoatDongs.
     * @example
     * // Create many HoatDongs
     * const hoatDong = await prisma.hoatDong.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoatDongCreateManyArgs>(args?: SelectSubset<T, HoatDongCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HoatDongs and returns the data saved in the database.
     * @param {HoatDongCreateManyAndReturnArgs} args - Arguments to create many HoatDongs.
     * @example
     * // Create many HoatDongs
     * const hoatDong = await prisma.hoatDong.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HoatDongs and only return the `id`
     * const hoatDongWithIdOnly = await prisma.hoatDong.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HoatDongCreateManyAndReturnArgs>(args?: SelectSubset<T, HoatDongCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a HoatDong.
     * @param {HoatDongDeleteArgs} args - Arguments to delete one HoatDong.
     * @example
     * // Delete one HoatDong
     * const HoatDong = await prisma.hoatDong.delete({
     *   where: {
     *     // ... filter to delete one HoatDong
     *   }
     * })
     * 
     */
    delete<T extends HoatDongDeleteArgs>(args: SelectSubset<T, HoatDongDeleteArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HoatDong.
     * @param {HoatDongUpdateArgs} args - Arguments to update one HoatDong.
     * @example
     * // Update one HoatDong
     * const hoatDong = await prisma.hoatDong.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoatDongUpdateArgs>(args: SelectSubset<T, HoatDongUpdateArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HoatDongs.
     * @param {HoatDongDeleteManyArgs} args - Arguments to filter HoatDongs to delete.
     * @example
     * // Delete a few HoatDongs
     * const { count } = await prisma.hoatDong.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoatDongDeleteManyArgs>(args?: SelectSubset<T, HoatDongDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HoatDongs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoatDongUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HoatDongs
     * const hoatDong = await prisma.hoatDong.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoatDongUpdateManyArgs>(args: SelectSubset<T, HoatDongUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HoatDong.
     * @param {HoatDongUpsertArgs} args - Arguments to update or create a HoatDong.
     * @example
     * // Update or create a HoatDong
     * const hoatDong = await prisma.hoatDong.upsert({
     *   create: {
     *     // ... data to create a HoatDong
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HoatDong we want to update
     *   }
     * })
     */
    upsert<T extends HoatDongUpsertArgs>(args: SelectSubset<T, HoatDongUpsertArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HoatDongs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoatDongCountArgs} args - Arguments to filter HoatDongs to count.
     * @example
     * // Count the number of HoatDongs
     * const count = await prisma.hoatDong.count({
     *   where: {
     *     // ... the filter for the HoatDongs we want to count
     *   }
     * })
    **/
    count<T extends HoatDongCountArgs>(
      args?: Subset<T, HoatDongCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoatDongCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HoatDong.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoatDongAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HoatDongAggregateArgs>(args: Subset<T, HoatDongAggregateArgs>): Prisma.PrismaPromise<GetHoatDongAggregateType<T>>

    /**
     * Group by HoatDong.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoatDongGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HoatDongGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoatDongGroupByArgs['orderBy'] }
        : { orderBy?: HoatDongGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HoatDongGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoatDongGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HoatDong model
   */
  readonly fields: HoatDongFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HoatDong.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoatDongClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    don_vi_tc<T extends DonViDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DonViDefaultArgs<ExtArgs>>): Prisma__DonViClient<$Result.GetResult<Prisma.$DonViPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    nguoi_duyet<T extends HoatDong$nguoi_duyetArgs<ExtArgs> = {}>(args?: Subset<T, HoatDong$nguoi_duyetArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    tieu_chis<T extends HoatDong$tieu_chisArgs<ExtArgs> = {}>(args?: Subset<T, HoatDong$tieu_chisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "findMany"> | Null>
    diem_danhs<T extends HoatDong$diem_danhsArgs<ExtArgs> = {}>(args?: Subset<T, HoatDong$diem_danhsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HoatDong model
   */ 
  interface HoatDongFieldRefs {
    readonly id: FieldRef<"HoatDong", 'String'>
    readonly ten_hoat_dong: FieldRef<"HoatDong", 'String'>
    readonly don_vi_tc_id: FieldRef<"HoatDong", 'String'>
    readonly thoi_gian_bat_dau: FieldRef<"HoatDong", 'DateTime'>
    readonly thoi_gian_ket_thuc: FieldRef<"HoatDong", 'DateTime'>
    readonly dia_diem: FieldRef<"HoatDong", 'String'>
    readonly hinh_thuc_dd: FieldRef<"HoatDong", 'String'>
    readonly trang_thai: FieldRef<"HoatDong", 'String'>
    readonly nguoi_duyet_id: FieldRef<"HoatDong", 'String'>
    readonly ly_do_tu_choi: FieldRef<"HoatDong", 'String'>
    readonly created_at: FieldRef<"HoatDong", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HoatDong findUnique
   */
  export type HoatDongFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * Filter, which HoatDong to fetch.
     */
    where: HoatDongWhereUniqueInput
  }

  /**
   * HoatDong findUniqueOrThrow
   */
  export type HoatDongFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * Filter, which HoatDong to fetch.
     */
    where: HoatDongWhereUniqueInput
  }

  /**
   * HoatDong findFirst
   */
  export type HoatDongFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * Filter, which HoatDong to fetch.
     */
    where?: HoatDongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoatDongs to fetch.
     */
    orderBy?: HoatDongOrderByWithRelationInput | HoatDongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HoatDongs.
     */
    cursor?: HoatDongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoatDongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoatDongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HoatDongs.
     */
    distinct?: HoatDongScalarFieldEnum | HoatDongScalarFieldEnum[]
  }

  /**
   * HoatDong findFirstOrThrow
   */
  export type HoatDongFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * Filter, which HoatDong to fetch.
     */
    where?: HoatDongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoatDongs to fetch.
     */
    orderBy?: HoatDongOrderByWithRelationInput | HoatDongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HoatDongs.
     */
    cursor?: HoatDongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoatDongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoatDongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HoatDongs.
     */
    distinct?: HoatDongScalarFieldEnum | HoatDongScalarFieldEnum[]
  }

  /**
   * HoatDong findMany
   */
  export type HoatDongFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * Filter, which HoatDongs to fetch.
     */
    where?: HoatDongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoatDongs to fetch.
     */
    orderBy?: HoatDongOrderByWithRelationInput | HoatDongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HoatDongs.
     */
    cursor?: HoatDongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoatDongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoatDongs.
     */
    skip?: number
    distinct?: HoatDongScalarFieldEnum | HoatDongScalarFieldEnum[]
  }

  /**
   * HoatDong create
   */
  export type HoatDongCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * The data needed to create a HoatDong.
     */
    data: XOR<HoatDongCreateInput, HoatDongUncheckedCreateInput>
  }

  /**
   * HoatDong createMany
   */
  export type HoatDongCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HoatDongs.
     */
    data: HoatDongCreateManyInput | HoatDongCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HoatDong createManyAndReturn
   */
  export type HoatDongCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HoatDongs.
     */
    data: HoatDongCreateManyInput | HoatDongCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HoatDong update
   */
  export type HoatDongUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * The data needed to update a HoatDong.
     */
    data: XOR<HoatDongUpdateInput, HoatDongUncheckedUpdateInput>
    /**
     * Choose, which HoatDong to update.
     */
    where: HoatDongWhereUniqueInput
  }

  /**
   * HoatDong updateMany
   */
  export type HoatDongUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HoatDongs.
     */
    data: XOR<HoatDongUpdateManyMutationInput, HoatDongUncheckedUpdateManyInput>
    /**
     * Filter which HoatDongs to update
     */
    where?: HoatDongWhereInput
  }

  /**
   * HoatDong upsert
   */
  export type HoatDongUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * The filter to search for the HoatDong to update in case it exists.
     */
    where: HoatDongWhereUniqueInput
    /**
     * In case the HoatDong found by the `where` argument doesn't exist, create a new HoatDong with this data.
     */
    create: XOR<HoatDongCreateInput, HoatDongUncheckedCreateInput>
    /**
     * In case the HoatDong was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoatDongUpdateInput, HoatDongUncheckedUpdateInput>
  }

  /**
   * HoatDong delete
   */
  export type HoatDongDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
    /**
     * Filter which HoatDong to delete.
     */
    where: HoatDongWhereUniqueInput
  }

  /**
   * HoatDong deleteMany
   */
  export type HoatDongDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HoatDongs to delete
     */
    where?: HoatDongWhereInput
  }

  /**
   * HoatDong.nguoi_duyet
   */
  export type HoatDong$nguoi_duyetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoiDung
     */
    select?: NguoiDungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NguoiDungInclude<ExtArgs> | null
    where?: NguoiDungWhereInput
  }

  /**
   * HoatDong.tieu_chis
   */
  export type HoatDong$tieu_chisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    where?: TieuChiWhereInput
    orderBy?: TieuChiOrderByWithRelationInput | TieuChiOrderByWithRelationInput[]
    cursor?: TieuChiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TieuChiScalarFieldEnum | TieuChiScalarFieldEnum[]
  }

  /**
   * HoatDong.diem_danhs
   */
  export type HoatDong$diem_danhsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    where?: DiemDanhWhereInput
    orderBy?: DiemDanhOrderByWithRelationInput | DiemDanhOrderByWithRelationInput[]
    cursor?: DiemDanhWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiemDanhScalarFieldEnum | DiemDanhScalarFieldEnum[]
  }

  /**
   * HoatDong without action
   */
  export type HoatDongDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoatDong
     */
    select?: HoatDongSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoatDongInclude<ExtArgs> | null
  }


  /**
   * Model DiemDanh
   */

  export type AggregateDiemDanh = {
    _count: DiemDanhCountAggregateOutputType | null
    _min: DiemDanhMinAggregateOutputType | null
    _max: DiemDanhMaxAggregateOutputType | null
  }

  export type DiemDanhMinAggregateOutputType = {
    id: string | null
    hoat_dong_id: string | null
    nguoi_dung_id: string | null
    phuong_thuc: string | null
    thoi_gian: Date | null
    da_chot: boolean | null
  }

  export type DiemDanhMaxAggregateOutputType = {
    id: string | null
    hoat_dong_id: string | null
    nguoi_dung_id: string | null
    phuong_thuc: string | null
    thoi_gian: Date | null
    da_chot: boolean | null
  }

  export type DiemDanhCountAggregateOutputType = {
    id: number
    hoat_dong_id: number
    nguoi_dung_id: number
    phuong_thuc: number
    thoi_gian: number
    da_chot: number
    _all: number
  }


  export type DiemDanhMinAggregateInputType = {
    id?: true
    hoat_dong_id?: true
    nguoi_dung_id?: true
    phuong_thuc?: true
    thoi_gian?: true
    da_chot?: true
  }

  export type DiemDanhMaxAggregateInputType = {
    id?: true
    hoat_dong_id?: true
    nguoi_dung_id?: true
    phuong_thuc?: true
    thoi_gian?: true
    da_chot?: true
  }

  export type DiemDanhCountAggregateInputType = {
    id?: true
    hoat_dong_id?: true
    nguoi_dung_id?: true
    phuong_thuc?: true
    thoi_gian?: true
    da_chot?: true
    _all?: true
  }

  export type DiemDanhAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiemDanh to aggregate.
     */
    where?: DiemDanhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiemDanhs to fetch.
     */
    orderBy?: DiemDanhOrderByWithRelationInput | DiemDanhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiemDanhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiemDanhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiemDanhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiemDanhs
    **/
    _count?: true | DiemDanhCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiemDanhMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiemDanhMaxAggregateInputType
  }

  export type GetDiemDanhAggregateType<T extends DiemDanhAggregateArgs> = {
        [P in keyof T & keyof AggregateDiemDanh]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiemDanh[P]>
      : GetScalarType<T[P], AggregateDiemDanh[P]>
  }




  export type DiemDanhGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiemDanhWhereInput
    orderBy?: DiemDanhOrderByWithAggregationInput | DiemDanhOrderByWithAggregationInput[]
    by: DiemDanhScalarFieldEnum[] | DiemDanhScalarFieldEnum
    having?: DiemDanhScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiemDanhCountAggregateInputType | true
    _min?: DiemDanhMinAggregateInputType
    _max?: DiemDanhMaxAggregateInputType
  }

  export type DiemDanhGroupByOutputType = {
    id: string
    hoat_dong_id: string
    nguoi_dung_id: string
    phuong_thuc: string
    thoi_gian: Date
    da_chot: boolean
    _count: DiemDanhCountAggregateOutputType | null
    _min: DiemDanhMinAggregateOutputType | null
    _max: DiemDanhMaxAggregateOutputType | null
  }

  type GetDiemDanhGroupByPayload<T extends DiemDanhGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiemDanhGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiemDanhGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiemDanhGroupByOutputType[P]>
            : GetScalarType<T[P], DiemDanhGroupByOutputType[P]>
        }
      >
    >


  export type DiemDanhSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hoat_dong_id?: boolean
    nguoi_dung_id?: boolean
    phuong_thuc?: boolean
    thoi_gian?: boolean
    da_chot?: boolean
    hoat_dong?: boolean | HoatDongDefaultArgs<ExtArgs>
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["diemDanh"]>

  export type DiemDanhSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hoat_dong_id?: boolean
    nguoi_dung_id?: boolean
    phuong_thuc?: boolean
    thoi_gian?: boolean
    da_chot?: boolean
    hoat_dong?: boolean | HoatDongDefaultArgs<ExtArgs>
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["diemDanh"]>

  export type DiemDanhSelectScalar = {
    id?: boolean
    hoat_dong_id?: boolean
    nguoi_dung_id?: boolean
    phuong_thuc?: boolean
    thoi_gian?: boolean
    da_chot?: boolean
  }

  export type DiemDanhInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hoat_dong?: boolean | HoatDongDefaultArgs<ExtArgs>
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
  }
  export type DiemDanhIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hoat_dong?: boolean | HoatDongDefaultArgs<ExtArgs>
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
  }

  export type $DiemDanhPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiemDanh"
    objects: {
      hoat_dong: Prisma.$HoatDongPayload<ExtArgs>
      nguoi_dung: Prisma.$NguoiDungPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hoat_dong_id: string
      nguoi_dung_id: string
      phuong_thuc: string
      thoi_gian: Date
      da_chot: boolean
    }, ExtArgs["result"]["diemDanh"]>
    composites: {}
  }

  type DiemDanhGetPayload<S extends boolean | null | undefined | DiemDanhDefaultArgs> = $Result.GetResult<Prisma.$DiemDanhPayload, S>

  type DiemDanhCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DiemDanhFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DiemDanhCountAggregateInputType | true
    }

  export interface DiemDanhDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiemDanh'], meta: { name: 'DiemDanh' } }
    /**
     * Find zero or one DiemDanh that matches the filter.
     * @param {DiemDanhFindUniqueArgs} args - Arguments to find a DiemDanh
     * @example
     * // Get one DiemDanh
     * const diemDanh = await prisma.diemDanh.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiemDanhFindUniqueArgs>(args: SelectSubset<T, DiemDanhFindUniqueArgs<ExtArgs>>): Prisma__DiemDanhClient<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DiemDanh that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DiemDanhFindUniqueOrThrowArgs} args - Arguments to find a DiemDanh
     * @example
     * // Get one DiemDanh
     * const diemDanh = await prisma.diemDanh.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiemDanhFindUniqueOrThrowArgs>(args: SelectSubset<T, DiemDanhFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiemDanhClient<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DiemDanh that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiemDanhFindFirstArgs} args - Arguments to find a DiemDanh
     * @example
     * // Get one DiemDanh
     * const diemDanh = await prisma.diemDanh.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiemDanhFindFirstArgs>(args?: SelectSubset<T, DiemDanhFindFirstArgs<ExtArgs>>): Prisma__DiemDanhClient<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DiemDanh that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiemDanhFindFirstOrThrowArgs} args - Arguments to find a DiemDanh
     * @example
     * // Get one DiemDanh
     * const diemDanh = await prisma.diemDanh.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiemDanhFindFirstOrThrowArgs>(args?: SelectSubset<T, DiemDanhFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiemDanhClient<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DiemDanhs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiemDanhFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiemDanhs
     * const diemDanhs = await prisma.diemDanh.findMany()
     * 
     * // Get first 10 DiemDanhs
     * const diemDanhs = await prisma.diemDanh.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const diemDanhWithIdOnly = await prisma.diemDanh.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiemDanhFindManyArgs>(args?: SelectSubset<T, DiemDanhFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DiemDanh.
     * @param {DiemDanhCreateArgs} args - Arguments to create a DiemDanh.
     * @example
     * // Create one DiemDanh
     * const DiemDanh = await prisma.diemDanh.create({
     *   data: {
     *     // ... data to create a DiemDanh
     *   }
     * })
     * 
     */
    create<T extends DiemDanhCreateArgs>(args: SelectSubset<T, DiemDanhCreateArgs<ExtArgs>>): Prisma__DiemDanhClient<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DiemDanhs.
     * @param {DiemDanhCreateManyArgs} args - Arguments to create many DiemDanhs.
     * @example
     * // Create many DiemDanhs
     * const diemDanh = await prisma.diemDanh.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiemDanhCreateManyArgs>(args?: SelectSubset<T, DiemDanhCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiemDanhs and returns the data saved in the database.
     * @param {DiemDanhCreateManyAndReturnArgs} args - Arguments to create many DiemDanhs.
     * @example
     * // Create many DiemDanhs
     * const diemDanh = await prisma.diemDanh.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiemDanhs and only return the `id`
     * const diemDanhWithIdOnly = await prisma.diemDanh.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiemDanhCreateManyAndReturnArgs>(args?: SelectSubset<T, DiemDanhCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DiemDanh.
     * @param {DiemDanhDeleteArgs} args - Arguments to delete one DiemDanh.
     * @example
     * // Delete one DiemDanh
     * const DiemDanh = await prisma.diemDanh.delete({
     *   where: {
     *     // ... filter to delete one DiemDanh
     *   }
     * })
     * 
     */
    delete<T extends DiemDanhDeleteArgs>(args: SelectSubset<T, DiemDanhDeleteArgs<ExtArgs>>): Prisma__DiemDanhClient<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DiemDanh.
     * @param {DiemDanhUpdateArgs} args - Arguments to update one DiemDanh.
     * @example
     * // Update one DiemDanh
     * const diemDanh = await prisma.diemDanh.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiemDanhUpdateArgs>(args: SelectSubset<T, DiemDanhUpdateArgs<ExtArgs>>): Prisma__DiemDanhClient<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DiemDanhs.
     * @param {DiemDanhDeleteManyArgs} args - Arguments to filter DiemDanhs to delete.
     * @example
     * // Delete a few DiemDanhs
     * const { count } = await prisma.diemDanh.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiemDanhDeleteManyArgs>(args?: SelectSubset<T, DiemDanhDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiemDanhs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiemDanhUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiemDanhs
     * const diemDanh = await prisma.diemDanh.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiemDanhUpdateManyArgs>(args: SelectSubset<T, DiemDanhUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DiemDanh.
     * @param {DiemDanhUpsertArgs} args - Arguments to update or create a DiemDanh.
     * @example
     * // Update or create a DiemDanh
     * const diemDanh = await prisma.diemDanh.upsert({
     *   create: {
     *     // ... data to create a DiemDanh
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiemDanh we want to update
     *   }
     * })
     */
    upsert<T extends DiemDanhUpsertArgs>(args: SelectSubset<T, DiemDanhUpsertArgs<ExtArgs>>): Prisma__DiemDanhClient<$Result.GetResult<Prisma.$DiemDanhPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DiemDanhs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiemDanhCountArgs} args - Arguments to filter DiemDanhs to count.
     * @example
     * // Count the number of DiemDanhs
     * const count = await prisma.diemDanh.count({
     *   where: {
     *     // ... the filter for the DiemDanhs we want to count
     *   }
     * })
    **/
    count<T extends DiemDanhCountArgs>(
      args?: Subset<T, DiemDanhCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiemDanhCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiemDanh.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiemDanhAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiemDanhAggregateArgs>(args: Subset<T, DiemDanhAggregateArgs>): Prisma.PrismaPromise<GetDiemDanhAggregateType<T>>

    /**
     * Group by DiemDanh.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiemDanhGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiemDanhGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiemDanhGroupByArgs['orderBy'] }
        : { orderBy?: DiemDanhGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiemDanhGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiemDanhGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiemDanh model
   */
  readonly fields: DiemDanhFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiemDanh.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiemDanhClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hoat_dong<T extends HoatDongDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HoatDongDefaultArgs<ExtArgs>>): Prisma__HoatDongClient<$Result.GetResult<Prisma.$HoatDongPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    nguoi_dung<T extends NguoiDungDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NguoiDungDefaultArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DiemDanh model
   */ 
  interface DiemDanhFieldRefs {
    readonly id: FieldRef<"DiemDanh", 'String'>
    readonly hoat_dong_id: FieldRef<"DiemDanh", 'String'>
    readonly nguoi_dung_id: FieldRef<"DiemDanh", 'String'>
    readonly phuong_thuc: FieldRef<"DiemDanh", 'String'>
    readonly thoi_gian: FieldRef<"DiemDanh", 'DateTime'>
    readonly da_chot: FieldRef<"DiemDanh", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * DiemDanh findUnique
   */
  export type DiemDanhFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * Filter, which DiemDanh to fetch.
     */
    where: DiemDanhWhereUniqueInput
  }

  /**
   * DiemDanh findUniqueOrThrow
   */
  export type DiemDanhFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * Filter, which DiemDanh to fetch.
     */
    where: DiemDanhWhereUniqueInput
  }

  /**
   * DiemDanh findFirst
   */
  export type DiemDanhFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * Filter, which DiemDanh to fetch.
     */
    where?: DiemDanhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiemDanhs to fetch.
     */
    orderBy?: DiemDanhOrderByWithRelationInput | DiemDanhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiemDanhs.
     */
    cursor?: DiemDanhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiemDanhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiemDanhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiemDanhs.
     */
    distinct?: DiemDanhScalarFieldEnum | DiemDanhScalarFieldEnum[]
  }

  /**
   * DiemDanh findFirstOrThrow
   */
  export type DiemDanhFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * Filter, which DiemDanh to fetch.
     */
    where?: DiemDanhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiemDanhs to fetch.
     */
    orderBy?: DiemDanhOrderByWithRelationInput | DiemDanhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiemDanhs.
     */
    cursor?: DiemDanhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiemDanhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiemDanhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiemDanhs.
     */
    distinct?: DiemDanhScalarFieldEnum | DiemDanhScalarFieldEnum[]
  }

  /**
   * DiemDanh findMany
   */
  export type DiemDanhFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * Filter, which DiemDanhs to fetch.
     */
    where?: DiemDanhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiemDanhs to fetch.
     */
    orderBy?: DiemDanhOrderByWithRelationInput | DiemDanhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiemDanhs.
     */
    cursor?: DiemDanhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiemDanhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiemDanhs.
     */
    skip?: number
    distinct?: DiemDanhScalarFieldEnum | DiemDanhScalarFieldEnum[]
  }

  /**
   * DiemDanh create
   */
  export type DiemDanhCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * The data needed to create a DiemDanh.
     */
    data: XOR<DiemDanhCreateInput, DiemDanhUncheckedCreateInput>
  }

  /**
   * DiemDanh createMany
   */
  export type DiemDanhCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiemDanhs.
     */
    data: DiemDanhCreateManyInput | DiemDanhCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiemDanh createManyAndReturn
   */
  export type DiemDanhCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DiemDanhs.
     */
    data: DiemDanhCreateManyInput | DiemDanhCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiemDanh update
   */
  export type DiemDanhUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * The data needed to update a DiemDanh.
     */
    data: XOR<DiemDanhUpdateInput, DiemDanhUncheckedUpdateInput>
    /**
     * Choose, which DiemDanh to update.
     */
    where: DiemDanhWhereUniqueInput
  }

  /**
   * DiemDanh updateMany
   */
  export type DiemDanhUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiemDanhs.
     */
    data: XOR<DiemDanhUpdateManyMutationInput, DiemDanhUncheckedUpdateManyInput>
    /**
     * Filter which DiemDanhs to update
     */
    where?: DiemDanhWhereInput
  }

  /**
   * DiemDanh upsert
   */
  export type DiemDanhUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * The filter to search for the DiemDanh to update in case it exists.
     */
    where: DiemDanhWhereUniqueInput
    /**
     * In case the DiemDanh found by the `where` argument doesn't exist, create a new DiemDanh with this data.
     */
    create: XOR<DiemDanhCreateInput, DiemDanhUncheckedCreateInput>
    /**
     * In case the DiemDanh was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiemDanhUpdateInput, DiemDanhUncheckedUpdateInput>
  }

  /**
   * DiemDanh delete
   */
  export type DiemDanhDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
    /**
     * Filter which DiemDanh to delete.
     */
    where: DiemDanhWhereUniqueInput
  }

  /**
   * DiemDanh deleteMany
   */
  export type DiemDanhDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiemDanhs to delete
     */
    where?: DiemDanhWhereInput
  }

  /**
   * DiemDanh without action
   */
  export type DiemDanhDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiemDanh
     */
    select?: DiemDanhSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiemDanhInclude<ExtArgs> | null
  }


  /**
   * Model MinhChung
   */

  export type AggregateMinhChung = {
    _count: MinhChungCountAggregateOutputType | null
    _avg: MinhChungAvgAggregateOutputType | null
    _sum: MinhChungSumAggregateOutputType | null
    _min: MinhChungMinAggregateOutputType | null
    _max: MinhChungMaxAggregateOutputType | null
  }

  export type MinhChungAvgAggregateOutputType = {
    ai_xac_thuc_muc_do: number | null
  }

  export type MinhChungSumAggregateOutputType = {
    ai_xac_thuc_muc_do: number | null
  }

  export type MinhChungMinAggregateOutputType = {
    id: string | null
    nguoi_dung_id: string | null
    tieu_chi_id: string | null
    loai: string | null
    ten_minh_chung: string | null
    file_url: string | null
    trang_thai: string | null
    ai_xac_thuc_muc_do: number | null
    nguoi_duyet_id: string | null
    ly_do_loai: string | null
    created_at: Date | null
  }

  export type MinhChungMaxAggregateOutputType = {
    id: string | null
    nguoi_dung_id: string | null
    tieu_chi_id: string | null
    loai: string | null
    ten_minh_chung: string | null
    file_url: string | null
    trang_thai: string | null
    ai_xac_thuc_muc_do: number | null
    nguoi_duyet_id: string | null
    ly_do_loai: string | null
    created_at: Date | null
  }

  export type MinhChungCountAggregateOutputType = {
    id: number
    nguoi_dung_id: number
    tieu_chi_id: number
    loai: number
    ten_minh_chung: number
    file_url: number
    trang_thai: number
    ai_xac_thuc_muc_do: number
    nguoi_duyet_id: number
    ly_do_loai: number
    created_at: number
    _all: number
  }


  export type MinhChungAvgAggregateInputType = {
    ai_xac_thuc_muc_do?: true
  }

  export type MinhChungSumAggregateInputType = {
    ai_xac_thuc_muc_do?: true
  }

  export type MinhChungMinAggregateInputType = {
    id?: true
    nguoi_dung_id?: true
    tieu_chi_id?: true
    loai?: true
    ten_minh_chung?: true
    file_url?: true
    trang_thai?: true
    ai_xac_thuc_muc_do?: true
    nguoi_duyet_id?: true
    ly_do_loai?: true
    created_at?: true
  }

  export type MinhChungMaxAggregateInputType = {
    id?: true
    nguoi_dung_id?: true
    tieu_chi_id?: true
    loai?: true
    ten_minh_chung?: true
    file_url?: true
    trang_thai?: true
    ai_xac_thuc_muc_do?: true
    nguoi_duyet_id?: true
    ly_do_loai?: true
    created_at?: true
  }

  export type MinhChungCountAggregateInputType = {
    id?: true
    nguoi_dung_id?: true
    tieu_chi_id?: true
    loai?: true
    ten_minh_chung?: true
    file_url?: true
    trang_thai?: true
    ai_xac_thuc_muc_do?: true
    nguoi_duyet_id?: true
    ly_do_loai?: true
    created_at?: true
    _all?: true
  }

  export type MinhChungAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MinhChung to aggregate.
     */
    where?: MinhChungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MinhChungs to fetch.
     */
    orderBy?: MinhChungOrderByWithRelationInput | MinhChungOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MinhChungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MinhChungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MinhChungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MinhChungs
    **/
    _count?: true | MinhChungCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MinhChungAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MinhChungSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MinhChungMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MinhChungMaxAggregateInputType
  }

  export type GetMinhChungAggregateType<T extends MinhChungAggregateArgs> = {
        [P in keyof T & keyof AggregateMinhChung]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMinhChung[P]>
      : GetScalarType<T[P], AggregateMinhChung[P]>
  }




  export type MinhChungGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MinhChungWhereInput
    orderBy?: MinhChungOrderByWithAggregationInput | MinhChungOrderByWithAggregationInput[]
    by: MinhChungScalarFieldEnum[] | MinhChungScalarFieldEnum
    having?: MinhChungScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MinhChungCountAggregateInputType | true
    _avg?: MinhChungAvgAggregateInputType
    _sum?: MinhChungSumAggregateInputType
    _min?: MinhChungMinAggregateInputType
    _max?: MinhChungMaxAggregateInputType
  }

  export type MinhChungGroupByOutputType = {
    id: string
    nguoi_dung_id: string
    tieu_chi_id: string | null
    loai: string
    ten_minh_chung: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do: number | null
    nguoi_duyet_id: string | null
    ly_do_loai: string | null
    created_at: Date
    _count: MinhChungCountAggregateOutputType | null
    _avg: MinhChungAvgAggregateOutputType | null
    _sum: MinhChungSumAggregateOutputType | null
    _min: MinhChungMinAggregateOutputType | null
    _max: MinhChungMaxAggregateOutputType | null
  }

  type GetMinhChungGroupByPayload<T extends MinhChungGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MinhChungGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MinhChungGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MinhChungGroupByOutputType[P]>
            : GetScalarType<T[P], MinhChungGroupByOutputType[P]>
        }
      >
    >


  export type MinhChungSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nguoi_dung_id?: boolean
    tieu_chi_id?: boolean
    loai?: boolean
    ten_minh_chung?: boolean
    file_url?: boolean
    trang_thai?: boolean
    ai_xac_thuc_muc_do?: boolean
    nguoi_duyet_id?: boolean
    ly_do_loai?: boolean
    created_at?: boolean
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
    tieu_chi?: boolean | MinhChung$tieu_chiArgs<ExtArgs>
    ho_sos?: boolean | MinhChung$ho_sosArgs<ExtArgs>
    _count?: boolean | MinhChungCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["minhChung"]>

  export type MinhChungSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nguoi_dung_id?: boolean
    tieu_chi_id?: boolean
    loai?: boolean
    ten_minh_chung?: boolean
    file_url?: boolean
    trang_thai?: boolean
    ai_xac_thuc_muc_do?: boolean
    nguoi_duyet_id?: boolean
    ly_do_loai?: boolean
    created_at?: boolean
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
    tieu_chi?: boolean | MinhChung$tieu_chiArgs<ExtArgs>
  }, ExtArgs["result"]["minhChung"]>

  export type MinhChungSelectScalar = {
    id?: boolean
    nguoi_dung_id?: boolean
    tieu_chi_id?: boolean
    loai?: boolean
    ten_minh_chung?: boolean
    file_url?: boolean
    trang_thai?: boolean
    ai_xac_thuc_muc_do?: boolean
    nguoi_duyet_id?: boolean
    ly_do_loai?: boolean
    created_at?: boolean
  }

  export type MinhChungInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
    tieu_chi?: boolean | MinhChung$tieu_chiArgs<ExtArgs>
    ho_sos?: boolean | MinhChung$ho_sosArgs<ExtArgs>
    _count?: boolean | MinhChungCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MinhChungIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
    tieu_chi?: boolean | MinhChung$tieu_chiArgs<ExtArgs>
  }

  export type $MinhChungPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MinhChung"
    objects: {
      nguoi_dung: Prisma.$NguoiDungPayload<ExtArgs>
      tieu_chi: Prisma.$TieuChiPayload<ExtArgs> | null
      ho_sos: Prisma.$HoSoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nguoi_dung_id: string
      tieu_chi_id: string | null
      loai: string
      ten_minh_chung: string | null
      file_url: string
      trang_thai: string
      ai_xac_thuc_muc_do: number | null
      nguoi_duyet_id: string | null
      ly_do_loai: string | null
      created_at: Date
    }, ExtArgs["result"]["minhChung"]>
    composites: {}
  }

  type MinhChungGetPayload<S extends boolean | null | undefined | MinhChungDefaultArgs> = $Result.GetResult<Prisma.$MinhChungPayload, S>

  type MinhChungCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MinhChungFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MinhChungCountAggregateInputType | true
    }

  export interface MinhChungDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MinhChung'], meta: { name: 'MinhChung' } }
    /**
     * Find zero or one MinhChung that matches the filter.
     * @param {MinhChungFindUniqueArgs} args - Arguments to find a MinhChung
     * @example
     * // Get one MinhChung
     * const minhChung = await prisma.minhChung.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MinhChungFindUniqueArgs>(args: SelectSubset<T, MinhChungFindUniqueArgs<ExtArgs>>): Prisma__MinhChungClient<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MinhChung that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MinhChungFindUniqueOrThrowArgs} args - Arguments to find a MinhChung
     * @example
     * // Get one MinhChung
     * const minhChung = await prisma.minhChung.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MinhChungFindUniqueOrThrowArgs>(args: SelectSubset<T, MinhChungFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MinhChungClient<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MinhChung that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinhChungFindFirstArgs} args - Arguments to find a MinhChung
     * @example
     * // Get one MinhChung
     * const minhChung = await prisma.minhChung.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MinhChungFindFirstArgs>(args?: SelectSubset<T, MinhChungFindFirstArgs<ExtArgs>>): Prisma__MinhChungClient<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MinhChung that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinhChungFindFirstOrThrowArgs} args - Arguments to find a MinhChung
     * @example
     * // Get one MinhChung
     * const minhChung = await prisma.minhChung.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MinhChungFindFirstOrThrowArgs>(args?: SelectSubset<T, MinhChungFindFirstOrThrowArgs<ExtArgs>>): Prisma__MinhChungClient<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MinhChungs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinhChungFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MinhChungs
     * const minhChungs = await prisma.minhChung.findMany()
     * 
     * // Get first 10 MinhChungs
     * const minhChungs = await prisma.minhChung.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const minhChungWithIdOnly = await prisma.minhChung.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MinhChungFindManyArgs>(args?: SelectSubset<T, MinhChungFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MinhChung.
     * @param {MinhChungCreateArgs} args - Arguments to create a MinhChung.
     * @example
     * // Create one MinhChung
     * const MinhChung = await prisma.minhChung.create({
     *   data: {
     *     // ... data to create a MinhChung
     *   }
     * })
     * 
     */
    create<T extends MinhChungCreateArgs>(args: SelectSubset<T, MinhChungCreateArgs<ExtArgs>>): Prisma__MinhChungClient<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MinhChungs.
     * @param {MinhChungCreateManyArgs} args - Arguments to create many MinhChungs.
     * @example
     * // Create many MinhChungs
     * const minhChung = await prisma.minhChung.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MinhChungCreateManyArgs>(args?: SelectSubset<T, MinhChungCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MinhChungs and returns the data saved in the database.
     * @param {MinhChungCreateManyAndReturnArgs} args - Arguments to create many MinhChungs.
     * @example
     * // Create many MinhChungs
     * const minhChung = await prisma.minhChung.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MinhChungs and only return the `id`
     * const minhChungWithIdOnly = await prisma.minhChung.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MinhChungCreateManyAndReturnArgs>(args?: SelectSubset<T, MinhChungCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MinhChung.
     * @param {MinhChungDeleteArgs} args - Arguments to delete one MinhChung.
     * @example
     * // Delete one MinhChung
     * const MinhChung = await prisma.minhChung.delete({
     *   where: {
     *     // ... filter to delete one MinhChung
     *   }
     * })
     * 
     */
    delete<T extends MinhChungDeleteArgs>(args: SelectSubset<T, MinhChungDeleteArgs<ExtArgs>>): Prisma__MinhChungClient<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MinhChung.
     * @param {MinhChungUpdateArgs} args - Arguments to update one MinhChung.
     * @example
     * // Update one MinhChung
     * const minhChung = await prisma.minhChung.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MinhChungUpdateArgs>(args: SelectSubset<T, MinhChungUpdateArgs<ExtArgs>>): Prisma__MinhChungClient<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MinhChungs.
     * @param {MinhChungDeleteManyArgs} args - Arguments to filter MinhChungs to delete.
     * @example
     * // Delete a few MinhChungs
     * const { count } = await prisma.minhChung.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MinhChungDeleteManyArgs>(args?: SelectSubset<T, MinhChungDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MinhChungs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinhChungUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MinhChungs
     * const minhChung = await prisma.minhChung.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MinhChungUpdateManyArgs>(args: SelectSubset<T, MinhChungUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MinhChung.
     * @param {MinhChungUpsertArgs} args - Arguments to update or create a MinhChung.
     * @example
     * // Update or create a MinhChung
     * const minhChung = await prisma.minhChung.upsert({
     *   create: {
     *     // ... data to create a MinhChung
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MinhChung we want to update
     *   }
     * })
     */
    upsert<T extends MinhChungUpsertArgs>(args: SelectSubset<T, MinhChungUpsertArgs<ExtArgs>>): Prisma__MinhChungClient<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MinhChungs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinhChungCountArgs} args - Arguments to filter MinhChungs to count.
     * @example
     * // Count the number of MinhChungs
     * const count = await prisma.minhChung.count({
     *   where: {
     *     // ... the filter for the MinhChungs we want to count
     *   }
     * })
    **/
    count<T extends MinhChungCountArgs>(
      args?: Subset<T, MinhChungCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MinhChungCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MinhChung.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinhChungAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MinhChungAggregateArgs>(args: Subset<T, MinhChungAggregateArgs>): Prisma.PrismaPromise<GetMinhChungAggregateType<T>>

    /**
     * Group by MinhChung.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinhChungGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MinhChungGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MinhChungGroupByArgs['orderBy'] }
        : { orderBy?: MinhChungGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MinhChungGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMinhChungGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MinhChung model
   */
  readonly fields: MinhChungFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MinhChung.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MinhChungClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nguoi_dung<T extends NguoiDungDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NguoiDungDefaultArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tieu_chi<T extends MinhChung$tieu_chiArgs<ExtArgs> = {}>(args?: Subset<T, MinhChung$tieu_chiArgs<ExtArgs>>): Prisma__TieuChiClient<$Result.GetResult<Prisma.$TieuChiPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    ho_sos<T extends MinhChung$ho_sosArgs<ExtArgs> = {}>(args?: Subset<T, MinhChung$ho_sosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MinhChung model
   */ 
  interface MinhChungFieldRefs {
    readonly id: FieldRef<"MinhChung", 'String'>
    readonly nguoi_dung_id: FieldRef<"MinhChung", 'String'>
    readonly tieu_chi_id: FieldRef<"MinhChung", 'String'>
    readonly loai: FieldRef<"MinhChung", 'String'>
    readonly ten_minh_chung: FieldRef<"MinhChung", 'String'>
    readonly file_url: FieldRef<"MinhChung", 'String'>
    readonly trang_thai: FieldRef<"MinhChung", 'String'>
    readonly ai_xac_thuc_muc_do: FieldRef<"MinhChung", 'Int'>
    readonly nguoi_duyet_id: FieldRef<"MinhChung", 'String'>
    readonly ly_do_loai: FieldRef<"MinhChung", 'String'>
    readonly created_at: FieldRef<"MinhChung", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MinhChung findUnique
   */
  export type MinhChungFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * Filter, which MinhChung to fetch.
     */
    where: MinhChungWhereUniqueInput
  }

  /**
   * MinhChung findUniqueOrThrow
   */
  export type MinhChungFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * Filter, which MinhChung to fetch.
     */
    where: MinhChungWhereUniqueInput
  }

  /**
   * MinhChung findFirst
   */
  export type MinhChungFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * Filter, which MinhChung to fetch.
     */
    where?: MinhChungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MinhChungs to fetch.
     */
    orderBy?: MinhChungOrderByWithRelationInput | MinhChungOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MinhChungs.
     */
    cursor?: MinhChungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MinhChungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MinhChungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MinhChungs.
     */
    distinct?: MinhChungScalarFieldEnum | MinhChungScalarFieldEnum[]
  }

  /**
   * MinhChung findFirstOrThrow
   */
  export type MinhChungFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * Filter, which MinhChung to fetch.
     */
    where?: MinhChungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MinhChungs to fetch.
     */
    orderBy?: MinhChungOrderByWithRelationInput | MinhChungOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MinhChungs.
     */
    cursor?: MinhChungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MinhChungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MinhChungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MinhChungs.
     */
    distinct?: MinhChungScalarFieldEnum | MinhChungScalarFieldEnum[]
  }

  /**
   * MinhChung findMany
   */
  export type MinhChungFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * Filter, which MinhChungs to fetch.
     */
    where?: MinhChungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MinhChungs to fetch.
     */
    orderBy?: MinhChungOrderByWithRelationInput | MinhChungOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MinhChungs.
     */
    cursor?: MinhChungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MinhChungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MinhChungs.
     */
    skip?: number
    distinct?: MinhChungScalarFieldEnum | MinhChungScalarFieldEnum[]
  }

  /**
   * MinhChung create
   */
  export type MinhChungCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * The data needed to create a MinhChung.
     */
    data: XOR<MinhChungCreateInput, MinhChungUncheckedCreateInput>
  }

  /**
   * MinhChung createMany
   */
  export type MinhChungCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MinhChungs.
     */
    data: MinhChungCreateManyInput | MinhChungCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MinhChung createManyAndReturn
   */
  export type MinhChungCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MinhChungs.
     */
    data: MinhChungCreateManyInput | MinhChungCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MinhChung update
   */
  export type MinhChungUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * The data needed to update a MinhChung.
     */
    data: XOR<MinhChungUpdateInput, MinhChungUncheckedUpdateInput>
    /**
     * Choose, which MinhChung to update.
     */
    where: MinhChungWhereUniqueInput
  }

  /**
   * MinhChung updateMany
   */
  export type MinhChungUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MinhChungs.
     */
    data: XOR<MinhChungUpdateManyMutationInput, MinhChungUncheckedUpdateManyInput>
    /**
     * Filter which MinhChungs to update
     */
    where?: MinhChungWhereInput
  }

  /**
   * MinhChung upsert
   */
  export type MinhChungUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * The filter to search for the MinhChung to update in case it exists.
     */
    where: MinhChungWhereUniqueInput
    /**
     * In case the MinhChung found by the `where` argument doesn't exist, create a new MinhChung with this data.
     */
    create: XOR<MinhChungCreateInput, MinhChungUncheckedCreateInput>
    /**
     * In case the MinhChung was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MinhChungUpdateInput, MinhChungUncheckedUpdateInput>
  }

  /**
   * MinhChung delete
   */
  export type MinhChungDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    /**
     * Filter which MinhChung to delete.
     */
    where: MinhChungWhereUniqueInput
  }

  /**
   * MinhChung deleteMany
   */
  export type MinhChungDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MinhChungs to delete
     */
    where?: MinhChungWhereInput
  }

  /**
   * MinhChung.tieu_chi
   */
  export type MinhChung$tieu_chiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TieuChi
     */
    select?: TieuChiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TieuChiInclude<ExtArgs> | null
    where?: TieuChiWhereInput
  }

  /**
   * MinhChung.ho_sos
   */
  export type MinhChung$ho_sosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    where?: HoSoWhereInput
    orderBy?: HoSoOrderByWithRelationInput | HoSoOrderByWithRelationInput[]
    cursor?: HoSoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoSoScalarFieldEnum | HoSoScalarFieldEnum[]
  }

  /**
   * MinhChung without action
   */
  export type MinhChungDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
  }


  /**
   * Model HoSo
   */

  export type AggregateHoSo = {
    _count: HoSoCountAggregateOutputType | null
    _min: HoSoMinAggregateOutputType | null
    _max: HoSoMaxAggregateOutputType | null
  }

  export type HoSoMinAggregateOutputType = {
    id: string | null
    nguoi_dung_id: string | null
    quy_che_id: string | null
    cap_hien_tai: string | null
    trang_thai: $Enums.TrangThaiHoSo | null
    ai_flag: string | null
    ghi_chu_ai: string | null
    khoa: boolean | null
    ngay_nop: Date | null
    created_at: Date | null
  }

  export type HoSoMaxAggregateOutputType = {
    id: string | null
    nguoi_dung_id: string | null
    quy_che_id: string | null
    cap_hien_tai: string | null
    trang_thai: $Enums.TrangThaiHoSo | null
    ai_flag: string | null
    ghi_chu_ai: string | null
    khoa: boolean | null
    ngay_nop: Date | null
    created_at: Date | null
  }

  export type HoSoCountAggregateOutputType = {
    id: number
    nguoi_dung_id: number
    quy_che_id: number
    cap_hien_tai: number
    trang_thai: number
    ai_flag: number
    ghi_chu_ai: number
    khoa: number
    ngay_nop: number
    created_at: number
    _all: number
  }


  export type HoSoMinAggregateInputType = {
    id?: true
    nguoi_dung_id?: true
    quy_che_id?: true
    cap_hien_tai?: true
    trang_thai?: true
    ai_flag?: true
    ghi_chu_ai?: true
    khoa?: true
    ngay_nop?: true
    created_at?: true
  }

  export type HoSoMaxAggregateInputType = {
    id?: true
    nguoi_dung_id?: true
    quy_che_id?: true
    cap_hien_tai?: true
    trang_thai?: true
    ai_flag?: true
    ghi_chu_ai?: true
    khoa?: true
    ngay_nop?: true
    created_at?: true
  }

  export type HoSoCountAggregateInputType = {
    id?: true
    nguoi_dung_id?: true
    quy_che_id?: true
    cap_hien_tai?: true
    trang_thai?: true
    ai_flag?: true
    ghi_chu_ai?: true
    khoa?: true
    ngay_nop?: true
    created_at?: true
    _all?: true
  }

  export type HoSoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HoSo to aggregate.
     */
    where?: HoSoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoSos to fetch.
     */
    orderBy?: HoSoOrderByWithRelationInput | HoSoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoSoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoSos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoSos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HoSos
    **/
    _count?: true | HoSoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoSoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoSoMaxAggregateInputType
  }

  export type GetHoSoAggregateType<T extends HoSoAggregateArgs> = {
        [P in keyof T & keyof AggregateHoSo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHoSo[P]>
      : GetScalarType<T[P], AggregateHoSo[P]>
  }




  export type HoSoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoSoWhereInput
    orderBy?: HoSoOrderByWithAggregationInput | HoSoOrderByWithAggregationInput[]
    by: HoSoScalarFieldEnum[] | HoSoScalarFieldEnum
    having?: HoSoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoSoCountAggregateInputType | true
    _min?: HoSoMinAggregateInputType
    _max?: HoSoMaxAggregateInputType
  }

  export type HoSoGroupByOutputType = {
    id: string
    nguoi_dung_id: string
    quy_che_id: string
    cap_hien_tai: string
    trang_thai: $Enums.TrangThaiHoSo
    ai_flag: string | null
    ghi_chu_ai: string | null
    khoa: boolean
    ngay_nop: Date | null
    created_at: Date
    _count: HoSoCountAggregateOutputType | null
    _min: HoSoMinAggregateOutputType | null
    _max: HoSoMaxAggregateOutputType | null
  }

  type GetHoSoGroupByPayload<T extends HoSoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoSoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoSoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoSoGroupByOutputType[P]>
            : GetScalarType<T[P], HoSoGroupByOutputType[P]>
        }
      >
    >


  export type HoSoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nguoi_dung_id?: boolean
    quy_che_id?: boolean
    cap_hien_tai?: boolean
    trang_thai?: boolean
    ai_flag?: boolean
    ghi_chu_ai?: boolean
    khoa?: boolean
    ngay_nop?: boolean
    created_at?: boolean
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
    quy_che?: boolean | QuyCheDefaultArgs<ExtArgs>
    minh_chungs?: boolean | HoSo$minh_chungsArgs<ExtArgs>
    _count?: boolean | HoSoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hoSo"]>

  export type HoSoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nguoi_dung_id?: boolean
    quy_che_id?: boolean
    cap_hien_tai?: boolean
    trang_thai?: boolean
    ai_flag?: boolean
    ghi_chu_ai?: boolean
    khoa?: boolean
    ngay_nop?: boolean
    created_at?: boolean
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
    quy_che?: boolean | QuyCheDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hoSo"]>

  export type HoSoSelectScalar = {
    id?: boolean
    nguoi_dung_id?: boolean
    quy_che_id?: boolean
    cap_hien_tai?: boolean
    trang_thai?: boolean
    ai_flag?: boolean
    ghi_chu_ai?: boolean
    khoa?: boolean
    ngay_nop?: boolean
    created_at?: boolean
  }

  export type HoSoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
    quy_che?: boolean | QuyCheDefaultArgs<ExtArgs>
    minh_chungs?: boolean | HoSo$minh_chungsArgs<ExtArgs>
    _count?: boolean | HoSoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HoSoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nguoi_dung?: boolean | NguoiDungDefaultArgs<ExtArgs>
    quy_che?: boolean | QuyCheDefaultArgs<ExtArgs>
  }

  export type $HoSoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HoSo"
    objects: {
      nguoi_dung: Prisma.$NguoiDungPayload<ExtArgs>
      quy_che: Prisma.$QuyChePayload<ExtArgs>
      minh_chungs: Prisma.$MinhChungPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nguoi_dung_id: string
      quy_che_id: string
      cap_hien_tai: string
      trang_thai: $Enums.TrangThaiHoSo
      ai_flag: string | null
      ghi_chu_ai: string | null
      khoa: boolean
      ngay_nop: Date | null
      created_at: Date
    }, ExtArgs["result"]["hoSo"]>
    composites: {}
  }

  type HoSoGetPayload<S extends boolean | null | undefined | HoSoDefaultArgs> = $Result.GetResult<Prisma.$HoSoPayload, S>

  type HoSoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HoSoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HoSoCountAggregateInputType | true
    }

  export interface HoSoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HoSo'], meta: { name: 'HoSo' } }
    /**
     * Find zero or one HoSo that matches the filter.
     * @param {HoSoFindUniqueArgs} args - Arguments to find a HoSo
     * @example
     * // Get one HoSo
     * const hoSo = await prisma.hoSo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoSoFindUniqueArgs>(args: SelectSubset<T, HoSoFindUniqueArgs<ExtArgs>>): Prisma__HoSoClient<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HoSo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HoSoFindUniqueOrThrowArgs} args - Arguments to find a HoSo
     * @example
     * // Get one HoSo
     * const hoSo = await prisma.hoSo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoSoFindUniqueOrThrowArgs>(args: SelectSubset<T, HoSoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoSoClient<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HoSo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoSoFindFirstArgs} args - Arguments to find a HoSo
     * @example
     * // Get one HoSo
     * const hoSo = await prisma.hoSo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoSoFindFirstArgs>(args?: SelectSubset<T, HoSoFindFirstArgs<ExtArgs>>): Prisma__HoSoClient<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HoSo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoSoFindFirstOrThrowArgs} args - Arguments to find a HoSo
     * @example
     * // Get one HoSo
     * const hoSo = await prisma.hoSo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoSoFindFirstOrThrowArgs>(args?: SelectSubset<T, HoSoFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoSoClient<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HoSos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoSoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HoSos
     * const hoSos = await prisma.hoSo.findMany()
     * 
     * // Get first 10 HoSos
     * const hoSos = await prisma.hoSo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hoSoWithIdOnly = await prisma.hoSo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HoSoFindManyArgs>(args?: SelectSubset<T, HoSoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HoSo.
     * @param {HoSoCreateArgs} args - Arguments to create a HoSo.
     * @example
     * // Create one HoSo
     * const HoSo = await prisma.hoSo.create({
     *   data: {
     *     // ... data to create a HoSo
     *   }
     * })
     * 
     */
    create<T extends HoSoCreateArgs>(args: SelectSubset<T, HoSoCreateArgs<ExtArgs>>): Prisma__HoSoClient<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HoSos.
     * @param {HoSoCreateManyArgs} args - Arguments to create many HoSos.
     * @example
     * // Create many HoSos
     * const hoSo = await prisma.hoSo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoSoCreateManyArgs>(args?: SelectSubset<T, HoSoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HoSos and returns the data saved in the database.
     * @param {HoSoCreateManyAndReturnArgs} args - Arguments to create many HoSos.
     * @example
     * // Create many HoSos
     * const hoSo = await prisma.hoSo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HoSos and only return the `id`
     * const hoSoWithIdOnly = await prisma.hoSo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HoSoCreateManyAndReturnArgs>(args?: SelectSubset<T, HoSoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a HoSo.
     * @param {HoSoDeleteArgs} args - Arguments to delete one HoSo.
     * @example
     * // Delete one HoSo
     * const HoSo = await prisma.hoSo.delete({
     *   where: {
     *     // ... filter to delete one HoSo
     *   }
     * })
     * 
     */
    delete<T extends HoSoDeleteArgs>(args: SelectSubset<T, HoSoDeleteArgs<ExtArgs>>): Prisma__HoSoClient<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HoSo.
     * @param {HoSoUpdateArgs} args - Arguments to update one HoSo.
     * @example
     * // Update one HoSo
     * const hoSo = await prisma.hoSo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoSoUpdateArgs>(args: SelectSubset<T, HoSoUpdateArgs<ExtArgs>>): Prisma__HoSoClient<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HoSos.
     * @param {HoSoDeleteManyArgs} args - Arguments to filter HoSos to delete.
     * @example
     * // Delete a few HoSos
     * const { count } = await prisma.hoSo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoSoDeleteManyArgs>(args?: SelectSubset<T, HoSoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HoSos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoSoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HoSos
     * const hoSo = await prisma.hoSo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoSoUpdateManyArgs>(args: SelectSubset<T, HoSoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HoSo.
     * @param {HoSoUpsertArgs} args - Arguments to update or create a HoSo.
     * @example
     * // Update or create a HoSo
     * const hoSo = await prisma.hoSo.upsert({
     *   create: {
     *     // ... data to create a HoSo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HoSo we want to update
     *   }
     * })
     */
    upsert<T extends HoSoUpsertArgs>(args: SelectSubset<T, HoSoUpsertArgs<ExtArgs>>): Prisma__HoSoClient<$Result.GetResult<Prisma.$HoSoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HoSos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoSoCountArgs} args - Arguments to filter HoSos to count.
     * @example
     * // Count the number of HoSos
     * const count = await prisma.hoSo.count({
     *   where: {
     *     // ... the filter for the HoSos we want to count
     *   }
     * })
    **/
    count<T extends HoSoCountArgs>(
      args?: Subset<T, HoSoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoSoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HoSo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoSoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HoSoAggregateArgs>(args: Subset<T, HoSoAggregateArgs>): Prisma.PrismaPromise<GetHoSoAggregateType<T>>

    /**
     * Group by HoSo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoSoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HoSoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoSoGroupByArgs['orderBy'] }
        : { orderBy?: HoSoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HoSoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoSoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HoSo model
   */
  readonly fields: HoSoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HoSo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoSoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nguoi_dung<T extends NguoiDungDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NguoiDungDefaultArgs<ExtArgs>>): Prisma__NguoiDungClient<$Result.GetResult<Prisma.$NguoiDungPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    quy_che<T extends QuyCheDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuyCheDefaultArgs<ExtArgs>>): Prisma__QuyCheClient<$Result.GetResult<Prisma.$QuyChePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    minh_chungs<T extends HoSo$minh_chungsArgs<ExtArgs> = {}>(args?: Subset<T, HoSo$minh_chungsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinhChungPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HoSo model
   */ 
  interface HoSoFieldRefs {
    readonly id: FieldRef<"HoSo", 'String'>
    readonly nguoi_dung_id: FieldRef<"HoSo", 'String'>
    readonly quy_che_id: FieldRef<"HoSo", 'String'>
    readonly cap_hien_tai: FieldRef<"HoSo", 'String'>
    readonly trang_thai: FieldRef<"HoSo", 'TrangThaiHoSo'>
    readonly ai_flag: FieldRef<"HoSo", 'String'>
    readonly ghi_chu_ai: FieldRef<"HoSo", 'String'>
    readonly khoa: FieldRef<"HoSo", 'Boolean'>
    readonly ngay_nop: FieldRef<"HoSo", 'DateTime'>
    readonly created_at: FieldRef<"HoSo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HoSo findUnique
   */
  export type HoSoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * Filter, which HoSo to fetch.
     */
    where: HoSoWhereUniqueInput
  }

  /**
   * HoSo findUniqueOrThrow
   */
  export type HoSoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * Filter, which HoSo to fetch.
     */
    where: HoSoWhereUniqueInput
  }

  /**
   * HoSo findFirst
   */
  export type HoSoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * Filter, which HoSo to fetch.
     */
    where?: HoSoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoSos to fetch.
     */
    orderBy?: HoSoOrderByWithRelationInput | HoSoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HoSos.
     */
    cursor?: HoSoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoSos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoSos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HoSos.
     */
    distinct?: HoSoScalarFieldEnum | HoSoScalarFieldEnum[]
  }

  /**
   * HoSo findFirstOrThrow
   */
  export type HoSoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * Filter, which HoSo to fetch.
     */
    where?: HoSoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoSos to fetch.
     */
    orderBy?: HoSoOrderByWithRelationInput | HoSoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HoSos.
     */
    cursor?: HoSoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoSos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoSos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HoSos.
     */
    distinct?: HoSoScalarFieldEnum | HoSoScalarFieldEnum[]
  }

  /**
   * HoSo findMany
   */
  export type HoSoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * Filter, which HoSos to fetch.
     */
    where?: HoSoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoSos to fetch.
     */
    orderBy?: HoSoOrderByWithRelationInput | HoSoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HoSos.
     */
    cursor?: HoSoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoSos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoSos.
     */
    skip?: number
    distinct?: HoSoScalarFieldEnum | HoSoScalarFieldEnum[]
  }

  /**
   * HoSo create
   */
  export type HoSoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * The data needed to create a HoSo.
     */
    data: XOR<HoSoCreateInput, HoSoUncheckedCreateInput>
  }

  /**
   * HoSo createMany
   */
  export type HoSoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HoSos.
     */
    data: HoSoCreateManyInput | HoSoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HoSo createManyAndReturn
   */
  export type HoSoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HoSos.
     */
    data: HoSoCreateManyInput | HoSoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HoSo update
   */
  export type HoSoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * The data needed to update a HoSo.
     */
    data: XOR<HoSoUpdateInput, HoSoUncheckedUpdateInput>
    /**
     * Choose, which HoSo to update.
     */
    where: HoSoWhereUniqueInput
  }

  /**
   * HoSo updateMany
   */
  export type HoSoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HoSos.
     */
    data: XOR<HoSoUpdateManyMutationInput, HoSoUncheckedUpdateManyInput>
    /**
     * Filter which HoSos to update
     */
    where?: HoSoWhereInput
  }

  /**
   * HoSo upsert
   */
  export type HoSoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * The filter to search for the HoSo to update in case it exists.
     */
    where: HoSoWhereUniqueInput
    /**
     * In case the HoSo found by the `where` argument doesn't exist, create a new HoSo with this data.
     */
    create: XOR<HoSoCreateInput, HoSoUncheckedCreateInput>
    /**
     * In case the HoSo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoSoUpdateInput, HoSoUncheckedUpdateInput>
  }

  /**
   * HoSo delete
   */
  export type HoSoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
    /**
     * Filter which HoSo to delete.
     */
    where: HoSoWhereUniqueInput
  }

  /**
   * HoSo deleteMany
   */
  export type HoSoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HoSos to delete
     */
    where?: HoSoWhereInput
  }

  /**
   * HoSo.minh_chungs
   */
  export type HoSo$minh_chungsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinhChung
     */
    select?: MinhChungSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinhChungInclude<ExtArgs> | null
    where?: MinhChungWhereInput
    orderBy?: MinhChungOrderByWithRelationInput | MinhChungOrderByWithRelationInput[]
    cursor?: MinhChungWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MinhChungScalarFieldEnum | MinhChungScalarFieldEnum[]
  }

  /**
   * HoSo without action
   */
  export type HoSoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoSo
     */
    select?: HoSoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoSoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DonViScalarFieldEnum: {
    id: 'id',
    ten_don_vi: 'ten_don_vi',
    cap_do: 'cap_do',
    parent_id: 'parent_id',
    trang_thai: 'trang_thai',
    created_at: 'created_at'
  };

  export type DonViScalarFieldEnum = (typeof DonViScalarFieldEnum)[keyof typeof DonViScalarFieldEnum]


  export const NguoiDungScalarFieldEnum: {
    id: 'id',
    don_vi_id: 'don_vi_id',
    email: 'email',
    msv: 'msv',
    mat_khau: 'mat_khau',
    ho_ten: 'ho_ten',
    vai_tro: 'vai_tro',
    cccd: 'cccd',
    trang_thai: 'trang_thai',
    so_dien_thoai: 'so_dien_thoai',
    reset_otp: 'reset_otp',
    reset_otp_expires: 'reset_otp_expires',
    created_at: 'created_at'
  };

  export type NguoiDungScalarFieldEnum = (typeof NguoiDungScalarFieldEnum)[keyof typeof NguoiDungScalarFieldEnum]


  export const QuyCheScalarFieldEnum: {
    id: 'id',
    don_vi_id: 'don_vi_id',
    nam_hoc: 'nam_hoc',
    ngay_mo_cong: 'ngay_mo_cong',
    ngay_dong_cong: 'ngay_dong_cong',
    so_tieu_chi_dat: 'so_tieu_chi_dat',
    created_at: 'created_at'
  };

  export type QuyCheScalarFieldEnum = (typeof QuyCheScalarFieldEnum)[keyof typeof QuyCheScalarFieldEnum]


  export const TieuChiScalarFieldEnum: {
    id: 'id',
    quy_che_id: 'quy_che_id',
    ten_tieu_chi: 'ten_tieu_chi',
    mo_ta: 'mo_ta',
    thu_tu: 'thu_tu',
    so_luong_yeu_cau: 'so_luong_yeu_cau'
  };

  export type TieuChiScalarFieldEnum = (typeof TieuChiScalarFieldEnum)[keyof typeof TieuChiScalarFieldEnum]


  export const HoatDongScalarFieldEnum: {
    id: 'id',
    ten_hoat_dong: 'ten_hoat_dong',
    don_vi_tc_id: 'don_vi_tc_id',
    thoi_gian_bat_dau: 'thoi_gian_bat_dau',
    thoi_gian_ket_thuc: 'thoi_gian_ket_thuc',
    dia_diem: 'dia_diem',
    hinh_thuc_dd: 'hinh_thuc_dd',
    trang_thai: 'trang_thai',
    nguoi_duyet_id: 'nguoi_duyet_id',
    ly_do_tu_choi: 'ly_do_tu_choi',
    created_at: 'created_at'
  };

  export type HoatDongScalarFieldEnum = (typeof HoatDongScalarFieldEnum)[keyof typeof HoatDongScalarFieldEnum]


  export const DiemDanhScalarFieldEnum: {
    id: 'id',
    hoat_dong_id: 'hoat_dong_id',
    nguoi_dung_id: 'nguoi_dung_id',
    phuong_thuc: 'phuong_thuc',
    thoi_gian: 'thoi_gian',
    da_chot: 'da_chot'
  };

  export type DiemDanhScalarFieldEnum = (typeof DiemDanhScalarFieldEnum)[keyof typeof DiemDanhScalarFieldEnum]


  export const MinhChungScalarFieldEnum: {
    id: 'id',
    nguoi_dung_id: 'nguoi_dung_id',
    tieu_chi_id: 'tieu_chi_id',
    loai: 'loai',
    ten_minh_chung: 'ten_minh_chung',
    file_url: 'file_url',
    trang_thai: 'trang_thai',
    ai_xac_thuc_muc_do: 'ai_xac_thuc_muc_do',
    nguoi_duyet_id: 'nguoi_duyet_id',
    ly_do_loai: 'ly_do_loai',
    created_at: 'created_at'
  };

  export type MinhChungScalarFieldEnum = (typeof MinhChungScalarFieldEnum)[keyof typeof MinhChungScalarFieldEnum]


  export const HoSoScalarFieldEnum: {
    id: 'id',
    nguoi_dung_id: 'nguoi_dung_id',
    quy_che_id: 'quy_che_id',
    cap_hien_tai: 'cap_hien_tai',
    trang_thai: 'trang_thai',
    ai_flag: 'ai_flag',
    ghi_chu_ai: 'ghi_chu_ai',
    khoa: 'khoa',
    ngay_nop: 'ngay_nop',
    created_at: 'created_at'
  };

  export type HoSoScalarFieldEnum = (typeof HoSoScalarFieldEnum)[keyof typeof HoSoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'CapDo'
   */
  export type EnumCapDoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapDo'>
    


  /**
   * Reference to a field of type 'CapDo[]'
   */
  export type ListEnumCapDoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapDo[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'VaiTro'
   */
  export type EnumVaiTroFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VaiTro'>
    


  /**
   * Reference to a field of type 'VaiTro[]'
   */
  export type ListEnumVaiTroFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VaiTro[]'>
    


  /**
   * Reference to a field of type 'TrangThaiTK'
   */
  export type EnumTrangThaiTKFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrangThaiTK'>
    


  /**
   * Reference to a field of type 'TrangThaiTK[]'
   */
  export type ListEnumTrangThaiTKFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrangThaiTK[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TrangThaiHoSo'
   */
  export type EnumTrangThaiHoSoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrangThaiHoSo'>
    


  /**
   * Reference to a field of type 'TrangThaiHoSo[]'
   */
  export type ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrangThaiHoSo[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DonViWhereInput = {
    AND?: DonViWhereInput | DonViWhereInput[]
    OR?: DonViWhereInput[]
    NOT?: DonViWhereInput | DonViWhereInput[]
    id?: UuidFilter<"DonVi"> | string
    ten_don_vi?: StringFilter<"DonVi"> | string
    cap_do?: EnumCapDoFilter<"DonVi"> | $Enums.CapDo
    parent_id?: UuidNullableFilter<"DonVi"> | string | null
    trang_thai?: BoolFilter<"DonVi"> | boolean
    created_at?: DateTimeFilter<"DonVi"> | Date | string
    parent?: XOR<DonViNullableRelationFilter, DonViWhereInput> | null
    children?: DonViListRelationFilter
    nguoi_dungs?: NguoiDungListRelationFilter
    quy_ches?: QuyCheListRelationFilter
    hoat_dongs?: HoatDongListRelationFilter
  }

  export type DonViOrderByWithRelationInput = {
    id?: SortOrder
    ten_don_vi?: SortOrder
    cap_do?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    trang_thai?: SortOrder
    created_at?: SortOrder
    parent?: DonViOrderByWithRelationInput
    children?: DonViOrderByRelationAggregateInput
    nguoi_dungs?: NguoiDungOrderByRelationAggregateInput
    quy_ches?: QuyCheOrderByRelationAggregateInput
    hoat_dongs?: HoatDongOrderByRelationAggregateInput
  }

  export type DonViWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DonViWhereInput | DonViWhereInput[]
    OR?: DonViWhereInput[]
    NOT?: DonViWhereInput | DonViWhereInput[]
    ten_don_vi?: StringFilter<"DonVi"> | string
    cap_do?: EnumCapDoFilter<"DonVi"> | $Enums.CapDo
    parent_id?: UuidNullableFilter<"DonVi"> | string | null
    trang_thai?: BoolFilter<"DonVi"> | boolean
    created_at?: DateTimeFilter<"DonVi"> | Date | string
    parent?: XOR<DonViNullableRelationFilter, DonViWhereInput> | null
    children?: DonViListRelationFilter
    nguoi_dungs?: NguoiDungListRelationFilter
    quy_ches?: QuyCheListRelationFilter
    hoat_dongs?: HoatDongListRelationFilter
  }, "id">

  export type DonViOrderByWithAggregationInput = {
    id?: SortOrder
    ten_don_vi?: SortOrder
    cap_do?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    trang_thai?: SortOrder
    created_at?: SortOrder
    _count?: DonViCountOrderByAggregateInput
    _max?: DonViMaxOrderByAggregateInput
    _min?: DonViMinOrderByAggregateInput
  }

  export type DonViScalarWhereWithAggregatesInput = {
    AND?: DonViScalarWhereWithAggregatesInput | DonViScalarWhereWithAggregatesInput[]
    OR?: DonViScalarWhereWithAggregatesInput[]
    NOT?: DonViScalarWhereWithAggregatesInput | DonViScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"DonVi"> | string
    ten_don_vi?: StringWithAggregatesFilter<"DonVi"> | string
    cap_do?: EnumCapDoWithAggregatesFilter<"DonVi"> | $Enums.CapDo
    parent_id?: UuidNullableWithAggregatesFilter<"DonVi"> | string | null
    trang_thai?: BoolWithAggregatesFilter<"DonVi"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"DonVi"> | Date | string
  }

  export type NguoiDungWhereInput = {
    AND?: NguoiDungWhereInput | NguoiDungWhereInput[]
    OR?: NguoiDungWhereInput[]
    NOT?: NguoiDungWhereInput | NguoiDungWhereInput[]
    id?: UuidFilter<"NguoiDung"> | string
    don_vi_id?: UuidNullableFilter<"NguoiDung"> | string | null
    email?: StringFilter<"NguoiDung"> | string
    msv?: StringNullableFilter<"NguoiDung"> | string | null
    mat_khau?: StringFilter<"NguoiDung"> | string
    ho_ten?: StringFilter<"NguoiDung"> | string
    vai_tro?: EnumVaiTroFilter<"NguoiDung"> | $Enums.VaiTro
    cccd?: StringNullableFilter<"NguoiDung"> | string | null
    trang_thai?: EnumTrangThaiTKFilter<"NguoiDung"> | $Enums.TrangThaiTK
    so_dien_thoai?: StringNullableFilter<"NguoiDung"> | string | null
    reset_otp?: StringNullableFilter<"NguoiDung"> | string | null
    reset_otp_expires?: DateTimeNullableFilter<"NguoiDung"> | Date | string | null
    created_at?: DateTimeFilter<"NguoiDung"> | Date | string
    don_vi?: XOR<DonViNullableRelationFilter, DonViWhereInput> | null
    diem_danhs?: DiemDanhListRelationFilter
    minh_chungs?: MinhChungListRelationFilter
    ho_sos?: HoSoListRelationFilter
    hoat_dong_duyets?: HoatDongListRelationFilter
  }

  export type NguoiDungOrderByWithRelationInput = {
    id?: SortOrder
    don_vi_id?: SortOrderInput | SortOrder
    email?: SortOrder
    msv?: SortOrderInput | SortOrder
    mat_khau?: SortOrder
    ho_ten?: SortOrder
    vai_tro?: SortOrder
    cccd?: SortOrderInput | SortOrder
    trang_thai?: SortOrder
    so_dien_thoai?: SortOrderInput | SortOrder
    reset_otp?: SortOrderInput | SortOrder
    reset_otp_expires?: SortOrderInput | SortOrder
    created_at?: SortOrder
    don_vi?: DonViOrderByWithRelationInput
    diem_danhs?: DiemDanhOrderByRelationAggregateInput
    minh_chungs?: MinhChungOrderByRelationAggregateInput
    ho_sos?: HoSoOrderByRelationAggregateInput
    hoat_dong_duyets?: HoatDongOrderByRelationAggregateInput
  }

  export type NguoiDungWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    msv?: string
    cccd?: string
    AND?: NguoiDungWhereInput | NguoiDungWhereInput[]
    OR?: NguoiDungWhereInput[]
    NOT?: NguoiDungWhereInput | NguoiDungWhereInput[]
    don_vi_id?: UuidNullableFilter<"NguoiDung"> | string | null
    mat_khau?: StringFilter<"NguoiDung"> | string
    ho_ten?: StringFilter<"NguoiDung"> | string
    vai_tro?: EnumVaiTroFilter<"NguoiDung"> | $Enums.VaiTro
    trang_thai?: EnumTrangThaiTKFilter<"NguoiDung"> | $Enums.TrangThaiTK
    so_dien_thoai?: StringNullableFilter<"NguoiDung"> | string | null
    reset_otp?: StringNullableFilter<"NguoiDung"> | string | null
    reset_otp_expires?: DateTimeNullableFilter<"NguoiDung"> | Date | string | null
    created_at?: DateTimeFilter<"NguoiDung"> | Date | string
    don_vi?: XOR<DonViNullableRelationFilter, DonViWhereInput> | null
    diem_danhs?: DiemDanhListRelationFilter
    minh_chungs?: MinhChungListRelationFilter
    ho_sos?: HoSoListRelationFilter
    hoat_dong_duyets?: HoatDongListRelationFilter
  }, "id" | "email" | "msv" | "cccd">

  export type NguoiDungOrderByWithAggregationInput = {
    id?: SortOrder
    don_vi_id?: SortOrderInput | SortOrder
    email?: SortOrder
    msv?: SortOrderInput | SortOrder
    mat_khau?: SortOrder
    ho_ten?: SortOrder
    vai_tro?: SortOrder
    cccd?: SortOrderInput | SortOrder
    trang_thai?: SortOrder
    so_dien_thoai?: SortOrderInput | SortOrder
    reset_otp?: SortOrderInput | SortOrder
    reset_otp_expires?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: NguoiDungCountOrderByAggregateInput
    _max?: NguoiDungMaxOrderByAggregateInput
    _min?: NguoiDungMinOrderByAggregateInput
  }

  export type NguoiDungScalarWhereWithAggregatesInput = {
    AND?: NguoiDungScalarWhereWithAggregatesInput | NguoiDungScalarWhereWithAggregatesInput[]
    OR?: NguoiDungScalarWhereWithAggregatesInput[]
    NOT?: NguoiDungScalarWhereWithAggregatesInput | NguoiDungScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"NguoiDung"> | string
    don_vi_id?: UuidNullableWithAggregatesFilter<"NguoiDung"> | string | null
    email?: StringWithAggregatesFilter<"NguoiDung"> | string
    msv?: StringNullableWithAggregatesFilter<"NguoiDung"> | string | null
    mat_khau?: StringWithAggregatesFilter<"NguoiDung"> | string
    ho_ten?: StringWithAggregatesFilter<"NguoiDung"> | string
    vai_tro?: EnumVaiTroWithAggregatesFilter<"NguoiDung"> | $Enums.VaiTro
    cccd?: StringNullableWithAggregatesFilter<"NguoiDung"> | string | null
    trang_thai?: EnumTrangThaiTKWithAggregatesFilter<"NguoiDung"> | $Enums.TrangThaiTK
    so_dien_thoai?: StringNullableWithAggregatesFilter<"NguoiDung"> | string | null
    reset_otp?: StringNullableWithAggregatesFilter<"NguoiDung"> | string | null
    reset_otp_expires?: DateTimeNullableWithAggregatesFilter<"NguoiDung"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"NguoiDung"> | Date | string
  }

  export type QuyCheWhereInput = {
    AND?: QuyCheWhereInput | QuyCheWhereInput[]
    OR?: QuyCheWhereInput[]
    NOT?: QuyCheWhereInput | QuyCheWhereInput[]
    id?: UuidFilter<"QuyChe"> | string
    don_vi_id?: UuidFilter<"QuyChe"> | string
    nam_hoc?: StringFilter<"QuyChe"> | string
    ngay_mo_cong?: DateTimeFilter<"QuyChe"> | Date | string
    ngay_dong_cong?: DateTimeFilter<"QuyChe"> | Date | string
    so_tieu_chi_dat?: IntFilter<"QuyChe"> | number
    created_at?: DateTimeFilter<"QuyChe"> | Date | string
    don_vi?: XOR<DonViRelationFilter, DonViWhereInput>
    tieu_chis?: TieuChiListRelationFilter
    ho_sos?: HoSoListRelationFilter
  }

  export type QuyCheOrderByWithRelationInput = {
    id?: SortOrder
    don_vi_id?: SortOrder
    nam_hoc?: SortOrder
    ngay_mo_cong?: SortOrder
    ngay_dong_cong?: SortOrder
    so_tieu_chi_dat?: SortOrder
    created_at?: SortOrder
    don_vi?: DonViOrderByWithRelationInput
    tieu_chis?: TieuChiOrderByRelationAggregateInput
    ho_sos?: HoSoOrderByRelationAggregateInput
  }

  export type QuyCheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    don_vi_id_nam_hoc?: QuyCheDon_vi_idNam_hocCompoundUniqueInput
    AND?: QuyCheWhereInput | QuyCheWhereInput[]
    OR?: QuyCheWhereInput[]
    NOT?: QuyCheWhereInput | QuyCheWhereInput[]
    don_vi_id?: UuidFilter<"QuyChe"> | string
    nam_hoc?: StringFilter<"QuyChe"> | string
    ngay_mo_cong?: DateTimeFilter<"QuyChe"> | Date | string
    ngay_dong_cong?: DateTimeFilter<"QuyChe"> | Date | string
    so_tieu_chi_dat?: IntFilter<"QuyChe"> | number
    created_at?: DateTimeFilter<"QuyChe"> | Date | string
    don_vi?: XOR<DonViRelationFilter, DonViWhereInput>
    tieu_chis?: TieuChiListRelationFilter
    ho_sos?: HoSoListRelationFilter
  }, "id" | "don_vi_id_nam_hoc">

  export type QuyCheOrderByWithAggregationInput = {
    id?: SortOrder
    don_vi_id?: SortOrder
    nam_hoc?: SortOrder
    ngay_mo_cong?: SortOrder
    ngay_dong_cong?: SortOrder
    so_tieu_chi_dat?: SortOrder
    created_at?: SortOrder
    _count?: QuyCheCountOrderByAggregateInput
    _avg?: QuyCheAvgOrderByAggregateInput
    _max?: QuyCheMaxOrderByAggregateInput
    _min?: QuyCheMinOrderByAggregateInput
    _sum?: QuyCheSumOrderByAggregateInput
  }

  export type QuyCheScalarWhereWithAggregatesInput = {
    AND?: QuyCheScalarWhereWithAggregatesInput | QuyCheScalarWhereWithAggregatesInput[]
    OR?: QuyCheScalarWhereWithAggregatesInput[]
    NOT?: QuyCheScalarWhereWithAggregatesInput | QuyCheScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"QuyChe"> | string
    don_vi_id?: UuidWithAggregatesFilter<"QuyChe"> | string
    nam_hoc?: StringWithAggregatesFilter<"QuyChe"> | string
    ngay_mo_cong?: DateTimeWithAggregatesFilter<"QuyChe"> | Date | string
    ngay_dong_cong?: DateTimeWithAggregatesFilter<"QuyChe"> | Date | string
    so_tieu_chi_dat?: IntWithAggregatesFilter<"QuyChe"> | number
    created_at?: DateTimeWithAggregatesFilter<"QuyChe"> | Date | string
  }

  export type TieuChiWhereInput = {
    AND?: TieuChiWhereInput | TieuChiWhereInput[]
    OR?: TieuChiWhereInput[]
    NOT?: TieuChiWhereInput | TieuChiWhereInput[]
    id?: UuidFilter<"TieuChi"> | string
    quy_che_id?: UuidFilter<"TieuChi"> | string
    ten_tieu_chi?: StringFilter<"TieuChi"> | string
    mo_ta?: StringNullableFilter<"TieuChi"> | string | null
    thu_tu?: IntNullableFilter<"TieuChi"> | number | null
    so_luong_yeu_cau?: IntFilter<"TieuChi"> | number
    quy_che?: XOR<QuyCheRelationFilter, QuyCheWhereInput>
    hoat_dongs?: HoatDongListRelationFilter
    minh_chungs?: MinhChungListRelationFilter
  }

  export type TieuChiOrderByWithRelationInput = {
    id?: SortOrder
    quy_che_id?: SortOrder
    ten_tieu_chi?: SortOrder
    mo_ta?: SortOrderInput | SortOrder
    thu_tu?: SortOrderInput | SortOrder
    so_luong_yeu_cau?: SortOrder
    quy_che?: QuyCheOrderByWithRelationInput
    hoat_dongs?: HoatDongOrderByRelationAggregateInput
    minh_chungs?: MinhChungOrderByRelationAggregateInput
  }

  export type TieuChiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TieuChiWhereInput | TieuChiWhereInput[]
    OR?: TieuChiWhereInput[]
    NOT?: TieuChiWhereInput | TieuChiWhereInput[]
    quy_che_id?: UuidFilter<"TieuChi"> | string
    ten_tieu_chi?: StringFilter<"TieuChi"> | string
    mo_ta?: StringNullableFilter<"TieuChi"> | string | null
    thu_tu?: IntNullableFilter<"TieuChi"> | number | null
    so_luong_yeu_cau?: IntFilter<"TieuChi"> | number
    quy_che?: XOR<QuyCheRelationFilter, QuyCheWhereInput>
    hoat_dongs?: HoatDongListRelationFilter
    minh_chungs?: MinhChungListRelationFilter
  }, "id">

  export type TieuChiOrderByWithAggregationInput = {
    id?: SortOrder
    quy_che_id?: SortOrder
    ten_tieu_chi?: SortOrder
    mo_ta?: SortOrderInput | SortOrder
    thu_tu?: SortOrderInput | SortOrder
    so_luong_yeu_cau?: SortOrder
    _count?: TieuChiCountOrderByAggregateInput
    _avg?: TieuChiAvgOrderByAggregateInput
    _max?: TieuChiMaxOrderByAggregateInput
    _min?: TieuChiMinOrderByAggregateInput
    _sum?: TieuChiSumOrderByAggregateInput
  }

  export type TieuChiScalarWhereWithAggregatesInput = {
    AND?: TieuChiScalarWhereWithAggregatesInput | TieuChiScalarWhereWithAggregatesInput[]
    OR?: TieuChiScalarWhereWithAggregatesInput[]
    NOT?: TieuChiScalarWhereWithAggregatesInput | TieuChiScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"TieuChi"> | string
    quy_che_id?: UuidWithAggregatesFilter<"TieuChi"> | string
    ten_tieu_chi?: StringWithAggregatesFilter<"TieuChi"> | string
    mo_ta?: StringNullableWithAggregatesFilter<"TieuChi"> | string | null
    thu_tu?: IntNullableWithAggregatesFilter<"TieuChi"> | number | null
    so_luong_yeu_cau?: IntWithAggregatesFilter<"TieuChi"> | number
  }

  export type HoatDongWhereInput = {
    AND?: HoatDongWhereInput | HoatDongWhereInput[]
    OR?: HoatDongWhereInput[]
    NOT?: HoatDongWhereInput | HoatDongWhereInput[]
    id?: UuidFilter<"HoatDong"> | string
    ten_hoat_dong?: StringFilter<"HoatDong"> | string
    don_vi_tc_id?: UuidFilter<"HoatDong"> | string
    thoi_gian_bat_dau?: DateTimeFilter<"HoatDong"> | Date | string
    thoi_gian_ket_thuc?: DateTimeFilter<"HoatDong"> | Date | string
    dia_diem?: StringNullableFilter<"HoatDong"> | string | null
    hinh_thuc_dd?: StringFilter<"HoatDong"> | string
    trang_thai?: StringFilter<"HoatDong"> | string
    nguoi_duyet_id?: UuidNullableFilter<"HoatDong"> | string | null
    ly_do_tu_choi?: StringNullableFilter<"HoatDong"> | string | null
    created_at?: DateTimeFilter<"HoatDong"> | Date | string
    don_vi_tc?: XOR<DonViRelationFilter, DonViWhereInput>
    nguoi_duyet?: XOR<NguoiDungNullableRelationFilter, NguoiDungWhereInput> | null
    tieu_chis?: TieuChiListRelationFilter
    diem_danhs?: DiemDanhListRelationFilter
  }

  export type HoatDongOrderByWithRelationInput = {
    id?: SortOrder
    ten_hoat_dong?: SortOrder
    don_vi_tc_id?: SortOrder
    thoi_gian_bat_dau?: SortOrder
    thoi_gian_ket_thuc?: SortOrder
    dia_diem?: SortOrderInput | SortOrder
    hinh_thuc_dd?: SortOrder
    trang_thai?: SortOrder
    nguoi_duyet_id?: SortOrderInput | SortOrder
    ly_do_tu_choi?: SortOrderInput | SortOrder
    created_at?: SortOrder
    don_vi_tc?: DonViOrderByWithRelationInput
    nguoi_duyet?: NguoiDungOrderByWithRelationInput
    tieu_chis?: TieuChiOrderByRelationAggregateInput
    diem_danhs?: DiemDanhOrderByRelationAggregateInput
  }

  export type HoatDongWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HoatDongWhereInput | HoatDongWhereInput[]
    OR?: HoatDongWhereInput[]
    NOT?: HoatDongWhereInput | HoatDongWhereInput[]
    ten_hoat_dong?: StringFilter<"HoatDong"> | string
    don_vi_tc_id?: UuidFilter<"HoatDong"> | string
    thoi_gian_bat_dau?: DateTimeFilter<"HoatDong"> | Date | string
    thoi_gian_ket_thuc?: DateTimeFilter<"HoatDong"> | Date | string
    dia_diem?: StringNullableFilter<"HoatDong"> | string | null
    hinh_thuc_dd?: StringFilter<"HoatDong"> | string
    trang_thai?: StringFilter<"HoatDong"> | string
    nguoi_duyet_id?: UuidNullableFilter<"HoatDong"> | string | null
    ly_do_tu_choi?: StringNullableFilter<"HoatDong"> | string | null
    created_at?: DateTimeFilter<"HoatDong"> | Date | string
    don_vi_tc?: XOR<DonViRelationFilter, DonViWhereInput>
    nguoi_duyet?: XOR<NguoiDungNullableRelationFilter, NguoiDungWhereInput> | null
    tieu_chis?: TieuChiListRelationFilter
    diem_danhs?: DiemDanhListRelationFilter
  }, "id">

  export type HoatDongOrderByWithAggregationInput = {
    id?: SortOrder
    ten_hoat_dong?: SortOrder
    don_vi_tc_id?: SortOrder
    thoi_gian_bat_dau?: SortOrder
    thoi_gian_ket_thuc?: SortOrder
    dia_diem?: SortOrderInput | SortOrder
    hinh_thuc_dd?: SortOrder
    trang_thai?: SortOrder
    nguoi_duyet_id?: SortOrderInput | SortOrder
    ly_do_tu_choi?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: HoatDongCountOrderByAggregateInput
    _max?: HoatDongMaxOrderByAggregateInput
    _min?: HoatDongMinOrderByAggregateInput
  }

  export type HoatDongScalarWhereWithAggregatesInput = {
    AND?: HoatDongScalarWhereWithAggregatesInput | HoatDongScalarWhereWithAggregatesInput[]
    OR?: HoatDongScalarWhereWithAggregatesInput[]
    NOT?: HoatDongScalarWhereWithAggregatesInput | HoatDongScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"HoatDong"> | string
    ten_hoat_dong?: StringWithAggregatesFilter<"HoatDong"> | string
    don_vi_tc_id?: UuidWithAggregatesFilter<"HoatDong"> | string
    thoi_gian_bat_dau?: DateTimeWithAggregatesFilter<"HoatDong"> | Date | string
    thoi_gian_ket_thuc?: DateTimeWithAggregatesFilter<"HoatDong"> | Date | string
    dia_diem?: StringNullableWithAggregatesFilter<"HoatDong"> | string | null
    hinh_thuc_dd?: StringWithAggregatesFilter<"HoatDong"> | string
    trang_thai?: StringWithAggregatesFilter<"HoatDong"> | string
    nguoi_duyet_id?: UuidNullableWithAggregatesFilter<"HoatDong"> | string | null
    ly_do_tu_choi?: StringNullableWithAggregatesFilter<"HoatDong"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"HoatDong"> | Date | string
  }

  export type DiemDanhWhereInput = {
    AND?: DiemDanhWhereInput | DiemDanhWhereInput[]
    OR?: DiemDanhWhereInput[]
    NOT?: DiemDanhWhereInput | DiemDanhWhereInput[]
    id?: UuidFilter<"DiemDanh"> | string
    hoat_dong_id?: UuidFilter<"DiemDanh"> | string
    nguoi_dung_id?: UuidFilter<"DiemDanh"> | string
    phuong_thuc?: StringFilter<"DiemDanh"> | string
    thoi_gian?: DateTimeFilter<"DiemDanh"> | Date | string
    da_chot?: BoolFilter<"DiemDanh"> | boolean
    hoat_dong?: XOR<HoatDongRelationFilter, HoatDongWhereInput>
    nguoi_dung?: XOR<NguoiDungRelationFilter, NguoiDungWhereInput>
  }

  export type DiemDanhOrderByWithRelationInput = {
    id?: SortOrder
    hoat_dong_id?: SortOrder
    nguoi_dung_id?: SortOrder
    phuong_thuc?: SortOrder
    thoi_gian?: SortOrder
    da_chot?: SortOrder
    hoat_dong?: HoatDongOrderByWithRelationInput
    nguoi_dung?: NguoiDungOrderByWithRelationInput
  }

  export type DiemDanhWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hoat_dong_id_nguoi_dung_id?: DiemDanhHoat_dong_idNguoi_dung_idCompoundUniqueInput
    AND?: DiemDanhWhereInput | DiemDanhWhereInput[]
    OR?: DiemDanhWhereInput[]
    NOT?: DiemDanhWhereInput | DiemDanhWhereInput[]
    hoat_dong_id?: UuidFilter<"DiemDanh"> | string
    nguoi_dung_id?: UuidFilter<"DiemDanh"> | string
    phuong_thuc?: StringFilter<"DiemDanh"> | string
    thoi_gian?: DateTimeFilter<"DiemDanh"> | Date | string
    da_chot?: BoolFilter<"DiemDanh"> | boolean
    hoat_dong?: XOR<HoatDongRelationFilter, HoatDongWhereInput>
    nguoi_dung?: XOR<NguoiDungRelationFilter, NguoiDungWhereInput>
  }, "id" | "hoat_dong_id_nguoi_dung_id">

  export type DiemDanhOrderByWithAggregationInput = {
    id?: SortOrder
    hoat_dong_id?: SortOrder
    nguoi_dung_id?: SortOrder
    phuong_thuc?: SortOrder
    thoi_gian?: SortOrder
    da_chot?: SortOrder
    _count?: DiemDanhCountOrderByAggregateInput
    _max?: DiemDanhMaxOrderByAggregateInput
    _min?: DiemDanhMinOrderByAggregateInput
  }

  export type DiemDanhScalarWhereWithAggregatesInput = {
    AND?: DiemDanhScalarWhereWithAggregatesInput | DiemDanhScalarWhereWithAggregatesInput[]
    OR?: DiemDanhScalarWhereWithAggregatesInput[]
    NOT?: DiemDanhScalarWhereWithAggregatesInput | DiemDanhScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"DiemDanh"> | string
    hoat_dong_id?: UuidWithAggregatesFilter<"DiemDanh"> | string
    nguoi_dung_id?: UuidWithAggregatesFilter<"DiemDanh"> | string
    phuong_thuc?: StringWithAggregatesFilter<"DiemDanh"> | string
    thoi_gian?: DateTimeWithAggregatesFilter<"DiemDanh"> | Date | string
    da_chot?: BoolWithAggregatesFilter<"DiemDanh"> | boolean
  }

  export type MinhChungWhereInput = {
    AND?: MinhChungWhereInput | MinhChungWhereInput[]
    OR?: MinhChungWhereInput[]
    NOT?: MinhChungWhereInput | MinhChungWhereInput[]
    id?: UuidFilter<"MinhChung"> | string
    nguoi_dung_id?: UuidFilter<"MinhChung"> | string
    tieu_chi_id?: UuidNullableFilter<"MinhChung"> | string | null
    loai?: StringFilter<"MinhChung"> | string
    ten_minh_chung?: StringNullableFilter<"MinhChung"> | string | null
    file_url?: StringFilter<"MinhChung"> | string
    trang_thai?: StringFilter<"MinhChung"> | string
    ai_xac_thuc_muc_do?: IntNullableFilter<"MinhChung"> | number | null
    nguoi_duyet_id?: UuidNullableFilter<"MinhChung"> | string | null
    ly_do_loai?: StringNullableFilter<"MinhChung"> | string | null
    created_at?: DateTimeFilter<"MinhChung"> | Date | string
    nguoi_dung?: XOR<NguoiDungRelationFilter, NguoiDungWhereInput>
    tieu_chi?: XOR<TieuChiNullableRelationFilter, TieuChiWhereInput> | null
    ho_sos?: HoSoListRelationFilter
  }

  export type MinhChungOrderByWithRelationInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    tieu_chi_id?: SortOrderInput | SortOrder
    loai?: SortOrder
    ten_minh_chung?: SortOrderInput | SortOrder
    file_url?: SortOrder
    trang_thai?: SortOrder
    ai_xac_thuc_muc_do?: SortOrderInput | SortOrder
    nguoi_duyet_id?: SortOrderInput | SortOrder
    ly_do_loai?: SortOrderInput | SortOrder
    created_at?: SortOrder
    nguoi_dung?: NguoiDungOrderByWithRelationInput
    tieu_chi?: TieuChiOrderByWithRelationInput
    ho_sos?: HoSoOrderByRelationAggregateInput
  }

  export type MinhChungWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MinhChungWhereInput | MinhChungWhereInput[]
    OR?: MinhChungWhereInput[]
    NOT?: MinhChungWhereInput | MinhChungWhereInput[]
    nguoi_dung_id?: UuidFilter<"MinhChung"> | string
    tieu_chi_id?: UuidNullableFilter<"MinhChung"> | string | null
    loai?: StringFilter<"MinhChung"> | string
    ten_minh_chung?: StringNullableFilter<"MinhChung"> | string | null
    file_url?: StringFilter<"MinhChung"> | string
    trang_thai?: StringFilter<"MinhChung"> | string
    ai_xac_thuc_muc_do?: IntNullableFilter<"MinhChung"> | number | null
    nguoi_duyet_id?: UuidNullableFilter<"MinhChung"> | string | null
    ly_do_loai?: StringNullableFilter<"MinhChung"> | string | null
    created_at?: DateTimeFilter<"MinhChung"> | Date | string
    nguoi_dung?: XOR<NguoiDungRelationFilter, NguoiDungWhereInput>
    tieu_chi?: XOR<TieuChiNullableRelationFilter, TieuChiWhereInput> | null
    ho_sos?: HoSoListRelationFilter
  }, "id">

  export type MinhChungOrderByWithAggregationInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    tieu_chi_id?: SortOrderInput | SortOrder
    loai?: SortOrder
    ten_minh_chung?: SortOrderInput | SortOrder
    file_url?: SortOrder
    trang_thai?: SortOrder
    ai_xac_thuc_muc_do?: SortOrderInput | SortOrder
    nguoi_duyet_id?: SortOrderInput | SortOrder
    ly_do_loai?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: MinhChungCountOrderByAggregateInput
    _avg?: MinhChungAvgOrderByAggregateInput
    _max?: MinhChungMaxOrderByAggregateInput
    _min?: MinhChungMinOrderByAggregateInput
    _sum?: MinhChungSumOrderByAggregateInput
  }

  export type MinhChungScalarWhereWithAggregatesInput = {
    AND?: MinhChungScalarWhereWithAggregatesInput | MinhChungScalarWhereWithAggregatesInput[]
    OR?: MinhChungScalarWhereWithAggregatesInput[]
    NOT?: MinhChungScalarWhereWithAggregatesInput | MinhChungScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"MinhChung"> | string
    nguoi_dung_id?: UuidWithAggregatesFilter<"MinhChung"> | string
    tieu_chi_id?: UuidNullableWithAggregatesFilter<"MinhChung"> | string | null
    loai?: StringWithAggregatesFilter<"MinhChung"> | string
    ten_minh_chung?: StringNullableWithAggregatesFilter<"MinhChung"> | string | null
    file_url?: StringWithAggregatesFilter<"MinhChung"> | string
    trang_thai?: StringWithAggregatesFilter<"MinhChung"> | string
    ai_xac_thuc_muc_do?: IntNullableWithAggregatesFilter<"MinhChung"> | number | null
    nguoi_duyet_id?: UuidNullableWithAggregatesFilter<"MinhChung"> | string | null
    ly_do_loai?: StringNullableWithAggregatesFilter<"MinhChung"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"MinhChung"> | Date | string
  }

  export type HoSoWhereInput = {
    AND?: HoSoWhereInput | HoSoWhereInput[]
    OR?: HoSoWhereInput[]
    NOT?: HoSoWhereInput | HoSoWhereInput[]
    id?: UuidFilter<"HoSo"> | string
    nguoi_dung_id?: UuidFilter<"HoSo"> | string
    quy_che_id?: UuidFilter<"HoSo"> | string
    cap_hien_tai?: StringFilter<"HoSo"> | string
    trang_thai?: EnumTrangThaiHoSoFilter<"HoSo"> | $Enums.TrangThaiHoSo
    ai_flag?: StringNullableFilter<"HoSo"> | string | null
    ghi_chu_ai?: StringNullableFilter<"HoSo"> | string | null
    khoa?: BoolFilter<"HoSo"> | boolean
    ngay_nop?: DateTimeNullableFilter<"HoSo"> | Date | string | null
    created_at?: DateTimeFilter<"HoSo"> | Date | string
    nguoi_dung?: XOR<NguoiDungRelationFilter, NguoiDungWhereInput>
    quy_che?: XOR<QuyCheRelationFilter, QuyCheWhereInput>
    minh_chungs?: MinhChungListRelationFilter
  }

  export type HoSoOrderByWithRelationInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    quy_che_id?: SortOrder
    cap_hien_tai?: SortOrder
    trang_thai?: SortOrder
    ai_flag?: SortOrderInput | SortOrder
    ghi_chu_ai?: SortOrderInput | SortOrder
    khoa?: SortOrder
    ngay_nop?: SortOrderInput | SortOrder
    created_at?: SortOrder
    nguoi_dung?: NguoiDungOrderByWithRelationInput
    quy_che?: QuyCheOrderByWithRelationInput
    minh_chungs?: MinhChungOrderByRelationAggregateInput
  }

  export type HoSoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nguoi_dung_id_quy_che_id?: HoSoNguoi_dung_idQuy_che_idCompoundUniqueInput
    AND?: HoSoWhereInput | HoSoWhereInput[]
    OR?: HoSoWhereInput[]
    NOT?: HoSoWhereInput | HoSoWhereInput[]
    nguoi_dung_id?: UuidFilter<"HoSo"> | string
    quy_che_id?: UuidFilter<"HoSo"> | string
    cap_hien_tai?: StringFilter<"HoSo"> | string
    trang_thai?: EnumTrangThaiHoSoFilter<"HoSo"> | $Enums.TrangThaiHoSo
    ai_flag?: StringNullableFilter<"HoSo"> | string | null
    ghi_chu_ai?: StringNullableFilter<"HoSo"> | string | null
    khoa?: BoolFilter<"HoSo"> | boolean
    ngay_nop?: DateTimeNullableFilter<"HoSo"> | Date | string | null
    created_at?: DateTimeFilter<"HoSo"> | Date | string
    nguoi_dung?: XOR<NguoiDungRelationFilter, NguoiDungWhereInput>
    quy_che?: XOR<QuyCheRelationFilter, QuyCheWhereInput>
    minh_chungs?: MinhChungListRelationFilter
  }, "id" | "nguoi_dung_id_quy_che_id">

  export type HoSoOrderByWithAggregationInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    quy_che_id?: SortOrder
    cap_hien_tai?: SortOrder
    trang_thai?: SortOrder
    ai_flag?: SortOrderInput | SortOrder
    ghi_chu_ai?: SortOrderInput | SortOrder
    khoa?: SortOrder
    ngay_nop?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: HoSoCountOrderByAggregateInput
    _max?: HoSoMaxOrderByAggregateInput
    _min?: HoSoMinOrderByAggregateInput
  }

  export type HoSoScalarWhereWithAggregatesInput = {
    AND?: HoSoScalarWhereWithAggregatesInput | HoSoScalarWhereWithAggregatesInput[]
    OR?: HoSoScalarWhereWithAggregatesInput[]
    NOT?: HoSoScalarWhereWithAggregatesInput | HoSoScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"HoSo"> | string
    nguoi_dung_id?: UuidWithAggregatesFilter<"HoSo"> | string
    quy_che_id?: UuidWithAggregatesFilter<"HoSo"> | string
    cap_hien_tai?: StringWithAggregatesFilter<"HoSo"> | string
    trang_thai?: EnumTrangThaiHoSoWithAggregatesFilter<"HoSo"> | $Enums.TrangThaiHoSo
    ai_flag?: StringNullableWithAggregatesFilter<"HoSo"> | string | null
    ghi_chu_ai?: StringNullableWithAggregatesFilter<"HoSo"> | string | null
    khoa?: BoolWithAggregatesFilter<"HoSo"> | boolean
    ngay_nop?: DateTimeNullableWithAggregatesFilter<"HoSo"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"HoSo"> | Date | string
  }

  export type DonViCreateInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    trang_thai?: boolean
    created_at?: Date | string
    parent?: DonViCreateNestedOneWithoutChildrenInput
    children?: DonViCreateNestedManyWithoutParentInput
    nguoi_dungs?: NguoiDungCreateNestedManyWithoutDon_viInput
    quy_ches?: QuyCheCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViUncheckedCreateInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    parent_id?: string | null
    trang_thai?: boolean
    created_at?: Date | string
    children?: DonViUncheckedCreateNestedManyWithoutParentInput
    nguoi_dungs?: NguoiDungUncheckedCreateNestedManyWithoutDon_viInput
    quy_ches?: QuyCheUncheckedCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongUncheckedCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: DonViUpdateOneWithoutChildrenNestedInput
    children?: DonViUpdateManyWithoutParentNestedInput
    nguoi_dungs?: NguoiDungUpdateManyWithoutDon_viNestedInput
    quy_ches?: QuyCheUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DonViUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: DonViUncheckedUpdateManyWithoutParentNestedInput
    nguoi_dungs?: NguoiDungUncheckedUpdateManyWithoutDon_viNestedInput
    quy_ches?: QuyCheUncheckedUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUncheckedUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DonViCreateManyInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    parent_id?: string | null
    trang_thai?: boolean
    created_at?: Date | string
  }

  export type DonViUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonViUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NguoiDungCreateInput = {
    id?: string
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    don_vi?: DonViCreateNestedOneWithoutNguoi_dungsInput
    diem_danhs?: DiemDanhCreateNestedManyWithoutNguoi_dungInput
    minh_chungs?: MinhChungCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungUncheckedCreateInput = {
    id?: string
    don_vi_id?: string | null
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutNguoi_dungInput
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongUncheckedCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi?: DonViUpdateOneWithoutNguoi_dungsNestedInput
    diem_danhs?: DiemDanhUpdateManyWithoutNguoi_dungNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type NguoiDungUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutNguoi_dungNestedInput
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUncheckedUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUncheckedUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type NguoiDungCreateManyInput = {
    id?: string
    don_vi_id?: string | null
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
  }

  export type NguoiDungUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NguoiDungUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuyCheCreateInput = {
    id?: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
    don_vi: DonViCreateNestedOneWithoutQuy_chesInput
    tieu_chis?: TieuChiCreateNestedManyWithoutQuy_cheInput
    ho_sos?: HoSoCreateNestedManyWithoutQuy_cheInput
  }

  export type QuyCheUncheckedCreateInput = {
    id?: string
    don_vi_id: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
    tieu_chis?: TieuChiUncheckedCreateNestedManyWithoutQuy_cheInput
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutQuy_cheInput
  }

  export type QuyCheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi?: DonViUpdateOneRequiredWithoutQuy_chesNestedInput
    tieu_chis?: TieuChiUpdateManyWithoutQuy_cheNestedInput
    ho_sos?: HoSoUpdateManyWithoutQuy_cheNestedInput
  }

  export type QuyCheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chis?: TieuChiUncheckedUpdateManyWithoutQuy_cheNestedInput
    ho_sos?: HoSoUncheckedUpdateManyWithoutQuy_cheNestedInput
  }

  export type QuyCheCreateManyInput = {
    id?: string
    don_vi_id: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
  }

  export type QuyCheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuyCheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TieuChiCreateInput = {
    id?: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
    quy_che: QuyCheCreateNestedOneWithoutTieu_chisInput
    hoat_dongs?: HoatDongCreateNestedManyWithoutTieu_chisInput
    minh_chungs?: MinhChungCreateNestedManyWithoutTieu_chiInput
  }

  export type TieuChiUncheckedCreateInput = {
    id?: string
    quy_che_id: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
    hoat_dongs?: HoatDongUncheckedCreateNestedManyWithoutTieu_chisInput
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutTieu_chiInput
  }

  export type TieuChiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
    quy_che?: QuyCheUpdateOneRequiredWithoutTieu_chisNestedInput
    hoat_dongs?: HoatDongUpdateManyWithoutTieu_chisNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutTieu_chiNestedInput
  }

  export type TieuChiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
    hoat_dongs?: HoatDongUncheckedUpdateManyWithoutTieu_chisNestedInput
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutTieu_chiNestedInput
  }

  export type TieuChiCreateManyInput = {
    id?: string
    quy_che_id: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
  }

  export type TieuChiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
  }

  export type TieuChiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
  }

  export type HoatDongCreateInput = {
    id?: string
    ten_hoat_dong: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    don_vi_tc: DonViCreateNestedOneWithoutHoat_dongsInput
    nguoi_duyet?: NguoiDungCreateNestedOneWithoutHoat_dong_duyetsInput
    tieu_chis?: TieuChiCreateNestedManyWithoutHoat_dongsInput
    diem_danhs?: DiemDanhCreateNestedManyWithoutHoat_dongInput
  }

  export type HoatDongUncheckedCreateInput = {
    id?: string
    ten_hoat_dong: string
    don_vi_tc_id: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    nguoi_duyet_id?: string | null
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    tieu_chis?: TieuChiUncheckedCreateNestedManyWithoutHoat_dongsInput
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutHoat_dongInput
  }

  export type HoatDongUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi_tc?: DonViUpdateOneRequiredWithoutHoat_dongsNestedInput
    nguoi_duyet?: NguoiDungUpdateOneWithoutHoat_dong_duyetsNestedInput
    tieu_chis?: TieuChiUpdateManyWithoutHoat_dongsNestedInput
    diem_danhs?: DiemDanhUpdateManyWithoutHoat_dongNestedInput
  }

  export type HoatDongUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    don_vi_tc_id?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chis?: TieuChiUncheckedUpdateManyWithoutHoat_dongsNestedInput
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutHoat_dongNestedInput
  }

  export type HoatDongCreateManyInput = {
    id?: string
    ten_hoat_dong: string
    don_vi_tc_id: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    nguoi_duyet_id?: string | null
    ly_do_tu_choi?: string | null
    created_at?: Date | string
  }

  export type HoatDongUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoatDongUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    don_vi_tc_id?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiemDanhCreateInput = {
    id?: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
    hoat_dong: HoatDongCreateNestedOneWithoutDiem_danhsInput
    nguoi_dung: NguoiDungCreateNestedOneWithoutDiem_danhsInput
  }

  export type DiemDanhUncheckedCreateInput = {
    id?: string
    hoat_dong_id: string
    nguoi_dung_id: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
  }

  export type DiemDanhUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
    hoat_dong?: HoatDongUpdateOneRequiredWithoutDiem_danhsNestedInput
    nguoi_dung?: NguoiDungUpdateOneRequiredWithoutDiem_danhsNestedInput
  }

  export type DiemDanhUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hoat_dong_id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DiemDanhCreateManyInput = {
    id?: string
    hoat_dong_id: string
    nguoi_dung_id: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
  }

  export type DiemDanhUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DiemDanhUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hoat_dong_id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MinhChungCreateInput = {
    id?: string
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
    nguoi_dung: NguoiDungCreateNestedOneWithoutMinh_chungsInput
    tieu_chi?: TieuChiCreateNestedOneWithoutMinh_chungsInput
    ho_sos?: HoSoCreateNestedManyWithoutMinh_chungsInput
  }

  export type MinhChungUncheckedCreateInput = {
    id?: string
    nguoi_dung_id: string
    tieu_chi_id?: string | null
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutMinh_chungsInput
  }

  export type MinhChungUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nguoi_dung?: NguoiDungUpdateOneRequiredWithoutMinh_chungsNestedInput
    tieu_chi?: TieuChiUpdateOneWithoutMinh_chungsNestedInput
    ho_sos?: HoSoUpdateManyWithoutMinh_chungsNestedInput
  }

  export type MinhChungUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    tieu_chi_id?: NullableStringFieldUpdateOperationsInput | string | null
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ho_sos?: HoSoUncheckedUpdateManyWithoutMinh_chungsNestedInput
  }

  export type MinhChungCreateManyInput = {
    id?: string
    nguoi_dung_id: string
    tieu_chi_id?: string | null
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
  }

  export type MinhChungUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinhChungUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    tieu_chi_id?: NullableStringFieldUpdateOperationsInput | string | null
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoSoCreateInput = {
    id?: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
    nguoi_dung: NguoiDungCreateNestedOneWithoutHo_sosInput
    quy_che: QuyCheCreateNestedOneWithoutHo_sosInput
    minh_chungs?: MinhChungCreateNestedManyWithoutHo_sosInput
  }

  export type HoSoUncheckedCreateInput = {
    id?: string
    nguoi_dung_id: string
    quy_che_id: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutHo_sosInput
  }

  export type HoSoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nguoi_dung?: NguoiDungUpdateOneRequiredWithoutHo_sosNestedInput
    quy_che?: QuyCheUpdateOneRequiredWithoutHo_sosNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutHo_sosNestedInput
  }

  export type HoSoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutHo_sosNestedInput
  }

  export type HoSoCreateManyInput = {
    id?: string
    nguoi_dung_id: string
    quy_che_id: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
  }

  export type HoSoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoSoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumCapDoFilter<$PrismaModel = never> = {
    equals?: $Enums.CapDo | EnumCapDoFieldRefInput<$PrismaModel>
    in?: $Enums.CapDo[] | ListEnumCapDoFieldRefInput<$PrismaModel>
    notIn?: $Enums.CapDo[] | ListEnumCapDoFieldRefInput<$PrismaModel>
    not?: NestedEnumCapDoFilter<$PrismaModel> | $Enums.CapDo
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DonViNullableRelationFilter = {
    is?: DonViWhereInput | null
    isNot?: DonViWhereInput | null
  }

  export type DonViListRelationFilter = {
    every?: DonViWhereInput
    some?: DonViWhereInput
    none?: DonViWhereInput
  }

  export type NguoiDungListRelationFilter = {
    every?: NguoiDungWhereInput
    some?: NguoiDungWhereInput
    none?: NguoiDungWhereInput
  }

  export type QuyCheListRelationFilter = {
    every?: QuyCheWhereInput
    some?: QuyCheWhereInput
    none?: QuyCheWhereInput
  }

  export type HoatDongListRelationFilter = {
    every?: HoatDongWhereInput
    some?: HoatDongWhereInput
    none?: HoatDongWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DonViOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NguoiDungOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuyCheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HoatDongOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DonViCountOrderByAggregateInput = {
    id?: SortOrder
    ten_don_vi?: SortOrder
    cap_do?: SortOrder
    parent_id?: SortOrder
    trang_thai?: SortOrder
    created_at?: SortOrder
  }

  export type DonViMaxOrderByAggregateInput = {
    id?: SortOrder
    ten_don_vi?: SortOrder
    cap_do?: SortOrder
    parent_id?: SortOrder
    trang_thai?: SortOrder
    created_at?: SortOrder
  }

  export type DonViMinOrderByAggregateInput = {
    id?: SortOrder
    ten_don_vi?: SortOrder
    cap_do?: SortOrder
    parent_id?: SortOrder
    trang_thai?: SortOrder
    created_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumCapDoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapDo | EnumCapDoFieldRefInput<$PrismaModel>
    in?: $Enums.CapDo[] | ListEnumCapDoFieldRefInput<$PrismaModel>
    notIn?: $Enums.CapDo[] | ListEnumCapDoFieldRefInput<$PrismaModel>
    not?: NestedEnumCapDoWithAggregatesFilter<$PrismaModel> | $Enums.CapDo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCapDoFilter<$PrismaModel>
    _max?: NestedEnumCapDoFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumVaiTroFilter<$PrismaModel = never> = {
    equals?: $Enums.VaiTro | EnumVaiTroFieldRefInput<$PrismaModel>
    in?: $Enums.VaiTro[] | ListEnumVaiTroFieldRefInput<$PrismaModel>
    notIn?: $Enums.VaiTro[] | ListEnumVaiTroFieldRefInput<$PrismaModel>
    not?: NestedEnumVaiTroFilter<$PrismaModel> | $Enums.VaiTro
  }

  export type EnumTrangThaiTKFilter<$PrismaModel = never> = {
    equals?: $Enums.TrangThaiTK | EnumTrangThaiTKFieldRefInput<$PrismaModel>
    in?: $Enums.TrangThaiTK[] | ListEnumTrangThaiTKFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrangThaiTK[] | ListEnumTrangThaiTKFieldRefInput<$PrismaModel>
    not?: NestedEnumTrangThaiTKFilter<$PrismaModel> | $Enums.TrangThaiTK
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DiemDanhListRelationFilter = {
    every?: DiemDanhWhereInput
    some?: DiemDanhWhereInput
    none?: DiemDanhWhereInput
  }

  export type MinhChungListRelationFilter = {
    every?: MinhChungWhereInput
    some?: MinhChungWhereInput
    none?: MinhChungWhereInput
  }

  export type HoSoListRelationFilter = {
    every?: HoSoWhereInput
    some?: HoSoWhereInput
    none?: HoSoWhereInput
  }

  export type DiemDanhOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MinhChungOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HoSoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NguoiDungCountOrderByAggregateInput = {
    id?: SortOrder
    don_vi_id?: SortOrder
    email?: SortOrder
    msv?: SortOrder
    mat_khau?: SortOrder
    ho_ten?: SortOrder
    vai_tro?: SortOrder
    cccd?: SortOrder
    trang_thai?: SortOrder
    so_dien_thoai?: SortOrder
    reset_otp?: SortOrder
    reset_otp_expires?: SortOrder
    created_at?: SortOrder
  }

  export type NguoiDungMaxOrderByAggregateInput = {
    id?: SortOrder
    don_vi_id?: SortOrder
    email?: SortOrder
    msv?: SortOrder
    mat_khau?: SortOrder
    ho_ten?: SortOrder
    vai_tro?: SortOrder
    cccd?: SortOrder
    trang_thai?: SortOrder
    so_dien_thoai?: SortOrder
    reset_otp?: SortOrder
    reset_otp_expires?: SortOrder
    created_at?: SortOrder
  }

  export type NguoiDungMinOrderByAggregateInput = {
    id?: SortOrder
    don_vi_id?: SortOrder
    email?: SortOrder
    msv?: SortOrder
    mat_khau?: SortOrder
    ho_ten?: SortOrder
    vai_tro?: SortOrder
    cccd?: SortOrder
    trang_thai?: SortOrder
    so_dien_thoai?: SortOrder
    reset_otp?: SortOrder
    reset_otp_expires?: SortOrder
    created_at?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumVaiTroWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VaiTro | EnumVaiTroFieldRefInput<$PrismaModel>
    in?: $Enums.VaiTro[] | ListEnumVaiTroFieldRefInput<$PrismaModel>
    notIn?: $Enums.VaiTro[] | ListEnumVaiTroFieldRefInput<$PrismaModel>
    not?: NestedEnumVaiTroWithAggregatesFilter<$PrismaModel> | $Enums.VaiTro
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVaiTroFilter<$PrismaModel>
    _max?: NestedEnumVaiTroFilter<$PrismaModel>
  }

  export type EnumTrangThaiTKWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrangThaiTK | EnumTrangThaiTKFieldRefInput<$PrismaModel>
    in?: $Enums.TrangThaiTK[] | ListEnumTrangThaiTKFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrangThaiTK[] | ListEnumTrangThaiTKFieldRefInput<$PrismaModel>
    not?: NestedEnumTrangThaiTKWithAggregatesFilter<$PrismaModel> | $Enums.TrangThaiTK
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrangThaiTKFilter<$PrismaModel>
    _max?: NestedEnumTrangThaiTKFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DonViRelationFilter = {
    is?: DonViWhereInput
    isNot?: DonViWhereInput
  }

  export type TieuChiListRelationFilter = {
    every?: TieuChiWhereInput
    some?: TieuChiWhereInput
    none?: TieuChiWhereInput
  }

  export type TieuChiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuyCheDon_vi_idNam_hocCompoundUniqueInput = {
    don_vi_id: string
    nam_hoc: string
  }

  export type QuyCheCountOrderByAggregateInput = {
    id?: SortOrder
    don_vi_id?: SortOrder
    nam_hoc?: SortOrder
    ngay_mo_cong?: SortOrder
    ngay_dong_cong?: SortOrder
    so_tieu_chi_dat?: SortOrder
    created_at?: SortOrder
  }

  export type QuyCheAvgOrderByAggregateInput = {
    so_tieu_chi_dat?: SortOrder
  }

  export type QuyCheMaxOrderByAggregateInput = {
    id?: SortOrder
    don_vi_id?: SortOrder
    nam_hoc?: SortOrder
    ngay_mo_cong?: SortOrder
    ngay_dong_cong?: SortOrder
    so_tieu_chi_dat?: SortOrder
    created_at?: SortOrder
  }

  export type QuyCheMinOrderByAggregateInput = {
    id?: SortOrder
    don_vi_id?: SortOrder
    nam_hoc?: SortOrder
    ngay_mo_cong?: SortOrder
    ngay_dong_cong?: SortOrder
    so_tieu_chi_dat?: SortOrder
    created_at?: SortOrder
  }

  export type QuyCheSumOrderByAggregateInput = {
    so_tieu_chi_dat?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type QuyCheRelationFilter = {
    is?: QuyCheWhereInput
    isNot?: QuyCheWhereInput
  }

  export type TieuChiCountOrderByAggregateInput = {
    id?: SortOrder
    quy_che_id?: SortOrder
    ten_tieu_chi?: SortOrder
    mo_ta?: SortOrder
    thu_tu?: SortOrder
    so_luong_yeu_cau?: SortOrder
  }

  export type TieuChiAvgOrderByAggregateInput = {
    thu_tu?: SortOrder
    so_luong_yeu_cau?: SortOrder
  }

  export type TieuChiMaxOrderByAggregateInput = {
    id?: SortOrder
    quy_che_id?: SortOrder
    ten_tieu_chi?: SortOrder
    mo_ta?: SortOrder
    thu_tu?: SortOrder
    so_luong_yeu_cau?: SortOrder
  }

  export type TieuChiMinOrderByAggregateInput = {
    id?: SortOrder
    quy_che_id?: SortOrder
    ten_tieu_chi?: SortOrder
    mo_ta?: SortOrder
    thu_tu?: SortOrder
    so_luong_yeu_cau?: SortOrder
  }

  export type TieuChiSumOrderByAggregateInput = {
    thu_tu?: SortOrder
    so_luong_yeu_cau?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NguoiDungNullableRelationFilter = {
    is?: NguoiDungWhereInput | null
    isNot?: NguoiDungWhereInput | null
  }

  export type HoatDongCountOrderByAggregateInput = {
    id?: SortOrder
    ten_hoat_dong?: SortOrder
    don_vi_tc_id?: SortOrder
    thoi_gian_bat_dau?: SortOrder
    thoi_gian_ket_thuc?: SortOrder
    dia_diem?: SortOrder
    hinh_thuc_dd?: SortOrder
    trang_thai?: SortOrder
    nguoi_duyet_id?: SortOrder
    ly_do_tu_choi?: SortOrder
    created_at?: SortOrder
  }

  export type HoatDongMaxOrderByAggregateInput = {
    id?: SortOrder
    ten_hoat_dong?: SortOrder
    don_vi_tc_id?: SortOrder
    thoi_gian_bat_dau?: SortOrder
    thoi_gian_ket_thuc?: SortOrder
    dia_diem?: SortOrder
    hinh_thuc_dd?: SortOrder
    trang_thai?: SortOrder
    nguoi_duyet_id?: SortOrder
    ly_do_tu_choi?: SortOrder
    created_at?: SortOrder
  }

  export type HoatDongMinOrderByAggregateInput = {
    id?: SortOrder
    ten_hoat_dong?: SortOrder
    don_vi_tc_id?: SortOrder
    thoi_gian_bat_dau?: SortOrder
    thoi_gian_ket_thuc?: SortOrder
    dia_diem?: SortOrder
    hinh_thuc_dd?: SortOrder
    trang_thai?: SortOrder
    nguoi_duyet_id?: SortOrder
    ly_do_tu_choi?: SortOrder
    created_at?: SortOrder
  }

  export type HoatDongRelationFilter = {
    is?: HoatDongWhereInput
    isNot?: HoatDongWhereInput
  }

  export type NguoiDungRelationFilter = {
    is?: NguoiDungWhereInput
    isNot?: NguoiDungWhereInput
  }

  export type DiemDanhHoat_dong_idNguoi_dung_idCompoundUniqueInput = {
    hoat_dong_id: string
    nguoi_dung_id: string
  }

  export type DiemDanhCountOrderByAggregateInput = {
    id?: SortOrder
    hoat_dong_id?: SortOrder
    nguoi_dung_id?: SortOrder
    phuong_thuc?: SortOrder
    thoi_gian?: SortOrder
    da_chot?: SortOrder
  }

  export type DiemDanhMaxOrderByAggregateInput = {
    id?: SortOrder
    hoat_dong_id?: SortOrder
    nguoi_dung_id?: SortOrder
    phuong_thuc?: SortOrder
    thoi_gian?: SortOrder
    da_chot?: SortOrder
  }

  export type DiemDanhMinOrderByAggregateInput = {
    id?: SortOrder
    hoat_dong_id?: SortOrder
    nguoi_dung_id?: SortOrder
    phuong_thuc?: SortOrder
    thoi_gian?: SortOrder
    da_chot?: SortOrder
  }

  export type TieuChiNullableRelationFilter = {
    is?: TieuChiWhereInput | null
    isNot?: TieuChiWhereInput | null
  }

  export type MinhChungCountOrderByAggregateInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    tieu_chi_id?: SortOrder
    loai?: SortOrder
    ten_minh_chung?: SortOrder
    file_url?: SortOrder
    trang_thai?: SortOrder
    ai_xac_thuc_muc_do?: SortOrder
    nguoi_duyet_id?: SortOrder
    ly_do_loai?: SortOrder
    created_at?: SortOrder
  }

  export type MinhChungAvgOrderByAggregateInput = {
    ai_xac_thuc_muc_do?: SortOrder
  }

  export type MinhChungMaxOrderByAggregateInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    tieu_chi_id?: SortOrder
    loai?: SortOrder
    ten_minh_chung?: SortOrder
    file_url?: SortOrder
    trang_thai?: SortOrder
    ai_xac_thuc_muc_do?: SortOrder
    nguoi_duyet_id?: SortOrder
    ly_do_loai?: SortOrder
    created_at?: SortOrder
  }

  export type MinhChungMinOrderByAggregateInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    tieu_chi_id?: SortOrder
    loai?: SortOrder
    ten_minh_chung?: SortOrder
    file_url?: SortOrder
    trang_thai?: SortOrder
    ai_xac_thuc_muc_do?: SortOrder
    nguoi_duyet_id?: SortOrder
    ly_do_loai?: SortOrder
    created_at?: SortOrder
  }

  export type MinhChungSumOrderByAggregateInput = {
    ai_xac_thuc_muc_do?: SortOrder
  }

  export type EnumTrangThaiHoSoFilter<$PrismaModel = never> = {
    equals?: $Enums.TrangThaiHoSo | EnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    in?: $Enums.TrangThaiHoSo[] | ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrangThaiHoSo[] | ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    not?: NestedEnumTrangThaiHoSoFilter<$PrismaModel> | $Enums.TrangThaiHoSo
  }

  export type HoSoNguoi_dung_idQuy_che_idCompoundUniqueInput = {
    nguoi_dung_id: string
    quy_che_id: string
  }

  export type HoSoCountOrderByAggregateInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    quy_che_id?: SortOrder
    cap_hien_tai?: SortOrder
    trang_thai?: SortOrder
    ai_flag?: SortOrder
    ghi_chu_ai?: SortOrder
    khoa?: SortOrder
    ngay_nop?: SortOrder
    created_at?: SortOrder
  }

  export type HoSoMaxOrderByAggregateInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    quy_che_id?: SortOrder
    cap_hien_tai?: SortOrder
    trang_thai?: SortOrder
    ai_flag?: SortOrder
    ghi_chu_ai?: SortOrder
    khoa?: SortOrder
    ngay_nop?: SortOrder
    created_at?: SortOrder
  }

  export type HoSoMinOrderByAggregateInput = {
    id?: SortOrder
    nguoi_dung_id?: SortOrder
    quy_che_id?: SortOrder
    cap_hien_tai?: SortOrder
    trang_thai?: SortOrder
    ai_flag?: SortOrder
    ghi_chu_ai?: SortOrder
    khoa?: SortOrder
    ngay_nop?: SortOrder
    created_at?: SortOrder
  }

  export type EnumTrangThaiHoSoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrangThaiHoSo | EnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    in?: $Enums.TrangThaiHoSo[] | ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrangThaiHoSo[] | ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    not?: NestedEnumTrangThaiHoSoWithAggregatesFilter<$PrismaModel> | $Enums.TrangThaiHoSo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrangThaiHoSoFilter<$PrismaModel>
    _max?: NestedEnumTrangThaiHoSoFilter<$PrismaModel>
  }

  export type DonViCreateNestedOneWithoutChildrenInput = {
    create?: XOR<DonViCreateWithoutChildrenInput, DonViUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: DonViCreateOrConnectWithoutChildrenInput
    connect?: DonViWhereUniqueInput
  }

  export type DonViCreateNestedManyWithoutParentInput = {
    create?: XOR<DonViCreateWithoutParentInput, DonViUncheckedCreateWithoutParentInput> | DonViCreateWithoutParentInput[] | DonViUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DonViCreateOrConnectWithoutParentInput | DonViCreateOrConnectWithoutParentInput[]
    createMany?: DonViCreateManyParentInputEnvelope
    connect?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
  }

  export type NguoiDungCreateNestedManyWithoutDon_viInput = {
    create?: XOR<NguoiDungCreateWithoutDon_viInput, NguoiDungUncheckedCreateWithoutDon_viInput> | NguoiDungCreateWithoutDon_viInput[] | NguoiDungUncheckedCreateWithoutDon_viInput[]
    connectOrCreate?: NguoiDungCreateOrConnectWithoutDon_viInput | NguoiDungCreateOrConnectWithoutDon_viInput[]
    createMany?: NguoiDungCreateManyDon_viInputEnvelope
    connect?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
  }

  export type QuyCheCreateNestedManyWithoutDon_viInput = {
    create?: XOR<QuyCheCreateWithoutDon_viInput, QuyCheUncheckedCreateWithoutDon_viInput> | QuyCheCreateWithoutDon_viInput[] | QuyCheUncheckedCreateWithoutDon_viInput[]
    connectOrCreate?: QuyCheCreateOrConnectWithoutDon_viInput | QuyCheCreateOrConnectWithoutDon_viInput[]
    createMany?: QuyCheCreateManyDon_viInputEnvelope
    connect?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
  }

  export type HoatDongCreateNestedManyWithoutDon_vi_tcInput = {
    create?: XOR<HoatDongCreateWithoutDon_vi_tcInput, HoatDongUncheckedCreateWithoutDon_vi_tcInput> | HoatDongCreateWithoutDon_vi_tcInput[] | HoatDongUncheckedCreateWithoutDon_vi_tcInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutDon_vi_tcInput | HoatDongCreateOrConnectWithoutDon_vi_tcInput[]
    createMany?: HoatDongCreateManyDon_vi_tcInputEnvelope
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
  }

  export type DonViUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<DonViCreateWithoutParentInput, DonViUncheckedCreateWithoutParentInput> | DonViCreateWithoutParentInput[] | DonViUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DonViCreateOrConnectWithoutParentInput | DonViCreateOrConnectWithoutParentInput[]
    createMany?: DonViCreateManyParentInputEnvelope
    connect?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
  }

  export type NguoiDungUncheckedCreateNestedManyWithoutDon_viInput = {
    create?: XOR<NguoiDungCreateWithoutDon_viInput, NguoiDungUncheckedCreateWithoutDon_viInput> | NguoiDungCreateWithoutDon_viInput[] | NguoiDungUncheckedCreateWithoutDon_viInput[]
    connectOrCreate?: NguoiDungCreateOrConnectWithoutDon_viInput | NguoiDungCreateOrConnectWithoutDon_viInput[]
    createMany?: NguoiDungCreateManyDon_viInputEnvelope
    connect?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
  }

  export type QuyCheUncheckedCreateNestedManyWithoutDon_viInput = {
    create?: XOR<QuyCheCreateWithoutDon_viInput, QuyCheUncheckedCreateWithoutDon_viInput> | QuyCheCreateWithoutDon_viInput[] | QuyCheUncheckedCreateWithoutDon_viInput[]
    connectOrCreate?: QuyCheCreateOrConnectWithoutDon_viInput | QuyCheCreateOrConnectWithoutDon_viInput[]
    createMany?: QuyCheCreateManyDon_viInputEnvelope
    connect?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
  }

  export type HoatDongUncheckedCreateNestedManyWithoutDon_vi_tcInput = {
    create?: XOR<HoatDongCreateWithoutDon_vi_tcInput, HoatDongUncheckedCreateWithoutDon_vi_tcInput> | HoatDongCreateWithoutDon_vi_tcInput[] | HoatDongUncheckedCreateWithoutDon_vi_tcInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutDon_vi_tcInput | HoatDongCreateOrConnectWithoutDon_vi_tcInput[]
    createMany?: HoatDongCreateManyDon_vi_tcInputEnvelope
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumCapDoFieldUpdateOperationsInput = {
    set?: $Enums.CapDo
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DonViUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<DonViCreateWithoutChildrenInput, DonViUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: DonViCreateOrConnectWithoutChildrenInput
    upsert?: DonViUpsertWithoutChildrenInput
    disconnect?: DonViWhereInput | boolean
    delete?: DonViWhereInput | boolean
    connect?: DonViWhereUniqueInput
    update?: XOR<XOR<DonViUpdateToOneWithWhereWithoutChildrenInput, DonViUpdateWithoutChildrenInput>, DonViUncheckedUpdateWithoutChildrenInput>
  }

  export type DonViUpdateManyWithoutParentNestedInput = {
    create?: XOR<DonViCreateWithoutParentInput, DonViUncheckedCreateWithoutParentInput> | DonViCreateWithoutParentInput[] | DonViUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DonViCreateOrConnectWithoutParentInput | DonViCreateOrConnectWithoutParentInput[]
    upsert?: DonViUpsertWithWhereUniqueWithoutParentInput | DonViUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: DonViCreateManyParentInputEnvelope
    set?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
    disconnect?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
    delete?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
    connect?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
    update?: DonViUpdateWithWhereUniqueWithoutParentInput | DonViUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: DonViUpdateManyWithWhereWithoutParentInput | DonViUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: DonViScalarWhereInput | DonViScalarWhereInput[]
  }

  export type NguoiDungUpdateManyWithoutDon_viNestedInput = {
    create?: XOR<NguoiDungCreateWithoutDon_viInput, NguoiDungUncheckedCreateWithoutDon_viInput> | NguoiDungCreateWithoutDon_viInput[] | NguoiDungUncheckedCreateWithoutDon_viInput[]
    connectOrCreate?: NguoiDungCreateOrConnectWithoutDon_viInput | NguoiDungCreateOrConnectWithoutDon_viInput[]
    upsert?: NguoiDungUpsertWithWhereUniqueWithoutDon_viInput | NguoiDungUpsertWithWhereUniqueWithoutDon_viInput[]
    createMany?: NguoiDungCreateManyDon_viInputEnvelope
    set?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
    disconnect?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
    delete?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
    connect?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
    update?: NguoiDungUpdateWithWhereUniqueWithoutDon_viInput | NguoiDungUpdateWithWhereUniqueWithoutDon_viInput[]
    updateMany?: NguoiDungUpdateManyWithWhereWithoutDon_viInput | NguoiDungUpdateManyWithWhereWithoutDon_viInput[]
    deleteMany?: NguoiDungScalarWhereInput | NguoiDungScalarWhereInput[]
  }

  export type QuyCheUpdateManyWithoutDon_viNestedInput = {
    create?: XOR<QuyCheCreateWithoutDon_viInput, QuyCheUncheckedCreateWithoutDon_viInput> | QuyCheCreateWithoutDon_viInput[] | QuyCheUncheckedCreateWithoutDon_viInput[]
    connectOrCreate?: QuyCheCreateOrConnectWithoutDon_viInput | QuyCheCreateOrConnectWithoutDon_viInput[]
    upsert?: QuyCheUpsertWithWhereUniqueWithoutDon_viInput | QuyCheUpsertWithWhereUniqueWithoutDon_viInput[]
    createMany?: QuyCheCreateManyDon_viInputEnvelope
    set?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
    disconnect?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
    delete?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
    connect?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
    update?: QuyCheUpdateWithWhereUniqueWithoutDon_viInput | QuyCheUpdateWithWhereUniqueWithoutDon_viInput[]
    updateMany?: QuyCheUpdateManyWithWhereWithoutDon_viInput | QuyCheUpdateManyWithWhereWithoutDon_viInput[]
    deleteMany?: QuyCheScalarWhereInput | QuyCheScalarWhereInput[]
  }

  export type HoatDongUpdateManyWithoutDon_vi_tcNestedInput = {
    create?: XOR<HoatDongCreateWithoutDon_vi_tcInput, HoatDongUncheckedCreateWithoutDon_vi_tcInput> | HoatDongCreateWithoutDon_vi_tcInput[] | HoatDongUncheckedCreateWithoutDon_vi_tcInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutDon_vi_tcInput | HoatDongCreateOrConnectWithoutDon_vi_tcInput[]
    upsert?: HoatDongUpsertWithWhereUniqueWithoutDon_vi_tcInput | HoatDongUpsertWithWhereUniqueWithoutDon_vi_tcInput[]
    createMany?: HoatDongCreateManyDon_vi_tcInputEnvelope
    set?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    disconnect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    delete?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    update?: HoatDongUpdateWithWhereUniqueWithoutDon_vi_tcInput | HoatDongUpdateWithWhereUniqueWithoutDon_vi_tcInput[]
    updateMany?: HoatDongUpdateManyWithWhereWithoutDon_vi_tcInput | HoatDongUpdateManyWithWhereWithoutDon_vi_tcInput[]
    deleteMany?: HoatDongScalarWhereInput | HoatDongScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DonViUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<DonViCreateWithoutParentInput, DonViUncheckedCreateWithoutParentInput> | DonViCreateWithoutParentInput[] | DonViUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DonViCreateOrConnectWithoutParentInput | DonViCreateOrConnectWithoutParentInput[]
    upsert?: DonViUpsertWithWhereUniqueWithoutParentInput | DonViUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: DonViCreateManyParentInputEnvelope
    set?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
    disconnect?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
    delete?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
    connect?: DonViWhereUniqueInput | DonViWhereUniqueInput[]
    update?: DonViUpdateWithWhereUniqueWithoutParentInput | DonViUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: DonViUpdateManyWithWhereWithoutParentInput | DonViUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: DonViScalarWhereInput | DonViScalarWhereInput[]
  }

  export type NguoiDungUncheckedUpdateManyWithoutDon_viNestedInput = {
    create?: XOR<NguoiDungCreateWithoutDon_viInput, NguoiDungUncheckedCreateWithoutDon_viInput> | NguoiDungCreateWithoutDon_viInput[] | NguoiDungUncheckedCreateWithoutDon_viInput[]
    connectOrCreate?: NguoiDungCreateOrConnectWithoutDon_viInput | NguoiDungCreateOrConnectWithoutDon_viInput[]
    upsert?: NguoiDungUpsertWithWhereUniqueWithoutDon_viInput | NguoiDungUpsertWithWhereUniqueWithoutDon_viInput[]
    createMany?: NguoiDungCreateManyDon_viInputEnvelope
    set?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
    disconnect?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
    delete?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
    connect?: NguoiDungWhereUniqueInput | NguoiDungWhereUniqueInput[]
    update?: NguoiDungUpdateWithWhereUniqueWithoutDon_viInput | NguoiDungUpdateWithWhereUniqueWithoutDon_viInput[]
    updateMany?: NguoiDungUpdateManyWithWhereWithoutDon_viInput | NguoiDungUpdateManyWithWhereWithoutDon_viInput[]
    deleteMany?: NguoiDungScalarWhereInput | NguoiDungScalarWhereInput[]
  }

  export type QuyCheUncheckedUpdateManyWithoutDon_viNestedInput = {
    create?: XOR<QuyCheCreateWithoutDon_viInput, QuyCheUncheckedCreateWithoutDon_viInput> | QuyCheCreateWithoutDon_viInput[] | QuyCheUncheckedCreateWithoutDon_viInput[]
    connectOrCreate?: QuyCheCreateOrConnectWithoutDon_viInput | QuyCheCreateOrConnectWithoutDon_viInput[]
    upsert?: QuyCheUpsertWithWhereUniqueWithoutDon_viInput | QuyCheUpsertWithWhereUniqueWithoutDon_viInput[]
    createMany?: QuyCheCreateManyDon_viInputEnvelope
    set?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
    disconnect?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
    delete?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
    connect?: QuyCheWhereUniqueInput | QuyCheWhereUniqueInput[]
    update?: QuyCheUpdateWithWhereUniqueWithoutDon_viInput | QuyCheUpdateWithWhereUniqueWithoutDon_viInput[]
    updateMany?: QuyCheUpdateManyWithWhereWithoutDon_viInput | QuyCheUpdateManyWithWhereWithoutDon_viInput[]
    deleteMany?: QuyCheScalarWhereInput | QuyCheScalarWhereInput[]
  }

  export type HoatDongUncheckedUpdateManyWithoutDon_vi_tcNestedInput = {
    create?: XOR<HoatDongCreateWithoutDon_vi_tcInput, HoatDongUncheckedCreateWithoutDon_vi_tcInput> | HoatDongCreateWithoutDon_vi_tcInput[] | HoatDongUncheckedCreateWithoutDon_vi_tcInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutDon_vi_tcInput | HoatDongCreateOrConnectWithoutDon_vi_tcInput[]
    upsert?: HoatDongUpsertWithWhereUniqueWithoutDon_vi_tcInput | HoatDongUpsertWithWhereUniqueWithoutDon_vi_tcInput[]
    createMany?: HoatDongCreateManyDon_vi_tcInputEnvelope
    set?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    disconnect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    delete?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    update?: HoatDongUpdateWithWhereUniqueWithoutDon_vi_tcInput | HoatDongUpdateWithWhereUniqueWithoutDon_vi_tcInput[]
    updateMany?: HoatDongUpdateManyWithWhereWithoutDon_vi_tcInput | HoatDongUpdateManyWithWhereWithoutDon_vi_tcInput[]
    deleteMany?: HoatDongScalarWhereInput | HoatDongScalarWhereInput[]
  }

  export type DonViCreateNestedOneWithoutNguoi_dungsInput = {
    create?: XOR<DonViCreateWithoutNguoi_dungsInput, DonViUncheckedCreateWithoutNguoi_dungsInput>
    connectOrCreate?: DonViCreateOrConnectWithoutNguoi_dungsInput
    connect?: DonViWhereUniqueInput
  }

  export type DiemDanhCreateNestedManyWithoutNguoi_dungInput = {
    create?: XOR<DiemDanhCreateWithoutNguoi_dungInput, DiemDanhUncheckedCreateWithoutNguoi_dungInput> | DiemDanhCreateWithoutNguoi_dungInput[] | DiemDanhUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: DiemDanhCreateOrConnectWithoutNguoi_dungInput | DiemDanhCreateOrConnectWithoutNguoi_dungInput[]
    createMany?: DiemDanhCreateManyNguoi_dungInputEnvelope
    connect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
  }

  export type MinhChungCreateNestedManyWithoutNguoi_dungInput = {
    create?: XOR<MinhChungCreateWithoutNguoi_dungInput, MinhChungUncheckedCreateWithoutNguoi_dungInput> | MinhChungCreateWithoutNguoi_dungInput[] | MinhChungUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutNguoi_dungInput | MinhChungCreateOrConnectWithoutNguoi_dungInput[]
    createMany?: MinhChungCreateManyNguoi_dungInputEnvelope
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
  }

  export type HoSoCreateNestedManyWithoutNguoi_dungInput = {
    create?: XOR<HoSoCreateWithoutNguoi_dungInput, HoSoUncheckedCreateWithoutNguoi_dungInput> | HoSoCreateWithoutNguoi_dungInput[] | HoSoUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutNguoi_dungInput | HoSoCreateOrConnectWithoutNguoi_dungInput[]
    createMany?: HoSoCreateManyNguoi_dungInputEnvelope
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
  }

  export type HoatDongCreateNestedManyWithoutNguoi_duyetInput = {
    create?: XOR<HoatDongCreateWithoutNguoi_duyetInput, HoatDongUncheckedCreateWithoutNguoi_duyetInput> | HoatDongCreateWithoutNguoi_duyetInput[] | HoatDongUncheckedCreateWithoutNguoi_duyetInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutNguoi_duyetInput | HoatDongCreateOrConnectWithoutNguoi_duyetInput[]
    createMany?: HoatDongCreateManyNguoi_duyetInputEnvelope
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
  }

  export type DiemDanhUncheckedCreateNestedManyWithoutNguoi_dungInput = {
    create?: XOR<DiemDanhCreateWithoutNguoi_dungInput, DiemDanhUncheckedCreateWithoutNguoi_dungInput> | DiemDanhCreateWithoutNguoi_dungInput[] | DiemDanhUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: DiemDanhCreateOrConnectWithoutNguoi_dungInput | DiemDanhCreateOrConnectWithoutNguoi_dungInput[]
    createMany?: DiemDanhCreateManyNguoi_dungInputEnvelope
    connect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
  }

  export type MinhChungUncheckedCreateNestedManyWithoutNguoi_dungInput = {
    create?: XOR<MinhChungCreateWithoutNguoi_dungInput, MinhChungUncheckedCreateWithoutNguoi_dungInput> | MinhChungCreateWithoutNguoi_dungInput[] | MinhChungUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutNguoi_dungInput | MinhChungCreateOrConnectWithoutNguoi_dungInput[]
    createMany?: MinhChungCreateManyNguoi_dungInputEnvelope
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
  }

  export type HoSoUncheckedCreateNestedManyWithoutNguoi_dungInput = {
    create?: XOR<HoSoCreateWithoutNguoi_dungInput, HoSoUncheckedCreateWithoutNguoi_dungInput> | HoSoCreateWithoutNguoi_dungInput[] | HoSoUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutNguoi_dungInput | HoSoCreateOrConnectWithoutNguoi_dungInput[]
    createMany?: HoSoCreateManyNguoi_dungInputEnvelope
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
  }

  export type HoatDongUncheckedCreateNestedManyWithoutNguoi_duyetInput = {
    create?: XOR<HoatDongCreateWithoutNguoi_duyetInput, HoatDongUncheckedCreateWithoutNguoi_duyetInput> | HoatDongCreateWithoutNguoi_duyetInput[] | HoatDongUncheckedCreateWithoutNguoi_duyetInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutNguoi_duyetInput | HoatDongCreateOrConnectWithoutNguoi_duyetInput[]
    createMany?: HoatDongCreateManyNguoi_duyetInputEnvelope
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
  }

  export type EnumVaiTroFieldUpdateOperationsInput = {
    set?: $Enums.VaiTro
  }

  export type EnumTrangThaiTKFieldUpdateOperationsInput = {
    set?: $Enums.TrangThaiTK
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DonViUpdateOneWithoutNguoi_dungsNestedInput = {
    create?: XOR<DonViCreateWithoutNguoi_dungsInput, DonViUncheckedCreateWithoutNguoi_dungsInput>
    connectOrCreate?: DonViCreateOrConnectWithoutNguoi_dungsInput
    upsert?: DonViUpsertWithoutNguoi_dungsInput
    disconnect?: DonViWhereInput | boolean
    delete?: DonViWhereInput | boolean
    connect?: DonViWhereUniqueInput
    update?: XOR<XOR<DonViUpdateToOneWithWhereWithoutNguoi_dungsInput, DonViUpdateWithoutNguoi_dungsInput>, DonViUncheckedUpdateWithoutNguoi_dungsInput>
  }

  export type DiemDanhUpdateManyWithoutNguoi_dungNestedInput = {
    create?: XOR<DiemDanhCreateWithoutNguoi_dungInput, DiemDanhUncheckedCreateWithoutNguoi_dungInput> | DiemDanhCreateWithoutNguoi_dungInput[] | DiemDanhUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: DiemDanhCreateOrConnectWithoutNguoi_dungInput | DiemDanhCreateOrConnectWithoutNguoi_dungInput[]
    upsert?: DiemDanhUpsertWithWhereUniqueWithoutNguoi_dungInput | DiemDanhUpsertWithWhereUniqueWithoutNguoi_dungInput[]
    createMany?: DiemDanhCreateManyNguoi_dungInputEnvelope
    set?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    disconnect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    delete?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    connect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    update?: DiemDanhUpdateWithWhereUniqueWithoutNguoi_dungInput | DiemDanhUpdateWithWhereUniqueWithoutNguoi_dungInput[]
    updateMany?: DiemDanhUpdateManyWithWhereWithoutNguoi_dungInput | DiemDanhUpdateManyWithWhereWithoutNguoi_dungInput[]
    deleteMany?: DiemDanhScalarWhereInput | DiemDanhScalarWhereInput[]
  }

  export type MinhChungUpdateManyWithoutNguoi_dungNestedInput = {
    create?: XOR<MinhChungCreateWithoutNguoi_dungInput, MinhChungUncheckedCreateWithoutNguoi_dungInput> | MinhChungCreateWithoutNguoi_dungInput[] | MinhChungUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutNguoi_dungInput | MinhChungCreateOrConnectWithoutNguoi_dungInput[]
    upsert?: MinhChungUpsertWithWhereUniqueWithoutNguoi_dungInput | MinhChungUpsertWithWhereUniqueWithoutNguoi_dungInput[]
    createMany?: MinhChungCreateManyNguoi_dungInputEnvelope
    set?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    disconnect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    delete?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    update?: MinhChungUpdateWithWhereUniqueWithoutNguoi_dungInput | MinhChungUpdateWithWhereUniqueWithoutNguoi_dungInput[]
    updateMany?: MinhChungUpdateManyWithWhereWithoutNguoi_dungInput | MinhChungUpdateManyWithWhereWithoutNguoi_dungInput[]
    deleteMany?: MinhChungScalarWhereInput | MinhChungScalarWhereInput[]
  }

  export type HoSoUpdateManyWithoutNguoi_dungNestedInput = {
    create?: XOR<HoSoCreateWithoutNguoi_dungInput, HoSoUncheckedCreateWithoutNguoi_dungInput> | HoSoCreateWithoutNguoi_dungInput[] | HoSoUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutNguoi_dungInput | HoSoCreateOrConnectWithoutNguoi_dungInput[]
    upsert?: HoSoUpsertWithWhereUniqueWithoutNguoi_dungInput | HoSoUpsertWithWhereUniqueWithoutNguoi_dungInput[]
    createMany?: HoSoCreateManyNguoi_dungInputEnvelope
    set?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    disconnect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    delete?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    update?: HoSoUpdateWithWhereUniqueWithoutNguoi_dungInput | HoSoUpdateWithWhereUniqueWithoutNguoi_dungInput[]
    updateMany?: HoSoUpdateManyWithWhereWithoutNguoi_dungInput | HoSoUpdateManyWithWhereWithoutNguoi_dungInput[]
    deleteMany?: HoSoScalarWhereInput | HoSoScalarWhereInput[]
  }

  export type HoatDongUpdateManyWithoutNguoi_duyetNestedInput = {
    create?: XOR<HoatDongCreateWithoutNguoi_duyetInput, HoatDongUncheckedCreateWithoutNguoi_duyetInput> | HoatDongCreateWithoutNguoi_duyetInput[] | HoatDongUncheckedCreateWithoutNguoi_duyetInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutNguoi_duyetInput | HoatDongCreateOrConnectWithoutNguoi_duyetInput[]
    upsert?: HoatDongUpsertWithWhereUniqueWithoutNguoi_duyetInput | HoatDongUpsertWithWhereUniqueWithoutNguoi_duyetInput[]
    createMany?: HoatDongCreateManyNguoi_duyetInputEnvelope
    set?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    disconnect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    delete?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    update?: HoatDongUpdateWithWhereUniqueWithoutNguoi_duyetInput | HoatDongUpdateWithWhereUniqueWithoutNguoi_duyetInput[]
    updateMany?: HoatDongUpdateManyWithWhereWithoutNguoi_duyetInput | HoatDongUpdateManyWithWhereWithoutNguoi_duyetInput[]
    deleteMany?: HoatDongScalarWhereInput | HoatDongScalarWhereInput[]
  }

  export type DiemDanhUncheckedUpdateManyWithoutNguoi_dungNestedInput = {
    create?: XOR<DiemDanhCreateWithoutNguoi_dungInput, DiemDanhUncheckedCreateWithoutNguoi_dungInput> | DiemDanhCreateWithoutNguoi_dungInput[] | DiemDanhUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: DiemDanhCreateOrConnectWithoutNguoi_dungInput | DiemDanhCreateOrConnectWithoutNguoi_dungInput[]
    upsert?: DiemDanhUpsertWithWhereUniqueWithoutNguoi_dungInput | DiemDanhUpsertWithWhereUniqueWithoutNguoi_dungInput[]
    createMany?: DiemDanhCreateManyNguoi_dungInputEnvelope
    set?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    disconnect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    delete?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    connect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    update?: DiemDanhUpdateWithWhereUniqueWithoutNguoi_dungInput | DiemDanhUpdateWithWhereUniqueWithoutNguoi_dungInput[]
    updateMany?: DiemDanhUpdateManyWithWhereWithoutNguoi_dungInput | DiemDanhUpdateManyWithWhereWithoutNguoi_dungInput[]
    deleteMany?: DiemDanhScalarWhereInput | DiemDanhScalarWhereInput[]
  }

  export type MinhChungUncheckedUpdateManyWithoutNguoi_dungNestedInput = {
    create?: XOR<MinhChungCreateWithoutNguoi_dungInput, MinhChungUncheckedCreateWithoutNguoi_dungInput> | MinhChungCreateWithoutNguoi_dungInput[] | MinhChungUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutNguoi_dungInput | MinhChungCreateOrConnectWithoutNguoi_dungInput[]
    upsert?: MinhChungUpsertWithWhereUniqueWithoutNguoi_dungInput | MinhChungUpsertWithWhereUniqueWithoutNguoi_dungInput[]
    createMany?: MinhChungCreateManyNguoi_dungInputEnvelope
    set?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    disconnect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    delete?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    update?: MinhChungUpdateWithWhereUniqueWithoutNguoi_dungInput | MinhChungUpdateWithWhereUniqueWithoutNguoi_dungInput[]
    updateMany?: MinhChungUpdateManyWithWhereWithoutNguoi_dungInput | MinhChungUpdateManyWithWhereWithoutNguoi_dungInput[]
    deleteMany?: MinhChungScalarWhereInput | MinhChungScalarWhereInput[]
  }

  export type HoSoUncheckedUpdateManyWithoutNguoi_dungNestedInput = {
    create?: XOR<HoSoCreateWithoutNguoi_dungInput, HoSoUncheckedCreateWithoutNguoi_dungInput> | HoSoCreateWithoutNguoi_dungInput[] | HoSoUncheckedCreateWithoutNguoi_dungInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutNguoi_dungInput | HoSoCreateOrConnectWithoutNguoi_dungInput[]
    upsert?: HoSoUpsertWithWhereUniqueWithoutNguoi_dungInput | HoSoUpsertWithWhereUniqueWithoutNguoi_dungInput[]
    createMany?: HoSoCreateManyNguoi_dungInputEnvelope
    set?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    disconnect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    delete?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    update?: HoSoUpdateWithWhereUniqueWithoutNguoi_dungInput | HoSoUpdateWithWhereUniqueWithoutNguoi_dungInput[]
    updateMany?: HoSoUpdateManyWithWhereWithoutNguoi_dungInput | HoSoUpdateManyWithWhereWithoutNguoi_dungInput[]
    deleteMany?: HoSoScalarWhereInput | HoSoScalarWhereInput[]
  }

  export type HoatDongUncheckedUpdateManyWithoutNguoi_duyetNestedInput = {
    create?: XOR<HoatDongCreateWithoutNguoi_duyetInput, HoatDongUncheckedCreateWithoutNguoi_duyetInput> | HoatDongCreateWithoutNguoi_duyetInput[] | HoatDongUncheckedCreateWithoutNguoi_duyetInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutNguoi_duyetInput | HoatDongCreateOrConnectWithoutNguoi_duyetInput[]
    upsert?: HoatDongUpsertWithWhereUniqueWithoutNguoi_duyetInput | HoatDongUpsertWithWhereUniqueWithoutNguoi_duyetInput[]
    createMany?: HoatDongCreateManyNguoi_duyetInputEnvelope
    set?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    disconnect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    delete?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    update?: HoatDongUpdateWithWhereUniqueWithoutNguoi_duyetInput | HoatDongUpdateWithWhereUniqueWithoutNguoi_duyetInput[]
    updateMany?: HoatDongUpdateManyWithWhereWithoutNguoi_duyetInput | HoatDongUpdateManyWithWhereWithoutNguoi_duyetInput[]
    deleteMany?: HoatDongScalarWhereInput | HoatDongScalarWhereInput[]
  }

  export type DonViCreateNestedOneWithoutQuy_chesInput = {
    create?: XOR<DonViCreateWithoutQuy_chesInput, DonViUncheckedCreateWithoutQuy_chesInput>
    connectOrCreate?: DonViCreateOrConnectWithoutQuy_chesInput
    connect?: DonViWhereUniqueInput
  }

  export type TieuChiCreateNestedManyWithoutQuy_cheInput = {
    create?: XOR<TieuChiCreateWithoutQuy_cheInput, TieuChiUncheckedCreateWithoutQuy_cheInput> | TieuChiCreateWithoutQuy_cheInput[] | TieuChiUncheckedCreateWithoutQuy_cheInput[]
    connectOrCreate?: TieuChiCreateOrConnectWithoutQuy_cheInput | TieuChiCreateOrConnectWithoutQuy_cheInput[]
    createMany?: TieuChiCreateManyQuy_cheInputEnvelope
    connect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
  }

  export type HoSoCreateNestedManyWithoutQuy_cheInput = {
    create?: XOR<HoSoCreateWithoutQuy_cheInput, HoSoUncheckedCreateWithoutQuy_cheInput> | HoSoCreateWithoutQuy_cheInput[] | HoSoUncheckedCreateWithoutQuy_cheInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutQuy_cheInput | HoSoCreateOrConnectWithoutQuy_cheInput[]
    createMany?: HoSoCreateManyQuy_cheInputEnvelope
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
  }

  export type TieuChiUncheckedCreateNestedManyWithoutQuy_cheInput = {
    create?: XOR<TieuChiCreateWithoutQuy_cheInput, TieuChiUncheckedCreateWithoutQuy_cheInput> | TieuChiCreateWithoutQuy_cheInput[] | TieuChiUncheckedCreateWithoutQuy_cheInput[]
    connectOrCreate?: TieuChiCreateOrConnectWithoutQuy_cheInput | TieuChiCreateOrConnectWithoutQuy_cheInput[]
    createMany?: TieuChiCreateManyQuy_cheInputEnvelope
    connect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
  }

  export type HoSoUncheckedCreateNestedManyWithoutQuy_cheInput = {
    create?: XOR<HoSoCreateWithoutQuy_cheInput, HoSoUncheckedCreateWithoutQuy_cheInput> | HoSoCreateWithoutQuy_cheInput[] | HoSoUncheckedCreateWithoutQuy_cheInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutQuy_cheInput | HoSoCreateOrConnectWithoutQuy_cheInput[]
    createMany?: HoSoCreateManyQuy_cheInputEnvelope
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DonViUpdateOneRequiredWithoutQuy_chesNestedInput = {
    create?: XOR<DonViCreateWithoutQuy_chesInput, DonViUncheckedCreateWithoutQuy_chesInput>
    connectOrCreate?: DonViCreateOrConnectWithoutQuy_chesInput
    upsert?: DonViUpsertWithoutQuy_chesInput
    connect?: DonViWhereUniqueInput
    update?: XOR<XOR<DonViUpdateToOneWithWhereWithoutQuy_chesInput, DonViUpdateWithoutQuy_chesInput>, DonViUncheckedUpdateWithoutQuy_chesInput>
  }

  export type TieuChiUpdateManyWithoutQuy_cheNestedInput = {
    create?: XOR<TieuChiCreateWithoutQuy_cheInput, TieuChiUncheckedCreateWithoutQuy_cheInput> | TieuChiCreateWithoutQuy_cheInput[] | TieuChiUncheckedCreateWithoutQuy_cheInput[]
    connectOrCreate?: TieuChiCreateOrConnectWithoutQuy_cheInput | TieuChiCreateOrConnectWithoutQuy_cheInput[]
    upsert?: TieuChiUpsertWithWhereUniqueWithoutQuy_cheInput | TieuChiUpsertWithWhereUniqueWithoutQuy_cheInput[]
    createMany?: TieuChiCreateManyQuy_cheInputEnvelope
    set?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    disconnect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    delete?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    connect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    update?: TieuChiUpdateWithWhereUniqueWithoutQuy_cheInput | TieuChiUpdateWithWhereUniqueWithoutQuy_cheInput[]
    updateMany?: TieuChiUpdateManyWithWhereWithoutQuy_cheInput | TieuChiUpdateManyWithWhereWithoutQuy_cheInput[]
    deleteMany?: TieuChiScalarWhereInput | TieuChiScalarWhereInput[]
  }

  export type HoSoUpdateManyWithoutQuy_cheNestedInput = {
    create?: XOR<HoSoCreateWithoutQuy_cheInput, HoSoUncheckedCreateWithoutQuy_cheInput> | HoSoCreateWithoutQuy_cheInput[] | HoSoUncheckedCreateWithoutQuy_cheInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutQuy_cheInput | HoSoCreateOrConnectWithoutQuy_cheInput[]
    upsert?: HoSoUpsertWithWhereUniqueWithoutQuy_cheInput | HoSoUpsertWithWhereUniqueWithoutQuy_cheInput[]
    createMany?: HoSoCreateManyQuy_cheInputEnvelope
    set?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    disconnect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    delete?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    update?: HoSoUpdateWithWhereUniqueWithoutQuy_cheInput | HoSoUpdateWithWhereUniqueWithoutQuy_cheInput[]
    updateMany?: HoSoUpdateManyWithWhereWithoutQuy_cheInput | HoSoUpdateManyWithWhereWithoutQuy_cheInput[]
    deleteMany?: HoSoScalarWhereInput | HoSoScalarWhereInput[]
  }

  export type TieuChiUncheckedUpdateManyWithoutQuy_cheNestedInput = {
    create?: XOR<TieuChiCreateWithoutQuy_cheInput, TieuChiUncheckedCreateWithoutQuy_cheInput> | TieuChiCreateWithoutQuy_cheInput[] | TieuChiUncheckedCreateWithoutQuy_cheInput[]
    connectOrCreate?: TieuChiCreateOrConnectWithoutQuy_cheInput | TieuChiCreateOrConnectWithoutQuy_cheInput[]
    upsert?: TieuChiUpsertWithWhereUniqueWithoutQuy_cheInput | TieuChiUpsertWithWhereUniqueWithoutQuy_cheInput[]
    createMany?: TieuChiCreateManyQuy_cheInputEnvelope
    set?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    disconnect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    delete?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    connect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    update?: TieuChiUpdateWithWhereUniqueWithoutQuy_cheInput | TieuChiUpdateWithWhereUniqueWithoutQuy_cheInput[]
    updateMany?: TieuChiUpdateManyWithWhereWithoutQuy_cheInput | TieuChiUpdateManyWithWhereWithoutQuy_cheInput[]
    deleteMany?: TieuChiScalarWhereInput | TieuChiScalarWhereInput[]
  }

  export type HoSoUncheckedUpdateManyWithoutQuy_cheNestedInput = {
    create?: XOR<HoSoCreateWithoutQuy_cheInput, HoSoUncheckedCreateWithoutQuy_cheInput> | HoSoCreateWithoutQuy_cheInput[] | HoSoUncheckedCreateWithoutQuy_cheInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutQuy_cheInput | HoSoCreateOrConnectWithoutQuy_cheInput[]
    upsert?: HoSoUpsertWithWhereUniqueWithoutQuy_cheInput | HoSoUpsertWithWhereUniqueWithoutQuy_cheInput[]
    createMany?: HoSoCreateManyQuy_cheInputEnvelope
    set?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    disconnect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    delete?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    update?: HoSoUpdateWithWhereUniqueWithoutQuy_cheInput | HoSoUpdateWithWhereUniqueWithoutQuy_cheInput[]
    updateMany?: HoSoUpdateManyWithWhereWithoutQuy_cheInput | HoSoUpdateManyWithWhereWithoutQuy_cheInput[]
    deleteMany?: HoSoScalarWhereInput | HoSoScalarWhereInput[]
  }

  export type QuyCheCreateNestedOneWithoutTieu_chisInput = {
    create?: XOR<QuyCheCreateWithoutTieu_chisInput, QuyCheUncheckedCreateWithoutTieu_chisInput>
    connectOrCreate?: QuyCheCreateOrConnectWithoutTieu_chisInput
    connect?: QuyCheWhereUniqueInput
  }

  export type HoatDongCreateNestedManyWithoutTieu_chisInput = {
    create?: XOR<HoatDongCreateWithoutTieu_chisInput, HoatDongUncheckedCreateWithoutTieu_chisInput> | HoatDongCreateWithoutTieu_chisInput[] | HoatDongUncheckedCreateWithoutTieu_chisInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutTieu_chisInput | HoatDongCreateOrConnectWithoutTieu_chisInput[]
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
  }

  export type MinhChungCreateNestedManyWithoutTieu_chiInput = {
    create?: XOR<MinhChungCreateWithoutTieu_chiInput, MinhChungUncheckedCreateWithoutTieu_chiInput> | MinhChungCreateWithoutTieu_chiInput[] | MinhChungUncheckedCreateWithoutTieu_chiInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutTieu_chiInput | MinhChungCreateOrConnectWithoutTieu_chiInput[]
    createMany?: MinhChungCreateManyTieu_chiInputEnvelope
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
  }

  export type HoatDongUncheckedCreateNestedManyWithoutTieu_chisInput = {
    create?: XOR<HoatDongCreateWithoutTieu_chisInput, HoatDongUncheckedCreateWithoutTieu_chisInput> | HoatDongCreateWithoutTieu_chisInput[] | HoatDongUncheckedCreateWithoutTieu_chisInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutTieu_chisInput | HoatDongCreateOrConnectWithoutTieu_chisInput[]
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
  }

  export type MinhChungUncheckedCreateNestedManyWithoutTieu_chiInput = {
    create?: XOR<MinhChungCreateWithoutTieu_chiInput, MinhChungUncheckedCreateWithoutTieu_chiInput> | MinhChungCreateWithoutTieu_chiInput[] | MinhChungUncheckedCreateWithoutTieu_chiInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutTieu_chiInput | MinhChungCreateOrConnectWithoutTieu_chiInput[]
    createMany?: MinhChungCreateManyTieu_chiInputEnvelope
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QuyCheUpdateOneRequiredWithoutTieu_chisNestedInput = {
    create?: XOR<QuyCheCreateWithoutTieu_chisInput, QuyCheUncheckedCreateWithoutTieu_chisInput>
    connectOrCreate?: QuyCheCreateOrConnectWithoutTieu_chisInput
    upsert?: QuyCheUpsertWithoutTieu_chisInput
    connect?: QuyCheWhereUniqueInput
    update?: XOR<XOR<QuyCheUpdateToOneWithWhereWithoutTieu_chisInput, QuyCheUpdateWithoutTieu_chisInput>, QuyCheUncheckedUpdateWithoutTieu_chisInput>
  }

  export type HoatDongUpdateManyWithoutTieu_chisNestedInput = {
    create?: XOR<HoatDongCreateWithoutTieu_chisInput, HoatDongUncheckedCreateWithoutTieu_chisInput> | HoatDongCreateWithoutTieu_chisInput[] | HoatDongUncheckedCreateWithoutTieu_chisInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutTieu_chisInput | HoatDongCreateOrConnectWithoutTieu_chisInput[]
    upsert?: HoatDongUpsertWithWhereUniqueWithoutTieu_chisInput | HoatDongUpsertWithWhereUniqueWithoutTieu_chisInput[]
    set?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    disconnect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    delete?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    update?: HoatDongUpdateWithWhereUniqueWithoutTieu_chisInput | HoatDongUpdateWithWhereUniqueWithoutTieu_chisInput[]
    updateMany?: HoatDongUpdateManyWithWhereWithoutTieu_chisInput | HoatDongUpdateManyWithWhereWithoutTieu_chisInput[]
    deleteMany?: HoatDongScalarWhereInput | HoatDongScalarWhereInput[]
  }

  export type MinhChungUpdateManyWithoutTieu_chiNestedInput = {
    create?: XOR<MinhChungCreateWithoutTieu_chiInput, MinhChungUncheckedCreateWithoutTieu_chiInput> | MinhChungCreateWithoutTieu_chiInput[] | MinhChungUncheckedCreateWithoutTieu_chiInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutTieu_chiInput | MinhChungCreateOrConnectWithoutTieu_chiInput[]
    upsert?: MinhChungUpsertWithWhereUniqueWithoutTieu_chiInput | MinhChungUpsertWithWhereUniqueWithoutTieu_chiInput[]
    createMany?: MinhChungCreateManyTieu_chiInputEnvelope
    set?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    disconnect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    delete?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    update?: MinhChungUpdateWithWhereUniqueWithoutTieu_chiInput | MinhChungUpdateWithWhereUniqueWithoutTieu_chiInput[]
    updateMany?: MinhChungUpdateManyWithWhereWithoutTieu_chiInput | MinhChungUpdateManyWithWhereWithoutTieu_chiInput[]
    deleteMany?: MinhChungScalarWhereInput | MinhChungScalarWhereInput[]
  }

  export type HoatDongUncheckedUpdateManyWithoutTieu_chisNestedInput = {
    create?: XOR<HoatDongCreateWithoutTieu_chisInput, HoatDongUncheckedCreateWithoutTieu_chisInput> | HoatDongCreateWithoutTieu_chisInput[] | HoatDongUncheckedCreateWithoutTieu_chisInput[]
    connectOrCreate?: HoatDongCreateOrConnectWithoutTieu_chisInput | HoatDongCreateOrConnectWithoutTieu_chisInput[]
    upsert?: HoatDongUpsertWithWhereUniqueWithoutTieu_chisInput | HoatDongUpsertWithWhereUniqueWithoutTieu_chisInput[]
    set?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    disconnect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    delete?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    connect?: HoatDongWhereUniqueInput | HoatDongWhereUniqueInput[]
    update?: HoatDongUpdateWithWhereUniqueWithoutTieu_chisInput | HoatDongUpdateWithWhereUniqueWithoutTieu_chisInput[]
    updateMany?: HoatDongUpdateManyWithWhereWithoutTieu_chisInput | HoatDongUpdateManyWithWhereWithoutTieu_chisInput[]
    deleteMany?: HoatDongScalarWhereInput | HoatDongScalarWhereInput[]
  }

  export type MinhChungUncheckedUpdateManyWithoutTieu_chiNestedInput = {
    create?: XOR<MinhChungCreateWithoutTieu_chiInput, MinhChungUncheckedCreateWithoutTieu_chiInput> | MinhChungCreateWithoutTieu_chiInput[] | MinhChungUncheckedCreateWithoutTieu_chiInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutTieu_chiInput | MinhChungCreateOrConnectWithoutTieu_chiInput[]
    upsert?: MinhChungUpsertWithWhereUniqueWithoutTieu_chiInput | MinhChungUpsertWithWhereUniqueWithoutTieu_chiInput[]
    createMany?: MinhChungCreateManyTieu_chiInputEnvelope
    set?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    disconnect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    delete?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    update?: MinhChungUpdateWithWhereUniqueWithoutTieu_chiInput | MinhChungUpdateWithWhereUniqueWithoutTieu_chiInput[]
    updateMany?: MinhChungUpdateManyWithWhereWithoutTieu_chiInput | MinhChungUpdateManyWithWhereWithoutTieu_chiInput[]
    deleteMany?: MinhChungScalarWhereInput | MinhChungScalarWhereInput[]
  }

  export type DonViCreateNestedOneWithoutHoat_dongsInput = {
    create?: XOR<DonViCreateWithoutHoat_dongsInput, DonViUncheckedCreateWithoutHoat_dongsInput>
    connectOrCreate?: DonViCreateOrConnectWithoutHoat_dongsInput
    connect?: DonViWhereUniqueInput
  }

  export type NguoiDungCreateNestedOneWithoutHoat_dong_duyetsInput = {
    create?: XOR<NguoiDungCreateWithoutHoat_dong_duyetsInput, NguoiDungUncheckedCreateWithoutHoat_dong_duyetsInput>
    connectOrCreate?: NguoiDungCreateOrConnectWithoutHoat_dong_duyetsInput
    connect?: NguoiDungWhereUniqueInput
  }

  export type TieuChiCreateNestedManyWithoutHoat_dongsInput = {
    create?: XOR<TieuChiCreateWithoutHoat_dongsInput, TieuChiUncheckedCreateWithoutHoat_dongsInput> | TieuChiCreateWithoutHoat_dongsInput[] | TieuChiUncheckedCreateWithoutHoat_dongsInput[]
    connectOrCreate?: TieuChiCreateOrConnectWithoutHoat_dongsInput | TieuChiCreateOrConnectWithoutHoat_dongsInput[]
    connect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
  }

  export type DiemDanhCreateNestedManyWithoutHoat_dongInput = {
    create?: XOR<DiemDanhCreateWithoutHoat_dongInput, DiemDanhUncheckedCreateWithoutHoat_dongInput> | DiemDanhCreateWithoutHoat_dongInput[] | DiemDanhUncheckedCreateWithoutHoat_dongInput[]
    connectOrCreate?: DiemDanhCreateOrConnectWithoutHoat_dongInput | DiemDanhCreateOrConnectWithoutHoat_dongInput[]
    createMany?: DiemDanhCreateManyHoat_dongInputEnvelope
    connect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
  }

  export type TieuChiUncheckedCreateNestedManyWithoutHoat_dongsInput = {
    create?: XOR<TieuChiCreateWithoutHoat_dongsInput, TieuChiUncheckedCreateWithoutHoat_dongsInput> | TieuChiCreateWithoutHoat_dongsInput[] | TieuChiUncheckedCreateWithoutHoat_dongsInput[]
    connectOrCreate?: TieuChiCreateOrConnectWithoutHoat_dongsInput | TieuChiCreateOrConnectWithoutHoat_dongsInput[]
    connect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
  }

  export type DiemDanhUncheckedCreateNestedManyWithoutHoat_dongInput = {
    create?: XOR<DiemDanhCreateWithoutHoat_dongInput, DiemDanhUncheckedCreateWithoutHoat_dongInput> | DiemDanhCreateWithoutHoat_dongInput[] | DiemDanhUncheckedCreateWithoutHoat_dongInput[]
    connectOrCreate?: DiemDanhCreateOrConnectWithoutHoat_dongInput | DiemDanhCreateOrConnectWithoutHoat_dongInput[]
    createMany?: DiemDanhCreateManyHoat_dongInputEnvelope
    connect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
  }

  export type DonViUpdateOneRequiredWithoutHoat_dongsNestedInput = {
    create?: XOR<DonViCreateWithoutHoat_dongsInput, DonViUncheckedCreateWithoutHoat_dongsInput>
    connectOrCreate?: DonViCreateOrConnectWithoutHoat_dongsInput
    upsert?: DonViUpsertWithoutHoat_dongsInput
    connect?: DonViWhereUniqueInput
    update?: XOR<XOR<DonViUpdateToOneWithWhereWithoutHoat_dongsInput, DonViUpdateWithoutHoat_dongsInput>, DonViUncheckedUpdateWithoutHoat_dongsInput>
  }

  export type NguoiDungUpdateOneWithoutHoat_dong_duyetsNestedInput = {
    create?: XOR<NguoiDungCreateWithoutHoat_dong_duyetsInput, NguoiDungUncheckedCreateWithoutHoat_dong_duyetsInput>
    connectOrCreate?: NguoiDungCreateOrConnectWithoutHoat_dong_duyetsInput
    upsert?: NguoiDungUpsertWithoutHoat_dong_duyetsInput
    disconnect?: NguoiDungWhereInput | boolean
    delete?: NguoiDungWhereInput | boolean
    connect?: NguoiDungWhereUniqueInput
    update?: XOR<XOR<NguoiDungUpdateToOneWithWhereWithoutHoat_dong_duyetsInput, NguoiDungUpdateWithoutHoat_dong_duyetsInput>, NguoiDungUncheckedUpdateWithoutHoat_dong_duyetsInput>
  }

  export type TieuChiUpdateManyWithoutHoat_dongsNestedInput = {
    create?: XOR<TieuChiCreateWithoutHoat_dongsInput, TieuChiUncheckedCreateWithoutHoat_dongsInput> | TieuChiCreateWithoutHoat_dongsInput[] | TieuChiUncheckedCreateWithoutHoat_dongsInput[]
    connectOrCreate?: TieuChiCreateOrConnectWithoutHoat_dongsInput | TieuChiCreateOrConnectWithoutHoat_dongsInput[]
    upsert?: TieuChiUpsertWithWhereUniqueWithoutHoat_dongsInput | TieuChiUpsertWithWhereUniqueWithoutHoat_dongsInput[]
    set?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    disconnect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    delete?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    connect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    update?: TieuChiUpdateWithWhereUniqueWithoutHoat_dongsInput | TieuChiUpdateWithWhereUniqueWithoutHoat_dongsInput[]
    updateMany?: TieuChiUpdateManyWithWhereWithoutHoat_dongsInput | TieuChiUpdateManyWithWhereWithoutHoat_dongsInput[]
    deleteMany?: TieuChiScalarWhereInput | TieuChiScalarWhereInput[]
  }

  export type DiemDanhUpdateManyWithoutHoat_dongNestedInput = {
    create?: XOR<DiemDanhCreateWithoutHoat_dongInput, DiemDanhUncheckedCreateWithoutHoat_dongInput> | DiemDanhCreateWithoutHoat_dongInput[] | DiemDanhUncheckedCreateWithoutHoat_dongInput[]
    connectOrCreate?: DiemDanhCreateOrConnectWithoutHoat_dongInput | DiemDanhCreateOrConnectWithoutHoat_dongInput[]
    upsert?: DiemDanhUpsertWithWhereUniqueWithoutHoat_dongInput | DiemDanhUpsertWithWhereUniqueWithoutHoat_dongInput[]
    createMany?: DiemDanhCreateManyHoat_dongInputEnvelope
    set?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    disconnect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    delete?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    connect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    update?: DiemDanhUpdateWithWhereUniqueWithoutHoat_dongInput | DiemDanhUpdateWithWhereUniqueWithoutHoat_dongInput[]
    updateMany?: DiemDanhUpdateManyWithWhereWithoutHoat_dongInput | DiemDanhUpdateManyWithWhereWithoutHoat_dongInput[]
    deleteMany?: DiemDanhScalarWhereInput | DiemDanhScalarWhereInput[]
  }

  export type TieuChiUncheckedUpdateManyWithoutHoat_dongsNestedInput = {
    create?: XOR<TieuChiCreateWithoutHoat_dongsInput, TieuChiUncheckedCreateWithoutHoat_dongsInput> | TieuChiCreateWithoutHoat_dongsInput[] | TieuChiUncheckedCreateWithoutHoat_dongsInput[]
    connectOrCreate?: TieuChiCreateOrConnectWithoutHoat_dongsInput | TieuChiCreateOrConnectWithoutHoat_dongsInput[]
    upsert?: TieuChiUpsertWithWhereUniqueWithoutHoat_dongsInput | TieuChiUpsertWithWhereUniqueWithoutHoat_dongsInput[]
    set?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    disconnect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    delete?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    connect?: TieuChiWhereUniqueInput | TieuChiWhereUniqueInput[]
    update?: TieuChiUpdateWithWhereUniqueWithoutHoat_dongsInput | TieuChiUpdateWithWhereUniqueWithoutHoat_dongsInput[]
    updateMany?: TieuChiUpdateManyWithWhereWithoutHoat_dongsInput | TieuChiUpdateManyWithWhereWithoutHoat_dongsInput[]
    deleteMany?: TieuChiScalarWhereInput | TieuChiScalarWhereInput[]
  }

  export type DiemDanhUncheckedUpdateManyWithoutHoat_dongNestedInput = {
    create?: XOR<DiemDanhCreateWithoutHoat_dongInput, DiemDanhUncheckedCreateWithoutHoat_dongInput> | DiemDanhCreateWithoutHoat_dongInput[] | DiemDanhUncheckedCreateWithoutHoat_dongInput[]
    connectOrCreate?: DiemDanhCreateOrConnectWithoutHoat_dongInput | DiemDanhCreateOrConnectWithoutHoat_dongInput[]
    upsert?: DiemDanhUpsertWithWhereUniqueWithoutHoat_dongInput | DiemDanhUpsertWithWhereUniqueWithoutHoat_dongInput[]
    createMany?: DiemDanhCreateManyHoat_dongInputEnvelope
    set?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    disconnect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    delete?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    connect?: DiemDanhWhereUniqueInput | DiemDanhWhereUniqueInput[]
    update?: DiemDanhUpdateWithWhereUniqueWithoutHoat_dongInput | DiemDanhUpdateWithWhereUniqueWithoutHoat_dongInput[]
    updateMany?: DiemDanhUpdateManyWithWhereWithoutHoat_dongInput | DiemDanhUpdateManyWithWhereWithoutHoat_dongInput[]
    deleteMany?: DiemDanhScalarWhereInput | DiemDanhScalarWhereInput[]
  }

  export type HoatDongCreateNestedOneWithoutDiem_danhsInput = {
    create?: XOR<HoatDongCreateWithoutDiem_danhsInput, HoatDongUncheckedCreateWithoutDiem_danhsInput>
    connectOrCreate?: HoatDongCreateOrConnectWithoutDiem_danhsInput
    connect?: HoatDongWhereUniqueInput
  }

  export type NguoiDungCreateNestedOneWithoutDiem_danhsInput = {
    create?: XOR<NguoiDungCreateWithoutDiem_danhsInput, NguoiDungUncheckedCreateWithoutDiem_danhsInput>
    connectOrCreate?: NguoiDungCreateOrConnectWithoutDiem_danhsInput
    connect?: NguoiDungWhereUniqueInput
  }

  export type HoatDongUpdateOneRequiredWithoutDiem_danhsNestedInput = {
    create?: XOR<HoatDongCreateWithoutDiem_danhsInput, HoatDongUncheckedCreateWithoutDiem_danhsInput>
    connectOrCreate?: HoatDongCreateOrConnectWithoutDiem_danhsInput
    upsert?: HoatDongUpsertWithoutDiem_danhsInput
    connect?: HoatDongWhereUniqueInput
    update?: XOR<XOR<HoatDongUpdateToOneWithWhereWithoutDiem_danhsInput, HoatDongUpdateWithoutDiem_danhsInput>, HoatDongUncheckedUpdateWithoutDiem_danhsInput>
  }

  export type NguoiDungUpdateOneRequiredWithoutDiem_danhsNestedInput = {
    create?: XOR<NguoiDungCreateWithoutDiem_danhsInput, NguoiDungUncheckedCreateWithoutDiem_danhsInput>
    connectOrCreate?: NguoiDungCreateOrConnectWithoutDiem_danhsInput
    upsert?: NguoiDungUpsertWithoutDiem_danhsInput
    connect?: NguoiDungWhereUniqueInput
    update?: XOR<XOR<NguoiDungUpdateToOneWithWhereWithoutDiem_danhsInput, NguoiDungUpdateWithoutDiem_danhsInput>, NguoiDungUncheckedUpdateWithoutDiem_danhsInput>
  }

  export type NguoiDungCreateNestedOneWithoutMinh_chungsInput = {
    create?: XOR<NguoiDungCreateWithoutMinh_chungsInput, NguoiDungUncheckedCreateWithoutMinh_chungsInput>
    connectOrCreate?: NguoiDungCreateOrConnectWithoutMinh_chungsInput
    connect?: NguoiDungWhereUniqueInput
  }

  export type TieuChiCreateNestedOneWithoutMinh_chungsInput = {
    create?: XOR<TieuChiCreateWithoutMinh_chungsInput, TieuChiUncheckedCreateWithoutMinh_chungsInput>
    connectOrCreate?: TieuChiCreateOrConnectWithoutMinh_chungsInput
    connect?: TieuChiWhereUniqueInput
  }

  export type HoSoCreateNestedManyWithoutMinh_chungsInput = {
    create?: XOR<HoSoCreateWithoutMinh_chungsInput, HoSoUncheckedCreateWithoutMinh_chungsInput> | HoSoCreateWithoutMinh_chungsInput[] | HoSoUncheckedCreateWithoutMinh_chungsInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutMinh_chungsInput | HoSoCreateOrConnectWithoutMinh_chungsInput[]
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
  }

  export type HoSoUncheckedCreateNestedManyWithoutMinh_chungsInput = {
    create?: XOR<HoSoCreateWithoutMinh_chungsInput, HoSoUncheckedCreateWithoutMinh_chungsInput> | HoSoCreateWithoutMinh_chungsInput[] | HoSoUncheckedCreateWithoutMinh_chungsInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutMinh_chungsInput | HoSoCreateOrConnectWithoutMinh_chungsInput[]
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
  }

  export type NguoiDungUpdateOneRequiredWithoutMinh_chungsNestedInput = {
    create?: XOR<NguoiDungCreateWithoutMinh_chungsInput, NguoiDungUncheckedCreateWithoutMinh_chungsInput>
    connectOrCreate?: NguoiDungCreateOrConnectWithoutMinh_chungsInput
    upsert?: NguoiDungUpsertWithoutMinh_chungsInput
    connect?: NguoiDungWhereUniqueInput
    update?: XOR<XOR<NguoiDungUpdateToOneWithWhereWithoutMinh_chungsInput, NguoiDungUpdateWithoutMinh_chungsInput>, NguoiDungUncheckedUpdateWithoutMinh_chungsInput>
  }

  export type TieuChiUpdateOneWithoutMinh_chungsNestedInput = {
    create?: XOR<TieuChiCreateWithoutMinh_chungsInput, TieuChiUncheckedCreateWithoutMinh_chungsInput>
    connectOrCreate?: TieuChiCreateOrConnectWithoutMinh_chungsInput
    upsert?: TieuChiUpsertWithoutMinh_chungsInput
    disconnect?: TieuChiWhereInput | boolean
    delete?: TieuChiWhereInput | boolean
    connect?: TieuChiWhereUniqueInput
    update?: XOR<XOR<TieuChiUpdateToOneWithWhereWithoutMinh_chungsInput, TieuChiUpdateWithoutMinh_chungsInput>, TieuChiUncheckedUpdateWithoutMinh_chungsInput>
  }

  export type HoSoUpdateManyWithoutMinh_chungsNestedInput = {
    create?: XOR<HoSoCreateWithoutMinh_chungsInput, HoSoUncheckedCreateWithoutMinh_chungsInput> | HoSoCreateWithoutMinh_chungsInput[] | HoSoUncheckedCreateWithoutMinh_chungsInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutMinh_chungsInput | HoSoCreateOrConnectWithoutMinh_chungsInput[]
    upsert?: HoSoUpsertWithWhereUniqueWithoutMinh_chungsInput | HoSoUpsertWithWhereUniqueWithoutMinh_chungsInput[]
    set?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    disconnect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    delete?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    update?: HoSoUpdateWithWhereUniqueWithoutMinh_chungsInput | HoSoUpdateWithWhereUniqueWithoutMinh_chungsInput[]
    updateMany?: HoSoUpdateManyWithWhereWithoutMinh_chungsInput | HoSoUpdateManyWithWhereWithoutMinh_chungsInput[]
    deleteMany?: HoSoScalarWhereInput | HoSoScalarWhereInput[]
  }

  export type HoSoUncheckedUpdateManyWithoutMinh_chungsNestedInput = {
    create?: XOR<HoSoCreateWithoutMinh_chungsInput, HoSoUncheckedCreateWithoutMinh_chungsInput> | HoSoCreateWithoutMinh_chungsInput[] | HoSoUncheckedCreateWithoutMinh_chungsInput[]
    connectOrCreate?: HoSoCreateOrConnectWithoutMinh_chungsInput | HoSoCreateOrConnectWithoutMinh_chungsInput[]
    upsert?: HoSoUpsertWithWhereUniqueWithoutMinh_chungsInput | HoSoUpsertWithWhereUniqueWithoutMinh_chungsInput[]
    set?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    disconnect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    delete?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    connect?: HoSoWhereUniqueInput | HoSoWhereUniqueInput[]
    update?: HoSoUpdateWithWhereUniqueWithoutMinh_chungsInput | HoSoUpdateWithWhereUniqueWithoutMinh_chungsInput[]
    updateMany?: HoSoUpdateManyWithWhereWithoutMinh_chungsInput | HoSoUpdateManyWithWhereWithoutMinh_chungsInput[]
    deleteMany?: HoSoScalarWhereInput | HoSoScalarWhereInput[]
  }

  export type NguoiDungCreateNestedOneWithoutHo_sosInput = {
    create?: XOR<NguoiDungCreateWithoutHo_sosInput, NguoiDungUncheckedCreateWithoutHo_sosInput>
    connectOrCreate?: NguoiDungCreateOrConnectWithoutHo_sosInput
    connect?: NguoiDungWhereUniqueInput
  }

  export type QuyCheCreateNestedOneWithoutHo_sosInput = {
    create?: XOR<QuyCheCreateWithoutHo_sosInput, QuyCheUncheckedCreateWithoutHo_sosInput>
    connectOrCreate?: QuyCheCreateOrConnectWithoutHo_sosInput
    connect?: QuyCheWhereUniqueInput
  }

  export type MinhChungCreateNestedManyWithoutHo_sosInput = {
    create?: XOR<MinhChungCreateWithoutHo_sosInput, MinhChungUncheckedCreateWithoutHo_sosInput> | MinhChungCreateWithoutHo_sosInput[] | MinhChungUncheckedCreateWithoutHo_sosInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutHo_sosInput | MinhChungCreateOrConnectWithoutHo_sosInput[]
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
  }

  export type MinhChungUncheckedCreateNestedManyWithoutHo_sosInput = {
    create?: XOR<MinhChungCreateWithoutHo_sosInput, MinhChungUncheckedCreateWithoutHo_sosInput> | MinhChungCreateWithoutHo_sosInput[] | MinhChungUncheckedCreateWithoutHo_sosInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutHo_sosInput | MinhChungCreateOrConnectWithoutHo_sosInput[]
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
  }

  export type EnumTrangThaiHoSoFieldUpdateOperationsInput = {
    set?: $Enums.TrangThaiHoSo
  }

  export type NguoiDungUpdateOneRequiredWithoutHo_sosNestedInput = {
    create?: XOR<NguoiDungCreateWithoutHo_sosInput, NguoiDungUncheckedCreateWithoutHo_sosInput>
    connectOrCreate?: NguoiDungCreateOrConnectWithoutHo_sosInput
    upsert?: NguoiDungUpsertWithoutHo_sosInput
    connect?: NguoiDungWhereUniqueInput
    update?: XOR<XOR<NguoiDungUpdateToOneWithWhereWithoutHo_sosInput, NguoiDungUpdateWithoutHo_sosInput>, NguoiDungUncheckedUpdateWithoutHo_sosInput>
  }

  export type QuyCheUpdateOneRequiredWithoutHo_sosNestedInput = {
    create?: XOR<QuyCheCreateWithoutHo_sosInput, QuyCheUncheckedCreateWithoutHo_sosInput>
    connectOrCreate?: QuyCheCreateOrConnectWithoutHo_sosInput
    upsert?: QuyCheUpsertWithoutHo_sosInput
    connect?: QuyCheWhereUniqueInput
    update?: XOR<XOR<QuyCheUpdateToOneWithWhereWithoutHo_sosInput, QuyCheUpdateWithoutHo_sosInput>, QuyCheUncheckedUpdateWithoutHo_sosInput>
  }

  export type MinhChungUpdateManyWithoutHo_sosNestedInput = {
    create?: XOR<MinhChungCreateWithoutHo_sosInput, MinhChungUncheckedCreateWithoutHo_sosInput> | MinhChungCreateWithoutHo_sosInput[] | MinhChungUncheckedCreateWithoutHo_sosInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutHo_sosInput | MinhChungCreateOrConnectWithoutHo_sosInput[]
    upsert?: MinhChungUpsertWithWhereUniqueWithoutHo_sosInput | MinhChungUpsertWithWhereUniqueWithoutHo_sosInput[]
    set?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    disconnect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    delete?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    update?: MinhChungUpdateWithWhereUniqueWithoutHo_sosInput | MinhChungUpdateWithWhereUniqueWithoutHo_sosInput[]
    updateMany?: MinhChungUpdateManyWithWhereWithoutHo_sosInput | MinhChungUpdateManyWithWhereWithoutHo_sosInput[]
    deleteMany?: MinhChungScalarWhereInput | MinhChungScalarWhereInput[]
  }

  export type MinhChungUncheckedUpdateManyWithoutHo_sosNestedInput = {
    create?: XOR<MinhChungCreateWithoutHo_sosInput, MinhChungUncheckedCreateWithoutHo_sosInput> | MinhChungCreateWithoutHo_sosInput[] | MinhChungUncheckedCreateWithoutHo_sosInput[]
    connectOrCreate?: MinhChungCreateOrConnectWithoutHo_sosInput | MinhChungCreateOrConnectWithoutHo_sosInput[]
    upsert?: MinhChungUpsertWithWhereUniqueWithoutHo_sosInput | MinhChungUpsertWithWhereUniqueWithoutHo_sosInput[]
    set?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    disconnect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    delete?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    connect?: MinhChungWhereUniqueInput | MinhChungWhereUniqueInput[]
    update?: MinhChungUpdateWithWhereUniqueWithoutHo_sosInput | MinhChungUpdateWithWhereUniqueWithoutHo_sosInput[]
    updateMany?: MinhChungUpdateManyWithWhereWithoutHo_sosInput | MinhChungUpdateManyWithWhereWithoutHo_sosInput[]
    deleteMany?: MinhChungScalarWhereInput | MinhChungScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumCapDoFilter<$PrismaModel = never> = {
    equals?: $Enums.CapDo | EnumCapDoFieldRefInput<$PrismaModel>
    in?: $Enums.CapDo[] | ListEnumCapDoFieldRefInput<$PrismaModel>
    notIn?: $Enums.CapDo[] | ListEnumCapDoFieldRefInput<$PrismaModel>
    not?: NestedEnumCapDoFilter<$PrismaModel> | $Enums.CapDo
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumCapDoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapDo | EnumCapDoFieldRefInput<$PrismaModel>
    in?: $Enums.CapDo[] | ListEnumCapDoFieldRefInput<$PrismaModel>
    notIn?: $Enums.CapDo[] | ListEnumCapDoFieldRefInput<$PrismaModel>
    not?: NestedEnumCapDoWithAggregatesFilter<$PrismaModel> | $Enums.CapDo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCapDoFilter<$PrismaModel>
    _max?: NestedEnumCapDoFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumVaiTroFilter<$PrismaModel = never> = {
    equals?: $Enums.VaiTro | EnumVaiTroFieldRefInput<$PrismaModel>
    in?: $Enums.VaiTro[] | ListEnumVaiTroFieldRefInput<$PrismaModel>
    notIn?: $Enums.VaiTro[] | ListEnumVaiTroFieldRefInput<$PrismaModel>
    not?: NestedEnumVaiTroFilter<$PrismaModel> | $Enums.VaiTro
  }

  export type NestedEnumTrangThaiTKFilter<$PrismaModel = never> = {
    equals?: $Enums.TrangThaiTK | EnumTrangThaiTKFieldRefInput<$PrismaModel>
    in?: $Enums.TrangThaiTK[] | ListEnumTrangThaiTKFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrangThaiTK[] | ListEnumTrangThaiTKFieldRefInput<$PrismaModel>
    not?: NestedEnumTrangThaiTKFilter<$PrismaModel> | $Enums.TrangThaiTK
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumVaiTroWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VaiTro | EnumVaiTroFieldRefInput<$PrismaModel>
    in?: $Enums.VaiTro[] | ListEnumVaiTroFieldRefInput<$PrismaModel>
    notIn?: $Enums.VaiTro[] | ListEnumVaiTroFieldRefInput<$PrismaModel>
    not?: NestedEnumVaiTroWithAggregatesFilter<$PrismaModel> | $Enums.VaiTro
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVaiTroFilter<$PrismaModel>
    _max?: NestedEnumVaiTroFilter<$PrismaModel>
  }

  export type NestedEnumTrangThaiTKWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrangThaiTK | EnumTrangThaiTKFieldRefInput<$PrismaModel>
    in?: $Enums.TrangThaiTK[] | ListEnumTrangThaiTKFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrangThaiTK[] | ListEnumTrangThaiTKFieldRefInput<$PrismaModel>
    not?: NestedEnumTrangThaiTKWithAggregatesFilter<$PrismaModel> | $Enums.TrangThaiTK
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrangThaiTKFilter<$PrismaModel>
    _max?: NestedEnumTrangThaiTKFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTrangThaiHoSoFilter<$PrismaModel = never> = {
    equals?: $Enums.TrangThaiHoSo | EnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    in?: $Enums.TrangThaiHoSo[] | ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrangThaiHoSo[] | ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    not?: NestedEnumTrangThaiHoSoFilter<$PrismaModel> | $Enums.TrangThaiHoSo
  }

  export type NestedEnumTrangThaiHoSoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrangThaiHoSo | EnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    in?: $Enums.TrangThaiHoSo[] | ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrangThaiHoSo[] | ListEnumTrangThaiHoSoFieldRefInput<$PrismaModel>
    not?: NestedEnumTrangThaiHoSoWithAggregatesFilter<$PrismaModel> | $Enums.TrangThaiHoSo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrangThaiHoSoFilter<$PrismaModel>
    _max?: NestedEnumTrangThaiHoSoFilter<$PrismaModel>
  }

  export type DonViCreateWithoutChildrenInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    trang_thai?: boolean
    created_at?: Date | string
    parent?: DonViCreateNestedOneWithoutChildrenInput
    nguoi_dungs?: NguoiDungCreateNestedManyWithoutDon_viInput
    quy_ches?: QuyCheCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViUncheckedCreateWithoutChildrenInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    parent_id?: string | null
    trang_thai?: boolean
    created_at?: Date | string
    nguoi_dungs?: NguoiDungUncheckedCreateNestedManyWithoutDon_viInput
    quy_ches?: QuyCheUncheckedCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongUncheckedCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViCreateOrConnectWithoutChildrenInput = {
    where: DonViWhereUniqueInput
    create: XOR<DonViCreateWithoutChildrenInput, DonViUncheckedCreateWithoutChildrenInput>
  }

  export type DonViCreateWithoutParentInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    trang_thai?: boolean
    created_at?: Date | string
    children?: DonViCreateNestedManyWithoutParentInput
    nguoi_dungs?: NguoiDungCreateNestedManyWithoutDon_viInput
    quy_ches?: QuyCheCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViUncheckedCreateWithoutParentInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    trang_thai?: boolean
    created_at?: Date | string
    children?: DonViUncheckedCreateNestedManyWithoutParentInput
    nguoi_dungs?: NguoiDungUncheckedCreateNestedManyWithoutDon_viInput
    quy_ches?: QuyCheUncheckedCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongUncheckedCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViCreateOrConnectWithoutParentInput = {
    where: DonViWhereUniqueInput
    create: XOR<DonViCreateWithoutParentInput, DonViUncheckedCreateWithoutParentInput>
  }

  export type DonViCreateManyParentInputEnvelope = {
    data: DonViCreateManyParentInput | DonViCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type NguoiDungCreateWithoutDon_viInput = {
    id?: string
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    diem_danhs?: DiemDanhCreateNestedManyWithoutNguoi_dungInput
    minh_chungs?: MinhChungCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungUncheckedCreateWithoutDon_viInput = {
    id?: string
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutNguoi_dungInput
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongUncheckedCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungCreateOrConnectWithoutDon_viInput = {
    where: NguoiDungWhereUniqueInput
    create: XOR<NguoiDungCreateWithoutDon_viInput, NguoiDungUncheckedCreateWithoutDon_viInput>
  }

  export type NguoiDungCreateManyDon_viInputEnvelope = {
    data: NguoiDungCreateManyDon_viInput | NguoiDungCreateManyDon_viInput[]
    skipDuplicates?: boolean
  }

  export type QuyCheCreateWithoutDon_viInput = {
    id?: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
    tieu_chis?: TieuChiCreateNestedManyWithoutQuy_cheInput
    ho_sos?: HoSoCreateNestedManyWithoutQuy_cheInput
  }

  export type QuyCheUncheckedCreateWithoutDon_viInput = {
    id?: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
    tieu_chis?: TieuChiUncheckedCreateNestedManyWithoutQuy_cheInput
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutQuy_cheInput
  }

  export type QuyCheCreateOrConnectWithoutDon_viInput = {
    where: QuyCheWhereUniqueInput
    create: XOR<QuyCheCreateWithoutDon_viInput, QuyCheUncheckedCreateWithoutDon_viInput>
  }

  export type QuyCheCreateManyDon_viInputEnvelope = {
    data: QuyCheCreateManyDon_viInput | QuyCheCreateManyDon_viInput[]
    skipDuplicates?: boolean
  }

  export type HoatDongCreateWithoutDon_vi_tcInput = {
    id?: string
    ten_hoat_dong: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    nguoi_duyet?: NguoiDungCreateNestedOneWithoutHoat_dong_duyetsInput
    tieu_chis?: TieuChiCreateNestedManyWithoutHoat_dongsInput
    diem_danhs?: DiemDanhCreateNestedManyWithoutHoat_dongInput
  }

  export type HoatDongUncheckedCreateWithoutDon_vi_tcInput = {
    id?: string
    ten_hoat_dong: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    nguoi_duyet_id?: string | null
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    tieu_chis?: TieuChiUncheckedCreateNestedManyWithoutHoat_dongsInput
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutHoat_dongInput
  }

  export type HoatDongCreateOrConnectWithoutDon_vi_tcInput = {
    where: HoatDongWhereUniqueInput
    create: XOR<HoatDongCreateWithoutDon_vi_tcInput, HoatDongUncheckedCreateWithoutDon_vi_tcInput>
  }

  export type HoatDongCreateManyDon_vi_tcInputEnvelope = {
    data: HoatDongCreateManyDon_vi_tcInput | HoatDongCreateManyDon_vi_tcInput[]
    skipDuplicates?: boolean
  }

  export type DonViUpsertWithoutChildrenInput = {
    update: XOR<DonViUpdateWithoutChildrenInput, DonViUncheckedUpdateWithoutChildrenInput>
    create: XOR<DonViCreateWithoutChildrenInput, DonViUncheckedCreateWithoutChildrenInput>
    where?: DonViWhereInput
  }

  export type DonViUpdateToOneWithWhereWithoutChildrenInput = {
    where?: DonViWhereInput
    data: XOR<DonViUpdateWithoutChildrenInput, DonViUncheckedUpdateWithoutChildrenInput>
  }

  export type DonViUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: DonViUpdateOneWithoutChildrenNestedInput
    nguoi_dungs?: NguoiDungUpdateManyWithoutDon_viNestedInput
    quy_ches?: QuyCheUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DonViUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nguoi_dungs?: NguoiDungUncheckedUpdateManyWithoutDon_viNestedInput
    quy_ches?: QuyCheUncheckedUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUncheckedUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DonViUpsertWithWhereUniqueWithoutParentInput = {
    where: DonViWhereUniqueInput
    update: XOR<DonViUpdateWithoutParentInput, DonViUncheckedUpdateWithoutParentInput>
    create: XOR<DonViCreateWithoutParentInput, DonViUncheckedCreateWithoutParentInput>
  }

  export type DonViUpdateWithWhereUniqueWithoutParentInput = {
    where: DonViWhereUniqueInput
    data: XOR<DonViUpdateWithoutParentInput, DonViUncheckedUpdateWithoutParentInput>
  }

  export type DonViUpdateManyWithWhereWithoutParentInput = {
    where: DonViScalarWhereInput
    data: XOR<DonViUpdateManyMutationInput, DonViUncheckedUpdateManyWithoutParentInput>
  }

  export type DonViScalarWhereInput = {
    AND?: DonViScalarWhereInput | DonViScalarWhereInput[]
    OR?: DonViScalarWhereInput[]
    NOT?: DonViScalarWhereInput | DonViScalarWhereInput[]
    id?: UuidFilter<"DonVi"> | string
    ten_don_vi?: StringFilter<"DonVi"> | string
    cap_do?: EnumCapDoFilter<"DonVi"> | $Enums.CapDo
    parent_id?: UuidNullableFilter<"DonVi"> | string | null
    trang_thai?: BoolFilter<"DonVi"> | boolean
    created_at?: DateTimeFilter<"DonVi"> | Date | string
  }

  export type NguoiDungUpsertWithWhereUniqueWithoutDon_viInput = {
    where: NguoiDungWhereUniqueInput
    update: XOR<NguoiDungUpdateWithoutDon_viInput, NguoiDungUncheckedUpdateWithoutDon_viInput>
    create: XOR<NguoiDungCreateWithoutDon_viInput, NguoiDungUncheckedCreateWithoutDon_viInput>
  }

  export type NguoiDungUpdateWithWhereUniqueWithoutDon_viInput = {
    where: NguoiDungWhereUniqueInput
    data: XOR<NguoiDungUpdateWithoutDon_viInput, NguoiDungUncheckedUpdateWithoutDon_viInput>
  }

  export type NguoiDungUpdateManyWithWhereWithoutDon_viInput = {
    where: NguoiDungScalarWhereInput
    data: XOR<NguoiDungUpdateManyMutationInput, NguoiDungUncheckedUpdateManyWithoutDon_viInput>
  }

  export type NguoiDungScalarWhereInput = {
    AND?: NguoiDungScalarWhereInput | NguoiDungScalarWhereInput[]
    OR?: NguoiDungScalarWhereInput[]
    NOT?: NguoiDungScalarWhereInput | NguoiDungScalarWhereInput[]
    id?: UuidFilter<"NguoiDung"> | string
    don_vi_id?: UuidNullableFilter<"NguoiDung"> | string | null
    email?: StringFilter<"NguoiDung"> | string
    msv?: StringNullableFilter<"NguoiDung"> | string | null
    mat_khau?: StringFilter<"NguoiDung"> | string
    ho_ten?: StringFilter<"NguoiDung"> | string
    vai_tro?: EnumVaiTroFilter<"NguoiDung"> | $Enums.VaiTro
    cccd?: StringNullableFilter<"NguoiDung"> | string | null
    trang_thai?: EnumTrangThaiTKFilter<"NguoiDung"> | $Enums.TrangThaiTK
    so_dien_thoai?: StringNullableFilter<"NguoiDung"> | string | null
    reset_otp?: StringNullableFilter<"NguoiDung"> | string | null
    reset_otp_expires?: DateTimeNullableFilter<"NguoiDung"> | Date | string | null
    created_at?: DateTimeFilter<"NguoiDung"> | Date | string
  }

  export type QuyCheUpsertWithWhereUniqueWithoutDon_viInput = {
    where: QuyCheWhereUniqueInput
    update: XOR<QuyCheUpdateWithoutDon_viInput, QuyCheUncheckedUpdateWithoutDon_viInput>
    create: XOR<QuyCheCreateWithoutDon_viInput, QuyCheUncheckedCreateWithoutDon_viInput>
  }

  export type QuyCheUpdateWithWhereUniqueWithoutDon_viInput = {
    where: QuyCheWhereUniqueInput
    data: XOR<QuyCheUpdateWithoutDon_viInput, QuyCheUncheckedUpdateWithoutDon_viInput>
  }

  export type QuyCheUpdateManyWithWhereWithoutDon_viInput = {
    where: QuyCheScalarWhereInput
    data: XOR<QuyCheUpdateManyMutationInput, QuyCheUncheckedUpdateManyWithoutDon_viInput>
  }

  export type QuyCheScalarWhereInput = {
    AND?: QuyCheScalarWhereInput | QuyCheScalarWhereInput[]
    OR?: QuyCheScalarWhereInput[]
    NOT?: QuyCheScalarWhereInput | QuyCheScalarWhereInput[]
    id?: UuidFilter<"QuyChe"> | string
    don_vi_id?: UuidFilter<"QuyChe"> | string
    nam_hoc?: StringFilter<"QuyChe"> | string
    ngay_mo_cong?: DateTimeFilter<"QuyChe"> | Date | string
    ngay_dong_cong?: DateTimeFilter<"QuyChe"> | Date | string
    so_tieu_chi_dat?: IntFilter<"QuyChe"> | number
    created_at?: DateTimeFilter<"QuyChe"> | Date | string
  }

  export type HoatDongUpsertWithWhereUniqueWithoutDon_vi_tcInput = {
    where: HoatDongWhereUniqueInput
    update: XOR<HoatDongUpdateWithoutDon_vi_tcInput, HoatDongUncheckedUpdateWithoutDon_vi_tcInput>
    create: XOR<HoatDongCreateWithoutDon_vi_tcInput, HoatDongUncheckedCreateWithoutDon_vi_tcInput>
  }

  export type HoatDongUpdateWithWhereUniqueWithoutDon_vi_tcInput = {
    where: HoatDongWhereUniqueInput
    data: XOR<HoatDongUpdateWithoutDon_vi_tcInput, HoatDongUncheckedUpdateWithoutDon_vi_tcInput>
  }

  export type HoatDongUpdateManyWithWhereWithoutDon_vi_tcInput = {
    where: HoatDongScalarWhereInput
    data: XOR<HoatDongUpdateManyMutationInput, HoatDongUncheckedUpdateManyWithoutDon_vi_tcInput>
  }

  export type HoatDongScalarWhereInput = {
    AND?: HoatDongScalarWhereInput | HoatDongScalarWhereInput[]
    OR?: HoatDongScalarWhereInput[]
    NOT?: HoatDongScalarWhereInput | HoatDongScalarWhereInput[]
    id?: UuidFilter<"HoatDong"> | string
    ten_hoat_dong?: StringFilter<"HoatDong"> | string
    don_vi_tc_id?: UuidFilter<"HoatDong"> | string
    thoi_gian_bat_dau?: DateTimeFilter<"HoatDong"> | Date | string
    thoi_gian_ket_thuc?: DateTimeFilter<"HoatDong"> | Date | string
    dia_diem?: StringNullableFilter<"HoatDong"> | string | null
    hinh_thuc_dd?: StringFilter<"HoatDong"> | string
    trang_thai?: StringFilter<"HoatDong"> | string
    nguoi_duyet_id?: UuidNullableFilter<"HoatDong"> | string | null
    ly_do_tu_choi?: StringNullableFilter<"HoatDong"> | string | null
    created_at?: DateTimeFilter<"HoatDong"> | Date | string
  }

  export type DonViCreateWithoutNguoi_dungsInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    trang_thai?: boolean
    created_at?: Date | string
    parent?: DonViCreateNestedOneWithoutChildrenInput
    children?: DonViCreateNestedManyWithoutParentInput
    quy_ches?: QuyCheCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViUncheckedCreateWithoutNguoi_dungsInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    parent_id?: string | null
    trang_thai?: boolean
    created_at?: Date | string
    children?: DonViUncheckedCreateNestedManyWithoutParentInput
    quy_ches?: QuyCheUncheckedCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongUncheckedCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViCreateOrConnectWithoutNguoi_dungsInput = {
    where: DonViWhereUniqueInput
    create: XOR<DonViCreateWithoutNguoi_dungsInput, DonViUncheckedCreateWithoutNguoi_dungsInput>
  }

  export type DiemDanhCreateWithoutNguoi_dungInput = {
    id?: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
    hoat_dong: HoatDongCreateNestedOneWithoutDiem_danhsInput
  }

  export type DiemDanhUncheckedCreateWithoutNguoi_dungInput = {
    id?: string
    hoat_dong_id: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
  }

  export type DiemDanhCreateOrConnectWithoutNguoi_dungInput = {
    where: DiemDanhWhereUniqueInput
    create: XOR<DiemDanhCreateWithoutNguoi_dungInput, DiemDanhUncheckedCreateWithoutNguoi_dungInput>
  }

  export type DiemDanhCreateManyNguoi_dungInputEnvelope = {
    data: DiemDanhCreateManyNguoi_dungInput | DiemDanhCreateManyNguoi_dungInput[]
    skipDuplicates?: boolean
  }

  export type MinhChungCreateWithoutNguoi_dungInput = {
    id?: string
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
    tieu_chi?: TieuChiCreateNestedOneWithoutMinh_chungsInput
    ho_sos?: HoSoCreateNestedManyWithoutMinh_chungsInput
  }

  export type MinhChungUncheckedCreateWithoutNguoi_dungInput = {
    id?: string
    tieu_chi_id?: string | null
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutMinh_chungsInput
  }

  export type MinhChungCreateOrConnectWithoutNguoi_dungInput = {
    where: MinhChungWhereUniqueInput
    create: XOR<MinhChungCreateWithoutNguoi_dungInput, MinhChungUncheckedCreateWithoutNguoi_dungInput>
  }

  export type MinhChungCreateManyNguoi_dungInputEnvelope = {
    data: MinhChungCreateManyNguoi_dungInput | MinhChungCreateManyNguoi_dungInput[]
    skipDuplicates?: boolean
  }

  export type HoSoCreateWithoutNguoi_dungInput = {
    id?: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
    quy_che: QuyCheCreateNestedOneWithoutHo_sosInput
    minh_chungs?: MinhChungCreateNestedManyWithoutHo_sosInput
  }

  export type HoSoUncheckedCreateWithoutNguoi_dungInput = {
    id?: string
    quy_che_id: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutHo_sosInput
  }

  export type HoSoCreateOrConnectWithoutNguoi_dungInput = {
    where: HoSoWhereUniqueInput
    create: XOR<HoSoCreateWithoutNguoi_dungInput, HoSoUncheckedCreateWithoutNguoi_dungInput>
  }

  export type HoSoCreateManyNguoi_dungInputEnvelope = {
    data: HoSoCreateManyNguoi_dungInput | HoSoCreateManyNguoi_dungInput[]
    skipDuplicates?: boolean
  }

  export type HoatDongCreateWithoutNguoi_duyetInput = {
    id?: string
    ten_hoat_dong: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    don_vi_tc: DonViCreateNestedOneWithoutHoat_dongsInput
    tieu_chis?: TieuChiCreateNestedManyWithoutHoat_dongsInput
    diem_danhs?: DiemDanhCreateNestedManyWithoutHoat_dongInput
  }

  export type HoatDongUncheckedCreateWithoutNguoi_duyetInput = {
    id?: string
    ten_hoat_dong: string
    don_vi_tc_id: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    tieu_chis?: TieuChiUncheckedCreateNestedManyWithoutHoat_dongsInput
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutHoat_dongInput
  }

  export type HoatDongCreateOrConnectWithoutNguoi_duyetInput = {
    where: HoatDongWhereUniqueInput
    create: XOR<HoatDongCreateWithoutNguoi_duyetInput, HoatDongUncheckedCreateWithoutNguoi_duyetInput>
  }

  export type HoatDongCreateManyNguoi_duyetInputEnvelope = {
    data: HoatDongCreateManyNguoi_duyetInput | HoatDongCreateManyNguoi_duyetInput[]
    skipDuplicates?: boolean
  }

  export type DonViUpsertWithoutNguoi_dungsInput = {
    update: XOR<DonViUpdateWithoutNguoi_dungsInput, DonViUncheckedUpdateWithoutNguoi_dungsInput>
    create: XOR<DonViCreateWithoutNguoi_dungsInput, DonViUncheckedCreateWithoutNguoi_dungsInput>
    where?: DonViWhereInput
  }

  export type DonViUpdateToOneWithWhereWithoutNguoi_dungsInput = {
    where?: DonViWhereInput
    data: XOR<DonViUpdateWithoutNguoi_dungsInput, DonViUncheckedUpdateWithoutNguoi_dungsInput>
  }

  export type DonViUpdateWithoutNguoi_dungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: DonViUpdateOneWithoutChildrenNestedInput
    children?: DonViUpdateManyWithoutParentNestedInput
    quy_ches?: QuyCheUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DonViUncheckedUpdateWithoutNguoi_dungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: DonViUncheckedUpdateManyWithoutParentNestedInput
    quy_ches?: QuyCheUncheckedUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUncheckedUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DiemDanhUpsertWithWhereUniqueWithoutNguoi_dungInput = {
    where: DiemDanhWhereUniqueInput
    update: XOR<DiemDanhUpdateWithoutNguoi_dungInput, DiemDanhUncheckedUpdateWithoutNguoi_dungInput>
    create: XOR<DiemDanhCreateWithoutNguoi_dungInput, DiemDanhUncheckedCreateWithoutNguoi_dungInput>
  }

  export type DiemDanhUpdateWithWhereUniqueWithoutNguoi_dungInput = {
    where: DiemDanhWhereUniqueInput
    data: XOR<DiemDanhUpdateWithoutNguoi_dungInput, DiemDanhUncheckedUpdateWithoutNguoi_dungInput>
  }

  export type DiemDanhUpdateManyWithWhereWithoutNguoi_dungInput = {
    where: DiemDanhScalarWhereInput
    data: XOR<DiemDanhUpdateManyMutationInput, DiemDanhUncheckedUpdateManyWithoutNguoi_dungInput>
  }

  export type DiemDanhScalarWhereInput = {
    AND?: DiemDanhScalarWhereInput | DiemDanhScalarWhereInput[]
    OR?: DiemDanhScalarWhereInput[]
    NOT?: DiemDanhScalarWhereInput | DiemDanhScalarWhereInput[]
    id?: UuidFilter<"DiemDanh"> | string
    hoat_dong_id?: UuidFilter<"DiemDanh"> | string
    nguoi_dung_id?: UuidFilter<"DiemDanh"> | string
    phuong_thuc?: StringFilter<"DiemDanh"> | string
    thoi_gian?: DateTimeFilter<"DiemDanh"> | Date | string
    da_chot?: BoolFilter<"DiemDanh"> | boolean
  }

  export type MinhChungUpsertWithWhereUniqueWithoutNguoi_dungInput = {
    where: MinhChungWhereUniqueInput
    update: XOR<MinhChungUpdateWithoutNguoi_dungInput, MinhChungUncheckedUpdateWithoutNguoi_dungInput>
    create: XOR<MinhChungCreateWithoutNguoi_dungInput, MinhChungUncheckedCreateWithoutNguoi_dungInput>
  }

  export type MinhChungUpdateWithWhereUniqueWithoutNguoi_dungInput = {
    where: MinhChungWhereUniqueInput
    data: XOR<MinhChungUpdateWithoutNguoi_dungInput, MinhChungUncheckedUpdateWithoutNguoi_dungInput>
  }

  export type MinhChungUpdateManyWithWhereWithoutNguoi_dungInput = {
    where: MinhChungScalarWhereInput
    data: XOR<MinhChungUpdateManyMutationInput, MinhChungUncheckedUpdateManyWithoutNguoi_dungInput>
  }

  export type MinhChungScalarWhereInput = {
    AND?: MinhChungScalarWhereInput | MinhChungScalarWhereInput[]
    OR?: MinhChungScalarWhereInput[]
    NOT?: MinhChungScalarWhereInput | MinhChungScalarWhereInput[]
    id?: UuidFilter<"MinhChung"> | string
    nguoi_dung_id?: UuidFilter<"MinhChung"> | string
    tieu_chi_id?: UuidNullableFilter<"MinhChung"> | string | null
    loai?: StringFilter<"MinhChung"> | string
    ten_minh_chung?: StringNullableFilter<"MinhChung"> | string | null
    file_url?: StringFilter<"MinhChung"> | string
    trang_thai?: StringFilter<"MinhChung"> | string
    ai_xac_thuc_muc_do?: IntNullableFilter<"MinhChung"> | number | null
    nguoi_duyet_id?: UuidNullableFilter<"MinhChung"> | string | null
    ly_do_loai?: StringNullableFilter<"MinhChung"> | string | null
    created_at?: DateTimeFilter<"MinhChung"> | Date | string
  }

  export type HoSoUpsertWithWhereUniqueWithoutNguoi_dungInput = {
    where: HoSoWhereUniqueInput
    update: XOR<HoSoUpdateWithoutNguoi_dungInput, HoSoUncheckedUpdateWithoutNguoi_dungInput>
    create: XOR<HoSoCreateWithoutNguoi_dungInput, HoSoUncheckedCreateWithoutNguoi_dungInput>
  }

  export type HoSoUpdateWithWhereUniqueWithoutNguoi_dungInput = {
    where: HoSoWhereUniqueInput
    data: XOR<HoSoUpdateWithoutNguoi_dungInput, HoSoUncheckedUpdateWithoutNguoi_dungInput>
  }

  export type HoSoUpdateManyWithWhereWithoutNguoi_dungInput = {
    where: HoSoScalarWhereInput
    data: XOR<HoSoUpdateManyMutationInput, HoSoUncheckedUpdateManyWithoutNguoi_dungInput>
  }

  export type HoSoScalarWhereInput = {
    AND?: HoSoScalarWhereInput | HoSoScalarWhereInput[]
    OR?: HoSoScalarWhereInput[]
    NOT?: HoSoScalarWhereInput | HoSoScalarWhereInput[]
    id?: UuidFilter<"HoSo"> | string
    nguoi_dung_id?: UuidFilter<"HoSo"> | string
    quy_che_id?: UuidFilter<"HoSo"> | string
    cap_hien_tai?: StringFilter<"HoSo"> | string
    trang_thai?: EnumTrangThaiHoSoFilter<"HoSo"> | $Enums.TrangThaiHoSo
    ai_flag?: StringNullableFilter<"HoSo"> | string | null
    ghi_chu_ai?: StringNullableFilter<"HoSo"> | string | null
    khoa?: BoolFilter<"HoSo"> | boolean
    ngay_nop?: DateTimeNullableFilter<"HoSo"> | Date | string | null
    created_at?: DateTimeFilter<"HoSo"> | Date | string
  }

  export type HoatDongUpsertWithWhereUniqueWithoutNguoi_duyetInput = {
    where: HoatDongWhereUniqueInput
    update: XOR<HoatDongUpdateWithoutNguoi_duyetInput, HoatDongUncheckedUpdateWithoutNguoi_duyetInput>
    create: XOR<HoatDongCreateWithoutNguoi_duyetInput, HoatDongUncheckedCreateWithoutNguoi_duyetInput>
  }

  export type HoatDongUpdateWithWhereUniqueWithoutNguoi_duyetInput = {
    where: HoatDongWhereUniqueInput
    data: XOR<HoatDongUpdateWithoutNguoi_duyetInput, HoatDongUncheckedUpdateWithoutNguoi_duyetInput>
  }

  export type HoatDongUpdateManyWithWhereWithoutNguoi_duyetInput = {
    where: HoatDongScalarWhereInput
    data: XOR<HoatDongUpdateManyMutationInput, HoatDongUncheckedUpdateManyWithoutNguoi_duyetInput>
  }

  export type DonViCreateWithoutQuy_chesInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    trang_thai?: boolean
    created_at?: Date | string
    parent?: DonViCreateNestedOneWithoutChildrenInput
    children?: DonViCreateNestedManyWithoutParentInput
    nguoi_dungs?: NguoiDungCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViUncheckedCreateWithoutQuy_chesInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    parent_id?: string | null
    trang_thai?: boolean
    created_at?: Date | string
    children?: DonViUncheckedCreateNestedManyWithoutParentInput
    nguoi_dungs?: NguoiDungUncheckedCreateNestedManyWithoutDon_viInput
    hoat_dongs?: HoatDongUncheckedCreateNestedManyWithoutDon_vi_tcInput
  }

  export type DonViCreateOrConnectWithoutQuy_chesInput = {
    where: DonViWhereUniqueInput
    create: XOR<DonViCreateWithoutQuy_chesInput, DonViUncheckedCreateWithoutQuy_chesInput>
  }

  export type TieuChiCreateWithoutQuy_cheInput = {
    id?: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
    hoat_dongs?: HoatDongCreateNestedManyWithoutTieu_chisInput
    minh_chungs?: MinhChungCreateNestedManyWithoutTieu_chiInput
  }

  export type TieuChiUncheckedCreateWithoutQuy_cheInput = {
    id?: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
    hoat_dongs?: HoatDongUncheckedCreateNestedManyWithoutTieu_chisInput
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutTieu_chiInput
  }

  export type TieuChiCreateOrConnectWithoutQuy_cheInput = {
    where: TieuChiWhereUniqueInput
    create: XOR<TieuChiCreateWithoutQuy_cheInput, TieuChiUncheckedCreateWithoutQuy_cheInput>
  }

  export type TieuChiCreateManyQuy_cheInputEnvelope = {
    data: TieuChiCreateManyQuy_cheInput | TieuChiCreateManyQuy_cheInput[]
    skipDuplicates?: boolean
  }

  export type HoSoCreateWithoutQuy_cheInput = {
    id?: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
    nguoi_dung: NguoiDungCreateNestedOneWithoutHo_sosInput
    minh_chungs?: MinhChungCreateNestedManyWithoutHo_sosInput
  }

  export type HoSoUncheckedCreateWithoutQuy_cheInput = {
    id?: string
    nguoi_dung_id: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutHo_sosInput
  }

  export type HoSoCreateOrConnectWithoutQuy_cheInput = {
    where: HoSoWhereUniqueInput
    create: XOR<HoSoCreateWithoutQuy_cheInput, HoSoUncheckedCreateWithoutQuy_cheInput>
  }

  export type HoSoCreateManyQuy_cheInputEnvelope = {
    data: HoSoCreateManyQuy_cheInput | HoSoCreateManyQuy_cheInput[]
    skipDuplicates?: boolean
  }

  export type DonViUpsertWithoutQuy_chesInput = {
    update: XOR<DonViUpdateWithoutQuy_chesInput, DonViUncheckedUpdateWithoutQuy_chesInput>
    create: XOR<DonViCreateWithoutQuy_chesInput, DonViUncheckedCreateWithoutQuy_chesInput>
    where?: DonViWhereInput
  }

  export type DonViUpdateToOneWithWhereWithoutQuy_chesInput = {
    where?: DonViWhereInput
    data: XOR<DonViUpdateWithoutQuy_chesInput, DonViUncheckedUpdateWithoutQuy_chesInput>
  }

  export type DonViUpdateWithoutQuy_chesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: DonViUpdateOneWithoutChildrenNestedInput
    children?: DonViUpdateManyWithoutParentNestedInput
    nguoi_dungs?: NguoiDungUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DonViUncheckedUpdateWithoutQuy_chesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: DonViUncheckedUpdateManyWithoutParentNestedInput
    nguoi_dungs?: NguoiDungUncheckedUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUncheckedUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type TieuChiUpsertWithWhereUniqueWithoutQuy_cheInput = {
    where: TieuChiWhereUniqueInput
    update: XOR<TieuChiUpdateWithoutQuy_cheInput, TieuChiUncheckedUpdateWithoutQuy_cheInput>
    create: XOR<TieuChiCreateWithoutQuy_cheInput, TieuChiUncheckedCreateWithoutQuy_cheInput>
  }

  export type TieuChiUpdateWithWhereUniqueWithoutQuy_cheInput = {
    where: TieuChiWhereUniqueInput
    data: XOR<TieuChiUpdateWithoutQuy_cheInput, TieuChiUncheckedUpdateWithoutQuy_cheInput>
  }

  export type TieuChiUpdateManyWithWhereWithoutQuy_cheInput = {
    where: TieuChiScalarWhereInput
    data: XOR<TieuChiUpdateManyMutationInput, TieuChiUncheckedUpdateManyWithoutQuy_cheInput>
  }

  export type TieuChiScalarWhereInput = {
    AND?: TieuChiScalarWhereInput | TieuChiScalarWhereInput[]
    OR?: TieuChiScalarWhereInput[]
    NOT?: TieuChiScalarWhereInput | TieuChiScalarWhereInput[]
    id?: UuidFilter<"TieuChi"> | string
    quy_che_id?: UuidFilter<"TieuChi"> | string
    ten_tieu_chi?: StringFilter<"TieuChi"> | string
    mo_ta?: StringNullableFilter<"TieuChi"> | string | null
    thu_tu?: IntNullableFilter<"TieuChi"> | number | null
    so_luong_yeu_cau?: IntFilter<"TieuChi"> | number
  }

  export type HoSoUpsertWithWhereUniqueWithoutQuy_cheInput = {
    where: HoSoWhereUniqueInput
    update: XOR<HoSoUpdateWithoutQuy_cheInput, HoSoUncheckedUpdateWithoutQuy_cheInput>
    create: XOR<HoSoCreateWithoutQuy_cheInput, HoSoUncheckedCreateWithoutQuy_cheInput>
  }

  export type HoSoUpdateWithWhereUniqueWithoutQuy_cheInput = {
    where: HoSoWhereUniqueInput
    data: XOR<HoSoUpdateWithoutQuy_cheInput, HoSoUncheckedUpdateWithoutQuy_cheInput>
  }

  export type HoSoUpdateManyWithWhereWithoutQuy_cheInput = {
    where: HoSoScalarWhereInput
    data: XOR<HoSoUpdateManyMutationInput, HoSoUncheckedUpdateManyWithoutQuy_cheInput>
  }

  export type QuyCheCreateWithoutTieu_chisInput = {
    id?: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
    don_vi: DonViCreateNestedOneWithoutQuy_chesInput
    ho_sos?: HoSoCreateNestedManyWithoutQuy_cheInput
  }

  export type QuyCheUncheckedCreateWithoutTieu_chisInput = {
    id?: string
    don_vi_id: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutQuy_cheInput
  }

  export type QuyCheCreateOrConnectWithoutTieu_chisInput = {
    where: QuyCheWhereUniqueInput
    create: XOR<QuyCheCreateWithoutTieu_chisInput, QuyCheUncheckedCreateWithoutTieu_chisInput>
  }

  export type HoatDongCreateWithoutTieu_chisInput = {
    id?: string
    ten_hoat_dong: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    don_vi_tc: DonViCreateNestedOneWithoutHoat_dongsInput
    nguoi_duyet?: NguoiDungCreateNestedOneWithoutHoat_dong_duyetsInput
    diem_danhs?: DiemDanhCreateNestedManyWithoutHoat_dongInput
  }

  export type HoatDongUncheckedCreateWithoutTieu_chisInput = {
    id?: string
    ten_hoat_dong: string
    don_vi_tc_id: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    nguoi_duyet_id?: string | null
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutHoat_dongInput
  }

  export type HoatDongCreateOrConnectWithoutTieu_chisInput = {
    where: HoatDongWhereUniqueInput
    create: XOR<HoatDongCreateWithoutTieu_chisInput, HoatDongUncheckedCreateWithoutTieu_chisInput>
  }

  export type MinhChungCreateWithoutTieu_chiInput = {
    id?: string
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
    nguoi_dung: NguoiDungCreateNestedOneWithoutMinh_chungsInput
    ho_sos?: HoSoCreateNestedManyWithoutMinh_chungsInput
  }

  export type MinhChungUncheckedCreateWithoutTieu_chiInput = {
    id?: string
    nguoi_dung_id: string
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutMinh_chungsInput
  }

  export type MinhChungCreateOrConnectWithoutTieu_chiInput = {
    where: MinhChungWhereUniqueInput
    create: XOR<MinhChungCreateWithoutTieu_chiInput, MinhChungUncheckedCreateWithoutTieu_chiInput>
  }

  export type MinhChungCreateManyTieu_chiInputEnvelope = {
    data: MinhChungCreateManyTieu_chiInput | MinhChungCreateManyTieu_chiInput[]
    skipDuplicates?: boolean
  }

  export type QuyCheUpsertWithoutTieu_chisInput = {
    update: XOR<QuyCheUpdateWithoutTieu_chisInput, QuyCheUncheckedUpdateWithoutTieu_chisInput>
    create: XOR<QuyCheCreateWithoutTieu_chisInput, QuyCheUncheckedCreateWithoutTieu_chisInput>
    where?: QuyCheWhereInput
  }

  export type QuyCheUpdateToOneWithWhereWithoutTieu_chisInput = {
    where?: QuyCheWhereInput
    data: XOR<QuyCheUpdateWithoutTieu_chisInput, QuyCheUncheckedUpdateWithoutTieu_chisInput>
  }

  export type QuyCheUpdateWithoutTieu_chisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi?: DonViUpdateOneRequiredWithoutQuy_chesNestedInput
    ho_sos?: HoSoUpdateManyWithoutQuy_cheNestedInput
  }

  export type QuyCheUncheckedUpdateWithoutTieu_chisInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ho_sos?: HoSoUncheckedUpdateManyWithoutQuy_cheNestedInput
  }

  export type HoatDongUpsertWithWhereUniqueWithoutTieu_chisInput = {
    where: HoatDongWhereUniqueInput
    update: XOR<HoatDongUpdateWithoutTieu_chisInput, HoatDongUncheckedUpdateWithoutTieu_chisInput>
    create: XOR<HoatDongCreateWithoutTieu_chisInput, HoatDongUncheckedCreateWithoutTieu_chisInput>
  }

  export type HoatDongUpdateWithWhereUniqueWithoutTieu_chisInput = {
    where: HoatDongWhereUniqueInput
    data: XOR<HoatDongUpdateWithoutTieu_chisInput, HoatDongUncheckedUpdateWithoutTieu_chisInput>
  }

  export type HoatDongUpdateManyWithWhereWithoutTieu_chisInput = {
    where: HoatDongScalarWhereInput
    data: XOR<HoatDongUpdateManyMutationInput, HoatDongUncheckedUpdateManyWithoutTieu_chisInput>
  }

  export type MinhChungUpsertWithWhereUniqueWithoutTieu_chiInput = {
    where: MinhChungWhereUniqueInput
    update: XOR<MinhChungUpdateWithoutTieu_chiInput, MinhChungUncheckedUpdateWithoutTieu_chiInput>
    create: XOR<MinhChungCreateWithoutTieu_chiInput, MinhChungUncheckedCreateWithoutTieu_chiInput>
  }

  export type MinhChungUpdateWithWhereUniqueWithoutTieu_chiInput = {
    where: MinhChungWhereUniqueInput
    data: XOR<MinhChungUpdateWithoutTieu_chiInput, MinhChungUncheckedUpdateWithoutTieu_chiInput>
  }

  export type MinhChungUpdateManyWithWhereWithoutTieu_chiInput = {
    where: MinhChungScalarWhereInput
    data: XOR<MinhChungUpdateManyMutationInput, MinhChungUncheckedUpdateManyWithoutTieu_chiInput>
  }

  export type DonViCreateWithoutHoat_dongsInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    trang_thai?: boolean
    created_at?: Date | string
    parent?: DonViCreateNestedOneWithoutChildrenInput
    children?: DonViCreateNestedManyWithoutParentInput
    nguoi_dungs?: NguoiDungCreateNestedManyWithoutDon_viInput
    quy_ches?: QuyCheCreateNestedManyWithoutDon_viInput
  }

  export type DonViUncheckedCreateWithoutHoat_dongsInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    parent_id?: string | null
    trang_thai?: boolean
    created_at?: Date | string
    children?: DonViUncheckedCreateNestedManyWithoutParentInput
    nguoi_dungs?: NguoiDungUncheckedCreateNestedManyWithoutDon_viInput
    quy_ches?: QuyCheUncheckedCreateNestedManyWithoutDon_viInput
  }

  export type DonViCreateOrConnectWithoutHoat_dongsInput = {
    where: DonViWhereUniqueInput
    create: XOR<DonViCreateWithoutHoat_dongsInput, DonViUncheckedCreateWithoutHoat_dongsInput>
  }

  export type NguoiDungCreateWithoutHoat_dong_duyetsInput = {
    id?: string
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    don_vi?: DonViCreateNestedOneWithoutNguoi_dungsInput
    diem_danhs?: DiemDanhCreateNestedManyWithoutNguoi_dungInput
    minh_chungs?: MinhChungCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoCreateNestedManyWithoutNguoi_dungInput
  }

  export type NguoiDungUncheckedCreateWithoutHoat_dong_duyetsInput = {
    id?: string
    don_vi_id?: string | null
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutNguoi_dungInput
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutNguoi_dungInput
  }

  export type NguoiDungCreateOrConnectWithoutHoat_dong_duyetsInput = {
    where: NguoiDungWhereUniqueInput
    create: XOR<NguoiDungCreateWithoutHoat_dong_duyetsInput, NguoiDungUncheckedCreateWithoutHoat_dong_duyetsInput>
  }

  export type TieuChiCreateWithoutHoat_dongsInput = {
    id?: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
    quy_che: QuyCheCreateNestedOneWithoutTieu_chisInput
    minh_chungs?: MinhChungCreateNestedManyWithoutTieu_chiInput
  }

  export type TieuChiUncheckedCreateWithoutHoat_dongsInput = {
    id?: string
    quy_che_id: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutTieu_chiInput
  }

  export type TieuChiCreateOrConnectWithoutHoat_dongsInput = {
    where: TieuChiWhereUniqueInput
    create: XOR<TieuChiCreateWithoutHoat_dongsInput, TieuChiUncheckedCreateWithoutHoat_dongsInput>
  }

  export type DiemDanhCreateWithoutHoat_dongInput = {
    id?: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
    nguoi_dung: NguoiDungCreateNestedOneWithoutDiem_danhsInput
  }

  export type DiemDanhUncheckedCreateWithoutHoat_dongInput = {
    id?: string
    nguoi_dung_id: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
  }

  export type DiemDanhCreateOrConnectWithoutHoat_dongInput = {
    where: DiemDanhWhereUniqueInput
    create: XOR<DiemDanhCreateWithoutHoat_dongInput, DiemDanhUncheckedCreateWithoutHoat_dongInput>
  }

  export type DiemDanhCreateManyHoat_dongInputEnvelope = {
    data: DiemDanhCreateManyHoat_dongInput | DiemDanhCreateManyHoat_dongInput[]
    skipDuplicates?: boolean
  }

  export type DonViUpsertWithoutHoat_dongsInput = {
    update: XOR<DonViUpdateWithoutHoat_dongsInput, DonViUncheckedUpdateWithoutHoat_dongsInput>
    create: XOR<DonViCreateWithoutHoat_dongsInput, DonViUncheckedCreateWithoutHoat_dongsInput>
    where?: DonViWhereInput
  }

  export type DonViUpdateToOneWithWhereWithoutHoat_dongsInput = {
    where?: DonViWhereInput
    data: XOR<DonViUpdateWithoutHoat_dongsInput, DonViUncheckedUpdateWithoutHoat_dongsInput>
  }

  export type DonViUpdateWithoutHoat_dongsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: DonViUpdateOneWithoutChildrenNestedInput
    children?: DonViUpdateManyWithoutParentNestedInput
    nguoi_dungs?: NguoiDungUpdateManyWithoutDon_viNestedInput
    quy_ches?: QuyCheUpdateManyWithoutDon_viNestedInput
  }

  export type DonViUncheckedUpdateWithoutHoat_dongsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: DonViUncheckedUpdateManyWithoutParentNestedInput
    nguoi_dungs?: NguoiDungUncheckedUpdateManyWithoutDon_viNestedInput
    quy_ches?: QuyCheUncheckedUpdateManyWithoutDon_viNestedInput
  }

  export type NguoiDungUpsertWithoutHoat_dong_duyetsInput = {
    update: XOR<NguoiDungUpdateWithoutHoat_dong_duyetsInput, NguoiDungUncheckedUpdateWithoutHoat_dong_duyetsInput>
    create: XOR<NguoiDungCreateWithoutHoat_dong_duyetsInput, NguoiDungUncheckedCreateWithoutHoat_dong_duyetsInput>
    where?: NguoiDungWhereInput
  }

  export type NguoiDungUpdateToOneWithWhereWithoutHoat_dong_duyetsInput = {
    where?: NguoiDungWhereInput
    data: XOR<NguoiDungUpdateWithoutHoat_dong_duyetsInput, NguoiDungUncheckedUpdateWithoutHoat_dong_duyetsInput>
  }

  export type NguoiDungUpdateWithoutHoat_dong_duyetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi?: DonViUpdateOneWithoutNguoi_dungsNestedInput
    diem_danhs?: DiemDanhUpdateManyWithoutNguoi_dungNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUpdateManyWithoutNguoi_dungNestedInput
  }

  export type NguoiDungUncheckedUpdateWithoutHoat_dong_duyetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutNguoi_dungNestedInput
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUncheckedUpdateManyWithoutNguoi_dungNestedInput
  }

  export type TieuChiUpsertWithWhereUniqueWithoutHoat_dongsInput = {
    where: TieuChiWhereUniqueInput
    update: XOR<TieuChiUpdateWithoutHoat_dongsInput, TieuChiUncheckedUpdateWithoutHoat_dongsInput>
    create: XOR<TieuChiCreateWithoutHoat_dongsInput, TieuChiUncheckedCreateWithoutHoat_dongsInput>
  }

  export type TieuChiUpdateWithWhereUniqueWithoutHoat_dongsInput = {
    where: TieuChiWhereUniqueInput
    data: XOR<TieuChiUpdateWithoutHoat_dongsInput, TieuChiUncheckedUpdateWithoutHoat_dongsInput>
  }

  export type TieuChiUpdateManyWithWhereWithoutHoat_dongsInput = {
    where: TieuChiScalarWhereInput
    data: XOR<TieuChiUpdateManyMutationInput, TieuChiUncheckedUpdateManyWithoutHoat_dongsInput>
  }

  export type DiemDanhUpsertWithWhereUniqueWithoutHoat_dongInput = {
    where: DiemDanhWhereUniqueInput
    update: XOR<DiemDanhUpdateWithoutHoat_dongInput, DiemDanhUncheckedUpdateWithoutHoat_dongInput>
    create: XOR<DiemDanhCreateWithoutHoat_dongInput, DiemDanhUncheckedCreateWithoutHoat_dongInput>
  }

  export type DiemDanhUpdateWithWhereUniqueWithoutHoat_dongInput = {
    where: DiemDanhWhereUniqueInput
    data: XOR<DiemDanhUpdateWithoutHoat_dongInput, DiemDanhUncheckedUpdateWithoutHoat_dongInput>
  }

  export type DiemDanhUpdateManyWithWhereWithoutHoat_dongInput = {
    where: DiemDanhScalarWhereInput
    data: XOR<DiemDanhUpdateManyMutationInput, DiemDanhUncheckedUpdateManyWithoutHoat_dongInput>
  }

  export type HoatDongCreateWithoutDiem_danhsInput = {
    id?: string
    ten_hoat_dong: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    don_vi_tc: DonViCreateNestedOneWithoutHoat_dongsInput
    nguoi_duyet?: NguoiDungCreateNestedOneWithoutHoat_dong_duyetsInput
    tieu_chis?: TieuChiCreateNestedManyWithoutHoat_dongsInput
  }

  export type HoatDongUncheckedCreateWithoutDiem_danhsInput = {
    id?: string
    ten_hoat_dong: string
    don_vi_tc_id: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    nguoi_duyet_id?: string | null
    ly_do_tu_choi?: string | null
    created_at?: Date | string
    tieu_chis?: TieuChiUncheckedCreateNestedManyWithoutHoat_dongsInput
  }

  export type HoatDongCreateOrConnectWithoutDiem_danhsInput = {
    where: HoatDongWhereUniqueInput
    create: XOR<HoatDongCreateWithoutDiem_danhsInput, HoatDongUncheckedCreateWithoutDiem_danhsInput>
  }

  export type NguoiDungCreateWithoutDiem_danhsInput = {
    id?: string
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    don_vi?: DonViCreateNestedOneWithoutNguoi_dungsInput
    minh_chungs?: MinhChungCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungUncheckedCreateWithoutDiem_danhsInput = {
    id?: string
    don_vi_id?: string | null
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongUncheckedCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungCreateOrConnectWithoutDiem_danhsInput = {
    where: NguoiDungWhereUniqueInput
    create: XOR<NguoiDungCreateWithoutDiem_danhsInput, NguoiDungUncheckedCreateWithoutDiem_danhsInput>
  }

  export type HoatDongUpsertWithoutDiem_danhsInput = {
    update: XOR<HoatDongUpdateWithoutDiem_danhsInput, HoatDongUncheckedUpdateWithoutDiem_danhsInput>
    create: XOR<HoatDongCreateWithoutDiem_danhsInput, HoatDongUncheckedCreateWithoutDiem_danhsInput>
    where?: HoatDongWhereInput
  }

  export type HoatDongUpdateToOneWithWhereWithoutDiem_danhsInput = {
    where?: HoatDongWhereInput
    data: XOR<HoatDongUpdateWithoutDiem_danhsInput, HoatDongUncheckedUpdateWithoutDiem_danhsInput>
  }

  export type HoatDongUpdateWithoutDiem_danhsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi_tc?: DonViUpdateOneRequiredWithoutHoat_dongsNestedInput
    nguoi_duyet?: NguoiDungUpdateOneWithoutHoat_dong_duyetsNestedInput
    tieu_chis?: TieuChiUpdateManyWithoutHoat_dongsNestedInput
  }

  export type HoatDongUncheckedUpdateWithoutDiem_danhsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    don_vi_tc_id?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chis?: TieuChiUncheckedUpdateManyWithoutHoat_dongsNestedInput
  }

  export type NguoiDungUpsertWithoutDiem_danhsInput = {
    update: XOR<NguoiDungUpdateWithoutDiem_danhsInput, NguoiDungUncheckedUpdateWithoutDiem_danhsInput>
    create: XOR<NguoiDungCreateWithoutDiem_danhsInput, NguoiDungUncheckedCreateWithoutDiem_danhsInput>
    where?: NguoiDungWhereInput
  }

  export type NguoiDungUpdateToOneWithWhereWithoutDiem_danhsInput = {
    where?: NguoiDungWhereInput
    data: XOR<NguoiDungUpdateWithoutDiem_danhsInput, NguoiDungUncheckedUpdateWithoutDiem_danhsInput>
  }

  export type NguoiDungUpdateWithoutDiem_danhsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi?: DonViUpdateOneWithoutNguoi_dungsNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type NguoiDungUncheckedUpdateWithoutDiem_danhsInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUncheckedUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUncheckedUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type NguoiDungCreateWithoutMinh_chungsInput = {
    id?: string
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    don_vi?: DonViCreateNestedOneWithoutNguoi_dungsInput
    diem_danhs?: DiemDanhCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungUncheckedCreateWithoutMinh_chungsInput = {
    id?: string
    don_vi_id?: string | null
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutNguoi_dungInput
    ho_sos?: HoSoUncheckedCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongUncheckedCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungCreateOrConnectWithoutMinh_chungsInput = {
    where: NguoiDungWhereUniqueInput
    create: XOR<NguoiDungCreateWithoutMinh_chungsInput, NguoiDungUncheckedCreateWithoutMinh_chungsInput>
  }

  export type TieuChiCreateWithoutMinh_chungsInput = {
    id?: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
    quy_che: QuyCheCreateNestedOneWithoutTieu_chisInput
    hoat_dongs?: HoatDongCreateNestedManyWithoutTieu_chisInput
  }

  export type TieuChiUncheckedCreateWithoutMinh_chungsInput = {
    id?: string
    quy_che_id: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
    hoat_dongs?: HoatDongUncheckedCreateNestedManyWithoutTieu_chisInput
  }

  export type TieuChiCreateOrConnectWithoutMinh_chungsInput = {
    where: TieuChiWhereUniqueInput
    create: XOR<TieuChiCreateWithoutMinh_chungsInput, TieuChiUncheckedCreateWithoutMinh_chungsInput>
  }

  export type HoSoCreateWithoutMinh_chungsInput = {
    id?: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
    nguoi_dung: NguoiDungCreateNestedOneWithoutHo_sosInput
    quy_che: QuyCheCreateNestedOneWithoutHo_sosInput
  }

  export type HoSoUncheckedCreateWithoutMinh_chungsInput = {
    id?: string
    nguoi_dung_id: string
    quy_che_id: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
  }

  export type HoSoCreateOrConnectWithoutMinh_chungsInput = {
    where: HoSoWhereUniqueInput
    create: XOR<HoSoCreateWithoutMinh_chungsInput, HoSoUncheckedCreateWithoutMinh_chungsInput>
  }

  export type NguoiDungUpsertWithoutMinh_chungsInput = {
    update: XOR<NguoiDungUpdateWithoutMinh_chungsInput, NguoiDungUncheckedUpdateWithoutMinh_chungsInput>
    create: XOR<NguoiDungCreateWithoutMinh_chungsInput, NguoiDungUncheckedCreateWithoutMinh_chungsInput>
    where?: NguoiDungWhereInput
  }

  export type NguoiDungUpdateToOneWithWhereWithoutMinh_chungsInput = {
    where?: NguoiDungWhereInput
    data: XOR<NguoiDungUpdateWithoutMinh_chungsInput, NguoiDungUncheckedUpdateWithoutMinh_chungsInput>
  }

  export type NguoiDungUpdateWithoutMinh_chungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi?: DonViUpdateOneWithoutNguoi_dungsNestedInput
    diem_danhs?: DiemDanhUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type NguoiDungUncheckedUpdateWithoutMinh_chungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUncheckedUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUncheckedUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type TieuChiUpsertWithoutMinh_chungsInput = {
    update: XOR<TieuChiUpdateWithoutMinh_chungsInput, TieuChiUncheckedUpdateWithoutMinh_chungsInput>
    create: XOR<TieuChiCreateWithoutMinh_chungsInput, TieuChiUncheckedCreateWithoutMinh_chungsInput>
    where?: TieuChiWhereInput
  }

  export type TieuChiUpdateToOneWithWhereWithoutMinh_chungsInput = {
    where?: TieuChiWhereInput
    data: XOR<TieuChiUpdateWithoutMinh_chungsInput, TieuChiUncheckedUpdateWithoutMinh_chungsInput>
  }

  export type TieuChiUpdateWithoutMinh_chungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
    quy_che?: QuyCheUpdateOneRequiredWithoutTieu_chisNestedInput
    hoat_dongs?: HoatDongUpdateManyWithoutTieu_chisNestedInput
  }

  export type TieuChiUncheckedUpdateWithoutMinh_chungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
    hoat_dongs?: HoatDongUncheckedUpdateManyWithoutTieu_chisNestedInput
  }

  export type HoSoUpsertWithWhereUniqueWithoutMinh_chungsInput = {
    where: HoSoWhereUniqueInput
    update: XOR<HoSoUpdateWithoutMinh_chungsInput, HoSoUncheckedUpdateWithoutMinh_chungsInput>
    create: XOR<HoSoCreateWithoutMinh_chungsInput, HoSoUncheckedCreateWithoutMinh_chungsInput>
  }

  export type HoSoUpdateWithWhereUniqueWithoutMinh_chungsInput = {
    where: HoSoWhereUniqueInput
    data: XOR<HoSoUpdateWithoutMinh_chungsInput, HoSoUncheckedUpdateWithoutMinh_chungsInput>
  }

  export type HoSoUpdateManyWithWhereWithoutMinh_chungsInput = {
    where: HoSoScalarWhereInput
    data: XOR<HoSoUpdateManyMutationInput, HoSoUncheckedUpdateManyWithoutMinh_chungsInput>
  }

  export type NguoiDungCreateWithoutHo_sosInput = {
    id?: string
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    don_vi?: DonViCreateNestedOneWithoutNguoi_dungsInput
    diem_danhs?: DiemDanhCreateNestedManyWithoutNguoi_dungInput
    minh_chungs?: MinhChungCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungUncheckedCreateWithoutHo_sosInput = {
    id?: string
    don_vi_id?: string | null
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
    diem_danhs?: DiemDanhUncheckedCreateNestedManyWithoutNguoi_dungInput
    minh_chungs?: MinhChungUncheckedCreateNestedManyWithoutNguoi_dungInput
    hoat_dong_duyets?: HoatDongUncheckedCreateNestedManyWithoutNguoi_duyetInput
  }

  export type NguoiDungCreateOrConnectWithoutHo_sosInput = {
    where: NguoiDungWhereUniqueInput
    create: XOR<NguoiDungCreateWithoutHo_sosInput, NguoiDungUncheckedCreateWithoutHo_sosInput>
  }

  export type QuyCheCreateWithoutHo_sosInput = {
    id?: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
    don_vi: DonViCreateNestedOneWithoutQuy_chesInput
    tieu_chis?: TieuChiCreateNestedManyWithoutQuy_cheInput
  }

  export type QuyCheUncheckedCreateWithoutHo_sosInput = {
    id?: string
    don_vi_id: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
    tieu_chis?: TieuChiUncheckedCreateNestedManyWithoutQuy_cheInput
  }

  export type QuyCheCreateOrConnectWithoutHo_sosInput = {
    where: QuyCheWhereUniqueInput
    create: XOR<QuyCheCreateWithoutHo_sosInput, QuyCheUncheckedCreateWithoutHo_sosInput>
  }

  export type MinhChungCreateWithoutHo_sosInput = {
    id?: string
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
    nguoi_dung: NguoiDungCreateNestedOneWithoutMinh_chungsInput
    tieu_chi?: TieuChiCreateNestedOneWithoutMinh_chungsInput
  }

  export type MinhChungUncheckedCreateWithoutHo_sosInput = {
    id?: string
    nguoi_dung_id: string
    tieu_chi_id?: string | null
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
  }

  export type MinhChungCreateOrConnectWithoutHo_sosInput = {
    where: MinhChungWhereUniqueInput
    create: XOR<MinhChungCreateWithoutHo_sosInput, MinhChungUncheckedCreateWithoutHo_sosInput>
  }

  export type NguoiDungUpsertWithoutHo_sosInput = {
    update: XOR<NguoiDungUpdateWithoutHo_sosInput, NguoiDungUncheckedUpdateWithoutHo_sosInput>
    create: XOR<NguoiDungCreateWithoutHo_sosInput, NguoiDungUncheckedCreateWithoutHo_sosInput>
    where?: NguoiDungWhereInput
  }

  export type NguoiDungUpdateToOneWithWhereWithoutHo_sosInput = {
    where?: NguoiDungWhereInput
    data: XOR<NguoiDungUpdateWithoutHo_sosInput, NguoiDungUncheckedUpdateWithoutHo_sosInput>
  }

  export type NguoiDungUpdateWithoutHo_sosInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi?: DonViUpdateOneWithoutNguoi_dungsNestedInput
    diem_danhs?: DiemDanhUpdateManyWithoutNguoi_dungNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type NguoiDungUncheckedUpdateWithoutHo_sosInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutNguoi_dungNestedInput
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUncheckedUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type QuyCheUpsertWithoutHo_sosInput = {
    update: XOR<QuyCheUpdateWithoutHo_sosInput, QuyCheUncheckedUpdateWithoutHo_sosInput>
    create: XOR<QuyCheCreateWithoutHo_sosInput, QuyCheUncheckedCreateWithoutHo_sosInput>
    where?: QuyCheWhereInput
  }

  export type QuyCheUpdateToOneWithWhereWithoutHo_sosInput = {
    where?: QuyCheWhereInput
    data: XOR<QuyCheUpdateWithoutHo_sosInput, QuyCheUncheckedUpdateWithoutHo_sosInput>
  }

  export type QuyCheUpdateWithoutHo_sosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi?: DonViUpdateOneRequiredWithoutQuy_chesNestedInput
    tieu_chis?: TieuChiUpdateManyWithoutQuy_cheNestedInput
  }

  export type QuyCheUncheckedUpdateWithoutHo_sosInput = {
    id?: StringFieldUpdateOperationsInput | string
    don_vi_id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chis?: TieuChiUncheckedUpdateManyWithoutQuy_cheNestedInput
  }

  export type MinhChungUpsertWithWhereUniqueWithoutHo_sosInput = {
    where: MinhChungWhereUniqueInput
    update: XOR<MinhChungUpdateWithoutHo_sosInput, MinhChungUncheckedUpdateWithoutHo_sosInput>
    create: XOR<MinhChungCreateWithoutHo_sosInput, MinhChungUncheckedCreateWithoutHo_sosInput>
  }

  export type MinhChungUpdateWithWhereUniqueWithoutHo_sosInput = {
    where: MinhChungWhereUniqueInput
    data: XOR<MinhChungUpdateWithoutHo_sosInput, MinhChungUncheckedUpdateWithoutHo_sosInput>
  }

  export type MinhChungUpdateManyWithWhereWithoutHo_sosInput = {
    where: MinhChungScalarWhereInput
    data: XOR<MinhChungUpdateManyMutationInput, MinhChungUncheckedUpdateManyWithoutHo_sosInput>
  }

  export type DonViCreateManyParentInput = {
    id?: string
    ten_don_vi: string
    cap_do: $Enums.CapDo
    trang_thai?: boolean
    created_at?: Date | string
  }

  export type NguoiDungCreateManyDon_viInput = {
    id?: string
    email: string
    msv?: string | null
    mat_khau: string
    ho_ten: string
    vai_tro?: $Enums.VaiTro
    cccd?: string | null
    trang_thai?: $Enums.TrangThaiTK
    so_dien_thoai?: string | null
    reset_otp?: string | null
    reset_otp_expires?: Date | string | null
    created_at?: Date | string
  }

  export type QuyCheCreateManyDon_viInput = {
    id?: string
    nam_hoc: string
    ngay_mo_cong: Date | string
    ngay_dong_cong: Date | string
    so_tieu_chi_dat?: number
    created_at?: Date | string
  }

  export type HoatDongCreateManyDon_vi_tcInput = {
    id?: string
    ten_hoat_dong: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    nguoi_duyet_id?: string | null
    ly_do_tu_choi?: string | null
    created_at?: Date | string
  }

  export type DonViUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: DonViUpdateManyWithoutParentNestedInput
    nguoi_dungs?: NguoiDungUpdateManyWithoutDon_viNestedInput
    quy_ches?: QuyCheUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DonViUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: DonViUncheckedUpdateManyWithoutParentNestedInput
    nguoi_dungs?: NguoiDungUncheckedUpdateManyWithoutDon_viNestedInput
    quy_ches?: QuyCheUncheckedUpdateManyWithoutDon_viNestedInput
    hoat_dongs?: HoatDongUncheckedUpdateManyWithoutDon_vi_tcNestedInput
  }

  export type DonViUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_don_vi?: StringFieldUpdateOperationsInput | string
    cap_do?: EnumCapDoFieldUpdateOperationsInput | $Enums.CapDo
    trang_thai?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NguoiDungUpdateWithoutDon_viInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diem_danhs?: DiemDanhUpdateManyWithoutNguoi_dungNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type NguoiDungUncheckedUpdateWithoutDon_viInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutNguoi_dungNestedInput
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutNguoi_dungNestedInput
    ho_sos?: HoSoUncheckedUpdateManyWithoutNguoi_dungNestedInput
    hoat_dong_duyets?: HoatDongUncheckedUpdateManyWithoutNguoi_duyetNestedInput
  }

  export type NguoiDungUncheckedUpdateManyWithoutDon_viInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    msv?: NullableStringFieldUpdateOperationsInput | string | null
    mat_khau?: StringFieldUpdateOperationsInput | string
    ho_ten?: StringFieldUpdateOperationsInput | string
    vai_tro?: EnumVaiTroFieldUpdateOperationsInput | $Enums.VaiTro
    cccd?: NullableStringFieldUpdateOperationsInput | string | null
    trang_thai?: EnumTrangThaiTKFieldUpdateOperationsInput | $Enums.TrangThaiTK
    so_dien_thoai?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp?: NullableStringFieldUpdateOperationsInput | string | null
    reset_otp_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuyCheUpdateWithoutDon_viInput = {
    id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chis?: TieuChiUpdateManyWithoutQuy_cheNestedInput
    ho_sos?: HoSoUpdateManyWithoutQuy_cheNestedInput
  }

  export type QuyCheUncheckedUpdateWithoutDon_viInput = {
    id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chis?: TieuChiUncheckedUpdateManyWithoutQuy_cheNestedInput
    ho_sos?: HoSoUncheckedUpdateManyWithoutQuy_cheNestedInput
  }

  export type QuyCheUncheckedUpdateManyWithoutDon_viInput = {
    id?: StringFieldUpdateOperationsInput | string
    nam_hoc?: StringFieldUpdateOperationsInput | string
    ngay_mo_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    ngay_dong_cong?: DateTimeFieldUpdateOperationsInput | Date | string
    so_tieu_chi_dat?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoatDongUpdateWithoutDon_vi_tcInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nguoi_duyet?: NguoiDungUpdateOneWithoutHoat_dong_duyetsNestedInput
    tieu_chis?: TieuChiUpdateManyWithoutHoat_dongsNestedInput
    diem_danhs?: DiemDanhUpdateManyWithoutHoat_dongNestedInput
  }

  export type HoatDongUncheckedUpdateWithoutDon_vi_tcInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chis?: TieuChiUncheckedUpdateManyWithoutHoat_dongsNestedInput
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutHoat_dongNestedInput
  }

  export type HoatDongUncheckedUpdateManyWithoutDon_vi_tcInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiemDanhCreateManyNguoi_dungInput = {
    id?: string
    hoat_dong_id: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
  }

  export type MinhChungCreateManyNguoi_dungInput = {
    id?: string
    tieu_chi_id?: string | null
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
  }

  export type HoSoCreateManyNguoi_dungInput = {
    id?: string
    quy_che_id: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
  }

  export type HoatDongCreateManyNguoi_duyetInput = {
    id?: string
    ten_hoat_dong: string
    don_vi_tc_id: string
    thoi_gian_bat_dau: Date | string
    thoi_gian_ket_thuc: Date | string
    dia_diem?: string | null
    hinh_thuc_dd: string
    trang_thai: string
    ly_do_tu_choi?: string | null
    created_at?: Date | string
  }

  export type DiemDanhUpdateWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
    hoat_dong?: HoatDongUpdateOneRequiredWithoutDiem_danhsNestedInput
  }

  export type DiemDanhUncheckedUpdateWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    hoat_dong_id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DiemDanhUncheckedUpdateManyWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    hoat_dong_id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MinhChungUpdateWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chi?: TieuChiUpdateOneWithoutMinh_chungsNestedInput
    ho_sos?: HoSoUpdateManyWithoutMinh_chungsNestedInput
  }

  export type MinhChungUncheckedUpdateWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    tieu_chi_id?: NullableStringFieldUpdateOperationsInput | string | null
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ho_sos?: HoSoUncheckedUpdateManyWithoutMinh_chungsNestedInput
  }

  export type MinhChungUncheckedUpdateManyWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    tieu_chi_id?: NullableStringFieldUpdateOperationsInput | string | null
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoSoUpdateWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    quy_che?: QuyCheUpdateOneRequiredWithoutHo_sosNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutHo_sosNestedInput
  }

  export type HoSoUncheckedUpdateWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutHo_sosNestedInput
  }

  export type HoSoUncheckedUpdateManyWithoutNguoi_dungInput = {
    id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoatDongUpdateWithoutNguoi_duyetInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi_tc?: DonViUpdateOneRequiredWithoutHoat_dongsNestedInput
    tieu_chis?: TieuChiUpdateManyWithoutHoat_dongsNestedInput
    diem_danhs?: DiemDanhUpdateManyWithoutHoat_dongNestedInput
  }

  export type HoatDongUncheckedUpdateWithoutNguoi_duyetInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    don_vi_tc_id?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tieu_chis?: TieuChiUncheckedUpdateManyWithoutHoat_dongsNestedInput
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutHoat_dongNestedInput
  }

  export type HoatDongUncheckedUpdateManyWithoutNguoi_duyetInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    don_vi_tc_id?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TieuChiCreateManyQuy_cheInput = {
    id?: string
    ten_tieu_chi: string
    mo_ta?: string | null
    thu_tu?: number | null
    so_luong_yeu_cau?: number
  }

  export type HoSoCreateManyQuy_cheInput = {
    id?: string
    nguoi_dung_id: string
    cap_hien_tai?: string
    trang_thai?: $Enums.TrangThaiHoSo
    ai_flag?: string | null
    ghi_chu_ai?: string | null
    khoa?: boolean
    ngay_nop?: Date | string | null
    created_at?: Date | string
  }

  export type TieuChiUpdateWithoutQuy_cheInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
    hoat_dongs?: HoatDongUpdateManyWithoutTieu_chisNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutTieu_chiNestedInput
  }

  export type TieuChiUncheckedUpdateWithoutQuy_cheInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
    hoat_dongs?: HoatDongUncheckedUpdateManyWithoutTieu_chisNestedInput
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutTieu_chiNestedInput
  }

  export type TieuChiUncheckedUpdateManyWithoutQuy_cheInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
  }

  export type HoSoUpdateWithoutQuy_cheInput = {
    id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nguoi_dung?: NguoiDungUpdateOneRequiredWithoutHo_sosNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutHo_sosNestedInput
  }

  export type HoSoUncheckedUpdateWithoutQuy_cheInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutHo_sosNestedInput
  }

  export type HoSoUncheckedUpdateManyWithoutQuy_cheInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinhChungCreateManyTieu_chiInput = {
    id?: string
    nguoi_dung_id: string
    loai: string
    ten_minh_chung?: string | null
    file_url: string
    trang_thai: string
    ai_xac_thuc_muc_do?: number | null
    nguoi_duyet_id?: string | null
    ly_do_loai?: string | null
    created_at?: Date | string
  }

  export type HoatDongUpdateWithoutTieu_chisInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    don_vi_tc?: DonViUpdateOneRequiredWithoutHoat_dongsNestedInput
    nguoi_duyet?: NguoiDungUpdateOneWithoutHoat_dong_duyetsNestedInput
    diem_danhs?: DiemDanhUpdateManyWithoutHoat_dongNestedInput
  }

  export type HoatDongUncheckedUpdateWithoutTieu_chisInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    don_vi_tc_id?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diem_danhs?: DiemDanhUncheckedUpdateManyWithoutHoat_dongNestedInput
  }

  export type HoatDongUncheckedUpdateManyWithoutTieu_chisInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_hoat_dong?: StringFieldUpdateOperationsInput | string
    don_vi_tc_id?: StringFieldUpdateOperationsInput | string
    thoi_gian_bat_dau?: DateTimeFieldUpdateOperationsInput | Date | string
    thoi_gian_ket_thuc?: DateTimeFieldUpdateOperationsInput | Date | string
    dia_diem?: NullableStringFieldUpdateOperationsInput | string | null
    hinh_thuc_dd?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_tu_choi?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinhChungUpdateWithoutTieu_chiInput = {
    id?: StringFieldUpdateOperationsInput | string
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nguoi_dung?: NguoiDungUpdateOneRequiredWithoutMinh_chungsNestedInput
    ho_sos?: HoSoUpdateManyWithoutMinh_chungsNestedInput
  }

  export type MinhChungUncheckedUpdateWithoutTieu_chiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ho_sos?: HoSoUncheckedUpdateManyWithoutMinh_chungsNestedInput
  }

  export type MinhChungUncheckedUpdateManyWithoutTieu_chiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiemDanhCreateManyHoat_dongInput = {
    id?: string
    nguoi_dung_id: string
    phuong_thuc: string
    thoi_gian?: Date | string
    da_chot?: boolean
  }

  export type TieuChiUpdateWithoutHoat_dongsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
    quy_che?: QuyCheUpdateOneRequiredWithoutTieu_chisNestedInput
    minh_chungs?: MinhChungUpdateManyWithoutTieu_chiNestedInput
  }

  export type TieuChiUncheckedUpdateWithoutHoat_dongsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
    minh_chungs?: MinhChungUncheckedUpdateManyWithoutTieu_chiNestedInput
  }

  export type TieuChiUncheckedUpdateManyWithoutHoat_dongsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    ten_tieu_chi?: StringFieldUpdateOperationsInput | string
    mo_ta?: NullableStringFieldUpdateOperationsInput | string | null
    thu_tu?: NullableIntFieldUpdateOperationsInput | number | null
    so_luong_yeu_cau?: IntFieldUpdateOperationsInput | number
  }

  export type DiemDanhUpdateWithoutHoat_dongInput = {
    id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
    nguoi_dung?: NguoiDungUpdateOneRequiredWithoutDiem_danhsNestedInput
  }

  export type DiemDanhUncheckedUpdateWithoutHoat_dongInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DiemDanhUncheckedUpdateManyWithoutHoat_dongInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    phuong_thuc?: StringFieldUpdateOperationsInput | string
    thoi_gian?: DateTimeFieldUpdateOperationsInput | Date | string
    da_chot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HoSoUpdateWithoutMinh_chungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nguoi_dung?: NguoiDungUpdateOneRequiredWithoutHo_sosNestedInput
    quy_che?: QuyCheUpdateOneRequiredWithoutHo_sosNestedInput
  }

  export type HoSoUncheckedUpdateWithoutMinh_chungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoSoUncheckedUpdateManyWithoutMinh_chungsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    quy_che_id?: StringFieldUpdateOperationsInput | string
    cap_hien_tai?: StringFieldUpdateOperationsInput | string
    trang_thai?: EnumTrangThaiHoSoFieldUpdateOperationsInput | $Enums.TrangThaiHoSo
    ai_flag?: NullableStringFieldUpdateOperationsInput | string | null
    ghi_chu_ai?: NullableStringFieldUpdateOperationsInput | string | null
    khoa?: BoolFieldUpdateOperationsInput | boolean
    ngay_nop?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinhChungUpdateWithoutHo_sosInput = {
    id?: StringFieldUpdateOperationsInput | string
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nguoi_dung?: NguoiDungUpdateOneRequiredWithoutMinh_chungsNestedInput
    tieu_chi?: TieuChiUpdateOneWithoutMinh_chungsNestedInput
  }

  export type MinhChungUncheckedUpdateWithoutHo_sosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    tieu_chi_id?: NullableStringFieldUpdateOperationsInput | string | null
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinhChungUncheckedUpdateManyWithoutHo_sosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nguoi_dung_id?: StringFieldUpdateOperationsInput | string
    tieu_chi_id?: NullableStringFieldUpdateOperationsInput | string | null
    loai?: StringFieldUpdateOperationsInput | string
    ten_minh_chung?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    trang_thai?: StringFieldUpdateOperationsInput | string
    ai_xac_thuc_muc_do?: NullableIntFieldUpdateOperationsInput | number | null
    nguoi_duyet_id?: NullableStringFieldUpdateOperationsInput | string | null
    ly_do_loai?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DonViCountOutputTypeDefaultArgs instead
     */
    export type DonViCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DonViCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NguoiDungCountOutputTypeDefaultArgs instead
     */
    export type NguoiDungCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NguoiDungCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuyCheCountOutputTypeDefaultArgs instead
     */
    export type QuyCheCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuyCheCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TieuChiCountOutputTypeDefaultArgs instead
     */
    export type TieuChiCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TieuChiCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HoatDongCountOutputTypeDefaultArgs instead
     */
    export type HoatDongCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HoatDongCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MinhChungCountOutputTypeDefaultArgs instead
     */
    export type MinhChungCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MinhChungCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HoSoCountOutputTypeDefaultArgs instead
     */
    export type HoSoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HoSoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DonViDefaultArgs instead
     */
    export type DonViArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DonViDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NguoiDungDefaultArgs instead
     */
    export type NguoiDungArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NguoiDungDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuyCheDefaultArgs instead
     */
    export type QuyCheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuyCheDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TieuChiDefaultArgs instead
     */
    export type TieuChiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TieuChiDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HoatDongDefaultArgs instead
     */
    export type HoatDongArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HoatDongDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DiemDanhDefaultArgs instead
     */
    export type DiemDanhArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DiemDanhDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MinhChungDefaultArgs instead
     */
    export type MinhChungArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MinhChungDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HoSoDefaultArgs instead
     */
    export type HoSoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HoSoDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}