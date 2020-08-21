export interface AvatarUrls {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
}

export interface Lead {
    self: string;
    accountId: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    active: boolean;
}

export interface IssueType {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    avatarId: number;
    subtask?: boolean;
}

export interface Version {
    self: string;
    id: string;
    name: string;
    released: ?boolean;
    archived: ?boolean;
    description: string;
    startDate: ?string;
    releaseDate: string;
    userReleaseDate: string;
    projectId: number;
}

export interface Roles {
    Administrator: string;
    Member: string;
    Viewer: string;
    "atlassian-addons-project-access": string;
}

export interface ProjectCategory {
    self: string;
    id: string;
    name: string;
    description: string;
}

export interface Project {
    expand: string;
    self: string;
    id: string;
    key: string;
    lead: Lead;
    issueTypes: IssueType[];
    assigneeType: string;
    versions: Version[];
    name: string;
    roles: Roles;
    avatarUrls: AvatarUrls;
    projectCategory: ProjectCategory;
}
