type EnvKey = string

export interface Options {
  /**
   * Use framework preset by default, set this value to override
   * @default ''
   */
  publicBasePath?: string
  /**
   * @default 'UPDATE_POPUP_VERSION'
   */
  envKey?: EnvKey
  /**
   * @default 'update_popup_version.txt'
   */
  versionFileName?: string
  /**
   * @default 'auto'
   */
  versionType?: 'auto' | 'env'
}

export interface PupaOptions {
  envKey: EnvKey
  currentVersion: string
  versionFilePath: string
}
