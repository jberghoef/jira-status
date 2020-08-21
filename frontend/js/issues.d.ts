export interface AvatarUrls {
    "16x16": string;
    "24x24": string;
    "32x32": string;
    "48x48": string;
}

export interface Creator {
    Password: string;
    accountId: string;
    accountType: string;
    active: boolean;
    avatarUrls: AvatarUrls;
    displayName: string;
    emailAddress: string;
    self: string;
    timeZone: string;
}

export interface Aggregateprogress {
    percent: number;
    progress: number;
    total: number;
}

export interface Assignee {
    Password: string;
    accountId: string;
    accountType: string;
    active: boolean;
    avatarUrls: AvatarUrls;
    displayName: string;
    emailAddress: string;
    self: string;
    timeZone: string;
}

export interface Author {
    Password: string;
    accountId: string;
    accountType: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    self: string;
    timeZone: string;
    active?: boolean;
    emailAddress: string;
}

export interface Attachment {
    author: Author;
    content: string;
    created: Date;
    filename: string;
    id: string;
    mimeType: string;
    self: string;
    size: number;
    thumbnail: string;
}

export interface ClosedSprint {
    completeDate: Date;
    endDate: Date;
    goal: string;
    id: number;
    name: string;
    originBoardId: number;
    self: string;
    startDate: Date;
    state: string;
}

export interface UpdateAuthor {
    Password: string;
    accountId: string;
    accountType: string;
    active: boolean;
    avatarUrls: AvatarUrls;
    displayName: string;
    emailAddress: string;
    self: string;
    timeZone: string;
}

export interface FixVersion {
    archived: boolean;
    description: string;
    id: string;
    name: string;
    releaseDate: string;
    released: boolean;
    self: string;
}

export interface Issuetype {
    avatarId: number;
    description: string;
    iconUrl: string;
    id: string;
    name: string;
    self: string;
}

export interface Priority {
    iconUrl: string;
    id: string;
    name: string;
    self: string;
}

export interface StatusCategory {
    colorName: string;
    id: number;
    key: string;
    name: string;
    self: string;
}

export interface Status {
    description: string;
    iconUrl: string;
    id: string;
    name: string;
    self: string;
    statusCategory: StatusCategory;
}

export interface InwardIssue {
    fields: Fields;
    id: string;
    key: string;
    self: string;
}

export interface OutwardIssue {
    fields: Fields;
    id: string;
    key: string;
    self: string;
}

export interface Type {
    id: string;
    inward: string;
    name: string;
    outward: string;
    self: string;
}

export interface Progress {
    percent: number;
    progress: number;
    total: number;
}

export interface ProjectCategory {
    description: string;
    id: string;
    name: string;
    self: string;
}

export interface Project {
    avatarUrls: AvatarUrls;
    id: string;
    key: string;
    name: string;
    projectCategory: ProjectCategory;
    self: string;
}

export interface Reporter {
    Password: string;
    accountId: string;
    accountType: string;
    active: boolean;
    avatarUrls: AvatarUrls;
    displayName: string;
    emailAddress: string;
    self: string;
    timeZone: string;
}

export interface Resolution {
    description: string;
    id: string;
    name: string;
    self: string;
}

export interface Subtask {
    fields: Fields;
    id: string;
    key: string;
    self: string;
}

export interface Fields {
    Creator: Creator;
    aggregateprogress: Aggregateprogress;
    assignee: Assignee;
    attachment: Attachment[];
    closedSprints: ClosedSprint[];
    comment: Comment;
    components: any[];
    created: Date;
    creator: Creator;
    environment?: any;
    fixVersions: FixVersion[];
    flagged: boolean;
    issuelinks: Issuelink[];
    issuerestriction: Issuerestriction;
    issuetype: Issuetype;
    labels: string[];
    lastViewed?: any;
    parent: Parent;
    priority: Priority;
    progress: Progress;
    project: Project;
    reporter: Reporter;
    resolution: Resolution;
    resolutiondate: Date;
    security?: any;
    status: Status;
    statuscategorychangedate: Date;
    subtasks: Subtask[];
    summary: string;
    timetracking: Timetracking;
    updated: Date;
    versions: any[];
    description: string;
}

export interface Issue {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: Fields;
}
