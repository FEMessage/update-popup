export interface Options {
  /**
   * Use framework preset by default, set this value to override it.
   * @default ''
   */
  publicBasePath?: string
  /**
   * @default 'UPDATE_POPUP_VERSION'
   */
  envKey?: string
  /**
   * @default 'update_popup_version.txt'
   */
  versionFileName?: string
  versionType?: 'auto' | 'env'
}
