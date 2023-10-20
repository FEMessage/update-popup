export interface Options {
  /**
   * Use framework preset by default, set this value to override it.
   * @default ''
   */
  publicBasePath?: string
  /**
   * To make updated version code automaticly
   * Note：If true，the environment variable UPDATE_POPUP_VERSION doesn't work.
   * @default false
   */
  auto?: boolean
  /**
   * @default 'UPDATE_POPUP_VERSION'
   */
  envKey?: string
  /**
   * @default 'update_popup_version.txt'
   */
  versionFileName?: string

  /**
   * Using the current timestamp，it looks like this: 1603184005919.0.0.
   * @default 'timestamp'
   */
  versionType?: 'timestamp'
  /**
   * @default '发现新版本可用'
   */
  popupMessage?: string
  /**
   * @default '刷新'
   */
  popupActionText?: string
}
