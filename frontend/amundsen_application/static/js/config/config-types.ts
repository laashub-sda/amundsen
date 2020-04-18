import { FilterType, ResourceType } from '../interfaces';

/**
 * AppConfig and AppConfigCustom should share the same definition, except each field in AppConfigCustom
 * is optional. If you choose to override one of the configs, you must provide the full type definition
 * for that section.
 */

export interface AppConfig {
  badges: BadgeConfig;
  browse: BrowseConfig;
  date: DateFormatConfig;
  editableText: EditableTextConfig;
  google: GoogleAnalyticsConfig;
  indexUsers: IndexUsersConfig;
  issueTracking: IssueTrackingConfig;
  logoPath: string | null;
  mailClientFeatures: MailClientFeaturesConfig;
  navLinks: Array<LinkConfig>;
  resourceConfig: ResourceConfig;
  tableLineage: TableLineageConfig;
  tableProfile: TableProfileConfig;
}

export interface AppConfigCustom {
  badges?: BadgeConfig;
  browse?: BrowseConfig;
  date?: DateFormatConfig;
  editableText?: EditableTextConfig;
  google?: GoogleAnalyticsConfig
  indexUsers?: IndexUsersConfig;
  issueTracking?: IssueTrackingConfig; 
  logoPath?: string;
  mailClientFeatures?: MailClientFeaturesConfig;
  navLinks?: Array<LinkConfig>;
  resourceConfig?: ResourceConfig;
  tableLineage?: TableLineageConfig;
  tableProfile?: TableProfileConfig;
}

/**
 * GoogleAnalyticsConfig - Customize 'gtag' - Google Tag Manager.
 *
 * Key - The unique analytics key for your site
 * Sample Rate - The percentage of users (0 - 100) to track site speed.
 */
interface GoogleAnalyticsConfig {
  enabled: boolean;
  key: string;
  sampleRate: number;
}

/**
 * BrowseConfig - Customize the 'browse' page.
 *
 * curatedTags - An array of tags to show in a separate section at the top.
 * showAllTags - Shows all tags when true, or only curated tags if false
 */
interface BrowseConfig {
  curatedTags: Array<string>;
  showAllTags: boolean;
}

/**
 * The data shape of MultiSelectFilterCategory.options
 *
 * displaName - The display name of the multi-select filter option
 * value - The value the option represents
 */
interface MultiSelectFilterOptions {
  displayName?: string;
  value: string;
}

/**
 * Base interface for all possible FilterConfig objects
 *
 * categoryId - The filter category that this config represents, e.g. 'database' or 'badges'
 * displayName - The displayName for the filter category
 * helpText - An option string of text that will render in the filter UI for the filter category
 * type - The FilterType for this filter category
 */
interface BaseFilterCategory {
  categoryId: string;
  displayName: string;
  helpText?: string;
  type: FilterType;
}

/**
 * Interface for filter categories which allow multiple values to be selected by the user
 */
interface MultiSelectFilterCategory extends BaseFilterCategory {
  type: FilterType.CHECKBOX_SELECT;
  options: MultiSelectFilterOptions[];
}

/**
 * Interface for filter categories which allow only one value to be entered by the user
 */
interface SingleFilterCategory extends BaseFilterCategory {
  type: FilterType.INPUT_SELECT;
}

/**
 * Configures filter categories for each resource
 */
export type FilterConfig = (MultiSelectFilterCategory|SingleFilterCategory)[];

/**
 * Base interface for all possible ResourceConfig objects
 *
 * displayName - The name displayed throughout the application to refer to this resource type
 * filterCategories - Optional configuration for any filters that can be applied to this resource
 */
interface BaseResourceConfig {
  displayName: string;
  filterCategories?: FilterConfig;
}

/**
 * Interface for table resource types
 */
interface TableResourceConfig extends BaseResourceConfig {
  supportedDatabases: {
    [id: string]: DatabaseConfig
  };
}

export enum BadgeStyle {
  DANGER = "danger",
  DEFAULT = "default",
  INFO = "info",
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "warning",
}

export interface BadgeStyleConfig {
  style: BadgeStyle;
  displayName?: string;
}

/**
 * BadgeConfig - Configure badge colors
 *
 * An object that maps badges to BadgeStyleConfigs
 */
interface BadgeConfig {
  [badge: string]: BadgeStyleConfig;
}

/**
 * DateConfig - Configure various date formats
 *
 */
interface DateFormatConfig {
  default: string;
  dateTimeLong: string;
  dateTimeShort: string;
}

/** ResourceConfig - For customizing values related to how various resources
 *                   are displayed in the UI.
 *
 * A map of each resource type to its configuration
 */
interface ResourceConfig {
  [ResourceType.table]: TableResourceConfig;
  [ResourceType.user]: BaseResourceConfig;
}

/** DatabaseConfig - For customizing values related to how each database resource
 *                  is displayed in the UI.
 *
 * displayName - An optional display name for this database source
 * iconClass - An option icon class to be used for this database source. This
 *             value should be defined in static/css/_icons.scss
 */
interface DatabaseConfig {
  displayName?: string;
  iconClass?: string;
}

/**
 * MailClientFeaturesConfig - Enable/disable UI features with a dependency on
 *                            configuring a custom mail client.
 *
 * feedbackEnabled - Enables the feedback feature UI
 * notificationsEnabled - Enables any UI related to sending notifications to users
 */
interface MailClientFeaturesConfig {
  feedbackEnabled: boolean;
  notificationsEnabled: boolean;
}
/**
 * TableProfileConfig - Customize the "Table Profile" section of the "Table Details" page.
 *
 * isBeta - Adds a "beta" tag to the "Table Profile" section header.
 * isExploreEnabled - Enables the third party SQL explore feature.
 * exploreUrlGenerator - Generates a URL to a third party SQL explorable website.
 */
interface TableProfileConfig {
  isBeta: boolean;
  isExploreEnabled: boolean;
  exploreUrlGenerator: (database: string, cluster: string, schema: string, table: string, partitionKey?: string, partitionValue?: string) => string;
}

/**
 * TableLineageConfig - Customize the "Table Lineage" section of the "Table Details" page.
 *
 * iconPath - Path to an icon image to display next to the lineage URL.
 * isBeta - Adds a "beta" tag to the section header.
 * isEnabled - Whether to show or hide this section
 * urlGenerator - Generate a URL to the third party lineage website
 */
interface TableLineageConfig {
  iconPath: string;
  isBeta: boolean;
  isEnabled: boolean;
  urlGenerator: (database: string, cluster: string, schema: string , table: string) => string;
}

export interface LinkConfig {
  href: string;
  id: string;
  label: string;
  target?: string;
  use_router: boolean;
}

/**
 * IndexUsersConfig - When enabled, the IndexUsers feature will index users as searchable resources. This requires
 * user objects are ingested via Databuilder
 *
 * enabled - Enables/disables this feature in the frontend only
 */
interface IndexUsersConfig {
  enabled: boolean;
}

/**
 * EditableTextConfig - Configure max length limits for editable fields
 *
 * tableDescLength - maxlength for table descriptions
 * columnDescLength - maxlength for column descriptions
 */
interface EditableTextConfig {
  tableDescLength: number;
  columnDescLength: number;
}
/**
 * IssueTrackingConfig - configures whether to display the issue tracking feature
 * that allows users to display tickets associated with a table and create ones 
 * linked to a table
 */
interface IssueTrackingConfig {
  enabled: boolean; 
}